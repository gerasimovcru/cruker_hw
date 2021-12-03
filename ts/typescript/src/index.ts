class TreeNode<T>{
    private _value: T ;
    private _left: TreeNode<T> | null;
    private _right: TreeNode<T> | null;


    constructor(value: T, left: TreeNode<T> | null, right: TreeNode<T> | null) {
        this._value = value;
        this._left = left;
        this._right = right;
    }


    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get left(): TreeNode<T> | null {
        return this._left;
    }

    set left(value: TreeNode<T> | null) {
        this._left = value;
    }

    get right(): TreeNode<T> | null {
        return this._right;
    }

    set right(value: TreeNode<T> | null) {
        this._right = value;
    }
}

class Tree<T>{

    root: TreeNode<T> | null;


    constructor() {
        this.root = null;
    }

    private show(node: TreeNode<T> | null = this.root): string{

        if (!node){
            return "";
        }

        let li = "";
        let ul;
        if (node.value !== null) {

            li += "<li>" + node.value + this.show(node.right) + "</li>";
            li += this.show(node.left) ;
        }
        if (li) {
            ul = "<ul>" + li + "</ul>";
        }

        console.log(node.value);

        return ul ?? "";
    }

    private minimum(node: TreeNode<T> | null = this.root): T | undefined {

        let min;
        if (!node){
            return min;
        }

        if (node.left !== null) {
            min = this.minimum(node.left);
        } else {
            min = node.value;
        }

        return min;


    }

    search(node: TreeNode<T> | null = this.root, key: T):  T | undefined {
         if (!node){
             return undefined;
         }
         if ((node !== null) && (key !== node.value)) {
             if (key < node.value) {
                 this.search(node.left, key);
             } else {
                 this.search(node.right, key);
             }
         }
         return node.value;
     }

    createTreeTable(): void{
        const container = document.getElementById("container");
        if (container !== null) {
            container.innerHTML = <string> this.show();
        }
    }

    delete(node: TreeNode<T> | null = this.root, key: T ): TreeNode<T> | null{

        if (!node){
            return null;
        }

        if (key < node.value){
            node.left = this.delete(node.left, key);
        } else if (key > node.value) {
            node.right = this.delete(node.right, key);
        } else if ((node.left !== null) && (node.right !== null)) {
            node.value = <T><unknown> this.minimum(node.right);
            node.right = this.delete(node.right, node.value);
        } else if (node.left != null) {
            node = node.left;
        } else if (node.right != null) {
            node = node.right;
        } else {
            node = null;
        }

        return node;

    }

    add(value: T): TreeNode<T> | undefined{

        const newNode = new TreeNode(value, null, null);
        if (!this.root){
            this.root = newNode;
            return newNode;
        }

        if (typeof(value) === typeof(this.root.value)){

            let currNode = this.root;

            while (currNode){
                if (newNode.value < currNode.value){
                    if (!currNode.left){
                        currNode.left = newNode;
                        return currNode.left;
                    }
                    currNode = currNode.left;
                } else {
                    if (!currNode.right){
                        currNode.right = newNode;
                        return currNode.right;
                    }
                    currNode = currNode.right;
                }
            }
        }
        return newNode;
    }

}

export class Browses{
    public setBut: HTMLElement | null;
    public dell: HTMLElement | null;
    private tree = new Tree();

    constructor() {
        this.setBut = document.getElementById("setBut");
        this.dell = document.getElementById("dell");

    }

    buttonPress(): void{
        if (this.setBut !== null) {
            this.setBut.onclick = (): void => {
                const data = <HTMLInputElement> document.getElementById("data");
                if (data !== null) {
                    const value = data.valueAsNumber;
                    this.tree.add(value);
                    this.tree.createTreeTable();

                }
            };
        }
        if (this.dell !== null) {
            this.dell.onclick = (): void => {
                const data = <HTMLInputElement> document.getElementById("data");
                if (data !== null) {
                    const value = data.valueAsNumber;
                    this.tree.delete(this.tree.root, value);
                    this.tree.createTreeTable();

                }
            };
        }


    }

}




const BTP = new Browses();
BTP.buttonPress();

