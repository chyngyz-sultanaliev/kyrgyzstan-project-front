/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Newspaper, Upload, X } from "lucide-react";
import { useCreateNewsMutation } from "@/shared/api/newsApi";
import toast from "react-hot-toast";

interface NewsForm {
  title: string;
  content: string;
  image: string;
}

const CreateNews = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewsForm>({
    defaultValues: {
      title: "",
      content: "",
      image: "",
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);

  const [createNews, { isLoading }] = useCreateNewsMutation();

  /* ---------- Image upload ---------- */
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    if (file.size / 1024 / 1024 > 5) {
      alert("Файл слишком большой (максимум 5MB)");
      return;
    }
    setImageName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setValue("image", result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageName(null);
    setValue("image", "", { shouldValidate: true });
  };

  /* ---------- Submit ---------- */
  const onSubmit = async (data: NewsForm) => {
    if (!data.image) {
      alert("Добавьте изображение");
      return;
    }
    try {
      await createNews(data).unwrap();
      toast.success("Новость успешно создана!");
      reset();
      removeImage();
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-semibold m-4 text-gray-800 flex items-center gap-2">
        <Newspaper size={26} className="text-[#0A8791]" />
        Добавить новость
      </h1>

      <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl h-[80vh] overflow-y-auto hide-scrollbar">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-6"
        >
          {/* Title */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Заголовок *
            </label>
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              {...register("title", { required: "Заголовок обязателен" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="flex items-center gap-6">
            <div
              className={`flex-1 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              onClick={() =>
                document.getElementById("news-image-upload")?.click()
              }
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (!file) return;

                if (file.size / 1024 / 1024 > 5) {
                  // лимит 5MB
                  alert("Файл слишком большой (максимум 5MB)");
                  return;
                }

                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  setImagePreview(result);
                  setImageName(file.name);
                  setValue("image", result, { shouldValidate: true });
                };
                reader.readAsDataURL(file);
              }}
            >
              <input
                id="news-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-10 h-10 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Загрузить изображение
                </span>
                <span className="text-xs text-gray-400">До 5MB</span>
              </div>
            </div>

            {imagePreview && (
              <div className="relative w-32 h-32">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
                  {imageName}
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block mb-1 font-medium text-gray-400">
              Контент *
            </label>
            <textarea
              rows={6}
              className={`w-full px-4 py-2 border rounded resize-none ${
                errors.content ? "border-red-500" : "border-gray-300"
              }`}
              {...register("content", {
                required: "Контент обязателен",
              })}
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#0A8791] text-white px-7 py-2.5 rounded-lg hover:bg-[#086d72]"
            >
              {isLoading ? "Создание..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateNews;
