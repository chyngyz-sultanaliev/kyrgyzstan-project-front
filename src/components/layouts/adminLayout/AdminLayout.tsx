import { FC, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}
const AdminLayout: FC<AdminLayoutProps> = async ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
