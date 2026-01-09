import {
    Box,
    VStack,
    Spinner,
    Text,
    Icon,
    Heading,
} from '@chakra-ui/react';
import { LuCircleAlert, LuFileText } from 'react-icons/lu';
import type { Task } from '../../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (task: Task) => void;
    deletingId: string | null;
    updatingId: string | null;
}

export const TaskList = ({
    tasks,
    isLoading,
    error,
    onEdit,
    onDelete,
    onToggleComplete,
    deletingId,
    updatingId,
}: TaskListProps) => {
    if (isLoading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={16}
                bg="gray.800"
                borderRadius="xl"
            >
                <Spinner size="xl" color="purple.400" />
                <Text mt={4} color="gray.400">Loading tasks...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={16}
                bg="gray.800"
                borderRadius="xl"
            >
                <Icon color="red.400" boxSize={12}>
                    <LuCircleAlert />
                </Icon>
                <Heading size="md" mt={4} color="red.400">Error loading tasks</Heading>
                <Text color="gray.500" mt={2}>{error}</Text>
            </Box>
        );
    }

    if (tasks.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                py={16}
                bg="gray.800"
                borderRadius="xl"
            >
                <Icon color="gray.500" boxSize={12}>
                    <LuFileText />
                </Icon>
                <Heading size="md" mt={4} color="gray.400">No tasks yet</Heading>
                <Text color="gray.500" mt={2}>Click "Add Task" to create your first task</Text>
            </Box>
        );
    }

    return (
        <VStack gap={4} align="stretch">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                    isDeleting={deletingId === task.id}
                    isUpdating={updatingId === task.id}
                />
            ))}
        </VStack>
    );
};
