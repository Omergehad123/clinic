import { create } from "zustand";

const useUsersUiStore = create((set) => ({
    search: "",
    roleFilter: "",
    statusFilter: "",
    sortBy: "",
    isModalOpen: false,
    editingUser: null,
    viewingUserId: null, // ← store just the id, not the whole object

    setSearch: (search) => set({ search }),
    setRoleFilter: (roleFilter) => set({ roleFilter }),
    setStatusFilter: (statusFilter) => set({ statusFilter }),
    setSortBy: (sortBy) => set({ sortBy }),

    openCreateModal: () => set({ isModalOpen: true, editingUser: null }),
    openEditModal: (user) => set({ isModalOpen: true, editingUser: user }),
    closeModal: () => set({ isModalOpen: false, editingUser: null }),

    viewUser: (id) => set({ viewingUserId: id }),     // ← set id to view
    closeProfile: () => set({ viewingUserId: null }), // ← clear to go back
}));

export default useUsersUiStore;