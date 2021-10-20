poisk.onclick = function() {
	let str = document.getElementById('text').value;	
	max_vord(str);
}

 function max_vord(str){
	 
	let vord = [];
    let i = 0;

	let vords = split_str_f(str);
   
	if(vords.size > 0){
	
		i = 0;
		for (let value of vords.entries()) {
			vord[i] = value;
			console.log(value);
			i++;   
		}
	
		vord.sort((a, b) => (b[1] - a[1]));
	
	
		if(vord.length>=3){
			console.log(vord[0][0]);
			console.log(vord[1][0]);
			console.log(vord[2][0]);
			alert(`Vords: ${vord[0][0]}, ${vord[1][0]}, ${vord[2][0]}`);
			}else{
				if(vord.length == 2){
					console.log(vord[0][0]);
					console.log(vord[1][0]);
					alert(`Vords: ${vord[0][0]}, ${vord[1][0]}`);					
				}else{
					console.log(vord[0][0]);
					alert(`Vords: ${vord[0][0]}`);
				}
			}
		vords.clear();
	}else{
		console.log("ERROR: Line is empty or line contains only empty characters");
		alert("ERROR: Line is empty or line contains only empty characters");
		vords.clear();
	}

 }

 function split_str_f(str){
	 
	let vords = new Map();
	 
//	if(str.length > 0){
		let split_str = str.split(/[\s* , . ? ! ; : + - _ = ( ) " ' ` @ # $ % ^ & * № < > − 1 2 3 4 5 6 7 8 9 0]+/);//добавить любые символы которые не могут быть "словами" 
			
		//let vords = new Map();
		vords.set(split_str[0], 1);
		let a;
		for(let i = 1; i<split_str.length; i++) {
			if(vords.has(split_str[i])){
				a = vords.get(split_str[i]);
				vords.set(split_str[i], a+1);
			} else{
				vords.set(split_str[i], 1);
			}        
		}
		
		vords.delete('');
		
		return vords;
//	}else{
//		console.log("ERROR: Line is empty");
//		alert("ERROR: Line is empty");
//		vords.clear();
//		return vords;					
//    }
	 
 }
