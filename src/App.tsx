import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ValueStrip } from "./components/ValueStrip";
import { ServiceExplanation } from "./components/ServiceExplanation";
import { Benefits } from "./components/Benefits";
import { ImageGallery } from "./components/ImageGallery";
import { Testimonials } from "./components/Testimonials";
import { MidCtaBanner } from "./components/MidCtaBanner";
import { FaqAccordion } from "./components/FaqAccordion";
import { ServicesGrid } from "./components/ServicesGrid";
import { AiRoofInspector } from "./components/AiRoofInspector";
import { CostCalculator } from "./components/CostCalculator";
import { ServiceAreaChecker } from "./components/ServiceAreaChecker";
import { BookingModal } from "./components/BookingModal";
import { MyBookingDrawer } from "./components/MyBookingDrawer";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Booking } from "./types";
import { Check } from "lucide-react";

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [myBookingsOpen, setMyBookingsOpen] = useState(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    postalCode?: string;
    serviceType?: string;
    notes?: string;
  }>({});

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleOpenBooking = (data?: {
    postalCode?: string;
    serviceType?: string;
    notes?: string;
  }) => {
    if (data) setBookingInitialData(data);
    else setBookingInitialData({});
    setBookingModalOpen(true);
  };

  const handleBookWithServiceTitle = (serviceTitle: string) => {
    setBookingInitialData({ serviceType: serviceTitle });
    setBookingModalOpen(true);
  };

  const handleBookWithAiReport = (notes: string, serviceType?: string) => {
    setBookingInitialData({ notes, serviceType: serviceType || "AI Roof Inspection & Thermal Audit" });
    setBookingModalOpen(true);
  };

  const handleBookingCreated = (booking: Booking) => {
    setToastMessage(`Booking ${booking.referenceCode} confirmed for ${booking.date}`);
    setTimeout(() => setToastMessage(null), 8000);
  };

  const handleScrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E14] text-[#F1F5F9] font-sans antialiased selection:bg-[#3B82F6] selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#131A28] border border-[#3B82F6] text-[#F1F5F9] px-5 py-3 rounded-[12px] shadow-2xl flex items-center gap-3 text-xs font-semibold animate-fade-up">
          <Check className="w-5 h-5 text-[#3B82F6]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header (Navbar) */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenMyBookings={() => setMyBookingsOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Flow */}
      <main>
        {/* 2. Hero Section */}
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiInspector={() => handleScrollToSection("ai-inspector")}
        />

        {/* 3. Value Strip */}
        <ValueStrip />

        {/* 4. Service Explanation */}
        <ServiceExplanation onOpenBooking={() => handleOpenBooking()} />

        {/* 5. Benefits */}
        <Benefits />

        {/* 6. Image Gallery */}
        <ImageGallery />

        {/* 7. Testimonials */}
        <Testimonials />

        {/* 8. Mid CTA Banner (solid #1D4ED8 background) */}
        <MidCtaBanner onOpenBooking={() => handleOpenBooking()} />

        {/* 9. FAQ Accordion */}
        <FaqAccordion />

        {/* Interactive Feature Modules */}
        <ServicesGrid onSelectService={handleBookWithServiceTitle} />

        <AiRoofInspector onBookWithReport={handleBookWithAiReport} />

        <CostCalculator onBookEstimate={handleBookWithAiReport} />

        <ServiceAreaChecker
          onBookArea={(postalCode) => handleOpenBooking({ postalCode })}
        />
      </main>

      {/* 11. Final CTA & Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onScrollToSection={handleScrollToSection}
      />

      {/* Booking Dialog Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPostalCode={bookingInitialData.postalCode}
        initialServiceType={bookingInitialData.serviceType}
        initialNotes={bookingInitialData.notes}
        onBookingCreated={handleBookingCreated}
      />

      {/* My Bookings Lookup Drawer */}
      <MyBookingDrawer
        isOpen={myBookingsOpen}
        onClose={() => setMyBookingsOpen(false)}
      />

      {/* Mobile Sticky Bar */}
      <FloatingActions
        onOpenBooking={() => handleOpenBooking()}
        onOpenAiInspector={() => handleScrollToSection("ai-inspector")}
      />

    </div>
  );
}
