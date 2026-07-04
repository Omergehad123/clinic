import { create } from "zustand";

const useServicesUiStore = create((set) => ({
    search: "",
    category: "",
    status: "",
    sortBy: "",
    isModalOpen: false,
    editingService: null,

    setSearch: (search) => set({ search }),
    setCategory: (category) => set({ category }),
    setStatus: (status) => set({ status }),
    setSortBy: (sortBy) => set({ sortBy }),

    openCreateModal: () => set({ isModalOpen: true, editingService: null }),
    openEditModal: (service) => set({ isModalOpen: true, editingService: service }),
    closeModal: () => set({ isModalOpen: false, editingService: null }),
}));

export default useServicesUiStore;