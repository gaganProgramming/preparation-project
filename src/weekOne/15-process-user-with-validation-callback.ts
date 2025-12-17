type Men = {
    name: string;
    age: number;
    gender: string;
};

function processUser(
    user: Men,
    validate: (u: Men) => boolean,
    onSuccess: (u: Men) => void,
    onFailure: (reason: string) => void
): void {
    if (!validate(user)) {
        onFailure("Invalid user");
        return;
    }

    onSuccess(user);
}

const adultValidator = (u: Men): boolean => u.age >= 18;

processUser(
    { name: "Gagan", age: 22, gender: "male" },
    adultValidator,
    (u) => console.log("User processed:", u),
    (msg) => console.error(msg)
);

