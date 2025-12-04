import { FC, ReactNode } from "react";
import Header from "./mainLayout/Header";
import Footer from "./mainLayout/Footer";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
