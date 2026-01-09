import { useState } from 'react';
import {
    Container,
    Heading,
    Text,
    Button,
    Flex,
    HStack,
    VStack,
    Badge,
} from '@chakra-ui/react';
import { LuPlus } from 'react-icons/lu';
import type { Task, CreateTaskPayload } from '../../types/task';
import {
    useGetTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
} from '../../store/api/taskApi';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

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
        <Container maxW="container.lg" py={8}>
            {/* Header */}
            <Flex
                justify="space-between"
                align="center"
                mb={8}
                p={6}
                bg="gray.800"
                borderRadius="xl"
                boxShadow="lg"
            >
                <VStack align="start" gap={1}>
                    <Heading
                        size="2xl"
                        bgGradient="to-r"
                        gradientFrom="purple.400"
                        gradientTo="cyan.400"
                        bgClip="text"
                    >
                        Task Manager
                    </Heading>
                    <Text color="gray.400">Manage your tasks efficiently</Text>
                </VStack>
                <Button
                    colorPalette="purple"
                    size="lg"
                    onClick={handleOpenAddForm}
                >
                    <LuPlus />
                    Add Task
                </Button>
            </Flex>

            {/* Stats Bar */}
            {tasks.length > 0 && (
                <HStack gap={4} mb={6} justify="center">
                    <Badge
                        size="lg"
                        colorPalette="blue"
                        variant="subtle"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        Total: {tasks.length}
                    </Badge>
                    <Badge
                        size="lg"
                        colorPalette="green"
                        variant="subtle"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        Completed: {completedCount}
                    </Badge>
                    <Badge
                        size="lg"
                        colorPalette="orange"
                        variant="subtle"
                        px={4}
                        py={2}
                        borderRadius="full"
                    >
                        Pending: {pendingCount}
                    </Badge>
                </HStack>
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
        </Container>
    );
};
