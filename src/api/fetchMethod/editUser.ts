type User = {
    id?: string;
    name: string;
    email: string;
    number: string;
    image: string;
  };
  
  type FormInput = {
    userName: string;
    userEmail: string;
    userNumber: string;
    usermage: string;
  };
  
  export const editUser = async (
    endPoint: string,
    userId: string,
    formInput: FormInput
  ): Promise<User | null> => {
    try {
      const response = await fetch(`${endPoint}/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formInput.userName,
          email: formInput.userEmail,
          number: formInput.userNumber,
          image: formInput.usermage,
        }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        return updatedUser;
      } else {
        console.error('Failed to update user');
        return null;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      return null;
    }
  };