"use client";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";
import { Hotel } from "@/shared/api/hotelApi";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";

interface Props {
  popular: Hotel[];
}

const Popular = ({ popular }: Props) => {
  const router = useRouter();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { data: favorites } = useGetFavoritesQuery();

  // 4 эле элемент алабыз
  const items = popular.slice(0, 4);

  const isFavorite = (hotelId: string) =>
    favorites?.find(
      (f) => f.itemType === "HOTEL" && (f.item as Hotel)?.id === hotelId
    );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center mb-12">
          Популярное
        </h1>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            gap-10
          "
        >
          {items.map((hotel) => {
            const favorite = isFavorite(hotel.id);

            return (
              <div
                key={hotel.id}
                className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
              "
              >
                {/* IMAGE */}
                <div className="relative h-[200px] bg-gray-200">
                  {hotel.images?.length > 0 && (
                    <img
                      src={hotel.images[0].img}
                      alt={hotel.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <button
          onClick={async () => {
            try {
              if (favorite) {
                await removeFavorite(favorite.id).unwrap();
              } else {
                await addFavorite({ itemId: hotel.id }).unwrap();
              }
            } catch {
              alert("Ошибка сервера");
            }
          }}
          className={`absolute text-3xl cursor-pointer left-3 top-3 ${
            favorite ? "text-red-600" : "text-gray-300"
          }`}
        >
          <FaHeart />
        </button>
                  {/* guests */}
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow">
                    до {hotel.maxGuests}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-3 truncate">
                    {hotel.title}
                  </h3>

                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    <li>🛏 {hotel.sleepingPlaces} спальных мест</li>
                    <li>👥 до {hotel.maxGuests} гостей</li>
                    {hotel.pool && <li>🏊‍♂️ Бассейн</li>}
                    {hotel.sauna && <li>🔥 Сауна</li>}
                  </ul>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-base">
                      от {hotel.priceWeekday} ₽
                      <span className="text-gray-500 text-sm"> / сутки</span>
                    </p>

                    <button
                      onClick={() => router.push(`/hotel/category/${hotel.id}`)}
                      className="text-[#0a8791] font-medium hover:underline cursor-pointer"
                    >
                      Подробнее
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => router.push("/hotel/category")}
            className="
              cursor-pointer
              w-[220px]
              h-11
              bg-[#0a8791]
              text-white
              rounded-lg
              hover:bg-[#097a82]
              active:scale-95
              transition
            "
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    </section>
  );
};

export default Popular;
