import React from "react";
import {
  ShieldCheck,
  Zap,
  FileCheck2,
  Clock,
  Scan,
  Coins,
  Snowflake,
  Sparkles,
} from "lucide-react";

export const Benefits: React.FC = () => {
  const benefitCards = [
    {
      icon: ShieldCheck,
      title: "25-Year Shingle Protection",
      description: "Weather-tested architectural shingles resistant to 160 MPH wind uplift and hail.",
    },
    {
      icon: Clock,
      title: "2-Hour Emergency Dispatch",
      description: "24/7 on-call mobile units dispatched immediately for severe storm leaks.",
    },
    {
      icon: Scan,
      title: "AI Thermal Moisture Scan",
      description: "Infrared diagnostic technology pinpoints trapped insulation moisture with zero guesswork.",
    },
    {
      icon: Snowflake,
      title: "Canadian Winter Armor",
      description: "Multi-layered ice and water barriers prevent severe roof ice damming.",
    },
    {
      icon: FileCheck2,
      title: "Direct Insurance Support",
      description: "Comprehensive photo audit documentation formatted specifically for insurance claims.",
    },
    {
      icon: Coins,
      title: "Transparent Fixed Pricing",
      description: "Detailed itemized quotes valid for 60 days with zero surprise fees.",
    },
  ];

  return (
    <section id="benefits" className="py-20 md:py-24 px-6 bg-[#0F1420] border-t border-[#1E2836]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            WHY HOMEOWNERS CHOOSE KP ROOFING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Built for Extreme Canadian Climates
          </h2>
          <p className="text-[#94A3B8] text-base">
            Every installation adheres to strict engineering standards for maximum durability and peace of mind.
          </p>
        </div>

        {/* 3-4 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitCards.map((b, idx) => {
            const IconComponent = b.icon;
            return (
              <div
                key={idx}
                className="bg-[#131A28] border border-[#1E2836] rounded-[16px] p-6 transition-all duration-300 hover:border-[#3B82F6] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-[12px] bg-[#0A0E14] border border-[#1E2836] flex items-center justify-center text-[#3B82F6]">
                    <IconComponent className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#F1F5F9]">{b.title}</h3>
                    <p className="text-[#94A3B8] text-sm mt-1.5 leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
