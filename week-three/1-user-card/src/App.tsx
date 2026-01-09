import UserCard from "./components/UserCard.tsx";
import type {User} from "./components/UserCard.tsx";

function App() {
  const staticUser:User = {id: 1, name: "Amogh", age: 30};
  return (
    <>
      <UserCard user= {staticUser} />
    </>
  )
}

export default App
