import { FaBell, FaSearch, FaUserCircle, FaBars } from "react-icons/fa";

function DashboardHeader({ onToggleSidebar }) {
    return (
        <header className="h-16 bg-(--main-color) text-black flex justify-between items-center px-4 shadow-sm">
            {/* Left: hamburger (mobile) + title */}
            <div className="flex items-center gap-3">
                {/* Hamburger — only visible on small screens */}
                <button
                    onClick={onToggleSidebar}
                    aria-label="Toggle sidebar"
                    className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-(--bg-color) transition-colors duration-200 text-(--text-color) cursor-pointer"
                >
                    <FaBars className="text-xl" />
                </button>

                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-(--text-color) whitespace-nowrap">
                    Clinic Management System
                </h3>
            </div>

            {/* Center: search — hidden on small screens */}
            <form className="hidden md:flex items-center gap-2 px-4 bg-(--bg-color) w-[300px] lg:w-[350px] h-8 rounded-full border border-(--text-color)">
                <FaSearch className="text-(--text-color) text-sm shrink-0" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-full focus:outline-none text-(--text-color) bg-transparent"
                />
            </form>

            {/* Right: actions */}
            <div className="flex items-center gap-3 sm:gap-5 text-(--text-color)">
                <FaBell className="text-xl cursor-pointer" />
                <div className="flex items-center gap-2">
                    <FaUserCircle className="text-(--text-color) text-2xl" />
                    {/* Name/role hidden on very small screens */}
                    <div className="hidden sm:block">
                        <h1 className="text-(--text-color) text-sm font-semibold capitalize leading-tight">
                            Omar Gehad
                        </h1>
                        <h6 className="text-(--p-color) text-xs">Doctor</h6>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;