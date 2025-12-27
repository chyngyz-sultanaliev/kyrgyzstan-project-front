"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { TourCategory } from "@/shared/api/tourCategoryApi";



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


  return (
    <section className="relative min-h-screen text-white overflow-hidden">
      <div
        key={bgIndex}
        className="absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-1500"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          opacity: 1,
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 container mx-auto px-4 sm:px-8 py-30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-xl sm:py-20 mb-20 lg:py-30">
          <h1 className="text-4xl py-5 sm:text-3xl pl-2 lg:text-6xl font-bold">
            Kyrgyzstan tours
          </h1>

          <p className="text-base py-4 sm:text-lg pl-2 leading-relaxed mb-8">
            Issyk-Kul Lake is the second largest mountain lake in the world at
            an altitude of 1,607 meters above sea level, depth of 668 meters
            asl. Lake is situated at the territory of the Issyk-Kul Biosphere
            Reserve. Issyk-Kul Lake is 182 kilometers long and about 60
            kilometers wide, with an area of 6,236 square kilometers.
          </p>

          <button className="flex items-center gap-2 bg-linear-to-r from-cyan-500 to-teal-600 px-6 py-3 ml-2 rounded-xl text-lg font-semibold hover:scale-105 transition">
            Book <ChevronRight />
          </button>
        </div>

        <div className="relative w-full h-72 sm:h-96 flex items-center justify-center">
          <div
            className="relative w-36 sm:w-[200px] h-64 sm:h-[400px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 60 }}
              className="relative w-full h-full transform-3d"
            >
              {data?.map((cat, i) => {
                const count = data.length;
                const angle = 360 / count;
                const radius = Math.min(Math.max(count * 40, 160), 420);

                return (
                  <div
                    key={cat.id}
                    className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
                    style={{
                      transform: `rotateY(${
                        i * angle
                      }deg) translateZ(${radius}px)`,
                    }}
                  >
                    <div className="w-54 sm:w-60 h-70 sm:h-80 bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-110">
                      <Link href="/tour">
                        <img
                          src={cat.image ?? "/placeholder.jpg"}
                          className="w-full h-full object-cover"
                          alt={cat.name}
                        />
                      </Link>
                    </div>

                    <p className="mt-2 sm:mt-3 text-base sm:text-xl font-medium">
                      {cat.name}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
