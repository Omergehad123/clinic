import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, getUserById, createUserApi, updateUserApi, deleteUserApi } from "@/lib/usersApi";

export function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });
}

export function useUser(id) {
    return useQuery({
        queryKey: ["users", id],
        queryFn: () => getUserById(id),
        enabled: Boolean(id), // only fetch when id exists
    });
}

export function useCreateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createUserApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updatedFields }) => updateUserApi(id, updatedFields),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteUserApi,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
    });
}