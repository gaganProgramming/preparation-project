import {useState} from "react";
import CounterButton from "./CounterButton.tsx";

function Parent() {
    const [count, setCount] = useState(0);
    const increment = ()=>{
        setCount(prev => prev + 1)
    };

    return (
        <div>
            <p>Count: {count}</p>
            <CounterButton onIncrement={increment}/>
        </div>
    );
}

export default Parent;