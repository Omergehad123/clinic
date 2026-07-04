"use client"
import { useMemo, useState } from "react"
import Button from "@/app/components/ui/Button"
import { FaSearch, FaFilter } from "react-icons/fa"
import { IoAddOutline } from "react-icons/io5"
import UsersTable from "./component/UsersTable"
import UserModal from "./component/UserModal"
import UserProfile from "./[userId]/page"
import { useUsers } from "@/hooks/useUsers"
import useUsersUiStore from "@/store/usersUiStore"

function UsersPage() {
    const { data: users = [], isLoading, error } = useUsers()
    const {
        search, roleFilter, statusFilter, sortBy,
        setSearch, setRoleFilter, setStatusFilter, setSortBy,
        isModalOpen, editingUser, openCreateModal, openEditModal, closeModal,
        viewingUserId, viewUser
    } = useUsersUiStore()
    
    // State for filters modal in small screens
    const [showFilters, setShowFilters] = useState(false)
    // Local state to buffer temp filter values before saving
    const [localFilters, setLocalFilters] = useState({
        search: search,
        roleFilter: roleFilter,
        statusFilter: statusFilter,
        sortBy: sortBy
    })

    // Sync global store with local filters when modal opens
    const openFiltersModal = () => {
        setLocalFilters({
            search,
            roleFilter,
            statusFilter,
            sortBy
        })
        setShowFilters(true)
    }

    const handleLocalFiltersChange = e => {
        const { name, value } = e.target
        setLocalFilters(prev => ({ ...prev, [name]: value }))
    }

    const applyFilters = () => {
        setSearch(localFilters.search)
        setRoleFilter(localFilters.roleFilter)
        setStatusFilter(localFilters.statusFilter)
        setSortBy(localFilters.sortBy)
        setShowFilters(false)
    }

    const filtered = useMemo(() => {
        let result = [...users]
        if (search.trim()) result = result.filter(u =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        )
        if (roleFilter) result = result.filter(u => u.role === roleFilter)
        if (statusFilter) result = result.filter(u => u.status === statusFilter)
        if (sortBy === "Name A–Z") result.sort((a, b) => a.name.localeCompare(b.name))
        if (sortBy === "Name Z–A") result.sort((a, b) => b.name.localeCompare(a.name))
        return result
    }, [users, search, roleFilter, statusFilter, sortBy])

    // ← if a user is selected, show profile instead of the table
    if (viewingUserId) return <UserProfile />

    return (
        <section className="relative">
            <div className="bg-(--main-color) p-3 rounded-lg mb-5">
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h1 className="text-(--text-color) font-semibold text-2xl">Users Management</h1>
                        <p className="text-(--p-color) text-sm">Manage and configure all your users</p>
                    </div>
                </div>

                {/* Responsive filter and controls */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    {/* Search bar: always visible */}
                    <form
                        onSubmit={e => e.preventDefault()}
                        className="flex items-center gap-2 px-3 bg-(--bg-color) w-full md:w-[280px] h-[34px] rounded-md border border-(--text-color)/20"
                    >
                        <FaSearch className="text-(--text-color)/40 text-sm shrink-0" />
                        <input
                            type="text"
                            placeholder="Search user…"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full h-full focus:outline-none text-(--text-color) text-sm bg-transparent"
                        />
                    </form>

                    {/* Large screen filters inline */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative">
                            <select
                                value={roleFilter}
                                onChange={e => setRoleFilter(e.target.value)}
                                className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color)"
                            >
                                <option value="">All roles</option>
                                <option value="admin">Admin</option>
                                <option value="assistant">Assistant</option>
                                <option value="finance">Finance</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                        </div>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={e => setStatusFilter(e.target.value)}
                                className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color)"
                            >
                                <option value="">All statuses</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                        </div>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                className="appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color)"
                            >
                                <option value="">Sort by</option>
                                <option>Name A–Z</option>
                                <option>Name Z–A</option>
                            </select>
                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                        </div>
                        <Button text="Add User" icon={<IoAddOutline />} onClick={openCreateModal} />
                    </div>

                    {/* Small screen: Add User and Filters button */}
                    <div className="flex md:hidden items-center gap-2">
                        <Button text="Add User" icon={<IoAddOutline />} onClick={openCreateModal} className="w-full" />
                        <Button
                            text="Filters"
                            icon={<FaFilter />}
                            onClick={openFiltersModal}
                            className="w-full"
                            variant="outline"
                        />
                    </div>
                </div>
            </div>

            {/* Small Screen Filters Modal/Sheet */}
            {showFilters && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-(--main-color) p-6 rounded-xl w-[90vw] max-w-[400px] mx-auto relative shadow-xl flex flex-col gap-4 animate-popIn border border-(--text-color)/20">
                        <h2 className="text-xl font-semibold text-(--text-color) mb-2">Filters</h2>
                        <form
                            onSubmit={e => {
                                e.preventDefault()
                                applyFilters()
                            }}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <label className="block text-(--text-color) text-xs mb-1">Search</label>
                                <input
                                    type="text"
                                    name="search"
                                    placeholder="Search user…"
                                    value={localFilters.search}
                                    onChange={handleLocalFiltersChange}
                                    className="w-full px-3 h-[34px] rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-(--text-color) text-xs mb-1">Role</label>
                                <select
                                    name="roleFilter"
                                    value={localFilters.roleFilter}
                                    onChange={handleLocalFiltersChange}
                                    className="w-full appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none"
                                >
                                    <option value="">All roles</option>
                                    <option value="admin">Admin</option>
                                    <option value="assistant">Assistant</option>
                                    <option value="finance">Finance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-(--text-color) text-xs mb-1">Status</label>
                                <select
                                    name="statusFilter"
                                    value={localFilters.statusFilter}
                                    onChange={handleLocalFiltersChange}
                                    className="w-full appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none"
                                >
                                    <option value="">All statuses</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-(--text-color) text-xs mb-1">Sort by</label>
                                <select
                                    name="sortBy"
                                    value={localFilters.sortBy}
                                    onChange={handleLocalFiltersChange}
                                    className="w-full appearance-none h-[34px] pl-3 pr-8 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none"
                                >
                                    <option value="">Sort by</option>
                                    <option>Name A–Z</option>
                                    <option>Name Z–A</option>
                                </select>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <Button
                                    type="submit"
                                    text="Apply Filters"
                                    icon={<FaFilter />}
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    text="Cancel"
                                    onClick={() => setShowFilters(false)}
                                    className="flex-1"
                                    variant="outline"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isLoading && <p className="text-(--text-color)/50 p-5">Loading...</p>}
            {error && <p className="text-red-500 p-5">{error.message}</p>}
            {!isLoading && !error && (
                <UsersTable users={filtered} onEdit={openEditModal} onView={viewUser} />
            )}

            <UserModal isOpen={isModalOpen} onClose={closeModal} user={editingUser} />
        </section>
    )
}

export default UsersPage