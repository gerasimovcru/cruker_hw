function Tree_node(value){
    this.value = value; 
    this.left = null;
    this.right = null;
}



let Tree = {	
    root: null,
   
   
    show: function(node = this.root){
    
        if(!node){
            return;
        }
        console.log(node.value);
   
        this.show(node.left);
        this.show(node.right);
    },
   
   
    add: function(value){
    let new_node = new Tree_node(value);
    if(!this.root){
        this.root = new_node;
        return new_node;
    }
   
    if(typeof(value) === typeof(this.root.value)){

        let curr_node = this.root;
   
        while(curr_node){
            if(new_node.value < curr_node.value){
                if(!curr_node.left){
                    curr_node.left = new_node;
                    return curr_node.left;
                }
                curr_node = curr_node.left;           
            }else{
                if(!curr_node.right){
                    curr_node.right = new_node;
                     return curr_node.right;
                }
                curr_node = curr_node.right;		
            }
        }		
   }   
   }
}


