"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarLink({ href, label }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li className={`${isActive ? "bg-(--second-color) " : ""}`}>
            <Link
                href={href}
                className={`block py-1 pl-10 text-sm transition-colors
            ${isActive
                        ? "text-(--main-color) font-semibold"
                        : "text-(--text-color) hover:text-(--second-color) "
                    }`}
            >
                {label}
            </Link>
        </li>
    );
}

export default SidebarLink;