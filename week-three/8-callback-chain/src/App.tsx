import React, { useState } from "react";

// Type definitions for the steps
type StepFunction = (data: number) => number | null | undefined;

// Function to execute the chain of steps
function executeSteps(data: number, steps: StepFunction[]): number | null {
    let currentData: number | null | undefined = data; // Initialize with the initial data

    for (let i = 0; i < steps.length; i++) {
        try {
            // Execute the current step with the data
            currentData = steps[i](currentData);

            // If the step fails and doesn't return anything, we stop.
            if (currentData === undefined || currentData === null) {
                throw new Error(`Step ${i + 1} failed`);
            }
        } catch (error) {
            console.error(error);
            return null; // Stop execution if any step fails
        }
    }

    return currentData; // Return the final result or null if it failed
}

const App: React.FC = () => {
    const [result, setResult] = useState<number | null>(null);

    // Define the steps (callbacks)
    const step1: StepFunction = (data) => {
        console.log("Step 1:", data);
        return data + 1; // Modify data and pass it forward
    };

    const step2: StepFunction = (data) => {
        console.log("Step 2:", data);
        return data * 2; // Modify data and pass it forward
    };

    const step3: StepFunction = (data) => {
        console.log("Step 3:", data);
        if (data < 10) { // Simulate failure condition
            throw new Error("Data is too small in step 3");
        }
        return data - 3; // Modify data and pass it forward
    };

    // Function to handle the execution of steps
    const handleExecuteSteps = () => {
        const initialData = 3; // Starting data
        const steps: StepFunction[] = [step1, step2, step3];

        // Execute the steps and store the result
        const finalResult = executeSteps(initialData, steps);
        setResult(finalResult); // Update state with the final result or null
    };

    return (
        <div>
            <h1>Callback Chain Execution in React (TypeScript)</h1>
            <button onClick={handleExecuteSteps}>Execute Steps</button>
            {result !== null && <p>Final Result: {result}</p>}
            {result === null && <p>Execution failed at some point.</p>}
        </div>
    );
};

export default App;
