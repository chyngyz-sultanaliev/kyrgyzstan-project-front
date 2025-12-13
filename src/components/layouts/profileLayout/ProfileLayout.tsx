"use client";
import { FC, ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
interface LayoutProps {
  children: ReactNode;
}

const ProfileLayout: FC<LayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header open={open} setOpen={setOpen} />

      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default ProfileLayout;
