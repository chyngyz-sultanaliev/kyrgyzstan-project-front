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

const Sidebar = () => {
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
    <aside
      className="
        w-60 h-[88.5vh] bg-white border-r border-gray-200 p-5
        flex flex-col justify-between
        sticky top-[93px] z-20
        max-md:fixed max-md:top-0 max-md:left-0 max-md:h-screen max-md:z-40
      "
    >
      <nav>
        <ul className="space-y-3">
          {menu.map(({ label, href, icon }) => {
            const isActive = pathname === href;
            return (
              <li key={label}>
                <Link
                  href={href}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-md transition
                    ${
                      isActive
                        ? "bg-[#0A8791] text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <nav className="pt-6 mt-auto border-t border-gray-200">
        <ul className="space-y-3 mt-4">
          <li>
            <Link
              href={help.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md transition
                ${
                  pathname === help.href
                    ? "bg-[#0A8791] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {help.icon}
              <span>{help.label}</span>
            </Link>
          </li>
          <li>
            <button
              className="
                flex items-center gap-3 px-3 py-2 rounded-md 
                text-gray-700 hover:bg-red-100 transition w-full
              "
            >
              <LogOut size={20} />
              <span>Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
