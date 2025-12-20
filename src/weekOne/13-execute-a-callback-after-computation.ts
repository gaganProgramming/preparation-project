function computeAndNotify(values: number[], callback: (value: number) => number): number {
    let sum = 0;
    for (let index = 0; index < values.length; index++) {
        sum += values[index];
    }
      sum = sum + callback(sum);
    return sum;
}

const sum = computeAndNotify([1, 2, 3, 4, 5], (v)=> v*2)
console.log(sum);
