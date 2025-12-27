"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface TemplateProps {
  children: React.ReactNode;
}

export default function Template({ children }: TemplateProps) {
  const pathname = usePathname();

  // Анимация входа (баннеры уходят в верх)
  const animatePageIn = () => {
    const banners = [
      document.getElementById("banner-1"),
      document.getElementById("banner-2"),
      document.getElementById("banner-3"),
      document.getElementById("banner-4"),
    ];

    if (banners.every(Boolean)) {
      const tl = gsap.timeline();
      tl.to(banners, {
        yPercent: -100,
        stagger: 0.15,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  };

  // Баннеры закрывают страницу перед переходом

  // Анимация входа при каждом изменении пути
  useEffect(() => {
    animatePageIn();
  }, [pathname]);

  return (
    <div>
      <div
        id="banner-1"
        className="min-h-screen bg-white z-30 fixed top-0 left-0 w-1/4"
      />
      <div
        id="banner-2"
        className="min-h-screen bg-white z-30 fixed top-0 left-1/4 w-1/4"
      />
      <div
        id="banner-3"
        className="min-h-screen bg-white z-30 fixed top-0 left-2/4 w-1/4"
      />
      <div
        id="banner-4"
        className="min-h-screen bg-white z-30 fixed top-0 left-3/4 w-1/4"
      />
      {children}
    </div>
  );
}
