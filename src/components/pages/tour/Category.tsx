"use client";
/* eslint-disable @next/next/no-img-element */

import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useState } from "react";
import { useGetToursQuery } from "@/shared/api/tourApi";
import {
  useGetTourCategoriesQuery,
  TourCategory,
} from "@/shared/api/tourCategoryApi";
import type { Tour } from "@/shared/api/tourApi";

interface CategoryTour {
  id: string;
  name: string;
  image?: string | null;
}

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // API
  const { data: tours = [], isLoading: tourLoading } = useGetToursQuery();
  const { data: categories = [], isLoading: catLoading } =
    useGetTourCategoriesQuery();

  if (tourLoading || catLoading) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  // 👉 ТУУРА ФИЛЬТР
  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour: Tour) => tour.categoryId === selectedCategory);

  return (
    <section className="container mx-auto sm:px-5 p-6">
      {/* ================= DESKTOP CATEGORIES ================= */}
      <div className="hidden sm:flex justify-center gap-6 text-lg mb-8 border-b pb-3">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3 py-1 ${
            selectedCategory === "All" ? "font-bold border-b-2" : ""
          }`}
        >
          All
        </button>

        {categories
          .filter((cat: CategoryTour) => cat.name.trim() !== "")
          .map((cat: CategoryTour) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 ${
                selectedCategory === cat.id ? "font-bold border-b-2" : ""
              }`}
            >
              {cat.name}
            </button>
          ))}
      </div>

      {/* ================= MOBILE SELECT ================= */}
      <div className="block sm:hidden mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg p-2 text-sm"
        >
          <option value="All">All</option>

          {categories
            .filter((cat: CategoryTour) => cat.name.trim() !== "")
            .map((cat: CategoryTour) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      {/* ================= TOUR CARDS ================= */}
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        {filteredTours.length === 0 ? (
          <p className="text-center w-full">
            No tours available in this category.
          </p>
        ) : (
          filteredTours.map((tour: Tour) => (
            <div
              key={tour.id}
              className="flex flex-col rounded-3xl w-[394px] h-[435px] md:w-[290px] md:h-[300px] bg-white shadow-md p-4"
            >
              <img
                src={tour.image ?? "/no-image.png"}
                alt={tour.title}
                className="w-full h-[265px] md:h-[165px] object-cover rounded-2xl"
              />

              <div className="mt-2 flex-1">
                <h2 className="font-semibold text-lg">{tour.title}</h2>
                <p className="mt-1">Price: {tour.price} $</p>
              </div>

              <Link href={`/tour/${tour.id}`} className="mt-auto">
                <Button variant="primary">Plan Your Trip</Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Category;
