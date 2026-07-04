import React from "react";

// Dummy images (replace src with actual images later)
const FEATURE_IMAGES = [
    "/images/dummy-patients.png",
    "/images/dummy-appointments.png",
    "/images/dummy-prescriptions.png",
    "/images/dummy-invoices.png",
];

const FEATURES = [
    {
        name: "Patient Management",
        summary: "Streamlined patient records and history at your fingertips.",
        details: [
            "Maintain comprehensive profiles for every patient, including demographics, full medical history, allergies, and insurance information.",
            "Efficiently manage visits, updates, document uploads (scans, lab results), and patient communications from a single dashboard.",
            "Advanced search and filter tools for instant access to critical patient details.",
            "Audit trails and role-based access ensure confidentiality and regulatory compliance.",
            "Custom fields allow flexible adaptations for unique clinic workflows.",
        ],
        icon: (
            <svg className="w-10 h-10 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 16-4 16 0" /></svg>
        ),
    },
    {
        name: "Appointments",
        summary: "Powerful, intuitive scheduling for clinics and patients.",
        details: [
            "Drag-and-drop calendar management with daily, weekly, and agenda views.",
            "Automatic SMS and email reminders reduce no-shows and enhance communication.",
            "Conflict detection and smart rescheduling to prevent double-booking.",
            "Facility, staff, and resource allocation within each booking for maximum efficiency.",
            "Customizable time slots and recurring appointment features.",
        ],
        icon: (
            <svg className="w-10 h-10 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="3" /><path d="M16 2v4M8 2v4" /></svg>
        ),
    },
    {
        name: "Prescriptions",
        summary: "Accelerate prescription creation and medication safety.",
        details: [
            "Pre-populated medication lists and dosing templates reduce errors and save time.",
            "Generate, print, or send electronic prescriptions directly to pharmacies or patients.",
            "Monitor complete prescription history per patient for oversight and safety.",
            "Integrate professional e-signature to meet regulatory policies.",
            "Warnings for allergy or drug interactions, reducing adverse incidents.",
        ],
        icon: (
            <svg className="w-10 h-10 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><path d="M21 12.3V8A2 2 0 0 0 19 6H5A2 2 0 0 0 3 8v8a2 2 0 0 0 2 2h6" /><path d="m21 15-5-5" /><path d="m16 15 5-5" /></svg>
        ),
    },
    {
        name: "Invoices",
        summary: "Complete billing and reporting made effortless.",
        details: [
            "Instant generation of branded invoices with all services and adjustments accounted for.",
            "Multi-method payment support including cash, credit, and direct insurance integration.",
            "Track invoice status and receive alerts for pending and overdue payments.",
            "Exportable financial reports for accounting and business insight.",
            "Patient payment history and outstanding balances all in a unified interface.",
        ],
        icon: (
            <svg className="w-10 h-10 text-(--second-color)" fill="none" stroke="currentColor" strokeWidth="1.4" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M7 20v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /></svg>
        ),
    },
];

function FeaturePage() {
    return (
        <section className="py-20 bg-[--main-color]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wide text-(--second-color) bg-(--bg-color) rounded px-4 py-1.5">
                        FEATURES
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-(--text-color) leading-tight">
                        Comprehensive Tools <span className="text-(--second-color)">for Modern Clinics</span>
                    </h2>
                    <p className="text-[15px] text-(--p-color) max-w-2xl mx-auto">
                        Designed for professionals, our platform offers robust and reliable features to streamline your healthcare practice, enhance operational efficiency, and deliver superior patient care.
                    </p>
                </div>
                <div className="flex flex-col gap-16">
                    {FEATURES.map((feature, idx) => {
                        // Alternate image on left/right
                        const imgOnLeft = idx % 2 === 0;
                        return (
                            <div
                                key={feature.name}
                                className={`flex flex-col-reverse md:flex-row ${imgOnLeft ? "" : "md:flex-row-reverse"} items-center gap-8 md:gap-16`}
                            >
                                {/* Info Section */}
                                <div className="flex-1 w-full">
                                    <div className="flex items-center gap-4 mb-3">
                                        <div className="flex items-center justify-center bg-(--second-color)/10 rounded-full p-2">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-(--second-color)">{feature.name}</h3>
                                    </div>
                                    <div className="text-[15px] font-medium text-(--text-color) mb-2">{feature.summary}</div>
                                    <ul className="pl-4 list-disc text-[12px] space-y-0.5 text-(--p-color)">
                                        {feature.details.map((item, i) => (
                                            <li key={i} className="leading-snug">{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                {/* Image Section */}
                                <div className="flex-1 flex items-center justify-center mb-6 md:mb-0">
                                    <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-(--border)/10 bg-white flex items-center justify-center">
                                        <img
                                            src={FEATURE_IMAGES[idx]}
                                            alt={`${feature.name} Screenshot`}
                                            className="object-cover w-full h-full"
                                            style={{ background: "#e0e0e0" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturePage;