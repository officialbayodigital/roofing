import React, { useState, useEffect } from "react";
import {
  X,
  Clock,
  User,
  Phone,
  Mail,
  Check,
  Upload,
  ArrowRight,
  ArrowLeft,
  Shield,
  Download,
  AlertCircle,
} from "lucide-react";
import { Booking } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPostalCode?: string;
  initialServiceType?: string;
  initialNotes?: string;
  onBookingCreated?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPostalCode = "",
  initialServiceType = "Residential Roof Replacement",
  initialNotes = "",
  onBookingCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [serviceType, setServiceType] = useState(initialServiceType);
  const [propertyType, setPropertyType] = useState("Single Family Home");
  const [squareFootage, setSquareFootage] = useState(2000);
  const [material, setMaterial] = useState("Architectural Asphalt Shingles");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Montreal");
  const [postalCode, setPostalCode] = useState(initialPostalCode);
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (8:00 AM - 12:00 PM)");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState(initialNotes);
  const [photoFileName, setPhotoFileName] = useState<string | null>(null);

  // Confirmed Result State
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (initialPostalCode) setPostalCode(initialPostalCode);
    if (initialServiceType) setServiceType(initialServiceType);
    if (initialNotes) setNotes(initialNotes);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split("T")[0];
    setSelectedDate(dateStr);
  }, [initialPostalCode, initialServiceType, initialNotes, isOpen]);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFileName(e.target.files[0].name);
    }
  };

  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!serviceType) {
        setError("Please select a service type.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setError("Please select a preferred date for inspection.");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName || !phone || !address || !postalCode) {
      setError("Please fill out all required contact and location fields.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        serviceType,
        propertyType,
        squareFootage,
        material,
        address,
        city,
        postalCode,
        date: selectedDate,
        timeSlot,
        customerName,
        email,
        phone,
        notes,
        estimatedCost: "Free In-Person Quote & Thermal Audit",
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit booking.");
      }

      setConfirmedBooking(data.booking);
      if (onBookingCreated) onBookingCreated(data.booking);
      setStep(4);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    "Morning (8:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 4:00 PM)",
    "Evening (4:00 PM - 7:00 PM)",
    "Emergency Dispatch (Within 2 Hours)",
  ];

  const generateIcsCalendar = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//KP Roofing//Roofing Inspection Booking//EN
BEGIN:VEVENT
SUMMARY:KP Roofing Inspection (${confirmedBooking.referenceCode})
DESCRIPTION:KP Roofing Inspection & Quote\\nService: ${confirmedBooking.serviceType}\\nAddress: ${confirmedBooking.address}, ${confirmedBooking.city}\\nPhone: ${confirmedBooking.phone}
LOCATION:${confirmedBooking.address}, ${confirmedBooking.city}, ${confirmedBooking.postalCode}
DTSTART:${confirmedBooking.date.replace(/-/g, "")}T080000Z
DTEND:${confirmedBooking.date.replace(/-/g, "")}T100000Z
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `KP_Roofing_Inspection_${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0E14]/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#131A28] border border-[#1E2836] text-[#F1F5F9] rounded-[16px] w-full max-w-2xl shadow-2xl overflow-hidden relative my-8">
        
        {/* Header Bar */}
        <div className="bg-[#0A0E14] px-6 py-4 border-b border-[#1E2836] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#3B82F6] rounded-[8px] text-white font-bold flex items-center justify-center text-sm">
              KP
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-[#F1F5F9]">
                {step === 4 ? "Booking Confirmed" : "Book Roof Inspection & Quote"}
              </h3>
              <p className="text-xs text-[#94A3B8]">
                {step === 4 ? "Reference code generated below" : `Step ${step} of 3 • Canadian Service Network`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-[8px] hover:bg-[#1E2836] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div className="w-full bg-[#0A0E14] h-1.5">
            <div
              className="bg-[#3B82F6] h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-[#0A0E14] border border-[#3B82F6] text-[#3B82F6] rounded-[8px] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-[#3B82F6]" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Service & Property Details */}
        {step === 1 && (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-2">
                Service Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  "Residential Roof Replacement",
                  "24/7 Emergency Storm & Leak Repair",
                  "Flat Roof Waterproofing (TPO/EPDM)",
                  "AI Roof Inspection & Thermal Audit",
                  "Standing Seam Metal Roofing",
                  "Eavestroughs, Soffits & Gutters",
                ].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setServiceType(s)}
                    className={`p-3 rounded-[8px] border text-left text-xs font-semibold transition-all ${
                      serviceType === s
                        ? "bg-[#3B82F6]/10 border-[#3B82F6] text-[#F1F5F9]"
                        : "bg-[#0A0E14] border-[#1E2836] text-[#94A3B8] hover:border-[#1E2836]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{s}</span>
                      {serviceType === s && <Check className="w-4 h-4 text-[#3B82F6]" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Property Type
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                >
                  <option value="Single Family Home">Single Family Home</option>
                  <option value="Semi-Detached / Townhouse">Semi-Detached / Townhouse</option>
                  <option value="Duplex / Triplex">Duplex / Triplex</option>
                  <option value="Commercial / Industrial Building">Commercial / Industrial Building</option>
                  <option value="Condo Association / Multi-Unit">Condo Association / Multi-Unit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Approx. Roof Area: <strong className="text-[#3B82F6]">{squareFootage} sq ft</strong>
                </label>
                <input
                  type="range"
                  min={800}
                  max={5000}
                  step={100}
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(Number(e.target.value))}
                  className="w-full h-2 bg-[#0A0E14] border border-[#1E2836] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                />
                <div className="flex justify-between text-[10px] text-[#94A3B8] mt-1">
                  <span>800 sq ft</span>
                  <span>2,500 sq ft</span>
                  <span>5,000+ sq ft</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                Current Roof Material
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
              >
                <option value="Architectural Asphalt Shingles">Architectural Asphalt Shingles</option>
                <option value="3-Tab Asphalt Shingles">3-Tab Asphalt Shingles</option>
                <option value="Flat TPO / EPDM Membrane">Flat TPO / EPDM Membrane</option>
                <option value="Standing Seam Metal">Standing Seam Metal</option>
                <option value="Cedar Shakes or Slate">Cedar Shakes or Slate</option>
                <option value="Tar & Gravel">Tar & Gravel</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                Upload Photo of Roof Damage (Optional)
              </label>
              <div className="border border-dashed border-[#1E2836] hover:border-[#3B82F6] bg-[#0A0E14] p-4 rounded-[8px] text-center cursor-pointer transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-1.5 text-xs text-[#94A3B8]">
                  <Upload className="w-5 h-5 text-[#3B82F6]" />
                  {photoFileName ? (
                    <span className="text-[#3B82F6] font-semibold">{photoFileName} uploaded!</span>
                  ) : (
                    <span>Drag & drop photo or click to upload roof damage picture</span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Step Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-6 py-3 rounded-[8px] text-sm flex items-center gap-2 transition-colors"
              >
                <span>Continue to Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time Selection */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-2">
                Preferred Inspection Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-4 py-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-2">
                Preferred Time Slot
              </label>
              <div className="space-y-2">
                {timeSlots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`w-full p-3 rounded-[8px] border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      timeSlot === slot
                        ? "bg-[#3B82F6]/10 border-[#3B82F6] text-[#F1F5F9]"
                        : "bg-[#0A0E14] border-[#1E2836] text-[#94A3B8] hover:border-[#1E2836]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#3B82F6]" />
                      {slot}
                    </span>
                    {timeSlot === slot && <Check className="w-4 h-4 text-[#3B82F6]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0A0E14] p-3.5 rounded-[8px] border border-[#1E2836] text-xs text-[#94A3B8] flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#3B82F6] flex-shrink-0" />
              <span>
                Our technician will confirm the appointment 30 minutes prior to arrival. Full thermal moisture camera check included.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-semibold flex items-center gap-1 px-3 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-6 py-3 rounded-[8px] text-sm flex items-center gap-2 transition-colors"
              >
                <span>Continue to Contact Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact & Address Info */}
        {step === 3 && (
          <form onSubmit={handleSubmitBooking} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marc Tremblay"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] pl-10 pr-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Phone Number (SMS Notifications) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8]" />
                  <input
                    type="tel"
                    required
                    placeholder="(514) 555-0192"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] pl-10 pr-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="email"
                  placeholder="name@example.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] pl-10 pr-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-6">
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 742 Evergreen Terrace"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                  Postal Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="H3A 1A1"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2.5 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#F1F5F9] mb-1.5">
                Special Instructions or Known Issues
              </label>
              <textarea
                rows={2}
                placeholder="e.g., Gate code, active leak in kitchen ceiling, steep roof pitch..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] p-3 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-semibold flex items-center gap-1 px-3 py-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-7 py-3 rounded-[8px] text-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating Booking...</span>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Confirm Inspection Booking</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Confirmation Screen */}
        {step === 4 && confirmedBooking && (
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 bg-[#0A0E14] border border-[#3B82F6] text-[#3B82F6] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-[#F1F5F9]">Your Booking is Confirmed!</h4>
              <p className="text-xs text-[#94A3B8] mt-1">
                We have assigned a certified KP Roofing inspector to your location.
              </p>
            </div>

            {/* Reference Badge Card */}
            <div className="bg-[#0A0E14] border border-[#1E2836] rounded-[12px] p-5 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-[#1E2836] pb-3">
                <span className="text-xs text-[#94A3B8] uppercase font-semibold">Booking Reference</span>
                <span className="bg-[#131A28] text-[#3B82F6] font-mono font-bold px-3 py-1 rounded-[8px] text-sm border border-[#1E2836]">
                  {confirmedBooking.referenceCode}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#94A3B8] block">Service</span>
                  <strong className="text-[#F1F5F9]">{confirmedBooking.serviceType}</strong>
                </div>
                <div>
                  <span className="text-[#94A3B8] block">Date & Slot</span>
                  <strong className="text-[#3B82F6]">{confirmedBooking.date} • {confirmedBooking.timeSlot}</strong>
                </div>
                <div>
                  <span className="text-[#94A3B8] block">Property</span>
                  <strong className="text-[#F1F5F9]">{confirmedBooking.address}, {confirmedBooking.city} ({confirmedBooking.postalCode})</strong>
                </div>
                <div>
                  <span className="text-[#94A3B8] block">Contact</span>
                  <strong className="text-[#F1F5F9]">{confirmedBooking.customerName} ({confirmedBooking.phone})</strong>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={generateIcsCalendar}
                className="w-full sm:w-auto bg-[#0A0E14] hover:bg-[#1E2836] text-[#F1F5F9] font-semibold px-4 py-2.5 rounded-[8px] text-xs flex items-center justify-center gap-2 border border-[#1E2836]"
              >
                <Download className="w-4 h-4 text-[#3B82F6]" />
                Add to Calendar (.ics)
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-6 py-2.5 rounded-[8px] text-xs transition-colors"
              >
                Done / Return to Home
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
