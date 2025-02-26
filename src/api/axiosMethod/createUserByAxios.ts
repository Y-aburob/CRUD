import axios from "axios"

type User = {
    id?: string;
    name: string;
    email: string;
    number: string
    image: string;
  }

export const createUserByAxios = async (endPoint: string, data: User): Promise<User | null> => {
    try {
        const response = await axios.post(endPoint, data)
        return response.data
    }
    catch (error) {
        console.log('faild to add user', error)
        return null;
    }
}