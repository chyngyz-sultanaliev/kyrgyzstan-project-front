/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";
import { useGetHotelsQuery } from "@/shared/api/hotelApi";
import Link from "next/link";

const Hotels = () => {
  const { data: items, isLoading, error } = useGetHotelsQuery();
  console.log(items);

  const handleDelete = (id: string) => {
    console.log("Удалить машину с ID:", id);
  };
  if (isLoading) return <StatusMessage variant="loading" />;
  if (error)
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
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
          {items?.map((hotel) => (
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
                </div>
                <div className="flex gap-2 p-3">
                  <Link href={`/admin/hotel/${hotel.id}`}>
                    <Button className="flex-1">Изменить</Button>
                  </Link>
                  <Button
                    variant="delete"
                    className="flex-1 bg-red"
                    onClick={() => handleDelete(hotel.id)}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hotels;
