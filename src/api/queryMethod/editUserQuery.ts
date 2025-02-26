import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";


type User = {
    id?: string;
    name: string;
    email: string;
    number: string
    image: string;
  }

const editUser = async ({endPoint, userId, user}: {endPoint: string, userId: string, user: User}) => {

    try {
        const { data } = await axios.put(`${endPoint}/${userId}`, user)
        return data;
    } catch (error) {
        console.log('faild to edit user', error)
        throw new Error("Edit failed");
    }
}



export const useEditUser = () => {
    
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['edit-user'],
        mutationFn: (editUser),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["all-users"] })
        }
    })
}