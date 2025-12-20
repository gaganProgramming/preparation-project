
//Callback fuctions -> Apply callback to every value.
function transformArray(value:number[], transformation: (value: number) => number):number[] {
    const transformedValues:number[] = [];
    for(let index= 0; index < value.length; index++){
        transformedValues.push(transformation(value[index]));
    }
    return transformedValues;
}

const doubledValues = transformArray([1,2,3], (value)=> value * 2)
console.log(doubledValues)
















