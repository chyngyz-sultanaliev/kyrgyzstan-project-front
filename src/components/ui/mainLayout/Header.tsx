// src/components/ui/Header/Header.tsx
import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";
import Img from "../../../../public/logo.svg";

const Header = () => {
  return (
    <header className="bg-[#0A8791] py-4">
      <div className="container flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-16 text-white">
          <div className="flex items-center gap-2 ">
            <Image src={Img} alt="Logo" width={100} height={80} />
            <h1 className="text-2xl font-semibold mb-2">
              Kyrgyzstan Tourism Industry
            </h1>
          </div>
          <Link className="text-white text-[20px]" href="/">
            Main
          </Link>
          <Link className="text-white text-[20px]" href="/tour">
            Tour
          </Link>
          <Link className="text-white text-[20px]" href="/car">
            Car
          </Link>
          <Link className="text-white text-[20px]" href="/hotel">
            Hotel
          </Link>
        </div>

        {/* Navigation Links */}

        {/* Button */}
        <Button variant="primary">Войти</Button>
      </div>
    </header>
  );
};

export default Header;
