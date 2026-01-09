import { useState } from "react";

interface User {
    name: string;
    age: number;
}

export function useUserViewModel() {
    const [user, setUser] = useState<User>({ name: "Gagan", age: 20 });

    const incrementAge = (): void => {
        setUser(prev => ({ ...prev, age: prev.age + 1 }));
    };

    const isAdult = user.age >= 18;

    return {
        user,
        isAdult,
        incrementAge
    };
}
