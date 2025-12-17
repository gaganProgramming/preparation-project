function uniqueValues(values: number[]): number[] {
    const result: number[] = [];
    for (let index = 0; index < values.length; index++) {
        let exists = false;
        for (let j = 0; j < result.length; j++) {
            if (result[j] === values[index]) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            result.push(values[index]);
        }
    }
    return result;
}

const removeDuplicates = uniqueValues([ 1, 1, 2, 3, 3, 4, 4])
console.log(removeDuplicates);