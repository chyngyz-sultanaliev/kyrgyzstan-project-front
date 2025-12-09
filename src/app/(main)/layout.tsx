import MainLayout from "@/components/layouts/mainLayout/MainLayout";
import { FC, ReactNode } from "react";
interface LayoutProps {
  children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default layout;
