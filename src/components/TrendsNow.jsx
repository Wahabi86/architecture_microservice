import React, { useRef } from "react";
import { TrendingUp, Eye, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { datasTrend } from "../data/allData";

function TrendsNow() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 1500; // jarak scroll per kali klik
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div>
      <section className="py-12 px-20 relative">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="text-[#00BFFF] w-13 h-13" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trends Now</h2>
        </div>

        <hr className="h-0.5 bg-[#A4B7BD] my-8" />

        <div className="relative">
          {/* tombol arrow back <*/}
          <button onClick={() => scroll("left")} className="absolute -left-15 top-1/2 -translate-y-1/2 z-10  text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer ">
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* tampilan semua data film berdasarkan trend */}
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth pt-4">
            {/* Card Film */}
            {datasTrend.map((data) => (
              <div key={data.id} className="bg-[#2B2B2B] rounded-2xl overflow-hidden w-72 shadow-lg flex-shrink-0 snap-start">
                {/* Gambar film */}
                <img src={data.image} alt={data.title} className="w-full h-92 object-cover" />

                {/* Info bawah gambar */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{data.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm mt-1 space-x-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#00BFFF]" />
                      {data.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-[#00BFFF]" />
                      {data.views}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* tombol arrow next > */}
          <button onClick={() => scroll("right")} className="absolute -right-15 top-1/2 -translate-y-1/2 z-10  text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer">
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default TrendsNow;
