"use client"
import { useState } from "react";

const PLANS = [
    {
        name: "Basic",
        description: "For small clinics just starting",
        monthly: 199,
        yearly: 159,
        currency: "EGP",
        period: "/mo",
        featured: false,
        features: [
            { label: "Up to 500 patients", yes: true },
            { label: "1 user", yes: true },
            { label: "Appointments & services", yes: true },
            { label: "Prescriptions", yes: true },
            { label: "Non-email support", yes: false },
            { label: "Advanced reports", yes: false }
        ]
    },
    {
        name: "Professional",
        description: "For mid-sized clinics & centers",
        monthly: 399,
        yearly: 319,
        currency: "EGP",
        period: "/mo",
        featured: true,
        badge: "Most Popular",
        features: [
            { label: "Up to 2000 patients", yes: true },
            { label: "Up to 5 users", yes: true },
            { label: "All Basic plan features", yes: true },
            { label: "Advanced reports", yes: true },
            { label: "Email support", yes: true },
            { label: "Unlimited patients", yes: false }
        ]
    },
    {
        name: "Enterprise",
        description: "For large clinics & medical centers",
        monthly: 699,
        yearly: 559,
        currency: "EGP",
        period: "/mo",
        featured: false,
        features: [
            { label: "Unlimited patients", yes: true },
            { label: "Unlimited users", yes: true },
            { label: "All Professional features", yes: true },
            { label: "Custom reports", yes: true },
            { label: "24/7 support", yes: true },
            { label: "Daily backup", yes: true }
        ]
    }
];

function Pricing() {
    const [annual, setAnnual] = useState(false);

    return (
        <section className="py-16 bg-(--main-color)">
            <div className="max-w-5xl mx-auto w-full px-4">
                <div className="text-center mb-10">
                    <span className="inline-block mb-3 text-xs font-extrabold uppercase tracking-wider text-(--second-color) bg-(--bg-color) rounded px-3 py-1">
                        Pricing
                    </span>

                    <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-(--text-color)">
                        Choose the Right Plan for You
                    </h2>
                    <p className="text-[13px] text-(--p-color) max-w-xl mx-auto">
                        All plans include a 14-day free trial, no credit card required
                    </p>
                </div>
                {/* Billing toggle */}
                <div className="flex items-center justify-center gap-3 mb-11 font-semibold text-[14px] text-(--text-color)">
                    <span>Monthly</span>
                    <label className="relative inline-block w-11 h-6">
                        <input
                            type="checkbox"
                            checked={annual}
                            onChange={() => setAnnual((x) => !x)}
                            className="opacity-0 w-0 h-0 peer"
                        />
                        <span className={`
              absolute inset-0 bg-(--text-color) rounded-full cursor-pointer transition-colors
              peer-checked:bg-(--second-color)
              before:content-[''] before:absolute before:w-[18px] before:h-[18px]
              before:left-[3px] before:top-[3px] before:bg-(--p-color) before:rounded-full
              before:transition-transform peer-checked:before:translate-x-5
            `}></span>
                    </label>
                    <span>Annually</span>
                    <span className="bg-(--second-color) text-(--text-color) text-[11px] font-bold px-2.5 py-[3px] rounded-2xl">
                        Save 20%
                    </span>
                </div>
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {PLANS.map((plan, idx) => (
                        <div
                            key={plan.name}
                            className={`
                relative rounded-2xl border px-7 py-8 bg-(--light-bg)
                transition-all duration-200 hover:-translate-y-1 hover:shadow-(--shadow-md)
                ${plan.featured ?
                                    "bg-(--second-color) border-(--second-color) text-(--text-color) scale-[1.04] hover:scale-[1.04] hover:-translate-y-1" : ""}
              `}
                        >
                            {plan.featured && (
                                <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-yellow-400 text-(--second-color) text-[11px] font-extrabold px-4 py-1 rounded-2xl (--text-color)space-nowrap z-10">
                                    {plan.badge}
                                </div>
                            )}
                            <div className="mb-5">
                                <h3 className="text-[20px] font-extrabold mb-1 text-(--text-color)">{plan.name}</h3>
                                <p className="text-[13px] text-(--p-color)">{plan.description}</p>
                            </div>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-[40px] font-extrabold leading-none text-(--text-color)">
                                    {annual ? plan.yearly : plan.monthly}
                                </span>
                                <span className="text-[14px] font-semibold text-(--text-color)">{plan.currency}</span>
                                <span className="text-[13px] text-(--p-color)">{plan.period}</span>
                            </div>
                            <ul className="mb-7 flex flex-col gap-2.5">
                                {plan.features.map((feat, i) => (
                                    <li
                                        key={feat.label}
                                        className={`
                      flex items-center gap-2.5 text-[13px]
                      ${!feat.yes ? "text-(--p-color)" : "text-(--text-color)"}
                    `}
                                    >
                                        <span
                                            className={`
                        flex items-center justify-center w-[18px] h-[18px] rounded-full font-extrabold text-[13px] shrink-0
                        ${plan.featured
                                                    ? "bg-(--text-color)/20 text-(--text-color)"
                                                    : feat.yes ? "bg-(--bg-color) text-(--second-color)" : "bg-transparent"
                                                }
                      `}
                                        >
                                            {feat.yes ? "✓" : "✕"}
                                        </span>
                                        {feat.label}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#"
                                className={`
                  block text-center py-3 rounded-lg text-[14px] font-bold border-2 transition
                  ${plan.featured
                                        ? "bg-(--text-color) text-(--second-color) border-(--text-color) hover:bg-(--text-color)/85"
                                        : "border-(--second-color) text-(--second-color) hover:bg-(--second-color) hover:text-(--text-color)"
                                    }
                `}
                            >
                                Subscribe Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;