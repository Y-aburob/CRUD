import axios from "axios";
import { getUsersByAxios } from "../axiosMethod/getUsersByAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteUser = async ({ endPoint, userId }: { endPoint: string; userId: string }) => {
    try {
        await axios.delete(`${endPoint}/${userId}`);
        const updatedUsers = await getUsersByAxios(endPoint);
        return updatedUsers;
    } catch (error) {
        console.error("Failed to delete user", error);
        return null;
    }
};

export const useDeleteUser = (endPoint: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["delete-user"],
        mutationFn: ({ userId }: { userId: string }) => deleteUser({ endPoint, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] });
        },onError: (error) => {
            console.error('Error deleting user:', error);
        }
    });
};