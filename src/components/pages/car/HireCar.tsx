/* eslint-disable @next/next/no-img-element */
"use client";
import StatusMessage from "@/components/ui/status/Status";
import { useGetCarCategoriesQuery } from "@/shared/api/carCategoryApi";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

const HireCar = () => {
  const { data: categories, isLoading, error } = useGetCarCategoriesQuery();
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/car/category/${id}`);
  };

  const cardClass =
    "w-[90%] max-w-4xl min-h-[240px] bg-[#F3F3F3] rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-10 py-6 gap-6 sm:gap-0 shadow-xl relative";

  const imgClass =
    "w-[180px] sm:w-[300px] mx-auto sm:mx-0 drop-shadow-md";

  const textClass =
    "flex flex-col gap-4 items-center sm:items-start text-center sm:text-left";

  const btnClass =
    "w-full sm:w-[200px] min-h-[44px] px-4 bg-[#0A8791] rounded-lg flex items-center justify-center gap-2 text-white text-[16px] sm:text-[18px] font-medium hover:bg-[#0c9da6] transition whitespace-nowrap";

  const badgeClass =
    "absolute top-4 right-4 w-[70px] h-[38px] bg-[#0A8791] rounded-lg flex items-center justify-center gap-2 px-2";

  if (isLoading) return <StatusMessage variant="loading" />;
  if (error )
    return (
      <StatusMessage
        variant="error"
        message={`${(error as AUTH.Error)?.data?.message}`}
      />
    );
  return (
    <section className="w-full min-h-screen py-10 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="text-[19px] font-normal ml-0 sm:ml-6 md:ml-16 lg:ml-[144px]">
          Find cheap car hire in Kyrgyzstan
        </h1>

        <div className="flex flex-col items-center gap-10 mt-10">
          {categories?.map((car) => (
            <div key={car.id} className={cardClass}>
              <img className={imgClass} src={car.images} alt={car.name} />
              <div className={textClass}>
                {car.withDriver && <span className="text-sm text-gray-500">With driver</span>}
                <h1 className="text-[28px] font-semibold">{car.name}</h1>
                <button onClick={() => handleClick(car.id)} className={btnClass}>
                  see options
                  <HiArrowLongRight className="text-[22px] shrink-0" />
                </button>
              </div>
              <div className={badgeClass}>
                <FaUser className="text-white" />
                <span className="text-white text-[13px] font-semibold">
                  {car.seats}+
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HireCar;
