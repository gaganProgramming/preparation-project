import Input from "./components/Input.tsx";

function App() {
  return (
    <>
      <Input value={"Hello"} onChange={(newValue) => console.log(newValue)}/>
    </>
  )
}

export default App