// Define the User interface
interface Humans {
    name: string;
    age: number;
}

// Define the function to group users by age
function groupUsersByName(users: Humans[]) {
    const adults: Humans[] = [];
    const minors: Humans[] = [];

    // Loop through users and categorize them as adults or minors
    for (let i = 0; i < users.length; i++) {
        if (users[i].age >= 18) {
            adults.push(users[i]);
        } else {
            minors.push(users[i]);
        }
    }

    // Return the grouped users
    return { adults, minors };
}

// Example usage of the function
const separated: Humans[] = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 20 },
    { name: 'David', age: 15 },
    { name: 'Eva', age: 25 }
];

// Call the function to group users
const { adults, minors } = groupUsersByName(separated);

// Display the result
console.log('Adults:', adults);
console.log('Minors:', minors);
