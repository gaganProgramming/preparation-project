
interface CounterButtonProps {
    onIncrement: () => void;
}

function CounterButton({onIncrement}:CounterButtonProps) {
    return (
        <button onClick = {onIncrement}>
            Increment
        </button>
    );
}

export default CounterButton;