"use client";

import Link from "next/link";
import { MdDashboard, MdPeople, MdOutlineMiscellaneousServices } from "react-icons/md";
import SidebarGroup from "../../components/ui/SidebarGroup";
import SidebarLink from "../../components/ui/SidebarLink";
import { PiUsersFourFill } from "react-icons/pi";
import { FaArrowLeft, FaArrowRight, FaFileAlt, FaRegTrashAlt, FaUser, FaTimes } from "react-icons/fa";
import { IoIosNotifications, IoMdSettings } from "react-icons/io";
import { useState } from "react";

function Sidebar({ sidebarOpen, onClose }) {
    const [collapsed, setCollapsed] = useState(false);
    const showLabels = !collapsed;

    return (
        <>
            <aside
                className={`
                    fixed top-0 left-0 z-9990 h-screen w-64 p-4
                    bg-(--main-color) shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    lg:hidden
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="text-(--text-color) font-semibold text-lg">Menu</span>
                    <button
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="text-(--text-color) hover:text-(--second-color) transition-colors cursor-pointer"
                    >
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                <SidebarLinks showLabels={true} onLinkClick={onClose} />
            </aside>

            <aside
                className={`
                    hidden lg:flex flex-col
                    ${collapsed ? "w-20" : "w-64"}
                    transition-all duration-300 h-screen p-4 relative shrink-0
                `}
            >
                <button
                    onClick={() => setCollapsed((c) => !c)}
                    aria-label="Toggle sidebar width"
                    className="absolute top-2 right-1 cursor-pointer text-(--text-color) hover:text-(--second-color) transition-colors duration-200"
                >
                    {collapsed ? <FaArrowRight /> : <FaArrowLeft />}
                </button>

                <SidebarLinks showLabels={showLabels} onLinkClick={() => { }} />
            </aside>
        </>
    );
}

function SidebarLinks({ showLabels, onLinkClick }) {
    return (
        <ul className="flex flex-col gap-2 mt-2">
            <li className="relative">
                <Link
                    href="/dashboard"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <MdDashboard className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Overview
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Services"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <MdOutlineMiscellaneousServices className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Services
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Appointments"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <MdPeople className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Appointments
                    </span>
                </Link>
            </li>
            <SidebarGroup
                showMenu={showLabels}
                icon={PiUsersFourFill}
                label="Users"
                links={["/dashboard/Users", "/dashboard/Users/new"]}
            >
                <SidebarLink href="/dashboard/Users" label="Users" onClick={onLinkClick} />
                <SidebarLink href="/dashboard/Users/new" label="Add new user" onClick={onLinkClick} />
            </SidebarGroup>
            <SidebarGroup
                showMenu={showLabels}
                icon={PiUsersFourFill}
                label="Patients"
                links={["/dashboard/Patients", "/dashboard/Patients/new"]}
            >
                <SidebarLink href="/dashboard/Patients" label="Patients" onClick={onLinkClick} />
                <SidebarLink href="/dashboard/Patients/new" label="Add Patients" onClick={onLinkClick} />
            </SidebarGroup>
            <SidebarGroup
                showMenu={showLabels}
                icon={FaFileAlt}
                label="Prescriptions"
                links={["/dashboard/Prescriptions", "/dashboard/Prescriptions/new"]}
            >
                <SidebarLink href="/dashboard/Prescriptions" label="Prescriptions" onClick={onLinkClick} />
                <SidebarLink href="/dashboard/Prescriptions/new" label="Add Prescriptions" onClick={onLinkClick} />
            </SidebarGroup>
            <li className="relative">
                <Link
                    href="/dashboard/Notifications"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <IoIosNotifications className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Notifications
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Settings"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <IoMdSettings className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Settings
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Profile"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <FaUser className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Profile
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Activity"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <FaUser className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Activity
                    </span>
                </Link>
            </li>
            <li className="relative">
                <Link
                    href="/dashboard/Trash"
                    onClick={onLinkClick}
                    className="flex items-center gap-2 py-2 px-1 text-(--text-color) hover:text-(--second-color) transition-colors"
                >
                    <FaRegTrashAlt className="text-(--second-color) text-xl shrink-0" />
                    <span className={`${showLabels ? "block" : "hidden"} text-md transition-all duration-300`}>
                        Trash
                    </span>
                </Link>
            </li>
        </ul>
    );
}

export default Sidebar;
