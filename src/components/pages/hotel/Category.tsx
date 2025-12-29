"use client";

import { Hotel, useGetHotelsQuery } from "@/shared/api/hotelApi";
import { HotelCategory } from "@/shared/api/hotelCategoryApi";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { useMemo, useState } from "react";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";

interface CategoryProps {
  hotel: Hotel[];
  category: HotelCategory[];
}

const Category = ({ hotel, category }: CategoryProps) => {
  const router = useRouter();

  // 🔥 optimistic favorites (frontend-only)
  const [favLocal, setFavLocal] = useState<Set<string>>(new Set());

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // 🔍 FILTER
  const filteredHotels = useMemo(() => {
    let result = [...hotel];

    if (selectedCategory !== "all") {
      result = result.filter(
        (item) => item.categoryId === selectedCategory
      );
    }

    if (priceFilter !== "all") {
      const maxPrice = Number(priceFilter);
      result = result.filter(
        (item) => item.priceWeekday <= maxPrice
      );
    }

    return result;
  }, [hotel, selectedCategory, priceFilter]);

  return (
    <section className="py-6 min-h-screen bg-gray-50">
      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-5 py-1.5 border-2 rounded-full transition ${
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
            className={`px-5 py-1.5 border-2 rounded-full transition ${
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

      {/* 🔥 HOTEL GRID (2 колонка адаптивный) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 max-w-7xl mx-auto">
        {filteredHotels.map((item) => {
          const serverFavorite = favorites?.find(
            (fav) =>
              fav.itemType === "HOTEL" &&
              (fav.item as Hotel | null)?.id === item.id
          );

          const isFavorite =
            favLocal.has(item.id) || Boolean(serverFavorite);

          return (
<div
  key={item.id}
  className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col md:flex-row"
>
  {/* IMAGE */}
  <div className="relative h-[220px] md:h-auto md:w-1/2">
    {item.images?.length > 0 && (
      <img
        src={item.images[0].img}
        alt={item.title}
        className="w-full h-full object-cover"
      />
    )}

    {/* ❤️ HEART */}
    <button
      className={`absolute top-4 left-4 text-3xl transition ${
        isFavorite ? "text-red-600" : "text-gray-200"
      }`}
      onClick={async () => {
        const prev = new Set(favLocal);
        setFavLocal((s) => {
          const next = new Set(s);
          next.has(item.id)
            ? next.delete(item.id)
            : next.add(item.id);
          return next;
        });

        try {
          if (serverFavorite) {
            await removeFavorite(serverFavorite.id).unwrap();
          } else {
            await addFavorite({ itemId: item.id }).unwrap();
          }
        } catch {
          setFavLocal(prev);
          alert("Ошибка сервера");
        }
      }}
    >
      <FaHeart />
    </button>
  </div>

  {/* INFO */}
  <div className="p-4 flex flex-col grow md:w-1/2">
    <h2 className="text-lg font-semibold">{item.title}</h2>
    <p className="text-gray-600 text-sm">{item.address}</p>

    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-700">
      <span>🛏 {item.sleepingPlaces}</span>
      <span>👥 до {item.maxGuests}</span>
      {item.pool && <span>🏊 Бассейн</span>}
      {item.sauna && <span>🔥 Сауна</span>}
    </div>

    <div className="mt-4 text-sm flex justify-between">
      <span>Будни</span>
      <span className="font-semibold">{item.priceWeekday}$</span>
    </div>

    <button
      onClick={() => router.push(`/hotel/category/${item.id}`)}
      className="mt-auto pt-4 text-[#0a8791] hover:underline font-medium"
    >
      Подробнее
    </button>
  </div>
</div>

          );
        })}
      </div>
    </section>
  );
};

export default Category;
