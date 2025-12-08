"use client";
import { useEffect, useState } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";

const Detail = () => {
  const [form, setForm] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = form ? "hidden" : "auto";
  }, [form]);

  function handleSend() {
    setSuccess(true);
  }
  return (
    <>
      <section className="px-20 py-10">
        <div className="flex items-center justify-between pb-7">
          {" "}
          <h1 className="text-3xl font-medium">
            Горки-Сухаревские 1{" "}
            <span className="text-xl font-light">
              Рублево-Успенское шоссе 24 км от МКАД
            </span>
          </h1>{" "}
          <div className="flex gap-5 text-3xl text-red-600 cursor-pointer">
            <a>
              <CiShare2 />
            </a>{" "}
            <a>
              <CiHeart />
            </a>
          </div>
        </div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  {/* Left big image */}
  <div className="md:col-span-2">
    <img
      src="/images/hotel-detail.jpg"
      alt="hotel"
      className="w-full h-[300px] md:h-[450px] object-cover rounded-xl"
    />
  </div>

  {/* Right 2x2 images */}
  <div className="grid grid-cols-2 gap-4 md:col-span-2">
    <img
      src="/images/hotel-detail.jpg"
      className="w-full h-[150px] md:h-52 object-cover rounded-xl"
    />

    <img
      src="/images/hotel-detail.jpg"
      className="w-full h-[150px] md:h-52 object-cover rounded-xl"
    />

    <img
      src="/images/hotel-detail.jpg"
      className="w-full h-[150px] md:h-52 object-cover rounded-xl"
    />

    <img
      src="/images/hotel-detail.jpg"
      className="w-full h-[150px] md:h-52 object-cover rounded-xl"
    />
  </div>
</div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-48">
          <div>
            <div className="flex items-center gap-12 border-b-2 w-fit pb-3 pt-10 border-gray-600">
              <h3 className="text-xl">
                <span className="text-gray-600 text-sm">Тип жилья</span> <br />{" "}
                Уникальное жилье
              </h3>
              <h3 className="text-xl">
                <span className="text-gray-600 text-sm">Этажи</span> <br /> 2
                этажа
              </h3>
              <h3 className="text-xl">
                <span className="text-gray-600 text-sm">Площадь</span> <br />
                234 м2
              </h3>
              <h3 className="text-xl">
                <span className="text-gray-600 text-sm">Участок</span> <br />
                12 соток
              </h3>
            </div>
            <div className="flex gap-28 pt-3">
              <h3>25 спальных мест</h3>
              <h3>5 спален</h3>
              <h3>до 35 человек</h3>
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <h3 className="text-xl font-medium">Описание</h3>
              <p className="w-xl">
                Наши апартаменты отличаются большим удобством и
                функциональностью всего пространства. В них с комфортом могут
                разместиться до трех человек. Большие панорамные окна и отделка
                из натуральных материалов отражает концепцию всего дома в стиле
                лофт.
              </p>
              <h3 className="text-xl font-medium">Дополнительные платы</h3>
              <p className="w-xl">
                Наши апартаменты отличаются большим удобством и
                функциональностью всего пространства. В них с комфортом могут
                разместиться до трех человек. Большие панорамные окна и отделка
                из натуральных материалов отражает концепцию всего дома в стиле
                лофт.
              </p>
              <h3 className="text-xl font-medium">Важная информация</h3>
              <p className="w-xl">
                Наши апартаменты отличаются большим удобством и
                функциональностью всего пространства. В них с комфортом могут
                разместиться до трех человек. Большие панорамные окна и отделка
                из натуральных материалов отражает концепцию всего дома в стиле
                лофт.
              </p>
            </div>
          </div>
          <div className="p-10 shadow-2xl rounded-xl mt-20">
            <h3 className="text-xl font-medium">Стоимость</h3>
            <div className="flex items-start gap-10">
              <div className="grid grid-cols-2 gap-4 border-r-[1.2px] border-gray-500 pr-10">
                <h3 className="text-xl font-medium">
                  <span className="text-sm text-gray-600 font-light">
                    Будни <br />
                  </span>
                  8000 som
                </h3>
                <h3 className="text-xl font-medium">
                  <span className="text-sm text-gray-600 font-light">
                    Пятница <br />
                  </span>
                  10 000 som
                </h3>
                <h3 className="text-xl font-medium">
                  <span className="text-sm text-gray-600 font-light">
                    Суббота <br />
                  </span>
                  12 000 som
                </h3>
                <h3 className="text-xl font-medium">
                  <span className="text-sm text-gray-600 font-light">
                    Воскресенье <br />
                  </span>
                  12 000 som
                </h3>
              </div>
              <h3 className="text-xl font-medium">
                <span className="text-sm text-gray-600 font-light">
                  Залог <br />
                </span>
                2000 som
              </h3>
            </div>
            <h2 className="text-2xl py-4 border-y-[1.2px] mt-4 flex justify-start items-center gap-3 font-medium">
              <span className="text-sm font-light">
                Полные выходные (ПТ-ВС)
              </span>{" "}
              12 000 ₽
            </h2>
            <h2 className="text-2xl font-medium py-4">
              <span className="text-sm font-light">Новый год (2 дня)</span> от
              100 000 ₽
            </h2>
            <h2 className="text-2xl font-medium">
              <span className="text-sm font-light">
                Январские празднкии (сутки)
              </span>{" "}
              от 30 000 ₽
            </h2>
            <button
              className="bg-[#0a8791] text-white py-2 px-6 rounded-full cursor-pointer mt-16 hover:bg-[#05585e] transition-all"
              onClick={() => {
                setForm(true);
                setSuccess(false)
              }}
            >
              Оставить заявку на этот выбор{" "}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-16">
          {/* <video controls className="w-[560px] h-[360px]">
            <source src="/video/hotel.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <div className="w-[560px] h-[360px] flex flex-col gap-6">
            <h3 className="text-2xl font-medium">Отзывы</h3>
            <div className="bg-gray-300 p-4 rounded-md">
              <img src="/images/userr.avif" alt="" className="w-14 h-14" />
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Obcaecati deleniti nostrum facere laborum expedita labore est
                eum adipisci eligendi ratione!
              </p>
            </div>
            <div className="bg-gray-300 p-4 rounded-md">
              <img src="/images/userr.avif" alt="" className="w-14 h-14" />
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Obcaecati deleniti nostrum facere laborum expedita labore est
                eum adipisci eligendi ratione!
              </p>
            </div>
          </div>
        </div>
        {form && (
          <div
            className="fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm
            flex items-center justify-center z-30"
            onClick={() => setForm(false)}
          >
            {/* FORM BLOCK */}
            {!success && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[400px] p-10 rounded-xl flex flex-col items-center gap-4"
              >
                <h3 className="text-2xl font-medium">Заявка</h3>
                <p>Оставьте заявку — мы свяжемся с вами в ближайшее время</p>

                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full border border-gray-500 py-2 px-4 rounded-full"
                />

                <input
                  type="text"
                  placeholder="+996 ___ __ __"
                  className="w-full border border-gray-500 py-2 px-4 rounded-full"
                />

                <input
                  type="text"
                  placeholder="Количество человек"
                  className="w-full border border-gray-500 py-2 px-4 rounded-full"
                />

                <div className="w-full flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Въезд"
                    className="w-full border border-gray-500 py-2 px-4 rounded-full"
                  />
                  <input
                    type="text"
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
            )}

            {/* SUCCESS BLOCK */}
            {success && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[400px] p-10 rounded-lg flex flex-col items-center gap-5"
              >
                <h3 className="text-2xl font-medium">Заявка отправлена!</h3>
                <p className="text-center">
                  В течение 15 минут с вами свяжется специалист и проконсультирует.
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
      </section>
    </>
  );
};

export default Detail;
