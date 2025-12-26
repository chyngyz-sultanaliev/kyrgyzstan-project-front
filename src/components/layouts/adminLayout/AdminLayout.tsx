"use client";
import { FC, ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />
      <Header open={open} setOpen={setOpen} />
      <div className="flex">
        <Sidebar open={open} setOpen={setOpen} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
