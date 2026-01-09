import { useState } from 'react';
import type { Task, CreateTaskPayload } from '../../types/task';
import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../store/api/taskApi';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import './TaskManager.css';

export const TaskManager = () => {
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

    // Calculate stats
    const completedCount = tasks.filter((t) => t.completed).length;
    const pendingCount = tasks.length - completedCount;

    // Error message extraction
    const errorMessage = error
        ? 'status' in error
            ? `Error: ${error.status}`
            : 'An error occurred'
        : null;

    return (
        <div className="task-manager">
            <header className="task-manager-header">
                <div className="header-content">
                    <h1>Task Manager</h1>
                    <p className="header-subtitle">Manage your tasks efficiently</p>
                </div>
                <button className="btn btn-primary btn-add" onClick={handleOpenAddForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Task
                </button>
            </header>

            {/* Stats Bar */}
            {tasks.length > 0 && (
                <div className="stats-bar">
                    <div className="stat">
                        <span className="stat-value">{tasks.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat completed">
                        <span className="stat-value">{completedCount}</span>
                        <span className="stat-label">Completed</span>
                    </div>
                    <div className="stat pending">
                        <span className="stat-value">{pendingCount}</span>
                        <span className="stat-label">Pending</span>
                    </div>
                </div>
            )}

            {/* Task List */}
            <TaskList
                tasks={tasks}
                isLoading={isLoading}
                error={errorMessage}
                onEdit={handleOpenEditForm}
                onDelete={handleDelete}
                onToggleComplete={handleToggleComplete}
                deletingId={deletingId}
                updatingId={updatingId}
            />

            {/* Add/Edit Form Modal */}
            {isFormOpen && (
                <TaskForm
                    onSubmit={handleSubmit}
                    onCancel={handleCloseForm}
                    initialData={editingTask}
                    isLoading={isAdding || isUpdating}
                />
            )}
        </div>
    );
};
