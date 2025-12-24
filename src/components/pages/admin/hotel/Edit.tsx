/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import {
  Hotel,
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
import {
  useGetHotelByIdQuery,
  useUpdateHotelMutation,
} from "@/shared/api/hotelApi";
import { useGetHotelCategoriesQuery } from "@/shared/api/hotelCategoryApi";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";

interface HotelForm {
  title: string;
  description: string;
  images: string[];
  categoryId: string;
  priceWeekday: number;
  priceFriday: number;
  priceSaturday: number;
  priceSunday: number;
  fullWeekend: number;
  newYearPrice: number;
  januaryPrice: number;
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
  parking: boolean;
  deposit: number;
  checkIn: string;
  checkOut: string;
  importantInfo: string;
  extraFee: string;
}

export default function HotelEdit() {
  const { id } = useParams();
  const { data: hotel, isLoading, error } = useGetHotelByIdQuery(String(id));
  const { data: categories } = useGetHotelCategoriesQuery();
  const [updateHotel, { isLoading: isUpdating }] = useUpdateHotelMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HotelForm>({
    defaultValues: { images: [] },
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Подгружаем данные отеля
  useEffect(() => {
    if (!hotel) return;

    const oldImages = hotel.images.map((imgObj) => imgObj.img);

    setValue("title", hotel.title);
    setValue("description", hotel.description);
    setValue("categoryId", hotel.categoryId);
    setValue("priceWeekday", hotel.priceWeekday);
    setValue("priceFriday", hotel.priceFriday);
    setValue("priceSaturday", hotel.priceSaturday);
    setValue("priceSunday", hotel.priceSunday);
    setValue("fullWeekend", hotel.fullWeekend);
    setValue("newYearPrice", hotel.newYearPrice);
    setValue("januaryPrice", hotel.januaryPrice);

    setValue("sleepingPlaces", hotel.sleepingPlaces);
    setValue("maxGuests", hotel.maxGuests);
    setValue("area", hotel.area);
    setValue("floor", hotel.floor);
    setValue("landArea", hotel.landArea);
    setValue("housingType", hotel.housingType);
    setValue("address", hotel.address);

    setValue("pool", hotel.pool);
    setValue("sauna", hotel.sauna);
    setValue("billiard", hotel.billiard);
    setValue("tennis", hotel.tennis);
    setValue("playstation", hotel.playstation);
    setValue("music", hotel.music);
    setValue("wifi", hotel.wifi);

    setValue("deposit", hotel.deposit);
    setValue("checkIn", hotel.checkIn);
    setValue("checkOut", hotel.checkOut);
    setValue("importantInfo", hotel.importantInfo);
    setValue("extraFee", hotel.extraFee);

    setImageUrls(oldImages);
    setImagePreviews(oldImages);
    setValue("images", oldImages);
  }, [hotel]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    const updated = [...imageUrls, ...previews].slice(0, 5);
    setImageUrls(updated);
    setImagePreviews(updated);
    setValue("images", updated);
    e.target.value = "";
  };

  const removeImage = (index: number) => {
    const updated = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updated);
    setImagePreviews(updated);
    setValue("images", updated);
  };

  const onSubmit = async (data: HotelForm) => {
    if (imageUrls.length === 0) {
      alert("Пожалуйста, загрузите хотя бы одно изображение");
      return;
    }

    const payload = {
      id: id as string,
      data: {
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        images: imageUrls.map((img) => ({ img })),

        // Цены
        priceWeekday: data.priceWeekday,
        priceFriday: data.priceFriday,
        priceSaturday: data.priceSaturday,
        priceSunday: data.priceSunday,
        fullWeekend: data.fullWeekend,
        newYearPrice: data.newYearPrice,
        januaryPrice: data.januaryPrice,
        deposit: data.deposit,

        // Параметры жилья
        sleepingPlaces: data.sleepingPlaces,
        maxGuests: data.maxGuests,
        area: data.area,
        floor: data.floor,
        landArea: data.landArea,
        housingType: data.housingType,
        address: data.address,

        // Удобства
        pool: data.pool,
        sauna: data.sauna,
        billiard: data.billiard,
        tennis: data.tennis,
        playstation: data.playstation,
        music: data.music,
        wifi: data.wifi,
        parking: data.parking,

        // Время заезда/выезда
        checkIn: data.checkIn,
        checkOut: data.checkOut,

        // Дополнительная информация
        importantInfo: data.importantInfo,
        extraFee: data.extraFee,
      },
    };

    try {
      await updateHotel(payload).unwrap();
      alert("Отель успешно обновлен!");
    } catch (err) {
      console.error("Ошибка при обновлении отеля:", err);
      alert("Ошибка при обновлении отеля");
    }
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
      <h1 className="text-2xl font-semibold m-4 text-gray-800 flex items-center gap-2">
        <Hotel size={26} className="text-[#0A8791]" />
        Редактировать отель
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
          {amenities.map(({ name, label, icon: Icon }) => {
            // Проверяем состояние каждого удобства
            const isChecked = watch(name as keyof HotelForm);

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

          {/* Загрузка изображений */}
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium text-gray-400">
              Изображения * (макс. 5)
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center hover:border-[#0A8791] transition-colors cursor-pointer ${
                isUpdating ? "opacity-50 cursor-not-allowed" : "border-gray-300"
              }`}
              onClick={() =>
                !isUpdating && document.getElementById("image-upload")?.click()
              }
              onDragOver={(e) => {
                e.preventDefault(); // обязательно
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (isUpdating) return;

                const files = Array.from(e.dataTransfer.files);
                const previews = files.map((file) => URL.createObjectURL(file));

                setImagePreviews((prev) => [...prev, ...previews].slice(0, 5));
                setImageUrls((prev) => [...prev, ...previews].slice(0, 5));
                setValue("images", [...imageUrls, ...previews].slice(0, 5));
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
                disabled={isUpdating || imageUrls.length >= 5}
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

            {imagePreviews.length > 0 && (
              <div className="mt-3">
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
            <Button
              loading={isUpdating}
              onClick={handleSubmit(onSubmit)}
              disabled={isUpdating}
            >
              {isUpdating ? "Загрузка..." : "Обновить"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
