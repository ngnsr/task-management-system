import { create } from "zustand";
import { taskService, groupService } from "../services/api";
import {
  Task,
  Group,
  TaskStatus,
  CreateTaskDto,
  UpdateTaskDto,
  CreateGroupDto,
} from "../types";

interface TaskState {
  // Task state
  tasks: Task[];
  selectedTask: Task | null;
  isLoading: boolean;
  error: string | null;

  // Group state
  groups: Group[];
  selectedGroup: Group | null;

  // Filters
  filterStatus: TaskStatus | null;
  filterSearchTerm: string;

  // Actions - Tasks
  fetchTasks: () => Promise<void>;
  fetchTasksByGroup: (groupId: string) => Promise<void>;
  getTaskById: (taskId: string) => Promise<void>;
  createTask: (task: CreateTaskDto) => Promise<void>;
  updateTask: (taskId: string, task: UpdateTaskDto) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;

  // Actions - Groups
  fetchGroups: () => Promise<void>;
  getGroupById: (groupId: string) => Promise<void>;
  createGroup: (group: CreateGroupDto) => Promise<void>;
  updateGroup: (groupId: string, group: CreateGroupDto) => Promise<void>;
  deleteGroup: (groupId: string) => Promise<void>;

  // Filters
  setFilterStatus: (status: TaskStatus | null) => void;
  setFilterSearchTerm: (term: string) => void;
  clearFilters: () => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  // Initial state
  tasks: [],
  selectedTask: null,
  isLoading: false,
  error: null,
  groups: [],
  selectedGroup: null,
  filterStatus: null,
  filterSearchTerm: "",

  // Task actions
  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getAllTasks();
      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch tasks",
        isLoading: false,
      });
    }
  },

  fetchTasksByGroup: async (groupId: string) => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await taskService.getTasksByGroup(groupId);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch tasks for this group",
        isLoading: false,
      });
    }
  },

  getTaskById: async (taskId: string) => {
    set({ isLoading: true, error: null });
    try {
      const task = await taskService.getTaskById(taskId);
      set({ selectedTask: task, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch task",
        isLoading: false,
      });
    }
  },

  createTask: async (task: CreateTaskDto) => {
    set({ isLoading: true, error: null });
    try {
      const newTask = await taskService.createTask(task);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create task",
        isLoading: false,
      });
    }
  },

  updateTask: async (taskId: string, task: UpdateTaskDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedTask = await taskService.updateTask(taskId, task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === taskId ? updatedTask : t)),
        selectedTask:
          state.selectedTask?._id === taskId ? updatedTask : state.selectedTask,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update task",
        isLoading: false,
      });
    }
  },

  deleteTask: async (taskId: string) => {
    set({ isLoading: true, error: null });
    try {
      await taskService.deleteTask(taskId);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
        selectedTask:
          state.selectedTask?._id === taskId ? null : state.selectedTask,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete task",
        isLoading: false,
      });
    }
  },

  // Group actions
  fetchGroups: async () => {
    set({ isLoading: true, error: null });
    try {
      const groups = await groupService.getAllGroups();
      set({ groups, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch groups",
        isLoading: false,
      });
    }
  },

  getGroupById: async (groupId: string) => {
    set({ isLoading: true, error: null });
    try {
      const group = await groupService.getGroupById(groupId);
      set({ selectedGroup: group, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch group",
        isLoading: false,
      });
    }
  },

  createGroup: async (group: CreateGroupDto) => {
    set({ isLoading: true, error: null });
    try {
      const newGroup = await groupService.createGroup(group);
      set((state) => ({
        groups: [...state.groups, newGroup],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create group",
        isLoading: false,
      });
    }
  },

  updateGroup: async (groupId: string, group: CreateGroupDto) => {
    set({ isLoading: true, error: null });
    try {
      const updatedGroup = await groupService.updateGroup(groupId, group);
      set((state) => ({
        groups: state.groups.map((g) => (g._id === groupId ? updatedGroup : g)),
        selectedGroup:
          state.selectedGroup?._id === groupId
            ? updatedGroup
            : state.selectedGroup,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update group",
        isLoading: false,
      });
    }
  },

  deleteGroup: async (groupId: string) => {
    set({ isLoading: true, error: null });
    try {
      await groupService.deleteGroup(groupId);
      set((state) => ({
        groups: state.groups.filter((g) => g._id !== groupId),
        selectedGroup:
          state.selectedGroup?._id === groupId ? null : state.selectedGroup,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete group",
        isLoading: false,
      });
    }
  },

  // Filter actions
  setFilterStatus: (status: TaskStatus | null) => set({ filterStatus: status }),
  setFilterSearchTerm: (term: string) => set({ filterSearchTerm: term }),
  clearFilters: () => set({ filterStatus: null, filterSearchTerm: "" }),
}));
