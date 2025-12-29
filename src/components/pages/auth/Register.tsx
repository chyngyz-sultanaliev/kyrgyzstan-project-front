"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, User, Mail, LockKeyhole } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRegisterUserMutation } from "@/redux/api/auth";
import Cookies from "js-cookie";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const [registers, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormValues>({ mode: "onChange" });
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registers(data).unwrap();
      // localStorage.setItem("token", response.token);
      Cookies.set("token", response.token);
      router.push("/");
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      if (err.data?.message) {
        setServerError(err.data.message);
      } else {
        setServerError("Произошла ошибка. Попробуйте ещё раз.");
      }
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-30 sm:mt-24 md:mt-32 px-4 sm:px-0"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
          Регистрация
        </h2>

        {/* ФИО */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
            Ф.И.О
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Введите ФИО"
              className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                ${errors.username ? "border-red-500" : "border-gray-300"}`}
              {...register("username", {
                required: "Ф.И.О обязательно",
                minLength: {
                  value: 3,
                  message: "Минимум 3 символа",
                },
              })}
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Введите свою почту"
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

        {/* Пароль */}
        <div className="mb-6 relative">
          <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
            Пароль
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Придумайте пароль"
              className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
              {...register("password", {
                required: "Пароль обязателен",
                minLength: {
                  value: 6,
                  message: "Минимум 6 символов",
                },
              })}
            />
          </div>

          <button
            type="button"
            className="absolute top-9 right-3 text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          {errors.password && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {serverError && (
            <p className="text-red-500 text-xs text-center  sm:text-sm mt-1">
              {serverError}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={!isValid || isLoading}
          className="w-full"
        >
          Зарегистрироваться!
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
