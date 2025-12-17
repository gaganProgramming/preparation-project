// Find Max
// getMax(values: number[]): number| null
// Returns null if array is empty.

function getMax(values: number[]):number|null{
    if(values.length === 0) return null;
    let max = values[0];
    for(let index = 1; index< values.length; index++){
        if(values[index] > max)
           max = values[index];
    }
    return max;
}

const maximumNumber = getMax2([1, 2, 3, 4, 15, 4, 1])
  console.log(maximumNumber)



//option2
function getMax2(values: readonly number[]):number | null {
    if(values.length === 0) return null;
    return values.reduce(
        (currentMax, value) => value > currentMax ? value : currentMax,
        values[0]
    )
}