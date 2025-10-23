import React from "react";
import { Play, Plus } from "lucide-react";
import TrendsNow from "../components/TrendsNow";
import MainMovie from "../components/MainMovie";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/src/assets/background/background1.jpg')",
        }}
      >
        {/* Membuat background lebih gelap */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75"></div>

        {/* Tambahan untuk efek fade bawah (Pudar Gelap) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#1F1F1F]"></div>

        {/* Konten Pertama Top */}
        <div className="relative z-10 max-w-4xl px-8 md:px-20 text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Discover, Rent, and Enjoy Your Favorite Movies</h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
            Welcome to <span className="text-[#00BFFF] font-semibold">Mebalih Film</span> — your ultimate movie rental platform. Explore a wide range of the latest blockbusters, timeless classics, and hidden gems. Rent and watch anytime.
          </p>

          {/* Tombol Rent & Add */}
          <div className="flex gap-4 text-lg">
            <Link to="/rent" className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00A8E1] text-white font-semibold px-10 py-4 rounded-full transition duration-300 shadow-lg hover:shadow-xl ">
              <Play className="fill-white w-5 h-5" />
              Rent Now
            </Link>
          </div>
        </div>
      </section>
      {/* Section TrendNows */}
      <TrendsNow />

      {/* Section All Data Movie  */}
      <MainMovie />
    </>
  );
}
