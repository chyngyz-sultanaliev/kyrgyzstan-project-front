"use client"

import axios from "axios";
import React, { useEffect } from "react";

const Welcome = () => {
  const getCategory = async () => {
    try {
      const res = await axios.get(`https://kyrgyzstan-project-back.onrender.com/api/v1/categories/hotel`)
      console.log(res.data, "hotel api");
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  return (
    <section
      style={{
        backgroundImage: 'url("/images/main-hotel.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="w-full flex items-center justify-center"
    >
     <div className="flex items-center justify-around w-full min-h-[80vh] bg-[#00000084]">
       <div className="flex flex-col gap-5">
        <h1 className="text-white text-5xl">Аренда коттеджей <br /> и домов в Кыргызстане</h1>
        <p className="text-white text-xl">Найдите идеальный вариант сами или предоставьте это нам</p>
        <div className="flex gap-4 mt-7">
          <div className="w-40 h-40 bg-green-950"></div>
          <div className="w-40 h-40 bg-green-950"></div>
          <div className="w-40 h-40 bg-green-950"></div>
        </div>
      </div>
        <div className="max-w-sm bg-white rounded-3xl shadow-md p-4 space-y-1">
      <h1 className="text-2xl font-bold text-center">Заявка на подбор</h1>
      <p className="text-center text-gray-500 text-sm">
        Оставьте заявку на подбор и сократите свое время на поиск
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Имя"
          className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        />

        <input
          type="text"
          placeholder="+996 ___-___-___"
          className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="text"
          placeholder="Количество человек"
          className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Въезд"
            className="w-1/2 px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
          />

          <input
            type="text"
            placeholder="Отъезд"
            className="w-1/2 px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <textarea
          placeholder="Ваши критерии к коттеджу (чем конкретнее, тем лучше)"
          // rows="3"
          className="w-full px-4 py-1 rounded-sm border border-gray-200 focus:ring-2 focus:ring-teal-500 resize-none"
        ></textarea>

        <input
          type="text"
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
    </section>
  );
};

export default Welcome;
