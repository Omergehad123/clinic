import React from "react";
import Link from "next/link";
import StatusBar from "./StatusBar";

function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-10 bg-(--bg-color) text-(--text-color)">
            {/* Overlay for radial gradient */}
            <div className="pointer-events-none absolute inset-0 z-0 before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_70%_50%,rgba(37,99,235,0.3)_0%,transparent_70%)]" />

            <div className="mb-5 relative container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-center hero-inner z-10">
                {/* Hero Text */}
                <div className="hero-text flex flex-col">
                    {/* Hero Badge */}
                    <div className="inline-flex items-center gap-2 text-(--text-color) bg-(--text-color)/15 border border-(--text-color)/25 px-[14px] py-[6px] rounded-[20px] text-[13px] font-semibold mb-5">
                        <span className="inline-block w-[7px] h-[7px] bg-(--second-color) rounded-full animate-pulse" />
                        <span
                            data-ar="نظام SaaS للعيادات والمراكز الطبية"
                            data-en="SaaS System for Clinics & Medical Centers"
                        >
                            SaaS System for Clinics &amp; Medical Centers
                        </span>
                    </div>
                    {/* Hero Title */}
                    <h1
                        className="text-[34px] sm:text-[40px] lg:text-[42px] font-extrabold leading-tight mb-4">
                        <span className="block">
                            <span className="font-extrabold">
                                <span className="text-(--second-color)">Complete</span> System for
                            </span>
                        </span>
                        <span className="block">
                            Clinic &amp; Medical Center Management
                        </span>
                    </h1>
                    {/* Hero Subtitle */}
                    <p
                        className="text-[16px] opacity-90 mb-8 max-w-xl leading-relaxed hero-sub text-(--p-color)">
                        Manage patients, appointments, services, invoices and prescriptions in one easy secure system — so you focus on what really matters.
                    </p>
                    {/* Hero Buttons */}
                    <div className="flex gap-4 flex-wrap mb-7 hero-btns">
                        <Link
                            href="#"
                            className="btn-primary btn-lg bg-(--second-color)/80 hover:bg-(--second-color) text-base font-bold rounded-full px-7 py-2 transition">
                            Start Free
                        </Link>
                        <Link
                            href="#"
                            className="btn-outline btn-lg border border-(--text-color)/70 bg-transparent hover:bg-(--text-color)/10 text-base font-bold rounded-full px-7 py-2 transition"
                        >
                            see a Demo
                        </Link>
                    </div>
                    {/* Trust Section */}
                    <div className="flex items-center gap-3 text-[14px] opacity-85 hero-trust">
                        <div className="flex trust-avatars">
                            <div className="ta w-8 h-8 rounded-full border-2 border-(--text-color)/60 bg-gradient-to-tr from-blue-200 to-(--second-color) mr-[-8px] first:mr-0" />
                            <div className="ta w-8 h-8 rounded-full border-2 border-(--text-color)/60 bg-gradient-to-tr from-blue-200 to-(--second-color) mr-[-8px]" />
                            <div className="ta w-8 h-8 rounded-full border-2 border-(--text-color)/60 bg-gradient-to-tr from-blue-200 to-(--second-color) mr-[-8px]" />
                            <div className="ta w-8 h-8 rounded-full border-2 border-(--text-color)/60 bg-gradient-to-tr from-blue-200 to-(--second-color) mr-[-8px]" />
                        </div>
                        <span className="ml-2 text-(--p-color)">
                            500+ clinics trust us
                        </span>
                    </div>
                </div>
                {/* Hero Visual / Dashboard Mock */}
                <div className="hero-visual relative">
                    <div className="dashboard-mock bg-(--text-color)/10 border border-(--text-color)/20 rounded-2xl p-5 backdrop-blur-md">
                        {/* Mock Header */}
                        <div className="mock-header flex items-center gap-2.5 mb-4">
                            <div className="mock-dots flex gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-400 block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 block" />
                                <span className="w-2.5 h-2.5 rounded-full bg-(--second-color) block" />
                            </div>
                            <span
                                className="mock-title text-[13px] font-semibold opacity-80 text-(--text-color)">
                                Dashboard
                            </span>
                        </div>
                        {/* Mock Stats */}
                        <div className="mock-stats grid grid-cols-3 gap-2.5 mb-4">
                            <div className="mock-stat bg-(--text-color)/12 rounded-lg p-3 text-center">
                                <div className="ms-val text-lg font-extrabold">1,248</div>
                                <div
                                    className="ms-lbl text-xs opacity-70 my-0.5"
                                    data-ar="إجمالي المرضى"
                                    data-en="Total Patients"
                                >
                                    Total Patients
                                </div>
                                <div className="ms-trend up text-xs font-bold text-(--second-color)">
                                    ▲ 12%
                                </div>
                            </div>
                            <div className="mock-stat bg-(--text-color)/12 rounded-lg p-3 text-center">
                                <div className="ms-val text-lg font-extrabold">32</div>
                                <div
                                    className="ms-lbl text-xs opacity-70 my-0.5"
                                    data-ar="مواعيد اليوم"
                                    data-en="Today's Appts"
                                >
                                    Today's Appts
                                </div>
                                <div className="ms-trend up text-xs font-bold text-(--second-color)">
                                    ▲ 5%
                                </div>
                            </div>
                            <div className="mock-stat bg-(--text-color)/12 rounded-lg p-3 text-center">
                                <div className="ms-val text-lg font-extrabold">86</div>
                                <div
                                    className="ms-lbl text-xs opacity-70 my-0.5"
                                    data-ar="الوصفات"
                                    data-en="Prescriptions"
                                >
                                    Prescriptions
                                </div>
                                <div className="ms-trend down text-xs font-bold text-red-400">
                                    ▼ 3%
                                </div>
                            </div>
                        </div>
                        {/* Mock Chart */}
                        <div className="mock-chart mb-3.5">
                            <div className="chart-bars flex items-end gap-1 h-[60px]">
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "40%" }} />
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "65%" }} />
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "50%" }} />
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "80%" }} />
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "60%" }} />
                                <div className="bar flex-1 rounded-t-md bg-sky-300" style={{ height: "90%" }} />
                                <div className="bar flex-1 bg-(--text-color)/20 rounded-t-md" style={{ height: "70%" }} />
                            </div>
                        </div>
                        {/* Mock List */}
                        <div className="mock-list flex flex-col gap-2">
                            <div className="mock-row flex items-center gap-2.5 bg-(--text-color)/8 rounded-lg px-2.5 py-2">
                                <div className="mr-avatar a1 w-7 h-7 rounded-full bg-gradient-to-tr from-blue-200 to-blue-500" />
                                <div className="mr-lines flex-1">
                                    <div className="mr-name h-2 bg-(--text-color)/30 rounded w-[70%] mb-1" />
                                    <div className="mr-sub h-1.5 bg-(--text-color)/15 rounded w-[45%]" />
                                </div>
                                <span className="mr-badge done text-(--second-color) ml-1">✓</span>
                            </div>
                            <div className="mock-row flex items-center gap-2.5 bg-(--text-color)/8 rounded-lg px-2.5 py-2">
                                <div className="mr-avatar a2 w-7 h-7 rounded-full bg-gradient-to-tr from-(--second-color) to-teal-600" />
                                <div className="mr-lines flex-1">
                                    <div className="mr-name h-2 bg-(--text-color)/30 rounded w-[70%] mb-1" />
                                    <div className="mr-sub h-1.5 bg-(--text-color)/15 rounded w-[45%]" />
                                </div>
                                <span className="mr-badge pend text-yellow-400 ml-1">●</span>
                            </div>
                            <div className="mock-row flex items-center gap-2.5 bg-(--text-color)/8 rounded-lg px-2.5 py-2">
                                <div className="mr-avatar a3 w-7 h-7 rounded-full bg-gradient-to-tr from-red-200 to-red-500" />
                                <div className="mr-lines flex-1">
                                    <div className="mr-name h-2 bg-(--text-color)/30 rounded w-[70%] mb-1" />
                                    <div className="mr-sub h-1.5 bg-(--text-color)/15 rounded w-[45%]" />
                                </div>
                                <span className="mr-badge done text-(--second-color) ml-1">✓</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StatusBar />
        </section >
    );
}

export default HeroSection;