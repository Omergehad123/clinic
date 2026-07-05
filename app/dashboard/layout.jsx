"use client";

import { useState } from "react";
import DashboardHeader from "./component/DashboardHeader";
import Footer from "../components/layout/Footer";
import Sidebar from "./component/Sidebar";

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            <main className="">
                <DashboardHeader onToggleSidebar={toggleSidebar} />

                <div className="w-full min-h-screen flex gap-5 relative">
                    {/* Overlay for mobile */}
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-20 bg-black/40 md:hidden"
                            onClick={closeSidebar}
                        />
                    )}

                    <Sidebar sidebarOpen={sidebarOpen} onClose={closeSidebar} />

                    <div className="p-2 w-full bg-(--pageBg-color)">
                        {children}
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}