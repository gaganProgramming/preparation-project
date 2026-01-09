import type { Task } from '../../types/task';
import './TaskManager.css';

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (task: Task) => void;
    isDeleting: boolean;
    isUpdating: boolean;
}

export const TaskItem = ({
    task,
    onEdit,
    onDelete,
    onToggleComplete,
    isDeleting,
    isUpdating,
}: TaskItemProps) => {
    const isLoading = isDeleting || isUpdating;

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''} ${isLoading ? 'loading' : ''}`}>
            <div className="task-content">
                <div className="task-header">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => onToggleComplete(task)}
                            disabled={isLoading}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
                        {task.title}
                    </h3>
                </div>
                <p className="task-description">{task.description}</p>
                <span className="task-date">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                </span>
            </div>
            <div className="task-actions">
                <button
                    className="btn btn-edit"
                    onClick={() => onEdit(task)}
                    disabled={isLoading}
                    title="Edit task"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                </button>
                <button
                    className="btn btn-delete"
                    onClick={() => onDelete(task.id)}
                    disabled={isLoading}
                    title="Delete task"
                >
                    {isDeleting ? (
                        <span className="spinner-small"></span>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};
