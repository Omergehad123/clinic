"use client"
import { useMemo, useState } from "react"
import Button from "@/app/components/ui/Button"
import { FaSearch, FaFilter } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import ServicesTable from "./component/ServicesTable";
import ServiceModal from "./component/ServiceModal";
import { useServices } from "@/hooks/useServices";
import useServicesUiStore from "@/store/servicesUiStore";
import { HashLoader } from "react-spinners";

// Overlay for modals (mobile only)
function Overlay({ show, onClick }) {
    if (!show) return null;
    return (
        <div
            className="fixed z-30 inset-0 bg-black/40 md:hidden"
            onClick={onClick}
        />
    );
}

function ServicesPage() {
    const { data: services = [], isLoading, error } = useServices();
    const {
        search, category, status, sortBy,
        setSearch, setCategory, setStatus, setSortBy,
        isModalOpen, editingService, openCreateModal, openEditModal, closeModal
    } = useServicesUiStore();

    // Mobile filters state
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [tempCategory, setTempCategory] = useState(category || "");
    const [tempStatus, setTempStatus] = useState(status || "");
    const [tempSortBy, setTempSortBy] = useState(sortBy || "");

    const handleOpenFilters = () => {
        setTempCategory(category || "");
        setTempStatus(status || "");
        setTempSortBy(sortBy || "");
        setFiltersOpen(true);
    };

    const handleApplyFilters = () => {
        setCategory(tempCategory);
        setStatus(tempStatus);
        setSortBy(tempSortBy);
        setFiltersOpen(false);
    };

    const isAnyOverlayOpen = (isModalOpen || filtersOpen);

    const filteredServices = useMemo(() => {
        let result = [...services];
        if (search.trim()) {
            result = result.filter(s => s.title?.toLowerCase().includes(search.toLowerCase()))
        }
        if (category) {
            result = result.filter(s => s.category === category)
        }
        if (status) {
            result = result.filter(s => s.status === status.toLowerCase())
        }
        if (sortBy === "Name A–Z") {
            result.sort((a, b) => a.title?.localeCompare(b.title))
        } else if (sortBy === "Name Z–A") {
            result.sort((a, b) => b.title?.localeCompare(a.title))
        } else if (sortBy === "Newest first") {
            result.sort((a, b) => b.id - a.id)
        } else if (sortBy === "Oldest first") {
            result.sort((a, b) => a.id - b.id)
        }
        return result;
    }, [services, search, category, status, sortBy]);

    return (
        <section className="relative">
            <Overlay
                show={isAnyOverlayOpen}
                onClick={() => {
                    if (isModalOpen) closeModal();
                    if (filtersOpen) setFiltersOpen(false);
                }}
            />

            {isLoading && (
                <p className="text-(--main-color) text-2xl font-semibold p-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <HashLoader color="#2563eb" />
                </p>
            )}
            {error && <p className="text-red-500 p-5">{error.message}</p>}
            {!isLoading && !error && (
                <>
                    <div className="bg-(--main-color) p-3 rounded-lg mb-5">
                        <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                            <div>
                                <h1 className="text-(--text-color) font-semibold text-2xl">Services Management</h1>
                                <p className="text-(--p-color) text-sm">Manage and configure all your services</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-wrap">
                            {/* Search bar */}
                            <form
                                onSubmit={e => e.preventDefault()}
                                className="flex items-center gap-2 px-3 bg-(--bg-color) w-full sm:w-[280px] h-[38px] rounded-md border border-(--text-color)/20"
                            >
                                <FaSearch className="text-(--text-color)/40 text-sm shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search service…"
                                    className="w-full h-full focus:outline-none text-(--text-color) text-sm bg-transparent"
                                />
                            </form>
                            {/* DESKTOP (all filters and create inline, old style) */}
                            <div className="hidden md:flex items-center justify-between gap-3 flex-wrap mt-2">
                                <div className="flex items-center gap-5">
                                    <div className="relative">
                                        <select value={category} onChange={e => setCategory(e.target.value)} className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors">
                                            <option value="">All categories</option>
                                            <option>Cardiology</option>
                                            <option>Dermatology</option>
                                            <option>Neurology</option>
                                            <option>Orthopedics</option>
                                            <option>General</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                                    </div>
                                    <div className="relative">
                                        <select value={status} onChange={e => setStatus(e.target.value)} className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors">
                                            <option value="">All statuses</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                                    </div>
                                    <div className="relative">
                                        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors">
                                            <option value="">Sort by</option>
                                            <option>Name A–Z</option>
                                            <option>Name Z–A</option>
                                            <option>Newest first</option>
                                            <option>Oldest first</option>
                                        </select>
                                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                                    </div>
                                    <Button
                                        text="Create Service"
                                        icon={<IoAddOutline />}
                                        className="whitespace-nowrap"
                                        onClick={openCreateModal}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex md:hidden flex-wrap items-center gap-2 mt-2 mb-1">
                            <Button
                                text="Create Service"
                                icon={<IoAddOutline />}
                                className="whitespace-nowrap"
                                onClick={openCreateModal}
                            />
                            {/* Only show the filters btn on xs/sm screens */}
                            <Button
                                text="Filters"
                                icon={<FaFilter />}
                                className="bg-(--bg-color) border border-(--text-color)/20 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-(--border)"
                                onClick={handleOpenFilters}
                            />
                        </div>

                        {/* FILTERS PANEL - Only on mobile */}
                        <div className={`fixed z-40 left-1/2 top-1/2 w-[95vw] max-w-xs p-5 bg-(--main-color) rounded-xl border border-(--border) shadow-xl
                            transition-all duration-200
                            md:hidden
                            ${filtersOpen ? 'opacity-100 pointer-events-auto scale-100 translate-x-[-50%] translate-y-[-50%]' : 'opacity-0 pointer-events-none scale-95 translate-x-[-50%] translate-y-[-50%]'}
                        `}>
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-(--text-color) text-lg font-semibold">Filters</h2>
                                <button
                                    type="button"
                                    className="ml-2 text-xl bg-transparent border-none text-gray-500 hover:text-(--second-color)"
                                    onClick={() => setFiltersOpen(false)}
                                    aria-label="Close"
                                >×</button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <div>
                                    <label className="block text-xs text-(--text-color) mb-1">Category</label>
                                    <select
                                        value={tempCategory}
                                        onChange={e => setTempCategory(e.target.value)}
                                        className="appearance-none w-full h-[38px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors"
                                    >
                                        <option value="">All categories</option>
                                        <option>Cardiology</option>
                                        <option>Dermatology</option>
                                        <option>Neurology</option>
                                        <option>Orthopedics</option>
                                        <option>General</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-(--text-color) mb-1">Status</label>
                                    <select
                                        value={tempStatus}
                                        onChange={e => setTempStatus(e.target.value)}
                                        className="appearance-none w-full h-[38px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors"
                                    >
                                        <option value="">All statuses</option>
                                        <option>Active</option>
                                        <option>Inactive</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-(--text-color) mb-1">Sort by</label>
                                    <select
                                        value={tempSortBy}
                                        onChange={e => setTempSortBy(e.target.value)}
                                        className="appearance-none w-full h-[38px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color) transition-colors"
                                    >
                                        <option value="">Sort by</option>
                                        <option>Name A–Z</option>
                                        <option>Name Z–A</option>
                                        <option>Newest first</option>
                                        <option>Oldest first</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end mt-5 gap-2">
                                <Button
                                    text="Cancel"
                                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md font-semibold border border-gray-200 hover:bg-gray-100"
                                    onClick={() => setFiltersOpen(false)}
                                />
                                <Button
                                    text="Apply Filters"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700"
                                    onClick={handleApplyFilters}
                                />
                            </div>
                        </div>
                    </div>
                    <ServicesTable services={filteredServices} onEdit={openEditModal} />
                </>
            )}

            <ServiceModal isOpen={isModalOpen} onClose={closeModal} service={editingService} />
        </section>
    );
}

export default ServicesPage