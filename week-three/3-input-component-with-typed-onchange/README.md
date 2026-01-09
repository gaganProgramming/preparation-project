### Issue:

The problem you're facing is that you're passing a static value (`value={"Hello"}`) to the `Input` component, but you're not updating the value anywhere after that. Since the `Input` component is a **controlled input**, the value displayed in the input is completely controlled by the parent component's state.

However, in this code, you're not storing the input value in any state or updating it anywhere. You're simply passing the string `"Hello"`, and that's it. So even if you type something in the input field, the value doesn't change because there is no logic to update it.

### Solution:

To fix this, you need to **store the input value in a state** in the parent (`App`), and update that state whenever the input changes. Here's how you can do it:

```tsx
import React, { useState } from 'react';
import Input from "./components/Input.tsx";

function App() {
  const [inputValue, setInputValue] = useState("Hello");

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue); // Update the input value state
  };

  return (
    <>
      <Input value={inputValue} onChange={handleInputChange} />
    </>
  );
}

export default App;
```

### Key Changes:

1. **State for input value**:

    * I added a `useState` hook to store the input value in the `App` component: `const [inputValue, setInputValue] = useState("Hello");`.
    * The initial value of the input is `"Hello"`, but you can change this as needed.

2. **Handling input change**:

    * The `handleInputChange` function updates the state (`setInputValue(newValue)`), which in turn will update the value displayed in the input.

3. **Passing value and onChange props**:

    * I passed `inputValue` as the `value` prop to the `Input` component, and `handleInputChange` as the `onChange` prop.
    * This way, every time you type in the input, `handleInputChange` will be called, updating the state and re-rendering the input with the new value.

### Why does this work?

In the original code, the input was "stuck" with the value `"Hello"`, and there was no way to change it because you weren't updating any state in the parent component. By adding a state variable (`inputValue`), React can now keep track of the current value, and whenever you type in the input, the value gets updated and displayed correctly.

### Now, you should be able to:

* Type in the input.
* See the input field's value change.
* See the updated value logged in the console (via the `onChange` handler).

Let me know if you have any other questions or if this fixes the issue for you!
