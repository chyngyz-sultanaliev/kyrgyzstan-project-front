"use client";
import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import Review from "./Review";
import { useGetHotelByIdQuery } from "@/shared/api/hotelApi";
import { useParams } from "next/navigation";

const Detail = () => {
  const [form, setForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
  });

  const { id } = useParams();
  const { data: hotel, isLoading } = useGetHotelByIdQuery(String(id));

  // блокировка скролла при открытой форме
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
    console.log("Форма отправлена:", formData);

    // Очистка формы
    setFormData({
      name: "",
      phone: "",
      guests: "",
      checkIn: "",
      checkOut: "",
    });
  };

  if (isLoading) {
    return <div className="text-center py-20 text-lg">Загрузка...</div>;
  }

  if (!hotel) {
    return <div className="text-center py-20 text-lg">Отель не найден</div>;
  }

  return (
    <section className="px-4 py-10 md:px-20">
      {/* Заголовок и действия */}
      <div className="flex flex-col md:flex-row items-start justify-between pb-7 gap-4 md:gap-0">
        <div>
          <h1 className="text-3xl font-medium">{hotel.title}</h1>
          <p className="text-sm text-gray-500 mt-1">{hotel.address}</p>
        </div>
        <div className="flex gap-5 text-3xl text-red-600 cursor-pointer">
          <CiShare2
            onClick={async () => {
              if (navigator.share) {
                try {
                  await navigator.share({
                    title: hotel.title,
                    text: `Смотрите этот отель: ${hotel.title}`,
                    url: window.location.href,
                  });
                } catch (err) {
                  console.error("Ошибка при шаринге:", err);
                }
              } else {
                // fallback: скопировать ссылку в буфер обмена
                navigator.clipboard.writeText(window.location.href);
                alert("Ссылка скопирована в буфер обмена!");
              }
            }}
          />
          <CiHeart />
        </div>
      </div>

      {/* Галерея изображений */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="md:col-span-2 md:row-span-2">
          <img
            src={hotel.images?.[0]?.img || "/placeholder.png"}
            alt="main"
            className="w-full h-full object-cover rounded-2xl min-h-[300px] md:min-h-[420px]"
          />
        </div>

        {hotel.images?.slice(1, 5).map((image, index) => (
          <div key={index} className="h-[140px] md:h-[200px]">
            <img
              src={image.img || "/placeholder.png"}
              alt={`hotel ${index}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* Информация об отеле */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-b pb-4 border-gray-300">
            <div>
              <span className="text-gray-600 text-sm">Тип жилья</span>
              <p>{hotel.housingType}</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Этажи</span>
              <p>{hotel.floor} этажа</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Площадь</span>
              <p>{hotel.area} м²</p>
            </div>
            <div>
              <span className="text-gray-600 text-sm">Участок</span>
              <p>{hotel.landArea} соток</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-4 gap-4">
            <p>{hotel.sleepingPlaces} спальных мест</p>
            <p>{hotel.sleepingPlaces} спален</p>
            <p>до {hotel.maxGuests} человек</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-medium mb-2">Описание</h3>
            <p className="text-sm md:text-base">{hotel.description}</p>
            {hotel.deposit && (
              <>
                <h3 className="text-xl font-medium mt-4 mb-2">
                  Дополнительные платы
                </h3>
                <p className="text-sm md:text-base">{hotel.deposit}</p>
              </>
            )}
            {hotel.importantInfo && (
              <>
                <h3 className="text-xl font-medium mt-4 mb-2">
                  Важная информация
                </h3>
                <p className="text-sm md:text-base">{hotel.importantInfo}</p>
              </>
            )}
          </div>
        </div>

        {/* Блок с ценами */}
        <div className="p-6 md:p-10 shadow-2xl rounded-xl bg-white shrink-0 w-full md:w-[400px]">
          <h3 className="text-xl font-medium mb-4">Стоимость</h3>
          <div className="grid grid-cols-2 gap-4 border-b border-gray-300 pb-4">
            {hotel.priceWeekday && <p>Будни: {hotel.priceWeekday} сом</p>}
            {hotel.priceFriday && <p>Пятница: {hotel.priceFriday} сом</p>}
            {hotel.priceSaturday && <p>Суббота: {hotel.priceSaturday} сом</p>}
            {hotel.priceSunday && <p>Воскресенье: {hotel.priceSunday} сом</p>}
          </div>
          {hotel.deposit && <p className="mt-2">Залог: {hotel.deposit} сом</p>}
          {hotel.fullWeekend && (
            <p className="mt-4">
              Полные выходные (ПТ-ВС): {hotel.fullWeekend} сом
            </p>
          )}
          {hotel.newYearPrice && (
            <p>Новый год (2 дня): от {hotel.newYearPrice} сом</p>
          )}
          {hotel.januaryPrice && (
            <p>Январские праздники (сутки): от {hotel.januaryPrice} сом</p>
          )}

          <button
            className="bg-[#0a8791] text-white py-2 px-6 rounded-full mt-6 w-full hover:bg-[#05585e] transition-all"
            onClick={() => {
              setForm(true);
              setSuccess(false);
            }}
          >
            Оставить заявку на этот выбор
          </button>
        </div>
      </div>

      {/* Модальное окно формы */}
      {form && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30"
          onClick={() => setForm(false)}
        >
          {!success ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-md p-6 md:p-10 rounded-xl flex flex-col gap-4"
            >
              <h3 className="text-2xl font-medium">Заявка</h3>
              <p>Оставьте заявку — мы свяжемся с вами в ближайшее время</p>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Имя"
                className="w-full border border-gray-500 py-2 px-4 rounded-full"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+996 ___ __ __"
                className="w-full border border-gray-500 py-2 px-4 rounded-full"
              />
              <input
                type="text"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Количество человек"
                className="w-full border border-gray-500 py-2 px-4 rounded-full"
              />
              <div className="flex gap-3">
                <input
                  type="text"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  placeholder="Въезд"
                  className="w-full border border-gray-500 py-2 px-4 rounded-full"
                />
                <input
                  type="text"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  placeholder="Отъезд"
                  className="w-full border border-gray-500 py-2 px-4 rounded-full"
                />
              </div>

              <button
                onClick={handleSend}
                className="bg-[#0a8791] text-white py-2 px-7 rounded-full hover:bg-[#05585e]"
              >
                Оставить заявку
              </button>
            </div>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-md p-6 md:p-10 rounded-xl flex flex-col items-center gap-5"
            >
              <h3 className="text-2xl font-medium">Заявка отправлена!</h3>
              <p className="text-center">
                В течение 15 минут с вами свяжется специалист и
                проконсультирует.
              </p>
              <button
                className="bg-[#0a8791] text-white py-2 px-7 rounded-full hover:bg-[#05585e]"
                onClick={() => {
                  setForm(false);
                  setSuccess(false);
                }}
              >
                Закрыть
              </button>
            </div>
          )}
        </div>
      )}

      {/* Компонент отзывов */}
      <Review hotelId={hotel.id} />
    </section>
  );
};

export default Detail;
