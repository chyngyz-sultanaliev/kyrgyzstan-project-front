"use client";

import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

interface ForgotPasswordValues {
  email: string;
}

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordValues>({ mode: "onChange" });

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Восстановление пароля:", data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-40 sm:mt-50 md:mt-64 px-4 sm:px-0"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          Восстановление пароля
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Введите вашу почту"
              className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
              {...register("email", {
                required: "Email обязателен",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Некорректный email",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Подсказка */}
        <p className="text-xs sm:text-sm text-gray-500 mb-6 text-center">
          На указанную почту придёт ссылка для восстановления пароля.
        </p>

        {/* Кнопка */}
        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          className="w-full"
        >
          Отправить
        </Button>

        <div className="flex justify-center mt-4 text-sm text-[#0A8791]">
          <Link href="/login" className="hover:underline">
            Войти!
          </Link>
        </div>
      </form>
    </div>
  );
}
