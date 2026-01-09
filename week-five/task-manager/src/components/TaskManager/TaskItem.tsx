import {
    Box,
    Flex,
    Heading,
    Text,
    IconButton,
    Checkbox,
    Spinner,
} from '@chakra-ui/react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';
import type { Task } from '../../types/task';

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
        <Box
            bg="gray.800"
            borderRadius="xl"
            p={5}
            boxShadow="md"
            borderWidth="1px"
            borderColor={task.completed ? 'green.600' : 'gray.700'}
            opacity={isLoading ? 0.7 : 1}
            transition="all 0.2s"
            _hover={{ borderColor: 'purple.500', transform: 'translateY(-2px)' }}
        >
            <Flex justify="space-between" align="flex-start" gap={4}>
                <Flex gap={4} flex={1}>
                    <Checkbox.Root
                        checked={task.completed}
                        onCheckedChange={() => onToggleComplete(task)}
                        disabled={isLoading}
                        colorPalette="green"
                        size="lg"
                        mt={1}
                    >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                    </Checkbox.Root>
                    <Box flex={1}>
                        <Heading
                            size="md"
                            color={task.completed ? 'gray.500' : 'white'}
                            textDecoration={task.completed ? 'line-through' : 'none'}
                            mb={2}
                        >
                            {task.title}
                        </Heading>
                        <Text color="gray.400" mb={3}>
                            {task.description}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                        </Text>
                    </Box>
                </Flex>
                <Flex gap={2}>
                    <IconButton
                        aria-label="Edit task"
                        variant="ghost"
                        colorPalette="blue"
                        size="sm"
                        onClick={() => onEdit(task)}
                        disabled={isLoading}
                    >
                        <LuPencil />
                    </IconButton>
                    <IconButton
                        aria-label="Delete task"
                        variant="ghost"
                        colorPalette="red"
                        size="sm"
                        onClick={() => onDelete(task.id)}
                        disabled={isLoading}
                    >
                        {isDeleting ? <Spinner size="sm" /> : <LuTrash2 />}
                    </IconButton>
                </Flex>
            </Flex>
        </Box>
    );
};
