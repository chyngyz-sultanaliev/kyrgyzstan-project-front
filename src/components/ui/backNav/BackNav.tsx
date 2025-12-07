"use client";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function BackNav() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-[#0A8791] absolute top-12 left-12"
    >
      <BsArrowLeft size={26} />
      <span>Назад</span>
    </button>
  );
}
