let arr1 = [1, 2, 3, 4 ,5 ,4 ,3, 2, 1];
let arr2 = [{id: '1', name: 'aaa'}, {id: '2', name: 'aaa'}, {id: '1', name: 'bbb'}];

Array.prototype.unique = function(){
    if(!arguments.length){
        let unique_primitiv = new Set(this);
        return [...unique_primitiv];
    }



    let key = arguments[0];
    let unique_obj = new Map();
    
    
    let arr_with_key = this.filter(function(element){
        if(element.hasOwnProperty(key))
            return element;
    });

    

    for(let i = 0; i<arr_with_key.length; i++){
        
        if(!unique_obj.has(arr_with_key[i][key])){ 

            unique_obj.set(arr_with_key[i][key], arr_with_key[i]);            
        }
    }
    return [...unique_obj.values()];
    
    
    
}
//console.log(arr1.unique());
//console.log(arr2.unique('id'));