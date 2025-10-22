import React, { useState, useEffect } from "react";
import { Search, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getMovies } from "../service/movieService";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
    // Jangan lakukan pencarian jika input kosong
    if (searchInput.trim() === "") {
        setSearchResults([]);
        setIsOpen(false);
        setIsLoading(false); // Pastikan loading false jika input kosong
        return; // Hentikan eksekusi
    }

    setIsLoading(true);
    setIsOpen(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        console.log(`Searching movies with query: "${searchInput}"`);
        const results = await getMovies(searchInput);
        setSearchResults(results); // Simpan hasil ke state
      } catch (error) {
        console.error("Error searching movies:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Navigasi ke halaman detail movie
  const handleSelectMovie = (movieId) => {
    navigate(`/movie/${movieId}`);
    setSearchInput("");
    setSearchResults([]);
    setIsOpen(false);
  };

  const closeDropdown = () => {
      setIsOpen(false);
  };

  return (
    <div className="relative w-65">
      <input
        type="text"
        placeholder="Search..."
        value={searchInput}
        onChange={handleInputChange}
        onFocus={() => searchInput && setIsOpen(true)}
        onBlur={() => setTimeout(closeDropdown, 200)} // delay agar user bisa klik hasil
        className="bg-transparent border border-[#00BFFF] rounded-full px-4 py-1.5 pl-5 w-full focus:outline-none text-white placeholder-gray-400"
      />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00BFFF] w-5 h-5 pointer-events-none"></Search>

      {/* Section Dropdown */}
      {isOpen && (
         <div className="absolute top-full mt-2 w-full bg-gray-900 border border-[#00BFFF] rounded-lg shadow-lg max-h-96 overflow-y-auto z-50 scrollbar-hide">
             {isLoading && <div className="p-3 text-gray-400 text-center">Searching...</div>}

             {!isLoading && searchResults.length > 0 && (
                 searchResults.map((movie) => (
                    <div key={movie.id} onMouseDown={() => handleSelectMovie(movie.id)} className="flex items-center gap-3 p-3 hover:bg-gray-800 cursor-pointer transition-colors border-b border-gray-800 last:border-b-0">
                      <img src={movie.image}
                           alt={movie.title}
                           className="w-12 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                        <p className="text-gray-400 text-sm truncate">
                          Genres: {Array.isArray(movie.genre) ? movie.genre.join(", ") : 'N/A'} • {movie.year || 'N/A'}
                        </p>
                        <p className="text-[#00BFFF] text-xs flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#00BFFF]" /> {movie.rating}
                        </p>
                      </div>
                    </div>
                 ))
             )}

             {!isLoading && searchInput.trim() !== "" && searchResults.length === 0 && (
                 <div className="p-4 text-center text-gray-400">No movies found</div>
             )}
         </div>
       )}
    </div>
  );
}

export default SearchBar;
