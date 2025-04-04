// src/services/api.ts
import axios from "axios";
import {
  Task,
  Group,
  CreateTaskDto,
  UpdateTaskDto,
  CreateGroupDto,
  UpdateGroupDto,
} from "../types";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Task API calls
export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  getTasksByGroup: async (groupId: string): Promise<Task[]> => {
    const response = await api.get(`/tasks/group/${groupId}`);
    return response.data;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const response = await api.post("/tasks", task);
    return response.data;
  },

  updateTask: async (id: string, task: UpdateTaskDto): Promise<Task> => {
    const response = await api.patch(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};

// Group API calls
export const groupService = {
  getAllGroups: async (): Promise<Group[]> => {
    const response = await api.get("/groups");
    return response.data;
  },

  getGroupById: async (id: string): Promise<Group> => {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  },

  createGroup: async (group: CreateGroupDto): Promise<Group> => {
    const response = await api.post("/groups", group);
    return response.data;
  },

  updateGroup: async (id: string, group: UpdateGroupDto): Promise<Group> => {
    const response = await api.patch(`/groups/${id}`, group);
    return response.data;
  },

  deleteGroup: async (id: string): Promise<void> => {
    await api.delete(`/groups/${id}`);
  },
};
