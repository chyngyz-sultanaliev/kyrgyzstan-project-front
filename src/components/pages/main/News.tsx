"use client";
import { motion } from "framer-motion";

const news = [
  {
    title: "Cheap Airline Tickets — Great Ways To Save",
    content:
      "In this digital generation where information can be easily obtained within seconds, business cards ....",
    images: "https://too.kg/wp-content/uploads/Ala-archa1-600x400.jpg",
  },
  {
    title: "Top Places To Visit In Kyrgyzstan",
    content:
      "Discover the most beautiful mountains, lakes and nomadic culture of Kyrgyzstan.",
    images:
      "https://cf.youtravel.me/tr:w-1500/upload/chat/3c8/us6goy38i5f0ri6w9dm5gwyxyemyd8fe.jpeg",
  },
  {
    title: "Why Ala-Archa Is So Popular",
    content:
      "Nature, hiking, glaciers and fresh air just 40 minutes from Bishkek.",
    images: "https://tourist.kg/wp-content/uploads/2023/07/348485-1024x680.jpg",
  },
  {
    title: "Cheap Airline Tickets — Great Ways To Save",
    content:
      "In this digital generation where information can be easily obtained within seconds, business cards ....",
    images: "https://alaarchapark.kg/wp-content/uploads/2022/08/1-580x450.jpeg",
  },
  {
    title: "Top Places To Visit In Kyrgyzstan",
    content:
      "Discover the most beautiful mountains, lakes and nomadic culture of Kyrgyzstan.",
    images:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/27/83/d4/2a/caption.jpg?w=800&h=800&s=1",
  },
  {
    title: "Why Ala-Archa Is So Popular",
    content:
      "Nature, hiking, glaciers and fresh air just 40 minutes from Bishkek.",
    images:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/fd/fa/5c/caption.jpg?w=1200&h=-1&s=1",
  },
  {
    title: "Cheap Airline Tickets — Great Ways To Save",
    content:
      "In this digital generation where information can be easily obtained within seconds, business cards ....",
    images: "https://too.kg/wp-content/uploads/Ala-archa1-600x400.jpg",
  },
  {
    title: "Top Places To Visit In Kyrgyzstan",
    content:
      "Discover the most beautiful mountains, lakes and nomadic culture of Kyrgyzstan.",
    images:
      "https://www.centralasia-travel.com/uploads/gallery/1014/ala-archa_09.jpg",
  },
  {
    title: "Why Ala-Archa Is So Popular",
    content:
      "Nature, hiking, glaciers and fresh air just 40 minutes from Bishkek.",
    images:
      "https://wildrussia.travel/sites/default/files/images/tours/text_picture/Ala-Archa/people.jpg",
  },
];

const News = () => {
  return (
    <section className="mx-auto max-w-[95%] px-4 sm:px-6 py-5 lg:px-8 my-52">
      <div className="relative w-full max-w-[300px] sm:max-w-[600px] lg:max-w-[800px] h-[400px] sm:h-[500px] flex items-center justify-center m-auto p-5">
        <div
          className="relative w-full h-full"
          style={{ perspective: "5000px" }}
        >
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {news.map((item, i) => {
              const angle = (360 / news.length) * i;

              return (
                <div
                  key={i}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(50vw)`,
                  }}
                >
                  <div className="w-[85%] sm:w-[250px] lg:w-[500px] bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mx-2">
                    <img
                      src={item.images}
                      alt={item.title}
                      className="w-full h-48 sm:h-60 lg:h-72 object-cover"
                    />

                    <div className="p-6 bg-white">
                      <button className="px-4 py-1 rounded-xl text-sm text-white bg-linear-to-b from-teal-500 to-teal-600">
                        FEATURED
                      </button>

                      <h3 className="mt-4 text-xl font-bold leading-snug">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm text-black/80 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default News;
