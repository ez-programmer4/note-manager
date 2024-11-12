import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Helper function to create an axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle errors
const handleError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  } else if (error.request) {
    console.error("No response from server:", error.request);
    return { status: 500, message: "No response from server" };
  } else {
    console.error("Error:", error.message);
    return { status: 500, message: error.message };
  }
};
// User registration
export const registerUser = async (username, password) => {
  try {
    return await api.post("/users/register", { username, password });
  } catch (error) {
    throw handleError(error);
  }
};

// User login
export const loginUser = async (username, password) => {
  try {
    const response = await api.post("/users/login", { username, password });
    // Store the token upon successful login
    localStorage.setItem("token", response.data.accessToken);
    return response;
  } catch (error) {
    throw handleError(error);
  }
};

// Create a new note
export const createNote = async (notedata) => {
  try {
    return await api.post("/notes", notedata);
  } catch (error) {
    throw handleError(error);
  }
};

// Get notes
export const getNotes = async () => {
  try {
    return await api.get("/notes");
  } catch (error) {
    throw handleError(error);
  }
};

// Get a single note by ID
export const getNote = async (id) => {
  try {
    return await api.get(`/notes/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

// Update a note
export const updateNote = async (id, notedata) => {
  try {
    return await api.put(`/notes/${id}`, notedata);
  } catch (error) {
    throw handleError(error);
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    return await api.delete(`/notes/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};
