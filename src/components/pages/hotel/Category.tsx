"use client"
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";

const Category = () => {
const router = useRouter()

  return (
    <section className="py-4">
      <div className="flex text-2xl justify-around md:hidden">
        <h2
          className="text-black px-10 py-0.5 border-2 border-[#0a8791] rounded-full cursor-pointer 
               hover:bg-[#0a8791] hover:text-white transition-all"
        >
          Все
        </h2>
        <h2
          className="text-black px-10 py-0.5 border-2 border-[#0a8791] rounded-full cursor-pointer 
               hover:bg-[#0a8791] hover:text-white transition-all"
        >
          С бассейном
        </h2>
        <h2
          className="text-black px-10 py-0.5 border-2 border-[#0a8791] rounded-full cursor-pointer 
               hover:bg-[#0a8791] hover:text-white transition-all"
        >
          Семейные
        </h2>
        <h2
          className="text-black px-10 py-0.5 border-2 border-[#0a8791] rounded-full cursor-pointer 
               hover:bg-[#0a8791] hover:text-white transition-all"
        >
          Хиты продаж
        </h2>

        <select className="outline-0">
         <option value="price" disabled selected hidden>Цены</option>
          <option value="">до 400$</option>
          <option value="">до 800$</option>
          <option value="">до 1200$</option>
        </select>
      </div>
<div className="hidden md:flex">
        <select>
        <option value="">Все</option>
        <option value=""> С бассейном</option>
        <option value="">Семейные</option>
        <option value="">Хиты продаж</option>
      </select>
      <select className="outline-0">
         <option value="price" disabled selected hidden>Цены</option>
          <option value="">до 400$</option>
          <option value="">до 800$</option>
          <option value="">до 1200$</option>
        </select>
</div>
      <div className="flex justify-between py-12 md:flex-col md:gap-10">
        <div className="w-2xl mx-auto h-72 bg-white rounded-2xl shadow-md p-4 flex gap-2">
          {/* Left: Image */}
          <div className="relative w-1/2">
            <img
              src="/house.jpg"
              className="w-full h-full rounded-xl object-cover"
              alt="house"
            />

            {/* Heart button */}
            <button className="absolute top-3 left-3 bg-white/70 p-2 rounded-full backdrop-blur hover:bg-white transition">
              ❤️
            </button>

            {/* Slider arrow */}
            <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              <FaAngleRight />
            </button>

            {/* Slider dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Title + subtitle */}
            <div>
              <h2 className="text-xl font-semibold">Горки-Сухаревские 1</h2>
              <p className="text-gray-600">
                Рублево-Успенское шоссе 24 км от МКАД
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Features */}
              <div className="flex flex-col gap-2 mt-3 text-gray-700 text-sm">
                <div className="flex items-center ">🛏 25 спальных мест</div>
                <div className="flex items-center">🏓 Настольный теннис</div>
                <div className="flex items-center">🏊 Бассейн</div>
                <div className="flex items-center">🔥 Сауна</div>
              </div>

              {/* Prices */}
              <div className="flex justify-between mt-4 text-sm gap-2">
                <div className="text-gray-500 flex flex-col gap-2">
                  <h3>Будни</h3>
                  <h3>Пятница</h3>
                  <h3>Суббота</h3>
                  <h3>Воскресенье</h3>
                </div>

                <div className="text-gray-900 font-semibold text-sm flex flex-col gap-2">
                  <h3>от 8000</h3>
                  <h3>от 10000</h3>
                  <h3>от 12000</h3>
                  <h3>от 14000</h3>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex justify-between text-sm mt-4">
              <button className="text-gray-500 hover:text-black transition">
                Показать на карте
              </button>

              <button className="text-[#0a8791] hover:underline cursor-pointer" onClick={() => router.push("/hotel/detail")}>
                Подробнее
              </button>
            </div>
          </div>
        </div>
        <div className="w-2xl mx-auto h-72 bg-white rounded-2xl shadow-md p-4 flex gap-2">
          {/* Left: Image */}
          <div className="relative w-1/2">
            <img
              src="/house.jpg"
              className="w-full h-full rounded-xl object-cover"
              alt="house"
            />

            {/* Heart button */}
            <button className="absolute top-3 left-3 bg-white/70 p-2 rounded-full backdrop-blur hover:bg-white transition">
              ❤️
            </button>

            {/* Slider arrow */}
            <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 transition">
              <FaAngleRight />
            </button>

            {/* Slider dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="w-1/2 flex flex-col justify-between">
            {/* Title + subtitle */}
            <div>
              <h2 className="text-xl font-semibold">Горки-Сухаревские 1</h2>
              <p className="text-gray-600">
                Рублево-Успенское шоссе 24 км от МКАД
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Features */}
              <div className="flex flex-col gap-2 mt-3 text-gray-700 text-sm">
                <div className="flex items-center ">🛏 25 спальных мест</div>
                <div className="flex items-center">🏓 Настольный теннис</div>
                <div className="flex items-center">🏊 Бассейн</div>
                <div className="flex items-center">🔥 Сауна</div>
              </div>

              {/* Prices */}
              <div className="flex justify-between mt-4 text-sm gap-2">
                <div className="text-gray-500 flex flex-col gap-2">
                  <h3>Будни</h3>
                  <h3>Пятница</h3>
                  <h3>Суббота</h3>
                  <h3>Воскресенье</h3>
                </div>

                <div className="text-gray-900 font-semibold text-sm flex flex-col gap-2">
                  <h3>от 8000</h3>
                  <h3>от 10000</h3>
                  <h3>от 12000</h3>
                  <h3>от 14000</h3>
                </div>
              </div>
            </div>

            {/* Bottom Links */}
            <div className="flex justify-between text-sm mt-4">
              <button className="text-gray-500 hover:text-black transition">
                Показать на карте
              </button>


              <button className="text-[#0a8791] hover:underline cursor-pointer" onClick={() => router.push("/hotel/detail")}>

                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
