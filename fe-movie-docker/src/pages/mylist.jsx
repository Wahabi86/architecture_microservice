import React, { useEffect, useState } from "react";
import { Eye, Star, Minus, LoaderCircle, ChevronLeft, ChevronRight, Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";
import { getMyWatchlistIds, removeFromWatchlist } from "../service/authService";
import { getMoviesByIds } from "../service/movieService";

function MyList() {
  const [myListMovies, setMyListMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 15;

  useEffect(() => {
    const fetchWatchlistDetails = async () => {
      setIsLoading(true);
      setError(null);
      setMyListMovies([]);
      setCurrentPage(1);

      try {
        // 1. Ambil daftar ID dari user-service
        const movieIds = await getMyWatchlistIds();

        if (movieIds && movieIds.length > 0) {
          const moviesDetails = await getMoviesByIds(movieIds);
          setMyListMovies(moviesDetails);
        } else {
          // Jika tidak ada ID, set list kosong
          setMyListMovies([]);
        }
      } catch (err) {
        console.error("Failed to fetch watchlist movies:", err);
        setError("Failed to load your movie list, please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistDetails();
  }, []);

  const handleRemove = async (id) => {
    try {
      // Panggil API user-service untuk menghapus
      await removeFromWatchlist(id);
      // Jika berhasil di backend, update state di frontend
      const newList = myListMovies.filter((movie) => movie.id !== id);
      setMyListMovies(newList);
      const newTotalPages = Math.ceil(newList.length / moviesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1);
      }
      return newList;
    } catch (err) {
      console.error("Failed to remove movie from watchlist:", err);
      // Tampilkan notifikasi error ke pengguna
      alert("Failed to remove movie from your list, please try again.");
    }
  };

  const totalPages = Math.ceil(myListMovies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMoviesOnPage = myListMovies.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handleDotClick = (pageIndex) => {
    setCurrentPage(pageIndex + 1);
  };

  return (
    <div className="px-20 pt-28 text-white">
      {/* Header Halaman (Mirip MainMovie) */}
      <div className="flex items-center gap-4 mb-6">
        {/* Gunakan ikon Clapperboard */}
        <Clapperboard className="text-[#00BFFF] w-8 h-8 md:w-10 md:h-10" />
        <h1 className="text-3xl md:text-4xl font-bold">My List</h1>
      </div>
      {/* Garis Pemisah */}
      <hr className="h-0.5 bg-[#A4B7BD] my-8" />

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <LoaderCircle className="w-10 h-10 animate-spin text-[#00BFFF]" />
          <p className="ml-4 text-lg">Loading your list...</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {!isLoading && !error && myListMovies.length === 0 && <p className="text-red-500 text-center py-10 text-lg">You haven't added any movies to your list yet.</p>}

      {!isLoading && !error && myListMovies.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-12">
            {currentMoviesOnPage.map(
              (movie) =>
                movie && (
                  <div key={movie.id} className="bg-[#2B2B2B] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 snap-start w-72 hover:scale-105 transition-transform duration-300 relative">
                    {/* Tombol hapus di pojok kanan atas */}
                    <button
                      onClick={() => handleRemove(movie.id)}
                      className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full z-10 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                      title="Remove from My List"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    {/* Link menuju halaman detail */}
                    <Link to={`/movie/${movie.id}`}>
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
                    </Link>
                  </div>
                )
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 mb-12">
              <button onClick={handlePrevPage} disabled={currentPage === 1} className="text-[#00BFFF] disabled:opacity-40 hover:text-white transition-opacity" aria-label="Previous page">
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${currentPage === index + 1 ? "bg-[#00BFFF]" : "bg-gray-400 hover:bg-gray-300"}`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button onClick={handleNextPage} disabled={currentPage === totalPages} className="text-[#00BFFF] disabled:opacity-40 hover:text-white transition-opacity" aria-label="Next page">
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyList;
