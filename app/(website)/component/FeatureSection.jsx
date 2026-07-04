import React from 'react'

const SECTION_HEADER = {
    badge: "System Features",
    title: "Everything you need to run your clinic efficiently",
    subtitle: "A comprehensive platform covering all your admin and medical needs"
};

const FEATURES = [
    {
        iconClass: "teal",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
            </svg>
        ),
        title: "Patient Management",
        desc: "Complete medical records with patient history, diseases, allergies and medications."
    },
    {
        iconClass: "blue",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
        ),
        title: "Appointments & Booking",
        desc: "Organize appointments, schedule and send automatic reminders to patients and staff."
    },
    {
        iconClass: "green",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        title: "Prescriptions",
        desc: "Create professional digital prescriptions and print them with notes per medication."
    },
    {
        iconClass: "orange",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
        title: "Invoices & Reports",
        desc: "Accurate financial reports to track clinic performance and revenue easily."
    },
    {
        iconClass: "purple",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
                <path d="M16 11l2 2 4-4" />
            </svg>
        ),
        title: "User Management",
        desc: "Flexible permissions per user — the doctor controls what their team can access."
    },
    {
        iconClass: "red",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ),
        title: "Services & Procedures",
        desc: "Manage clinic services and pricing — checkups, bookings, scans and more."
    }
];

function FeatureSection() {
    return (
        <section className="py-12 bg-(--main-color)">
            <div className=" mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block mb-3 text-xs font-extrabold uppercase tracking-wider text-(--second-color) bg-(--bg-color) rounded px-3 py-1">{SECTION_HEADER.badge}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-(--text-color)">{SECTION_HEADER.title}</h2>
                    <p className="text-[13px] text-(--p-color) max-w-xl mx-auto">{SECTION_HEADER.subtitle}</p>
                </div>
                <div
                    className="
                        grid grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        gap-[22px]
                    "
                >
                    {FEATURES.map((feature, idx) => (
                        <div
                            key={idx}
                            className="
                                bg-(--bg-color)
                                rounded-(--radius)
                                p-7
                                border
                                border-(--border)
                                transition
                                duration-200
                                hover:-translate-y-1.5
                                hover:shadow-(--shadow-md)
                                shadow-none
                                group
                                h-full
                                flex flex-col
                            "
                        >
                            <div className={`
                               
                                ${feature.iconClass}
                                w-12 h-12 rounded-[12px]
                                flex items-center justify-center
                                mb-4 text-white text-xl
                            `}
                                style={{
                                    background:
                                        feature.iconClass === "teal"
                                            ? "#0d9488"
                                            : feature.iconClass === "blue"
                                                ? "#2563eb"
                                                : feature.iconClass === "green"
                                                    ? "#16a34a"
                                                    : feature.iconClass === "orange"
                                                        ? "#ea580c"
                                                        : feature.iconClass === "purple"
                                                            ? "#7c3aed"
                                                            : feature.iconClass === "red"
                                                                ? "#dc2626"
                                                                : undefined
                                }}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-base font-bold text-(--text-color) mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[13px] text-(--p-color) leading-[1.65] flex-1">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeatureSection