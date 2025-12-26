/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";
import {
  useDeleteHotelMutation,
  useGetHotelsQuery,
} from "@/shared/api/hotelApi";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const Hotels = () => {
  const { data: items, isLoading, error } = useGetHotelsQuery();
  const [deleteHotel] = useDeleteHotelMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      await deleteHotel(id).unwrap();
      toast.success("Отель успешно удален!");
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
    } finally {
      setLoadingId(null);
    }
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
    <section className="mx-auto px-3 sm:px-5 py-4 sm:py-6 h-[87vh] overflow-y-auto hide-scrollbar">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-600">
          Управление отелями
        </h1>
        <Link href={`/admin/hotel/create`}>
          <Button
            variant="primary"
            className="w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base"
          >
            + Добавить отель
          </Button>
        </Link>
      </div>

      {!items || items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4 px-4 text-center">
            Отели не найдены
          </p>
          <Link href={`/admin/hotel/create`}>
            <Button variant="primary" className="text-sm sm:text-base">
              Создать первый отель
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {items.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {hotel.images?.length > 0 ? (
                  <img
                    src={hotel.images[0].img}
                    alt={hotel.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                )}

                {/* Guests badge */}
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium shadow-md">
                  👥 до {hotel.maxGuests}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3 flex-1">
                <h3
                  className="font-bold text-base sm:text-lg text-gray-900 truncate"
                  title={hotel.title}
                >
                  {hotel.title}
                </h3>

                <ul className="text-xs sm:text-sm text-gray-700 space-y-1">
                  <li className="flex items-center gap-1.5">
                    <span>🛏</span>
                    <span>{hotel.sleepingPlaces} спальных мест</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span>👥</span>
                    <span>до {hotel.maxGuests} гостей</span>
                  </li>
                  <div className="flex gap-2 flex-wrap">
                    {hotel.pool && (
                      <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        🏊‍♂️ Бассейн
                      </span>
                    )}
                    {hotel.sauna && (
                      <span className="inline-flex items-center gap-1 bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full text-xs">
                        🔥 Сауна
                      </span>
                    )}
                  </div>
                </ul>

                <div className="flex items-baseline gap-1 pt-1">
                  <span className="text-sm text-gray-500">от</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#0A8791] ">
                    {hotel.priceWeekday}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    ₽ / сутки
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-3 sm:p-4 pt-0">
                <Link href={`/admin/hotel/${hotel.id}`} className="flex-1">
                  <Button variant="primary">Изменить</Button>
                </Link>
                <Button
                  variant="delete"
                  disabled={loadingId === hotel.id}
                  onClick={() => handleDelete(hotel.id)}
                >
                  {loadingId === hotel.id ? "Удаление..." : "Удалить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hotels;
