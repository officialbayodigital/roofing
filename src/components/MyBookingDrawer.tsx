import React, { useState } from "react";
import { X, Search, Calendar, MapPin, User, RefreshCw } from "lucide-react";
import { Booking } from "../types";

interface MyBookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MyBookingDrawer: React.FC<MyBookingDrawerProps> = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundBookings, setFoundBookings] = useState<Booking[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const queryParam = searchInput.startsWith("KP-") ? `code=${encodeURIComponent(searchInput)}` : `phone=${encodeURIComponent(searchInput)}`;
      const res = await fetch(`/api/bookings?${queryParam}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "No booking found with those details.");
      }

      if (data.booking) {
        setFoundBookings([data.booking]);
      } else if (data.bookings) {
        setFoundBookings(data.bookings);
      } else {
        setFoundBookings([]);
      }
    } catch (err: any) {
      setError(err.message || "Failed to locate booking.");
      setFoundBookings([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-[#0A0E14]/80 backdrop-blur-md">
      <div className="bg-[#131A28] border-l border-[#1E2836] text-[#F1F5F9] w-full max-w-md h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
        
        {/* Top bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#1E2836] pb-4">
            <div>
              <h3 className="font-bold text-base md:text-lg text-[#F1F5F9]">Lookup Existing Booking</h3>
              <p className="text-xs text-[#94A3B8]">Track inspector status & appointment details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-[8px] hover:bg-[#1E2836]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="space-y-2">
            <label className="block text-xs font-semibold text-[#F1F5F9]">
              Reference Code or Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. KP-2026-8841 or 514-555-0192"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-[#0A0E14] border border-[#1E2836] rounded-[8px] px-3.5 py-2 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6] uppercase"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#3B82F6] hover:bg-[#60A5FA] text-white font-semibold px-4 py-2 rounded-[8px] text-xs flex items-center gap-1.5 flex-shrink-0 transition-colors"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Find</span>
              </button>
            </div>
          </form>

          {error && (
            <div className="p-3 bg-[#0A0E14] border border-[#3B82F6] text-[#3B82F6] rounded-[8px] text-xs">
              {error}
            </div>
          )}

          {/* Result Cards */}
          {foundBookings && (
            <div className="space-y-4 pt-2">
              {foundBookings.length === 0 ? (
                <div className="p-6 bg-[#0A0E14] border border-[#1E2836] rounded-[12px] text-center text-[#94A3B8] text-xs">
                  No bookings found for "{searchInput}". Please double check your booking reference code or phone number.
                </div>
              ) : (
                foundBookings.map((b) => (
                  <div key={b.id} className="bg-[#0A0E14] border border-[#1E2836] rounded-[12px] p-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#1E2836] pb-2.5">
                      <span className="font-mono font-bold text-[#3B82F6] text-xs">{b.referenceCode}</span>
                      <span className="bg-[#131A28] text-[#3B82F6] border border-[#1E2836] font-semibold text-[10px] px-2.5 py-0.5 rounded-full">
                        {b.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#94A3B8]">
                      <div className="font-semibold text-[#F1F5F9] text-sm">{b.serviceType}</div>
                      <div className="flex items-center gap-1.5 text-[#94A3B8]">
                        <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>{b.date} • {b.timeSlot}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#94A3B8]">
                        <MapPin className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>{b.address}, {b.city} ({b.postalCode})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#94A3B8]">
                        <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>{b.customerName} ({b.phone})</span>
                      </div>
                      {b.notes && (
                        <div className="p-2 bg-[#131A28] rounded-[8px] text-[11px] text-[#94A3B8]">
                          Notes: {b.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-[#1E2836] text-center">
          <button
            onClick={onClose}
            className="w-full bg-[#0A0E14] hover:bg-[#1E2836] border border-[#1E2836] text-[#94A3B8] hover:text-[#F1F5F9] font-semibold py-2.5 rounded-[8px] text-xs transition-colors"
          >
            Close Drawer
          </button>
        </div>

      </div>
    </div>
  );
};
