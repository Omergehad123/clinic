import React from "react";

// Contact Info Data
const CONTACT_INFO = {
    badge: "Contact Us",
    heading: "Send Us a Message",
    description:
        "Our team is available to answer all your questions and help you get started.",
    details: [
        {
            icon: "📞",
            value: "+20 110 5710 609",
        },
        {
            icon: "📧",
            value: "codeyaa01@medsys.com",
        },
        {
            icon: "📍",
            value: "Cairo, Egypt",
        },
        {
            icon: "🕐",
            value: "Sun — Thu: 9:00 AM — 6:00 PM",
        },
    ],
    socials: [
        { label: "WhatsApp", href: "#" },
        { label: "Facebook", href: "#" },
        { label: "LinkedIn", href: "#" },
    ],
};

// Form fields data
const FORM_FIELDS = [
    [
        {
            type: "text",
            label: "Full Name",
            name: "fullName",
            placeholder: "Your full name",
            autoComplete: "name",
        },
        {
            type: "tel",
            label: "Phone Number",
            name: "phone",
            placeholder: "Your phone number",
            autoComplete: "tel",
        },
    ],
    [
        {
            type: "email",
            label: "Email Address",
            name: "email",
            placeholder: "Your email address",
            autoComplete: "email",
        },
    ],
    [
        {
            type: "textarea",
            label: "Your Message",
            name: "message",
            placeholder: "Write your message here...",
            rows: 4,
        },
    ],
];

// For demonstration, not handling actual submission here
function Contact() {
    return (
        <section
            id="contact"
            className="py-20 bg-(--main-color)" // background color
        >
            <div
                className="
          max-w-5xl
          mx-auto
          w-full
          grid 
          grid-cols-1 
          md:grid-cols-[1fr_1.4fr]
          gap-[60px]
          items-start
          px-6
        "
            >
                {/* Contact Info */}
                <div className="flex flex-col">
                    <span className="inline-block mb-[14px] w-fit text-xs font-semibold uppercase tracking-wide text-(--second-color) bg-(--bg-color) rounded px-4 py-1.5">
                        {CONTACT_INFO.badge}
                    </span>
                    <h2 className="text-[28px] font-extrabold mb-[12px] text-(--text-color)">
                        {CONTACT_INFO.heading}
                    </h2>
                    <p className="text-[14px] text-(--p-color) mb-[28px] leading-[1.75]">
                        {CONTACT_INFO.description}
                    </p>
                    <div className="flex flex-col gap-[14px] mb-[28px]">
                        {CONTACT_INFO.details.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-[12px] text-[14px] text-(--text-color)"
                            >
                                <span className="text-[18px] w-6 text-center">{item.icon}</span>
                                <span>{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-[10px] flex-wrap">
                        {CONTACT_INFO.socials.map((social, idx) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="bg-(--bg-color) border border-(--border) text-(--text-color) px-4 py-2 rounded-[8px] text-[13px] font-semibold transition-colors hover:border-(--second-color) hover:text-(--second-color)"
                            >
                                {social.label}
                            </a>
                        ))}
                    </div>
                </div>
                {/* Contact Form */}
                <form
                    className="bg-(--bg-color) border border-(--border) rounded-[16px] p-[32px] md:p-[28px] flex flex-col gap-[18px] shadow"
                    id="contactForm"
                    autoComplete="off"
                >
                    {/* Row 1: Full Name and Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {FORM_FIELDS[0].map((field, idx) => (
                            <div key={field.name} className="flex flex-col gap-[6px]">
                                <label
                                    htmlFor={field.name}
                                    className="text-[13px] font-semibold text-(--text-color)"
                                >
                                    {field.label}
                                </label>
                                <input
                                    id={field.name}
                                    name={field.name}
                                    type={field.type}
                                    autoComplete={field.autoComplete}
                                    placeholder={field.placeholder}
                                    className="px-[14px] py-[10px] border-[1.5px] border-(--border) rounded-[8px] bg-(--main-color) text-(--text-color) text-[14px] font-inherit outline-none transition-colors resize-none focus:border-(--second-color)"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Row 2: Email */}
                    {FORM_FIELDS[1].map((field) => (
                        <div key={field.name} className="flex flex-col gap-[6px]">
                            <label
                                htmlFor={field.name}
                                className="text-[13px] font-semibold text-(--text-color)"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.name}
                                name={field.name}
                                type={field.type}
                                autoComplete={field.autoComplete}
                                placeholder={field.placeholder}
                                className="px-[14px] py-[10px] border-[1.5px] border-(--border) rounded-[8px] bg-(--main-color) text-(--text-color) text-[14px] font-inherit outline-none transition-colors resize-none focus:border-(--second-color)"
                            />
                        </div>
                    ))}
                    {/* Row 3: Message */}
                    {FORM_FIELDS[2].map((field) => (
                        <div key={field.name} className="flex flex-col gap-[6px]">
                            <label
                                htmlFor={field.name}
                                className="text-[13px] font-semibold text-(--text-color)"
                            >
                                {field.label}
                            </label>
                            <textarea
                                id={field.name}
                                name={field.name}
                                rows={field.rows}
                                placeholder={field.placeholder}
                                className="px-[14px] py-[10px] border-[1.5px] border-(--border) rounded-[8px] bg-(--main-color) text-(--text-color) text-[14px] font-inherit outline-none transition-colors resize-vertical focus:border-(--second-color)"
                            />
                        </div>
                    ))}
                    {/* Submit button */}
                    <button
                        type="submit"
                        className="cursor-pointer btn-primary w-full py-3 mt-2 rounded-[8px] text-(--text-color) font-semibold bg-(--second-color) hover:bg-blue-700 transition-colors"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact;