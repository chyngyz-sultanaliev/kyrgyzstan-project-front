"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, Mail, LockKeyhole } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: LoginFormValues) => {
    console.log("Логин:", data);
    // redux dispatch(login(data))
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-40 sm:mt-24 md:mt-32 px-4 sm:px-0"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
          Войти в систему
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="Введите свою почту"
              type="email"
              className={`w-full pl-10 px-4 py-3 sm:py-3 border rounded focus:outline-none transition
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
        <div className="mb-4 relative">
          <label className="block mb-1 font-medium text-gray-500 text-sm sm:text-base">
            Пароль
          </label>
          <div className="relative">
            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              placeholder="Введите свой пароль"
              type={showPassword ? "text" : "password"}
              className={`w-full pl-10 px-4 py-3 sm:py-3 border rounded focus:outline-none transition
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
        </div>

        <Button
          type="submit"
          variant="primary"
          disabled={!isValid}
          className="w-full"
        >
          Войти
        </Button>

        <div className="flex flex-row justify-between gap-2 mt-4 text-sm text-[#0A8791]">
          <Link
            href="/reset"
            className="hover:underline text-center sm:text-left"
          >
            Забыли пароль!
          </Link>
          <Link
            href="/register"
            className="hover:underline text-center sm:text-right"
          >
            Зарегистрироваться!
          </Link>
        </div>
      </form>
    </div>
  );
}
