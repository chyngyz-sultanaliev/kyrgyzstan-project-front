/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Star } from "lucide-react";
import type { Review as ReviewType } from "@/shared/api/tourApi";
import ReviewForm from "./ReviewForm";

interface Props {
  review?: ReviewType[];
  id: string;
}

export default function Review({ review, id }: Props) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Эгер review өзгөрсө, stateти жаңылайбыз
  useEffect(() => {
    if (review && review.length > 0) {
      setRating(review[0].rating || 0);
      setComment(review[0].comment || "");
      setImages(review[0].Images || []);
    }
  }, [review]);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newImages = files
      .slice(0, 5 - images.length)
      .map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="sm:w-[1080px] w-[360px] m-auto py-4 sm:p-6 lg:py-8 mt-8">
      <ReviewForm id={id} />
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
