import axiosInstance from "./axios";

type User = {
  email: string;
  fullName: string;
  password: string;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const signup = async (user: User) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      ...user,
      name: user.fullName,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};
