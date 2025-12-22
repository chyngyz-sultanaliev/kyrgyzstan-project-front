/* eslint-disable react-hooks/incompatible-library */
"use client";
import { useForm } from "react-hook-form";
import { Mail, Lock, KeyRound } from "lucide-react";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import { useState } from "react";
import {
  useRequestResetMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
} from "@/redux/api/auth";

type ResetStep = "email" | "code" | "password";

interface EmailFormValues {
  email: string;
}

interface CodeFormValues {
  code: string;
}

interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

export default function Reset() {
  const [step, setStep] = useState<ResetStep>("email");
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const [requestReset, { isLoading: isRequestLoading }] =
    useRequestResetMutation();
  const [verifyCode, { isLoading: isVerifyLoading }] =
    useVerifyCodeMutation();
  const [resetPassword, { isLoading: isResetLoading }] =
    useResetPasswordMutation();

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<EmailFormValues>({ mode: "onChange" });

  const {
    register: registerCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: codeErrors, isValid: isCodeValid },
  } = useForm<CodeFormValues>({ mode: "onChange" });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
    watch,
  } = useForm<PasswordFormValues>({ mode: "onChange" });

  const onSubmitEmail = async (data: EmailFormValues) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await requestReset({ email: data.email }).unwrap();

      setEmail(data.email);
      setSuccessMessage(
        response.message || "Код подтверждения отправлен на вашу почту"
      );
      setStep("code");
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      setErrorMessage(
        err.data?.message || "Произошла ошибка. Попробуйте снова."
      );
    }
  };

  const onSubmitCode = async (data: CodeFormValues) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await verifyCode({
        email,
        token: data.code,
      }).unwrap();

      setToken(data.code);
      setSuccessMessage(response.message || "Код подтвержден");
      setStep("password");
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      setErrorMessage(
        err.data?.message || "Неверный код. Попробуйте снова."
      );
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    try {
      setErrorMessage("");
      setSuccessMessage("");

      const response = await resetPassword({
        email,
        token,
        newPassword: data.newPassword,
      }).unwrap();

      setSuccessMessage(
        response.message || "Пароль успешно изменен! Перенаправление..."
      );

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      setErrorMessage(
        err.data?.message || "Произошла ошибка. Попробуйте снова."
      );
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-40 sm:mt-50 md:mt-64 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
          Восстановление пароля
        </h2>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Email */}
        {step === "email" && (
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
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
                    ${emailErrors.email ? "border-red-500" : "border-gray-300"}`}
                  {...registerEmail("email", {
                    required: "Email обязателен",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Некорректный email",
                    },
                  })}
                  disabled={isRequestLoading}
                />
              </div>
              {emailErrors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {emailErrors.email.message}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mb-6 text-center">
              На указанную почту придёт код для восстановления пароля.
            </p>

            <Button
              type="submit"
              variant="primary"
              disabled={!isEmailValid || isRequestLoading}
              className="w-full"
            >
              {isRequestLoading ? "Отправка..." : "Отправить"}
            </Button>
          </form>
        )}

        {/* Step 2: Verify Code */}
        {step === "code" && (
          <form onSubmit={handleSubmitCode(onSubmitCode)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
                Код подтверждения
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Введите код из письма"
                  className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                    ${codeErrors.code ? "border-red-500" : "border-gray-300"}`}
                  {...registerCode("code", {
                    required: "Код обязателен",
                    minLength: {
                      value: 4,
                      message: "Код должен содержать минимум 4 символа",
                    },
                  })}
                  disabled={isVerifyLoading}
                />
              </div>
              {codeErrors.code && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {codeErrors.code.message}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mb-6 text-center">
              Код отправлен на {email}
            </p>

            <Button
              type="submit"
              variant="primary"
              disabled={!isCodeValid || isVerifyLoading}
              className="w-full"
            >
              {isVerifyLoading ? "Проверка..." : "Подтвердить"}
            </Button>

            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full mt-3 text-sm text-gray-600 hover:text-gray-800"
            >
              Назад
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === "password" && (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
                Новый пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Введите новый пароль"
                  className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                    ${passwordErrors.newPassword ? "border-red-500" : "border-gray-300"}`}
                  {...registerPassword("newPassword", {
                    required: "Пароль обязателен",
                    minLength: {
                      value: 6,
                      message: "Пароль должен содержать минимум 6 символов",
                    },
                  })}
                  disabled={isResetLoading}
                />
              </div>
              {passwordErrors.newPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {passwordErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-400 text-sm sm:text-base">
                Подтвердите пароль
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  className={`w-full pl-10 px-4 py-3 border rounded focus:outline-none transition
                    ${passwordErrors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                  {...registerPassword("confirmPassword", {
                    required: "Подтверждение пароля обязательно",
                    validate: (value) =>
                      value === watch("newPassword") || "Пароли не совпадают",
                  })}
                  disabled={isResetLoading}
                />
              </div>
              {passwordErrors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {passwordErrors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={!isPasswordValid || isResetLoading}
              className="w-full"
            >
              {isResetLoading ? "Сохранение..." : "Сохранить пароль"}
            </Button>
          </form>
        )}

        <div className="flex justify-center mt-4 text-sm text-[#0A8791]">
          <Link href="/login" className="hover:underline">
            Войти!
          </Link>
        </div>
      </div>
    </div>
  );
}