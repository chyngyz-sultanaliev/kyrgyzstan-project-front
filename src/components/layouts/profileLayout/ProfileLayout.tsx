import { FC, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
interface LayoutProps {
  children: ReactNode;
}
const ProfileLayout: FC<LayoutProps> = async ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;
