"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Car,
  Hotel,
  Newspaper,
} from "lucide-react";
import { MdTour } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const pathname = usePathname();

  const menu = [
    { label: "Profile", href: "/admin", icon: <User size={20} /> },
    { label: "Car", href: "/admin/car", icon: <Car size={20} /> },
    { label: "Tour", href: "/admin/tour", icon: <MdTour size={20} /> },
    { label: "Hotel", href: "/admin/hotel", icon: <Hotel size={20} /> },
    { label: "News", href: "/admin/news", icon: <Newspaper size={20} /> },
    {
      label: "Car Category",
      href: "/admin/categories/car",
      icon: <BiCategory size={20} />,
    },
    {
      label: "Tour Category",
      href: "/admin/categories/tour",
      icon: <BiCategory size={20} />,
    },
    {
      label: "Hotel Category",
      href: "/admin/categories/hotel",
      icon: <BiCategory size={20} />,
    },
    {
      label: "Настройки",
      href: "/admin/setting",
      icon: <Settings size={20} />,
    },
  ];

  const help = {
    label: "FAQ",
    href: "/admin/faq",
    icon: <HelpCircle size={20} />,
  };

  return (
    <>
      {/* Затемнение фона на мобилке */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 min-[900px]:hidden"
        ></div>
      )}

      <aside
        className={`
          w-60 bg-white border-r border-gray-200 z-40
          min-[900px]:static min-[900px]:translate-x-0 min-[900px]:h-[88.5vh]
          fixed top-0 h-full left-0 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          flex flex-col
        `}
      >
        {/* Верхняя часть с навигацией */}
        <div className="flex-1 overflow-y-auto hide-scrollbar p-5">
          <nav>
            <ul className="min-[900px]:space-y-3 space-y-6">
              {/* Мобильная шапка */}
              <div className="min-[900px]:hidden flex items-start justify-between gap-5 mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 cursor-pointer"></div>
                <button
                  className="text-[#0A8791] text-3xl"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть меню"
                >
                  <IoClose />
                </button>
              </div>

              {/* Основное меню */}
              {menu.map(({ label, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <li key={label}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-[#0A8791] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                      <span className="text-sm sm:text-base">{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Нижняя часть с FAQ и Выйти */}
        <div className="border-t border-gray-200 p-5">
          <nav>
            <ul className="space-y-3">
              <li>
                <Link
                  onClick={() => setOpen(false)}
                  href={help.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    pathname === help.href
                      ? "bg-[#0A8791] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {help.icon}
                  <span className="text-sm sm:text-base">{help.label}</span>
                </Link>
              </li>
              <li>
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full">
                  <LogOut size={20} />
                  <span className="text-sm sm:text-base">Выйти</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;