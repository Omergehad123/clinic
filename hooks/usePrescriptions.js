import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getPrescriptions, getPrescriptionById,
    createPrescriptionApi, updatePrescriptionApi, deletePrescriptionApi
} from "@/lib/prescriptionsApi";

export function usePrescriptions() {
    return useQuery({ queryKey: ["prescriptions"], queryFn: getPrescriptions });
}

export function usePrescription(id) {
    return useQuery({
        queryKey: ["prescriptions", id],
        queryFn: () => getPrescriptionById(id),
        enabled: Boolean(id),
    });
}

export function useCreatePrescription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPrescriptionApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["prescriptions"] }),
    });
}

export function useUpdatePrescription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updatePrescriptionApi(id, updatedFields),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["prescriptions"] }),
    });
}

export function useDeletePrescription() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePrescriptionApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["prescriptions"] }),
    });
}