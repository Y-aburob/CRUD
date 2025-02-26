type User = {
    id?: string;
    name: string;
    email: string;
    number: string;
    image: string;
  };
  
  export const deleteUser = async (endPoint: string, users: User[], userId: string) => {
    try {
      const response = await fetch(`${endPoint}/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        const newUsersList = users.filter(user => user.id !== userId);
        return newUsersList;
      } else {
        console.log('Failed to delete user');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };