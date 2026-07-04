"use client"
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

function SidebarGroup({ icon: Icon, label, children, showMenu }) {
    const [open, setOpen] = useState(false);

    return (
        <li>
            <button
                onClick={() => setOpen(!open)}
                className="cursor-pointer flex items-center justify-between w-full py-2 px-1 gap-2 hover:text-(--second-color) transition-all duration-300"
            >
                <span className="flex items-center gap-2">
                    {Icon && <Icon className="text-(--second-color) text-xl" />}
                    <span className={`${showMenu == true ? "block" : "hidden"} text-sm text-(--text-color) `}>{label}</span>
                </span>
                <FaChevronDown
                    className={`text-md transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <ul className=" mt-1 flex flex-col gap-1 pl-3">
                    {children}
                </ul>
            )}
        </li>
    );
}
export default SidebarGroup;