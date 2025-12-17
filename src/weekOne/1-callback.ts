
//Callback fuctions -> Apply callback to every value.
function doSomething(value:number[], callback: (value: number) => number):number[] {
    const result:number[] = [];
    for(let index= 0; index < value.length; index++){
        result.push(callback(value[index]));
    }
    return result;
}

const doubled = doSomething([1,2,3], (v)=> v * 2)
console.log(doubled)















