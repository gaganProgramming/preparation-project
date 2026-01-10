import { useState } from 'react';
import type { Task, CreateTaskPayload } from '../../types/task';
import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../store/api/taskApi';

/**
 * ViewModel hook for TaskManager component
 * Encapsulates all business logic, state management, and API interactions
 */
export const useTaskManager = () => {
    // RTK Query hooks
    const { data: tasks = [], isLoading, error } = useGetTasksQuery();
    const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
    const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
    const [deleteTask] = useDeleteTaskMutation();

    // Local UI state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Handlers
    const handleOpenAddForm = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const handleOpenEditForm = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setEditingTask(null);
    };

    const handleSubmit = async (data: CreateTaskPayload) => {
        try {
            if (editingTask) {
                // Update existing task
                await updateTask({
                    id: editingTask.id,
                    title: data.title,
                    description: data.description,
                }).unwrap();
            } else {
                // Add new task
                await addTask(data).unwrap();
            }
            handleCloseForm();
        } catch (err) {
            console.error('Failed to save task:', err);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setDeletingId(id);
            try {
                await deleteTask({ id }).unwrap();
            } catch (err) {
                console.error('Failed to delete task:', err);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleToggleComplete = async (task: Task) => {
        setUpdatingId(task.id);
        try {
            await updateTask({
                id: task.id,
                completed: !task.completed,
            }).unwrap();
        } catch (err) {
            console.error('Failed to update task:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    // Computed values
    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    // Error message extraction
    const errorMessage = error
        ? 'status' in error
            ? `Error: ${error.status}`
            : 'An error occurred'
        : null;

    return {
        // Data
        tasks,
        isLoading,
        error: errorMessage,

        // Computed
        completedCount,
        pendingCount,

        // UI State
        isFormOpen,
        editingTask,
        deletingId,
        updatingId,

        // Mutation loading states
        isAdding,
        isUpdating,

        // Handlers
        handleOpenAddForm,
        handleOpenEditForm,
        handleCloseForm,
        handleSubmit,
        handleDelete,
        handleToggleComplete,
    };
};
