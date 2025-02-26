import axios from "axios"


type Users = {
    id?: string;
    name: string;
    email: string;
    number: string
    image: string;
  }


export const getUsersByAxios = async (endPoint: string): Promise<Users[]> => {

    try {
        const response = await axios.get(endPoint)
        console.log('response fulfilled')
        return response.data

    } catch (error) {
        console.log('fetch faild', error)
        return []
    }
}