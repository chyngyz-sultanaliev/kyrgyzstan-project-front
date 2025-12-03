import AdminLayout from "@/components/layouts/adminLayout/AdminLayout";
import { FC, ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
