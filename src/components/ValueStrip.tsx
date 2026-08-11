import React from "react";
import { ShieldCheck, Award, Clock, CheckCircle2 } from "lucide-react";

export const ValueStrip: React.FC = () => {
  return (
    <section id="overview" className="bg-[#0F1420] border-y border-[#1E2836] py-20 md:py-24 px-6 text-center">
      <div className="max-w-[1200px] mx-auto space-y-8">
        
        {/* Statement */}
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F1F5F9] tracking-tight leading-snug">
            "Engineered to protect Canadian properties against heavy ice dams, freeze-thaw cycles, and hurricane-force winds."
          </h2>
          <p className="text-[#94A3B8] text-sm md:text-base mt-3">
            Fully licensed contractors with $5,000,000 commercial liability coverage and 50-year material warranties.
          </p>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[1000px] mx-auto pt-4 text-left">
          <div className="bg-[#131A28] border border-[#1E2836] p-4 rounded-[12px] flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#3B82F6] flex-shrink-0" />
            <div>
              <div className="text-[#F1F5F9] font-semibold text-xs md:text-sm">50-Year Warranty</div>
              <div className="text-[#94A3B8] text-[11px]">Shingle & TPO protection</div>
            </div>
          </div>

          <div className="bg-[#131A28] border border-[#1E2836] p-4 rounded-[12px] flex items-center gap-3">
            <Clock className="w-6 h-6 text-[#3B82F6] flex-shrink-0" />
            <div>
              <div className="text-[#F1F5F9] font-semibold text-xs md:text-sm">24/7 Dispatch</div>
              <div className="text-[#94A3B8] text-[11px]">Emergency storm repair</div>
            </div>
          </div>

          <div className="bg-[#131A28] border border-[#1E2836] p-4 rounded-[12px] flex items-center gap-3">
            <Award className="w-6 h-6 text-[#3B82F6] flex-shrink-0" />
            <div>
              <div className="text-[#F1F5F9] font-semibold text-xs md:text-sm">4.9★ Rating</div>
              <div className="text-[#94A3B8] text-[11px]">384+ Google Reviews</div>
            </div>
          </div>

          <div className="bg-[#131A28] border border-[#1E2836] p-4 rounded-[12px] flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-[#3B82F6] flex-shrink-0" />
            <div>
              <div className="text-[#F1F5F9] font-semibold text-xs md:text-sm">Certified Crew</div>
              <div className="text-[#94A3B8] text-[11px]">Licensed RBQ #5832</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
