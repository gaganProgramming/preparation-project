import Button from "./components/Button.tsx";

function App() {

  return (
    <>
      <Button label="Click me" onClick={()=>alert('Hello World')}/>
    </>
  )
}

export default App
