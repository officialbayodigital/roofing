import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenAiInspector: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenAiInspector,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 px-6 overflow-hidden bg-[#0A0E14]">
      {/* Background image with dark linear gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1632759145351-1d592919f522?auto=format&fit=crop&w=2000&q=80"
          alt="Dark Roof Structure"
          className="w-full h-full object-cover object-center grayscale contrast-125 opacity-25"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10,14,20,0.65) 0%, rgba(10,14,20,0.92) 100%)",
          }}
        />
        {/* Glowing radial accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Content in single centered column max-width 720px */}
      <div className="relative z-10 max-w-[720px] mx-auto text-center flex flex-col items-center">
        
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-xs font-bold text-[#3B82F6] uppercase tracking-widest bg-[#131A28] border border-[#1E2836] px-4 py-1.5 rounded-full mb-6 shadow-sm">
            LICENSED CANADIAN CONTRACTOR • KP ROOFING
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[34px] md:text-[58px] font-black text-[#F1F5F9] leading-[1.12] tracking-tight mb-5"
        >
          Precision Roofing & Roof Inspection Services
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-[#94A3B8] leading-relaxed max-w-[620px] mb-8"
        >
          Canada's certified roofing specialists. Engineered for extreme weather durability, 24/7 leak dispatch, and transparent digital thermal roof inspections.
        </motion.p>

        {/* Curved CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2.5 text-sm shadow-xl shadow-[#3B82F6]/25 border border-white/10"
          >
            <span>Book Free Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenAiInspector}
            className="w-full sm:w-auto bg-[#131A28]/90 hover:bg-[#1E2836] border border-[#1E2836] hover:border-[#3B82F6] text-[#F1F5F9] font-semibold px-7 py-4 rounded-full transition-all flex items-center justify-center gap-2 text-sm backdrop-blur-sm"
          >
            <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
            <span>AI Diagnostic Tool</span>
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
