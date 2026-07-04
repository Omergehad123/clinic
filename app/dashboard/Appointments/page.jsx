"use client"
import { useMemo, useState } from "react"
import Button from "@/app/components/ui/Button"
import { IoAddOutline } from "react-icons/io5"
import { FaSearch, FaFilter } from "react-icons/fa"
import StatusCards from "./component/StatusCards"
import ScheduleTable from "./component/ScheduleTable"
import QueueStates from "./component/QueueStates"
import LatestPatient from "./component/LatestPatient"
import { useAppointments } from "@/hooks/useAppointments"
import useAppointmentsUiStore from "@/store/appointmentsUiStore"
import AppoinmentsModle from "./component/AppoinmentsModle"

// Overlay similar to Services page for modals/filters (mobile only)
function Overlay({ show, onClick }) {
    if (!show) return null;
    return (
        <div
            className="fixed z-30 inset-0 bg-black/40 md:hidden"
            onClick={onClick}
        />
    )
}

function getUniqueValues(data, key) {
    return Array.from(new Set(data.map(item => item[key]).filter(Boolean)))
}

function Appointments() {
    const { data: appointments = [], isLoading, error } = useAppointments()
    const {
        search,
        setSearch,
        isModalOpen,
        editingAppointment,
        openCreateModal,
        openEditModal,
        closeModal
    } = useAppointmentsUiStore()

    // Primary filter state
    const [statusFilter, setStatusFilter] = useState("")
    const [visitTypeFilter, setVisitTypeFilter] = useState("")
    const [serviceTypeFilter, setServiceTypeFilter] = useState("")

    // Temp state for filter modal
    const [filtersOpen, setFiltersOpen] = useState(false)
    const [tempStatus, setTempStatus] = useState(statusFilter || "")
    const [tempVisitType, setTempVisitType] = useState(visitTypeFilter || "")
    const [tempServiceType, setTempServiceType] = useState(serviceTypeFilter || "")

    // For Overlay (any modal/filter open)
    const isAnyOverlayOpen = isModalOpen || filtersOpen

    // Get unique values for selection options
    const visitTypes = useMemo(() => getUniqueValues(appointments, "visitType"), [appointments])
    const serviceTypes = useMemo(() => getUniqueValues(appointments, "serviceType"), [appointments])
    const statusTypes = useMemo(() => getUniqueValues(appointments, "status"), [appointments])

    // Filtering logic
    const filtered = useMemo(() => {
        let result = [...appointments]
        if (search.trim()) {
            result = result.filter(a =>
                (a.patientName || "").toLowerCase().includes(search.toLowerCase())
            )
        }
        if (visitTypeFilter) {
            result = result.filter(a => a.visitType === visitTypeFilter)
        }
        if (serviceTypeFilter) {
            result = result.filter(a => a.serviceType === serviceTypeFilter)
        }
        if (statusFilter) {
            result = result.filter(a => a.status === statusFilter)
        }
        return result
    }, [appointments, search, visitTypeFilter, serviceTypeFilter, statusFilter])

    // derive counts from real data for StatusCards
    const counts = useMemo(() => ({
        total: appointments.length,
        waiting: appointments.filter(a => a.status === "waiting").length,
        completed: appointments.filter(a => a.status === "completed").length,
        canceled: appointments.filter(a => a.status === "canceled").length,
    }), [appointments])

    // Handlers for opening filters and applying/canceling
    const handleOpenFilters = () => {
        setTempVisitType(visitTypeFilter || "")
        setTempServiceType(serviceTypeFilter || "")
        setTempStatus(statusFilter || "")
        setFiltersOpen(true)
    }
    const handleApplyFilters = () => {
        setVisitTypeFilter(tempVisitType)
        setServiceTypeFilter(tempServiceType)
        setStatusFilter(tempStatus)
        setFiltersOpen(false)
    }
    const handleClearFilters = () => {
        setTempVisitType("")
        setTempServiceType("")
        setTempStatus("")
    }

    return (
        <section>
            <Overlay
                show={isAnyOverlayOpen}
                onClick={() => {
                    if (isModalOpen) closeModal();
                    if (filtersOpen) setFiltersOpen(false);
                }}
            />

            <StatusCards counts={counts} />

            <div className="bg-(--main-color) p-3 rounded-lg my-5">
                {/* Heading */}
                <div className="mb-5 gap-4">
                    <div>
                        <h1 className="text-(--text-color) font-semibold text-2xl">Appointments Management</h1>
                        <p className="text-(--p-color) text-sm">Manage and configure all your Appointments</p>
                    </div>
                    {/* Search bar */}
                    <div className="flex items-center gap-2 mt-5 px-3 bg-(--bg-color) w-full sm:w-[280px] h-[38px] rounded-md border border-(--text-color)/20 mb-3">
                        <FaSearch className="text-(--text-color)/40 text-sm shrink-0" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search patient…"
                            className="w-full h-full focus:outline-none text-(--text-color) text-sm bg-transparent"
                        />
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <div className="hidden md:flex items-center gap-3 mb-2">
                            {/* Visit Type Filter */}
                            <select
                                value={visitTypeFilter}
                                onChange={e => setVisitTypeFilter(e.target.value)}
                                className="px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color) bg-(--bg-color) text-(--text-color) focus:outline-none"
                            >
                                <option value="">All Visit Types</option>
                                {visitTypes.map(type => (
                                    <option value={type} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>

                            {/* Service Type Filter */}
                            <select
                                value={serviceTypeFilter}
                                onChange={e => setServiceTypeFilter(e.target.value)}
                                className="px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color) bg-(--bg-color) text-(--text-color) focus:outline-none"
                            >
                                <option value="">All Services</option>
                                {serviceTypes.map(type => (
                                    <option value={type} key={type}>{type}</option>
                                ))}
                            </select>

                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color) bg-(--bg-color) text-(--text-color) focus:outline-none"
                            >
                                <option value="">All Statuses</option>
                                {statusTypes.map(type => (
                                    <option value={type} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        {/* Create btn */}
                        <Button
                            text="Create Appointment"
                            icon={<IoAddOutline />}
                            onClick={openCreateModal}
                            className="w-full xs:w-auto"
                        />
                        <div className="w-full block md:hidden ">
                            {/* Filters btn */}
                            <Button
                                text="Filters"
                                icon={<FaFilter />}
                                onClick={handleOpenFilters}
                                variant="secondary"

                            />
                        </div>
                    </div>
                </div>

                {/* Filters Modal for mobile */}
                {filtersOpen && (
                    <div className="fixed inset-0 z-40 flex items-center justify-center md:hidden">
                        <div className="bg-(--bg-color) w-[90vw] max-w-xs rounded-lg shadow-lg p-5 relative z-50">
                            <h3 className="text-lg font-semibold mb-4 text-(--text-color)">Filter Appointments</h3>

                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="block text-sm mb-1 text-(--text-color)">Visit Type</label>
                                    <select
                                        value={tempVisitType}
                                        onChange={e => setTempVisitType(e.target.value)}
                                        className="w-full px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color)"
                                    >
                                        <option value="">All Visit Types</option>
                                        {visitTypes.map(type => (
                                            <option value={type} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-(--text-color)">Service Type</label>
                                    <select
                                        value={tempServiceType}
                                        onChange={e => setTempServiceType(e.target.value)}
                                        className="w-full px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color)"
                                    >
                                        <option value="">All Services</option>
                                        {serviceTypes.map(type => (
                                            <option value={type} key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1 text-(--text-color)">Status</label>
                                    <select
                                        value={tempStatus}
                                        onChange={e => setTempStatus(e.target.value)}
                                        className="w-full px-2 py-1 border border-(--p-color) rounded text-sm bg-(--main-color)"
                                    >
                                        <option value="">All Statuses</option>
                                        {statusTypes.map(type => (
                                            <option value={type} key={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between gap-2 mt-6">
                                <button
                                    className="flex-1 text-(--p-color) py-1 rounded border bg-(--main-color) border-(--p-color) cursor-pointer"
                                    onClick={handleClearFilters}
                                    type="button"
                                >Clear</button>
                                <button
                                    className="flex-1 py-1 rounded text-(--text-color) font-semibold bg-(--second-color) cursor-pointer"
                                    onClick={handleApplyFilters}
                                    type="button"
                                >Apply Filters</button>
                            </div>
                        </div>
                    </div>
                )}

                {isLoading && <p className="text-(--text-color)/50 p-5">Loading...</p>}
                {error && <p className="text-red-500 p-5">{error.message}</p>}
                {!isLoading && !error && (
                    <div className="overflow-x-auto rounded-lg mt-3">
                        <ScheduleTable appointments={filtered} onEdit={openEditModal} />
                    </div>
                )}
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-3 flex-wrap">
                <QueueStates appointments={appointments} />
                <LatestPatient />
            </div>

            <AppoinmentsModle
                isOpen={isModalOpen}
                onClose={closeModal}
                appointment={editingAppointment}
            />
        </section>
    )
}

export default Appointments