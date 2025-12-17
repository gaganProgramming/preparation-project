// filter even Numbers

function filterEvenNumbers(values:number[]):number[]{
    let result:number[] = [];
    for(let i=0; i< values.length; i++){
        if(values[i]%  2 === 0){
            result.push(values[i]);
        }
    }
    return result;
}
const evenNumbers = filterEvenNumbers([1,2, 3, 4, 5]);
console.log(evenNumbers);