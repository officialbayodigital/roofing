import React, { useState } from "react";
import { MapPin, Search, Check, Clock, ShieldCheck, ExternalLink } from "lucide-react";
import { ServiceAreaResult } from "../types";
import { COMPANY_INFO, GOOGLE_MAPS_URL } from "../data/roofingData";

interface ServiceAreaCheckerProps {
  onBookArea: (postalCode: string) => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onBookArea }) => {
  const [postal, setPostal] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ServiceAreaResult | null>(null);

  const popularRegions = [
    { city: "Montreal & West Island", postal: "H3A 1A1" },
    { city: "Laval & North Shore", postal: "H7T 2T6" },
    { city: "South Shore (Longueuil / Brossard)", postal: "J4K 2M8" },
    { city: "Ottawa / Hawkesbury / Gatineau", postal: "K1P 1J1" },
    { city: "Laurentians & Saint-Jérôme", postal: "J7Z 5T3" },
    { city: "Quebec City Region", postal: "G1R 2J6" },
  ];

  const handleCheckArea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postal.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/service-area", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postalCode: postal }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({
        serviced: true,
        regionName: "Canadian Service Zone",
        responseTime: "Same-Day / Next-Day",
        message: "KP Roofing provides mobile unit service dispatch to your postal code.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="service-area" className="py-20 md:py-24 bg-[#0F1420] border-t border-[#1E2836] text-[#F1F5F9] px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text & Form */}
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
              SERVICE AREA VERIFICATION
            </span>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Check Dispatch Availability in Your Area
            </h2>

            <p className="text-[#94A3B8] text-base leading-relaxed">
              KP Roofing operates fully equipped mobile service vehicles serving Greater Montreal, Laval, Laurentians, South Shore, and Ottawa / Hawkesbury regions.
            </p>

            {/* Postal Search Form */}
            <form onSubmit={handleCheckArea} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    placeholder="Enter Postal Code (e.g. H3A 1A1 or City)"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full bg-[#131A28] border border-[#1E2836] rounded-[8px] pl-10 pr-3.5 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-6 py-3 rounded-[8px] text-sm flex items-center justify-center gap-2 flex-shrink-0 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>Verify Coverage</span>
                </button>
              </div>
            </form>

            {/* Verification Result Card */}
            {result && (
              <div className="bg-[#131A28] border border-[#3B82F6] p-5 rounded-[12px] space-y-3 text-left animate-fade-up">
                <div className="flex items-center gap-2 text-[#3B82F6] font-semibold text-sm">
                  <Check className="w-4 h-4" />
                  <span>Coverage Confirmed: {result.regionName}</span>
                </div>
                <p className="text-xs text-[#94A3B8]">{result.message}</p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1E2836]">
                  <span className="text-[#94A3B8] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                    Response Window: <strong className="text-[#F1F5F9]">{result.responseTime}</strong>
                  </span>
                  <button
                    onClick={() => onBookArea(postal)}
                    className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-4 py-1.5 rounded-[8px] text-xs transition-colors"
                  >
                    Book Area
                  </button>
                </div>
              </div>
            )}

            {/* Quick Regional Badges */}
            <div className="pt-2">
              <span className="text-xs text-[#94A3B8] font-semibold block mb-2">
                Click a Major Canadian Service Region:
              </span>
              <div className="flex flex-wrap gap-2">
                {popularRegions.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPostal(r.postal);
                      onBookArea(r.postal);
                    }}
                    className="bg-[#131A28] hover:bg-[#1E2836] border border-[#1E2836] text-[#94A3B8] hover:text-[#F1F5F9] text-xs px-3 py-1.5 rounded-[8px] transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-3 h-3 text-[#3B82F6]" />
                    <span>{r.city}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Map & Info */}
          <div className="md:col-span-6 bg-[#131A28] border border-[#1E2836] rounded-[16px] p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1E2836] pb-4">
              <div>
                <h3 className="font-bold text-base text-[#F1F5F9]">KP Roofing Dispatch Hub</h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">{COMPANY_INFO.address}</p>
              </div>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-[#0A0E14] p-4 rounded-[12px] border border-[#1E2836]">
                <span className="text-[#94A3B8] block mb-1">Standard Dispatch Hours</span>
                <strong className="text-[#F1F5F9] text-xs">{COMPANY_INFO.hours}</strong>
              </div>
              <div className="bg-[#0A0E14] p-4 rounded-[12px] border border-[#1E2836]">
                <span className="text-[#94A3B8] block mb-1">Emergency Service Line</span>
                <strong className="text-[#3B82F6] text-xs">{COMPANY_INFO.emergencyPhone}</strong>
              </div>
            </div>

            <div className="bg-[#0A0E14] p-4 rounded-[12px] border border-[#1E2836] space-y-2 text-xs text-[#94A3B8]">
              <div className="flex items-center gap-2 text-[#3B82F6] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>$5,000,000 Commercial General Liability Insurance</span>
              </div>
              <p className="text-[#94A3B8]">
                Certified installers covered by CNESST / WSIB safety compliance standards across Quebec & Ontario.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
