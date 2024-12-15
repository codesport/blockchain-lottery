"use client";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
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
