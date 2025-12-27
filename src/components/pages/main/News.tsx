/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetNewsQuery } from "@/shared/api/newsApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
    return (
      <div className="text-center py-20">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#0A8791] border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Загрузка новостей...</p>
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Новостей пока нет</p>
      </div>
    );
  }

  const visibleCards = [
    news[(active - 1 + news.length) % news.length],
    news[active],
    news[(active + 1) % news.length],
  ];

  const handlePrev = () => {
    setActive((active - 1 + news.length) % news.length);
  };

  const handleNext = () => {
    setActive((active + 1) % news.length);
  };

  return (
    <section className="mx-auto max-w-[95%] px-4 py-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full flex justify-center my-6 md:my-10 px-4"
      >
        <div className="bg-white/20 backdrop-blur-xl px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
            Travel News
          </h3>
        </div>
      </motion.div>

      {/* Desktop версия - 3 карточки */}
      <div className="hidden md:flex items-center justify-center gap-4 lg:gap-6 relative">
        {/* Кнопка влево */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-white/80 hover:bg-white text-[#0A8791] p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Предыдущая новость"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        {visibleCards.map((item, i) => {
          const isActive = i === 1;

          return (
            <motion.div
              key={item.id || i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isActive ? 1 : 0.5, 
                scale: isActive ? 1 : 0.9 
              }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                !isActive &&
                setActive(
                  (active + (i === 0 ? -1 : 1) + news.length) % news.length
                )
              }
              className={`transition-all duration-300 cursor-pointer ${
                isActive ? "" : "hover:opacity-70 hover:scale-95"
              }`}
            >
              <div className="bg-white w-[250px] lg:w-[330px] rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow">
                {item.image && (
                  <div className="relative overflow-hidden h-48 lg:h-56">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-lg line-clamp-2 text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.content}
                  </p>
                  {isActive && (
                    <button className="mt-4 text-[#0A8791] font-semibold text-sm hover:underline">
                      Читать далее →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Кнопка вправо */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-white/80 hover:bg-white text-[#0A8791] p-3 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Следующая новость"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile версия - 1 карточка */}
      <div className="md:hidden">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="flex justify-center"
        >
          <div className="bg-white w-full max-w-[340px] rounded-3xl shadow-2xl overflow-hidden">
            {news[active]?.image && (
              <div className="relative overflow-hidden h-48">
                <img
                  src={news[active].image}
                  alt={news[active].title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800 mb-2">
                {news[active]?.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {news[active]?.content}
              </p>
              <button className="mt-4 text-[#0A8791] font-semibold text-sm hover:underline">
                Читать далее →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Индикаторы */}
        <div className="flex justify-center gap-2 mt-6">
          {news.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "bg-[#0A8791] w-8" : "bg-gray-300 w-2"
              }`}
              aria-label={`Перейти к новости ${i + 1}`}
            />
          ))}
        </div>

        {/* Кнопки навигации */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={handlePrev}
            className="bg-white/80 hover:bg-white text-[#0A8791] backdrop-blur-xl p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Предыдущая новость"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="bg-white/80 hover:bg-white text-[#0A8791] backdrop-blur-xl p-3 rounded-full shadow-lg transition-all hover:scale-110"
            aria-label="Следующая новость"
          >
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;