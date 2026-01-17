import { Scale, FileCheck, AlertTriangle, Shield } from 'lucide-react';

const ownershipTypes = [
  {
    type: 'Freehold',
    title: 'Volleigentum',
    description: 'Echtes Eigentum auf Ihren Namen mit Chanote-Urkunde. Nur für Condominiums verfügbar.',
    pros: [
      'Vollständiges Eigentumsrecht wie in DACH',
      'Uneingeschränkte Vererbbarkeit',
      'Kein Ablaufdatum der Eigentumsrechte',
    ],
    cons: [
      'Nur für Condos (max. 49% Ausländerquote pro Gebäude)',
      'Höhere Übertragungsgebühren (ca. 6,3%)',
      'Limitierte Verfügbarkeit in beliebten Projekten',
    ],
    suitableFor: 'Langfristinvestoren, Erben-Planung, Sicherheitsorientierte',
  },
  {
    type: 'Leasehold',
    title: 'Langzeitpacht',
    description: '30-jähriger Pachtvertrag mit Option auf Verlängerung (30+30+30 = 90 Jahre).',
    pros: [
      '5-10% günstigerer Kaufpreis',
      'Niedrigere Übertragungsgebühr (1,1%)',
      'Auch für Villen und Grundstücke möglich',
    ],
    cons: [
      'Verlängerung ist vertraglich, nicht gesetzlich garantiert',
      'Theoretisches Risiko bei Projektübergang',
      'Möglicherweise schwieriger zu finanzieren',
    ],
    suitableFor: 'ROI-optimierte Investoren, mittlerer Horizont (5-10 Jahre), Villa-Käufer',
  },
];

export default function LegalSection() {
  return (
    <section id="rechtliches" className="py-20 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Rechtlicher Rahmen
          </span>
          <h2 className="section-title mb-6">
            Eigentumsformen in Thailand
          </h2>
          <p className="section-subtitle">
            Transparente Darstellung der rechtlichen Optionen für ausländische Käufer. 
            Professionelle Begleitung durch einen unabhängigen Anwalt wird empfohlen.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {ownershipTypes.map((ownership) => (
            <div key={ownership.type} className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center">
                  {ownership.type === 'Freehold' ? (
                    <Shield className="w-6 h-6 text-brand-600" />
                  ) : (
                    <FileCheck className="w-6 h-6 text-brand-600" />
                  )}
                </div>
                <div>
                  <span className="text-sm font-medium text-brand-600">{ownership.type}</span>
                  <h3 className="font-display text-xl text-slate-900">{ownership.title}</h3>
                </div>
              </div>

              <p className="text-slate-600 mb-6">{ownership.description}</p>

              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-emerald-700 mb-2">Vorteile</h4>
                  <ul className="space-y-2">
                    {ownership.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-emerald-500 mt-1">+</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-amber-700 mb-2">Zu beachten</h4>
                  <ul className="space-y-2">
                    {ownership.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="text-amber-500 mt-1">–</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-500">
                  <strong>Geeignet für:</strong> {ownership.suitableFor}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 border border-slate-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-display text-xl text-slate-900 mb-2">
                Wichtiger Hinweis zur Due Diligence
              </h3>
              <p className="text-slate-600">
                Unabhängig von der gewählten Eigentumsform empfehlen wir dringend:
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl p-5">
              <Scale className="w-6 h-6 text-brand-600 mb-3" />
              <h4 className="font-medium text-slate-900 mb-2">Unabhängige Anwaltsprüfung</h4>
              <p className="text-sm text-slate-600">
                Beauftragen Sie einen vom Verkäufer unabhängigen thailändischen Anwalt 
                zur Prüfung aller Verträge, Genehmigungen und Grundbucheinträge.
                Kosten: ca. €800-€1,400*.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <FileCheck className="w-6 h-6 text-brand-600 mb-3" />
              <h4 className="font-medium text-slate-900 mb-2">Entwickler-Prüfung</h4>
              <p className="text-sm text-slate-600">
                Recherche der Erfolgsbilanz des Entwicklers: Fertiggestellte Projekte, 
                Bauverzögerungen, Finanzierungsnachweise, Baugenehmigungen und EIA-Genehmigung.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-100 rounded-xl">
            <p className="text-sm text-slate-600">
              <strong>Haftungsausschluss:</strong> Diese Informationen dienen nur der allgemeinen 
              Orientierung und ersetzen keine professionelle Rechtsberatung. Thailändisches Recht 
              unterliegt Änderungen. Lassen Sie sich stets individuell beraten.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
