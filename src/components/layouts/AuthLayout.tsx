import { FC, ReactNode } from "react";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <Link href="/" className="absolute top-12 left-12 text-[#0A8791]">
        <BsArrowLeft size={30} />
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;
