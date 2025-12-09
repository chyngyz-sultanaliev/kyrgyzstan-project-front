import { FC, ReactNode } from "react";
import ProfileLayout from "@/components/layouts/profileLayout/ProfileLayout";
interface LayoutProps {
  children: ReactNode;
}
const layout: FC<LayoutProps> = ({ children }) => {
  return <ProfileLayout>{children}</ProfileLayout>;
};

export default layout;
