import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    Input,
    Textarea,
    VStack,
    HStack,
    IconButton,
    Spinner,
    Field,
} from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import type { Task, CreateTaskPayload } from '../../types/task';

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
        <Box
            position="fixed"
            inset={0}
            bg="blackAlpha.700"
            display="flex"
            alignItems="center"
            justifyContent="center"
            zIndex={1000}
            onClick={onCancel}
        >
            <Box
                bg="gray.800"
                borderRadius="xl"
                p={6}
                w="full"
                maxW="md"
                mx={4}
                boxShadow="2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <HStack justify="space-between" mb={6}>
                    <Heading size="lg" color="white">
                        {isEditMode ? 'Edit Task' : 'Add New Task'}
                    </Heading>
                    <IconButton
                        aria-label="Close"
                        variant="ghost"
                        colorPalette="gray"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        <LuX />
                    </IconButton>
                </HStack>

                <form onSubmit={handleSubmit}>
                    <VStack gap={5} align="stretch">
                        <Field.Root invalid={!!errors.title}>
                            <Field.Label color="gray.300">Title</Field.Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter task title"
                                disabled={isLoading}
                                bg="gray.700"
                                borderColor={errors.title ? 'red.500' : 'gray.600'}
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ borderColor: 'purple.500' }}
                            />
                            {errors.title && (
                                <Field.ErrorText>{errors.title}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <Field.Root invalid={!!errors.description}>
                            <Field.Label color="gray.300">Description</Field.Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter task description"
                                rows={4}
                                disabled={isLoading}
                                bg="gray.700"
                                borderColor={errors.description ? 'red.500' : 'gray.600'}
                                color="white"
                                _placeholder={{ color: 'gray.500' }}
                                _focus={{ borderColor: 'purple.500' }}
                            />
                            {errors.description && (
                                <Field.ErrorText>{errors.description}</Field.ErrorText>
                            )}
                        </Field.Root>

                        <HStack gap={3} pt={2}>
                            <Button
                                variant="outline"
                                colorPalette="gray"
                                flex={1}
                                onClick={onCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                colorPalette="purple"
                                flex={1}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Spinner size="sm" mr={2} />
                                        {isEditMode ? 'Updating...' : 'Adding...'}
                                    </>
                                ) : isEditMode ? (
                                    'Update Task'
                                ) : (
                                    'Add Task'
                                )}
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Box>
        </Box>
    );
};
