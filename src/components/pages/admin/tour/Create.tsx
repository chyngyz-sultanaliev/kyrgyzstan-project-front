/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Home,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  Upload,
  X,
} from "lucide-react";

export interface TourForm {
  title: string;
  description: string;
  image: File | null;
  location: string;
  seaLevel: string;
  walk: number;
  byCar: number;
  days: number;
  price: number;
  categoryId: string;
}

const CreateTour = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TourForm>({
    defaultValues: {
      title: "",
      description: "",
      image: null,
      location: "",
      seaLevel: "",
      walk: 0,
      byCar: 0,
      days: 0,
      price: 0,
      categoryId: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const handleImageUploadFile = (file: File) => {
    setValue("image", file, { shouldValidate: true });
    setImageName(file.name); // сохраняем имя
    const previewUrl = URL.createObjectURL(file);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setImageName(null);
    setValue("image", null, { shouldValidate: true });
  };

  const onSubmit = (data: TourForm) => {
    if (!data.image) {
      alert("Пожалуйста, добавьте изображение");
      return;
    }

    const payload = {
      ...data,
      walk: Number(data.walk),
      byCar: Number(data.byCar),
      days: Number(data.days),
      price: Number(data.price),
      image: data.image.name,
    };

    console.log("Отправка на сервер:", payload);

    if (imagePreview) URL.revokeObjectURL(imagePreview);
    reset();
    setImagePreview(null);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-gray-800 flex items-center gap-2">
        <Home size={26} className="text-[#0A8791]" /> Добавить тур
      </h1>

      <div className="max-w-5xl mx-auto bg-white p-4 rounded-xl h-[80vh] overflow-y-auto hide-scrollbar">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Название */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Название *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Пример: Горный тур"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("title", { required: "Название обязательно" })}
              />
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Категория */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Категория *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.categoryId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("categoryId", { required: "Выберите категорию" })}
              >
                <option value="">Выберите категорию</option>
                <option value="Adventure">Adventure</option>
                <option value="Relax">Relax</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Локация */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Локация *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Кыргызстан, Иссык-Куль"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.location
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("location", { required: "Локация обязательна" })}
              />
            </div>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* SeaLevel */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Высота над уровнем моря *
            </label>
            <input
              type="text"
              placeholder="1500м"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.seaLevel
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("seaLevel", {
                required: "Высота обязательна",
              })}
            />
            {errors.seaLevel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.seaLevel.message}
              </p>
            )}
          </div>

          {/* Walk */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Время пешком (мин.) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="30"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.walk
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("walk", {
                  required: "Время пешком обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.walk && (
              <p className="text-red-500 text-sm mt-1">{errors.walk.message}</p>
            )}
          </div>

          {/* ByCar */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Время на машине (мин.) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="15"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.byCar
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("byCar", {
                  required: "Время на машине обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.byCar && (
              <p className="text-red-500 text-sm mt-1">
                {errors.byCar.message}
              </p>
            )}
          </div>

          {/* Days */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Количество дней *
            </label>
            <input
              type="number"
              placeholder="3"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.days
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("days", {
                required: "Количество дней обязательно",
                valueAsNumber: true,
              })}
            />
            {errors.days && (
              <p className="text-red-500 text-sm mt-1">{errors.days.message}</p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="5000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.price
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("price", {
                  required: "Цена обязательна",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2 flex items-center gap-6">
            <div
              className={`flex-1 border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0A8791] transition-colors cursor-pointer ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              onClick={() => document.getElementById("image-upload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.length) {
                  handleImageUploadFile(e.dataTransfer.files[0]);
                }
              }}
            >
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                onChange={(e) => {
                  if (e.target.files?.length) {
                    handleImageUploadFile(e.target.files[0]);
                  }
                }}
                className="hidden"
                id="image-upload"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Нажмите или перетащите изображение
                </span>
              </div>
            </div>

            {imagePreview && (
              <div className="relative w-30 h-30 flex-shrink-0">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {imageName}
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Описание *
            </label>
            <textarea
              placeholder="Краткое описание тура..."
              className={`w-full px-4 py-2 border rounded focus:outline-none transition h-28 resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("description", {
                required: "Описание обязательно",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#0A8791] text-white px-7 py-2.5 rounded-lg hover:bg-[#086d72] transition-colors"
            >
              Создать
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateTour;
