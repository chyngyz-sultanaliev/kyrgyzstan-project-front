"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetNewsQuery } from "@/shared/api/news";

const News = () => {
  const [active, setActive] = useState(0);
  const { data, isLoading } = useGetNewsQuery();

  const news = Array.isArray(data) ? data : data ?? [];

  useEffect(() => {
    if (news.length < 2) return;

    const timer = setInterval(() => {
      setActive((i) => (i + 1) % news.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [news.length]);

  if (isLoading) {
    return <div className="text-center py-20">Загрузка...</div>;
  }

  if (!news.length) {
    return <div className="text-center py-20">Новостей нет</div>;
  }

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
        className="w-full flex justify-center my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-6 py-4 rounded-2xl">
          <h3 className="text-xl font-semibold">Travel News</h3>
        </div>
      </motion.div>

      <div className="flex items-center justify-center gap-4">
        {visibleCards.map((item, i) => {
          const isActive = i === 1;

          return (
            <div
              key={item.id || i}
              onClick={() =>
                !isActive &&
                setActive(
                  (active + (i === 0 ? -1 : 1) + news.length) % news.length
                )
              }
              className={`transition-all duration-300 ${
                isActive ? "scale-100" : "scale-90 opacity-50"
              }`}
            >
              <div className="bg-white w-[260px] rounded-3xl shadow-2xl overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm">{item.content}</p>
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
