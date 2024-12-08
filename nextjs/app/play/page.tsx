"use client";

import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import PlayerDashboard from "../components/OwnerDashboard";

export default function Home() {
    return (
        <>
            <Navbar />
            <PlayerDashboard />
            <Footer />
        </>
    );
}
