import { FC, ReactNode } from "react";
import Header from "../ui/mainLayout/Header";
import Footer from "../ui/mainLayout/Footer";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
