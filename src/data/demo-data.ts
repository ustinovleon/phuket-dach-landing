import type { Property, FAQItem } from '../types';

// Demo properties based on Polish landing page source
export const demoProperties: Property[] = [
  {
    id: 'ever-prime-karon',
    statusCategory: '2026',
    projectName: 'Ever Prime',
    area: 'Karon',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: '1-Zimmer-Apartment',
        sizeSqmFrom: 32,
        sizeSqmTo: 35,
        priceFromTHB: 3946800,
        priceFromEUR: 109000,
      },
    ],
    sizeSqmFrom: 32,
    sizeSqmTo: 35,
    priceFromTHB: 3946800,
    priceFromEUR: 109000,
    ownership: 'LEASEHOLD',
    completion: '2026-12',
    highlights: [
      'Zentrum von Karon, fußläufig zum Strand',
      'Villa Market Supermarkt im Komplex',
      'Golfsimulator und Tennisplätze',
      'Möbelpaket inklusive',
      'Betreibermodell mit Mietpool verfügbar',
    ],
    transparency: {
      camPerSqm: 65,
      sinkingFund: 500,
      transferFee: '1,1% (Leasehold)',
      managementFee: 'Im Mietpool enthalten',
      notes: 'Möbelpaket im Kaufpreis enthalten',
    },
    operatorModel: 'Professioneller Hotelbetreiber mit Mietpool-Option',
    docs: [
      { title: 'Broschüre (EN)', url: '#' },
      { title: 'Preisliste', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    description: 'Ever Prime vereint städtischen Komfort mit Resort-Atmosphäre im Herzen von Karon. Der Komplex bietet direkten Zugang zu Einkaufsmöglichkeiten, Restaurants und dem berühmten "singenden Sand" Strand von Karon.',
    isPublished: true,
    order: 1,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'trees-residence-bangtao',
    statusCategory: '2026',
    projectName: 'The Trees Residence',
    area: 'Bang Tao',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: '1-Zimmer-Apartment',
        sizeSqmFrom: 37,
        sizeSqmTo: 42,
        priceFromTHB: 4026240,
        priceFromEUR: 111000,
      },
    ],
    sizeSqmFrom: 37,
    sizeSqmTo: 42,
    priceFromTHB: 4026240,
    priceFromEUR: 111000,
    ownership: 'LEASEHOLD',
    completion: '2027-03',
    highlights: [
      'Premium-Lage Bang Tao (Laguna Phuket Nachbarschaft)',
      'Ökologisches Resort-Konzept',
      'Hotellizenz für professionellen Betrieb',
      'Möbelpaket inklusive, bezugsfertig',
      'Ruhige Hanglage mit viel Grün',
    ],
    transparency: {
      camPerSqm: 70,
      sinkingFund: 550,
      transferFee: '1,1% (Leasehold)',
      managementFee: 'Betreibervertrag separat',
    },
    operatorModel: 'Hotelkonzept mit professionellem Management',
    docs: [
      { title: 'Broschüre (EN)', url: '#' },
      { title: 'Preisliste Zone A', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80',
    ],
    description: 'The Trees Residence ist ein Öko-Resort-Projekt in einer Premiumlage Phukets. Die Nähe zum Laguna Phuket Resort-Komplex führt typischerweise zu stabiler Nachfrage bei Touristen und Langzeitmietern.',
    isPublished: true,
    order: 2,
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'element-anocha-kamala',
    statusCategory: '2026',
    projectName: 'The Element by Anocha',
    area: 'Kamala',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: 'Studio mit hohen Decken',
        sizeSqmFrom: 35,
        sizeSqmTo: 45,
        priceFromTHB: 4629850,
        priceFromEUR: 127000,
      },
    ],
    sizeSqmFrom: 35,
    sizeSqmTo: 45,
    priceFromTHB: 4629850,
    priceFromEUR: 127000,
    ownership: 'LEASEHOLD',
    completion: '2026-12',
    highlights: [
      'Kamala "Goldene Meile" zwischen Patong und Surin',
      '3,75m hohe Decken für großzügiges Raumgefühl',
      'Sport- und Wellness-Fokus (Thai-Boxen, Tennis, Spa)',
      'Coworking-Bereich im Komplex',
      'Günstigere Einheiten bereits ausverkauft',
    ],
    transparency: {
      camPerSqm: 75,
      sinkingFund: 600,
      transferFee: '1,1% (Leasehold)',
      notes: 'Einheiten unter ca. €113,000* ausverkauft',
    },
    operatorModel: 'Eigenverwaltung oder Agenturvermittlung möglich',
    docs: [
      { title: 'Broschüre (DE)', url: '#' },
      { title: 'Preisliste', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    ],
    description: 'The Element by Anocha richtet sich an gesundheitsbewusste Investoren und Urlauber. Die außergewöhnlichen 3,75m Deckenhöhen und der Sport-Fokus unterscheiden dieses Projekt von Standard-Condos.',
    isPublished: true,
    order: 3,
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'demo-ready-rawai',
    statusCategory: 'READY',
    projectName: 'Rawai Beachfront Residences',
    area: 'Rawai',
    propertyType: 'CONDO',
    unitTypes: [
      {
        name: '1-Zimmer-Apartment',
        sizeSqmFrom: 45,
        sizeSqmTo: 55,
        priceFromTHB: 5500000,
        priceFromEUR: 151000,
      },
    ],
    sizeSqmFrom: 45,
    sizeSqmTo: 55,
    priceFromTHB: 5500000,
    priceFromEUR: 151000,
    ownership: 'FREEHOLD',
    completion: null,
    highlights: [
      'Sofort verfügbar und bezugsfertig',
      'Freehold-Eigentum möglich',
      'Etabliertes Projekt mit Track-Record',
      'Strand fußläufig erreichbar',
      'Vermietungshistorie vorhanden',
    ],
    transparency: {
      camPerSqm: 60,
      sinkingFund: 400,
      transferFee: '6,3% (Freehold)',
      notes: 'Mieteinnahmenhistorie auf Anfrage verfügbar',
    },
    operatorModel: 'Bestehende Vermietungsagentur vor Ort',
    docs: [
      { title: 'Exposé', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    ],
    description: 'Fertiggestelltes Projekt mit bewährter Vermietungshistorie. Ideal für Investoren, die sofortige Mieteinnahmen wünschen ohne Baurisiko.',
    isPublished: true,
    order: 1,
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'demo-2027-naiharn',
    statusCategory: '2027',
    projectName: 'Nai Harn Hillside Villas',
    area: 'Nai Harn',
    propertyType: 'VILLA',
    unitTypes: [
      {
        name: 'Pool-Villa 2 Schlafzimmer',
        sizeSqmFrom: 150,
        sizeSqmTo: 200,
        priceFromTHB: 12500000,
        priceFromEUR: 344000,
      },
    ],
    sizeSqmFrom: 150,
    sizeSqmTo: 200,
    priceFromTHB: 12500000,
    priceFromEUR: 344000,
    ownership: 'LEASEHOLD',
    completion: '2027-06',
    highlights: [
      'Exklusive Villenlage mit Meerblick',
      'Privater Pool pro Einheit',
      'Flexible Ratenzahlung über Bauzeit',
      'Nai Harn Beach in 5 Minuten',
      'Frühbucher-Preise verfügbar',
    ],
    transparency: {
      camPerSqm: 50,
      sinkingFund: 1000,
      transferFee: '1,1% (Leasehold)',
      notes: 'Zahlungsplan: 30/30/40 über Bauzeit',
    },
    operatorModel: 'Villa-Management-Service optional',
    docs: [
      { title: 'Masterplan', url: '#' },
      { title: 'Zahlungsplan', url: '#' },
    ],
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    ],
    description: 'Villen-Projekt für Investoren mit längerem Horizont. Hanglage mit Aussicht; Wertentwicklung hängt von Lage, Baufortschritt und Marktniveau ab.',
    isPublished: true,
    order: 1,
    createdAt: new Date('2025-06-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

// FAQ items for DACH audience
export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Kann ich als Ausländer Immobilien in Thailand kaufen?',
    answer: 'Ja. Ausländer können Eigentum an Wohnungen (Condominiums) im Freehold-Verfahren erwerben, sofern der Ausländeranteil im Gebäude 49% nicht übersteigt. Bei Villen und Grundstücken sind üblich: langfristiges Leasehold (bis 90 Jahre) oder Freehold über eine thailändische Gesellschaft (Company Freehold). Eine saubere Vertragsstruktur und Due Diligence sind zentral.',
    category: 'legal',
  },
  {
    id: 'faq-2',
    question: 'Wie läuft der Kaufprozess aus der Ferne ab?',
    answer: 'Der gesamte Prozess kann remote abgewickelt werden: Objektauswahl per Video-Call, Reservierung mit Anzahlung (meist €1,400-€2,800*), Kaufvertrag per E-Mail/Post, Zahlungen per Überweisung. Zur Eigentumsübertragung wird eine Vollmacht auf einen thailändischen Anwalt ausgestellt. Eine Reise ist nicht zwingend erforderlich, aber für die Due Diligence empfohlen.',
    category: 'process',
  },
  {
    id: 'faq-3',
    question: 'Wie überweise ich Geld nach Thailand?',
    answer: 'Internationale Überweisungen erfolgen per SWIFT von jedem deutschen Bankkonto oder über Fintech-Anbieter wie Wise oder Revolut (oft bessere Wechselkurse). Wichtig: Für Freehold-Erwerb muss der Zahlungsnachweis (Foreign Exchange Transaction Form) vorgelegt werden. Kryptowährungen (USDT) werden von einigen Entwicklern akzeptiert.',
    category: 'financial',
  },
  {
    id: 'faq-4',
    question: 'Welche Steuern fallen an?',
    answer: 'Beim Kauf: Übertragungsgebühr 1,1% (Leasehold) oder ca. 6,3% (Freehold, aufgeteilt zwischen Käufer/Verkäufer). Laufend: Grundsteuer ist minimal (wenige Euro pro Jahr). Mieteinnahmen: Pauschalbesteuerung oder progressiv bis 35%. Deutschland-Thailand hat ein Doppelbesteuerungsabkommen. Steuerberatung im Einzelfall empfohlen.',
    category: 'financial',
  },
  {
    id: 'faq-5',
    question: 'Was bedeutet Freehold vs. Leasehold?',
    answer: 'Freehold = Eigentum auf Ihren Namen (bei Condos innerhalb der 49%-Ausländerquote). Leasehold = 30-jähriger Pachtvertrag mit vertraglicher Option auf 2x Verlängerung (30+30+30 = 90 Jahre). Für Villen/Grundstücke wird häufig Company Freehold genutzt (Eigentum über thailändische Gesellschaft). Kosten- und Steuerfolgen sind strukturabhängig.',
    category: 'legal',
  },
  {
    id: 'faq-6',
    question: 'Ist der Kauf auf Bauphase (Off-Plan) sicher?',
    answer: 'Zahlungspläne sind in der Praxis häufig an den Baufortschritt gekoppelt. Ob Escrow-Konten genutzt werden, ist projektabhängig. Entscheidend ist eine Due Diligence des Entwicklers (Track-Record, Genehmigungen, Finanzierung, Vertragswerk). Wir empfehlen die Prüfung durch einen unabhängigen thailändischen Anwalt.',
    category: 'process',
  },
  {
    id: 'faq-7',
    question: 'Wie funktioniert die Vermietung und Verwaltung?',
    answer: 'Professionelle Betreiber übernehmen Marketing, Gästekommunikation, Check-in, Reinigung und Instandhaltung. Sie erhalten Zugang zu einem Online-Portal mit Buchungsübersicht und Abrechnungen. Auszahlungen erfolgen meist quartalsweise auf Ihr deutsches oder thailändisches Konto. Typische Betreibergebühr: 15-30% der Mieteinnahmen.',
    category: 'management',
  },
  {
    id: 'faq-8',
    question: 'Welche laufenden Kosten fallen an?',
    answer: 'Common Area Maintenance (CAM): ca. €1.4-€2.2 pro m²/Monat (indikativ). Sinking Fund (einmalig beim Kauf): ca. €11-€17 pro m². Strom/Wasser nach Verbrauch oder pauschal im Betreibervertrag. Versicherung: ca. €80-€220 pro Jahr. Bei Vermietung werden diese Kosten häufig aus den Mieteinnahmen gedeckt.',
    category: 'financial',
  },
  {
    id: 'faq-9',
    question: 'Kann ich die Immobilie selbst nutzen?',
    answer: 'Ja, die meisten Betreiberverträge erlauben 2-8 Wochen Eigennutzung pro Jahr (je nach Vertrag und Saison). Außerhalb des Mietpools können Sie frei über Ihre Immobilie verfügen. Bei Eigennutzung sollten Sie ein Langzeitvisum (z.B. Thailand Elite, Rentner-Visum) prüfen, da Touristenvisa auf 60-90 Tage begrenzt sind.',
    category: 'general',
  },
  {
    id: 'faq-10',
    question: 'Wie kann ich die Immobilie später verkaufen?',
    answer: 'Weiterverkauf ist jederzeit möglich, auch an andere Ausländer (bei Freehold unter Beachtung der 49%-Quote). Der Markt in Phuket ist liquide mit steigender Nachfrage. Wir unterstützen beim Wiederverkauf. Kapitalertragsteuer in Thailand: progressiv bis 35% auf den Gewinn, Freibeträge möglich.',
    category: 'process',
  },
  {
    id: 'faq-11',
    question: 'Welche Unterlagen benötige ich?',
    answer: 'Für die Reservierung: Reisepass-Kopie. Für den Kaufvertrag: Reisepass (notariell beglaubigt für Vollmacht). Für Freehold: Foreign Exchange Transaction Form (Nachweis der Auslandsüberweisung). Für Due Diligence: Wir empfehlen die Prüfung durch einen unabhängigen thailändischen Anwalt.',
    category: 'process',
  },
  {
    id: 'faq-12',
    question: 'Was ist das Währungsrisiko?',
    answer: 'Kaufpreise und Mieteinnahmen werden in Thailand in THB fakturiert. Der Wechselkurs EUR/THB kann über Zeiträume von Monaten bis Jahren schwanken und beeinflusst die EUR-Umrechnung von Cashflow und Exit. Praktische Maßnahmen: THB-Konto für laufende Einnahmen/Ausgaben, Staffelung von Zahlungen, definiertes Wechselkursfenster sowie (bei größeren Beträgen) Absicherung über Bank-/Fintech-Produkte.',
    category: 'financial',
  },
  {
    id: 'faq-13',
    question: 'Brauche ich einen Anwalt?',
    answer: 'Wir empfehlen einen unabhängigen thailändischen Anwalt für Due Diligence und Kaufvertragsprüfung (Kosten: ca. €800-€1,400*). Der Anwalt prüft Baugenehmigungen, Grundbuch, Entwickler-Referenzen und vertritt Sie bei der Eigentumsübertragung. Dies erhöht die Transparenz der Transaktion.',
    category: 'legal',
  },
  {
    id: 'faq-14',
    question: 'Welche Renditen kann ich erwarten?',
    answer: 'Prognostizierte Rendite (ROI) liegt häufig im Bereich von 6-9% p.a. (vor Steuern, nach Betreibergebühren; abhängig von Auslastung und Kosten). Historische Landkapitalisierung in Premiumlagen wird oft im Korridor von 7-10% p.a. berichtet. Dies sind Richtwerte - Ergebnisse können abweichen. Eine individuelle Kalkulation erstellen wir gerne.',
    category: 'financial',
  },
];

