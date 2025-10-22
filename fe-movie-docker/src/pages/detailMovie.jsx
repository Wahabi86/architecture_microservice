import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Eye, Play, UsersRound, Film, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { addToMyList, getMyList, removeFromMyList } from "../utils/localStorageHelper";
import { getMovieById, getMovieRecommendations, getGenres, getActors } from "../service/movieService";

function DetailMovie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [actorNames, setActorNames] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [genreNames, setGenreNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdded, setIsAdded] = useState(false);  const scrollRef = useRef(null);

  // Bagian untuk mengecek movie setiap URL berubah
  useEffect(() => {
    // Fungsi async di dalam useEffect untuk mengambil data
    const fetchMovieData = async () => {
      setIsLoading(true);
      setError(null);
      setMovie(null);
      setActorNames([]);
      setGenreNames([]);
      setSimilarMovies([]);
      setIsAdded(false);

      try {
        const [
          fetchedMovie,
          fetchedRecommendations,
          currentAllActors,
          currentAllGenres,
        ] = await Promise.all([
          getMovieById(id),
          getMovieRecommendations(id),
          allActors.length > 0 ? Promise.resolve(allActors) : getActors(),
          allGenres.length > 0 ? Promise.resolve(allGenres) : getGenres(),
        ]);

        // Periksa apakah film berhasil diambil
        if (!fetchedMovie) {
          throw new Error("Movie not found");
        }
        setMovie(fetchedMovie);

        // Simpan daftar aktor/genre ke state jika baru diambil dari API
        if (allActors.length === 0) setAllActors(currentAllActors);
        if (allGenres.length === 0) setAllGenres(currentAllGenres);

        // Simpan rekomendasi film ke state
        setSimilarMovies(fetchedRecommendations);

        // Mapping Aktor
        if (fetchedMovie.actors && currentAllActors.length > 0) {
          const names = fetchedMovie.actors
            .map(actorId => currentAllActors.find(a => a.id === actorId)?.name)
            .filter(name => name);
          setActorNames(names);
        }

        // Mapping Genre
        if (fetchedMovie.genre && currentAllGenres.length > 0) {
            const names = fetchedMovie.genre
              .map(genreId => currentAllGenres.find(g => g.id === genreId)?.name)
              .filter(name => name);
            setGenreNames(names);
          }

        const list = getMyList();
        setIsAdded(list.some((item) => item.id === fetchedMovie.id));

      } catch (err) {
        console.error("Error fetching movie details:", err);
        if (err.message === "Movie not found") {
             setError("Film tidak ditemukan.");
        } else {
          setError("Gagal memuat detail film.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleAddList = () => {
    if (isAdded) {
      removeFromMyList(movie.id);
      setIsAdded(false);
    } else {
      addToMyList(movie);
      setIsAdded(true);
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

  if (isLoading) {
    return <div className="text-white text-center pt-40">Loading movie details...</div>;
  }

  return (
    <>
      <div className="text-white px-20 pt-28 flex gap-20">
        {/* Section Kiri */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <img
             src={movie.image}
             alt={movie.title}
             className="w-[320px] h-[480px] object-cover rounded-2xl shadow-lg"
          />
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
              <p><span className="font-semibold">Actors:</span> {actorNames.join(", ")}</p>
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
            <Link to="/rent" className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00A8E1] text-white font-semibold px-12 py-3 rounded-full transition duration-300">
              <Play className=" fill-white" />
              Rent
            </Link>

            <button
              onClick={handleAddList}
              className={`font-semibold px-12 py-3 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                isAdded ? "bg-red-500/20 border border-red-500 text-red-400 hover:bg-red-500/30" : "border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF]/10"
              }`}
              title={isAdded ? "Remove from My List" : "Add to My List"}
            >
              {isAdded ? <Minus /> : <Plus />}
              {isAdded ? "Remove" : "Add List"}
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
