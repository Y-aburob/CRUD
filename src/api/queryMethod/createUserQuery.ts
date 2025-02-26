import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type User = {
  id?: string;
  name: string;
  email: string;
  number: string;
  image: string;
};



const createUser = async (endPoint: string, data: User) => {
  try {
    const response = await axios.post(endPoint, data);
    return response.data;
  } catch (error) {
    console.log("Failed to add user", error);
    return null;
  }
};

export const useCreateUser = (endPoint: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-new-user"],
    mutationFn: (data: User) => createUser(endPoint, data),
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] })
      console.log('User created successfully:', newUser);
    },
    onError: (error) => {
      console.error('Error creating user:', error);
    }
  });
};
