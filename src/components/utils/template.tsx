"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Анимация входа (баннеры уходят вверх)
  const animatePageIn = () => {
    const banners = [
      document.getElementById("banner-1"),
      document.getElementById("banner-2"),
      document.getElementById("banner-3"),
      document.getElementById("banner-4"),
    ];

    const pathText = document.getElementById("path-text");

    if (banners.every(Boolean)) {
      const tl = gsap.timeline();

      // Анимация текста пути
      if (pathText) {
        tl.fromTo(
          pathText,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
        ).to(pathText, { opacity: 0, duration: 0.2, delay: 0.3 });
      }

      // Анимация баннеров
      tl.to(
        banners,
        {
          yPercent: -100,
          stagger: 0.15,
          duration: 0.5,
          ease: "power3.inOut",
        },
        "-=0.2"
      );
    }
  };

  useEffect(() => {
    animatePageIn();
  }, [pathname]);

  const formatPathname = (path: string) => {
    if (path === "/") return "Home";
    return path
      .split("/")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" / ");
  };

  return (
    <div className="hidden ">
      <div
        id="banner-1"
        className="min-h-screen bg-[#0A8791] z-30 fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-[#0A8791] z-30 fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-[#0A8791] z-30 fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-[#0A8791] z-30 fixed top-0 left-3/4 w-1/4"
      />

      {/* Текст с pathname по центру */}
      <div
        id="path-text"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 text-white text-4xl font-bold text-center opacity-0"
      >
        {formatPathname(pathname)}
      </div>

      {children}
    </div>
  );
}
