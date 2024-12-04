"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PlayerDashboard from "../components/lottery-player-dashboard";

export default function Home() {
  return (
    <>
      <Navbar />
      <PlayerDashboard />
      <Footer />
    </>
  );
}
