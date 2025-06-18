

const fibonacciSimple = (n) => {
    
    if(n <= 1){
        return n;
    }

    let first = 0;
    let second = 1;

    for(let i = 2; i <= n; i++){
        let nextVal = first + second;
        first = second;
        second = nextVal;

        [first, second] = [second, first + second];
    }

    return second;
    
}



const fibonacciRecursive = (n) => {

    // why less the 1 and not === 1 or === 0
    // Cause since we are ddoing n - 1 and n - 2....
    // if the n is 2, then n - 2 will become 0
    // and n - 1 will become 1

    console.log(n);
    if(n <= 1){
        console.log("======================== => ", n);
        return n;
    }

    // console.log(n);

    // since we are calling the recursion twice....
    /// try to visualize....first all the recursion due the first fucntion call (n - 1)
    // that will be resolved..like literally all the way to the bottom till the end condition
    // once u reach the end condition, now if have if statement above that will return something
    // that is the first time something is returned...every function call till then is actually added to the call stack
    // 

    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
    // why n - 1 and n - 2 ?
    // Because for fibonacci, we have to add the PREVIOUS 2 values....
    // Hence n - 1 and n - 2...
    /// U can also think of this as if u are creating and array [0, 0, 0, 0, 0, 0 ...]
    // Now in case of fibonacci or other cases.... we need previous two values and we also know what those values are
    // so the array becomes [0, 1, 0, 0, 0, 0, ...]
    // Now run the loop from the 2nd index and 
    // arr[i] = arr[i - 2] + arr[i - 1]
    // FYI....we just solved using the DP
    // We converted the recursion to an array
    // https://www.youtube.com/watch?v=piAlsJySUGE
}

// 0, 1, 1, 2, 3, 5, 8, 13, 21
console.log("Result : ", fibonacciRecursive(7));