import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Property, Lead, User, StatusCategory } from '../types';
import { demoProperties, faqItems } from '../data/demo-data';
import { isFirebaseConfigured, getFirebase } from '../firebase/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import type { DocumentData, QuerySnapshot } from 'firebase/firestore';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import type { User as FirebaseUser } from 'firebase/auth';

// Demo mode runs without Firebase (e.g., on first upload or for local prototyping)
const DEMO_MODE = !isFirebaseConfigured;

interface DataContextType {
  properties: Property[];
  leads: Lead[];
  propertiesByCategory: {
    READY: Property[];
    '2026': Property[];
    '2027': Property[];
  };
  isLoading: boolean;
  error: string | null;
  // Admin functions
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProperty: (id: string, data: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  reorderProperties: (category: StatusCategory, orderedIds: string[]) => Promise<void>;
  // Lead functions
  submitLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
  // Auth state
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [fbUser, setFbUser] = useState<FirebaseUser | null | undefined>(undefined);

  const isAdmin = useMemo(() => user?.role === 'admin' || user?.role === 'editor', [user]);

  const mapPropertyDoc = (id: string, data: DocumentData): Property => {
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    const updatedAt = data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date();
    return {
      id,
      statusCategory: data.statusCategory,
      projectName: data.projectName,
      area: data.area,
      propertyType: data.propertyType,
      unitTypes: data.unitTypes || [],
      sizeSqmFrom: data.sizeSqmFrom,
      sizeSqmTo: data.sizeSqmTo,
      priceFromTHB: data.priceFromTHB,
      priceFromEUR: data.priceFromEUR,
      ownership: data.ownership,
      completion: data.completion ?? null,
      highlights: data.highlights || [],
      transparency: data.transparency,
      operatorModel: data.operatorModel ?? null,
      docs: data.docs || [],
      images: data.images || [],
      description: data.description,
      location: data.location,
      isPublished: Boolean(data.isPublished),
      order: typeof data.order === 'number' ? data.order : 0,
      createdAt,
      updatedAt,
    };
  };

  const mapLeadDoc = (id: string, data: DocumentData): Lead => {
    const createdAt = data.createdAt?.toDate ? data.createdAt.toDate() : new Date();
    return {
      id,
      name: data.name,
      phone: data.phone,
      email: data.email,
      budget: data.budget,
      goal: data.goal,
      horizon: data.horizon,
      preferredCategory: data.preferredCategory,
      riskProfile: data.riskProfile,
      dsgvoConsent: Boolean(data.dsgvoConsent),
      marketingConsent: Boolean(data.marketingConsent),
      source: data.source || 'website',
      createdAt,
    };
  };

  // Auth listener (Firebase mode only)
  useEffect(() => {
    if (DEMO_MODE) return;
    try {
      const { auth } = getFirebase();
      const unsub = onAuthStateChanged(auth, (u) => {
        setFbUser(u);
        if (!u) setUser(null);
      });
      return () => unsub();
    } catch (err: any) {
      console.error('Firebase auth init error:', err);
      setError(err?.message || 'Firebase Authentifizierung fehlgeschlagen');
      setFbUser(null);
    }
  }, []);

  // Data subscriptions
  useEffect(() => {
    // DEMO mode: load demo data. Admin sees all, public sees published only.
    if (DEMO_MODE) {
      const list = isAdmin ? demoProperties : demoProperties.filter(p => p.isPublished);
      setProperties(list);
      setLeads([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    // Firebase mode
    let db;
    try {
      db = getFirebase().db;
    } catch (err: any) {
      console.error('Firebase init error:', err);
      setError(err?.message || 'Firebase nicht konfiguriert');
      setProperties(demoProperties.filter(p => p.isPublished));
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);

    // While auth state is still resolving, do nothing.
    if (fbUser === undefined) return;

    // Public: published only
    if (!fbUser) {
      const q = query(
        collection(db, 'properties'),
        where('isPublished', '==', true),
        orderBy('statusCategory'),
        orderBy('order')
      );
      const unsubProps = onSnapshot(
        q,
        (snap: QuerySnapshot<DocumentData>) => {
          const list = snap.docs.map(d => mapPropertyDoc(d.id, d.data()));
          // If Firebase is configured but no published properties exist yet,
          // fall back to demo data to avoid an empty catalog.
          if (list.length === 0) {
            setProperties(demoProperties.filter(p => p.isPublished));
          } else {
            setProperties(list);
          }
          setError(null);
          setIsLoading(false);
        },
        (err) => {
          setError(err?.message || 'Firestore Fehler beim Laden der Objekte.');
          setProperties(demoProperties.filter(p => p.isPublished));
          setIsLoading(false);
        }
      );
      setLeads([]);
      return () => unsubProps();
    }

    // Admin: role + all data
    let unsubProps: (() => void) | null = null;
    let unsubLeads: (() => void) | null = null;
    let cancelled = false;

    (async () => {
      try {
        const adminRef = doc(db, 'admins', fbUser.uid);
        const adminSnap = await getDoc(adminRef);
        const role = (adminSnap.exists() ? adminSnap.data().role : null) as User['role'] | null;

        const appUser: User = {
          uid: fbUser.uid,
          email: fbUser.email || '',
          role: role === 'admin' || role === 'editor' ? role : 'editor',
          displayName: fbUser.displayName || undefined,
          createdAt: new Date(),
        };
        if (cancelled) return;
        setUser(appUser);

        const qProps = query(collection(db, 'properties'), orderBy('statusCategory'), orderBy('order'));
        unsubProps = onSnapshot(
          qProps,
          (snap: QuerySnapshot<DocumentData>) => {
            setProperties(snap.docs.map(d => mapPropertyDoc(d.id, d.data())));
            setError(null);
            setIsLoading(false);
          },
          (err) => {
            setError(err?.message || 'Firestore Fehler beim Laden der Objekte.');
            setIsLoading(false);
          }
        );

        const qLeads = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
        unsubLeads = onSnapshot(
          qLeads,
          (snap: QuerySnapshot<DocumentData>) => {
            setLeads(snap.docs.map(d => mapLeadDoc(d.id, d.data())));
          },
          (err) => {
            setError(err?.message || 'Firestore Fehler beim Laden der Leads.');
          }
        );
      } catch (e: any) {
        // Some environments surface request cancellation as AbortError.
        // Do not block rendering - fall back to demo data and expose the message.
        if (cancelled) return;
        const msg = e?.message || 'Unbekannter Fehler beim Initialisieren der Admin-Sitzung.';
        setError(msg);
        setUser(null);
        setLeads([]);
        setProperties(demoProperties.filter(p => p.isPublished));
        setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (unsubProps) unsubProps();
      if (unsubLeads) unsubLeads();
    };
  }, [isAdmin, fbUser]);

  // Group properties by category
  const propertiesByCategory = {
    READY: properties.filter(p => p.statusCategory === 'READY').sort((a, b) => a.order - b.order),
    '2026': properties.filter(p => p.statusCategory === '2026').sort((a, b) => a.order - b.order),
    '2027': properties.filter(p => p.statusCategory === '2027').sort((a, b) => a.order - b.order),
  };

  // Admin functions (demo mode stores in localStorage)
  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProperty: Property = {
      ...propertyData,
      id: `property-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    if (DEMO_MODE) {
      setProperties(prev => [...prev, newProperty]);
      localStorage.setItem('phuket-properties', JSON.stringify([...properties, newProperty]));
    } else {
      const { db } = getFirebase();
      await addDoc(collection(db, 'properties'), {
        ...propertyData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  };

  const updateProperty = async (id: string, data: Partial<Property>) => {
    if (DEMO_MODE) {
      setProperties(prev => prev.map(p => 
        p.id === id ? { ...p, ...data, updatedAt: new Date() } : p
      ));
    } else {
      const { db } = getFirebase();
      const ref = doc(db, 'properties', id);
      await updateDoc(ref, {
        ...data,
        updatedAt: serverTimestamp(),
      } as any);
    }
  };

  const deleteProperty = async (id: string) => {
    if (DEMO_MODE) {
      setProperties(prev => prev.filter(p => p.id !== id));
    } else {
      const { db } = getFirebase();
      await deleteDoc(doc(db, 'properties', id));
    }
  };

  const reorderProperties = async (_category: StatusCategory, orderedIds: string[]) => {
    if (DEMO_MODE) {
      setProperties(prev => {
        const updated = [...prev];
        orderedIds.forEach((id, index) => {
          const propIndex = updated.findIndex(p => p.id === id);
          if (propIndex !== -1) {
            updated[propIndex] = { ...updated[propIndex], order: index };
          }
        });
        return updated;
      });
    } else {
      const { db } = getFirebase();
      const batch = writeBatch(db);
      orderedIds.forEach((id, index) => {
        batch.update(doc(db, 'properties', id), { order: index, updatedAt: serverTimestamp() });
      });
      await batch.commit();
    }
  };

  const submitLead = async (leadData: Omit<Lead, 'id' | 'createdAt'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date(),
    };

    if (DEMO_MODE) {
      // Store in localStorage for demo
      const existingLeads = JSON.parse(localStorage.getItem('phuket-leads') || '[]');
      localStorage.setItem('phuket-leads', JSON.stringify([...existingLeads, newLead]));
      console.log('Lead submitted (demo mode):', newLead);
    } else {
      const { db } = getFirebase();
      await addDoc(collection(db, 'leads'), {
        ...leadData,
        createdAt: serverTimestamp(),
      });
    }
  };

  // Auth functions
  const login = async (email: string, password: string) => {
    const { auth, db } = getFirebase();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const adminRef = doc(db, 'admins', cred.user.uid);
    const adminSnap = await getDoc(adminRef);
    if (!adminSnap.exists()) {
      throw new Error('Kein Admin-Zugriff. Bitte Admin-Rechte im Firebase Console setzen.');
    }
    const role = adminSnap.data().role as User['role'];
    const appUser: User = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      role: role === 'admin' || role === 'editor' ? role : 'editor',
      displayName: cred.user.displayName || undefined,
      createdAt: new Date(),
    };
    setUser(appUser);
  };

  const logout = async () => {
    if (DEMO_MODE) {
      setUser(null);
      localStorage.removeItem('phuket-user');
    } else {
      const { auth } = getFirebase();
      await signOut(auth);
      setUser(null);
    }
  };

  // Check for existing session
  useEffect(() => {
    if (DEMO_MODE) {
      const savedUser = localStorage.getItem('phuket-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  return (
    <DataContext.Provider value={{
      properties,
      leads,
      propertiesByCategory,
      isLoading,
      error,
      addProperty,
      updateProperty,
      deleteProperty,
      reorderProperties,
      submitLead,
      user,
      isAdmin,
      login,
      logout,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

export { faqItems };
