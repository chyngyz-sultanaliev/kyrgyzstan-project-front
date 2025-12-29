/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { Star, Camera, Paperclip } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import { IoCloseCircle } from "react-icons/io5";
import { useCreateReviewMutation } from "@/shared/api/carReviewApi";
interface ReviewFormProps {
  id: string;
}

export default function ReviewForm({ id }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [review, { isLoading }] = useCreateReviewMutation();
  const [serverError, setServerError] = useState<string | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    const newImages = files
      .slice(0, 5 - images.length)
      .map((file) => URL.createObjectURL(file));

    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };
  console.log(id);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!rating) return alert("Баалоо коюңуз");
    if (!comment.trim()) return alert("Комментарий жазыңыз");

    try {
      await review({
        carId: id,
        rating,
        comment,
        images,
      }).unwrap();

      setRating(0);
      setComment("");
      setImages([]);
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      if (err.data?.message) {
        setServerError(err.data.message);
      } else {
        setServerError("Произошла ошибка. Попробуйте ещё раз.");
      }
    }
  };

  return (
    <>
      <div className="flex gap-5">
        <h3 className="text-lg sm:text-xl text-gray-400 font-medium mb-4 sm:mb-6">
          Оценить:
        </h3>

        <div className="flex items-center gap-2 sm:gap-3 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="transition-colors"
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
      <div className="flex flex-col md:flex-row gap-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Написать комментарий"
          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32 
            focus:outline-none focus:ring-2 focus:ring-teal-500 text-base"
        />

        <div className="sm:w-[500px] w-full flex flex-col gap-3">
          {/* Hidden upload input */}
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          {/* Upload button */}
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleButtonClick}
            icon={<Paperclip />}
          >
            Загрузите новое фото
          </Button>

          <div className="flex gap-2">
            {images.map((img, i) => (
              <div key={i} className="relative">
                <img
                  src={img}
                  alt={`preview-${i}`}
                  className="w-[76px] h-[87px] sm:w-16 sm:h-16 object-cover rounded-lg"
                />

                <button
                  onClick={() =>
                    setImages((prev) => prev.filter((_, index) => index !== i))
                  }
                  className="
          absolute -top-2 -right-2 
          text-xl text-[red]
        "
                >
                  <IoCloseCircle />
                </button>
              </div>
            ))}{" "}
            {Array.from({ length: 5 - images.length }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-[76px] h-[87px] sm:w-16 sm:h-16 bg-gray-200 rounded-lg 
      flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                <Camera className="w-5 h-5 text-gray-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {serverError && (
        <p className="text-red-500 text-sm text-center  sm:text-md mt-1">
          {serverError}
        </p>
      )}
      <Button
        variant="primary"
        className="mt-8"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Отправка..." : "Добавить"}
      </Button>
    </>
  );
}
