"use client";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import ReviewForm from "./Review";
import { useGetTourByIdQuery } from "@/shared/api/tourApi";
import { SlArrowDown } from "react-icons/sl";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";
import axios from "axios";
import StatusMessage from "@/components/ui/status/Status";
import Button from "@/components/ui/Button/Button";

interface TourDay {
  id: string;
  dayNumber: number;
  description: string;
}

interface Props {
  tourDays?: TourDay[];
}

type ModalItem = {
  id: number;
  email: string;
  num: string;
  description: string;
};

const Detail = ({ tourDays }: Props) => {
  const { id } = useParams();
  const tourId = typeof id === "string" ? id : "";
  const { data: tour, isLoading, error } = useGetTourByIdQuery(String(tourId));

  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const [modal, setModal] = useState<ModalItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const tourDaysFromApi = tour?.tourDays;

  if (!tourId) return <p>No ID</p>;
  if (isLoading) return <StatusMessage variant="loading" />;
  if (!tour) return <p>Not found</p>;
  if (error)
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
    );

  const handleSubmit = async (e: FormEvent | any) => {
    e?.preventDefault?.();

    if (!modal[0]) return;

    const modalData = modal[0];

    try {
      const chat_id = "-1002597947748";
      const token = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN;
      const api_url = `https://api.telegram.org/bot${token}/sendMessage`;

      const textMessage = `
📧 Email: ${modalData.email}
📞 Number: ${modalData.num}
📝 Description: ${modalData.description}
`;

      await axios.post(api_url, {
        chat_id,
        parse_mode: "HTML",
        text: textMessage,
      });

      alert("Подписка оформлена!");
      setModal([]);
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Ошибка отправки. Попробуйте позже.");
    }
  };

  return (
    <>
      <section className="container px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div>
            <img
              src={tour.image}
              alt="tour"
              className="w-full h-[460px] md:w-[420px] md:h-[300px] lg:w-[900px] lg:h-[370px] object-cover rounded-2xl mt-5 md:mt-0"
            />
          </div>

          <div className="flex flex-col p-6 rounded-2xl w-full md:w-[420px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] h-77 text-gray-500">
            <h1 className="text-xl mb-2 mt-7">Location: {tour.location}</h1>
            <h2>{tour.days} days</h2>

            <div className="flex justify-between mt-4">
              <div>
                <p>Walk: {tour.walk}</p>
                <p>By car: {tour.byCar}</p>
              </div>
              <div>
                <p>Sea level: {tour.seaLevel}</p>
              </div>
            </div>

            <button
              onClick={() =>
                setModal((prev) => [
                  ...prev,
                  { id: Date.now(), email: "", num: "", description: "" },
                ])
              }
              className="mt-5 w-full h-10 bg-[#0A8791] text-white rounded-lg"
            >
              Submit a request for this selection
            </button>
          </div>
        </div>

        {/* Modal */}
        {modal.length > 0 && !submitted && (
          <div className="fixed inset-0 bg-black/43 backdrop-blur-sm flex items-center justify-center z-60">
            <div className="bg-white w-[440px] p-6 rounded-2xl flex flex-col gap-5">
              <h2 className="text-lg font-semibold text-center">
                Submit a request for selection
              </h2>

              {modal.map((el) => (
                <form
                  key={el.id}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="text"
                    placeholder="Email..."
                    value={el.email}
                    onChange={(e) =>
                      setModal((prev) =>
                        prev.map((item) =>
                          item.id === el.id
                            ? { ...item, email: e.target.value }
                            : item
                        )
                      )
                    }
                    className="border p-2 rounded-lg"
                  />

                  <input
                    type="text"
                    placeholder="Number..."
                    value={el.num}
                    onChange={(e) =>
                      setModal((prev) =>
                        prev.map((item) =>
                          item.id === el.id
                            ? { ...item, num: e.target.value }
                            : item
                        )
                      )
                    }
                    className="border p-2 rounded-lg"
                  />

                  <input
                    type="text"
                    placeholder="Description..."
                    value={el.description}
                    onChange={(e) =>
                      setModal((prev) =>
                        prev.map((item) =>
                          item.id === el.id
                            ? { ...item, description: e.target.value }
                            : item
                        )
                      )
                    }
                    className="border p-2 rounded-lg"
                  />

                  <button
                    type="submit"
                    disabled={!el.email || !el.num || !el.description}
                    className={`h-10 rounded-lg text-white
    ${
      !el.email || !el.num || !el.description
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#0A8791]"
    }`}
                  >
                    Submit
                  </button>
                </form>
              ))}
            </div>
          </div>
        )}

        {submitted && (
          <div className="fixed inset-0 bg-black/43 backdrop-blur-sm flex items-center justify-center z-60">
            <div className="bg-white w-[440px] p-6 rounded-2xl flex flex-col gap-5 text-center">
              <h2 className="text-lg font-semibold">
                Your application has been sent!
              </h2>
              <p>
                A specialist will contact you within 15 minutes to help <br />
                you choose the ideal option and provide <br />
                advice on all matters.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setModal([]);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}

        {/* Tour Description */}
        <div className="mt-12 flex flex-col gap-4">
          <h1 className="text-2xl mb-2">Description</h1>
          <p>{tour.description}</p>

          {/* Tour Days */}
          {Array.isArray(tourDaysFromApi) && tourDaysFromApi.length > 0 && (
            <div className="w-full h-auto mb:w-[210px] mb:h-[40px] sm:w-[390px] sm:h-[100px] bg-[#D9D9D9] flex flex-col gap-2 p-3">
              {tourDaysFromApi.map((day) => (
                <div
                  key={day.id}
                  className="bg-[#e5e5e5] min-h-[70px] px-6 py-4 rounded-lg"
                >
                  <h4 className="text-xl font-semibold mb-1">
                    Day {day.dayNumber}
                  </h4>
                  <p className="text-gray-700">{day.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <ReviewForm
        review={tour.reviews?.length ? tour.reviews : undefined}
        id={tourId}
      />
    </>
  );
};

export default Detail;
