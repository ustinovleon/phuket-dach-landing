import { MapPin, Maximize2, Calendar, FileText, ChevronRight } from 'lucide-react';
import type { Property } from '../types';
import { formatCurrency, getCategoryBadgeClass, getCategoryLabel, formatCompletion } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const { trackEvent } = useAnalytics();

  const handleClick = () => {
    trackEvent('object_open', { 
      propertyId: property.id, 
      projectName: property.projectName,
      category: property.statusCategory 
    });
    onSelect(property);
  };

  return (
    <div 
      className="card cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'}
          alt={property.projectName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`badge ${getCategoryBadgeClass(property.statusCategory)}`}>
            {getCategoryLabel(property.statusCategory)}
          </span>
          <span className="badge bg-white/90 text-slate-700">
            {property.ownership}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display text-xl text-slate-900 group-hover:text-brand-600 transition-colors">
            {property.projectName}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
          <MapPin className="w-4 h-4" />
          <span>{property.area}, Phuket</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span className="text-sm">{property.sizeSqmFrom}-{property.sizeSqmTo} m²</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm">{formatCompletion(property.completion)}</span>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-slate-500 mb-1">Ab</div>
              <div className="font-display text-2xl text-brand-600">
                {formatCurrency(property.priceFromEUR)}
              </div>
              <div className="text-xs text-slate-400">
                Preise in EUR indikativ*
              </div>
            </div>
            <button className="flex items-center gap-1 text-brand-600 font-medium text-sm hover:gap-2 transition-all">
              Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {property.docs.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
            {property.docs.slice(0, 2).map((doc, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded"
              >
                <FileText className="w-3 h-3" />
                {doc.title}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
