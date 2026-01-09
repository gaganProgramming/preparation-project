import { useUserViewModel } from "./useUserViewModel";

function UserView() {
    const { user, isAdult, incrementAge } = useUserViewModel();

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>{isAdult ? "Adult" : "Minor"}</p>
            <button onClick={incrementAge}>+</button>
        </div>
    );
}

export default UserView;
