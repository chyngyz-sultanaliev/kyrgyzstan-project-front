"use client";

import { useRouter } from "next/navigation";

const Popular = () => {
  const router = useRouter();
  return (
    <section className="py-20 bg-white flex items-center justify-center
    flex-col">
      <h1 className="text-2xl sm:text-3xl px-4 sm:px-7 pb-7">
        Популярное
      </h1>

      {/* GRID адаптив */}
      <div
        className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        gap-16
        px-4
      "
      >
        {[1, 2, 3, 4].map((_, idx) => (
          <div
            key={idx}
            className="w-auto max-w-[320px] rounded-2xl overflow-hidden shadow-md bg-white"
          >

            <div className="relative h-[200px] sm:h-[220px] bg-gray-200">

              <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor">
                  <circle cx="8" cy="5" r="3" strokeWidth="1.5"></circle>
                  <path d="M2 14c0-3 3-5 6-5s6 2 6 5" strokeWidth="1.5"></path>
                </svg>
                <span>до 30</span>
              </div>

              <button className="absolute bottom-4 right-4 bg-white shadow rounded-full p-2">
                <svg width="20" height="20" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M10 17s-6-4-6-9a3.5 3.5 0 0 1 7 0 3.5 3.5 0 0 1 7 0c0 5-6 9-6 9z"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold mb-3">Балыкчы</h3>

              <ul className="space-y-2 text-gray-700 text-[15px]">
                <li className="flex items-center gap-2">🛏 25 спальных мест</li>
                <li className="flex items-center gap-2">
                  🎲 Настольный теннис
                </li>
                <li className="flex items-center gap-2">🏊‍♂️ Бассейн</li>
                <li className="flex items-center gap-2">🔥 Сауна</li>
              </ul>

              <div className="flex justify-between items-center mt-4">
                <p className="font-semibold text-[17px]">
                  от 10 000 ₽{" "}
                  <span className="text-gray-500 text-sm">/ сутки</span>
                </p>
                <a className="text-teal-600 font-medium hover:underline cursor-pointer">
                  Подробнее
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/hotel/category")}
        className="mt-10 mx-auto w-[200px] h-10 bg-[#0a8791] text-white text-sm flex items-center justify-center rounded-lg cursor-pointer active:scale-95 transition-all"
      >
        Перейти в каталог
      </button>
    </section>
  );
};

export default Popular;
