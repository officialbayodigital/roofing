import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How long does a full residential roof replacement take?",
      a: "Most residential architectural shingle replacements (up to 3,000 sq ft) are completed in 1 to 2 days. Our crew arrives at 7:00 AM, protects your landscaping with tarps, removes old shingles, installs leak barriers, and cleans up thoroughly with magnetic sweepers.",
    },
    {
      q: "Are thermal moisture drone inspections really free?",
      a: "Yes! Every quote includes a complimentary HD aerial inspection and infrared FLIR thermal scan to pinpoint trapped moisture, insulation voids, and structural flashing wear without any obligation.",
    },
    {
      q: "How fast is your 24/7 emergency leak dispatch service?",
      a: "Our emergency mobile response units are guaranteed to arrive at your property within 2 hours during active weather events in Greater Montreal, Laval, West Island, and Ottawa.",
    },
    {
      q: "What warranties do you offer on new installations?",
      a: "We offer up to a 25-Year Limited Material Warranty on architectural shingles and flat roof membranes, backed by KP Roofing's 15-Year Transferable Workmanship Guarantee.",
    },
    {
      q: "Do you help with insurance claims after storm or ice damage?",
      a: "Yes. We provide complete itemized damage photo audits, thermal moisture maps, and repair estimates formatted specifically to expedite approval with Canadian insurance providers.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-24 px-6 bg-[#0A0E14] border-t border-[#1E2836]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Everything You Need to Know
          </h2>
          <p className="text-[#94A3B8] text-base">
            Clear answers about roof replacements, emergency response, and thermal diagnostics.
          </p>
        </div>

        {/* Single column accordion centered max-width 800px */}
        <div className="max-w-[800px] mx-auto space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#131A28] border border-[#1E2836] rounded-[12px] overflow-hidden transition-colors hover:border-[#1E2836]"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-sm md:text-base text-[#F1F5F9]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#3B82F6] transition-transform duration-250 flex-shrink-0 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#94A3B8] leading-relaxed border-t border-[#1E2836]/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
