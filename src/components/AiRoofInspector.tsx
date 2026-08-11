import React, { useState } from "react";
import { Scan, Sparkles, Check, ArrowRight, Upload, AlertCircle } from "lucide-react";

interface AiRoofInspectorProps {
  onBookWithReport: (notes: string, serviceType?: string) => void;
}

export const AiRoofInspector: React.FC<AiRoofInspectorProps> = ({ onBookWithReport }) => {
  const [selectedIssue, setSelectedIssue] = useState<string>("ice_dam");
  const [analyzing, setAnalyzing] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const issuePresets = [
    {
      id: "ice_dam",
      label: "Ice Dams & Attic Condensation",
      desc: "Ice buildup along eave gutters causing water pooling under shingles.",
      riskScore: "HIGH MOISTURE RISK",
      recommendation: "Install secondary waterproofing membrane and upgrade soffit ventilation.",
    },
    {
      id: "leak",
      label: "Active Roof / Ceiling Water Leak",
      desc: "Water stains or active dripping around chimneys, vents, or skylights.",
      riskScore: "CRITICAL DISPATCH RECOMMENDED",
      recommendation: "Emergency flashing reseal and thermal moisture camera audit.",
    },
    {
      id: "shingle_wear",
      label: "Curled, Missing or Aging Shingles",
      desc: "Granule loss, exposed fiberglass backing, or wind-blown shingle lift.",
      riskScore: "MODERATE STRUCTURAL RISK",
      recommendation: "Full architectural shingle replacement with high-wind uplift rating.",
    },
    {
      id: "flat_pooling",
      label: "Flat Roof Ponding Water",
      desc: "Standing water accumulation on flat TPO, EPDM, or gravel membrane.",
      riskScore: "HIGH MEMBRANE STRAIN",
      recommendation: "Sloped insulation board installation with new elastomeric torch-on seal.",
    },
  ];

  const currentPreset = issuePresets.find((p) => p.id === selectedIssue) || issuePresets[0];

  const handleRunDiagnostic = () => {
    setAnalyzing(true);
    setReportGenerated(false);
    setTimeout(() => {
      setAnalyzing(false);
      setReportGenerated(true);
    }, 1200);
  };

  const handleBookWithDiagnostic = () => {
    const summary = `AI Diagnostic Report: Selected Issue (${currentPreset.label}) -> Risk Level (${currentPreset.riskScore}). Recommended Action: ${currentPreset.recommendation}`;
    onBookWithReport(summary, "AI Roof Diagnostic & Thermal Audit");
  };

  return (
    <section id="ai-inspector" className="py-20 md:py-24 bg-[#0A0E14] border-t border-[#1E2836] text-[#F1F5F9] px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            AI THERMAL ROOF DIAGNOSTIC ADVISOR
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Instant Roof Vulnerability Diagnostic
          </h2>
          <p className="text-[#94A3B8] text-base">
            Select an observed symptom to generate an immediate thermal diagnostic summary and repair recommendation.
          </p>
        </div>

        {/* Diagnostic Card */}
        <div className="bg-[#131A28] border border-[#1E2836] rounded-[16px] p-6 md:p-8 max-w-[900px] mx-auto space-y-6 blue-glow">
          
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#F1F5F9]">
              Select Roof Symptom or Issue Observed
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {issuePresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedIssue(preset.id);
                    setReportGenerated(false);
                  }}
                  className={`p-4 rounded-[12px] text-left border transition-all ${
                    selectedIssue === preset.id
                      ? "bg-[#3B82F6]/10 border-[#3B82F6] text-[#F1F5F9]"
                      : "bg-[#0A0E14] border-[#1E2836] text-[#94A3B8] hover:border-[#1E2836] hover:text-[#F1F5F9]"
                  }`}
                >
                  <div className="font-semibold text-xs md:text-sm text-[#F1F5F9]">
                    {preset.label}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] mt-1 leading-snug">
                    {preset.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunDiagnostic}
              disabled={analyzing}
              className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold py-3 rounded-[8px] text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{analyzing ? "Analyzing Thermal Diagnostic Parameters..." : "Generate Diagnostic Assessment"}</span>
            </button>
          </div>

          {/* Generated Diagnostic Report */}
          {reportGenerated && (
            <div className="bg-[#0A0E14] border border-[#1E2836] p-5 rounded-[12px] space-y-4 animate-fade-up">
              <div className="flex items-center justify-between border-b border-[#1E2836] pb-3">
                <div className="flex items-center gap-2 text-[#3B82F6] text-xs font-semibold">
                  <Scan className="w-4 h-4" />
                  <span>Diagnostic Summary: {currentPreset.label}</span>
                </div>
                <span className="text-[10px] font-mono bg-[#131A28] border border-[#1E2836] text-[#3B82F6] px-2.5 py-0.5 rounded-full font-bold">
                  {currentPreset.riskScore}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#94A3B8]">
                <p>
                  <strong className="text-[#F1F5F9]">Observed Impact:</strong> {currentPreset.desc}
                </p>
                <p>
                  <strong className="text-[#F1F5F9]">Recommended Solution:</strong> {currentPreset.recommendation}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleBookWithDiagnostic}
                  className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold py-2.5 px-4 rounded-[8px] text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Schedule Physical Thermal Camera Inspection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
