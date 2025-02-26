import axios from "axios"
import { getUsersByAxios } from "./getUsersByAxios";

export const deleteUserByAxios = async (endPoint: string, userId: string) => {
    try {
        await axios.delete(`${endPoint}/${userId}`);
        const updatedUsers = getUsersByAxios(endPoint);
        return updatedUsers;

    } catch (error) {
        console.log("Failed to delete user", error);
        return null;
    }
};