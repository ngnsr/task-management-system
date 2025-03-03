import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
}

// Explicitly define the return types
export const getTask = (id: string): Promise<{ data: Task }> =>
  API.get(`/tasks/${id}`);

export const updateTaskStatus = (id: string, status: string): Promise<void> =>
  API.patch(`/tasks/${id}`, { status });
