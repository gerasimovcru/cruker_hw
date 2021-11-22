function IAmAmply(){
    if(Math.floor(Math.random()*10)>5){
        return true;
    }else{
        return false;
    }
}

function WhatAMovie(){
    movie = Math.floor(Math.random()*10)
        switch(movie){
            case 1, 2:
                return "action";
            case 3, 4:
                return "detectiv";
            case 5, 6:
                return "drama";
            default:
                return "comedy";
        }
}


const IAmEmply = new Promise(
    (resolve, reject) => {
        if(!IAmAmply()){

            resolve("Watch movie");   

        }else{
            let whatToDo = new Error('No Watch, i not emply');
            reject(whatToDo);
            

        }
    }
);

async function WhatchMovie(){
    return new Promise(
        (resolve, reject) => {
            let film = WhatAMovie();
            resolve("Watch "+film);

        });
};   


async function askYourself(){
    try{
        let IAmAmply = await IAmEmply; 
        let IAmWatch = await WhatAMovie();

        console.log(IAmAmply+"  "+IAmWatch);
    }

    catch(error){
        console.log(error);
    }
}


(async () => {
    await askYourself();
})();











