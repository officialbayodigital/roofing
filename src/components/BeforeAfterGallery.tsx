import React, { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { BEFORE_AFTER_CASES } from "../data/roofingData";

export const BeforeAfterGallery: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const currentCase = BEFORE_AFTER_CASES[activeCaseIndex];

  return (
    <section className="py-16 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400 uppercase tracking-wider">
            Craftsmanship & Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Before & After Project Showcase
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real Canadian homes and commercial buildings restored by the KP Roofing master crew.
          </p>
        </div>

        {/* Selector Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {BEFORE_AFTER_CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveCaseIndex(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCaseIndex === idx
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"
              }`}
            >
              Project #{idx + 1}: {item.title}
            </button>
          ))}
        </div>

        {/* Before & After Visual Grid */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-2xl">
          
          {/* Before Column */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-red-500/30 group">
              <span className="absolute top-3 left-3 bg-red-600/90 text-white font-bold text-xs px-3 py-1 rounded-lg uppercase shadow">
                Before
              </span>
              <img
                src={currentCase.beforeImg}
                alt="Before Roof Restoration"
                className="w-full h-64 object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-red-400 block mb-1">Original Issue:</strong>
              {currentCase.beforeDesc}
            </div>
          </div>

          {/* After Column */}
          <div className="space-y-3">
            <div className="relative rounded-xl overflow-hidden border border-emerald-500/40 group">
              <span className="absolute top-3 left-3 bg-emerald-600/90 text-white font-bold text-xs px-3 py-1 rounded-lg uppercase shadow">
                After (KP Roofing Installation)
              </span>
              <img
                src={currentCase.afterImg}
                alt="After Roof Restoration"
                className="w-full h-64 object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-emerald-400 block mb-1">Restored Result:</strong>
              {currentCase.afterDesc}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
