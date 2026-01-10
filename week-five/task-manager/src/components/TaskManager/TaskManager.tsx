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
import { useTaskManager } from './useTaskManager';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';

export const TaskManager = () => {
    const {
        tasks,
        isLoading,
        error,
        completedCount,
        pendingCount,
        isFormOpen,
        editingTask,
        deletingId,
        updatingId,
        isAdding,
        isUpdating,
        handleOpenAddForm,
        handleOpenEditForm,
        handleCloseForm,
        handleSubmit,
        handleDelete,
        handleToggleComplete,
    } = useTaskManager();

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
                error={error}
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
