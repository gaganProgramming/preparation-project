
// Filter Users based on the age
type Person = {
    name: string;
    age: number;
    gender: string;
}

function filterUser(users: Person[]): Person[]{
    const result: Person[] = [];
    for(let index = 0; index < users.length; index++){
        if(users[index].age >= 18){
            result.push(users[index])
        }
    }
    return result;
}

const usersDetails = [
    { name: 'Alice', age: 20, gender: 'male' },
    { name: 'Bobby', age: 17, gender: 'female' },
    { name: 'Charlie', age: 22, gender: 'female' },
    { name: 'David', age: 16, gender: 'male' },
];

const adultsDetails = filterUser(usersDetails)
const adultNames = adultsDetails.map(user => user.name);
console.log(adultsDetails);
console.log(adultNames);
