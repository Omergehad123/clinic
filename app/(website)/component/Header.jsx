"use client";
import LinkBtn from "@/app/components/ui/LinkBtn";
import ThemeBtn from "@/app/components/ui/ThemeBtn";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
const navLinks = [
    { href: "/", ar: "الرئيسية", en: "Home" },
    { href: "/pricing", ar: "الأسعار", en: "Pricing" },
    { href: "/contact", ar: "تواصل معنا", en: "Contact" },
];

function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header
            className="sticky z-200 bg-(--bg-color) shadow-xs shadow-[#555] transition-all"
            id="navbar"
        >
            <div className="flex items-center justify-evenly p-2  gap-5">
                <div className="flex items-center gap-10">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 text-[18px] font-extrabold text-(--second-color) shrink-0">
                        Clinic
                    </div>
                    {/* Desktop nav links */}
                    <nav className="hidden md:flex flex-1 items-center justify-center gap-7">
                        {navLinks.map(({ href, ar, en }) => (
                            <Link
                                key={en}
                                href={href}
                                data-ar={ar}
                                data-en={en}
                                className="text-[14px] font-semibold text-(--text-color) transition-colors whitespace-nowrap hover:text-(--second-color)"
                            >
                                {en}
                            </Link>
                        ))}
                    </nav>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2.5">
                    <button
                        className="bg-(--light-bg) text-(--text-color) text-[13px] font-bold cursor-pointer transition-all font-inherit hover:bg-(--border)"
                        id="langToggle"
                        type="button"
                    >
                        EN
                    </button>

                    <ThemeBtn />
                    <div className="hidden lg:block">
                        <LinkBtn text="login" link="/login" />
                    </div>
                    <button
                        className="md:hidden flex flex-col gap-1.5 bg-none border-none cursor-pointer p-1.5"
                        id="mobileMenuBtn"
                        type="button"
                        onClick={() => setMobileOpen((open) => !open)}
                    >
                        {mobileOpen == false ? <IoIosMenu className="text-lg" /> : <FaXmark className="text-lg" />}
                    </button>
                </div>
            </div>
            {/* Mobile menu */}
            <div
                className={`md:hidden flex-col gap-0 px-6 pt-3 pb-5 border-t border-(--border) bg-(--bg-color) ${mobileOpen ? "flex" : "hidden"
                    }`}
                id="mobileMenu"
            >
                {navLinks.map(({ href, ar, en }) => (
                    <Link
                        key={en}
                        href={href}
                        data-ar={ar}
                        data-en={en}
                        className="py-3 text-[15px] font-semibold text-(--text-color) border-b border-(--border)"
                    >
                        {en}
                    </Link>
                ))}

                <div className="mt-5 ">
                    <LinkBtn text="login" link="/login" />
                </div>
            </div>
        </header>
    );
}

export default Header;