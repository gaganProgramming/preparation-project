
function formatUserName(firstName:string, lastName:string):string {
    return `${firstName} ${lastName}`;
}

const stringFormatter = formatUserName("Gagan", "Suresh");
console.log(stringFormatter);