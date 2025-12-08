import Image from "next/image";
import { IoNotificationsOutline } from "react-icons/io5";
import Img from "../../../../public/footer_logo.png";
import Link from "next/link";

const ProfileHeader = () => {
  return (
    <header className="sticky top-0 w-full bg-white  border-b border-gray-200 z-30">
      <div className="w-full flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-16 text-[#0A8791]">
          <Link href={"/"}>
          <div className="flex items-center gap-2 ">
            <Image
              src={Img}
              alt="Logo"
              width={100}
              height={80}
              className="w-auto h-10"
              />
            <h1 className="text-2xl font-semibold mb-2">
              Kyrgyzstan Tourism Industry
            </h1>
          </div>
              </Link>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <button className="w-12 h-12 flex items-center justify-center text-gray-400 border-2 border-gray-200 rounded-md">
            <IoNotificationsOutline size={22} />
          </button>
          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 cursor-pointer"></div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
