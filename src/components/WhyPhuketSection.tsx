import { TrendingUp, Sun, Users, BarChart3, Shield, Plane } from 'lucide-react';

const stats = [
  {
    value: '9-10 Mio.',
    label: 'Touristen 2025',
    description: 'Phuket als Premium-Destination (indikativ)',
  },
  {
    value: '7-10%',
    label: 'Landkapitalisierung p.a.',
    description: 'Historischer Korridor in Premiumlagen',
  },
  {
    value: '6-9%',
    label: 'Prognose ROI p.a.',
    description: 'nach Gebühren, vor Steuern',
  },
  {
    value: '€3,850/m²',
    label: 'Ø Condo-Preisindikator 2025',
    description: 'Neuprojekte (indikativ)',
  },
];

const arguments_list = [
  {
    icon: TrendingUp,
    title: 'Wertsteigerungspotenzial',
    description: 'Begrenztes Bauland in Premiumlagen. Historische Landkapitalisierung im Korridor von 7-10% p.a. (je nach Lage und Zyklus).',
  },
  {
    icon: Sun,
    title: 'Saisonale Diversifikation',
    description: 'Hochsaison November-April: Wenn in Europa Winter herrscht, ist Phuket ausgebucht. Optimale Ergänzung zu europäischen Portfolios.',
  },
  {
    icon: Users,
    title: 'Stabile Nachfrage',
    description: 'Nachfrage durch Tourismus, Langzeitaufenthalte und Zuzug. Angebot in etablierten Lagen ist begrenzt; neue Flächen sind knapp.',
  },
  {
    icon: BarChart3,
    title: 'Attraktive Renditen',
    description: 'Prognostizierte Rendite (ROI) 6-9% p.a. (vor Steuern). Cashflow hängt von Auslastung, Betreiberstruktur und Kosten ab.',
  },
  {
    icon: Shield,
    title: 'Rechtliche Sicherheit',
    description: 'Strukturen: Leasehold (bis 90 Jahre) oder Freehold über thailändische Gesellschaft. Due Diligence pro Objekt vor Vertragsabschluss.',
  },
  {
    icon: Plane,
    title: 'Erreichbarkeit',
    description: 'Direktflüge aus DACH (Frankfurt, Zürich, Wien). Phuket International Airport mit 15+ Mio. Passagieren jährlich.',
  },
];

export default function WhyPhuketSection() {
  return (
    <section id="warum-phuket" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Marktanalyse
          </span>
          <h2 className="section-title mb-6">
            Warum Phuket für DACH-Investoren?
          </h2>
          <p className="section-subtitle">
            Faktenbasierte Argumente für die Portfoliodiversifikation in Thailands 
            führender Tourismus-Destination.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100"
            >
              <div className="font-display text-3xl md:text-4xl text-brand-600 mb-2">
                {stat.value}
              </div>
              <div className="font-medium text-slate-900 mb-1">{stat.label}</div>
              <div className="text-sm text-slate-500">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Arguments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {arguments_list.map((item, index) => (
            <div key={index} className="group">
              <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4 group-hover:bg-brand-600 transition-colors">
                <item.icon className="w-6 h-6 text-brand-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display text-xl text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-16 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-amber-800 text-sm">
            <strong>Hinweis:</strong> Die genannten Zahlen basieren auf historischen Marktdaten und 
            öffentlich verfügbaren Quellen. Vergangene Wertentwicklungen sind keine Garantie für 
            zukünftige Ergebnisse. Eine individuelle Analyse und professionelle Beratung wird empfohlen.
          </p>
        </div>
      </div>
    </section>
  );
}
