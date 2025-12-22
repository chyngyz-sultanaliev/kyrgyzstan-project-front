"use client";

import { HotelCategory } from "@/shared/api/hotelCategoryApi";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const CARD_WIDTH = 160;
const GAP = 16;
const VISIBLE = 3;

const MOVE_DURATION = 1.5; // 👈 3 карточка 1.5 секундада

const SPEED = 0.5; // канча секундада 1 блок жылат
const PAUSE = 2; // токтоп туруу

const STEP = CARD_WIDTH + GAP;
const CONTAINER_WIDTH = CARD_WIDTH * VISIBLE + GAP * (VISIBLE - 1);

interface Props {
  category: any[];
}

function Welcome({ category }: Props) {
  const x = useMotionValue(0);
  const isStopped = useRef(false);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
    const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "",
    checkIn: "",
    checkOut: "",
    criteria: "",
    budget: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем, что все поля заполнены
    const isEmpty = Object.values(formData).some((val) => !val.trim());
    if (isEmpty) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    // Если все поля заполнены — показываем модал
    setSuccess(true);

    // Можно тут отправку на сервер делать
    console.log("Форма отправлена:", formData);

    // Очищаем форму
    setFormData({
      name: "",
      phone: "",
      guests: "",
      checkIn: "",
      checkOut: "",
      criteria: "",
      budget: "",
    });
  };

  const startAnimation = async () => {
    isStopped.current = false;

    const totalWidth = STEP * category.length;
    let current = x.get();

    while (!isStopped.current) {
      controlsRef.current = animate(x, current - STEP, {
        duration: MOVE_DURATION,
        ease: "linear",
      });

      await controlsRef.current.finished;

      current -= STEP;

      if (Math.abs(current) >= totalWidth) {
        current = 0;
        x.set(0);
      }

      await new Promise((res) => setTimeout(res, PAUSE * 1000));
    }
  };

  const stopAnimation = () => {
    isStopped.current = true;
    controlsRef.current?.stop();
  };

  useEffect(() => {
    startAnimation();
    return () => stopAnimation();
  }, [category.length]);

  const items = [...category, ...category];
  return (
    <section
      style={{
        backgroundImage: 'url("/images/main-hotel.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex items-center justify-center"
    >
      <div className="flex flex-col lg:flex-row items-center justify-around w-full min-h-[80vh] bg-[#00000084] gap-10 px-4">
        <div className="flex flex-col gap-5">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Аренда коттеджей <br /> и домов в Кыргызстане
          </h1>
          <p className="text-white text-xl">
            Найдите идеальный вариант сами или предоставьте это нам
          </p>
          <div
            className="overflow-hidden"
            style={{ width: CONTAINER_WIDTH }}
            onMouseEnter={stopAnimation}
            onMouseLeave={startAnimation}
          >
            <motion.div
              className="flex gap-4 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{
                left: -STEP * category.length,
                right: 0,
              }}
              style={{ x }}
            >
              {items.map((el, idx) => (
                <div
                  key={idx}
                  className="relative shrink-0 w-40 h-40 rounded-md overflow-hidden cursor-pointer"
                >
                  <img
                    src={el.image ?? "/images/bg_hotel.png"}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />

                  <div className="absolute inset-0 bg-linear-to-b from-transparent from-27% to-black/70" />

                  <h3 className="absolute bottom-4 left-4 text-white z-10">
                    {el.name}
                  </h3>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="max-w-sm bg-white rounded-3xl shadow-md p-4 space-y-1">
          <h1 className="text-2xl font-bold text-center">Заявка на подбор</h1>
          <p className="text-center text-gray-500 text-sm">
            Оставьте заявку на подбор и сократите свое время на поиск
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Имя"
              className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+996 ___-___-___"
              className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
            />

            <input
              type="text"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="Количество человек"
              className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
            />

            <div className="flex gap-2">
              <input
                type="text"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                placeholder="Въезд"
                className="w-1/2 px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                placeholder="Отъезд"
                className="w-1/2 px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <textarea
              name="criteria"
              value={formData.criteria}
              onChange={handleChange}
              placeholder="Ваши критерии к коттеджу (чем конкретнее, тем лучше)"
              className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 resize-none"
            ></textarea>

            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Допустимый бюджет"
              className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
            />

            <button
              type="submit"
              className="w-full py-1 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-sm transition cursor-pointer active:scale-95"
            >
              Оставить заявку
            </button>
          </form>
        </div>
      </div>

      {/* Модал успешной отправки */}
      {success && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-md p-6 md:p-10 rounded-xl flex flex-col items-center gap-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-medium">Заявка отправлена!</h3>
            <p className="text-center">
              В течение 15 минут с вами свяжется специалист и проконсультирует.
            </p>
            <button
              className="bg-[#0a8791] text-white py-2 px-7 rounded-full hover:bg-[#05585e]"
              onClick={() => setSuccess(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Welcome;
