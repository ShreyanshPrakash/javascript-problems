


/**
 * @param {number[]} deliciousness
 * @return {number}
 */
var countPairs = function(deliciousness) {

    const mod = 1000000007;
    let store = new Map();
    let valid = 0;

    for(let num of deliciousness){

        let power = 1;
        for(let i = 0; i < 22; i++){

            let diff = power - num;

            if(store.has(diff)){
                valid = valid + store.get(diff);
            }
            power = power * 2;

        }
        store.set(num, (store.get(num) || 0 ) + 1);

    }


    return valid % mod;
};


var countPairs = function(deliciousness) {
    const mod = 1000000007;
    let res = 0, map = new Map();

    for(let num of deliciousness) {
        let power = 1;
        for(let i = 0; i < 22; i++) {
            if(map.has(power - num)) {
                res += map.get(power - num);
            }
            power *= 2;
            console.log(power);
        }
        map.set(num, (map.get(num) || 0) + 1);
    }
    
    return res % mod;
};