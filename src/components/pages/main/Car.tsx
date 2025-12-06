"use client";
import { motion } from "framer-motion";

const Car = () => {
  return (
    <div className="mt-30">
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
