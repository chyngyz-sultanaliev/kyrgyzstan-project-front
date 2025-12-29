"use client";

import { FC, useState, FormEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Welcome: FC = () => {
  const text = "Car hire in Kyrgyzstan".split("");
  const [formData, setFormData] = useState({
    email: "",
    num: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const chat_id = "-1002597947748"; // свой Telegram chat_id
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

      const textMessage = `
📧 Email: ${formData.email}
📞 Number: ${formData.num}
📝 Description: ${formData.description}
`;

      await axios.post(api_url, { chat_id, parse_mode: "HTML", text: textMessage });

      setSubmitted(true);
      setFormData({ email: "", num: "", description: "" });
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background videos и overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="fixed top-0 left-0 w-full h-full -z-10 flex">
          <video autoPlay loop muted playsInline className="w-1/3 h-full object-cover">
            <source src="/images/hire-car.mp4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="w-1/3 h-full object-cover">
            <source src="/images/IMG_4761.MP4" type="video/mp4" />
          </video>
          <video autoPlay loop muted playsInline className="w-1/3 h-full object-cover">
            <source src="/images/inst.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-black/50 z-0" />

        {/* Контент */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-8 w-full px-4 max-w-[1280px] mx-auto">
          {/* Анимированный заголовок */}
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium flex flex-wrap justify-center gap-1 text-center">
            {text.map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -50, rotate: 20, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
                transition={{ delay: i * 0.03, duration: 0.6, ease: "easeOut" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>

          {/* Форма для Telegram */}
          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-4xl"
            >
              <input
                className="p-3 rounded-lg bg-white/80 text-black outline-none"
                placeholder="Pick-up location"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
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
                type="submit"
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
                Send 
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-4xl text-center"
            >
              <h2 className="text-lg font-semibold mb-2 text-white">Request sent!</h2>
              <p className="text-1xl text-white">
                Our specialist will contact you in 15 minutes.
              </p>
              <button
                className="mt-4 w-full bg-teal-600 text-white rounded-lg px-5 py-3 hover:bg-teal-700 transition"
                onClick={() => setSubmitted(false)}
              >
                Close
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Welcome;
