import React, { useState } from "react";
import {
  Home,
  Building2,
  Siren,
  Scan,
  ShieldCheck,
  Droplets,
  Check,
  Calendar,
  ArrowRight,
  Clock,
} from "lucide-react";
import { SERVICES } from "../data/roofingData";

interface ServicesGridProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService }) => {
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial" | "emergency" | "maintenance">("all");

  const filteredServices = activeTab === "all" ? SERVICES : SERVICES.filter((s) => s.category === activeTab);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Home":
        return <Home className="w-6 h-6 text-[#3B82F6]" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-[#3B82F6]" />;
      case "Siren":
        return <Siren className="w-6 h-6 text-[#3B82F6]" />;
      case "Scan":
        return <Scan className="w-6 h-6 text-[#3B82F6]" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6 text-[#3B82F6]" />;
      default:
        return <Droplets className="w-6 h-6 text-[#3B82F6]" />;
    }
  };

  return (
    <section id="services" className="py-20 md:py-24 bg-[#0A0E14] border-t border-[#1E2836] text-[#F1F5F9] px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            SPECIALIZED ROOFING SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Canadian Weather-Tested Solutions
          </h2>
          <p className="text-[#94A3B8] text-base">
            Engineered to withstand heavy snow loads, ice dams, freeze-thaw cycles, and summer moisture.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Services" },
              { id: "residential", label: "Residential" },
              { id: "commercial", label: "Commercial Flat Roof" },
              { id: "emergency", label: "24/7 Emergency" },
              { id: "maintenance", label: "Inspections & Gutters" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#3B82F6] text-white"
                    : "bg-[#131A28] text-[#94A3B8] hover:bg-[#1E2836] border border-[#1E2836]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-[#131A28] border rounded-[16px] p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                service.popular
                  ? "border-[#3B82F6] shadow-lg shadow-[#3B82F6]/10 relative"
                  : "border-[#1E2836] hover:border-[#3B82F6]"
              }`}
            >
              {service.popular && (
                <span className="absolute -top-3 right-6 bg-[#3B82F6] text-white font-semibold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  Most Requested
                </span>
              )}

              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#0A0E14] rounded-[12px] border border-[#1E2836] flex items-center justify-center">
                  {getIcon(service.iconName)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#F1F5F9]">{service.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1E2836]">
                  <span className="text-[#3B82F6] font-semibold">{service.priceRange}</span>
                  <span className="text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {service.duration}
                  </span>
                </div>

                {/* Features list */}
                <ul className="space-y-2 pt-2 text-xs text-[#94A3B8]">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold py-2.5 px-4 rounded-[8px] text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
