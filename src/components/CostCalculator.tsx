import React, { useState } from "react";
import { Calculator, ArrowRight, ShieldCheck, Check } from "lucide-react";

interface CostCalculatorProps {
  onBookEstimate: (notes: string, serviceType: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onBookEstimate }) => {
  const [roofAreaSqFt, setRoofAreaSqFt] = useState<number>(1800);
  const [pitch, setPitch] = useState<"standard" | "steep">("standard");
  const [material, setMaterial] = useState<"shingle" | "tpo" | "metal">("shingle");
  const [stories, setStories] = useState<number>(1);
  const [includeGutters, setIncludeGutters] = useState<boolean>(true);

  // Material rates
  const materialRates = {
    shingle: { name: "Architectural Asphalt Shingles", baseRate: 5.5 },
    tpo: { name: "Elastomeric Flat Roof TPO/EPDM", baseRate: 8.0 },
    metal: { name: "24-Gauge Standing Seam Metal", baseRate: 12.0 },
  };

  const pitchMultiplier = pitch === "steep" ? 1.2 : 1.0;
  const storyMultiplier = stories === 2 ? 1.15 : stories === 3 ? 1.25 : 1.0;
  const gutterCost = includeGutters ? 950 : 0;

  const baseMaterialCost = roofAreaSqFt * materialRates[material].baseRate;
  const calculatedEstimate = Math.round((baseMaterialCost * pitchMultiplier * storyMultiplier) + gutterCost);

  const handleBook = () => {
    const summary = `Instant Online Estimate: ~$${calculatedEstimate.toLocaleString()} CAD (${roofAreaSqFt} sq ft, ${materialRates[material].name}, ${stories}-Story, Pitch: ${pitch}, Gutters: ${includeGutters ? 'Yes' : 'No'})`;
    onBookEstimate(summary, materialRates[material].name);
  };

  return (
    <section id="calculator" className="py-20 md:py-24 bg-[#0F1420] border-t border-[#1E2836] text-[#F1F5F9] px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            INSTANT ONLINE QUOTE ESTIMATOR
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Estimate Your Replacement Cost
          </h2>
          <p className="text-[#94A3B8] text-base">
            Select your property specifications to generate an immediate estimate for material & labor.
          </p>
        </div>

        {/* Calculator Interface */}
        <div className="bg-[#131A28] border border-[#1E2836] rounded-[16px] p-6 md:p-8 max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center blue-glow">
          
          {/* Controls column */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Square footage slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-[#F1F5F9]">
                <span>Estimated Roof Surface Area</span>
                <span className="text-[#3B82F6] font-mono text-sm">{roofAreaSqFt.toLocaleString()} sq ft</span>
              </div>
              <input
                type="range"
                min="800"
                max="5000"
                step="50"
                value={roofAreaSqFt}
                onChange={(e) => setRoofAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-[#0A0E14] border border-[#1E2836] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>

            {/* Material selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#F1F5F9]">Material Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "shingle", label: "Shingle" },
                  { id: "tpo", label: "Flat TPO" },
                  { id: "metal", label: "Metal" },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMaterial(m.id as any)}
                    className={`py-2 px-3 rounded-[8px] text-xs font-semibold transition-colors border ${
                      material === m.id
                        ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                        : "bg-[#0A0E14] text-[#94A3B8] border-[#1E2836] hover:text-[#F1F5F9]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Roof pitch and stories */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#F1F5F9]">Roof Pitch</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPitch("standard")}
                    className={`py-2 px-2 rounded-[8px] text-xs font-semibold transition-colors border ${
                      pitch === "standard"
                        ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                        : "bg-[#0A0E14] text-[#94A3B8] border-[#1E2836]"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setPitch("steep")}
                    className={`py-2 px-2 rounded-[8px] text-xs font-semibold transition-colors border ${
                      pitch === "steep"
                        ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                        : "bg-[#0A0E14] text-[#94A3B8] border-[#1E2836]"
                    }`}
                  >
                    Steep
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#F1F5F9]">Building Height</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[1, 2, 3].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStories(st)}
                      className={`py-2 rounded-[8px] text-xs font-semibold transition-colors border ${
                        stories === st
                          ? "bg-[#3B82F6] text-white border-[#3B82F6]"
                          : "bg-[#0A0E14] text-[#94A3B8] border-[#1E2836]"
                      }`}
                    >
                      {st} {st === 1 ? 'Story' : 'Stories'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gutters checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="gutters"
                checked={includeGutters}
                onChange={(e) => setIncludeGutters(e.target.checked)}
                className="w-4 h-4 rounded bg-[#0A0E14] border-[#1E2836] text-[#3B82F6] focus:ring-[#3B82F6]"
              />
              <label htmlFor="gutters" className="text-xs text-[#94A3B8] cursor-pointer">
                Include 5" Seamless Aluminum Gutters & Leaf Guards
              </label>
            </div>

          </div>

          {/* Estimate Result column */}
          <div className="md:col-span-5 bg-[#0A0E14] border border-[#1E2836] rounded-[12px] p-6 text-center space-y-4">
            <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wider block">
              Estimated Total Investment
            </span>

            <div className="text-3xl md:text-4xl font-mono font-bold text-[#3B82F6]">
              ~${calculatedEstimate.toLocaleString()} <span className="text-xs text-[#94A3B8] font-sans font-normal">CAD</span>
            </div>

            <div className="space-y-2 text-xs text-[#94A3B8] text-left pt-2 border-t border-[#1E2836]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Includes complete tear-off & disposal</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>Ice & water weather protection shield</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>15-Year KP Workmanship Warranty</span>
              </div>
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold py-3 px-4 rounded-[8px] text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Lock In Estimate & Schedule Scan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
