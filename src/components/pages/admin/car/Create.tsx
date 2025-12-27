/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  CarIcon,
  Cog,
  User,
  Calendar,
  DollarSign,
  Layers,
  Upload,
  X,
} from "lucide-react";
import { useCreateCarMutation } from "@/shared/api/carApi";
import { useGetCarCategoriesQuery } from "@/shared/api/carCategoryApi";
import toast from "react-hot-toast";

interface CarForm {
  title: string;
  description: string;
  image: File[];
  transmission: string;
  seat: number;
  year: number;
  engine: string;
  drive: string;
  fuelType: string;
  pricePerDay: number;
  minDriverAge: number;
  categoryId: string;
  withDriver: boolean;
}

export default function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CarForm>({
    defaultValues: {
      title: "",
      description: "",
      transmission: "",
      seat: 0,
      year: 0,
      fuelType: "",
      pricePerDay: 0,
      drive: "",
      categoryId: "",
      engine: "",
      minDriverAge: 0,
      withDriver: false,
      image: [],
    },
    mode: "onSubmit",
  });
  const { data: categories } = useGetCarCategoriesQuery();
  const [create, { isLoading }] = useCreateCarMutation();
  const [uploadedImage, setUploadedImage] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev) => [...prev, ...previews].slice(0, 5));
    setUploadedImage((prev) => [...prev, ...files].slice(0, 5));
    setValue("image", [...uploadedImage, ...files].slice(0, 5), {
      shouldValidate: true,
    });

    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newFiles = uploadedImage.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]);

    setUploadedImage(newFiles);
    setImagePreviews(newPreviews);
    setValue("image", newFiles);
  };

  const onSubmit = async (data: CarForm) => {
    if (uploadedImage.length === 0) {
      alert("Пожалуйста, загрузите хотя бы одно изображение");
      return;
    }

    const payload = {
      ...data,
      year: Number(data.year),
      seat: Number(data.seat),
      pricePerDay: Number(data.pricePerDay),
      minDriverAge: Number(data.minDriverAge),
      image: uploadedImage.map((file) => ({
        img: URL.createObjectURL(file),
      })),
    };

    try {
      await create(payload).unwrap();
      toast.success("Машина успешно создана!");
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
    }
    reset();
    setUploadedImage([]);
    setImagePreviews([]);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-gray-800 flex items-center gap-2">
        <CarIcon size={26} className="text-[#0A8791]" />
        Добавить автомобиль
      </h1>

      <div className="max-w-5xl mx-auto bg-white p-4 rounded-xl  h-[80vh] hide-scrollbar overflow-y-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Название */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Название *
            </label>
            <div className="relative">
              <CarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Toyota Camry"
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

          {/* Год */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Год выпуска *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="2020"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.year
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("year", { required: "Год выпуска обязателен" })}
              />
            </div>
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">{errors.year.message}</p>
            )}
          </div>

          {/* Трансмиссия */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Трансмиссия *
            </label>
            <div className="relative">
              <Cog className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Автомат / Механика"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.transmission
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("transmission", {
                  required: "Трансмиссия обязательна",
                })}
              />
            </div>
            {errors.transmission && (
              <p className="text-red-500 text-sm mt-1">
                {errors.transmission.message}
              </p>
            )}
          </div>

          {/* Количество мест */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Количество мест *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="5"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.seat
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("seat", {
                  required: "Обязательно указать количество мест",
                })}
              />
            </div>
            {errors.seat && (
              <p className="text-red-500 text-sm mt-1">{errors.seat.message}</p>
            )}
          </div>

          {/* Категория */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Категория *
            </label>
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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

          {/* Цена за день */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Цена за день *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="4500"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.pricePerDay
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("pricePerDay", { required: "Цена обязательна" })}
              />
            </div>
            {errors.pricePerDay && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pricePerDay.message}
              </p>
            )}
          </div>

          {/* Двигатель */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Объём двигателя *
            </label>
            <input
              type="text"
              placeholder="2.5 L"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.engine
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("engine", {
                required: "Объём двигателя обязателен",
              })}
            />
            {errors.engine && (
              <p className="text-red-500 text-sm mt-1">
                {errors.engine.message}
              </p>
            )}
          </div>

          {/* Привод */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Привод *
            </label>
            <input
              type="text"
              placeholder="4WD / FWD / RWD"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.drive
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("drive", { required: "Привод обязателен" })}
            />
            {errors.drive && (
              <p className="text-red-500 text-sm mt-1">
                {errors.drive.message}
              </p>
            )}
          </div>
          {/* Мин. возраст водителя */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Мин. возраст водителя *
            </label>
            <select
              {...register("minDriverAge", {
                required: "Выберите возраст водителя",
                valueAsNumber: true,
              })}
              className={`w-full px-4 py-2 border rounded focus:outline-none border-gray-300 focus:ring-primary ${
                errors.minDriverAge
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
            >
              <option value={""}>Выберите возраст водителя</option>
              <option value={20}>20 лет</option>
              <option value={30}>30 лет</option>
              <option value={50}>50 лет</option>
            </select>
            {errors.minDriverAge && (
              <p className="text-red-500 text-sm mt-1">
                {errors.minDriverAge.message}
              </p>
            )}
          </div>
          {/* Топливо */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Тип топлива *
            </label>
            <input
              type="text"
              placeholder="Бензин / Дизель / Электро"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.fuelType
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("fuelType", { required: "Тип топлива обязателен" })}
            />
            {errors.fuelType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fuelType.message}
              </p>
            )}
          </div>

          {/* Загрузка изображений */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Изображения *
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0A8791] transition-colors cursor-pointer ${
                isLoading ? "opacity-50 cursor-not-allowed" : "border-gray-300"
              }`}
              onClick={() =>
                !isLoading && document.getElementById("image-upload")?.click()
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (isLoading) return;

                const files = Array.from(e.dataTransfer.files).filter((file) =>
                  file.type.startsWith("image/")
                );
                if (files.length === 0) return;

                const previews = files.map((file) => URL.createObjectURL(file));

                setImagePreviews((prev) => [...prev, ...previews].slice(0, 5));
                setUploadedImage((prev) => [...prev, ...files].slice(0, 5));
                setValue("image", [...uploadedImage, ...files].slice(0, 5));
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isLoading || uploadedImage.length >= 5}
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {isLoading
                    ? "Загрузка..."
                    : "Нажмите или перетащите изображения"}
                </span>
                <span className="text-xs text-gray-400">
                  Можно загрузить несколько файлов (максимум 5)
                </span>
              </label>
            </div>

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}

            {imagePreviews.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-gray-500 mb-2">
                  Загружено: {imagePreviews.length} из 5
                </p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-lg overflow-hidden"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                        {uploadedImage[index].name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Описание */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Описание *
            </label>
            <textarea
              placeholder="Краткое описание автомобиля..."
              className={`w-full px-4 py-2 border rounded focus:outline-none transition h-28 resize-none ${
                errors.description
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("description", { required: "Описание обязательно" })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* С водителем */}
          <div className="flex items-center gap-3">
            <label className="block mb-1 font-medium text-gray-400 flex items-center gap-2">
              <User size={18} /> С водителем *
            </label>
            <input
              type="checkbox"
              {...register("withDriver")}
              onChange={(e) => setValue("withDriver", e.target.checked)}
            />
          </div>

          {/* Кнопка */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0A8791] text-white px-7 py-2.5 rounded-lg hover:bg-[#086d72]"
            >
              {isLoading ? "Загрузка..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