// Category arguments for DACH audience
export const categoryArguments = {
  READY: {
    title: 'Sofort verfügbar (Ready)',
    arguments: [
      'Kein Baurisiko: Besichtigung der fertigen Immobilie möglich',
      'Sofortige Mieteinnahmen ab dem ersten Monat',
      'Verifizierbare Vermietungshistorie und Bewertungen',
      'Kürzerer Investitionshorizont möglich',
      'Transparente Kostenstruktur ohne Überraschungen',
    ],
    objections: [
      {
        objection: 'Höherer Einstiegspreis als Off-Plan',
        answer: 'Korrekt, aber ohne Baurisiko und mit sofortigen Einnahmen. Bei Off-Plan binden Sie Kapital 2-3 Jahre ohne Return.',
      },
      {
        objection: 'Weniger Auswahl bei besten Einheiten',
        answer: 'Premium-Einheiten sind oft noch verfügbar, da Erstbesitzer verkaufen. Wir haben Zugang zum Sekundärmarkt.',
      },
      {
        objection: 'Möglicherweise veraltete Ausstattung',
        answer: 'Wir prüfen den Zustand vor Ort. Renovierungskosten können verhandelt oder eingepreist werden.',
      },
    ],
    suitableFor: [
      'Investoren mit kurzem bis mittlerem Horizont (3-5 Jahre)',
      'Wer Baurisiken komplett ausschließen möchte',
      'Personen, die sofortige Mieteinnahmen priorisieren',
    ],
  },
  '2026': {
    title: 'Fertigstellung 2026',
    arguments: [
      'Günstigere Einstiegspreise als Fertigprojekte (Launch-Preise)',
      'Flexible Ratenzahlung über die Bauzeit ohne Bankfinanzierung',
      'Möglichkeit, beste Einheiten (Etage, Ausrichtung) zu sichern',
      'Wertsteigerung zwischen Kauf und Fertigstellung',
      'Möbelpaket oft im Preis enthalten',
    ],
    objections: [
      {
        objection: 'Bauverzögerungen möglich',
        answer: 'Bei etablierten Entwicklern sind Verzögerungen selten und wenn, meist nur wenige Monate. Track-Record prüfen.',
      },
      {
        objection: 'Kapital ist gebunden ohne sofortige Rendite',
        answer: 'Ratenzahlung (z.B. 30/30/40) reduziert die gebundene Summe. Wertsteigerung kompensiert oft die Wartezeit.',
      },
      {
        objection: 'Was wenn der Entwickler insolvent wird?',
        answer: 'Due Diligence ist essentiell: Baugenehmigung, Finanzierung, Track-Record. Escrow-Konten schützen Ihre Zahlungen.',
      },
    ],
    suitableFor: [
      'Investoren mit mittlerem Horizont (5-7 Jahre)',
      'Wer günstigere Einstiegspreise nutzen möchte',
      'Personen, die Kapital über Zeit investieren möchten (Ratenzahlung)',
    ],
  },
  '2027': {
    title: 'Fertigstellung 2027',
    arguments: [
      'Niedrigste Einstiegspreise bei Frühbucher-Konditionen',
      'Maximale Flexibilität bei Ratenzahlungen',
      'Längste Wertsteigerungsphase vor Fertigstellung',
      'Häufig innovative Konzepte und Premium-Lagen',
      'Möglichkeit, spätere Preiserhöhungen zu umgehen',
    ],
    objections: [
      {
        objection: 'Sehr lange Kapitalbindung',
        answer: 'Ratenzahlung minimiert das. Oft nur 20-30% Anzahlung, Rest bei Fertigstellung. Weiterverkauf vor Fertigstellung möglich.',
      },
      {
        objection: 'Höheres Entwicklerrisiko',
        answer: 'Umso wichtiger: nur Entwickler mit nachgewiesener Erfolgsbilanz. Wir prüfen Referenzprojekte.',
      },
      {
        objection: 'Marktentwicklung ungewiss',
        answer: 'Phukets Tourismus zeigt langfristigen Wachstumstrend. Diversifikation über mehrere Objekte reduziert Einzelrisiken.',
      },
    ],
    suitableFor: [
      'Langfristorientierte Investoren (7+ Jahre Horizont)',
      'Wer maximale Frühbucher-Rabatte nutzen möchte',
      'Investoren, die schrittweise Kapital aufbauen',
    ],
  },
};

