"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Welcome() {
  const categories = [
    {
      title: "Group Tours",
      img: "https://www.lifetripjourney.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2Flifetripjourney%2Fkyrgyzstan%2FYELTSIN-PEAK.webp%3FupdatedAt%3D1735913882394%26tr%3Aq-80%2Cw-800&w=1920&q=75",
    },
    {
      title: "Horseback Riding",
      img: "https://media.istockphoto.com/id/2222062987/photo/kyrgyzstan-iconic-picture-traditional-kyrgyz-yurts-with-horses-in-a-scenic-mountains.jpg?s=612x612&w=0&k=20&c=4-32nE_LlYQN7_UUWBaRNsey5UQ7vTTebb9jIgrBHxY=",
    },
    {
      title: "Excursions",
      img: "https://cabar.asia/wp-content/uploads/2024/09/Zapovednik-Kyrgyz-Ata-Oshskaya-oblast-Kyrgyzstan.-Foto-PROON-Kyrgyzstan.jpeg",
    },
    {
      title: "Trekking",
      img: "https://optim.tildacdn.com/tild3738-6337-4363-b738-366161383038/-/resize/824x/-/format/webp/5Z6A6941.jpg.webp",
    },
    {
      title: "Winter Tours",
      img: "https://media.istockphoto.com/id/899693290/photo/nice-mountains-in-kyrgyzstan-country.jpg?s=612x612&w=0&k=20&c=cPwF-NwqG6VGAJJLwkKyhN3C1zcXDkxzahOTZ4CFEBg=",
    },
    {
      title: "Ethno Tours",
      img: "https://live.worldtourismforum.net/uploads/kyrgyzstan-tourism-2025.jpg",
    },
  ];

  const backgroundImages = categories.map((c) => c.img);
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="w-full min-h-screen text-white overflow-x-hidden font-[Inter]">
      <section className="relative h-screen flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${backgroundImages[currentBg]}')` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/20" />

        {/* LEFT TEXT BLOCK */}
        <div className="relative z-10 w-full max-w-3xl pl-20">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-6xl font-semibold tracking-tight leading-tight drop-shadow-xl"
          >
            Group-tours
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-[18px] text-white/90 leading-relaxed drop-shadow-lg max-w-xl"
          >
            Issyk-Kul Lake is the second largest mountain lake in the world
            located at an altitude of 1,607 meters above sea level.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-8 relative px-8 py-3 text-lg font-medium bg-white text-black rounded-xl shadow-xl hover:bg-white/90 transition-all duration-300"
          >
            Book →
          </motion.button>
        </div>

        {/* RIGHT CATEGORY CAROUSEL */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-row space-x-6 overflow-x-auto w-[840px] h-[400px] py-4 scrollbar-none scroll-width-[none]">
          {categories.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="group relative min-w-60 h-[300px] rounded-2xl overflow-hidden shadow-xl bg-white/10 backdrop-blur-xl border border-white/20 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={c.img}
                className="w-full h-full object-cover group-hover:scale-110 duration-500"
              />
              <div className="absolute bottom-0 w-full bg-linear-to-t from-black/70 to-transparent p-4 text-center text-lg font-semibold tracking-wide">
                {c.title}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
