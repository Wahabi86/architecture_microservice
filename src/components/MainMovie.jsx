import React from "react";
import { Clapperboard, Eye, Star } from "lucide-react";
import { movieGenre } from "../data/allData";

function MainMovie() {
  return (
    <div>
      <section className="py-12 px-8 md:px-20 relative">
        <div className="flex items-center gap-4 mb-6">
          <Clapperboard className="text-[#00BFFF] w-13 h-13" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">Trends Now</h2>
        </div>
        <hr className="h-0.5 bg-[#A4B7BD] my-8" />

        {/* Genre Bar */}

        {/* All Movie */}
        <div className="grid grid-cols-5 gap-6 pb-8">
          {/* Card Film */}
          {movieGenre.slice(0, 15).map((movie) => (
            <div key={movie.id} className="bg-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 snap-start">
              {/* Gambar film */}
              <img src={movie.image} alt={movie.title} className="w-full h-92 object-cover" />

              {/* Info bawah gambar */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white line-clamp-1">{movie.title}</h3>
                <div className="flex items-center justify-between text-gray-400 text-sm mt-1">
                  <span className="flex items-center gap-1 text-[#00BFFF]">{movie.year}</span>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#00BFFF]" />
                      {movie.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-[#00BFFF]" />
                      {movie.views}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* batas akhir */}
        
      </section>
    </div>
  );
}

export default MainMovie;
