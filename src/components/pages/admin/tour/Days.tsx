"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button/Button";
import StatusMessage from "@/components/ui/status/Status";
import {
  useGetTourDaysQuery,
  useCreateTourDayMutation,
  useUpdateTourDayMutation,
  useDeleteTourDayMutation,
} from "@/shared/api/tourDayApi";
import { TourDay, useGetToursQuery } from "@/shared/api/tourApi";
import { Calendar } from "lucide-react";

interface TourDayFormData {
  dayNumber: number;
  description: string;
  tourId: string;
}

const TourDayAdmin = () => {
  const { data: tourDaysResponse, isLoading, error } = useGetTourDaysQuery();
  const tourDays: TourDay[] = tourDaysResponse?.data || [];
  const [createDay, { isLoading: isCreating }] = useCreateTourDayMutation();
  const [updateDay, { isLoading: isUpdating }] = useUpdateTourDayMutation();
  const [deleteDay] = useDeleteTourDayMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const { data: tours = [] } = useGetToursQuery();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TourDayFormData>({
    defaultValues: { dayNumber: 1, description: "", tourId: "" },
  });

  const editingDay = editingId
    ? tourDays.find((day: TourDay) => day.id === editingId)
    : null;

  useEffect(() => {
    if (editingDay) {
      setValue("dayNumber", editingDay.dayNumber);
      setValue("description", editingDay.description);
      setValue("tourId", editingDay.tourId);
    }
  }, [editingDay, setValue]);

  const onSubmit = async (data: TourDayFormData) => {
    try {
      const payload = { ...data, dayNumber: Number(data.dayNumber) };

      if (editingId) {
        await updateDay({ id: editingId, data: payload }).unwrap();
        toast.success("День тура успешно обновлен");
      } else {
        await createDay(payload).unwrap();
        toast.success("День тура успешно создан");
      }

      reset();
      setEditingId(null);
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message || "Ошибка"}`);
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
      await deleteDay(id).unwrap();
      toast.success("День тура удален");
    } catch (error) {
      const err = error as AUTH.Error;
      console.error(error);
      toast.error(`${err.data?.message || "Ошибка"}`);
    } finally {
      setLoadingId(null);
    }
  };

  if (isLoading) return <StatusMessage variant="loading" />;
  if (error)
    return (
      <StatusMessage variant="error" message="Ошибка при загрузке дней тура" />
    );

  return (
    <div className="bg-gray-50 py-4 sm:py-8 h-[87vh] overflow-y-auto hide-scrollbar">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-600">
          Управление днями тура
        </h1>

        {/* Форма создания / редактирования */}
        <div className="bg-white rounded-xl shadow-lg mb-6 sm:mb-8 h-[80vh] overflow-y-auto hide-scrollbar">
          <div className="bg-gradient-to-r from-[#0A8791] to-[#0d9fa9] p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              {editingId ? "✏️ Редактировать день" : "➕ Создать день тура"}
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер дня *
                </label>
                <input
                  type="number"
                  min={1}
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
                    errors.dayNumber ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("dayNumber", { required: true, min: 1 })}
                />
                {errors.dayNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    Это поле обязательно
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Описание *
                </label>
                <textarea
                  className={`w-full px-4 py-3 border-2 rounded-lg transition-all ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    Это поле обязательно
                  </p>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-400">
                  Tour *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    className={`w-full pl-10 px-4 py-2 border-2 rounded focus:outline-none transition ${
                      errors.tourId ? "border-red-500" : "border-gray-300"
                    }`}
                    {...register("tourId", { required: "Выберите tour" })}
                  >
                    <option value="">Выберите tour</option>
                    {tours?.map((el) => (
                      <option key={el.id} value={el.id}>
                        {el.title}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.tourId && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tourId.message}
                  </p>
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
                    : "✓ Обновить день"
                  : isCreating
                  ? "⏳ Создание..."
                  : "✓ Создать день"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    reset();
                  }}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Отмена
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Список дней тура */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
            Существующие дни ({tourDays.length})
          </h2>

          {!tourDays.length ? (
            <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center text-gray-400">
              Пока нет дней тура
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tourDays.map((day: TourDay) => (
                <div
                  key={day.id}
                  className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-4"
                >
                  <h3 className="font-bold text-lg mb-2 text-gray-900">
                    День {day.dayNumber}
                  </h3>
                  <p className="text-gray-700 mb-2">{day.description}</p>
                  <p className="text-gray-400 mb-3 text-sm">
                    Tour:{" "}
                    {tours.find((t) => t.id === day.tourId)?.title ||
                      day.tourId}
                  </p>

                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleEdit(day.id)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="delete"
                      disabled={loadingId === day.id}
                      onClick={() => handleDelete(day.id)}
                    >
                      {loadingId === day.id ? "Удаление..." : "Удалить"}
                    </Button>
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

export default TourDayAdmin;
