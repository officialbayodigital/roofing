import React from "react";
import { Calendar, Phone } from "lucide-react";
import { COMPANY_INFO } from "../data/roofingData";

interface MidCtaBannerProps {
  onOpenBooking: () => void;
}

export const MidCtaBanner: React.FC<MidCtaBannerProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-[#1D4ED8] text-white py-16 md:py-20 px-6">
      <div className="max-w-[1200px] mx-auto text-center space-y-6">
        
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-[800px] mx-auto">
          Need Emergency Leak Service or a Free In-Person Roof Estimate?
        </h2>

        <p className="text-white/90 text-base md:text-lg max-w-[650px] mx-auto">
          Our certified mobile crew is equipped for same-day dispatch across Montreal, Laval, West Island, and Ottawa.
        </p>

        {/* High-contrast button (white bg, #1D4ED8 text) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-white text-[#1D4ED8] hover:bg-slate-100 font-semibold px-8 py-3.5 rounded-[8px] text-sm transition-colors shadow-lg"
          >
            Schedule Free Inspection
          </button>

          <a
            href={`tel:${COMPANY_INFO.phone}`}
            className="w-full sm:w-auto border border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-[8px] text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-white" />
            <span>Call {COMPANY_INFO.phone}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
