import React, { useRef, useState, useEffect, useCallback } from "react";
import { Star, Eye, Play, UsersRound, Film, Plus, Minus, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { addToMyList, getMyList, removeFromMyList } from "../utils/localStorageHelper";
import { getMovieById, getMovieRecommendations, getGenres, getActors } from "../service/movieService";
import { getProfile, getMyWatchlistIds, addToWatchlist, removeFromWatchlist } from "../service/authService";

function DetailMovie() {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [actorNames, setActorNames] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genreNames, setGenreNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isCheckingWatchlist, setIsCheckingWatchlist] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const scrollRef = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Bagian untuk mengecek movie setiap URL berubah
  const checkSubscriptionAndFetchData = useCallback(
    async (movieId) => {
      setIsLoading(true);
      setIsCheckingWatchlist(true);
      setError(null);
      setMovie(null);
      setActorNames([]);
      setGenreNames([]);
      setSimilarMovies([]);
      setIsAdded(false);
      setShowModal(false);
      setIsSubscribed(false);

      try {
        // cek status langganan
        const profileData = await getProfile();
        const isCurrentlySubscribed = profileData && profileData.subscription_type !== "none" && profileData.subscription_expired_at && new Date() < new Date(profileData.subscription_expired_at);
        setIsSubscribed(isCurrentlySubscribed);

        // ambil detail film
        const fetchedMovie = await getMovieById(movieId);
        if (!fetchedMovie) throw new Error("Movie not found");

        // ambil rekomendasi + aktor + genre
        const [fetchedRecommendations, currentAllActors, currentAllGenres] = await Promise.all([
          getMovieRecommendations(movieId),
          allActors.length > 0 ? Promise.resolve(allActors) : getActors(),
          allGenres.length > 0 ? Promise.resolve(allGenres) : getGenres(),
        ]);

        setMovie(fetchedMovie);
        setSimilarMovies(fetchedRecommendations);
        if (allActors.length === 0) setAllActors(currentAllActors);
        if (allGenres.length === 0) setAllGenres(currentAllGenres);

        // tampilkan nama aktor
        if (fetchedMovie.actors && currentAllActors.length > 0) {
          const names = fetchedMovie.actors.map((actorId) => currentAllActors.find((a) => a.id === actorId)?.name).filter(Boolean);
          setActorNames(names);
        }

        // tampilkan nama genre
        if (fetchedMovie.genre && currentAllGenres.length > 0) {
          const names = fetchedMovie.genre.map((genreId) => currentAllGenres.find((g) => g.id === genreId)?.name).filter(Boolean);
          setGenreNames(names);
        }

        // cek apakah film ada di watchlist
        const watchlistIds = await getMyWatchlistIds();
        setIsAdded(watchlistIds.includes(movieId));
      } catch (err) {
        console.error("Error fetching movie details:", err);
        if (err.message === "Movie not found") {
          setError("Movie not found");
        } else if (err.message === "Subscription required") {
          setError(null);
          setShowModal(true);
        } else {
          setError("Failed to load movie details.");
        }
      } finally {
        setIsLoading(false);
        setIsCheckingWatchlist(false);
      }
    },
    [allActors, allGenres]
  );

  useEffect(() => {
    if (id) {
      checkSubscriptionAndFetchData(numericId);
    }
  }, [id, numericId, checkSubscriptionAndFetchData]);

  const handleAddList = async () => {
    if (!movie || !movie.id) return;

    try {
      if (isAdded) {
        // Panggil API untuk remove
        await removeFromWatchlist(movie.id);
        setIsAdded(false);
      } else {
        // Panggil API untuk add
        await addToWatchlist(movie.id);
        setIsAdded(true);
      }
    } catch (err) {
      console.error("Failed to update watchlist:", err);
      // Tampilkan error ke user
      alert(`Failed to ${isAdded ? "remove movie from" : "add movie to"} your list. Please try again.`);
    }
  };

  // Untuk scroll similiar movie
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

  // Tampilan popup untuk yang belum rent
  if (showModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop blur */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md"></div>

        {/* Modal Content */}
        <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 border border-[#00BFFF]/20">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-[#00BFFF]/10 p-4 rounded-full">
              <Play className="w-12 h-12 text-[#00BFFF] fill-[#00BFFF]" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white text-center mb-3">Rent Required</h2>

          {/* Description */}
          <p className="text-gray-300 text-center mb-8">You need to rent this movie to access its details and watch the content. Rent now to enjoy unlimited movie access!</p>

          {/* Buttons */}
          <div className="space-y-3">
            <button onClick={() => navigate("/rent")} className="w-full bg-[#00BFFF] hover:bg-[#00A8E1] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-white" />
              Rent Now
            </button>

            <button onClick={() => navigate("/home")} className="w-full border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10 font-semibold py-3 px-6 rounded-full transition-all duration-300">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-white text-center pt-40 flex justify-center items-center">
        <LoaderCircle className="w-10 h-10 animate-spin text-[#00BFFF]" />
        <span className="ml-4 text-lg">Loading movie details...</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 pt-40">{error}</div>;
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center py-20 text-white">
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-white px-20 pt-28 flex gap-20">
        {/* Section Kiri */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img src={movie.image} alt={movie.title} className="w-[320px] h-[480px] object-cover rounded-2xl shadow-lg" />
        </div>

        {/* Section Kanan */}
        <div className="flex flex-col justify-start max-w-3xl">
          {/* Tahun */}
          <span className="text-[#00BFFF] font-medium text-sm mb-2">{movie.year}</span>

          {/* Judul */}
          <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>

          {/* Durasi & Genre */}
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-[#00BFFF] text-sm font-semibold px-4 py-1 rounded-full">{movie.hour}</span>
            {genreNames.map((name) => (
              <span key={name} className="bg-[#00BFFF]  text-sm font-semibold px-4 py-1 rounded-full">
                {name}
              </span>
            ))}
          </div>

          {/* Rating & Views */}
          <div className="flex items-center gap-6 text-sm mb-4">
            <span className="flex items-center gap-2">
              <Star className="w-5 h-5 text-[#00BFFF] fill-[#00BFFF]" />
              Rating: {movie.rating}
            </span>
            <span className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#00BFFF]" />
              Views: {movie.views}
            </span>
          </div>

          {/* Actors */}
          {actorNames.length > 0 && (
            <div className="flex items-start gap-2 mb-4">
              <UsersRound className="w-5 h-5 text-[#00BFFF] mt-0.5" />
              <p>
                <span className="font-semibold">Actors:</span> {actorNames.join(", ")}
              </p>
            </div>
          )}

          {/* Synopsis */}
          <div className="mb-4">
            <p className="font-semibold mb-4 flex items-center gap-2">
              <Film className="w-5 h-5 text-[#00BFFF]" />
              Synopsis
            </p>
            <p className="text-gray-300 leading-relaxed text-justify">{movie.synopsis}</p>
          </div>

          {/* Tombol Rent & Add */}
          <div className="flex items-center gap-4 mt-6">
            {isSubscribed ? (
              <button disabled className="flex items-center gap-2 bg-gray-600 text-gray-400 font-semibold px-12 py-3 rounded-full cursor-not-allowed">
                <Play className="fill-gray-400" />
                Watch Now
              </button>
            ) : (
              <Link to="/rent" className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00A8E1] text-white font-semibold px-12 py-3 rounded-full transition duration-300">
                <Play className=" fill-white" />
                Rent
              </Link>
            )}

            <button
              onClick={handleAddList}
              className={`font-semibold px-12 py-3 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer 
                ${isCheckingWatchlist ? "bg-gray-600 text-gray-400 cursor-not-allowed" : isAdded ? "bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30" : "border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10"}`}
              title={isAdded ? "Remove from My List" : "Add to My List"}
            >
              {isCheckingWatchlist ? <LoaderCircle className="w-5 h-5 animate-spin" /> : isAdded ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              {isCheckingWatchlist ? "Checking..." : isAdded ? "Remove" : "Add List"}
            </button>
          </div>
        </div>
      </div>

      {/* Section Another Similar Recommend */}
      {similarMovies.length > 0 && (
        <section className="py-12 px-20 relative">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-white">Another Similar Recommend</h2>
          </div>

          <div className="relative">
            {/* tombol arrow back < */}
            {similarMovies.length > 5 && (
              <button onClick={() => scroll("left")} className="absolute -left-15 top-1/2 -translate-y-1/2 z-10 text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer">
                <ChevronLeft className="w-10 h-10" />
              </button>
            )}
            {/* tampilan semua data film berdasarkan genre serupa */}
            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth pt-4">
              {similarMovies.map((data) => (
                <Link key={data.id} to={`/movie/${data.id}`} className="bg-[#2B2B2B] rounded-2xl overflow-hidden w-72 shadow-lg flex-shrink-0 snap-start hover:scale-105 transition-transform duration-300">
                  {/* Gambar film */}
                  <img src={data.image} alt={data.title} className="w-full h-92 object-cover" />

                  {/* Info bawah gambar */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white line-clamp-1">{data.title}</h3>
                    <div className="flex items-center text-gray-400 text-sm mt-1 space-x-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#00BFFF] fill-[#00BFFF]" />
                        {data.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-[#00BFFF]" />
                        {data.views}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* tombol arrow next > */}
            {similarMovies.length > 5 && (
              <button onClick={() => scroll("right")} className="absolute -right-15 top-1/2 -translate-y-1/2 z-10 text-[#00BFFF] p-3 md:block hover:text-white cursor-pointer">
                <ChevronRight className="w-10 h-10" />
              </button>
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default DetailMovie;
