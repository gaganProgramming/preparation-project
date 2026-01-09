import GrandChild from "./GrandChild.tsx";

interface ChildProps {
    onIncrement: () => void;
}

function Child({ onIncrement }: ChildProps) {
    return <GrandChild onIncrement={onIncrement} />;
}

export default Child;
