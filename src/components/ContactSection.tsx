import { useState } from 'react';
import { Send, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAnalytics } from '../hooks/useAnalytics';
import { isValidPhone, getWhatsAppLink } from '../utils/format';

const CONTACT_PERSON = {
  name: 'Veronika Pfneiszl',
  role: 'Offizielle Vertretung DACH',
  phoneE164: '4369917738276',
  phoneDisplay: '+43 699 17738276',
  photoUrl:
    'https://media.licdn.com/dms/image/v2/D4D03AQG8TV7HBGxUyw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1686568020154?e=1770249600&v=beta&t=9vXBD4VknlocLdAKbcvZShrLGOHHaK2nueo2z1IpFOA',
} as const;

interface FormData {
  name: string;
  phone: string;
  email: string;
  budget: string;
  goal: string;
  horizon: string;
  preferredCategory: string;
  dsgvoConsent: boolean;
  marketingConsent: boolean;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  budget: '',
  goal: '',
  horizon: '',
  preferredCategory: '',
  dsgvoConsent: false,
  marketingConsent: false,
};

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQualification, setShowQualification] = useState(false);
  const { submitLead } = useData();
  const { trackEvent } = useAnalytics();

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefonnummer ist erforderlich';
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = 'Bitte gültige Telefonnummer eingeben';
    }
    
    if (!formData.dsgvoConsent) {
      newErrors.dsgvoConsent = 'Zustimmung erforderlich';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    trackEvent('form_submit', { 
      hasQualification: showQualification,
      budget: formData.budget || 'not_provided'
    });
    
    setIsSubmitting(true);
    
    try {
      await submitLead({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        budget: formData.budget || undefined,
        goal: formData.goal as any || undefined,
        horizon: formData.horizon as any || undefined,
        preferredCategory: formData.preferredCategory as any || undefined,
        dsgvoConsent: formData.dsgvoConsent,
        marketingConsent: formData.marketingConsent,
        source: 'landing_page',
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
    
    if (field === 'name' && !formData.phone) {
      trackEvent('form_start', {});
    }
  };

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'contact_form' });
    const message = formData.name 
      ? `Hallo, mein Name ist ${formData.name}. Ich interessiere mich für Immobilien auf Phuket.`
      : 'Hallo, ich interessiere mich für Immobilien auf Phuket.';
    window.open(getWhatsAppLink(CONTACT_PERSON.phoneE164, message), '_blank');
  };

  if (isSubmitted) {
    return (
      <section id="kontakt" className="py-20 md:py-32 bg-brand-600">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Vielen Dank für Ihre Anfrage!
          </h2>
          <p className="text-brand-100 text-lg mb-8">
            Wir melden uns innerhalb von 24 Stunden bei Ihnen. 
            Für eine schnellere Antwort erreichen Sie uns auch per WhatsApp.
          </p>
          <button onClick={handleWhatsApp} className="btn-whatsapp">
            <MessageCircle className="w-5 h-5" />
            WhatsApp öffnen
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="kontakt" className="py-20 md:py-32 bg-brand-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <span className="text-brand-200 font-medium text-sm tracking-wide uppercase mb-3 block">
              Kontakt
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
              Unverbindliche Beratung anfragen
            </h2>
            <p className="text-brand-100 text-lg mb-8">
              Erhalten Sie eine individuelle Analyse passender Objekte basierend auf 
              Ihren Zielen und Ihrem Budget. Keine Verpflichtungen.
            </p>

            <div className="mb-8">
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 border border-white/20 p-4">
                <img
                  src={CONTACT_PERSON.photoUrl}
                  alt={CONTACT_PERSON.name}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover border border-white/30"
                />
                <div className="min-w-0">
                  <div className="font-medium text-white truncate">{CONTACT_PERSON.name}</div>
                  <div className="text-brand-100 text-sm">{CONTACT_PERSON.role}</div>
                  <div className="text-brand-100 text-sm">{CONTACT_PERSON.phoneDisplay}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Kostenlose Erstberatung per Video-Call</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Individuelle Objektvorschläge</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-200" />
                <span className="text-brand-100">Vollständige Dokumentation vorab</span>
              </div>
            </div>

            <button
              onClick={handleWhatsApp}
              className="btn-whatsapp text-lg !px-8 !py-4"
            >
              <MessageCircle className="w-6 h-6" />
              WhatsApp an {CONTACT_PERSON.name}
            </button>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`input-field ${errors.name ? 'input-error' : ''}`}
                  placeholder="Ihr Name"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Telefon / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                  placeholder="+49 123 456789"
                />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  E-Mail (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="input-field"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Budget (optional)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="input-field"
                >
                  <option value="">Bitte wählen</option>
                  <option value="100-150k">100.000 - 150.000 EUR</option>
                  <option value="150-250k">150.000 - 250.000 EUR</option>
                  <option value="250-500k">250.000 - 500.000 EUR</option>
                  <option value="500k+">Über 500.000 EUR</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowQualification(!showQualification)}
                className="text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                {showQualification ? '− Weniger Angaben' : '+ Weitere Angaben (optional)'}
              </button>

              {showQualification && (
                <div className="space-y-5 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Investitionsziel
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => handleInputChange('goal', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="RENTAL_INCOME">Mieteinnahmen</option>
                      <option value="CAPITAL_GROWTH">Wertsteigerung</option>
                      <option value="PERSONAL_USE">Eigennutzung</option>
                      <option value="MIXED">Kombination</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Anlagehorizont
                    </label>
                    <select
                      value={formData.horizon}
                      onChange={(e) => handleInputChange('horizon', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Bitte wählen</option>
                      <option value="1-3">1-3 Jahre</option>
                      <option value="3-5">3-5 Jahre</option>
                      <option value="5-10">5-10 Jahre</option>
                      <option value="10+">Über 10 Jahre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Bevorzugte Kategorie
                    </label>
                    <select
                      value={formData.preferredCategory}
                      onChange={(e) => handleInputChange('preferredCategory', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Keine Präferenz</option>
                      <option value="READY">Sofort verfügbar</option>
                      <option value="2026">Fertigstellung 2026</option>
                      <option value="2027">Fertigstellung 2027</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dsgvoConsent}
                    onChange={(e) => handleInputChange('dsgvoConsent', e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-600">
                    Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                    <a href="/datenschutz.html" className="text-brand-600 hover:underline">
                      Datenschutzerklärung
                    </a>{' '}
                    zu. *
                  </span>
                </label>
                {errors.dsgvoConsent && (
                  <p className="error-message flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.dsgvoConsent}
                  </p>
                )}

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                    className="mt-1 w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-600">
                    Ich möchte über neue Objekte und Marktinformationen informiert werden (optional).
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Wird gesendet...
                  </span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Beratung anfragen
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
