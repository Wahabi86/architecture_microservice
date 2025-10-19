import React, { useEffect, useState } from "react";
import { Eye, Star, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { getMyList, removeFromMyList } from "../utils/localStorageHelper";

function MyList() {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    setMyList(getMyList());
  }, []);

  const handleRemove = (id) => {
    removeFromMyList(id);
    setMyList(getMyList());
  };

  return (
    <div className="px-20 pt-28 text-white">
      <h1 className="text-4xl font-bold mb-10">My List</h1>

      {myList.length === 0 ? (
        <p className="text-gray-400">You haven’t added any movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 pb-12">
          {myList.map((movie) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;
