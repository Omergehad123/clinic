"use client"
import Link from "next/link";
import StatusCards from "./component/StatusCards";
import { FaCalendar, FaComment, FaFileAlt, FaFlask, FaLongArrowAltRight, FaTimesCircle } from "react-icons/fa";
import AppointmentsTable from "./component/AppointmentsTable";
import Image from "next/image";

function OverviewPage() {
    const overview = [
        { label: "Completed", count: 70, pct: 58, color: "#1D9E75" },
        { label: "Cancelled", count: 30, pct: 25, color: "#E24B4A" },
        { label: "Waiting", count: 20, pct: 17, color: "#BA7517" },
    ];
    const total = overview.reduce((s, i) => s + i.count, 0);

    let offset = 25;
    const segments = overview.map((item) => {
        const seg = { ...item, offset };
        offset -= item.pct;
        return seg;
    });

    const notifications = [
        { id: 1, title: "New appointment booked", desc: "Sara Ahmed — Cardiology, 09:00 AM", time: "2 min ago", unread: true, iconBg: "bg-blue-50 text-blue-700", icon: <FaCalendar /> },
        { id: 2, title: "Appointment cancelled", desc: "Rania Gamal cancelled her 1:00 PM slot", time: "18 min ago", unread: true, iconBg: "bg-red-50 text-red-700", icon: <FaTimesCircle /> },
        { id: 3, title: "Prescription issued", desc: "Dr. Layla issued Rx for M. Hassan", time: "1 hr ago", unread: false, iconBg: "bg-teal-50 text-teal-700", icon: <FaFileAlt /> },
        { id: 4, title: "Lab results ready", desc: "Nour Farouk — blood panel complete", time: "3 hr ago", unread: false, iconBg: "bg-purple-50 text-purple-700", icon: <FaFlask /> },
        { id: 5, title: "New message", desc: "Youssef Badr sent a follow-up note", time: "Yesterday", unread: false, iconBg: "bg-amber-50 text-amber-700", icon: <FaComment /> },
    ];

    const activities = [
        { id: 1, initials: "KN", actor: "Dr. Karim Nour", action: "completed a session with Sara Ahmed", time: "10 min ago", avatarBg: "bg-blue-50 text-blue-700" },
        { id: 2, initials: "LM", actor: "Dr. Layla Mansour", action: "issued a new prescription", time: "42 min ago", avatarBg: "bg-teal-50 text-teal-700" },
        { id: 3, initials: "NF", actor: "Nour Farouk", action: "was added as a new patient", time: "2 hr ago", avatarBg: "bg-purple-50 text-purple-700" },
        { id: 4, initials: "TS", actor: "Dr. Tarek Soliman", action: "updated patient records", time: "4 hr ago", avatarBg: "bg-orange-50 text-orange-700" },
        { id: 5, initials: "YB", actor: "Youssef Badr", action: "rescheduled to 02:45 PM", time: "Yesterday", avatarBg: "bg-amber-50 text-amber-700" },
    ];

    return (
        <section className="flex flex-col lg:flex-row items-stretch gap-2">
            {/* Main content */}
            <div className="grow min-h-screen bg-(--main-color) rounded-lg p-3 sm:p-5">
                <div>
                    <StatusCards />
                    <AppointmentsTable />
                    {/* Responsive container: stack on mobile, side-by-side on md+ */}
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/2 bg-(--bg-color) rounded-lg my-5 p-4 md:p-5">
                            <h1 className="text-(--text-color) text-lg font-semibold mb-5">Quick Action</h1>
                            <ul>
                                <Link href="/dashboard/Patients/new" className="my-2 flex items-center gap-5 font-semibold hover:text-(--second-color) transition-all duration-200 cursor-pointer">
                                    <div className="w-[40px] h-[40px] bg-(--main-color) flex items-center justify-center rounded-xl">
                                        <Image src="/add.png" width={25} height={25} alt="new patient icon" />
                                    </div>
                                    Add Patient
                                </Link>

                                <Link href="/dashboard/Appointments/new" className="my-2 flex items-center gap-5 font-semibold hover:text-(--second-color) transition-all duration-200 cursor-pointer">
                                    <div className="w-[40px] h-[40px] bg-(--main-color) flex items-center justify-center rounded-xl">
                                        <Image src="/schedule.png" width={25} height={25} alt="new patient icon" />
                                    </div>
                                    New Appointment
                                </Link>

                                <Link href="/dashboard/Prescriptions/new" className="my-2 flex items-center gap-5 font-semibold hover:text-(--second-color) transition-all duration-200 cursor-pointer">
                                    <div className="w-[40px] h-[40px] bg-(--main-color) flex items-center justify-center rounded-xl">
                                        <Image src="/medical-prescription.png" width={25} height={25} alt="new patient icon" />
                                    </div>
                                    New Prescriptions
                                </Link>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 bg-(--bg-color) rounded-lg my-5 p-4 md:p-5">
                            <h1 className="text-(--text-color) text-lg font-semibold mb-5">Appointment Overview</h1>

                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* Donut */}
                                <div className="relative w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] shrink-0 mx-auto sm:mx-0">
                                    <svg viewBox="0 0 36 36" className="w-full h-full">
                                        {/* track */}
                                        <circle cx="18" cy="18" r="15.9" fill="none"
                                            stroke="currentColor" strokeOpacity="0.08" strokeWidth="3.2" />
                                        {segments.map((seg) => (
                                            <circle key={seg.label}
                                                cx="18" cy="18" r="15.9" fill="none"
                                                stroke={seg.color} strokeWidth="3.2"
                                                strokeDasharray={`${seg.pct} ${100 - seg.pct}`}
                                                strokeDashoffset={seg.offset}
                                            />
                                        ))}
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-2xl font-medium text-(--text-color)">{total}</span>
                                        <span className="text-[10px] uppercase tracking-wider text-(--text-color)/40">Total</span>
                                    </div>
                                </div>

                                {/* Legend */}
                                <ul className="flex flex-col gap-3 flex-1 w-full sm:w-auto">
                                    {overview.map((item) => (
                                        <li key={item.label} className="flex items-center gap-2.5">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                                            <span className="text-sm text-(--text-color)/70 flex-1">{item.label}</span>
                                            <span className="text-sm font-medium text-(--text-color)">{item.count}</span>
                                            <span className="text-[11px] text-(--text-color)/40">{item.pct}%</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* right sidebar */}
            <div className="min-h-screen w-full lg:w-[350px] bg-(--main-color) rounded-lg p-3 flex flex-col gap-3 mt-2 lg:mt-0">
                {/* Notifications */}
                <div className="bg-(--bg-color) rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-(--text-color) text-base font-semibold">Notifications</h2>
                        <Link href="/dashboard/Notifications" className="flex items-center gap-1 text-xs hover:text-(--second-color) transition-colors">
                            See all <FaLongArrowAltRight />
                        </Link>
                    </div>

                    <ul className="flex flex-col gap-0.5">
                        {notifications.map((n) => (
                            <li key={n.id} className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${n.unread ? "bg-(--second-color)/10" : "hover:bg-(--main-color)"}`}>
                                <div className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-sm shrink-0 mt-0.5 ${n.iconBg}`}>
                                    {n.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-(--text-color) leading-snug">{n.title}</p>
                                    <p className="text-[11px] text-(--text-color)/50 truncate mt-0.5">{n.desc}</p>
                                    <p className="text-[10px] text-(--text-color)/40 mt-1">{n.time}</p>
                                </div>
                                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Recent Activity */}
                <div className="bg-(--bg-color) rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-(--text-color) text-base font-semibold">Recent Activity</h2>
                        <Link href="/dashboard/Activity" className="flex items-center gap-1 text-xs hover:text-(--second-color) transition-colors">
                            See all <FaLongArrowAltRight />
                        </Link>
                    </div>

                    <ul className="flex flex-col">
                        {activities.map((a, i) => (
                            <li key={a.id} className="flex gap-2.5 py-2 relative">
                                {i < activities.length - 1 && (
                                    <span className="absolute left-[15px] top-[38px] bottom-0 w-px bg-(--text-color)/10" />
                                )}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 z-10 ${a.avatarBg}`}>
                                    {a.initials}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-(--p-color) leading-relaxed">
                                        <span className="font-bold text-(--text-color)">{a.actor}</span> {a.action}
                                    </p>
                                    <p className="text-[10px] text-(--text-color)/40 mt-0.5">{a.time}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default OverviewPage;