"use client";
/* eslint-disable @next/next/no-img-element */
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useDeleteTourMutation, useGetToursQuery } from "@/shared/api/tourApi";
import StatusMessage from "@/components/ui/status/Status";
import { useState } from "react";
import toast from "react-hot-toast";

const Tour = () => {
  const { data: tours = [], isLoading, error } = useGetToursQuery();
  const [deleteTour] = useDeleteTourMutation();

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      await deleteTour(id).unwrap();
      toast.success("Удалено");
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
          Управление турами
        </h1>
   <div className="flex gap-3">     <Link href={`/admin/tour/create`}>
          <Button
            variant="primary"
            className="w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base"
          >
            + Добавить тур
          </Button>
        </Link>
          <Link href={`/admin/tour/days`}>
          <Button
            variant="primary"
            className="w-full sm:w-auto px-4 sm:px-6 text-sm sm:text-base"
          >
            + Добавить Days
          </Button>
        </Link></div>
      </div>

      {tours.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-48 sm:h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4 px-4 text-center">
            Туры не найдены
          </p>
          <Link href={`/admin/tour/create`}>
            <Button variant="primary" className="text-sm sm:text-base">
              Создать первый тур
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 flex flex-col"
            >
              {/* Image */}
              <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                {tour.image ? (
                  <img
                    src={tour.image}
                    alt={tour.title}
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3 sm:p-4 space-y-1.5 sm:space-y-2 flex-1">
                <h3
                  className="font-bold text-base sm:text-lg text-gray-900 truncate"
                  title={tour.title}
                >
                  {tour.title}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl sm:text-2xl font-bold text-[#0A8791] ">
                    {tour.price}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">$</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-3 sm:p-4 pt-0">
                <Link href={`/admin/tour/${tour.id}`} className="flex-1">
                  <Button variant="primary">Изменить</Button>
                </Link>
                <Button
                  variant="delete"
                  disabled={loadingId === tour.id}
                  onClick={() => handleDelete(tour.id)}
                >
                  {loadingId === tour.id ? "Удаление..." : "Удалить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Tour;
