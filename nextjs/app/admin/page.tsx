"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OwnerDashboard from "../components/OwnerDashboard";

export default function Home() {
    return (
        <>
            <Navbar />
            <OwnerDashboard />
            <Footer />
        </>
    );
}
