import { FC, ReactNode } from "react";
import BackNav from "../ui/backNav/BackNav";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-full">
      <BackNav />
      {children}
    </div>
  );
};

export default AuthLayout;
