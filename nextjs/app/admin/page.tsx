"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import LotteryDashboard from "../components/lottery-dashboard";

export default function Home() {
  return (
    <>
      <Navbar />
      <LotteryDashboard />
      <Footer />
    </>
  );
}
