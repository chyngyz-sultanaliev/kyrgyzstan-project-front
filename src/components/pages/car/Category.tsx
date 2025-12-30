/* eslint-disable @next/next/no-img-element */
"use client";
import { useParams, useRouter } from "next/navigation";
import { useGetCarCategoryByIdQuery } from "@/shared/api/carCategoryApi";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} from "@/shared/api/favoriteApi";
import { FaHeart } from "react-icons/fa";
import StatusMessage from "@/components/ui/status/Status";

const Category = () => {
  const router = useRouter();
  const { id: categoryId } = useParams();
  const catId = typeof categoryId === "string" ? categoryId : "";

  const {
    data: category,
    isLoading,
    error,
  } = useGetCarCategoryByIdQuery(catId!, {
    skip: !catId,
  });

  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  if (isLoading) return <StatusMessage variant="loading" />;
  if (error)
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
    );

  const cars = category?.cars || [];

  const isFavorite = (carId: string) =>
    favorites?.find((f) => f.itemType === "CAR" && f.item?.id === carId);

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">{category?.name}</h1>

        {cars.length === 0 ? (
          <p className="text-gray-500">No cars found in this category</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => {
              const favorite = isFavorite(car.id);
              return (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col relative"
                >
                  <img
                    src={car.image[0].img}
                    alt={car.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />

                  <button
                    onClick={async () => {
                      try {
                        if (favorite) {
                          await removeFavorite(favorite.id).unwrap();
                        } else {
                          await addFavorite({ itemId: car.id }).unwrap();
                        }
                      } catch {
                        alert("Ошибка сервера");
                      }
                    }}
                    className={`absolute text-3xl cursor-pointer p-1 rounded-full bg-white right-3 top-3 ${
                      favorite ? "text-red-600" : "text-gray-300"
                    }`}
                  >
                    <FaHeart />
                  </button>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{car.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Seat: {car.seat}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold">{car.pricePerDay} som</p>
                    <button
                      onClick={() => router.push(`/car/${car.id}`)}
                      className="bg-teal-600 text-white px-3 py-1.5 rounded-lg hover:bg-teal-700 text-sm"
                    >
                      More details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
