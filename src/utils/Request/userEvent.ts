import axiosInstance from "./axios";
import { Event, EventContent } from "../../redux/reducer/user/userSlice";
export const createEvent = async (eventData: any) => {
  try {
    const response = await axiosInstance.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axiosInstance.get("/events");
    return response.data.data;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

export const updateEvent = async (id: string, event: Event) => {
  try {
    const response = await axiosInstance.put(`/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const getOneEvent = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/events/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error getting one event", event);
    throw error;
  }
};
export const inviteUser = async (email: string, id: string) => {
  try {
    const response = await axiosInstance.post(`/events/invite`, {
      email,
      id,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error getting one event", event);
    throw error;
  }
};

export const voteSelection = async (id: string, selection: EventContent[]) => {
  try {
    const response = await axiosInstance.post(`/events/${id}`, selection);
    return response.data;
  } catch (error) {
    console.error("error getting vote", error);
    throw error;
  }
};
