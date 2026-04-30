import Footer from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <div className="container mx-auto min-h-screen">{children}</div>

      <Footer />
    </>
  );
}
