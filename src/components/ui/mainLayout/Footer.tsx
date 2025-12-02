import React from "react";
import { FaInstagram, FaFacebookF, FaVk, FaEnvelope } from "react-icons/fa";
import Image from "next/image";
import Img from "../../../../public/logo.svg"; // replace with your logo path

const Footer = () => {
  return (
    <footer className="bg-[#4F7C83] text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image src={Img} alt="Logo" width={900} height={500} />
            <h1 className="text-xl font-semibold">
              Kyrgyzstan <br /> Tourism <br /> Industry
            </h1>
          </div>
          <div className="flex gap-3 text-xl">
            <FaInstagram className="hover:text-gray-300 cursor-pointer" />
            <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
            <FaVk className="hover:text-gray-300 cursor-pointer" />
            <FaEnvelope className="hover:text-gray-300 cursor-pointer" />
          </div>
          <div>
            {/* Optional map or other info */}
          </div>
        </div>

        {/* Tour Column */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Tour</h3>
          <ul className="space-y-2">
            <li>Batken</li>
            <li>Jalal-Abad</li>
            <li>Issyk-kul</li>
            <li>Naryn</li>
            <li>Osh</li>
            <li>Talas</li>
            <li>Chyi</li>
          </ul>
        </div>

        {/* Car Column */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Car</h3>
          <ul className="space-y-2">
            <li>Games</li>
            <li>National instruments</li>
            <li>National clothes</li>
            <li>Hand crafts</li>
            <li>Currency</li>
            <li>Kitchen</li>
          </ul>
        </div>

        {/* Hotel Column */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Hotel</h3>
          <ul className="space-y-2">
            <li>Games</li>
            <li>National instruments</li>
            <li>National clothes</li>
            <li>Hand crafts</li>
            <li>Currency</li>
            <li>Kitchen</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
