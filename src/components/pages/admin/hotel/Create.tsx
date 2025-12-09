/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/incompatible-library */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Home,
  Music,
  Wifi,
  Layers,
  User,
  DollarSign,
  MapPin,
  Droplet,
  Flame,
  CircleDot,
  Trophy,
  Gamepad2,
  Upload,
  X,
} from "lucide-react";

interface HotelForm {
  title: string;
  description: string;
  images: File[];
  sleepingPlaces: number;
  maxGuests: number;
  area: number;
  floor: number;
  landArea: number;
  housingType: string;
  address: string;
  pool: boolean;
  sauna: boolean;
  billiard: boolean;
  tennis: boolean;
  playstation: boolean;
  music: boolean;
  wifi: boolean;
  priceWeekday: number;
  priceFriday: number;
  priceSaturday: number;
  priceSunday: number;
  fullWeekend: number;
  newYearPrice: number;
  januaryPrice: number;
  deposit: number;
  checkIn: string;
  checkOut: string;
  importantInfo: string;
  extraFee: string;
  categoryId: string;
}

export default function CreateHotel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<HotelForm>({
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      sleepingPlaces: 0,
      maxGuests: 0,
      area: 0,
      floor: 0,
      landArea: 0,
      housingType: "",
      address: "",
      pool: false,
      sauna: false,
      billiard: false,
      tennis: false,
      playstation: false,
      music: false,
      wifi: false,
      priceWeekday: 0,
      priceFriday: 0,
      priceSaturday: 0,
      priceSunday: 0,
      fullWeekend: 0,
      newYearPrice: 0,
      januaryPrice: 0,
      deposit: 0,
      checkIn: "",
      checkOut: "",
      importantInfo: "",
      extraFee: "",
      images: [],
    },
    mode: "onSubmit",
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    // Добавляем новые изображения к существующим
    const allFiles = [...uploadedImages, ...filesArray];

    // Ограничение до 5 изображений
    const limitedFiles = allFiles.slice(0, 5);
    const previews = limitedFiles.map((file) => URL.createObjectURL(file));

    // Очищаем старые превью
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setUploadedImages(limitedFiles);
    setImagePreviews(previews);
    setValue("images", limitedFiles, { shouldValidate: true });

    // Очищаем input для возможности повторной загрузки того же файла
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]);

    setUploadedImages(newImages);
    setImagePreviews(newPreviews);
    setValue("images", newImages);
  };

  const onSubmit = (data: HotelForm) => {
    // Проверяем наличие изображений
    if (uploadedImages.length === 0) {
      alert("Пожалуйста, загрузите хотя бы одно изображение");
      return;
    }

    const payload = {
      ...data,
      sleepingPlaces: Number(data.sleepingPlaces),
      maxGuests: Number(data.maxGuests),
      area: Number(data.area),
      floor: Number(data.floor),
      landArea: Number(data.landArea) || 0,
      priceWeekday: Number(data.priceWeekday),
      priceFriday: Number(data.priceFriday),
      priceSaturday: Number(data.priceSaturday),
      priceSunday: Number(data.priceSunday),
      fullWeekend: Number(data.fullWeekend) || 0,
      newYearPrice: Number(data.newYearPrice) || 0,
      januaryPrice: Number(data.januaryPrice) || 0,
      deposit: Number(data.deposit) || 0,
      images: uploadedImages.map((file) => file.name),
    };

    //   const res = await fetch("/api/cars", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   });
    //   const result = await res.json();
    //   console.log("Ответ сервера:", result);

    console.log("Отправка на сервер:", payload);

    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    reset();
    setUploadedImages([]);
    setImagePreviews([]);
  };

  const amenities = [
    { name: "pool", label: "Бассейн", icon: Droplet },
    { name: "sauna", label: "Сауна", icon: Flame },
    { name: "billiard", label: "Бильярд", icon: CircleDot },
    { name: "tennis", label: "Теннис", icon: Trophy },
    { name: "playstation", label: "PlayStation", icon: Gamepad2 },
    { name: "music", label: "Музыка", icon: Music },
    { name: "wifi", label: "WiFi", icon: Wifi },
  ];

  const watchedAmenities = watch([
    "pool",
    "sauna",
    "billiard",
    "tennis",
    "playstation",
    "music",
    "wifi",
  ]);

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-gray-800 flex items-center gap-2">
        <Home size={26} className="text-[#0A8791]" />
        Добавить отель
      </h1>
      <div className="max-w-5xl mx-auto bg-white p-4 rounded-xl h-[80vh] overflow-y-auto hide-scrollbar">
        <div
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Название */}
          <div className="mb-4">
            <label className="block mb-1 font-medium text-gray-400">
              Название *
            </label>
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Hotel Paradise"
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
                <option value="Luxury">Luxury</option>
                <option value="Standard">Standard</option>
                <option value="Budget">Budget</option>
              </select>
            </div>
            {errors.categoryId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Спальные места *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="4"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.sleepingPlaces
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("sleepingPlaces", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.sleepingPlaces && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sleepingPlaces.message}
              </p>
            )}
          </div>

          {/* Максимум гостей */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Максимум гостей *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="6"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.maxGuests
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("maxGuests", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.maxGuests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxGuests.message}
              </p>
            )}
          </div>

          {/* Площадь */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Площадь (м²) *
            </label>
            <input
              type="number"
              placeholder="120"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.area
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("area", {
                required: "Обязательно",
                valueAsNumber: true,
              })}
            />
            {errors.area && (
              <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>
            )}
          </div>

          {/* Этаж */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Этаж *
            </label>
            <input
              type="number"
              placeholder="2"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.floor
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("floor", {
                required: "Обязательно",
                valueAsNumber: true,
              })}
            />
            {errors.floor && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floor.message}
              </p>
            )}
          </div>

          {/* Площадь участка */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Площадь участка (м²)
            </label>
            <input
              type="number"
              placeholder="500"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.landArea
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("landArea", {
                required: "Площадь участка (м²)",
                valueAsNumber: true,
              })}
            />
            {errors.landArea && (
              <p className="text-red-500 text-sm mt-1">
                {errors.landArea.message}
              </p>
            )}
          </div>

          {/* Тип жилья */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Тип жилья
            </label>
            <input
              type="text"
              placeholder="Коттедж / Апартаменты"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.housingType
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("housingType", { required: "Тип жилья обязателен" })}
            />
            {errors.housingType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.housingType.message}
              </p>
            )}
          </div>

          {/* Адрес */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Адрес *
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ул. Примерная, 123"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.address
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("address", { required: "Адрес обязателен" })}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Удобства - Чекбоксы с иконками */}
          <div className="md:col-span-2">
            <label className="block mb-3 font-medium text-gray-400">
              Удобства
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenities.map(({ name, label, icon: Icon }, index) => {
                const isChecked = watchedAmenities[index];
                return (
                  <label
                    key={name}
                    className={`relative flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                      isChecked
                        ? "border-[#0A8791] bg-[#0A8791]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      {...register(name as keyof HotelForm)}
                    />
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                        isChecked
                          ? "bg-[#0A8791] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isChecked ? "text-[#0A8791]" : "text-gray-600"
                      }`}
                    >
                      {label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Загрузка изображений */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Изображения *
            </label>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0A8791] transition-colors ${
                errors.images ? "border-red-500" : "border-gray-300"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                const files = Array.from(e.dataTransfer.files).filter((file) =>
                  file.type.startsWith("image/")
                );
                if (files.length === 0) return;

                const allFiles = [...uploadedImages, ...files].slice(0, 5);
                const previews = allFiles.map((file) =>
                  URL.createObjectURL(file)
                );

                imagePreviews.forEach((url) => URL.revokeObjectURL(url));

                setUploadedImages(allFiles);
                setImagePreviews(previews);
                setValue("images", allFiles, { shouldValidate: true });
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Нажмите или перетащите изображения
                </span>
                <span className="text-xs text-gray-400">
                  Можно загрузить несколько файлов (максимум 5)
                </span>
              </label>
            </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
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
                      className="relative group aspect-square rounded-lg overflow-hidden "
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
                        {uploadedImages[index].name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Цены */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена в будни *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="5000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.priceWeekday
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("priceWeekday", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.priceWeekday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priceWeekday.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена в пятницу *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="6000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.priceFriday
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("priceFriday", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.priceFriday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priceFriday.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена в субботу *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="7000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.priceSaturday
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("priceSaturday", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.priceSaturday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priceSaturday.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена в воскресенье *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="6000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.priceSunday
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("priceSunday", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.priceSunday && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priceSunday.message}
              </p>
            )}
          </div>

          {/* Дополнительные цены */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Полные выходные (Пт-Вс) *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="18000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.fullWeekend
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("fullWeekend", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.fullWeekend && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullWeekend.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена на Новый Год *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="15000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.newYearPrice
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("newYearPrice", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.newYearPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.newYearPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Цена в январе *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="8000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.januaryPrice
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("januaryPrice", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.januaryPrice && (
              <p className="text-red-500 text-sm mt-1">
                {errors.januaryPrice.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Залог *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="number"
                placeholder="5000"
                className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                  errors.deposit
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-primary"
                }`}
                {...register("deposit", {
                  required: "Обязательно",
                  valueAsNumber: true,
                })}
              />
            </div>
            {errors.deposit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deposit.message}
              </p>
            )}
          </div>

          {/* Время заезда/выезда */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Время заезда *
            </label>
            <input
              type="time"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.checkIn
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("checkIn", { required: "Обязательно" })}
            />
            {errors.checkIn && (
              <p className="text-red-500 text-sm mt-1">
                {errors.checkIn.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Время выезда *
            </label>
            <input
              type="time"
              className={`w-full px-4 py-2 border rounded focus:outline-none transition ${
                errors.checkOut
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("checkOut", { required: "Обязательно" })}
            />
            {errors.checkOut && (
              <p className="text-red-500 text-sm mt-1">
                {errors.checkOut.message}
              </p>
            )}
          </div>

          {/* Описание */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Описание *
            </label>
            <textarea
              placeholder="Краткое описание отеля..."
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

          {/* Важная информация */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Важная информация *
            </label>
            <textarea
              placeholder="Правила проживания, ограничения и т.д."
              className={`w-full px-4 py-2 border rounded focus:outline-none transition h-20 resize-none ${
                errors.importantInfo
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("importantInfo", {
                required: "Важная информация обязательна",
              })}
            />
            {errors.importantInfo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.importantInfo.message}
              </p>
            )}
          </div>

          {/* Дополнительные сборы */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Дополнительные сборы *
            </label>
            <textarea
              placeholder="Уборка, доп. услуги и т.д."
              className={`w-full px-4 py-2 border rounded focus:outline-none transition h-20 resize-none ${
                errors.extraFee
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
              {...register("extraFee", {
                required: "Дополнительные сборы обязательны",
              })}
            />
            {errors.extraFee && (
              <p className="text-red-500 text-sm mt-1">
                {errors.extraFee.message}
              </p>
            )}
          </div>

          {/* Кнопка */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="bg-[#0A8791] text-white px-7 py-2.5 rounded-lg hover:bg-[#086d72] transition-colors"
            >
              Создать
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
