import { useState } from 'react';
import { X, MapPin, Maximize2, Euro, Calendar, FileText, Download, ChevronLeft, ChevronRight, Check, MessageCircle } from 'lucide-react';
import type { Property } from '../types';
import { formatCurrency, getCategoryBadgeClass, getCategoryLabel, formatCompletion, getWhatsAppLink, formatEURFromTHB } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

// DACH official representative (WhatsApp)
const WHATSAPP_NUMBER = '4369917738276';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { trackEvent } = useAnalytics();

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'property_modal', propertyId: property.id });
    const message = `Hallo, ich interessiere mich für das Objekt "${property.projectName}" in ${property.area}. Bitte senden Sie mir weitere Informationen.`;
    window.open(getWhatsAppLink(WHATSAPP_NUMBER, message), '_blank');
  };

  const handleDocumentClick = (doc: { title: string; url: string }) => {
    trackEvent('document_download', { 
      propertyId: property.id, 
      documentTitle: doc.title 
    });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          <div className="relative aspect-[16/9] bg-slate-100">
            <img
              src={property.images[currentImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'}
              alt={`${property.projectName} - Bild ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-600" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-slate-600" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute top-4 left-4 flex gap-2">
              <span className={`badge ${getCategoryBadgeClass(property.statusCategory)}`}>
                {getCategoryLabel(property.statusCategory)}
              </span>
              <span className="badge bg-white/90 text-slate-700">
                {property.ownership}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h2 className="font-display text-2xl md:text-3xl text-slate-900 mb-2">
                  {property.projectName}
                </h2>
                <div className="flex items-center gap-2 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>{property.area}, Phuket</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-500 mb-1">Ab</div>
                <div className="font-display text-3xl text-brand-600">
                  {formatCurrency(property.priceFromEUR)}
                </div>
              <div className="text-sm text-slate-400">Preise in EUR indikativ*</div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-slate-50 rounded-xl p-4">
                <Maximize2 className="w-5 h-5 text-brand-500 mb-2" />
                <div className="text-sm text-slate-500">Größe</div>
                <div className="font-medium text-slate-900">{property.sizeSqmFrom}-{property.sizeSqmTo} m²</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <Calendar className="w-5 h-5 text-brand-500 mb-2" />
                <div className="text-sm text-slate-500">Fertigstellung</div>
                <div className="font-medium text-slate-900">{formatCompletion(property.completion)}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <Euro className="w-5 h-5 text-brand-500 mb-2" />
                <div className="text-sm text-slate-500">Eigentum</div>
                <div className="font-medium text-slate-900">{property.ownership}</div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <FileText className="w-5 h-5 text-brand-500 mb-2" />
                <div className="text-sm text-slate-500">Typ</div>
                <div className="font-medium text-slate-900">{property.propertyType}</div>
              </div>
            </div>

            {property.description && (
              <div className="mb-8">
                <h3 className="font-display text-lg text-slate-900 mb-3">Beschreibung</h3>
                <p className="text-slate-600 leading-relaxed">{property.description}</p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="font-display text-lg text-slate-900 mb-3">Highlights</h3>
              <ul className="grid md:grid-cols-2 gap-3">
                {property.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-brand-600" />
                    </div>
                    <span className="text-slate-600">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {property.transparency && (
              <div className="mb-8 bg-slate-50 rounded-xl p-6">
                <h3 className="font-display text-lg text-slate-900 mb-4">
                  Kosten & Transparenz
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {property.transparency.camPerSqm && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">CAM (pro m²/Monat)</span>
                      <span className="font-medium text-slate-900">{formatEURFromTHB(property.transparency.camPerSqm, 'fee')}</span>
                    </div>
                  )}
                  {property.transparency.sinkingFund && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Sinking Fund (einmalig/m²)</span>
                      <span className="font-medium text-slate-900">{formatEURFromTHB(property.transparency.sinkingFund, 'fee')}</span>
                    </div>
                  )}
                  {property.transparency.transferFee && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Übertragungsgebühr</span>
                      <span className="font-medium text-slate-900">{property.transparency.transferFee}</span>
                    </div>
                  )}
                  {property.transparency.managementFee && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Management-Gebühr</span>
                      <span className="font-medium text-slate-900">{property.transparency.managementFee}</span>
                    </div>
                  )}
                  {property.transparency.notes && (
                    <div className="col-span-2 pt-2 border-t border-slate-200">
                      <span className="text-slate-500">{property.transparency.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {property.operatorModel && (
              <div className="mb-8">
                <h3 className="font-display text-lg text-slate-900 mb-3">Betreibermodell</h3>
                <p className="text-slate-600">{property.operatorModel}</p>
              </div>
            )}

            {property.docs.length > 0 && (
              <div className="mb-8">
                <h3 className="font-display text-lg text-slate-900 mb-3">Dokumente</h3>
                <div className="flex flex-wrap gap-3">
                  {property.docs.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleDocumentClick(doc)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700"
                    >
                      <Download className="w-4 h-4" />
                      {doc.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-200">
              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp flex-1"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp-Anfrage
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex-1"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
