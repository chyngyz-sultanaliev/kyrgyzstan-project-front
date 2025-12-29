"use client";
import Link from "next/link";
import Image from "next/image";
import Img from "../../../../public/footer_logo.png";
import Button from "@/components/ui/Button/Button";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useGetProfileQuery } from "@/shared/api/profileApi";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: profile, isLoading } = useGetProfileQuery();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tour", label: "Tour" },
    { href: "/car", label: "Car" },
    { href: "/hotel", label: "Hotel" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  return (
    <header className="sticky top-0 z-50 bg-[linear-gradient(90deg,#3C5F63_19.23%,#5B9096_63.46%,#3B8C95_100%)] shadow-lg">
      <div className=" relative container mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
          >
            <Image
              src={Img}
              alt="Kyrgyzstan Tourism Logo"
              width={100}
              height={80}
              className="w-auto h-8 sm:h-10"
            />
            <h1 className="text-xs sm:text-base md:text-lg lg:text-xl font-semibold text-white leading-tight">
              Kyrgyzstan Tourism Industry
            </h1>
          </Link>

          {/* Desktop Navigation and User Actions */}
          <div className="hidden min-[900px]:flex items-center gap-6 lg:gap-8">
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    className="relative group text-white text-base lg:text-lg font-medium transition-colors"
                    key={link.href}
                    href={link.href}
                  >
                    {link.label}

                    {/* underline */}
                    <span
                      className={`
            absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="h-8 w-px bg-white/30"></div>

            {/* Desktop User Actions */}
            <div className="flex items-center gap-3">
              {!profile && !isLoading && (
                <Link href="/login">
                  <Button variant="primary" className="px-5">
                    Войти
                  </Button>
                </Link>
              )}

              {isLoading && (
                <div className="w-9 h-9 rounded-full bg-white/30 animate-pulse" />
              )}

              {profile && (
                <Link
                  href={profile.isAdmin ? "/admin" : "/profile"}
                  className="w-9 h-9 rounded-full overflow-hidden bg-white/20 hover:bg-white/30 transition-all ring-2 ring-white/50 flex items-center justify-center"
                  title={profile.isAdmin ? "Admin panel" : profile.username}
                >
                  {profile.avatar ? (
                    <Image
                      src={profile.avatar}
                      alt="Profile avatar"
                      width={36}
                      height={36}
                    />
                  ) : (
                    <span className="text-white text-sm font-semibold">
                      {profile.username?.[0]?.toUpperCase()}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="min-[900px]:hidden text-white p-2 hover:bg-white/20 rounded-lg transition-all active:scale-95"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm min-[900px]:hidden z-40"
              onClick={() => setIsMenuOpen(false)}
            ></div>

            {/* Mobile Menu Panel */}
            <div className="fixed top-0 right-0 h-full w-50 max-w-[85vw] bg-white shadow-2xl min-[900px]:hidden z-50 animate-in slide-in-from-right">
              {/* Menu Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-[#3C5F63] to-[#3B8C95]">
                <h2 className="text-lg font-semibold text-white">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white p-2 hover:bg-white/20 rounded-lg transition-all"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Content */}
              <div className="p-5 overflow-y-auto h-[calc(100vh-80px)]">
                {/* User Actions */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                    Account
                  </p>

                  {!profile && !isLoading && (
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="primary" className="text-sm">
                        Login
                      </Button>
                    </Link>
                  )}

                  {profile && (
                    <Link
                      href={profile.isAdmin ? "/admin" : "/profile"}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 hover:bg-gray-300 transition flex items-center justify-center"
                      aria-label={profile.isAdmin ? "Admin panel" : "Profile"}
                    >
                      {profile.avatar ? (
                        <Image
                          src={profile.avatar}
                          alt="User avatar"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 text-sm font-semibold">
                          {profile.username?.[0]?.toUpperCase()}
                        </span>
                      )}
                    </Link>
                  )}
                </div>

                {/* Navigation Links */}
                <nav>
                  <p className="text-xs text-gray-500 mb-3 uppercase tracking-wide">
                    Navigation
                  </p>
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                            isActive
                              ? "bg-[#0A8791] text-white"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
