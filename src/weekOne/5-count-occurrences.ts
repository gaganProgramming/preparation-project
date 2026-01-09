function countOccurences(values: number[], target: number):number {
    let count = 0;
    for (let index = 0; index < values.length; index++) {
        if (values[index] === target) count++;
    }
    return count;
}

const numberCount = countOccurences([1, 2, 2, 2, 1, 1], 2);
console.log(numberCount);





















