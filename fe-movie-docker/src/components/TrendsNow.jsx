import React, { useRef } from "react";
import { TrendingUp, Eye, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { allMovies } from "../data/allData";
import { Link } from "react-router-dom";

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

  // Filter dan urutkan film berdasarkan rating dan views yang tinggi
  const trendingMovies = [...allMovies]
    .sort((a, b) => {
      // konversi views string seperti "1.9K" → angka (1900)
      const parseViews = (views) => (typeof views === "string" ? parseFloat(views.replace("K", "")) * 1000 : views);
      return b.rating - a.rating || parseViews(b.views) - parseViews(a.views);
    })
    .slice(0, 10);

  return (
    <div>
      <section className="py-12 px-20 relative">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="text-[#00BFFF] w-13 h-13" />
          <h2 className="text-3xl font-bold text-white">Trends Now</h2>
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
            {trendingMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-[#2B2B2B] rounded-2xl overflow-hidden w-72 shadow-lg flex-shrink-0 snap-start hover:scale-105 transition-transform duration-300">
                {/* Gambar film */}
                <img src={movie.image} alt={movie.title} className="w-full h-92 object-cover" />

                {/* Info bawah gambar */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center text-gray-400 text-sm mt-1 space-x-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#00BFFF] fill-[#00BFFF]" />
                      {movie.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-[#00BFFF]" />
                      {movie.views}
                    </span>
                  </div>
                </div>
              </Link>
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
