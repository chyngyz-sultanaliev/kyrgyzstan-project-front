import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-[#0A8791] shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo / карта Кыргызстана */}
        <div className="flex items-center space-x-3">
          <img
            src="https://stat.gov.kg/media/maksat/2020/12/17/isyk-kol-01.png"
            alt="Kyrgyzstan Map"
            className="w-25 h-12 object-cover"
          />
          <span className="text-white text-2xl font-bold">
            Kyrgyzstan Tourism Industry
          </span>
        </div>

        {/* Навигация */}
        <nav className="flex items-center space-x-6 text-white font-medium">
          <Link href="/" className="hover:text-gray-200 transition-colors">
            Home
          </Link>
          <Link href="/tours" className="hover:text-gray-200 transition-colors">
            Tours
          </Link>
          <Link href="/car" className="hover:text-gray-200 transition-colors">
            Cars
          </Link>
          <Link href="/hotel" className="hover:text-gray-200 transition-colors">
            Hotel
          </Link>
        </nav>

        {/* Кнопка login */}
        <div>
          <button className="bg-white text-[#0A8791] px-5 py-2 rounded-lg shadow hover:bg-gray-200 transition">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
