// Get User Names

type User = {
    name: string;
    age: number;
    gender: string;
}

function getUserNames(users: User[]):string[]{
    const result: string[] = [];
    for(let i = 0; i < users.length; i++){
        result.push(users[i].name);
    }
    return result;
}
const users = [
    { name: 'Alice', age: 20, gender: 'male' },
    { name: 'Bobby', age: 17, gender: 'female' },
    { name: 'Charlie', age: 22, gender: 'female' },
    { name: 'David', age: 16, gender: 'male' },
];

const Names = getUserNames(users);
console.log(Names);