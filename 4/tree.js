function Tree_node(value, left, right){
    this.value = value; 
    this.left = left;
    this.right = right;
}
let Tree = {	
   root: null,	
   add: function(value){
   let new_node = new Tree_node(value);
   if(!this.root){
       this.root = new_node;
       return new_node;
   }
   
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
   show: function(){
       
       console.log(this.root.value);
   
   }
   
};