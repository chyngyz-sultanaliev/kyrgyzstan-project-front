"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Car = () => {
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
      img: "https://images.locationscout.net/2024/09/ala-kul-lake-viewpoint-kyrgyz-republic-g6rh.jpg?w=1080&q=60",
    },
    {
      title: "hiking",
      img: "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lyZ3l6c3RhbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Mountaineering",
      img: "https://eurasia.travel/wp-content/uploads/2024/09/kyrgyzstan-nature-3-1024x683.jpg",
    },
  ];

  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatIndex((i) => (i + 1) % categories.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-50">
      <div className="flex gap-6 items-center mt-10 pl-20">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === catIndex ? 1 : 0.8,
              opacity: i === catIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.8 }}
            className="cursor-pointer"
            onClick={() => setCatIndex(i)}
          >
            <div className="bg-white/10 backdrop-blur-xl border-none overflow-hidden w-60 h-90 rounded-2xl">
              <img
                src={cat.img}
                alt={cat.title}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-center text-xl font-medium">{cat.title}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-10"
      >
        <div className="bg-white/20 backdrop-blur-xl px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">
            🔥 Recommended Experiences
          </h3>
          <p>
            Hot Air Balloon • Night Sky Tour • Local Cuisine Routes • Eco Trails
          </p>
        </div>
      </motion.div>

      {/* ТВОЙ H2 */}
      <h2 className="text-[62px] text-black text-center py-30 font-semibold mb-10 drop-shadow-lg">
        Car hire in Kyrgyzstan
      </h2>

      <section className="relative w-full h-[850px] bg-black mt-2 overflow-hidden rounded-t-3xl">
        {/* YouTube видео фон */}
        <iframe
          src="https://www.youtube.com/embed/Rlomw_mXjDw?autoplay=1&mute=1&loop=1&playlist=Rlomw_mXjDw"
          title="YouTube Video"
          className="absolute inset-0 w-full h-full object-cover"
          allow="autoplay; encrypted-media"
        ></iframe>
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h2 className="text-5xl font-semibold mb-10 drop-shadow-lg">
            Car hire in Kyrgyzstan
          </h2>

          <div className="grid grid-cols-5 gap-4 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[85%] max-w-4xl">
            <input
              className="p-3 rounded-lg text-black bg-white/80"
              placeholder="Pick-up location"
            />
            <input
              className="p-3 rounded-lg text-black bg-white/80"
              type="date"
            />
            <input
              className="p-3 rounded-lg text-black bg-white/80"
              type="time"
            />
            <input
              className="p-3 rounded-lg text-black bg-white/80"
              type="date"
            />
            <button className="bg-teal-600 text-white rounded-lg px-5 py-3 text-lg font-medium shadow-lg hover:bg-teal-700 transition">
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Car;
