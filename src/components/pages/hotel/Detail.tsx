"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { useParams } from "next/navigation";
import Review from "./Review";

import { Hotel, useGetHotelByIdQuery } from "@/shared/api/hotelApi";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";
import { FaHeart } from "react-icons/fa";

const Detail = () => {
  const { id } = useParams();
  const [isFavLocal, setIsFavLocal] = useState(false);

  // ---- API ----
  const { data: hotel, isLoading } = useGetHotelByIdQuery(String(id));
  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const favorite = hotel
    ? favorites?.find(
        (f) =>
          f.itemType === "HOTEL" && (f.item as Hotel | null)?.id === hotel.id
      )
    : undefined;

  // ---- Form state ----
  const isFavorite = Boolean(favorite);
  const [form, setForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  // ---- Double click handler ----
  const [togglePosition, setTogglePosition] = useState(false);
  const handleDoubleClick = () => setTogglePosition(!togglePosition);

  // ---- Drag refs ----
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  // ---- Scroll lock ----
  useEffect(() => {
    document.body.style.overflow = form ? "hidden" : "auto";
  }, [form]);

  useEffect(() => {
    setIsFavLocal(isFavorite);
  }, [isFavorite]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    const isEmpty = Object.values(formData).some((val) => !val.trim());
    if (isEmpty) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    setSuccess(true);
    setFormData({
      name: "",
      phone: "",
      guests: "",
      checkIn: "",
      checkOut: "",
    });
  };

  if (isLoading)
    return <div className="text-center py-20 text-lg">Загрузка...</div>;
  if (!hotel)
    return <div className="text-center py-20 text-lg">Отель не найден</div>;

  return (
    <section className="px-4 py-10 md:px-20">
      {/* Header & Gallery */}
      <div className="flex flex-col md:flex-row items-start justify-between pb-7 gap-4">
        <div>
          <h1 className="text-3xl font-medium">{hotel.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{hotel.address}</p>
        </div>
        <div className="flex gap-5 text-3xl cursor-pointer">
          <CiShare2
            onClick={async () => {
              if (navigator.share) {
                await navigator.share({
                  title: hotel.title,
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Ссылка скопирована!");
              }
            }}
          />
          <FaHeart
            className={`transition ${
              isFavLocal ? "text-red-600" : "text-gray-400"
            }`}
            onClick={async () => {
              const prev = isFavLocal;
              setIsFavLocal(!prev);
              try {
                if (prev && favorite) {
                  await removeFavorite(favorite.id).unwrap();
                } else {
                  await addFavorite({ itemId: hotel.id }).unwrap();
                }
              } catch (err) {
                setIsFavLocal(prev);
                alert("Ошибка сервера");
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={hotel.images?.[0]?.img || "/placeholder.png"}
            className="w-full h-full object-cover rounded-2xl min-h-[300px]"
          />
        </div>
        {hotel.images?.slice(1, 5).map((img, i) => (
          <img
            key={i}
            src={img.img}
            className="h-[140px] md:h-[200px] w-full object-cover rounded-2xl"
          />
        ))}
      </div>

      {/* Info block с draggable */}
      <div
        ref={containerRef}
        className="mt-6 flex flex-col items-end gap-6 p-6 rounded-2xl w-full relative"
        style={{ minHeight: 400 }}
      >
        <motion.div
          ref={dragRef}
          drag
          dragConstraints={containerRef}
          dragElastic={0.2}
          onDoubleClick={handleDoubleClick}
          animate={{
            x: togglePosition ? 150 : -150,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white p-10 rounded-md w-fit cursor-grab shadow-lg"
        >
          {/* Info */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-700">
            <div className="flex items-center justify-between w-full">
              <span>🛏 {hotel.sleepingPlaces} спальных мест</span>
              <span>👥 до {hotel.maxGuests} гостей</span>
            </div>
            {hotel.pool && <span>🏊 Бассейн</span>}
            {hotel.sauna && <span>🔥 Сауна</span>}
            {hotel.wifi && <span>📶 Wi-Fi</span>}
            {hotel.billiard && <span>🎱 Бильярд</span>}
            {hotel.tennis && <span>🎾 Теннис</span>}
            {hotel.playstation && <span>🎮 Playstation</span>}
            {hotel.music && <span>🎵 Музыка</span>}
          </div>

          {/* Prices */}
          <div className="mt-2 border-t pt-2 text-gray-800 flex items-center justify-between gap-1 text-sm my-6">
            <div className="flex flex-col gap-4">
              <span>
                Цена будни: <strong>{hotel.priceWeekday}$</strong>
              </span>
              <span>
                Пятница: <strong>{hotel.priceFriday}$</strong>
              </span>
              <span>
                Суббота: <strong>{hotel.priceSaturday}$</strong>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <span>
                Воскресенье: <strong>{hotel.priceSunday}$</strong>
              </span>
              {hotel.fullWeekend && (
                <span>
                  Полные выходные: <strong>{hotel.fullWeekend}$</strong>
                </span>
              )}
              {hotel.deposit && (
                <span>
                  Депозит: <strong>{hotel.deposit}$</strong>
                </span>
              )}
            </div>
          </div>

          {/* Important info */}
          {hotel.importantInfo && (
            <div className="mt-2 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <strong>Важная информация:</strong> {hotel.importantInfo}
            </div>
          )}

          {/* Booking button */}
          <button
            className="cursor-pointer bg-linear-to-r from-cyan-500 to-teal-500 text-white py-2 px-6 rounded-full hover:scale-105 transition-transform duration-200 mt-4 shadow-md"
            onClick={() => {
              setForm(true);
              setSuccess(false);
            }}
          >
            Оставить заявку
          </button>
        </motion.div>
      </div>

      {/* Modal */}
    {form && (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={() => setForm(false)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-3xl shadow-lg w-[90%] max-w-sm p-6 space-y-4"
    >
      {!success ? (
        <>
          <h1 className="text-2xl font-bold text-center">Заявка на подбор</h1>
          <p className="text-center text-gray-500 text-sm">
            Оставьте заявку на подбор и сократите свое время на поиск
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              className="w-full px-4 py-2 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 ___-___-___"
              className="w-full px-4 py-2 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            <input
              type="text"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="Количество человек"
              className="w-full px-4 py-2 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            <div className="flex gap-2">
              <input
                type="text"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                placeholder="Въезд"
                className="w-1/2 px-4 py-2 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
              <input
                type="text"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                placeholder="Отъезд"
                className="w-1/2 px-4 py-2 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-sm transition cursor-pointer active:scale-95"
            >
              Оставить заявку
            </button>
          </form>
        </>
      ) : (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">Заявка отправлена ✅</h3>
          <button
            onClick={() => setForm(false)}
            className="mt-2 w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-sm transition cursor-pointer active:scale-95"
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  </div>
)}



      {/* Reviews */}
      <Review hotelId={hotel.id} />
    </section>
  );
};

export default Detail;
