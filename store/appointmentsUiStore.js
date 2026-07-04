import { create } from "zustand";

const useAppointmentsUiStore = create((set) => ({
    search: "",
    statusFilter: "",
    isModalOpen: false,
    editingAppointment: null,

    setSearch: (search) => set({ search }),
    setStatusFilter: (statusFilter) => set({ statusFilter }),

    openCreateModal: () => set({ isModalOpen: true, editingAppointment: null }),
    openEditModal: (appointment) => set({ isModalOpen: true, editingAppointment: appointment }),
    closeModal: () => set({ isModalOpen: false, editingAppointment: null }),
}));

export default useAppointmentsUiStore;