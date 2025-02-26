type User = {
  id: string;
  name: string;
  email: string;
  number: string
  image: string;
}
export const getUsers = async (endPoint: string): Promise<User[]> => {

  try {
    const response = await fetch(endPoint, { method: 'GET' });

    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log('Error:', error);
    return []
  }
};
