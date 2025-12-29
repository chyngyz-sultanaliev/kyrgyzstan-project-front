/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
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
import { useParams } from "next/navigation";

import {
  useGetTourByIdQuery,
  useUpdateTourMutation,
} from "@/shared/api/tourApi";
import { useGetTourCategoriesQuery } from "@/shared/api/tourCategoryApi";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";
import toast from "react-hot-toast";

interface TourForm {
  title: string;
  description: string;
  image: string;
  location: string;
  seaLevel: string;
  walk: number;
  byCar: number;
  days: number;
  price: number;
  categoryId: string;
}

export default function Edit() {
  const { id } = useParams();

  const { data: tour, isLoading, error } = useGetTourByIdQuery(String(id));
  const { data: categories } = useGetTourCategoriesQuery();
  const [updateTour, { isLoading: isUpdating }] = useUpdateTourMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TourForm>();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // ===== загрузка данных тура =====
  useEffect(() => {
    if (tour) {
      setValue("title", tour.title);
      setValue("description", tour.description);
      setValue("location", tour.location);
      setValue("seaLevel", tour.seaLevel);
      setValue("walk", tour.walk);
      setValue("byCar", tour.byCar);
      setValue("days", tour.days);
      setValue("price", tour.price);
      setValue("categoryId", tour.categoryId);

      setImageUrl(tour.image);
      setValue("image", tour.image);
    }
  }, [tour, setValue]);

  // ===== загрузка изображения =====
  const handleImageUpload = (file: File) => {
    const preview = URL.createObjectURL(file);
    setImageUrl(preview);
    setValue("image", preview);
  };

  const removeImage = () => {
    setImageUrl(null);
    setValue("image", "");
  };

  // ===== submit =====
  const onSubmit = async (data: TourForm) => {
    if (!imageUrl) {
      alert("Добавьте изображение");
      return;
    }

    const payload = {
      id: id as string,
      data: {
        ...data,
        walk: Number(data.walk),
        byCar: Number(data.byCar),
        days: Number(data.days),
        price: Number(data.price),
        image: imageUrl,
      },
    };

    try {
      await updateTour(payload).unwrap();
      toast.success("Тур успешно обновлён");
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
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
    <>
      <h1 className="text-2xl font-semibold m-4 flex items-center gap-2">
        <Home size={26} className="text-[#0A8791]" />
        Редактировать тур
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
                {categories?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Локация */}
          <div>
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
          <div className="md:col-span-2">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0A8791] transition-colors cursor-pointer ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "border-gray-300"
              }`}
              onClick={() => document.getElementById("image-upload")?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (isUpdating) return;

                const file = e.dataTransfer.files[0];
                if (!file || !file.type.startsWith("image/")) return;

                const preview = URL.createObjectURL(file);
                setImageUrl(preview);
                setValue("image", preview, { shouldValidate: true });
              }}
            >
              <input
                type="file"
                id="image-upload"
                hidden
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {isUpdating
                    ? "Загрузка..."
                    : "Нажмите, перетащите изображения или бросьте их сюда"}
                </span>
              </label>
            </div>
            {imageUrl && (
              <div className="mt-3">
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  <div className="relative group aspect-square rounded-lg overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={`Preview ${imageUrl}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage()}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
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
            <Button loading={isUpdating} type="submit" disabled={isUpdating}>
              {isUpdating ? "Загрузка..." : "Обновить"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
