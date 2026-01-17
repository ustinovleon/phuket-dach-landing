import { useState } from 'react';
import type { Property, StatusCategory } from '../types';
import { useData } from '../context/DataContext';
import PropertyCard from './PropertyCard';
import PropertyModal from './PropertyModal';
import { categoryArguments } from '../data/demo-data';
import { useAnalytics } from '../hooks/useAnalytics';
import { Check, AlertCircle, HelpCircle } from 'lucide-react';

const tabs: { id: StatusCategory; label: string }[] = [
  { id: 'READY', label: 'Sofort verfügbar' },
  { id: '2026', label: 'Fertigstellung 2026' },
  { id: '2027', label: 'Fertigstellung 2027' },
];

export default function PropertiesSection() {
  const { propertiesByCategory, isLoading } = useData();
  const [activeTab, setActiveTab] = useState<StatusCategory>('2026');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { trackEvent } = useAnalytics();

  const handleTabChange = (tab: StatusCategory) => {
    trackEvent('tab_switch', { from: activeTab, to: tab });
    setActiveTab(tab);
  };

  const currentProperties = propertiesByCategory[activeTab];
  const currentArguments = categoryArguments[activeTab];

  if (isLoading) {
    return (
      <section id="objekte" className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-200 rounded w-1/3" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-200 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="objekte" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-brand-600 font-medium text-sm tracking-wide uppercase mb-3 block">
            Objektkatalog
          </span>
          <h2 className="section-title mb-6">
            Ausgewählte Projekte für DACH-Investoren
          </h2>
          <p className="section-subtitle">
            Geprüfte Objekte mit transparenter Kostenstruktur. 
            Sortiert nach Verfügbarkeit und Fertigstellungszeitpunkt.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-slate-100 rounded-xl inline-flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? 'bg-brand-100 text-brand-700'
                  : 'bg-slate-200 text-slate-500'
              }`}>
                {propertiesByCategory[tab.id].length}
              </span>
            </button>
          ))}
        </div>

        {currentArguments && (
          <div className="mb-12 grid lg:grid-cols-3 gap-6">
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-100">
              <div className="flex items-center gap-2 mb-4">
                <Check className="w-5 h-5 text-brand-600" />
                <h3 className="font-display text-lg text-slate-900">Vorteile</h3>
              </div>
              <ul className="space-y-2">
                {currentArguments.arguments.slice(0, 4).map((arg, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-brand-500 mt-1">•</span>
                    {arg}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h3 className="font-display text-lg text-slate-900">Häufige Bedenken</h3>
              </div>
              <ul className="space-y-3">
                {currentArguments.objections.slice(0, 2).map((obj, i) => (
                  <li key={i} className="text-sm">
                    <div className="font-medium text-slate-700 mb-1">{obj.objection}</div>
                    <div className="text-slate-500">{obj.answer}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-5 h-5 text-slate-600" />
                <h3 className="font-display text-lg text-slate-900">Geeignet für</h3>
              </div>
              <ul className="space-y-2">
                {currentArguments.suitableFor.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {currentProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl">
            <p className="text-slate-500 mb-4">
              Aktuell keine Objekte in dieser Kategorie verfügbar.
            </p>
            <p className="text-sm text-slate-400">
              Kontaktieren Sie uns für aktuelle Angebote.
            </p>
          </div>
        )}

        <div className="mt-8 p-4 bg-slate-50 rounded-xl text-sm text-slate-500">
          <strong>Hinweis:</strong> Die angezeigten Preise sind Richtwerte und können je nach 
          Einheit, Etage und aktueller Verfügbarkeit variieren. Verbindliche Preise erhalten 
          Sie auf Anfrage.
        </div>
      </div>

      {selectedProperty && (
        <PropertyModal
          property={selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      )}
    </section>
  );
}
