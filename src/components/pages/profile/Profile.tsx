"use client";
import { useState } from "react";
import Image from "next/image";
import {
  User,
  Edit2,
  Calendar,
  Mail,
  Shield,
  X,
  Loader2,
  Upload,
} from "lucide-react";
import Button from "@/components/ui/Button/Button";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/shared/api/profileApi";

const Profile = () => {
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [activeFilter, setActiveFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[87vh]">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-[87vh]">
        <div className="text-gray-500">Профиль не найден</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const filters = ["ALL", "TOUR", "CAR", "HOTEL"];

  const openModal = () => {
    setFormData({
      username: profile.username,
      email: profile.email,
    });
    setAvatarPreview(profile.avatar);
    setAvatarFile(null);
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setAvatarPreview(null);
    setAvatarFile(null);
    setError(null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Пожалуйста, выберите изображение");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Размер файла не должен превышать 5MB");
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // If avatar changed, convert to base64
      let avatarBase64 = undefined;
      if (avatarFile) {
        avatarBase64 = avatarPreview || undefined;
      }

      await updateProfile({
        username: formData.username,
        email: formData.email,
        avatar: avatarBase64,
      }).unwrap();

      closeModal();
    } catch (error: unknown) {
      const err = error as AUTH.Error;
      console.error("Failed to update profile:", err);
      setError(err?.data?.message || "Произошла ошибка. Попробуйте ещё раз.");
    }
  };

  return (
    <div className="p-4 sm:p-6 mx-auto h-[87vh] overflow-y-auto">
      {/* Profile Card */}
      <div className="relative bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        {/* Cover Image */}
        <div className="h-32 sm:h-44 bg-gradient-to-r from-[#0A8791] to-[#0D9BA6]"></div>

        {/* Profile Info */}
        <div className="px-4 sm:px-5 pt-16 sm:pt-10 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="ml-0 sm:ml-36 md:ml-44 flex flex-col">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              {profile.username}
            </h1>
            <span className="text-gray-500 font-light text-sm sm:text-base flex items-center gap-2 mt-1">
              {profile.isAdmin ? (
                <>
                  <Shield className="w-4 h-4 text-[#0A8791]" />
                  Администратор
                </>
              ) : (
                "Пользователь"
              )}
            </span>
            <div className="flex flex-col gap-1 mt-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profile.email}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Регистрация: {formatDate(profile.createdAt)}
              </div>
            </div>
          </div>
          <Button
            variant="primary"
            onClick={openModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Редактировать
          </Button>
        </div>

        {/* Avatar */}
        <div className="absolute left-4 sm:left-5 top-20 sm:top-28 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
          {profile.avatar ? (
            <Image
              src={profile.avatar}
              alt={profile.username}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
          )}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="mt-8 sm:mt-12 md:mt-20 p-4 sm:p-5 border border-gray-300 rounded-lg space-y-4 sm:space-y-5 bg-white shadow-sm">
        <div className="bg-[#0A8791] text-white rounded-xl text-sm sm:text-md p-2 w-fit px-4 font-medium">
          Избранные ({profile.favorites.length})
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant="secondary"
              className={`px-3 sm:px-4 py-2 rounded-full border text-sm sm:text-base ${
                activeFilter === filter ? "border-[#0A8791]" : "border-gray-300"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Cards Grid */}
        {profile.favorites.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">У вас пока нет избранных элементов</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {profile.favorites.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg p-3 h-48 min-h-[12rem] hover:shadow-md transition-shadow flex items-center justify-center text-gray-400"
              >
                Избранный элемент #{index + 1}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Редактировать профиль
              </h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
                disabled={isUpdating}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Аватар
                </label>
                <div className="flex items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border-2 border-gray-200">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-gray-400" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex-1">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                      disabled={isUpdating}
                    />
                    <label
                      htmlFor="avatar-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Загрузить фото
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG до 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Имя пользователя
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A8791] focus:border-transparent transition"
                  placeholder="Введите имя"
                  required
                  disabled={isUpdating}
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0A8791] focus:border-transparent transition"
                  placeholder="Введите email"
                  required
                  disabled={isUpdating}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  disabled={isUpdating}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#0A8791] text-white rounded font-medium hover:bg-[#097179] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    "Сохранить"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
