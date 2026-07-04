import React from 'react';

const statusData = [
    {
        icon: "⏱",
        value: "99.9%",
        en: "System Uptime",
        ar: "وقت تشغيل النظام"
    },
    {
        icon: "🏥",
        value: "150+",
        en: "Clinics & Centers",
        ar: "عيادة ومركز طبي"
    },
    {
        icon: "👥",
        value: "50K+",
        en: "Patients Served",
        ar: "مريض تم خدمتهم"
    },
    {
        icon: "🛡",
        value: "24/7",
        en: "Technical Support",
        ar: "دعم فني متواصل"
    }
];

function StatusBar() {
    return (
        <section className="bg-(--bg-color) shadow-xs py-5 shadow-[#eee] w-full ">
            <div className="flex items-center justify-between gap-5 flex-wrap px-5">
                {statusData.map((item, idx) => (
                    <div key={item.en} className='relative'>
                        <div className="flex items-center gap-3.5">
                            <div className="text-[28px]">{item.icon}</div>
                            <div>
                                <div className="text-[24px] font-extrabold text-(--second-color) leading-none">
                                    {item.value}
                                </div>
                                <div
                                    className="text-[13px] text-(--p-color) mt-1"
                                    data-ar={item.ar}
                                    data-en={item.en}
                                >
                                    {item.en}
                                </div>
                            </div>
                        </div>
                        {idx < statusData.length - 1 && (
                            <div className="absolute -right-15 top-0 w-px h-10 bg-(--p-color) hidden lg:block" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default StatusBar;