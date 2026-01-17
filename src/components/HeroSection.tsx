import { ArrowRight, MessageCircle, FileText, Calculator, Building2, Globe } from 'lucide-react';
import { scrollToElement, getWhatsAppLink } from '../utils/format';
import { useAnalytics } from '../hooks/useAnalytics';

// DACH official representative (WhatsApp)
const WHATSAPP_NUMBER = '4369917738276';

const trustItems = [
  { icon: FileText, label: 'Vollständige Dokumentation' },
  { icon: Calculator, label: 'Transparente Kosten' },
  { icon: Building2, label: 'Geprüfte Betreiber' },
  { icon: Globe, label: 'Remote-Kaufprozess' },
];

export default function HeroSection() {
  const { trackEvent } = useAnalytics();

  const handleCTAClick = (type: 'consultation' | 'whatsapp' | 'projects') => {
    trackEvent('CTA_click', { location: 'hero', type });
    
    if (type === 'whatsapp') {
      window.open(getWhatsAppLink(WHATSAPP_NUMBER, 'Hallo, ich interessiere mich für Immobilieninvestments auf Phuket. Bitte senden Sie mir Verfügbarkeit, Preisspannen (EUR indikativ) und ein Finanzmodell.'), '_blank');
    } else if (type === 'projects') {
      scrollToElement('objekte');
    } else {
      scrollToElement('kontakt');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1920&q=80"
          alt="Phuket Strand und Luxusresort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">
              Investitionsstrategie 2026
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6 animate-slide-up">
            Immobilien auf Phuket
            <span className="block text-brand-300">für DACH-Investoren</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl animate-slide-up animate-delay-100">
            Portfoliodiversifikation in Asien. Transparenter Prozess von der Objektauswahl 
            bis zur Verwaltung. Einstieg ab ca. €85,000*.
            *EUR-Preise sind indikativ - verbindliche Preise werden in THB festgelegt.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up animate-delay-200">
            <button
              onClick={() => handleCTAClick('consultation')}
              className="btn-primary text-base !px-8 !py-4"
            >
              Berechnung erhalten
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleCTAClick('whatsapp')}
              className="btn-whatsapp text-base !px-8 !py-4"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp-Anfrage
            </button>
          </div>

          {/* Secondary CTA */}
          <button
            onClick={() => handleCTAClick('projects')}
            className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-medium transition-colors animate-slide-up animate-delay-300"
          >
            Verfügbarkeit der Einheiten prüfen
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-brand-300" />
                </div>
                <span className="text-white/90 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
