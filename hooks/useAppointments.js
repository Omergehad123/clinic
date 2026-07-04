import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAppointments, createAppointment, deleteAppointment, updateAppointment } from "@/lib/appointmentsApi";

export function useAppointments() {
    return useQuery({
        queryKey: ["appointments"],
        queryFn: getAppointments,
    });
}

export function useCreateAppointment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: createAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] })
        }
    })
}

export function useDeleteAppointment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] })
        }
    })
}

export function useUpdateAppointment() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updateAppointment(id, updatedFields),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
    })
}