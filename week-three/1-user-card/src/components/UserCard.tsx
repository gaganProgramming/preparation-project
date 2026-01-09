// interface?? It defines the "shape" of an object, specifying the properties and methods an object, variable, or class must have, without providing the implementation details.

export interface User{
    id: number;
    name: string;
    age: number;
}
 export interface UserCardProps {
    user: User;
}

function UserCard({user}:UserCardProps) {
    return (
        <div>
            <p>Name:{user.name}</p>
            <p>Age: {user.age}</p>
        </div>
    );
}

export default UserCard;