function computeAndNotify(values: number[], callback: (result: number) => void): void {
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    callback(sum);
}

const sum = computeAndNotify([1, 2, 3, 4, 5], (v)=> v)
console.log(sum);
