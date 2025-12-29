/* eslint-disable @next/next/no-img-element */
"use client";
import { Star } from "lucide-react";
import type { Review as ReviewType } from "@/shared/api/tourApi";
import ReviewForm from "./ReviewForm";

interface Props {
  review?: ReviewType[];
  id: string;
}

export default function Review({ review, id }: Props) {
  return (
    <div className="sm:w-[1080px] w-[360px] m-auto py-4 sm:p-6 lg:py-8 mt-8">
      {/* Форма для нового отзыва */}
      <ReviewForm id={id} />

      {/* Список существующих отзывов */}
      {review?.map((rev) => (
        <div
          key={rev.id}
          className="bg-white mt-8 rounded-lg shadow p-4 sm:p-6 lg:p-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full shrink-0">
                {rev.user.avatar && (
                  <img
                    src={rev.user.avatar}
                    alt={rev.user.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                )}
              </div>
              <h4 className="font-medium text-teal-600 text-base sm:text-lg">
                {rev.user.username}
              </h4>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                />
              ))}
              {rev.rating % 1 !== 0 && (
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
              )}
            </div>
          </div>

          <p className="text-gray-700 text-sm sm:text-base mb-3">
            {rev.comment}
          </p>

          <div className="flex gap-3 flex-wrap">
            {rev.Images?.map((img, i) => (
              <div key={i} className="w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`review-img-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
