



const sumRecursive = (n, sum = 0, prd = 1) => {

    if(n === 0){
        return 0;
    }
    console.log(sum);
    sum = n + sumRecursive(n - 1, sum, prd);
    // prd = n * sumRecursive(n - 1, sum, prd);
    console.log(sum);
    return sum;
}

console.log("Result : ", sumRecursive(5));