import React, { useState, useEffect } from "react";
;import { Clapperboard, Eye, Star, ChevronLeft, ChevronRight } from "lucide-react";
import GenreBar from "./GenreBar";
import { Link } from "react-router-dom";

import { getMovies, getGenres } from "../service/movieService";

function MainMovie() {
  const [selectedGenreName, setSelectedGenreName] = useState("All Movies");
  const [allGenres, setAllGenres] = useState([{id: 0, name:"All Movies"}]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchGenres = async () => {
        try {
            const genresFromApi = await getGenres();
            setAllGenres([{ id: 0, name: "All Movies" }, ...genresFromApi]);
        } catch (err) {
            console.error("Failed to fetch genres:", err);
            setAllGenres([{ id: 0, name: "All Movies" }]);
        }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allMoviesFromApi = await getMovies(); // Ambil semua film
        let filtered = [];
        if (selectedGenreName === "All Movies") {
          filtered = allMoviesFromApi;
        } else {
          // Cari ID genre berdasarkan nama yang dipilih
          const selectedGenreObject = allGenres.find(g => g.name === selectedGenreName);
          const selectedGenreId = selectedGenreObject ? selectedGenreObject.id : null;

          if (selectedGenreId != null) {
              // Filter film berdasarkan ID genre (movie.genre berisi array ID)
              filtered = allMoviesFromApi.filter(movie =>
                Array.isArray(movie.genre) && movie.genre.includes(selectedGenreId)
              );
          } else {
              filtered = allMoviesFromApi;
          }
        }
        setMovies(filtered);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Gagal memuat daftar film.");
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    if(allGenres.length > 0) {
        fetchMovies();
    }
  }, [selectedGenreName, allGenres]);

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = movies.slice(startIndex, endIndex);

  const handlePrev = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNext = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
  const handlePageClick = (page) => { setCurrentPage(page); };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenreName]);

  const handleSelectGenre = (genreName) => {
    setSelectedGenreName(genreName);
  };

  return (
    <div>
      <section className="py-12 px-20 relative">
        <div className="flex items-center gap-4 mb-6">
          <Clapperboard className="text-[#00BFFF] w-13 h-13" />
          <h2 className="text-3xl  font-bold text-white">Movies</h2>
        </div>
        <hr className="h-0.5 bg-[#A4B7BD] my-8" />

        <GenreBar
          genres={allGenres.map(g => g.name)} 
          activeGenre={selectedGenreName}
          onSelectGenre={handleSelectGenre}
        />

        {isLoading && <p className="text-white text-center py-4">Loading movies...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        {!isLoading && !error && movies.length === 0 && (
          <p className="text-gray-400 text-center py-4">No movies found{selectedGenreName !== "All Movies" ? ` for genre "${selectedGenreName}"` : ""}.</p>
        )}

        {!isLoading && !error && movies.length > 0 && (
          <>
            <div className="grid grid-cols-5 gap-6 pb-12">
              {currentMovies.map((movie) => (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  <div className="bg-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 snap-start w-72 hover:scale-105 transition-transform duration-300">
                    <img src={movie.image}
                         alt={movie.title}
                         className="w-full h-92 object-cover" />
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

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button onClick={handlePrev} disabled={currentPage === 1} className="text-[#00BFFF] disabled:opacity-40"><ChevronLeft /></button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button key={index} onClick={() => handlePageClick(index + 1)} className={`w-3 h-3 rounded-full ${currentPage === index + 1 ? "bg-[#00BFFF]" : "bg-gray-400"}`}></button>
                ))}
                <button onClick={handleNext} disabled={currentPage === totalPages} className="text-[#00BFFF] disabled:opacity-40"><ChevronRight /></button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default MainMovie;
