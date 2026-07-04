import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServices, createService, deleteServiceApi, updateServiceApi } from "@/lib/servicesApi";

export function useServices() {
    return useQuery({
        queryKey: ["services"],
        queryFn: getServices,
    });
}

export function useCreateService() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
}

export function useDeleteService() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteServiceApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
}

export function useUpdateService() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updateServiceApi(id, updatedFields),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
}