import { useQuery } from "@tanstack/react-query";
import axios from "axios"

type Users = {
    id?: string;
    name: string;
    email: string;
    number: string
    image: string;
  }

const fetchUsers = async (endPoint: string): Promise<Users[]> => {
    try {
        const response = await axios.get(endPoint)
        console.log('response fulfilled')
        return response.data
    } catch (error) {
        console.log('fetch faild', error)
        return []
    }
}

export const useGetUsersQuery = (endPoint: string) => {

    return useQuery({
        queryKey: ['all-users'],
        queryFn: () => fetchUsers(endPoint)
    })
}