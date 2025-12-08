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
    // dispatch(forgotPassword(data.email));
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-60"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Восстановление пароля!
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-400">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Введите вашу почту"
              className={`w-full pl-10 px-4 py-2 border rounded focus:outline-none transition ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-primary"
              }`}
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Подтверждение */}
        <p className="text-sm text-gray-500 mb-4">
          На указанную почту придёт код со ссылкой для восстановления пароля.
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
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
}
