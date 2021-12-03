

function Helper(){

    Object.defineProperties(this, {

    
    isEmply: {
        value: function(obj){
            if(typeof(obj) === 'object'){
                for (let key in obj) {
                    return false;
                }
                return true;
            }else{return 'not a object';}
        }
    },

    isObject: {
        value: function(obj){
            if(typeof(obj) === 'object') {
                return true;
            }
            return false;
        }
    },

    deepClone: {
        value: function(obj){
            if(typeof(obj) === 'object'){
                let obj_clone = {};
                    for (let key in obj){
                        if(typeof(obj[key]) === 'object'){
                            obj_clone[key] = this.deepClone(obj[key]);
                        }else{
                            obj_clone[key] = obj[key];
                        }
                    }       
            return obj_clone;
            }else{return 'not a object';}
        }
    },

    isEqual: { 
        value: function(obj1, obj2){
            if((typeof(obj1) === 'object')&&(typeof(obj2) === 'object')){
                const keys1 = Object.getOwnPropertyNames(obj1);
                const keys2 = Object.getOwnPropertyNames(obj2);

                if (keys1.length !== keys2.length) {
                    return false;
                }

                for (let i = 0; i < keys1.length; i++) {
                    const key = keys1[i];
                    if(typeof(obj1[key]) === 'object' && typeof(obj2[key]) === 'object'){
                        if (!this.isEqual(obj1[key], obj2[key])) {
                            return false;   
                        }
                    }else{
                        if(obj1[key] !== obj2[key]){
                            return false; 
                        }
                    }
                }
                return true;
            }else{return 'not a object';}
        }
    },
    


    findValue: {
        value: function(obj, key){
            if(typeof(obj) === 'object'){
                let findValue;
                for (let obj_key in obj){
                    if(obj_key === key){
                        findValue = obj[obj_key];
                        return findValue; 
                    }else{
                        if(typeof(obj[obj_key]) === 'object'){
                            findValue = this.findValue(obj[obj_key], key);                   
                        }
                    }   
                }
                return findValue ; 
            }else{return 'not a object';}
        }
    },

    hasKey: {
        value: function(obj, key){
            if(typeof(obj) === 'object'){
                let hasKey = false;
                for (let obj_key in obj){
                    if(obj_key === key){
                        return hasKey = true; 
                    }else{
                        if(typeof(obj[obj_key]) === 'object'){
                            hasKey = this.hasKey(obj[obj_key], key);
                        }
                    }   
                }   
                return hasKey; 
            }else{return 'not a object';}
        } 
    } 

    })     
    
}
    


// let ker1 = {leter: {
//     leter1: 12,
//     leter2: 15,
//     leter3: {lom: 1}
// },
// luter: 123}


// let ker2 = {
// luter: 123,
// leter: {
//     leter1: 12,
//     leter2: 15
// }}

// let help = new Helper; 


// console.log(help.isEmply(123));
// console.log(help.isObject(123));
// console.log(help.deepClone(123));
// console.log(help.isEqual(123, ker2));
// console.log(help.findValue(123, 'lom'));
// console.log(help.hasKey(123, 'lom'));