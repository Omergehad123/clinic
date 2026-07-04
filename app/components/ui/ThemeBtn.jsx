"use client";

import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

function ThemeBtn() {
    const { theme, setTheme } = useTheme();
    return (
        <button className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <FaSun className="" /> : <FaMoon className="" />}
        </button>
    )
}
export default ThemeBtn