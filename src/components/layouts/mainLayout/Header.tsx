import Link from "next/link";
import Image from "next/image";
import Img from "../../../../public/footer_logo.png";
import Button from "@/components/ui/Button/Button";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[linear-gradient(90deg,#3C5F63_19.23%,#5B9096_63.46%,#3B8C95_100%)] py-4">
      <div className="container flex justify-between items-center px-4">
        <div className="flex items-center    md:gap-5 lg:gap-14 text-white">
          <div className="flex items-center gap-2">
            <Image
              src={Img}
              alt="Logo"
              width={100}
              height={80}
              className="w-auto h-10"
            />
            <h1 className="text-[16px] sm:text-2xl  font-semibold mb-2 ">
              Kyrgyzstan Tourism Industry
            </h1>
          </div>
          <Link className="text-white text-[20px] hidden min-[900px]:block" href="/">
            Main
          </Link>
          <Link className="text-white text-[20px] hidden min-[900px]:block" href="/tour">
            Tour
          </Link>
          <Link className="text-white text-[20px] hidden min-[900px]:block" href="/car">
            Car
          </Link>
          <Link className="text-white text-[20px] hidden min-[900px]:block" href="/hotel">
            Hotel
          </Link>
        </div>
        <div className="hidden min-[900px]:flex items-center gap-5">
          <Link href={"/login"}>
            <Button variant="primary">Войти</Button>
          </Link>
          <Link
            href={"/admin"}
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
          ></Link>
          <Link
            href={"/profile"}
            className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
          ></Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="min-[900px]:hidden text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="min-[700px]:hidden  px-4 mt-4 pb-4 border-t border-white/20">
          <nav className="flex flex-col gap-3 mt-4">
            <div className="flex items-center gap-5 mt-2">
              <Link href={"/login"}>
                <Button variant="primary">Войти</Button>
              </Link>
              <Link
                href={"/admin"}
                className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
              ></Link>
              <Link
                href={"/profile"}
                className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 cursor-pointer"
              ></Link>
            </div>
            <Link
              className="text-white text-[20px]"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Main
            </Link>
            <Link
              className="text-white text-[20px]"
              href="/tour"
              onClick={() => setIsMenuOpen(false)}
            >
              Tour
            </Link>
            <Link
              className="text-white text-[20px]"
              href="/car"
              onClick={() => setIsMenuOpen(false)}
            >
              Car
            </Link>
            <Link
              className="text-white text-[20px]"
              href="/hotel"
              onClick={() => setIsMenuOpen(false)}
            >
              Hotel
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;