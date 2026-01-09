interface InputProps {
    value: string,
    onChange: (newValue: string) => void
}

function Input({value, onChange}:InputProps) {

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>
    {
        onChange(e.target.value)  // This updates the parent state with the new input value
    };
    return (
      <input type = "text" value={value} onChange={handleChange}/>
    );
}

export default Input;