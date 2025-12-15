"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Welcome() {
  const backgrounds = [
    "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lyZ3l6c3RhbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://ipt.images.tshiftcdn.com/204440/x/0/12-day-kyrgyzstan-photo-tour-mountains-lakes-canyons.jpg?dpr=2&height=360&quality=65",
    "https://icelandair.breezesim.com/cdn/shop/files/Kyrgyzstan_83c1f4cc9a.jpg?v=1759400076",
    "https://www.nomadasaurus.com/wp-content/uploads/2016/10/Jyrgalan-Trek.jpg",
    "https://cdn.explorekazakhstan.net/images/tours/47/1_1000x560.webp",
  ];

  const categories = [
    {
      title: "group-tours",
      img: "https://t3.ftcdn.net/jpg/01/72/11/78/360_F_172117865_2JkKUkVzOG93FVeZIK7gHkxmvmD8JbOB.jpg",
      full: "Issyk-Kul Lake is the second largest mountain lake in the world at an altitude of 1,607 meters above sea level, with a depth of 668 meters. The lake is situated within the Issyk-Kul Biosphere Reserve, a protected area recognized for its unique ecosystems. Issyk-Kul Lake stretches 182 kilometers in length and about 60 kilometers in width, covering an area of 6,236 square kilometers and serving as one of Central Asia’s most important natural landmarks.",
    },
    {
      title: "horseback-riding",
      img: "https://media.istockphoto.com/id/156209467/photo/horse-and-mountains.jpg?s=612x612&w=0&k=20&c=lrKB7724ExU5tiTOZ9RG03n80QJqufk0GA2bhqE4Pl4=",
      full: "Horseback riding tours in Kyrgyzstan offer a unique way to explore remote alpine valleys, high mountain pastures and ancient nomadic routes. Travelers experience traditional horse culture, stay in yurts and traverse breathtaking landscapes that are inaccessible by vehicle, making these tours an authentic and immersive adventure.",
    },
    {
      title: "excursions",
      img: "https://cabar.asia/wp-content/uploads/2024/09/Zapovednik-Kyrgyz-Ata-Oshskaya-oblast-Kyrgyzstan.-Foto-PROON-Kyrgyzstan.jpeg",
      full: "Excursion tours across Kyrgyzstan combine natural beauty, cultural heritage and historical exploration. These journeys include visits to national parks, mountain gorges, ancient caravan routes and UNESCO-recognized sites, offering deep insight into the country’s history, traditions and diverse landscapes.",
    },
    {
      title: "ethno-tourism",
      img: "https://eurasia.travel/wp-content/uploads/2024/09/kyrgyzstan-nature-3-1024x683.jpg",
      full: "Ethno-tourism in Kyrgyzstan introduces travelers to the traditional nomadic lifestyle through stays in yurts, participation in local festivals and hands-on experiences with crafts, music and cuisine. These tours preserve cultural heritage while offering meaningful connections with local communities.",
    },
    {
      title: "hiking",
      img: "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5",
      full: "Hiking tours explore Kyrgyzstan’s diverse mountain terrain, including alpine lakes, forested valleys and high-altitude passes. Routes vary from easy day hikes to multi-day treks, providing opportunities to experience pristine nature, wildlife and panoramic mountain scenery.",
    },
    {
      title: "mountaineering",
      img: "https://images.locationscout.net/2024/09/ala-kul-lake-viewpoint-kyrgyz-republic-g6rh.jpg?w=1080&q=60",
      full: "Mountaineering expeditions in Kyrgyzstan are designed for experienced climbers seeking high-altitude challenges. These tours include ascents of iconic peaks, glacier travel and technical routes, supported by professional guides and safety-focused logistics.",
    },
  ];

  const [bgIndex, setBgIndex] = useState(0);
  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((i) => (i + 1) % backgrounds.length);
      setCatIndex((i) => (i + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      <motion.div
        key={bgIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{ backgroundImage: `url(${backgrounds[bgIndex]})` }}
        className="absolute inset-0 bg-cover bg-center bg-fixed"
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10  px-4 sm:px-6 md:px-12 lg:px-24 sm:py-16 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 lg:gap-12">
        <div className="max-w-full mt-30 sm:mb-10 lg:max-w-xl ">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 capitalize">
            {categories[catIndex].title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-6">
            {categories[catIndex].full}
          </p>
          <button className="flex items-center gap-3 bg-linear-to-r from-teal-500 to-teal-700 px-6 py-3 rounded-2xl text-lg sm:text-xl font-semibold">
            book <ChevronRight />
          </button>
        </div>

        <div className="w-full h-80 mt-30 sm:h-96 my-20 flex items-center justify-center">
          <div
            className="relative w-[180px] sm:w-[200px] md:w-[250px] h-full"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
              className="relative w-full h-full transform-3d"
            >
              {categories.map((cat, i) => {
                const angle = (360 / categories.length) * i;
                return (
                  <div
                    key={i}
                    className="absolute  w-full h-full flex flex-col items-center justify-center"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(280px)`,
                    }}
                  >
                    <div className="w-44 sm:w-56 h-64 sm:h-80 bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-110">
                      <Link href="/tour">
                        <img
                          src={cat.img}
                          className="w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    <p className="mt-2 sm:mt-3 text-sm sm:text-xl font-medium capitalize">
                      {cat.title}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
