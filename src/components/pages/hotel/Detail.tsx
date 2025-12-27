"use client";

import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { useParams } from "next/navigation";
import Review from "./Review";

import { useGetHotelByIdQuery } from "@/shared/api/hotelApi";
import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";

const Detail = () => {
  const { id } = useParams();

  // ---- API ----
  const { data: hotel, isLoading } = useGetHotelByIdQuery(String(id));
  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // ---- Favorite logic (SAFE) ----
  const favorite = hotel
    ? favorites?.find((f) => f.itemType === "HOTEL" && f.item?.id === hotel.id)
    : undefined;

  const isFavorite = Boolean(favorite);

  // ---- Form state ----
  const [form, setForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  // ---- Scroll lock ----
  useEffect(() => {
    document.body.style.overflow = form ? "hidden" : "auto";
  }, [form]);

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

  // ---- Loading / Error ----
  if (isLoading) {
    return <div className="text-center py-20 text-lg">Загрузка...</div>;
  }

  if (!hotel) {
    return <div className="text-center py-20 text-lg">Отель не найден</div>;
  }

  return (
    <section className="px-4 py-10 md:px-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start justify-between pb-7 gap-4">
        <div>
          <h1 className="text-3xl font-medium">{hotel.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{hotel.address}</p>
        </div>

        <div className="flex gap-5 text-3xl cursor-pointer">
          {/* Share */}
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

          {/* ❤️ Favorite */}
          <CiHeart
            className={`transition ${
              isFavorite ? "text-red-600" : "text-gray-400"
            }`}
            onClick={async () => {
              try {
                if (isFavorite && favorite) {
                  await removeFavorite(favorite.id);
                } else {
                  await addFavorite({
                    itemId: hotel.id, // <-- исправлено
                  });
                }
              } catch (err) {
                console.error(err);
                alert("Ошибка при добавлении/удалении из избранного");
              }
            }}
          />
        </div>
      </div>

      {/* Gallery */}
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

      {/* Booking button */}
      <button
        className="bg-[#0a8791] text-white py-2 px-6 rounded-full mt-6 hover:bg-[#05585e]"
        onClick={() => {
          setForm(true);
          setSuccess(false);
        }}
      >
        Оставить заявку
      </button>

      {/* Modal */}
      {form && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={() => setForm(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-xl w-[90%] max-w-md"
          >
            {!success ? (
              <>
                <h3 className="text-xl font-medium mb-3">Заявка</h3>
                {Object.keys(formData).map((key) => (
                  <input
                    key={key}
                    name={key}
                    value={(formData as any)[key]}
                    onChange={handleChange}
                    placeholder={key}
                    className="w-full border py-2 px-4 rounded-full mb-2"
                  />
                ))}
                <button
                  onClick={handleSend}
                  className="bg-[#0a8791] text-white py-2 px-6 rounded-full w-full"
                >
                  Отправить
                </button>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-xl font-medium">Заявка отправлена ✅</h3>
                <button
                  onClick={() => setForm(false)}
                  className="mt-4 bg-[#0a8791] text-white py-2 px-6 rounded-full"
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
