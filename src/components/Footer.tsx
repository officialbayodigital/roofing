import React from "react";
import { Phone, Mail, MapPin, ExternalLink, Calendar, Globe } from "lucide-react";
import { COMPANY_INFO, GOOGLE_MAPS_URL } from "../data/roofingData";
import { Logo } from "./Logo";

interface FooterProps {
  onOpenBooking: () => void;
  onScrollToSection: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onScrollToSection }) => {
  return (
    <footer className="bg-[#0A0E14] text-[#94A3B8] border-t border-[#1E2836] pt-20 pb-12 text-xs">
      <div className="max-w-[1200px] mx-auto px-6 space-y-16">
        
        {/* Final CTA Section: Centered single column, headline + button (same style as hero CTA) */}
        <div className="text-center space-y-6 max-w-[700px] mx-auto bg-[#131A28] border border-[#1E2836] rounded-[16px] p-8 md:p-12 blue-glow">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#0A0E14] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            SCHEDULE YOUR ROOF SCAN
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#F1F5F9]">
            Ready to Protect Your Property Investment?
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base leading-relaxed">
            Our certified inspectors provide detailed thermal reports, itemized material options, and transparent fixed-price quotes.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenBooking}
              className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-8 py-3.5 rounded-[8px] text-sm transition-colors shadow-lg shadow-[#3B82F6]/20"
            >
              Book Free Inspection Now
            </button>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <Logo size="lg" showSubtitle={true} subtitleText="Licensed Canadian Roofing Contractor" />
            <p className="text-[#94A3B8] leading-relaxed">
              Certified architectural shingle, flat roof elastomeric membrane, and 24/7 emergency storm restoration specialists.
            </p>
            <div className="text-[11px] text-[#94A3B8] space-y-1">
              <div>{COMPANY_INFO.licenseNumber}</div>
              <div className="text-[#3B82F6] font-semibold">$5M Commercial Liability Insurance</div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F1F5F9] uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>
                <button onClick={() => onScrollToSection("services")} className="hover:text-[#F1F5F9] transition-colors">
                  Residential Shingle Replacement
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection("services")} className="hover:text-[#F1F5F9] transition-colors">
                  Flat Roof Waterproofing (TPO/EPDM)
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection("services")} className="hover:text-[#F1F5F9] transition-colors">
                  24/7 Emergency Storm Leak Repair
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection("ai-inspector")} className="hover:text-[#F1F5F9] transition-colors">
                  AI Thermal Roof Diagnostic
                </button>
              </li>
              <li>
                <button onClick={() => onScrollToSection("services")} className="hover:text-[#F1F5F9] transition-colors">
                  Standing Seam Metal Roofing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Coverage */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F1F5F9] uppercase tracking-wider">Service Coverage</h4>
            <ul className="space-y-2 text-[#94A3B8]">
              <li>Greater Montreal & West Island</li>
              <li>Laval & Laurentians</li>
              <li>South Shore (Longueuil / Brossard)</li>
              <li>Ottawa, Hawkesbury & Gatineau</li>
              <li>Quebec City Regional Metro</li>
            </ul>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#3B82F6] hover:text-[#60A5FA] font-semibold pt-1 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps Listing</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 4: Contact info + Social icons (blue outline style) */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-[#F1F5F9] uppercase tracking-wider">Contact & Dispatch</h4>
            <div className="space-y-2 text-[#94A3B8]">
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-[#3B82F6] font-semibold hover:underline">
                <Phone className="w-4 h-4 text-[#3B82F6]" />
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <div className="flex items-center gap-2 text-[#94A3B8]">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>

            {/* Social icons (blue outline style) */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-[8px] border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Google Maps"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-[8px] border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white flex items-center justify-center transition-colors"
                aria-label="Website Link"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright line + thin #1E2836 top border */}
        <div className="border-t border-[#1E2836] pt-8 flex flex-col sm:flex-row items-center justify-between text-[#94A3B8] gap-4 text-[11px]">
          <div>
            © 2026 KP Roofing Inc. All rights reserved. Registered Roofing Contractor in Canada.
          </div>
          <div className="flex items-center gap-4">
            <span>15-Year Workmanship Warranty</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
