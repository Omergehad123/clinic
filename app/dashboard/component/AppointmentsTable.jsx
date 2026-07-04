"use client"

import Link from "next/link"
import { FaLongArrowAltRight } from "react-icons/fa"

const appointments = [
    {
        id: "PT-00412", name: "Sara Ahmed", initials: "SA",
        service: "Cardiology", serviceType: "cardio",
        time: "09:00 AM", doctor: "Dr. Karim Nour", status: "Confirmed",
    },
    {
        id: "PT-00389", name: "Mohamed Hassan", initials: "MH",
        service: "Dermatology", serviceType: "derma",
        time: "10:30 AM", doctor: "Dr. Layla Mansour", status: "Confirmed",
    },
    {
        id: "PT-00401", name: "Nour Farouk", initials: "NF",
        service: "Neurology", serviceType: "neuro",
        time: "11:15 AM", doctor: "Dr. Tarek Soliman", status: "Pending",
    },
    {
        id: "PT-00375", name: "Rania Gamal", initials: "RG",
        service: "Orthopedics", serviceType: "ortho",
        time: "01:00 PM", doctor: "Dr. Karim Nour", status: "Cancelled",
    },
    {
        id: "PT-00420", name: "Youssef Badr", initials: "YB",
        service: "General", serviceType: "general",
        time: "02:45 PM", doctor: "Dr. Layla Mansour", status: "Confirmed",
    },
]

const serviceBadge = {
    cardio: "bg-blue-50   text-blue-800",
    derma: "bg-teal-50   text-teal-800",
    neuro: "bg-purple-50 text-purple-800",
    ortho: "bg-orange-50 text-orange-800",
    general: "bg-neutral-100 text-neutral-600",
}

const avatarColor = {
    cardio: "bg-blue-50   text-blue-700",
    derma: "bg-teal-50   text-teal-700",
    neuro: "bg-purple-50 text-purple-700",
    ortho: "bg-orange-50 text-orange-700",
    general: "bg-amber-50  text-amber-700",
}

const statusConfig = {
    Confirmed: { dot: "bg-teal-500", label: "text-teal-700" },
    Pending: { dot: "bg-amber-500", label: "text-amber-700" },
    Cancelled: { dot: "bg-red-500", label: "text-red-700" },
}
function AppointmentsTable() {
    return (
        <>
            {/* Appointments table */}
            <div className="w-full bg-(--bg-color) rounded-lg my-5 p-5">
                {/* heading  */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="font-semibold text-(--text-color) text-xl">Today`s Schedule</h1>
                    <Link href="/dashboard/Appointments" className="flex items-center gap-1.5 text-sm hover:text-(--second-color) transition-colors">
                        View all <FaLongArrowAltRight />
                    </Link>
                </div>

                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b border-(--text-color)/10">
                            {["Patient", "Service", "Time", "Doctor", "Status"].map(h => (
                                <th key={h} className="font-bold text-left pb-3 px-3 text-[11px] uppercase tracking-wider text-(--p-color)">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((apt) => {
                            const s = statusConfig[apt.status]
                            return (
                                <tr key={apt.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--text-color)/5 transition-colors">
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${avatarColor[apt.serviceType]}`}>
                                                {apt.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-(--text-color)">{apt.name}</p>
                                                <p className="text-[11px] text-(--p-color)/40">#{apt.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${serviceBadge[apt.serviceType]}`}>
                                            {apt.service}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-(--p-color)/60">{apt.time}</td>
                                    <td className="py-3 px-3 text-(--p-color)/60">{apt.doctor}</td>
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                                            <span className={`text-xs ${s.label}`}>{apt.status}</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppointmentsTable