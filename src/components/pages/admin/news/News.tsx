"use client";
/* eslint-disable @next/next/no-img-element */
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import StatusMessage from "@/components/ui/status/Status";
import { useState } from "react";
import { useDeleteNewsMutation, useGetNewsQuery } from "@/shared/api/newsApi";
import toast from "react-hot-toast";

const AdminNews = () => {
  const { data: news = [], isLoading, error } = useGetNewsQuery();
  const [deleteNews] = useDeleteNewsMutation();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    try {
      await deleteNews(id).unwrap();
      toast.success("Новость успешно удалена!");
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
    return <StatusMessage variant="error" message="Ошибка загрузки новостей" />;

  return (
    <section className="mx-auto px-3 sm:px-5 py-4 sm:py-6 h-[87vh] overflow-y-auto hide-scrollbar">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-600">
          Управление новостями
        </h1>
        <Link href="/admin/news/create">
          <Button variant="primary">+ Добавить новость</Button>
        </Link>
      </div>

      {news.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500 mb-4">Новости не найдены</p>
          <Link href="/admin/news/create">
            <Button variant="primary">Создать первую новость</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition border border-gray-200 flex flex-col"
            >
              {/* Image */}
              <div className="h-44 bg-gray-100 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Нет изображения
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex-1">
                <h3 className="font-bold text-lg truncate">{item.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-3">
                  {item.content}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 p-4 pt-0">
                <Button
                  variant="delete"
                  disabled={loadingId === item.id}
                  onClick={() => handleDelete(item.id)}
                >
                  {loadingId === item.id ? "Удаление..." : "Удалить"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminNews;
