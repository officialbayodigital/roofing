import React from "react";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";

interface ServiceExplanationProps {
  onOpenBooking: () => void;
}

export const ServiceExplanation: React.FC<ServiceExplanationProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-20 md:py-24 px-6 bg-[#0A0E14] text-[#F1F5F9]">
      <div className="max-w-[1200px] mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Text Left (60% split -> md:col-span-7) */}
          <div className="md:col-span-7 space-y-6">
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
              COMPLETE ROOFING EXCELLENCE
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Turnkey Roofing, Emergency Repairs & Thermal Diagnostic Scans
            </h2>

            <p className="text-[#94A3B8] text-base leading-relaxed">
              KP Roofing delivers comprehensive roofing solutions engineered for Canadian weather extremes. From complete residential asphalt shingle replacements to commercial elastomeric flat roof installations, our certified crews bring industrial-grade standards to every project.
            </p>

            {/* Bullet points */}
            <ul className="space-y-3 pt-2 text-[#F1F5F9] text-sm">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#131A28] border border-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#3B82F6]" />
                </div>
                <span>
                  <strong className="text-[#F1F5F9]">Thermal Diagnostic Technology:</strong> Infrared moisture detection maps trapped water before interior leaks manifest.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#131A28] border border-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#3B82F6]" />
                </div>
                <span>
                  <strong className="text-[#F1F5F9]">Heavy Winter Snow & Ice Armor:</strong> Synthetic underlayments and ice-and-water shields at eaves and valleys.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#131A28] border border-[#3B82F6] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#3B82F6]" />
                </div>
                <span>
                  <strong className="text-[#F1F5F9]">2-Hour Rapid Emergency Response:</strong> On-call mobile dispatch units ready for active leaks and storm emergencies.
                </span>
              </li>
            </ul>

            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-6 py-3 rounded-[8px] transition-colors flex items-center gap-2 text-sm"
              >
                <span>Request Inspection Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Image Right (40% split -> md:col-span-5) */}
          <div className="md:col-span-5">
            <div className="relative rounded-[16px] overflow-hidden border border-[#1E2836] blue-glow bg-[#131A28]">
              <img
                src="https://res.cloudinary.com/d1hu7aww/image/upload/v1786481577/Ridge_and_Hip_Tile_Work_Essential_for_a_Secure_Roof.jpg"
                alt="KP Roofing Craftsmanship - Ridge and Hip Tile Work"
                className="w-full h-[380px] object-cover object-center opacity-95 transition-transform duration-500 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#131A28]/90 backdrop-blur-md border border-[#1E2836] rounded-[12px]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#3B82F6]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Licensed & Certified Installer</span>
                </div>
                <div className="text-[11px] text-[#94A3B8] mt-1">
                  15-Year KP Workmanship Guarantee on All Full Replacements
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
