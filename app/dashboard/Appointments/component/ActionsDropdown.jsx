"use client"
import { toPatientSlug } from "@/lib/patientSlug"
import Link from "next/link"

// Actions Dropdown used on both desktop & mobile
function ActionsDropdown({
    appointment,
    onEditClick,
    children,
    idx,
    handleCancel,
    handleComplete,
    handlePrint,
    openActions,
    setOpenActions
}) {
    const isOpen = openActions === appointment.id
    return (
        <div className="relative">
            <button
                type="button"
                className="flex items-center px-2 py-1 rounded bg-(--main-color) cursor-pointer text-(--text-color) min-w-0"
                onClick={e => {
                    e.preventDefault()
                    setOpenActions(isOpen ? null : appointment.id)
                }}
                aria-label="Actions"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
                    <circle cx="10" cy="4" r="1.5" />
                    <circle cx="10" cy="10" r="1.5" />
                    <circle cx="10" cy="16" r="1.5" />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="z-20 absolute right-0 mt-2 w-40 bg-(--main-color) rounded-lg shadow-xl border border-(--p-color)/30 flex flex-col text-[13px] animate-fade-in"
                    onClick={(e) => { e.stopPropagation() }}
                >
                    <Link
                        href={`/dashboard/Patients/${toPatientSlug(appointment.patientName)}`}
                        className="block px-4 py-2 hover:bg-(--bg-color) cursor-pointer text-(--text-color) text-left border-b last:border-0 border-(--text-color)/10"
                        onClick={() => setOpenActions(null)}
                    >
                        View
                    </Link>
                    <button
                        onClick={() => {
                            setOpenActions(null); onEditClick(appointment);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-(--bg-color) cursor-pointer border-b last:border-0 border-(--text-color)/10"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            setOpenActions(null); handleCancel(appointment);
                        }}
                        disabled={appointment.status === "canceled"}
                        className="block w-full text-left px-4 py-2 hover:bg-(--bg-color) cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-b last:border-0 border-(--text-color)/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            setOpenActions(null); handleComplete(appointment);
                        }}
                        disabled={appointment.status === "camed" || appointment.status === "canceled"}
                        className="block w-full text-left px-4 py-2 hover:bg-(--bg-color) cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-b last:border-0 border-(--text-color)/10"
                    >
                        Complete
                    </button>
                    <button
                        onClick={() => {
                            setOpenActions(null); handlePrint(appointment);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-(--bg-color) cursor-pointer"
                    >
                        Print
                    </button>
                    {children}
                </div>
            )}
            {/* click outside menu closes it */}
            {isOpen && (
                <div className="fixed inset-0 z-10" onClick={() => setOpenActions(null)}></div>
            )}
        </div>
    )
}
export default ActionsDropdown;