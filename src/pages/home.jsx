import React from "react";
import { Play, Plus } from "lucide-react";
import TrendsNow from "../components/TrendsNow";
import MainMovie from "../components/MainMovie";

export default function Home() {
  return (
    <>
      <section
        className="relative h-screen bg-cover bg-center flex items-center"
        style={{
          backgroundImage: "url('/src/assets/background1.jpg')",
        }}
      >
        {/* Membuat background lebih gelap */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70"></div>

        {/* Tambahan untuk efek fade bawah (Pudar Gelap) */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-[#1F1F1F]"></div>

        {/* Kontem Pertama Top */}
        <div className="relative z-10 max-w-3xl px-8 md:px-20 text-white">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">Stranger Things</h1>

          <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
            A deadly new villain named Vecna rises from the Upside Down, targeting the teens of Hawkins with horrifying visions. As Eleven tries to regain her lost powers, the group uncovers dark secrets linking Vecna to Hawkins’ past and a
            new gateway threatening their world.
          </p>

          {/* Tombol */}
          <div className="flex gap-4 text-lg">
            <button className="flex items-center gap-2 bg-[#00BFFF] hover:bg-[#00A8E1] text-white font-semibold px-12 py-3 rounded-full transition duration-300">
              <Play />
              Rent
            </button>

            <button className="flex items-center gap-2 bg-gray-800/90 hover:bg-gray-700 text-white font-semibold px-12 py-3 rounded-full transition duration-300">
              <Plus /> Add List
            </button>
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
