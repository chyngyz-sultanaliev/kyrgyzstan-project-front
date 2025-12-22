"use client";

import { Hotel } from "@/shared/api/hotelApi";
import { HotelCategory } from "@/shared/api/hotelCategoryApi";
import { useRouter } from "next/navigation";
import { FaAngleRight } from "react-icons/fa";
import { useMemo, useState } from "react";

interface CategoryProps {
  hotel: Hotel[];
  category: HotelCategory[];
}

const Category = ({ hotel, category }: CategoryProps) => {
  const router = useRouter();

const [selectedCategory, setSelectedCategory] = useState<string>("all");
const [priceFilter, setPriceFilter] = useState<string>("all");


const filteredHotels = useMemo(() => {
  let result = [...hotel];

  // CATEGORY FILTER
  if (selectedCategory !== "all") {
    result = result.filter(
      (item) => item.categoryId === selectedCategory
    );
  }

  // PRICE FILTER (будни боюнча мисал)
  if (priceFilter !== "all") {
    if (priceFilter === "400") {
      result = result.filter((item) => item.priceWeekday <= 400);
    }
    if (priceFilter === "800") {
      result = result.filter((item) => item.priceWeekday <= 800);
    }
    if (priceFilter === "1200") {
      result = result.filter((item) => item.priceWeekday <= 1200);
    }
  }

  return result;
}, [hotel, selectedCategory, priceFilter]);


  return (
    <section className="py-6 min-h-screen bg-gray-50">
      {/* FILTERS DESKTOP */}
<div className="hidden lg:flex justify-center gap-4 mb-8 px-4 flex-wrap">
  <button
    onClick={() => setSelectedCategory("all")}
    className={`px-5 py-1.5 border-2 rounded-full transition
      ${
        selectedCategory === "all"
          ? "bg-[#0a8791] text-white border-[#0a8791]"
          : "border-[#0a8791] hover:bg-[#0a8791] hover:text-white"
      }`}
  >
    Все
  </button>

  {category.map((cat) => (
    <button
      key={cat.id}
      onClick={() => setSelectedCategory(cat.id)}
      className={`px-5 py-1.5 border-2 rounded-full transition
        ${
          selectedCategory === cat.id
            ? "bg-[#0a8791] text-white border-[#0a8791]"
            : "border-[#0a8791] hover:bg-[#0a8791] hover:text-white"
        }`}
    >
      {cat.name}
    </button>
  ))}

  <select
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
    className="border rounded px-3 py-1.5 outline-none"
  >
    <option value="all">Цены</option>
    <option value="400">до 400$</option>
    <option value="800">до 800$</option>
    <option value="1200">до 1200$</option>
  </select>
</div>


      {/* FILTERS MOBILE */}
<div className="flex lg:hidden justify-center gap-4 mb-6 px-4">
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border rounded px-3 py-1.5 outline-none w-1/2"
  >
    <option value="all">Все</option>
    {category.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>

  <select
    value={priceFilter}
    onChange={(e) => setPriceFilter(e.target.value)}
    className="border rounded px-3 py-1.5 outline-none w-1/2"
  >
    <option value="all">Цены</option>
    <option value="400">до 400$</option>
    <option value="800">до 800$</option>
    <option value="1200">до 1200$</option>
  </select>
</div>


      {/* HOTEL LIST */}
      <div className="flex flex-col gap-8 px-4">
        {filteredHotels.map((item) => (
          <div
            key={item.id}
            className="
              max-w-6xl
              bg-white
              rounded-2xl
              shadow-md
              hover:shadow-lg
              transition
              flex
              flex-col
              md:flex-row
              h-[520px]
              md:h-[360px]
              overflow-hidden
            "
          >
            {/* IMAGE */}
            <div className="relative w-full md:w-1/2 h-[220px] md:h-full">
              {item.images?.length > 0 && (
                <img
                  src={item.images[0].img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              )}

            </div>

            {/* INFO */}
            <div className="w-full md:w-1/2 flex flex-col p-4">
              {/* TOP */}
              <div className="grow">
                <h2 className="text-lg md:text-xl font-semibold">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm md:text-base">
                  {item.address}
                </p>

                <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-700">
                  <span>🛏 {item.sleepingPlaces} мест</span>
                  <span>👥 до {item.maxGuests}</span>
                  {item.pool && <span>🏊 Бассейн</span>}
                  {item.sauna && <span>🔥 Сауна</span>}
                </div>

                <div className="flex gap-6 text-sm mt-6">
                  <div className="text-gray-500 space-y-1">
                    <p>Будни</p>
                    <p>Пятница</p>
                    <p>Суббота</p>
                    <p>Воскресенье</p>
                  </div>

                  <div className="font-semibold space-y-1">
                    <p>{item.priceWeekday}</p>
                    <p>{item.priceFriday}</p>
                    <p>{item.priceSaturday}</p>
                    <p>{item.priceSunday}</p>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="flex justify-between items-center pt-4 border-t mt-4">
                <button className="text-gray-500 hover:text-black text-sm">
                  Показать на карте
                </button>

                <button
                  onClick={() => router.push(`/hotel/category/${item.id}`)}
                  className="text-[#0a8791] hover:underline font-medium cursor-pointer"
                >
                  Подробнее
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Category;
