"use client";
import Link from "next/link";
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
      img: "https://cdn.pixabay.com/photo/2020/01/14/17/17/kyrgyzstan-4765706_640.jpg",
    },
    {
      title: "Raduga",
      img: "https://cdn.britannica.com/45/190645-050-AC4B6D04/Lake-Ysyk-body-water-Kyrgyzstan.jpg",
    },
    {
      title: "Redens",
      img: "https://eurasia.travel/wp-content/uploads/2024/09/kyrgyzstan-nature-3-1024x683.jpg",
    },
    {
      title: "Kapriz",
      img: "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5",
    },
    {
      title: "Orion",
      img: "https://sputnik.kg/img/102340/99/1023409982_0:182:4752:3168_1920x0_80_0_0_eda7e4f57f52cf019fa10f5fa0c44057.jpg",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % hotels.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const visible = [
    hotels[(active - 1 + hotels.length) % hotels.length],
    hotels[active],
    hotels[(active + 1) % hotels.length],
  ];

  return (
    <section className=" mt-10 sm:mt-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold ">
            Hotel in Kyrgyzstan
          </h3>
        </div>
      </motion.div>

      <div className="flex justify-center items-center gap-4 sm:gap-6 mt-10">
        {visible.map((hotel, i) => {
          const isActive = i === 1;

          return (
            <div
              key={i}
              onClick={() =>
                !isActive &&
                setActive(
                  (active + (i === 0 ? -1 : 1) + hotels.length) % hotels.length
                )
              }
              className={`
                cursor-pointer
                transition-all duration-500 mt-7
                ${
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-50 hidden sm:block"
                }
              `}
            >
              <div
                className="
                  bg-white/10 backdrop-blur-xl
                  overflow-hidden
                  w-35 sm:w-48 lg:w-56
                  h-60 sm:h-72 lg:h-80
                  rounded-2xl
                  shadow-xl
                "
              >
                <Link href="/hotel">
                  <img
                    src={hotel.img}
                    alt={hotel.title}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>

              <p className="mt-2 sm:mt-3 text-center text-base sm:text-lg font-medium">
                {hotel.title}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hotel;
