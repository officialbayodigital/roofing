import React, { useState } from "react";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onOpenBooking: (serviceType?: string) => void;
  onOpenMyBookings: () => void;
  onScrollToSection: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenMyBookings,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { label: "Overview", id: "overview" },
    { label: "Services", id: "services" },
    { label: "Benefits", id: "benefits" },
    { label: "Gallery", id: "gallery" },
    { label: "Testimonials", id: "testimonials" },
    { label: "FAQ", id: "faq" },
  ];

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        {/* Floating Curved Capsule Navbar Container */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-[#0A0E14]/85 backdrop-blur-xl border border-[#1E2836] shadow-2xl rounded-full px-5 py-2.5 flex items-center justify-between transition-all"
        >
          {/* Logo Left - Clean, nice logo without Google Maps text */}
          <button
            onClick={() => handleNavClick("top")}
            className="focus:outline-none flex items-center"
          >
            <Logo size="md" showSubtitle={true} subtitleText="Licensed Roofing Specialists" />
          </button>

          {/* Curved Floating Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#131A28]/80 border border-[#1E2836] p-1.5 rounded-full text-xs font-semibold text-[#94A3B8] relative">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative px-3.5 py-1.5 rounded-full text-[#94A3B8] hover:text-[#F1F5F9] transition-colors focus:outline-none z-10"
              >
                {hoveredNav === item.id && (
                  <motion.div
                    layoutId="navHoverPill"
                    className="absolute inset-0 bg-[#3B82F6]/20 border border-[#3B82F6]/40 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}

            <button
              onClick={onOpenMyBookings}
              className="px-3.5 py-1.5 rounded-full text-xs text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1.5 transition-colors focus:outline-none hover:bg-[#1E2836]/60 ml-1"
            >
              <Search className="w-3.5 h-3.5 text-[#3B82F6]" />
              Lookup Booking
            </button>
          </nav>

          {/* Action Button Right (Curved Pill Style) */}
          <div className="hidden sm:flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onOpenBooking()}
              className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] hover:from-[#60A5FA] hover:to-[#3B82F6] text-white rounded-full px-5 py-2 text-xs font-bold transition-all shadow-md shadow-[#3B82F6]/20 border border-white/10 flex items-center gap-1.5"
            >
              <span>Book Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="bg-[#3B82F6] text-white rounded-full px-3 py-1.5 text-xs font-semibold sm:hidden shadow-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-[#1E2836] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Nav Drawer overlay with curve */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="md:hidden mt-2 bg-[#0A0E14]/95 backdrop-blur-2xl border border-[#1E2836] rounded-3xl p-5 shadow-2xl space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="text-left px-3 py-2.5 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#131A28] font-medium text-sm transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings();
                  }}
                  className="text-left px-3 py-2.5 rounded-xl text-[#3B82F6] hover:bg-[#131A28] font-medium text-sm flex items-center gap-2 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  Lookup Booking
                </button>
              </div>

              <div className="pt-2 border-t border-[#1E2836]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-bold py-3 rounded-full text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#3B82F6]/20"
                >
                  <span>Book Inspection Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
