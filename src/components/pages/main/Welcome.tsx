/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { TourCategory } from "@/shared/api/tourCategoryApi";
import Button from "@/components/ui/Button/Button";

interface WelcomeProps {
  data: TourCategory[];
}

export default function Welcome({ data }: WelcomeProps) {
  const backgrounds = [
    "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    "https://ipt.images.tshiftcdn.com/204440/x/0/12-day-kyrgyzstan-photo-tour-mountains-lakes-canyons.jpg",
    "https://icelandair.breezesim.com/cdn/shop/files/Kyrgyzstan_83c1f4cc9a.jpg",
    "https://www.nomadasaurus.com/wp-content/uploads/2016/10/Jyrgalan-Trek.jpg",
    "https://cdn.explorekazakhstan.net/images/tours/47/1_1000x560.webp",
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [bgIndex]);

  return (
    <section className="relative min-h-screen text-white overflow-hidden bg-black">
      {/* Animated Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
          }}
        />
      </AnimatePresence>

      {/* Modern Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-tl from-cyan-500/10 via-transparent to-emerald-500/10" />

      {/* Floating Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Navigation Dots */}
      <div className="absolute top-6 right-6 z-20 flex gap-2">
        {backgrounds.map((_, i) => (
          <button
            key={i}
            onClick={() => setBgIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === bgIndex
                ? "bg-white w-12 shadow-lg shadow-white/50"
                : "bg-white/30 hover:bg-white/60 w-8"
            }`}
            aria-label={`Background ${i + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl mx-auto lg:mx-0 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Discover Central Asia</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-emerald-100 bg-clip-text text-transparent">
                Kyrgyzstan
              </span>
              <br />
              <span className="text-white/90">tours</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/80 max-w-xl">
              Issyk-Kul Lake is the second largest mountain lake in the world at
              an altitude of 1,607 meters above sea level, depth of 668 meters
              asl. Lake is situated at the territory of the Issyk-Kul Biosphere
              Reserve.
            </p>

            <Link href={"/tour"}>
              <Button
                className="h-12"
                variant="gradient"
                icon={
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                }
                iconPosition="right"
              >
                Book Now
              </Button>
            </Link>
          </motion.div>
          {/* Right Content - Carousel */}
          {/* Right Content - Category Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6"
          >
            {data?.slice(0,6).map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative aspect-square rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <Link href="/tour" className="block w-full h-full">
                  <div className="absolute inset-0">
                    <img
                      src={cat.image ?? "/placeholder.jpg"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      alt={cat.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-emerald-500/10  group-hover:to-emerald-500/20 transition-all duration-500" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white drop-shadow-2xl">
                      {cat.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-cyan-300">Explore</span>
                      <ChevronRight className="w-3 h-3 text-cyan-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
