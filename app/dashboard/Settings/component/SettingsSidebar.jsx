"use client"

const navItems = [
    { id: "clinic", label: "Clinic" },
    { id: "preferences", label: "Preferences" },
    { id: "subscription", label: "Subscription" },
    { id: "roles", label: "Roles" },
]

function SettingsSidebar({ activeSection, onSectionChange }) {
    return (
        <nav className="w-full lg:w-56 shrink-0 bg-(--main-color) rounded-l-xl p-4">
            <ul className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                {navItems.map((item) => {
                    const isActive = activeSection === item.id

                    return (
                        <li key={item.id} className="shrink-0">
                            <button
                                type="button"
                                onClick={() => onSectionChange(item.id)}
                                className={`w-fit px-4 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap
                                    ${isActive
                                        ? "bg-(--second-color)/10 text-(--second-color)"
                                        : "text-(--text-color)/70 hover:text-(--text-color) hover:bg-(--main-color)/80"
                                    }`}
                            >
                                {item.label}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default SettingsSidebar
