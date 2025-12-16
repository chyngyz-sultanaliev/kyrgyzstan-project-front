"use client";
import { useState, useRef, useEffect } from "react";
import { useGetCarsCategoryQuery } from "@/shared/api/carApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetCarCategoryByIdQuery } from "@/shared/api/carCategoryApi";

const Category = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "passenger";

  // API (still called but not used)
  const { isLoading } = useGetCarsCategoryQuery(type);

  // --- SEATS CONTROL ---
  const seatOptions = ["1-3", "4-6", "6+"] as const;
  type SeatRange = (typeof seatOptions)[number];

  const [seatRange, setSeatRange] = useState<SeatRange>("1-3");
  const lineRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  const getCirclePosition = (seat: SeatRange) => {
    switch (seat) {
      case "1-3":
        return 0;
      case "4-6":
        return 50;
      case "6+":
        return 100;
      default:
        return 0;
    }
  };

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !lineRef.current) return;

    const rect = lineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;

    if (percent < 33) setSeatRange("1-3");
    else if (percent < 66) setSeatRange("4-6");
    else setSeatRange("6+");
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  if (isLoading) return <p>Loading...</p>;

  // --- FAKE CARS DATA ---
  const fakeCars = [
    {
      id: 1,
      title: "Toyota Camry (2021)",
      description: "A comfortable and reliable sedan.",
      price: 5500,
      image: "/car.png",
    },
    {
      id: 2,
      title: "Toyota Camry (2021)",
      description: "A comfortable and reliable sedan.",
      price: 5500,
      image: "/car.png",
    },
    {
      id: 3,
      title: "Toyota Camry (2021)",
      description: "A comfortable and reliable sedan.",
      price: 5500,
      image: "/car.png",
    },
  ];

  const router = useRouter();
  return (
    <section className="pt-30 pb-30 relative flex gap-40">
      {/* LEFT FILTER BLOCK */}
      <div className="mt-[-125px] w-[446px] h-[360px] rounded-r-lg bg-[#00000040] shadow-[0_10px_25px_rgba(0,0,0,0.6)] p-6 flex flex-col items-center gap-7 backdrop-blur-md">
        <h2 className="text-[26px]">Car hire Kyrgyzstan</h2>
        <h1 className="text-[24px] font-[700]">Seats</h1>

        <div className="flex gap-5">
          {seatOptions.map((seat) => (
            <h3
              key={seat}
              onClick={() => setSeatRange(seat)}
              className={`text-[18px] font-[400] w-[40px] h-[30px] rounded-lg flex justify-center items-center border-2 cursor-pointer transition-all
                ${
                  seatRange === seat
                    ? "bg-black text-white border-black"
                    : "border-[#787878] text-black"
                }`}
            >
              {seat}
            </h3>
          ))}
        </div>

        {/* SLIDER */}
        <div className="w-full mt-4">
          <div
            ref={lineRef}
            className="relative w-full h-[4px] bg-[#D9D9D9] rounded-full"
          >
            <div
              className="absolute w-5 h-5 bg-black rounded-full top-[-6px] cursor-pointer transition-all"
              style={{ left: `calc(${getCirclePosition(seatRange)}% - 10px)` }}
              onMouseDown={handleMouseDown}
            ></div>
          </div>

          {/* PRICE LABELS */}
          <div className="flex justify-between text-[14px] mt-8 w-full ">
            <span>Lowest</span>
            <span>Highest</span>
          </div>
          <div className="flex justify-between text-[14px] w-full">
            <span>0 som</span>
            <span>50,000 som</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE BLOCKS */}
      <div className="container mt-10 w-full">
        <h1 className="text-[30px] mt-[-100px] capitalize">{type} car</h1>

        <div className="flex flex-col gap-6 mt-10 h-[550px] overflow-y-auto pr-2 hide-scrollbar">
          {fakeCars.map((car) => (
            <div
              key={car.id}
              className="w-[85%] min-h-[220px] bg-[#D9D9D9] shadow-md rounded-xl flex p-6 gap-6 items-center "
            >
              <div className="w-1/3 flex justify-center">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-[260px] object-contain"
                />
              </div>

              <div className="w-1/3 flex flex-col gap-2">
                <h1 className="text-[22px] font-[600]">{car.title}</h1>
                <p className="text-[14px] text-gray-600 leading-5 max-w-[320px]">
                  {car.description}
                </p>
              </div>

              <div className="w-1/3 flex flex-col justify-center items-end gap-4 pr-4">
                <p className="text-[20px] font-[600]">Price: {car.price} som</p>
                <button
                  onClick={() => router.push(`/car/category/${car.id}`)}
                  className="mt-3 bg-teal-600 text-white px-4 py-2 rounded-lg"
                >
                  More details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
