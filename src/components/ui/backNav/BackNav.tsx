"use client";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";

export default function BackNav() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-[#0A8791] absolute sm:top-12 top-6 left-6 sm:left-12 z-99"
    >
      <BsArrowLeft size={26} />
      <span>Назад</span>
    </button>
  );
}
