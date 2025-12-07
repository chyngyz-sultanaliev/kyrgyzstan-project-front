"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Regions from "../../../../public/Loader.png";
import YssykKol from "../../../../public/yssyk-kol.png";
import Chui from "../../../../public/chui.png";
import Talas from "../../../../public/talas.png";
import JalalAbad from "../../../../public/jalalAbad.png";
import Naryn from "../../../../public/naryn.png";
import Osh from "../../../../public/osh.png";
import Batken from "../../../../public/batken.png";

const regions = [
  { name: "Yssyk-Kol", top: "36%", left: "65%", img: YssykKol },
  { name: "Chui", top: "30%", left: "45%", img: Chui },
  { name: "Talas", top: "30%", left: "33%", img: Talas },
  { name: "JalalAbad", top: "48%", left: "38%", img: JalalAbad },
  { name: "Naryn", top: "50%", left: "53%", img: Naryn },
  { name: "Osh", top: "67%", left: "40%", img: Osh },
  { name: "Batken", top: "70%", left: "23%", img: Batken },
];

interface WelcomeLoaderProps {
  fadeOut?: boolean;
}

export default function WelcomeLoader({ fadeOut = false }: WelcomeLoaderProps) {
  return (
    <motion.div
      className="bg-[linear-gradient(90deg,#08757A_0%,#0A8791_50%,#0C9AA3_100%)] w-full h-screen flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* H1 */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-white text-4xl font-bold mb-2 text-center"
      >
        Welcome
      </motion.h1>

      {/* H2 */}
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-white text-2xl font-semibold mb-10 text-center"
      >
        Kyrgyzstan Tourism Industry
      </motion.h2>

      {/* Map with scale effect */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: fadeOut ? 1.1 : 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <Image
          src={Regions}
          alt="Regions map"
          width={900}
          className="opacity-95"
        />
      </motion.div>

      {/* Pins */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
      >
        {regions.map((r, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.6 }}
            className="absolute flex flex-col items-center"
            style={{
              top: r.top,
              left: r.left,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={r.img}
              alt={r.name}
              width={65}
              height={65}
              className="rounded-full border-2 border-white shadow-lg object-cover"
            />
            <p className="text-white font-medium mt-1 text-sm">{r.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
