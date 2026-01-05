"use client";
import { useGetHotelCategoriesQuery } from "@/shared/api/hotelCategoryApi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const Hotel = () => {
  const [catIndex, setCatIndex] = useState(0);
  const { data = [] } = useGetHotelCategoriesQuery();


  
  useEffect(() => {
    if (!data.length) return;
    const interval = setInterval(() => {
      setCatIndex((i) => (i + 1) % data.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="mt-16 sm:mt-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-8 sm:my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Hotel in Kyrgyzstan
          </h3>
        </div>
      </motion.div>

      {/* CARDS */}
      <div className="flex flex-wrap justify-center gap-10 px-4">
        {data?.map((cat, i) => (
          <motion.div
            key={i}
            animate={{
              scale: i === catIndex ? 1.1 : 1,
              opacity: i === catIndex ? 1 : 0.9,
            }}
            transition={{ duration: 0.6 }}
            className="cursor-pointer"
            onClick={() => setCatIndex(i)}
          >
            <div
              className="
                  bg-white/10 backdrop-blur-xl
                  overflow-hidden
                  w-32 sm:w-48 lg:w-56
                  h-60 sm:h-72 lg:h-80
                  rounded-2xl
                  shadow-xl
                "
            >
              <Link href="/hotel">
                <img
                  src={cat.image ?? "/placeholder.jpg"}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <p className="mt-2 sm:mt-3 text-center text-base sm:text-lg lg:text-xl font-medium">
              {cat.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
