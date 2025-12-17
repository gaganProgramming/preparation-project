function runUserPipeline(
    user: User,
    validate: (u: User) => boolean,
    transform: (u: User) => User,
    save: (u: User) => void,
    onError: (msg: string) => void
): void {
    if (!validate(user)) {
        onError("Validation failed");
        return;
    }

    const transformedUser = transform(user);
    save(transformedUser);
}

const validateAdult = (u: User): boolean => u.age >= 18;

const transformUser = (u: User): User => ({
    ...u,
    name: u.name.toUpperCase()
});

const saveUser = (u: User): void => {
    console.log("Saving user to DB:", u);
};

runUserPipeline(
    { name: "Gagan", age: 22, gender: "male" },
    validateAdult,
    transformUser,
    saveUser,
    (msg) => console.error(msg)
);
