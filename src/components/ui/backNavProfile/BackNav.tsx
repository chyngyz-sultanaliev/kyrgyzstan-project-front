"use client";
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import Button from "../Button/Button";

export default function BackNav() {
  const router = useRouter();

  return (
    <Button
      variant="secondary"
      onClick={() => router.back()}
      className="flex items-center gap-2 text-[#0A8791] absolute top-4 left-120 z-99"
    >
      <BsArrowLeft size={26} />
      <span>Назад</span>
    </Button>
  );
}
