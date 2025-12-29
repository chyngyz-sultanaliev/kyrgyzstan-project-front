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

  // Галерея full-screen
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
  if (error || !car )
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
    );
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* IMAGE */}
          <div className="md:w-1/2 bg-[#E5E5E5] rounded-2xl shadow flex items-center justify-center p-6">
            {car.image && car.image.length > 0 ? (
              <img
                src={car.image[0].img}
                alt={car.title}
                className="w-full max-w-[420px] object-cover rounded-xl cursor-pointer"
                onClick={() => {
                  setCurrentImg(0);
                  setLightboxOpen(true);
                }}
              />
            ) : (
              <div className="w-full max-w-[420px] aspect-[16/10] bg-gray-300 rounded-xl" />
            )}
          </div>

          {/* INFO */}
          <div className="md:w-1/2 bg-[#F1F1F1] rounded-2xl shadow p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold mb-2">
                {car.title}
              </h1>
              <p className="text-sm text-gray-600 mb-6">{car.description}</p>
              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <span>Fuel: {car.fuelType}</span>
                <span>Transmission: {car.transmission}</span>
                <span>Seats: {car.seat}</span>
                <span>Year: {car.year}</span>
                <span>Engine: {car.engine}</span>
                <span>Drive: {car.drive}</span>
                <span className="col-span-2">
                  Minimum driver age: {car.minDriverAge}
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-8">
              <span className="text-xl font-semibold">
                {car.pricePerDay} som / day
              </span>
              <Button onClick={() => setModalOpen(true)}>Book now</Button>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-14 max-w-3xl">
          <h2 className="text-lg font-semibold mb-3">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {car.description}
          </p>
        </div>

        {/* GALLERY */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {car.image.map((imgObj, index) => (
              <img
                key={index}
                src={imgObj.img}
                alt={`${car.title} ${index + 1}`}
                className="aspect-square w-full object-cover rounded-xl cursor-pointer"
                onClick={() => {
                  setCurrentImg(index);
                  setLightboxOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setLightboxOpen(false)}
        >
          <img
            src={car.image[currentImg].img}
            alt={`${car.title} ${currentImg + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
          {currentImg > 0 && (
            <button
              className="absolute left-4 text-white text-2xl font-bold"
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
              className="absolute right-4 text-white text-2xl font-bold"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImg(currentImg + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* TWO-STEP MODAL FORM */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[440px] p-6 rounded-2xl flex flex-col gap-5">
            {!submitted ? (
              <form className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-center">
                  Book this car
                </h2>

                {step === 1 && (
                  <>
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Phone number"
                      value={formData.num}
                      onChange={(e) =>
                        setFormData({ ...formData, num: e.target.value })
                      }
                      className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        // Проверка, что поля не пустые
                        if (!formData.email || !formData.num) {
                          alert("Please fill in all fields");
                          return;
                        }
                        handleNext();
                      }}
                    >
                      Next
                    </Button>
                  </>
                )}

                {step === 2 && (
                  <>
                    <p className="text-gray-700 text-sm">
                      Please confirm your request. Our specialist will contact
                      you within 15 minutes.
                    </p>
                    <div className="flex justify-between gap-4 mt-4">
                      <Button
                        type="button"
                        onClick={handlePrev}
                        variant="secondary"
                      >
                        Back
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          handleSubmit({ preventDefault: () => {} } as never);
                        }}
                      >
                        Submit
                      </Button>
                    </div>
                  </>
                )}
              </form>
            ) : (
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2">Request sent!</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Our specialist will contact you within 15 minutes.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setModalOpen(false);
                    setStep(1);
                    setFormData({ email: "", num: "", description: "" });
                  }}
                >
                  Close
                </Button>
              </div>
            )}
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
