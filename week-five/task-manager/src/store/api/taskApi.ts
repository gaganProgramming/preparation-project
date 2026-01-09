import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Task, CreateTaskPayload, UpdateTaskPayload, DeleteTaskPayload } from '../../types/task';

// Mock data store (simulates a database)
let mockTasks: Task[] = [
    {
        id: '1',
        title: 'Learn RTK Query',
        description: 'Study the RTK Query documentation and build a sample project',
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Build Task Manager',
        description: 'Create a task management component with CRUD operations',
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Setup TypeScript',
        description: 'Configure TypeScript with proper interfaces and types',
        completed: true,
        createdAt: new Date().toISOString(),
    },
];

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Create API slice with mock endpoints
export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        // GET all tasks
        getTasks: builder.query<Task[], void>({
            queryFn: async () => {
                await delay(500); // Simulate network delay
                return { data: [...mockTasks] };
            },
            providesTags: ['Tasks'],
        }),

        // POST - Add new task
        addTask: builder.mutation<Task, CreateTaskPayload>({
            queryFn: async (payload) => {
                await delay(300);
                const newTask: Task = {
                    id: generateId(),
                    title: payload.title,
                    description: payload.description,
                    completed: false,
                    createdAt: new Date().toISOString(),
                };
                mockTasks = [...mockTasks, newTask];
                return { data: newTask };
            },
            invalidatesTags: ['Tasks'],
        }),

        // PUT - Update existing task
        updateTask: builder.mutation<Task, UpdateTaskPayload>({
            queryFn: async (payload) => {
                await delay(300);
                const taskIndex = mockTasks.findIndex((t) => t.id === payload.id);
                if (taskIndex === -1) {
                    return { error: { status: 404, data: 'Task not found' } };
                }
                const updatedTask: Task = {
                    ...mockTasks[taskIndex],
                    ...payload,
                };
                mockTasks = mockTasks.map((t) => (t.id === payload.id ? updatedTask : t));
                return { data: updatedTask };
            },
            invalidatesTags: ['Tasks'],
        }),

        // DELETE - Remove task
        deleteTask: builder.mutation<{ id: string }, DeleteTaskPayload>({
            queryFn: async (payload) => {
                await delay(300);
                const taskExists = mockTasks.some((t) => t.id === payload.id);
                if (!taskExists) {
                    return { error: { status: 404, data: 'Task not found' } };
                }
                mockTasks = mockTasks.filter((t) => t.id !== payload.id);
                return { data: { id: payload.id } };
            },
            invalidatesTags: ['Tasks'],
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} = taskApi;
