import { useAppDispatch } from "../../hooks/reduxHooks";
import { updateUser } from "../../redux/reducer/user/userSlice";
import axiosInstance from "./axios";
import Cookie from "js-cookie";

type User = {
  email: string;
  fullName: string;
  password: string;
};

const dispatch = useAppDispatch();

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const { user, token } = response.data;
    dispatch(updateUser({ ...user }));
    Cookie.set("jwt", token, { expires: 1 });
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");
    dispatch(
      updateUser({
        email: "",
        name: "",
        event: [],
        id: "",
      })
    );
    Cookie.remove("jwt");
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
