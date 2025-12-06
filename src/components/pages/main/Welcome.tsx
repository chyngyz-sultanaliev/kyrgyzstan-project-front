"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function TourismLanding() {
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
    },
    {
      title: "horseback-riding",
      img: "https://media.istockphoto.com/id/156209467/photo/horse-and-mountains.jpg?s=612x612&w=0&k=20&c=lrKB7724ExU5tiTOZ9RG03n80QJqufk0GA2bhqE4Pl4=",
    },
    {
      title: "excursions",
      img: "https://cabar.asia/wp-content/uploads/2024/09/Zapovednik-Kyrgyz-Ata-Oshskaya-oblast-Kyrgyzstan.-Foto-PROON-Kyrgyzstan.jpeg",
    },
    {
      title: "ethno-tour",
      img: "https://eurasia.travel/wp-content/uploads/2024/09/kyrgyzstan-nature-3-1024x683.jpg",
    },
    {
      title: "hiking",
      img: "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lyZ3l6c3RhbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: " ountaineering",
      img: "https://images.locationscout.net/2024/09/ala-kul-lake-viewpoint-kyrgyz-republic-g6rh.jpg?w=1080&q=60",
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
    <>
      {" "}
      <div className="relative w-full h-max overflow-hidden text-white">
        {/* BACKGROUND PARALLAX */}
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            backgroundImage: `url(${backgrounds[bgIndex]})`,
          }}
          className="absolute inset-0 bg-cover bg-center bg-fixed"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* MAIN CONTENT */}

        <div className="relative z-10 px-30 my-50 grid grid-cols-2 gap-30">

          {/* LEFT TEXT */}
          <div className="max-w-xl">
            <h2 className="text-5xl font-bold mb-6">
              {categories[catIndex].title}
            </h2>
            <p className="text-lg leading-relaxed mb-10">
              Issyk-Kul Lake is the second largest mountain lake in the world at
              an altitude of 1,607 meters above sea level, depth of 668 meters
              asl. Lake is situated at the territory of the Issyk-Kul Biosphere
              Reserve. Issyk-Kul Lake is 182 kilometers long and about 60
              kilometers wide, with an area of 6,236 square kilometers.
            </p>
            <button className="flex items-center gap-3 bg-[linear-gradient(rgba(10,156,168,1),rgba(10,135,145,1))] px-6 py-3 rounded-2xl text-xl font-semibold">
              book <ChevronRight />
            </button>
          </div>

          {/* CATEGORY CAROUSEL — 3D INFINITE SPINNING WHEEL */}
          <div className="relative w-full h-96 flex items-center justify-center">
            <div

              className="relative w-[200px] h-[400px]"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                className="relative w-full h-full transform-3d"
              >
                {categories.map((cat, i) => {
                  const angle = (360 / categories.length) * i;
                  return (
                    <div
                      key={i}
                      className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center"
                      style={{
                        transform: `rotateY(${angle}deg) translateZ(280px)`,
                      }}
                    >
                      <div className="w-56 h-80 bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-110">
                        <img
                          src={cat.img}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-3 text-xl font-medium">{cat.title}</p>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
