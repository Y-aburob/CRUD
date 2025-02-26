import axios from "axios"
import { getUsersByAxios } from "./getUsersByAxios";


type User = {
    id?: string;
    name: string;
    email: string;
    number: string
    image: string;
  }

export const editUserByAxios = async (endPoint: string, userId: string, user: User) => {

    try {
        await axios.put(`${endPoint}/${userId}`, user)
        const newUsersList = await getUsersByAxios(endPoint)
        return newUsersList
    } catch (error) {
        console.log('faild to edit user', error)
        return []
    }
}