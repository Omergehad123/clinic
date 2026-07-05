import { create } from "zustand";

const usePatientsUiStore = create((set) => ({
    search: "",
    setSearch: (search) => set({ search }),
}));

export default usePatientsUiStore;