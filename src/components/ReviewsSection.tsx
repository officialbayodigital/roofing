import React from "react";
import { Star, ShieldCheck, CheckCircle2, MapPin, ExternalLink } from "lucide-react";
import { CUSTOMER_REVIEWS, COMPANY_INFO, GOOGLE_MAPS_URL } from "../data/roofingData";

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold text-amber-400 uppercase tracking-wider">
            Verified Homeowner Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Rated 4.9 Stars on Google Reviews
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Read authentic feedback from homeowners and commercial building managers across Montreal, Laval, Ottawa, and surrounding Canadian regions.
          </p>

          <div className="pt-2">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 px-4 py-2 rounded-xl text-xs font-bold text-amber-400 transition-colors"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>View KP Roofing on Google Maps (384+ Reviews)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CUSTOMER_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">{review.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{review.author}</h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {review.location} • {review.service}
                  </p>
                </div>
                {review.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Verified Client
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
