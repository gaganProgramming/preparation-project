import { useState, useEffect } from 'react';
import type { Task, CreateTaskPayload } from '../../types/task';
import './TaskManager.css';

interface TaskFormProps {
    onSubmit: (data: CreateTaskPayload) => void;
    onCancel: () => void;
    initialData?: Task | null;
    isLoading: boolean;
}

export const TaskForm = ({
    onSubmit,
    onCancel,
    initialData,
    isLoading,
}: TaskFormProps) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

    const isEditMode = !!initialData;

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        }
    }, [initialData]);

    const validate = (): boolean => {
        const newErrors: { title?: string; description?: string } = {};

        if (!title.trim()) {
            newErrors.title = 'Title is required';
        } else if (title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({ title: title.trim(), description: description.trim() });
        }
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
                    <button className="btn-close" onClick={onCancel} disabled={isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="task-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            disabled={isLoading}
                            className={errors.title ? 'error' : ''}
                        />
                        {errors.title && <span className="error-message">{errors.title}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            rows={4}
                            disabled={isLoading}
                            className={errors.description ? 'error' : ''}
                        />
                        {errors.description && (
                            <span className="error-message">{errors.description}</span>
                        )}
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner-small"></span>
                                    {isEditMode ? 'Updating...' : 'Adding...'}
                                </>
                            ) : isEditMode ? (
                                'Update Task'
                            ) : (
                                'Add Task'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
