interface GrandChildProps {
    onIncrement: () => void;
}

function GrandChild({ onIncrement }: GrandChildProps) {
    return <button onClick={onIncrement}>Increment</button>;
}

export default GrandChild;
