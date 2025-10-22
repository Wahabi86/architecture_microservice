import React from "react";

export default function GenreBar({ genres = [], activeGenre, onSelectGenre }){
  // untuk mengatur state perpindahan genre nantinya
  // const [activeGenre, setActiveGenre] = useState("All Movies");

  const handleClick = (genreName) => {
    if (onSelectGenre) onSelectGenre(genreName); // Panggil handler dari parent
  };

  return (
    <div className="flex flex-wrap gap-3 pb-12">
      {genres.map((genreName) => (
        <button
          key={genreName}
          onClick={() => handleClick(genreName)}
          className={`flex-grow px-8 py-2.5 rounded-full font-medium transition-all duration-130 whitespace-nowrap
        ${activeGenre === genreName ? "bg-[#00BFFF] text-white" : "bg-[#3A3A3A] text-gray-300 hover:bg-[#00BFFF]/70 hover:text-white"}`}
        >
          {genreName}
        </button>
      ))}
    </div>
  );
}
