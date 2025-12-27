/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Star, Paperclip } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { IoCloseCircle } from "react-icons/io5";
import { useAddHotelReviewMutation, useGetHotelReviewsQuery } from "@/shared/api/reviewApi";

interface ReviewProps {
  hotelId: string;
}

export default function Review({ hotelId }: ReviewProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    data: reviews,
    isLoading: isReviewsLoading,
    isError,
  } = useGetHotelReviewsQuery(hotelId);

  const [addReview, { isLoading }] = useAddHotelReviewMutation();

  // preview (UI only)
  const previews = files.map((file) => URL.createObjectURL(file));

  // cleanup preview URLs
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const selected = Array.from(e.target.files).slice(
      0,
      5 - files.length
    );
    setFiles((prev) => [...prev, ...selected]);
  };

const handleSubmit = async () => {
  if (!rating || !comment.trim()) return;

  try {
    await addReview({
      hotelId,
      rating,
      comment: comment.trim(), 
    }).unwrap();

    // reset form
    setRating(0);
    setComment("");
    setFiles([]);
  } catch (err: any) {
    console.log("FULL ERROR:", err);

    if (err?.status === 401) {
      alert("Сначала войдите в аккаунт");
    } else if (err?.data?.message) {
      alert(err.data.message);
    } else {
      alert("Ошибка сервера");
    }
  }
};


  return (
    <div className="sm:w-[1080px] w-[360px] m-auto py-4 sm:p-6 lg:py-8 mt-8">
      {/* Rating */}
      <div className="flex gap-5">
        <h3 className="text-lg sm:text-xl text-gray-400 font-medium">
          Оценить:
        </h3>

        <div className="flex items-center gap-2 sm:gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
            >
              <Star
                className={`w-5 h-5 sm:w-7 sm:h-7 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 fill-gray-300 hover:text-yellow-400"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Comment + images */}
      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Написать комментарий"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 
          focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <div className="sm:w-[500px] w-full flex flex-col gap-3">
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            icon={<Paperclip />}
          >
            Загрузите фото (пока не отправляется)
          </Button>

          <div className="flex gap-2">
            {previews.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFiles((prev) =>
                      prev.filter((_, idx) => idx !== i)
                    )
                  }
                  className="absolute -top-2 -right-2 text-red-500 text-xl"
                >
                  <IoCloseCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        variant="primary"
        className="mt-8"
        onClick={handleSubmit}
        disabled={isLoading || !rating || !comment.trim()}
      >
        {isLoading ? "Отправка..." : "Добавить отзыв"}
      </Button>
    </div>
  );
}
