// Binary Search

function binarySearch(values: number[], target: number): number {
    let left = 0;
    let right = values.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (values[mid] === target) return mid;
        if (values[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

const search = binarySearch([1, 2, 3 , 4, 5], 5);
console.log(search)



//  Initial Setup:
//  values `[1, 2, 3, 4, 5]`
// target : `5`
// left: `0`
// right: `4` (since the last index is `4`)

// Iteration 1:
//  `left = 0`, `right = 4`
// Calculate `mid = Math.floor((0 + 4) / 2) = Math.floor(4 / 2) = 2`
//  `values[mid] = values[2] = 3`

// Condition Check:
//  `values[mid] === target` → `3 === 5` → `false`
// `values[mid] < target` → `3 < 5` → `true`
//  Since the target is greater, we update `left = mid + 1 = 2 + 1 = 3`.

//  Iteration 2:
// `left = 3`, `right = 4`
//  Calculate `mid = Math.floor((3 + 4) / 2) = Math.floor(7 / 2) = 3`
//  `values[mid] = values[3] = 4`

// Condition Check:
//  `values[mid] === target` → `4 === 5` → `false`
//  `values[mid] < target` → `4 < 5` → `true`
// Since the target is greater, we update `left = mid + 1 = 3 + 1 = 4`.

//  Iteration 3:
//  `left = 4`, `right = 4`
//  Calculate `mid = Math.floor((4 + 4) / 2) = Math.floor(8 / 2) = 4`
//  `values[mid] = values[4] = 5`

// Condition Check:
//  `values[mid] === target` → `5 === 5` → `true`
//  Since the target is found at index `4`, the function returns `4`.

//  Final Output:
//     The search for `5` is successful, and the result is `4`.






































