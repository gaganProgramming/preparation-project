//Bubble Sort

function bubbleSort(values: number[]): number[] {
    const arr = [...values]; // avoid mutating original array

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}

const sortedArray =  bubbleSort([5, 3, 8, 4, 2]);
console.log(sortedArray);



// Loops Working
//
// for(let i =0; i < arr.length-1; i++){
//     for(let j =1; j< arr.length-i-1; j++){
//     }
// }
//
// for (let i = 0; i < 4; i++)
//     for (let j = 0; j < 4; j++)
//         j = 1
// j = 2
// j = 3
// for (let i = 1; i < 4; i++)
//     for (let j = 0; j < 3; j++)
//         j = 1;
// j = 2;
// for (let i= 2; i < 4; i++)
//     for(let j = 0; j < 2; j++)
//         j = 1;
// for (let i = 3; i < 4; i++)
//     for(let j = 0; j < 1; j++)
//         j = 0;
//
// [5, 3, 8, 4, 2],
//     Fist pass (i = 0) j < 4 | 0,3  4 comparisons
// 1. arr[0](5), arr[1](3) > [3, 5, 8, 4, 2]
// 2. arr[1](5), arr[2](8) > [3, 5, 8, 4, 2]
// 3. arr[2](8), arr[3](4) > [3, 5, 4, 8, 2]
// 4. arr[3](8), arr[4](2) > [3, 5, 4, 2, 8]
//
// Second pass (i = 1)j < 3 | 0,2  3 comparisons
// 1. arr[0](3), arr[1](5) > [3, 5, 4, 2, 8]
// 2. arr[1](5), arr[2](4) > [3, 4, 5, 2, 8]
// 3. arr[2](5), arr[3](2) > [3, 4, 2, 5, 8]
//
// Third pass (i=2) j < 2 | 0,1  2 comparisons
// 1. arr[0](3), arr[1](4) > [3, 4, 2, 5, 8]
// 2. arr[1](4), arr[2](2) > [3, 2, 4, 5, 8]
//
// Fourth pass (i=3)j < 1 | 0  1 comparisons
// 1. arr[0](3), arr[1](2) > [2, 3, 4, 5, 8]


