import React, { useState } from "react";
import { genres } from "../data/allData";

export default function GenreBar({ onSelectGenre }) {
  // untuk mengatur state perpindahan genre nantinya
  const [activeGenre, setActiveGenre] = useState("All Movies");

  const handleClick = (genre) => {
    setActiveGenre(genre);
    if (onSelectGenre) onSelectGenre(genre);
  };

  return (
    <div className="flex flex-wrap gap-3 pb-12">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => handleClick(genre)}
          className={`flex-grow px-8 py-2.5 rounded-full font-medium transition-all duration-130 whitespace-nowrap
        ${activeGenre === genre ? "bg-[#00BFFF] text-white" : "bg-[#3A3A3A] text-gray-300 hover:bg-[#00BFFF]/70 hover:text-white"}`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
