import React from "react";

export const ImageGallery: React.FC = () => {
  const images = [
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786481577/Ridge_and_Hip_Tile_Work_Essential_for_a_Secure_Roof.jpg",
      alt: "Ridge and Hip Tile Work Installation",
      label: "Ridge & Hip Tile Waterproofing",
    },
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786481600/New_Commercial_Roof_-_Leak-Proof_Roofs_for_Dream_Homes.jpg",
      alt: "Commercial Flat Roof Installation",
      label: "Commercial & Residential Flat Membrane",
    },
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786482142/Another_project_complete_another_happy_customer.jpg",
      alt: "Completed Architectural Shingle Project",
      label: "Full Residential Roof Replacement",
    },
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786482153/620793129934944855.jpg",
      alt: "Quality Shingle & Flashing Detail",
      label: "Precision Flashing & Shingle Detail",
    },
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786482175/696298792415737010.jpg",
      alt: "Canadian Weatherproof Roof Renovation",
      label: "Weather-Shield Architectural Renovation",
    },
    {
      src: "https://res.cloudinary.com/d1hu7aww/image/upload/v1786482164/870320696741351386.jpg",
      alt: "Completed Roof Restoration Project",
      label: "Complete Structural Roof Restoration",
    },
  ];

  return (
    <section id="gallery" className="py-20 md:py-24 px-6 bg-[#0A0E14]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-wider bg-[#131A28] border border-[#1E2836] px-3.5 py-1.5 rounded-full inline-block">
            RECENT COMPLETED PROJECTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#F1F5F9]">
            Proof of Work & Master Craftsmanship
          </h2>
          <p className="text-[#94A3B8] text-base">
            Explore completed residential, commercial, and emergency roof restorations executed across Canada.
          </p>
        </div>

        {/* CSS grid, 2-3 columns, aspect-ratio 4:3, 12px gaps, rounded corners, zoom on hover */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#131A28] border border-[#1E2836] group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-center opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-[#F1F5F9] bg-[#131A28]/80 backdrop-blur-md px-3 py-2 rounded-[8px] border border-[#1E2836]">
                {img.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
