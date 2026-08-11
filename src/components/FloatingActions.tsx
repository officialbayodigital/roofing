import React from "react";
import { Phone, Calendar, Sparkles } from "lucide-react";
import { COMPANY_INFO } from "../data/roofingData";

interface FloatingActionsProps {
  onOpenBooking: () => void;
  onOpenAiInspector: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  onOpenBooking,
  onOpenAiInspector,
}) => {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden flex items-center gap-2">
      <a
        href={`tel:${COMPANY_INFO.emergencyPhone}`}
        className="flex-1 bg-[#131A28] hover:bg-[#1E2836] text-[#F1F5F9] border border-[#3B82F6] font-semibold py-3 px-3 rounded-[8px] text-xs flex items-center justify-center gap-1.5 shadow-2xl"
      >
        <Phone className="w-4 h-4 text-[#3B82F6]" />
        <span>24/7 Call</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold py-3 px-3 rounded-[8px] text-xs flex items-center justify-center gap-1.5 shadow-2xl"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Service</span>
      </button>

      <button
        onClick={onOpenAiInspector}
        className="bg-[#131A28] border border-[#1E2836] text-[#3B82F6] p-3 rounded-[8px] shadow-2xl"
        aria-label="AI Roof Diagnostic"
      >
        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
      </button>
    </div>
  );
};
