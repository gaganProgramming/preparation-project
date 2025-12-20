// Function to execute a given operation and handle any errors that might occur

function executeWithErrorHandling(
    operation: () => number, // Operation to be executed (returns a number)
    errorCallback: (errorMessage: string) => void // Callback for handling errors
): number | null {
    try {
        return operation(); // Attempt to execute the operation
    } catch (error) {
        errorCallback("An error occurred during execution");
        return null;  // Return null if an error occurs
    }
}

const operationResult = executeWithErrorHandling(
    () => {
        throw new Error("Failed"); // Simulate an error
        // return 10;
    },
    (errorMsg) => console.error(errorMsg) // Log the error message
);

console.log(operationResult);// Output will be `null` since an error occurred
