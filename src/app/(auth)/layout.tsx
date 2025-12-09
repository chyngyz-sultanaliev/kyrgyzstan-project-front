import AuthLayout from "@/components/layouts/AuthLayout";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthGroupLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default AuthGroupLayout;
