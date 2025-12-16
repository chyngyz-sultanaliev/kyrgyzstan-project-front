// "use client";
// import { FC, useEffect, useRef } from "react";

// export const Welcome: FC = () => {
//   return (
//     <section className="relative w-full h-screen overflow-hidden">
//       {/* Background video */}
//       <div className="absolute inset-0 overflow-hidden">
//         <video
//           className="fixed top-0 left-0 w-full h-full object-cover -z-1"
//           autoPlay
//           loop
//           muted
//         >
//           <source src="/images/IMG_4761.MP4" type="video/mp4" />
//         </video>

//         {/* Dark overlay */}
//         {/* <div className="absolute inset-0 bg-black/50 z-10 h-full  "></div> */}

//         {/* Content */}
//         <div className="relative z-20 flex flex-col items-center justify-center h-full gap-8 container mx-auto">
//           <h1 className="text-white text-4xl font-medium">
//             Car hire in Kyrgyzstan
//           </h1>

//           {/* Search form */}
//           <div className="grid grid-cols-5 gap-4 bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-[85%] max-w-4xl">
//             <input
//               className="p-3 rounded-lg text-black bg-white/80"
//               placeholder="Pick-up location"
//             />
//             <input
//               className="p-3 rounded-lg text-black bg-white/80"
//               type="date"
//             />
//             <input
//               className="p-3 rounded-lg text-black bg-white/80"
//               type="time"
//             />
//             <input
//               className="p-3 rounded-lg text-black bg-white/80"
//               type="date"
//             />
//             <button className="bg-teal-600 text-white rounded-lg px-5 py-3 text-lg font-medium shadow-lg hover:bg-teal-700 transition">
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Line */}
//       {/* <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4A4A4A] rounded z-20"></div> */}
//     </section>
//   );
// };

"use client";

import { FC } from "react";
import { motion } from "framer-motion";

export const Welcome: FC = () => {
  const text = "Car hire in Kyrgyzstan".split("");

  return (
    <section className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0">

        <video
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
          autoPlay
          loop
          muted
        >
          <source src="/images/IMG_4761.MP4" type="video/mp4" />
        </video>
        {/* Content */}
        <div
          className="
            relative z-20
            flex flex-col items-center justify-center
            h-full gap-8
            w-full
            px-4
            max-w-[1280px]
            mx-auto
          "
        >
          {/* Animated title */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium flex flex-wrap justify-center gap-1 text-center">
            {text.map((char, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: -50,
                  rotate: 20,
                  filter: "blur(5px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-5
              gap-4
              bg-white/10 backdrop-blur-xl
              p-6 sm:p-8
              rounded-2xl shadow-2xl
              w-full max-w-4xl
            "
          >
            <input
              className="p-3 rounded-lg bg-white/80 text-black outline-none"
              placeholder="Pick-up location"
            />
            <input
              className="p-3 rounded-lg bg-white/80 text-black outline-none"
              type="date"
            />

            <input
              className="p-3 rounded-lg bg-white/80 text-black outline-none"
              type="time"
            />

            <input
              className="p-3 rounded-lg bg-white/80 text-black outline-none"
              type="date"
            />

            <button
              className="
                w-full
                bg-teal-600
                text-white
                rounded-lg
                px-5 py-3
                text-base sm:text-lg
                font-medium
                hover:bg-teal-700
                transition
              "
            >
              Search
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
