"use client";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import Img from "../../../../public/footer_logo.png";
interface HeaderProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const ProfileHeader = ({ open, setOpen }: HeaderProps) => {
  return (
    <header className="sticky top-0 w-full bg-white border-b border-gray-200 z-30">
      <div className="w-full flex items-center justify-between px-6 py-3">
        {/* Мобильный бургер */}
        <button
          onClick={() => setOpen(!open)}
          className="min-[900px]:hidden text-[#0A8791] text-3xl"
        >
          {open ? null : <IoMenu />}
        </button>
        <Link href={"/"}>
          <div className="flex min-[900px]:items-center w-full justify-between  gap-2 text-[#0A8791]">
            <Image
              src={Img}
              alt="Logo"
              width={100}
              height={80}
              className="w-auto min-[900px]:flex hidden h-10"
            />
            <h1 className="text-[16px] sm:text-2xl font-semibold">
              Kyrgyzstan Tourism Industry
            </h1>
          </div>
        </Link>

        {/* Десктоп аватар */}
        <div className="hidden min-[900px]:flex items-center gap-5">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 cursor-pointer"></div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
