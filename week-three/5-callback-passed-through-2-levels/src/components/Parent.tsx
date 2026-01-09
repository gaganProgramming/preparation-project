import { useState } from "react";
import Child from "./Child";

function Parent() {
    const [count, setCount] = useState<number>(0);

    const increment = (): void => {
        setCount(prev => prev + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <Child onIncrement={increment} />
        </div>
    );
}

export default Parent;
