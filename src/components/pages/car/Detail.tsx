/* eslint-disable @next/next/no-img-element */
"use client";

import { useParams } from "next/navigation";
import { useState, FormEvent } from "react";
import Review from "./Review";
import { useGetCarByIdQuery } from "@/shared/api/carApi";
import Button from "@/components/ui/Button/Button";
import axios from "axios";
import StatusMessage from "@/components/ui/status/Status";

interface ModalData {
  email: string;
  num: string;
  description: string;
}

const Detail = () => {
  const { id } = useParams();
  const { data: car, isLoading, error } = useGetCarByIdQuery(String(id));

  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ModalData>({
    email: "",
    num: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const chat_id = "-1002597947748";
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

      const textMessage = `
📧 Email: ${formData.email}
📞 Number: ${formData.num}
📝 Description: ${formData.description}
`;

      await axios.post(api_url, {
        chat_id,
        parse_mode: "HTML",
        text: textMessage,
      });
      setSubmitted(true);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  if (isLoading) return <StatusMessage variant="loading" />;
  if (error || !car)
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* TOP SECTION */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
            {/* IMAGE SECTION */}
            <div className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-6 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                {car.image && car.image.length > 0 ? (
                  <img
                    src={car.image[0].img}
                    alt={car.title}
                    className="w-full max-w-[500px] object-cover rounded-2xl cursor-pointer transform transition-transform duration-500 group-hover:scale-105 shadow-lg"
                    onClick={() => {
                      setCurrentImg(0);
                      setLightboxOpen(true);
                    }}
                  />
                ) : (
                  <div className="w-full max-w-[500px] aspect-[16/10] bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl animate-pulse" />
                )}
              </div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-sm font-semibold text-teal-600">
                  {car.image?.length || 0} Photos
                </span>
              </div>
            </div>

            {/* INFO SECTION */}
           <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7 flex flex-col justify-between transition-shadow hover:shadow-lg">
  <div>
    {/* HEADER */}
    <div className="flex items-start justify-between gap-4 mb-3">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
        {car.title}
      </h1>

      <span className="shrink-0 text-[11px] font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
        NEW
      </span>
    </div>

    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
      {car.description}
    </p>

    {/* SPECS */}
    <div className="grid grid-cols-2 gap-3 mb-5">
      {[
        { label: "Fuel", value: car.fuelType, icon: "⛽" },
        { label: "Transmission", value: car.transmission, icon: "⚙️" },
        { label: "Seats", value: car.seat, icon: "👥" },
        { label: "Year", value: car.year, icon: "📅" },
        { label: "Engine", value: car.engine, icon: "🔧" },
        { label: "Drive", value: car.drive, icon: "🚗" },
      ].map((spec) => (
        <div
          key={spec.label}
          className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200"
        >
          <span className="text-base">{spec.icon}</span>
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-500 uppercase">
              {spec.label}
            </span>
            <span className="text-sm font-medium text-gray-800">
              {spec.value}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* AGE */}
    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
      <span>🎂</span>
      <span>
        <span className="text-gray-500">Min driver age:</span>{" "}
        <span className="font-semibold text-gray-900">
          {car.minDriverAge}
        </span>
      </span>
    </div>
  </div>

  {/* FOOTER */}
  <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between">
    <div>
      <span className="block text-xs text-gray-500 uppercase mb-1">
        Daily rate
      </span>
      <span className="text-2xl font-semibold text-gray-900">
        {car.pricePerDay} som
      </span>
    </div>

    <Button
      onClick={() => setModalOpen(true)}
      className="px-6 py-2.5 text-sm font-medium"
    >
      Book
    </Button>
  </div>
</div>

          </div>

          {/* DESCRIPTION SECTION */}
          <div className="mb-12 bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-[#0A8791] rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">Description</h2>
            </div>
            <p className="text-base text-gray-600 leading-relaxed max-w-4xl">
              {car.description}
            </p>
          </div>

          {/* GALLERY SECTION */}
          <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-8 bg-[#0A8791] rounded-full" />
              <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {car.image.map((imgObj, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-gray-100 hover:shadow-xl transition-all duration-300"
                  onClick={() => {
                    setCurrentImg(index);
                    setLightboxOpen(true);
                  }}
                >
                  <img
                    src={imgObj.img}
                    alt={`${car.title} ${index + 1}`}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-gray-800">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/80 hover:text-white text-4xl font-light transition-colors duration-200 z-10"
            onClick={() => setLightboxOpen(false)}
          >
            ×
          </button>

          <img
            src={car.image[currentImg].img}
            alt={`${car.title} ${currentImg + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {currentImg > 0 && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImg(currentImg - 1);
              }}
            >
              ‹
            </button>
          )}

          {currentImg < car.image.length - 1 && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 hover:scale-110"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImg(currentImg + 1);
              }}
            >
              ›
            </button>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
            <span className="text-white text-sm font-medium">
              {currentImg + 1} / {car.image.length}
            </span>
          </div>
        </div>
      )}

      {/* BOOKING MODAL */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
          >
            <div className="bg-[#0A8791] from-teal-500 to-blue-500 p-6">
              <h2 className="text-xl font-bold text-white text-center">
                {submitted ? "Success!" : "Book This Car"}
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              {!submitted ? (
                <form className="flex flex-col gap-5">
                  {step === 1 && (
                    <>
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Email address"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 text-gray-800"
                            required
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Phone number"
                            value={formData.num}
                            onChange={(e) =>
                              setFormData({ ...formData, num: e.target.value })
                            }
                            className="w-full border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 text-gray-800"
                            required
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                description: e.target.value,
                              })
                            }
                            className="w-full border-2 border-gray-200 p-4 rounded-xl outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all duration-200 text-gray-800"
                            required
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={() => {
                          if (!formData.email || !formData.num) {
                            alert("Please fill in all fields");
                            return;
                          }
                          handleNext();
                        }}
                        className="w-full mt-2 transform hover:scale-105 transition-transform duration-200"
                      >
                        Continue
                      </Button>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-5 rounded-2xl border border-teal-200">
                        <p className="text-gray-700 text-sm leading-relaxed text-center">
                          Please confirm your booking request. Our specialist
                          will contact you within{" "}
                          <span className="font-semibold text-teal-600">
                            15 minutes
                          </span>
                          .
                        </p>
                      </div>
                      <div className="flex gap-3 mt-2">
                        <Button
                          type="button"
                          onClick={handlePrev}
                          variant="secondary"
                          className="flex-1 transform hover:scale-105 transition-transform duration-200"
                        >
                          Back
                        </Button>
                        <Button
                          type="button"
                          onClick={() => {
                            handleSubmit({ preventDefault: () => {} } as never);
                          }}
                          className="flex-1 transform hover:scale-105 transition-transform duration-200"
                        >
                          Confirm
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white">✓</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Request Sent!
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    Our specialist will contact you within 15 minutes to confirm
                    your booking.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setModalOpen(false);
                      setStep(1);
                      setFormData({ email: "", num: "", description: "" });
                    }}
                    className="w-full transform hover:scale-105 transition-transform duration-200"
                  >
                    Close
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* REVIEWS */}
      <Review
        review={car.reviews?.length ? car.reviews : undefined}
        id={String(id)}
      />
    </>
  );
};

export default Detail;
