


function mapAsyncLimit(iterables, callback, size){

    return new Promise((resolve, reject) => {


        let len = iterables.length;
        let final = [];
        let onGoingTasks = 0;


        for(let i = 0; i < len; i++){
            const item = iterables[i];

            try {
                const result = await callback.call(this, item, i);
                final.push(result);
            }catch(error){
                final.push(error);
            }


        }



    })



}