// Trust bar items
export const trustBarItems = [
  { icon: 'FileText', label: 'Vollständige Dokumentation' },
  { icon: 'Calculator', label: 'Transparente Kosten' },
  { icon: 'Building2', label: 'Geprüfte Betreiber' },
  { icon: 'Globe', label: 'Remote-Kaufprozess' },
];

// Process steps
export const processSteps = [
  {
    step: 1,
    title: 'Erstgespräch',
    description: 'Kostenlose Beratung zu Ihren Zielen, Budget und Zeitrahmen. Video-Call oder Telefonat.',
    documents: null,
  },
  {
    step: 2,
    title: 'Objektauswahl',
    description: 'Passende Objekte basierend auf Ihren Kriterien. Exposés, Grundrisse, Kalkulationen.',
    documents: 'Exposé, Preisliste, Finanzmodell',
  },
  {
    step: 3,
    title: 'Reservierung',
    description: 'Reservierungsvertrag und Anzahlung (typisch €1,400-€2,800*) sichern Ihr Objekt.',
    documents: 'Reservierungsvertrag, Reisepass-Kopie',
  },
  {
    step: 4,
    title: 'Due Diligence',
    description: 'Anwaltliche Prüfung: Baugenehmigungen, Entwickler, Grundbuch, Vertragsbedingungen.',
    documents: 'Anwaltsbericht, Baugenehmigung, Chanote/Grundbuch',
  },
  {
    step: 5,
    title: 'Kaufvertrag',
    description: 'Unterzeichnung des Kaufvertrags. Bei Remote-Kauf: notariell beglaubigte Vollmacht.',
    documents: 'Kaufvertrag (SPA), Vollmacht (falls remote)',
  },
  {
    step: 6,
    title: 'Zahlungen',
    description: 'Ratenzahlungen gemäß Vertrag. SWIFT-Überweisung mit korrekter Referenz.',
    documents: 'Zahlungsplan, FET-Formular (bei Freehold)',
  },
  {
    step: 7,
    title: 'Übergabe',
    description: 'Inspektion, Mängelliste, Eigentumsübertragung beim Land Office.',
    documents: 'Übergabeprotokoll, Chanote/Lease, Schlüssel',
  },
  {
    step: 8,
    title: 'Verwaltung',
    description: 'Einrichtung Betreibervertrag, Übergabe an Management, Zugang zu Reporting-Portal.',
    documents: 'Betreibervertrag, Portal-Zugangsdaten',
  },
];
