"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Car = () => {
  return (
    <div className="my-3 sm:mt-32">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 mb-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold ">
            Car hire in Kyrgyzstan
          </h3>
        </div>
      </motion.div>

      <section className="relative w-full h-[600px] sm:h-[750px] lg:h-[850px]  overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/images/IMG_4761.MP4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50 z-10" />

        <div className="relative z-20 flex justify-center items-center h-full px-4">
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
              gap-4
              bg-white/10 backdrop-blur-xl
              p-5 sm:p-8
              rounded-2xl
              shadow-2xl
              w-full max-w-5xl
            "
          >
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

            <Link href="/car">
              <button
                className="
                bg-teal-600 text-white
                rounded-lg
                px-10 py-3
                text-base sm:text-lg
                font-medium
                shadow-lg
                hover:bg-teal-700 transition
                sm:col-span-2 lg:col-span-1
              "
              >
                Send
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Car;
