import React from "react";
import { Quote, Star } from "lucide-react";
import { CUSTOMER_REVIEWS } from "../data/roofingData";

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-24 px-6 bg-[#0F1420] border-t border-[#1E2836]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            AUTHENTIC GOOGLE MAPS REVIEWS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Trusted by 380+ Canadian Homeowners
          </h2>
          <p className="text-[#94A3B8] text-base">
            Verified client experiences from Google Reviews across Montreal, Laval, West Island, and Ottawa.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#131A28] border border-[#1E2836] rounded-[16px] p-6 flex flex-col justify-between space-y-4 hover:border-[#3B82F6] transition-colors"
            >
              <div className="space-y-3">
                {/* Blue quotation mark icon */}
                <div className="flex items-center justify-between">
                  <Quote className="w-6 h-6 text-[#3B82F6]" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#3B82F6] text-[#3B82F6]" />
                    ))}
                  </div>
                </div>

                {/* Quote in #F1F5F9 */}
                <p className="text-[#F1F5F9] text-sm leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Name/role in #94A3B8 */}
              <div className="pt-4 border-t border-[#1E2836]">
                <div className="font-semibold text-sm text-[#F1F5F9]">{review.author}</div>
                <div className="text-xs text-[#94A3B8] mt-0.5">
                  {review.location} • {review.service}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
