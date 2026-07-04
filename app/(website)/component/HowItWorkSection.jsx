import React from 'react'

const HOW_IT_WORK_DATA = {
    badge: "Simple Steps",
    title: "How Does the System Work?",
    subtitle: "Start in minutes and manage your entire clinic from one place",
    steps: [
        {
            num: "01",
            icon: "📋",
            title: "Create Account",
            desc: "Register your details and clinic info in minutes without any complexity."
        },
        {
            num: "02",
            icon: "⚙️",
            title: "Setup Services",
            desc: "Add your services, prices and available appointment schedule easily."
        },
        {
            num: "03",
            icon: "👤",
            title: "Add Patient",
            desc: "Add your patients and record their complete medical data and needs."
        },
        {
            num: "04",
            icon: "🏥",
            title: "Manage Clinic",
            desc: "Follow up with patients, issue prescriptions, invoices and send reminders automatically."
        },
        {
            num: "05",
            icon: "📊",
            title: "Grow & Improve",
            desc: "Make better business decisions using smart data and reports."
        }
    ]
};

function HowItWorkSection() {
    return (
        <section
            id="how"
            className="bg-(--light-bg) py-16 w-full"
        >
            <div className=" mx-auto px-6 md:px-10">
                <div className="text-center mb-12">
                    <span className="inline-block mb-3 text-xs font-extrabold uppercase tracking-wider text-(--second-color) bg-(--bg-color) rounded px-3 py-1">
                        {HOW_IT_WORK_DATA.badge}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-(--text-color)">
                        {HOW_IT_WORK_DATA.title}
                    </h2>
                    <p className="text-[13px] text-(--p-color) max-w-xl mx-auto">{HOW_IT_WORK_DATA.subtitle}</p>
                </div>

                <div className="flex items-start flex-wrap justify-between gap-0 relative">
                    {HOW_IT_WORK_DATA.steps.map((step) => (
                        <div key={step.num} className="w-[250px] text-center px-4 relative">
                            <div className="text-[22px] font-extrabold text-(--second-color) tracking-widest mb-2">{step.num}</div>
                            <span className="block text-[36px] mb-3">{step.icon}</span>
                            <h3 className="text-[15px] font-bold text-(--text-color) mb-2">{step.title}</h3>
                            <p className="text-[13px] text-(--p-color) leading-[1.6]">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorkSection