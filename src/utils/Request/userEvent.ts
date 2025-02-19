import axiosInstance from "./axios";

// Create an event
export const createEvent = async (eventData: any) => {
  try {
    const response = await axiosInstance.post("/events", eventData);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Retrieve all events
export const getEvents = async () => {
  try {
    const response = await axiosInstance.get("/events");
    return response.data;
  } catch (error) {
    console.error("Error getting events:", error);
    throw error;
  }
};

// Delete a single event by id
export const deleteEvent = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};

// Update a single event by id
// Note: Ensure the `Event` type/interface is defined elsewhere in your codebase
export const updateEvent = async (id: string, event: Event) => {
  try {
    const response = await axiosInstance.put(`/events/${id}`, event);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
