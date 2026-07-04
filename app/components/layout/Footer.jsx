import React from 'react'

const FOOTER_COLUMNS = [
    {
        title: "System",
        links: [
            { href: "/", label: "Home" },
            { href: "/features", label: "Features" },
            { href: "/pricing", label: "Pricing" },
        ],
    },
    {
        title: "Features",
        links: [
            { href: "#", label: "Patient Management" },
            { href: "#", label: "Appointments" },
            { href: "#", label: "Prescriptions" },
            { href: "#", label: "Invoices" },
        ],
    },
    {
        title: "Support",
        links: [
            { href: "#", label: "FAQ" },
            { href: "#", label: "Terms & Conditions" },
            { href: "#", label: "Privacy Policy" },
            { href: "/contact", label: "Contact Us" },
        ],
    },
];

const FOOTER_BOTTOM_LINKS = [
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

function Footer() {
    return (
        <footer
            className="bg-(--bg-color) pt-14"
        >
            <div
                className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-8 pb-10 border-b border-(--text-color)/10"
            >
                {/* Brand */}
                <div className="footer-brand">
                    <div className="logo mb-3.5 text-(--text-color)">
                        <span className="ml-2 text-4xl font-bold align-middle">Clinic</span>
                    </div>
                    <p className="text-[13px] text-(--text-color)/60 leading-[1.7]">
                        A complete system for managing clinics and medical centers. We help doctors provide the best care for their patients.
                    </p>
                </div>
                {/* Columns */}
                {FOOTER_COLUMNS.map((col) => (
                    <div key={col.title} className="footer-col">
                        <h5 className="text-[14px] font-bold mb-4">{col.title}</h5>
                        {col.links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="block text-[13px] text-(--text-color)/60 mb-2.5 hover:text-(--text-color) transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
            <div
                className="flex flex-wrap justify-between items-center py-4 text-xs text-(--text-color)/45 gap-[10px] px-6 md:px-8"
            >
                <div>
                    © 2026 <a href="https://www.codeya.tech/" className='text-(--second-color)'>Codeya</a> — All rights reserved
                </div>
                <div className="footer-bottom-links flex gap-5">
                    {FOOTER_BOTTOM_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-(--text-color)/45 text-xs hover:text-(--text-color)/80 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer