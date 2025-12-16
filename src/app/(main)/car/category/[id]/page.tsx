"use client";

import Detail from "@/components/pages/car/Detail";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();

  return (
    <>
      <Detail />;
    </>
  );
};

export default page;
