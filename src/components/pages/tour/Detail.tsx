"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import ReviewForm from "./Review";
import { useGetTourByIdQuery } from "@/shared/api/tourApi";

const Detail = () => {
  const [modal, setModal] = useState(false);
  const [openDay, setOpenDay] = useState<number | null>(null);

  const [chair, setChair] = useState(false);

  const { id } = useParams();
  const tourId = typeof id === "string" ? id : "";

  const { data: tour, isLoading } = useGetTourByIdQuery(tourId);
  console.log(tour);

  if (!tourId) return <p>No ID</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!tour) return <p>Not found</p>;

  return (
    <>
      <section className="container px-6 md:px-12 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <img
            src={tour.image}
            alt="tour"
            className="w-full h-[460px] md:w-[420px] md:h-[300px] lg:w-[900px] lg:h-[370px] object-cover rounded-2xl mt-5 md:mt-0"
          />

          <div className="flex flex-col p-6 rounded-2xl w-full md:w-[420px] text-gray-500">
            <h1 className="text-xl mb-2">Location: {tour.location}</h1>
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
              onClick={() => setModal(true)}
              className="mt-5 w-full h-10 bg-[#5B9096] text-white rounded-lg"
            >
              Submit a request
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h1 className="text-2xl mb-2">Description</h1>
          <p>{tour.description}</p>
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
