"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hotel = () => {
  const hotels = [
    {
      title: "Aurora",
      img: "https://t3.ftcdn.net/jpg/01/72/11/78/360_F_172117865_2JkKUkVzOG93FVeZIK7gHkxmvmD8JbOB.jpg",
    },
    {
      title: "Baitur",
      img: "https://media.istockphoto.com/id/156209467/photo/horse-and-mountains.jpg?s=612x612&w=0&k=20&c=lrKB7724ExU5tiTOZ9RG03n80QJqufk0GA2bhqE4Pl4=",
    },
    {
      title: "Raduga",
      img: "https://cabar.asia/wp-content/uploads/2024/09/Zapovednik-Kyrgyz-Ata-Oshskaya-oblast-Kyrgyzstan.-Foto-PROON-Kyrgyzstan.jpeg",
    },
    {
      title: "Redens",
      img: "https://eurasia.travel/wp-content/uploads/2024/09/kyrgyzstan-nature-3-1024x683.jpg",
    },
    {
      title: "Kapriz",
      img: "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lyZ3l6c3RhbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      title: "Orion",
      img: "https://images.locationscout.net/2024/09/ala-kul-lake-viewpoint-kyrgyz-republic-g6rh.jpg?w=1080&q=60",
    },
  ];

  const [catIndex, setCatIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCatIndex((i) => (i + 1) % hotels.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-10"
      >
        <div className="bg-white/20 backdrop-blur-xl px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-2xl font-semibold mb-2">
            Car hire in Kyrgyzstan{" "}
          </h3>
        </div>
      </motion.div>
      <div className="flex  gap-6 items-center mt-10 pl-20">
        {hotels.map((cat, i) => (
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
            <div className="bg-white/10 backdrop-blur-xl border-none overflow-hidden w-50 h-80 rounded-2xl">
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
    </div>
  );
};

export default Hotel;
