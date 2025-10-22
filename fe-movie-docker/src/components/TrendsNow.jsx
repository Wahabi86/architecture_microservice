import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Eye, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../service/movieService";

function TrendsNow() {
  const scrollRef = useRef(null);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        console.error("Failed to fetch trending movies:", err);
        setError("Gagal memuat film trending. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrending();
  }, []);

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
          <h2 className="text-3xl font-bold text-white">Trends Now</h2>
        </div>

        <hr className="h-0.5 bg-[#A4B7BD] my-8" />

        {isLoading && <p className="text-white text-center py-4">Loading trending movies...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {!isLoading && !error && trendingMovies.length === 0 && (
           <p className="text-gray-400 text-center py-4">No trending movies found.</p>
        )}

        {!isLoading && !error && trendingMovies.length > 0 && (
          <div className="relative">
            <button onClick={() => scroll("left")} className="absolute -left-15 top-1/2 -translate-y-1/2 z-10 text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer ">
              <ChevronLeft className="w-10 h-10" />
            </button>
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth pt-4">
              {trendingMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-[#2B2B2B] rounded-2xl overflow-hidden w-72 shadow-lg flex-shrink-0 snap-start hover:scale-105 transition-transform duration-300">
                  <img src={movie.image}
                       alt={movie.title}
                       className="w-full h-92 object-cover" />
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
            <button onClick={() => scroll("right")} className="absolute -right-15 top-1/2 -translate-y-1/2 z-10 text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer">
              <ChevronRight className="w-10 h-10" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default TrendsNow;
