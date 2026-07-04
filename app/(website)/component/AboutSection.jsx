import React from 'react'

const ABOUT_TEXT = {
    badge: "About Us",
    h2: "Our Journey",
    description:
        "We are a team specialized in building digital solutions for the medical sector. Our goal is to be the leading platform for clinic and medical center management in the Arab world.",
    visionTitle: "Our Vision",
    vision:
        "To be the preferred platform for managing clinics and medical centers, offering a simple system that helps doctors provide the best care for their patients."
};

const ABOUT_VALUES = [
    {
        icon: "🛡",
        title: "Data Security",
        desc: "Protecting patient data with the highest security standards."
    },
    {
        icon: "⚡",
        title: "Ease of Use",
        desc: "Simple and easy interface that suits everyone."
    },
    {
        icon: "🤝",
        title: "Continuous Support",
        desc: "Support team always available to help you anytime."
    },
    {
        icon: "🚀",
        title: "Continuous Development",
        desc: "Continuous updates and new features based on your needs."
    }
];

function AboutSection() {
    return (
        <section
            id="about"
            className="bg-(--bg-color) w-full"
        >
            <div className="w-full max-w-5xl mx-auto px-6 md:px-10 py-12 flex flex-col items-center">
                {/* Text Content */}
                <div className="w-full max-w-2xl text-center">
                    <span className="inline-block mb-3 text-xs font-extrabold uppercase tracking-wider text-(--second-color) bg-(--main-color) rounded px-3 py-1">
                        {ABOUT_TEXT.badge}
                    </span>
               
                    <h2 className="text-[28px] font-extrabold mb-2 mt-4 text-(--text-color)">{ABOUT_TEXT.h2}</h2>
                    <p className="text-[15px] text-(--p-color) leading-[1.8] mb-6">
                        {ABOUT_TEXT.description}
                    </p>
                    <h3 className="text-[18px] font-bold my-5 text-(--text-color)">{ABOUT_TEXT.visionTitle}</h3>
                    <p className="text-[14px] text-(--p-color) leading-[1.75]">
                        {ABOUT_TEXT.vision}
                    </p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                    {ABOUT_VALUES.map((val) => (
                        <div
                            key={val.title}
                            className="flex items-start gap-4 bg-(--bg-color) rounded-xl px-4 py-4 border border-(--border) shadow-sm hover:shadow-lg transition"
                        >
                            <div className="text-[28px] mt-1.5 flex-shrink-0">{val.icon}</div>
                            <div>
                                <strong className="block text-[15px] font-bold text-(--text-color) mb-1">
                                    {val.title}
                                </strong>
                                <p className="text-[13px] text-(--p-color) m-0">
                                    {val.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

export default AboutSection