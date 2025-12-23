/* eslint-disable @next/next/no-img-element */
"use client";
import Button from "@/components/ui/Button/Button";
import { useGetCarsQuery } from "@/shared/api/carApi";
import Link from "next/link";

const CarAdmin = () => {
  const { data: cars, isLoading, isError } = useGetCarsQuery();

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке машин</div>;

  const handleDelete = (id: string) => {
    console.log("Удалить машину с ID:", id);
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cars?.map((car) => (
        <div
          key={car.id}
          className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm"
        >
          {/* Image */}
          <div className="h-40 bg-gray-100 relative">
            {car.image && (
              <img src={car.image[0].img} alt={car.title} className="object-cover" />
            )}
          </div>

          {/* Info */}
          <div className="p-3 space-y-1">
            <h3 className="font-semibold text-gray-900">{car.title}</h3>
            <p className="text-sm text-gray-600">
              {car.seat} мест • {car.transmission} • {car.year} год
            </p>
            <p className="text-sm text-gray-700 font-medium">
              {car.pricePerDay} сом / сутки
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 p-3">
            <Link href={`/admin/car/${car.id}`}>
              <Button variant="primary" className="flex-1">
                Изменить
              </Button>
            </Link>
            <Button
              className="flex-1 bg-red"
              onClick={() => handleDelete(car.id)}
            >
              Удалить
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarAdmin;
