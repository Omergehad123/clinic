import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPatients, getPatientById, createPatientApi, updatePatientApi, deletePatientApi } from "@/lib/patientsApi";

export function usePatients() {
    return useQuery({ queryKey: ["patients"], queryFn: getPatients });
}

export function usePatient(id) {
    return useQuery({
        queryKey: ["patients", id],
        queryFn: () => getPatientById(id),
        enabled: Boolean(id),
    });
}

export function useCreatePatient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createPatientApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
    });
}

export function useUpdatePatient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updatePatientApi(id, updatedFields),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
    });
}

export function useDeletePatient() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deletePatientApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
    });
}