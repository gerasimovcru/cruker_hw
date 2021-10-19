str = "";//любая строка

max_vord(str);

 function max_vord(str){

    if(str.length > 3){
    let split_str = str.split(/[\s* , . ? ! ; : + - _ = ( ) " ' ` @ # $ % ^ & * № < > − 1 2 3 4 5 6 7 8 9 0]+/);//добавить любые символы которые не могут быть "словами" 

    let vord = [];
    let i = 0;

    let col = new Map();
    col.set(split_str[0], 1);
    let a;
    for(let i = 1; i<split_str.length; i++) {
        if(col.has(split_str[i])){
            a = col.get(split_str[i]);
            col.set(split_str[i], a+1);
        } else{
            col.set(split_str[i], 1);
        }        
    }
   
    i = 0;
    for (let value of col.entries()) {
        vord[i] = value;
        i++;   
      }

      vord.sort((a, b) => (b[1] - a[1]));
  

      if(vord.length>=3){
      console.log(vord[0][0]);
      console.log(vord[1][0]);
      console.log(vord[2][0]);
      }else{
         if(vord.length == 2){
            console.log(vord[0][0]);
            console.log(vord[1][0]);  
         }else{
             console.log(vord[0][0]);
         }
      }

    }else{
        console.log("ERR");
    }

 }

 

