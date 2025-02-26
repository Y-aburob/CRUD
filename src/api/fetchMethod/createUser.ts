type User = {
    name: string;
    email: string;
    number: string
    image: string;
  }

  export const createUser = async (endpoint: string, {name, email, number, image}: User): Promise<User | null> => {
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          number: number,
          image: image,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to create user");
      }
  
      const newUser: User = await response.json();
      console.log("fulfilled")
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  };
  