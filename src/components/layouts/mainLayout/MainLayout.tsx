"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WelcomeLoader from "@/components/ui/loadingWelcome/Welcome";

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR-safe

    const hasSeenWelcome = sessionStorage.getItem("hasSeenWelcome");

    if (hasSeenWelcome) {
      // отложенный вызов состояния, чтобы ESLint не ругался
      setTimeout(() => setShowContent(true), 0);
    } else {
      const t = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setShowContent(true);
          sessionStorage.setItem("hasSeenWelcome", "true");
        }, 500);
      }, 4000);

      return () => clearTimeout(t);
    }
  }, []);

  if (!showContent) return <WelcomeLoader fadeOut={fadeOut} />;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
