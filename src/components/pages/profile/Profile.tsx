"use client";
import { useState, useEffect } from "react";
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
import FavoriteCard from "../favoriteCard/FavoriteCard"; // туура импорт жол

import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/shared/api/profileApi";

// Note: Favorite type is provided by API typings; no local duplicate here.

const Profile = () => {
  // ---- API ----
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // ---- Local state ----
  const [activeFilter, setActiveFilter] = useState<
    "ALL" | "TOUR" | "CAR" | "HOTEL"
  >("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [avatarFile, setAvatarFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);

  // ---- Sync form with API ----
  useEffect(() => {
    if (profile) {
      setFormData({ username: profile.username, email: profile.email });
      setAvatarPreview(profile.avatar || undefined);
    }
  }, [profile]);

  // ---- Form handlers ----
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    try {
      let body:
        | FormData
        | { username?: string; email?: string; avatar?: string } = {
        ...formData,
      };

      if (avatarFile) {
        const fd = new FormData();
        fd.append("username", formData.username);
        fd.append("email", formData.email);
        fd.append("avatar", avatarFile);
        body = fd;
      }

      await updateProfile(body).unwrap();
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Ошибка обновления профиля");
    }
  };

  // ---- Favorites filtered ----
  const filteredFavorites =
    profile?.favorites?.filter(
      (f) => activeFilter === "ALL" || f.itemType === activeFilter
    ) || [];

  // ---- Loading ----
  if (isLoading) return <div>Загрузка профиля...</div>;

  return (
    <section className="px-4 py-10 md:px-20">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-full overflow-hidden relative">
          {avatarPreview ? (
            <Image
              src={avatarPreview}
              alt="Avatar"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
              <User />
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-medium">{profile?.username}</h1>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>Редактировать</Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mt-6">
        {(["ALL", "TOUR", "CAR", "HOTEL"] as const).map((type) => (
          <button
            key={type}
            className={`px-4 py-1 rounded-full border ${
              activeFilter === type ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
            onClick={() => setActiveFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Favorites */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {filteredFavorites.map((fav, i) => {
          const item =
            fav.itemType === "TOUR"
              ? fav.tour
              : fav.itemType === "CAR"
              ? fav.car
              : fav.itemType === "HOTEL"
              ? fav.hotel
              : undefined;

          if (!item) return null;

          return <FavoriteCard key={i} item={item} itemType={fav.itemType} />;
        })}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-medium mb-3">Редактировать профиль</h2>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Имя"
              className="w-full border py-2 px-4 rounded-full mb-2"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border py-2 px-4 rounded-full mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="mb-2"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded-full w-full mt-2"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Сохранить"
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
