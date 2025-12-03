import { FC, ReactNode } from "react";
import Header from "../ui/adminLayout/Header";
import Sidebar from "../ui/adminLayout/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: FC<AdminLayoutProps> = async ({ children }) => {
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

export default AdminLayout;
