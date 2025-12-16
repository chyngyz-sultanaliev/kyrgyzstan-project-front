"use client";
import Detail from "@/components/pages/car/Detail";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  
  // 🔥 Фейк данный (категориялар)
  const fakeCategories: any = {
    "1": {
      id: 1,
      name: "Toyota Rav4",
      images:
        "https://upload.wikimedia.org/wikipedia/commons/2/27/2019_Toyota_RAV4_Icon_TSS_2.0_Front.jpg",
      seats: 4,
      withDriver: false,
    },
    "2": {
      id: 2,
      name: "Honda Fit",
      images:
        "https://upload.wikimedia.org/wikipedia/commons/0/03/2015_Honda_Fit_EX_in_Milano_Red%2C_Front_Right%2C_07-07-2021.jpg",
      seats: 4,
      withDriver: true,
    },
    "3": {
      id: 3,
      name: "BMW X5",
      images:
        "https://upload.wikimedia.org/wikipedia/commons/e/e4/2019_BMW_X5_xDrive30d_M_Sport_Automatic_3.0.jpg",
      seats: 5,
      withDriver: false,
    },
  };

  const data = fakeCategories[id as string];
  if (!data) return <p>Category not found</p>;
  
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">{data.name}</h1>

      <img
        src={data.images}
        alt={data.name}
        className="w-full max-w-lg rounded-xl shadow-xl mb-6"
      />
      <p>Seats: {data.seats}</p>
      <p>With driver: {data.withDriver ? "Yes" : "No"}</p>
    </div>
  );
};

export default page;
