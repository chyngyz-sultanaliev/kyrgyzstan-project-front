"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import ReviewForm from "./Review";
import { useGetTourByIdQuery } from "@/shared/api/tourApi";
import { SlArrowDown } from "react-icons/sl";

import {
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/shared/api/favoriteApi";

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
  name: string;
  phone: string;
  description: string;
};

const Detail = ({ tourDays }: Props) => {
  const { id } = useParams();
  const tourId = typeof id === "string" ? id : "";
  const { data: tour, isLoading } = useGetTourByIdQuery(String(tourId));

  const { data: favorites } = useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  // const [chair, setChair] = useState(false);
  const [modal, setModal] = useState<ModalItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [open, setOpen] = useState(false);

  console.log(tour);

  if (!tourId) return <p>No ID</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!tour) return <p>Not found</p>;

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite && favorite?.id) {
        await removeFavorite(favorite.id);
      } else if (tour?.id) {
        await addFavorite({ itemType: "TOUR", tourId: tour.id });
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении/удалении из избранного");
    }
  };

  return (
    <>
      <section className="container px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="">
            <img
              src={tour.image}
              alt="tour"
              className="w-full h-[460px] md:w-[420px] md:h-[300px] lg:w-[900px] lg:h-[370px] object-cover rounded-2xl mt-5 md:mt-0"
            />
            <div className="absolute top-4 right-4 w-10 h-10 flex justify-center items-center rounded-full bg-white shadow-lg"></div>
          </div>

          <div className="flex flex-col p-6 rounded-2xl w-full md:w-[420px] shadow-[0_10px_30px_rgba(0,0,0,0.25)] h-77  text-gray-500">
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
                  { id: Date.now(), name: "", phone: "", description: "" },
                ])
              }
              className="mt-5 w-full h-10 bg-[#5B9096] text-white rounded-lg"
            >
              Submit a request for this selection{" "}
            </button>
          </div>
        </div>

        <div>
          {/* Modal формасы */}
          {modal.length > 0 &&
            !submitted &&
            modal.map((el) => (
              <div
                key={el.id}
                className="fixed inset-0 bg-black/43 backdrop-blur-sm flex items-center justify-center z-60"
              >
                <div className="bg-white w-[440px] p-6 rounded-2xl flex flex-col gap-5">
                  <h2 className="text-lg font-semibold text-center">
                    Submit a request for selection and reduce your search time
                  </h2>

                  <input
                    type="text"
                    placeholder="Name..."
                    value={el.name}
                    onChange={(e) =>
                      setModal((prev) =>
                        prev.map((item) =>
                          item.id === el.id
                            ? { ...item, name: e.target.value }
                            : item
                        )
                      )
                    }
                    className="border p-2 rounded-lg"
                  />

                  <input
                    type="text"
                    placeholder="Number..."
                    value={el.phone}
                    onChange={(e) =>
                      setModal((prev) =>
                        prev.map((item) =>
                          item.id === el.id
                            ? { ...item, phone: e.target.value }
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
                    onClick={() => {
                      console.log(el); // backendке жибересиң
                      setModal([]); // форма жабылат
                      setSubmitted(true); // заявка отправлена
                    }}
                    className="bg-[#5B9096] text-white h-10 rounded-lg"
                  >
                    Submit a request
                  </button>
                </div>
              </div>
            ))}

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
                <button
                  className="bg-[#5B9096] text-white h-10 rounded-lg mt-4"
                  onClick={() => setSubmitted(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <h1 className="text-2xl mb-2">Description</h1>

          <p>{tour.description}</p>

          <div className="w-110 h-auto bg-[#D9D9D9] flex flex-col">
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              <h4>Day 1</h4>
              <h4>
                <SlArrowDown
                  className={`transition-transform ${open ? "rotate-180" : ""}`}
                />
              </h4>
            </div>

            {open && (
              <div className="flex flex-col gap-2 p-3">
                {tourDays && tourDays.length > 0 ? (
                  tourDays.map((day) => (
                    <div
                      key={day.id}
                      className="bg-[#e5e5e5] min-h-[70px] px-6 py-4 rounded-lg"
                    >
                      <h4 className="text-xl font-semibold mb-1">
                        Day {day.dayNumber}
                      </h4>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    Route information not available
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <ReviewForm
        review={
          tour.reviews && tour.reviews.length > 0 ? tour.reviews : undefined
        }
        id={tourId}
      />
    </>
  );
};

export default Detail;
