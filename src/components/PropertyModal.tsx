import { useState, useEffect } from 'react';
import { X, MapPin, Maximize2, Euro, Calendar, Download, ChevronLeft, ChevronRight, Check, MessageCircle, Home } from 'lucide-react';
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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleWhatsApp = () => {
    trackEvent('whatsapp_click', { location: 'property_modal', propertyId: property.id });
    // Логика верная: подставляем property.projectName
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

  // Format size range
  const sizeRange = property.sizeSqmFrom === property.sizeSqmTo 
    ? `${property.sizeSqmFrom} m²`
    : `${property.sizeSqmFrom}–${property.sizeSqmTo} m²`;

  return (
    // ИЗМЕНЕНИЕ: z-50 заменено на z-[100], чтобы модальное окно было выше хедера (который z-50)
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal Container - full screen on mobile */}
      <div className="fixed inset-0 sm:inset-4 md:inset-8 lg:inset-12 flex items-stretch sm:items-center justify-center pointer-events-none">
        <div className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col sm:max-w-4xl pointer-events-auto">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Image Gallery */}
            <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-slate-100 flex-shrink-0">
              <img
                src={property.images[currentImageIndex] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'}
                alt={`${property.projectName} - Bild ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-12 sm:right-16 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-600" />
                  </button>
                  {/* Image Indicators */}
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-white w-4' 
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Bild ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex flex-wrap gap-2">
                <span className={`badge ${getCategoryBadgeClass(property.statusCategory)} text-xs sm:text-sm`}>
                  {getCategoryLabel(property.statusCategory)}
                </span>
                <span className="badge bg-white/95 text-slate-700 text-xs sm:text-sm shadow-sm">
                  {property.ownership}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Header: Title, Location, Price */}
              <div className="flex flex-col gap-4 mb-6">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-slate-900 mb-2">
                    {property.projectName}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{property.area}, Phuket</span>
                  </div>
                </div>
                
                {/* Price - prominent on mobile */}
                <div className="bg-brand-50 rounded-xl p-4 sm:p-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Preis ab</div>
                      <div className="font-display text-2xl sm:text-3xl text-brand-600">
                        {formatCurrency(property.priceFromEUR)}
                      </div>
                    </div>
                    {/* Кнопка WhatsApp внутри контента */}
                    <button
                      onClick={handleWhatsApp}
                      className="btn-whatsapp text-sm py-2 px-4"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ... Остальной контент без изменений ... */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                  <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mb-1.5 sm:mb-2" />
                  <div className="text-xs sm:text-sm text-slate-500">Größe</div>
                  <div className="font-medium text-slate-900 text-sm sm:text-base">{sizeRange}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mb-1.5 sm:mb-2" />
                  <div className="text-xs sm:text-sm text-slate-500">Fertigstellung</div>
                  <div className="font-medium text-slate-900 text-sm sm:text-base">{formatCompletion(property.completion)}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                  <Euro className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mb-1.5 sm:mb-2" />
                  <div className="text-xs sm:text-sm text-slate-500">Eigentum</div>
                  <div className="font-medium text-slate-900 text-sm sm:text-base">{property.ownership}</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-brand-500 mb-1.5 sm:mb-2" />
                  <div className="text-xs sm:text-sm text-slate-500">Typ</div>
                  <div className="font-medium text-slate-900 text-sm sm:text-base">
                    {property.propertyType === 'CONDO' ? 'Apartment' : 'Villa'}
                  </div>
                </div>
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-display text-base sm:text-lg text-slate-900 mb-2 sm:mb-3">Beschreibung</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{property.description}</p>
                </div>
              )}

              {/* Highlights */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-display text-base sm:text-lg text-slate-900 mb-2 sm:mb-3">Highlights</h3>
                <ul className="grid sm:grid-cols-2 gap-2 sm:gap-3">
                  {property.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-brand-600" />
                      </div>
                      <span className="text-slate-600 text-sm sm:text-base">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Transparency / Costs */}
              {property.transparency && (
                <div className="mb-6 sm:mb-8 bg-slate-50 rounded-xl p-4 sm:p-6">
                  <h3 className="font-display text-base sm:text-lg text-slate-900 mb-3 sm:mb-4">
                    Kosten & Transparenz
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
                    {property.transparency.camPerSqm && (
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">CAM (pro m²/Monat)</span>
                        <span className="font-medium text-slate-900">{formatEURFromTHB(property.transparency.camPerSqm, 'fee')}</span>
                      </div>
                    )}
                    {property.transparency.sinkingFund && (
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">Sinking Fund (einmalig/m²)</span>
                        <span className="font-medium text-slate-900">{formatEURFromTHB(property.transparency.sinkingFund, 'fee')}</span>
                      </div>
                    )}
                    {property.transparency.transferFee && (
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">Übertragungsgebühr</span>
                        <span className="font-medium text-slate-900">{property.transparency.transferFee}</span>
                      </div>
                    )}
                    {property.transparency.managementFee && (
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">Management-Gebühr</span>
                        <span className="font-medium text-slate-900">{property.transparency.managementFee}</span>
                      </div>
                    )}
                    {property.transparency.notes && (
                      <div className="col-span-full pt-2 border-t border-slate-200">
                        <span className="text-slate-500 text-xs sm:text-sm">{property.transparency.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Operator Model */}
              {property.operatorModel && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-display text-base sm:text-lg text-slate-900 mb-2 sm:mb-3">Betreibermodell</h3>
                  <p className="text-slate-600 text-sm sm:text-base">{property.operatorModel}</p>
                </div>
              )}

              {/* Documents */}
              {property.docs.length > 0 && (
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-display text-base sm:text-lg text-slate-900 mb-2 sm:mb-3">Dokumente</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {property.docs.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDocumentClick(doc)}
                        className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-xs sm:text-sm font-medium text-slate-700"
                      >
                        <Download className="w-4 h-4" />
                        {doc.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sticky Footer Actions - always visible on mobile */}
          <div className="flex-shrink-0 p-4 sm:p-6 border-t border-slate-200 bg-white">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Кнопка WhatsApp в футере модального окна */}
              <button
                onClick={handleWhatsApp}
                className="btn-whatsapp flex-1 py-3"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp-Anfrage senden
              </button>
              <button
                onClick={onClose}
                className="btn-secondary flex-1 py-3 hidden sm:flex"
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
