import { MessageCircle, Mail, MapPin, AlertTriangle } from 'lucide-react';

// DACH official representative (WhatsApp)
const WHATSAPP_NUMBER = '4369917738276';
const WHATSAPP_DISPLAY = '+43 699 17738276';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pb-24 lg:pb-0">
      {/* Risk Disclaimer */}
      <div className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-300">
              <strong className="text-white">Risikohinweis:</strong> Immobilieninvestitionen 
              sind mit Risiken verbunden, einschließlich des möglichen Verlusts des eingesetzten 
              Kapitals. Die dargestellten Informationen stellen keine Anlageberatung dar und 
              berücksichtigen nicht Ihre persönlichen Umstände. Vergangene Wertentwicklungen 
              sind keine Garantie für zukünftige Ergebnisse. Wechselkursschwankungen können den 
              Wert Ihrer Investition beeinflussen. Wir empfehlen, vor jeder Investitionsentscheidung 
              professionelle Rechts- und Steuerberatung einzuholen.
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display text-xl">P</span>
              </div>
              <span className="font-display text-xl">Phuket Invest</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Immobilienberatung für deutschsprachige Investoren in Thailand. 
              Transparente Prozesse, geprüfte Objekte.
            </p>
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-[#25D366] transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@phuketinvest.pro"
                className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#warum-phuket" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Warum Phuket
                </a>
              </li>
              <li>
                <a href="#prozess" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Kaufprozess
                </a>
              </li>
              <li>
                <a href="#objekte" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Objekte
                </a>
              </li>
              <li>
                <a href="#rechtliches" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Rechtliches
                </a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-white text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-medium text-white mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <a href="/impressum.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Impressum
                </a>
              </li>
              <li>
                <a href="/datenschutz.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Datenschutz
                </a>
              </li>
              <li>
                <a href="/cookie-richtlinie.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  Cookie-Richtlinie
                </a>
              </li>
              <li>
                <a href="/agb.html" className="text-slate-400 hover:text-white text-sm transition-colors">
                  AGB
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-white mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{WHATSAPP_DISPLAY}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>info@phuketinvest.pro</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  Phuket, Thailand<br />
                  (Termine vor Ort nach Vereinbarung)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} Phuket Invest. Alle Rechte vorbehalten.
            </p>
            <p className="text-slate-500 text-xs text-center md:text-right">
              Dieses Angebot ist keine öffentliche Offerte. Alle Informationen, einschließlich Rendite- und Preisangaben, dienen ausschließlich zu Informationszwecken und können sich ändern. ROI-Berechnungen sind prognostisch und hängen von der Marktlage ab. EUR-Preise sind als Referenz zum Kurs vom 01.01.2026 angegeben. Ausländisches Grundeigentum unterliegt dem thailändischen Recht (Leasehold/Company Freehold).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
