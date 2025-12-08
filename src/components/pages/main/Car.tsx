"use client";
import { motion } from "framer-motion";

const Car = () => {
  return (
    <div className="mt-20 sm:mt-30">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold">
            Car hire in Kyrgyzstan
          </h3>
        </div>
      </motion.div>

      <section
        className="
      relative w-full
      h-[600px] sm:h-[750px] lg:h-[850px]
      bg-black mt-2 
      rounded-t-3xl
    "
      >
        {/* YouTube BG */}
        <iframe
          src="https://www.youtube.com/embed/Rlomw_mXjDw?autoplay=1&mute=1&loop=1&playlist=Rlomw_mXjDw"
          title="YouTube Video"
          className="absolute inset-0 w-full h-full object-cover"
          allow="autoplay; encrypted-media"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 flex justify-center items-center h-full px-4">
          <div
            className="
          grid
          grid-cols-1
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

            <button
              className="
            bg-teal-600 text-white
            rounded-lg
            px-5 py-3
            text-base sm:text-lg
            font-medium
            shadow-lg
            hover:bg-teal-700 transition
            sm:col-span-2 lg:col-span-1
          "
            >
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Car;
