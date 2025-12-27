/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";

import {
  useGetTourCategoriesQuery,
  useGetTourCategoryByIdQuery,
  useCreateTourCategoryMutation,
  useUpdateTourCategoryMutation,
  useDeleteTourCategoryMutation,
} from "@/shared/api/tourCategoryApi";

interface TourCategoryFormData {
  name: string;
  image: string;
}

const TourCategoryAdmin = () => {
  const { data: categories, isLoading, error } = useGetTourCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] =
    useCreateTourCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateTourCategoryMutation();
  const [deleteCategory] = useDeleteTourCategoryMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: editingCategory } = useGetTourCategoryByIdQuery(editingId!, {
    skip: !editingId,
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TourCategoryFormData>({
    defaultValues: { name: "", image: "" },
  });

  useEffect(() => {
    if (editingCategory) {
      setValue("name", editingCategory.name);
      setValue("image", editingCategory.image || "");
      setImagePreview(editingCategory.image || null);
    }
  }, [editingCategory, setValue]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    if (file.size / 1024 / 1024 > 5)
      return toast.error("Файл слишком большой (максимум 5MB)");

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
    setValue("image", "", { shouldValidate: true });
  };

  const onSubmit = async (data: TourCategoryFormData) => {
    try {
      if (!data.name) return toast.error("Заполните обязательные поля");
      if (!data.image) return toast.error("Добавьте изображение");

      if (editingId) {
        await updateCategory({ id: editingId, data }).unwrap();
        toast.success("Категория успешно обновлена");
      } else {
        await createCategory(data).unwrap();
        toast.success("Категория успешно создана");
      }

      reset();
      removeImage();
      setEditingId(null);
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setLoadingId(id);
      await deleteCategory(id).unwrap();
      toast.success("Категория удалена");
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message}`);
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <StatusMessage variant="loading" />;
  if (error)
    return (
      <StatusMessage variant="error" message="Ошибка при загрузке категорий" />
    );

  return (
    <div className="bg-gray-50 py-4 sm:py-8 h-[87vh] overflow-y-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-600">
          Управление категориями туров
        </h1>

        {/* Форма создания / редактирования */}
        <div className="bg-white rounded-xl shadow-lg mb-6 sm:mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-[#0A8791] to-[#0d9fa9] p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {editingId
                ? "✏️ Редактировать категорию"
                : "➕ Создать категорию"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название категории *
                </label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    Это поле обязательно
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all hover:border-[#0A8791] hover:bg-gray-50 ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                  onClick={() =>
                    document
                      .getElementById("tour-category-image-upload")
                      ?.click()
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (!file) return;
                    if (file.size / 1024 / 1024 > 5)
                      return toast.error("Файл слишком большой (максимум 5MB)");

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const result = reader.result as string;
                      setImagePreview(result);
                      setValue("image", result, { shouldValidate: true });
                    };
                    reader.readAsDataURL(file);
                  }}
                >
                  <input
                    type="file"
                    id="tour-category-image-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <Upload className="w-8 h-8 mx-auto mb-3 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-1">
                    Нажмите или перетащите изображение
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG до 5MB</p>
                </div>
                {imagePreview && (
                  <div className="relative inline-block mt-3">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full sm:w-64 h-48 object-cover rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
              <button
                type="submit"
                disabled={isCreating || isUpdating}
                className="flex-1 bg-[#0A8791] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#086d72] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {editingId
                  ? isUpdating
                    ? "⏳ Обновление..."
                    : "✓ Обновить категорию"
                  : isCreating
                  ? "⏳ Создание..."
                  : "✓ Создать категорию"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    reset();
                    removeImage();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Список категорий */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
            Существующие категории ({categories?.length || 0})
          </h2>

          {!categories?.length ? (
            <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center text-gray-400">
              Пока нет категорий
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {cat.image && (
                    <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">
                      {cat.name}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(cat.id)}
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="delete"
                        disabled={loadingId === cat.id}
                        onClick={() => handleDelete(cat.id)}
                      >
                        {loadingId === cat.id ? "Удаление..." : "Удалить"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TourCategoryAdmin;
