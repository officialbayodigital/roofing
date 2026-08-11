import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showSubtitle = true,
  subtitleText = "Licensed Roofing Specialists",
  className = "",
}) => {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Curved emblem icon container */}
      <div
        className={`${iconSizes[size]} bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#3B82F6]/20 relative overflow-hidden group transition-transform duration-300 hover:scale-105`}
      >
        {/* Subtle shine effect */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full blur-sm" />
        
        {/* Stylized Roof & Shield SVG */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3/4 h-3/4 text-white drop-shadow-sm"
        >
          {/* Outer Roof Peak */}
          <path d="M3 10.5L12 3l9 7.5" />
          {/* Inner Crest / Shield */}
          <path d="M12 7.5l-6 5v6a1.5 1.5 0 001.5 1.5h9a1.5 1.5 0 001.5-1.5v-6l-6-5z" fill="currentColor" fillOpacity="0.25" />
          {/* Central Peak Accent */}
          <path d="M12 11v6" strokeWidth="2.5" />
          <path d="M9.5 14h5" strokeWidth="2.5" />
        </svg>
      </div>

      <div>
        <div className={`font-black ${textSizes[size]} text-[#F1F5F9] leading-none tracking-tight flex items-center gap-1.5`}>
          <span>KP ROOFING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] inline-block animate-pulse" />
        </div>
        {showSubtitle && (
          <div className="text-[11px] text-[#94A3B8] font-normal mt-1 tracking-wide">
            {subtitleText}
          </div>
        )}
      </div>
    </div>
  );
};
