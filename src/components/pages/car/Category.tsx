"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useGetCarCategoriesQuery } from "@/shared/api/carCategoryApi";

const seatOptions = ["1-3", "4-6", "6+"] as const;
type SeatRange = (typeof seatOptions)[number];

const MAX_PRICE = 50000;

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "passenger";

  /* ✅ RTK Query — принимает string */
  const { isLoading } = useGetCarCategoriesQuery(type);

  const [seatRange, setSeatRange] = useState<SeatRange>("1-3");
  const [price, setPrice] = useState<number>(MAX_PRICE);

  const lineRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  /* ---------------- SLIDER LOGIC ---------------- */
  const getCirclePosition = () => (price / MAX_PRICE) * 100;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragging || !lineRef.current) return;

      const rect = lineRef.current.getBoundingClientRect();
      const percent = Math.min(
        Math.max((e.clientX - rect.left) / rect.width, 0),
        1
      );

      setPrice(Math.round(percent * MAX_PRICE));
    };

    const stop = () => setDragging(false);

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);

    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", stop);
    };
  }, [dragging]);

  /* ---------------- MOCK DATA ---------------- */
  const cars = useMemo(
    () => [
      {
        id: 1,
        title: "Toyota Camry",
        seats: 4,
        price: 5500,
        image: "/car.png",
      },
      {
        id: 2,
        title: "Hyundai Starex",
        seats: 7,
        price: 12000,
        image: "/car.png",
      },
      {
        id: 3,
        title: "Kia Rio",
        seats: 4,
        price: 4500,
        image: "/car.png",
      },
    ],
    []
  );

  /* ---------------- FILTER ---------------- */
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const seatMatch =
        seatRange === "1-3"
          ? car.seats <= 3
          : seatRange === "4-6"
          ? car.seats >= 4 && car.seats <= 6
          : car.seats >= 6;

      return seatMatch && car.price <= price;
    });
  }, [seatRange, price, cars]);

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[320px_1fr] gap-8">
        {/* ---------------- FILTER ---------------- */}
        <aside className="bg-white rounded-2xl shadow p-6 space-y-8">
          <h2 className="text-lg font-semibold">Filters</h2>

          {/* Seats */}
          <div>
            <p className="font-medium mb-3">Seats</p>
            <div className="flex gap-3">
              {seatOptions.map((seat) => (
                <button
                  key={seat}
                  onClick={() => setSeatRange(seat)}
                  className={`px-4 py-2 rounded-lg border text-sm transition
                    ${
                      seatRange === seat
                        ? "bg-teal-600 text-white border-teal-600"
                        : "border-gray-300 hover:border-teal-500"
                    }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="font-medium mb-4">
              Max price: <span className="font-semibold">{price}</span> som
            </p>


            <div ref={lineRef} className="relative h-1 bg-gray-200 rounded">
              <div
                className="absolute w-4 h-4 bg-teal-600 rounded-full -top-1.5 cursor-pointer"
                style={{
                  left: `calc(${getCirclePosition()}% - 8px)`,
                }}
                onMouseDown={() => setDragging(true)}
              />
            </div>
          </div>

          <button
            onClick={() => {
              setSeatRange("1-3");
              setPrice(MAX_PRICE);
            }}
            className="text-sm text-gray-500 hover:text-teal-600"
          >
            Clear filters
          </button>
        </aside>

        {/* ---------------- LIST ---------------- */}
        <main>
          <h1 className="text-2xl font-semibold mb-6 capitalize">
            {type} cars
          </h1>

          {filteredCars.length === 0 ? (
            <p className="text-gray-500">No cars found</p>
          ) : (
            <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
              {filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col md:flex-row gap-6"
                >
                  <Image
                    src={car.image}
                    alt={car.title}
                    width={208}
                    height={140}
                    className="mx-auto"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{car.title}</h2>
                    <p className="text-sm text-gray-500 mt-2">
                      Seats: {car.seats}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <p className="text-lg font-bold">{car.price} som</p>
                    <button
                      onClick={() =>
                        router.push(`/car/category/${car.id}`)
                      }
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                    >
                      More details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default Category;
