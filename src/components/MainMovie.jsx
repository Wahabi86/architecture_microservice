import React, { useState } from "react";
import { Clapperboard, Eye, Star } from "lucide-react";
import { allMovies } from "../data/allData";
import GenreBar from "./GenreBar";
import { Link } from "react-router-dom";

function MainMovie() {
  const [selectedGenre, setSelectedGenre] = useState("All Movies");

  const filteredMovies = selectedGenre === "All Movies" ? allMovies : allMovies.filter((movie) => movie.genre.includes(selectedGenre));

  return (
    <div>
      <section className="py-12 px-20 relative">
        <div className="flex items-center gap-4 mb-6">
          <Clapperboard className="text-[#00BFFF] w-13 h-13" />
          <h2 className="text-3xl  font-bold text-white">Movies</h2>
        </div>
        <hr className="h-0.5 bg-[#A4B7BD] my-8" />

        {/* Genre Bar */}
        <GenreBar onSelectGenre={setSelectedGenre} />

        {/* All Card Movie */}
        <div className="grid grid-cols-5 gap-6 pb-12">
          {filteredMovies.slice(0, 15).map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 snap-start w-72 hover:scale-105 transition-transform duration-300">
                {/* Gambar film */}
                <img src={movie.image} alt={movie.title} className="w-full h-92 object-cover" />

                {/* Info bawah gambar */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white line-clamp-1">{movie.title}</h3>
                  <div className="flex items-center justify-between text-gray-400 text-sm mt-1">
                    <span className="flex items-center gap-1 text-[#00BFFF]">{movie.year}</span>
                    <div className="flex items-center space-x-4">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* batas akhir */}
      </section>
    </div>
  );
}

export default MainMovie;
