"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const news = [
  {
    title: "Cheap Airline Tickets",
    content:
      "In this digital generation where information can be easily obtained...",
    images: "https://too.kg/wp-content/uploads/Ala-archa1-600x400.jpg",
    date: "2025-01-12",
  },
  {
    title: "Top Places In Kyrgyzstan",
    content: "Discover mountains, lakes and nomadic culture.",
    images:
      "https://cf.youtravel.me/tr:w-1500/upload/chat/3c8/us6goy38i5f0ri6w9dm5gwyxyemyd8fe.jpeg",
    date: "2025-01-18",
  },
  {
    title: "Why Ala-Archa Is Popular",
    content: "Nature, hiking and glaciers near Bishkek.",
    images: "https://tourist.kg/wp-content/uploads/2023/07/348485-1024x680.jpg",
    date: "2025-01-25",
  },
  {
    title: "Best Lakes To Visit In Summer",
    content: "Issyk-Kul, Son-Kul and Ala-Kul are perfect summer destinations.",
    images:
      "https://www.cbt-naryn.com/wp-content/uploads/2024/04/locat_kel_suu-20.jpg",
    date: "2025-02-02",
  },
  {
    title: "Winter Tourism In Kyrgyzstan",
    content: "Ski resorts, snowy mountains and winter adventures await.",
    images:
      "https://www.advantour.com/img/kyrgyzstan/lakes/kyrgyzstan-nature-lakes-chatyr-kul.jpg",
    date: "2025-02-08",
  },
  {
    title: "Nomadic Culture And Traditions",
    content: "Experience yurt life, horse games and traditional food.",
    images:
      "https://images.unsplash.com/photo-1610720684893-619cd7a5cde5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a3lyZ3l6c3RhbnxlbnwwfHwwfHx8MA%3D%3D",
    date: "2025-02-15",
  },
  {
    title: "Hiking Routes Near Bishkek",
    content: "The best hiking trails just a short drive from the capital.",
    images:
      "https://t4.ftcdn.net/jpg/05/54/61/61/360_F_554616196_qXa61MP7E2s1su8cTP9wk9zWmJFOtrAD.jpg",
    date: "2025-02-20",
  },
  {
    title: "Why Foreign Tourists Love Kyrgyzstan",
    content: "Hospitality, nature and freedom make Kyrgyzstan special.",
    images:
      "https://www.undp.org/sites/g/files/zskgke326/files/styles/explore_more_desktop/public/2025-10/photo_2_2024-07-24_13-43-48.jpg?h=bce50f5e&itok=nIa0lX3n",
    date: "2025-02-27",
  },
];

const News = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % news.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const visibleCards = [
    news[(active - 1 + news.length) % news.length],
    news[active],
    news[(active + 1) % news.length],
  ];

  return (
    <section className="mx-auto max-w-[95%] px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex justify-center z-10 my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 sm:px-10 py-4 rounded-2xl shadow-xl text-center">
          <h3 className="text-xl sm:text-2xl font-semibold ">Travel News</h3>
        </div>
      </motion.div>
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {visibleCards.map((item, i) => {
          const isActive = i === 1;

          return (
            <div
              key={i}
              onClick={() =>
                isActive
                  ? null
                  : setActive(
                      (active + (i === 0 ? 1 : -1) + news.length) % news.length
                    )
              }
              className={`
                cursor-pointer
                transition-all duration-300
                ${
                  isActive
                    ? "scale-100 opacity-100"
                    : "scale-90 opacity-50 hidden sm:block"
                }
              `}
            >
              <div
                className="
                  bg-white
                   w-[200px] sm:w-[80%] lg:w-[90%]
                  rounded-3xl
                  shadow-2xl
                  overflow-hidden
                "
              >
                <img
                  src={item.images}
                  alt={item.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <h4 className="text-sm text-black/70 mt-2">{item.content}</h4>
                  <p className="text-sm text-right text-black/70 mt-2">
                    {item.date}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default News;
