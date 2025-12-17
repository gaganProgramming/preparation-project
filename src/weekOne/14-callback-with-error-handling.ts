function withErrorHandler(
    fn: () => number,
    onError: (message: string) => void
): number | null {
    try {
        return fn();
    } catch (error) {
        onError("An error occurred during execution");
        return null;
    }
}

const result = withErrorHandler(
    () => {
        throw new Error("Failed");
    },
    (msg) => console.error(msg)
);
// null
console.log(result);
