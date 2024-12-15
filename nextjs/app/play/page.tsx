"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PlayerDashboard from "../components/LotteryPlayerDashboard";

export default function Home() {
    return (
        <>
            <Navbar />
            <PlayerDashboard />
            <Footer />
        </>
    );
}
