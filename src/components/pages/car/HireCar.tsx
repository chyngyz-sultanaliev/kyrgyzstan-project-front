"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { FaUser } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";

const HireCar = () => {
  const router = useRouter();
  return (
    <section className="h-full relative py-10 w-full min-h-screen bg-gray-100">
      <div className="container mx-auto ">
        <h1 className="font-[400] text-[19px]">
          Find cheap car hire in Kyrgyzstan
        </h1>
        <div className="blocks flex flex-col items-center column-center gap-10 mt-10">
          {/* {Passanger car} */}
          <div
            className="block w-[90%] max-w-4xl min-h-[240px] bg-[#F3F3F3] 
                  rounded-3xl flex items-center justify-between 
                  px-10 py-6 shadow-xl relative hover:shadow-2xl 
                  transition-shadow duration-300"
          >
            {/* Image */}
            <img
              className="w-[300px] drop-shadow-md"
              src="/images/Toyota-Camry-PNG-image (1).png"
              alt=""
            />

            {/* Text & Button */}
            <div className="blockText flex flex-col gap-6">
              <h1 className="text-[28px] font-semibold text-[#333]">
                Passenger car
              </h1>

              <button
                onClick={() => router.push("/car/category")}
                className="w-[200px] h-[40px] bg-[#0A8791] rounded-lg 
                   flex items-center justify-center gap-2 
                   text-white text-[18px] font-medium
                   hover:bg-[#0c9da6] transition"
              >
                see options <HiArrowLongRight className="text-[23px]" />
              </button>
            </div>

            {/* Badge number */}
            <div
              className="place w-[70px] h-[38px] bg-[#0A8791] rounded-lg 
             flex items-center justify-center 
             absolute top-4 right-4 gap-2 px-2"
            >
              <FaUser className="text-white text-[16px]" />
              <span className="text-white font-semibold text-[13px]">4</span>
            </div>
          </div>
          {/* {Off-Road car} */}
          <div
            className="block w-[90%] max-w-4xl min-h-[240px] bg-[#F3F3F3] 
                  rounded-3xl flex items-center justify-between 
                  px-10 py-6 shadow-xl relative hover:shadow-2xl 
                  transition-shadow duration-300"
          >
            {/* Image */}
            <img
              className="w-[300px] drop-shadow-md"
              src="/images/Toyota-Land-Cruiser-Prado-No-Background.png"
              alt=""
            />

            {/* Text & Button */}
            <div className="blockText flex flex-col gap-6">
              <h1 className="text-[28px] font-semibold text-[#333]">
                Off-Road car
              </h1>

              <button
                className="w-[200px] h-[40px] bg-[#0A8791] rounded-lg 
                   flex items-center justify-center gap-2 
                   text-white text-[18px] font-medium
                   hover:bg-[#0c9da6] transition"
              >
                see options <HiArrowLongRight className="text-[23px]" />
              </button>
            </div>

            {/* Badge number */}
            <div
              className="place w-[70px] h-[38px] bg-[#0A8791] rounded-lg 
             flex items-center justify-center 
             absolute top-4 right-4 gap-2 px-2"
            >
              <FaUser className="text-white text-[16px]" />
              <span className="text-white font-semibold text-[13px]">7</span>
            </div>
          </div>
          {/* {Minibus car} */}
          <div
            className="block w-[90%] max-w-4xl min-h-[240px] bg-[#F3F3F3] 
                  rounded-3xl flex items-center justify-between 
                  px-10 py-6 shadow-xl relative hover:shadow-2xl 
                  transition-shadow duration-300"
          >
            {/* Image */}
            <img
              className="w-[300px] drop-shadow-md"
              src="/images/sprinter-car.png"
              alt=""
            />

            {/* Text & Button */}
            <div className="blockText flex flex-col gap-6">
              <h2 className="font-[400] text-[#4A4A4A]">With driver</h2>
              <h1 className="text-[28px] font-semibold text-[#333]">
                Minibus car
              </h1>
              <button
                className="w-[200px] h-[40px] bg-[#0A8791] rounded-lg 
                   flex items-center justify-center gap-2 
                   text-white text-[18px] font-medium
                   hover:bg-[#0c9da6] transition"
              >
                see options <HiArrowLongRight className="text-[23px]" />
              </button>
            </div>

            {/* Badge number */}
            <div
              className="place w-[70px] h-[38px] bg-[#0A8791] rounded-lg 
             flex items-center justify-center 
             absolute top-4 right-4 gap-2 px-2"
            >
              <FaUser className="text-white text-[16px]" />
              <span className="text-white font-semibold text-[13px]">16</span>
            </div>
          </div>
          {/* {Bus car} */}
          <div
            className="block w-[90%] max-w-4xl min-h-[240px] bg-[#F3F3F3] 
                  rounded-3xl flex items-center justify-between 
                  px-10 py-6 shadow-xl relative hover:shadow-2xl 
                  transition-shadow duration-300"
          >
            {/* Image */}
            <img
              className="w-[300px] drop-shadow-md"
              src="/images/Bus-car.webp"
              alt=""
            />

            {/* Text & Button */}
            <div className="blockText flex flex-col gap-6">
              <h1 className="text-[28px] font-semibold text-[#333]">Bus car</h1>

              <button
                className="w-[200px] h-[40px] bg-[#0A8791] rounded-lg 
                   flex items-center justify-center gap-2 
                   text-white text-[18px] font-medium
                   hover:bg-[#0c9da6] transition"
              >
                see options <HiArrowLongRight className="text-[23px]" />
              </button>
            </div>

            {/* Badge number */}
            <div
              className="place w-[70px] h-[38px] bg-[#0A8791] rounded-lg 
             flex items-center justify-center 
             absolute top-4 right-4 gap-2 px-2"
            >
              <FaUser className="text-white text-[16px]" />
              <span className="text-white font-semibold text-[13px]">40+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HireCar; 
