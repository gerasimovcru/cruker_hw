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

class Tree<T> {

    private _root: TreeNode<T> | null;

    constructor() {
        this._root = null;
    }

    get root(): TreeNode<T> | null {
        return this._root;
    }

    set root(value: TreeNode<T> | null) {
        this._root = value;
    }

    private show(searchValue: T | undefined = undefined, node: TreeNode<T> | null = this._root, position: string | null = "root", firstValueFlag: number = 0): string {

        if (!node) {
            return "";
        }
        let li = "";
        let ul;
        if (node.value !== null) {
            if ((node.value === searchValue) && (firstValueFlag === 0)) {
                li += "<div class = 'value searchValue'>" + position + "->" + node.value + "</div>";
                firstValueFlag = 1;// можно изменить на 0 чтобы отобразить все(одинаковые) числа при поиске
            } else {
                li += "<div class = 'value'>" + position + ": " + node.value + "</div>";
            }

                if (node.right !== null) {
                    li += "<div class = 'knot right'>" + this.show(searchValue, node.right, "right", firstValueFlag) + "</div>";
                }

                if (node.left !== null) {
                    li += "<div class = 'knot left'>" + this.show(searchValue, node.left, "left", firstValueFlag) + "</div>";
                }
        }
        if (li) {
            ul =  li ;
        }

        console.log(node.value);

        return ul ?? "";
    }

    private minimum(node: TreeNode<T> | null = this._root): T | undefined {

        let min;
        if (!node) {
            return min;
        }

        if (node.left !== null) {
            min = this.minimum(node.left);
        } else {
            min = node.value;
        }

        return min;


    }

    private maximum(node: TreeNode<T> | null = this._root): T | undefined{

        let max;
        if (!node) {
            return max;
        }
        if (node.right !== null){
            max = this.maximum(node.right);
        } else {
            max = node.value;
        }

        return max;

    }


    search(node: TreeNode<T> | null = this._root, key: T): T | undefined {

        let searchValue;
        if (!node) {
            return undefined;
        }

        if (node !== null) {
            if (key === node.value) {
                searchValue = node.value;
            } else {
                if (key < node.value) {
                    searchValue = this.search(node.left, key);
                } else {
                    searchValue = this.search(node.right, key);
                }
            }
        }
        return searchValue;
    }

    createTreeTable(value: T | undefined = undefined): void {
        const container = document.getElementById("container");
        if (container !== null) {
            container.innerHTML = <string> this.show(value);
        }
    }

    delete(node: TreeNode<T> | null = this._root, key: T): TreeNode<T> | null {

        if (!node) {
            return null;
        }

        if (key < node.value) {
            node.left = this.delete(node.left, key);
        } else if (key > node.value) {
            node.right = this.delete(node.right, key);
        } else if (node.right !== null) {
            node.value = <T><unknown> this.minimum(node.right);
            node.right = this.delete(node.right, node.value);
        } else if (node.left !== null) {
            node.value = <T><unknown> this.maximum(node.left);
            node.left = this.delete(node.left, node.value);
        } else {
            if ((node === this._root) && (node?.value === key)) {
                this._root = null;
                node = null;
            }
            node = null;
        }

        return node;

    }

    add(value: T): TreeNode<T> | undefined {

        const newNode = new TreeNode(value, null, null);
        if (!this._root) {
            this._root = newNode;
            return newNode;
        }

        let currNode = this._root;

        while (currNode) {
            if (newNode.value < currNode.value) {
                if (!currNode.left) {
                    currNode.left = newNode;
                    return currNode.left;
                }
                currNode = currNode.left;
            } else {
                if (!currNode.right) {
                    currNode.right = newNode;
                    return currNode.right;
                }
                currNode = currNode.right;
            }
        }
        return newNode;
    }

}

export class Browses{
    public setButton: HTMLElement | null;
    public dellButton: HTMLElement | null;
    public searchButton: HTMLElement | null;
    private tree = new Tree();

    constructor() {
        this.setButton = document.getElementById("setBut");
        this.dellButton = document.getElementById("dellBut");
        this.searchButton = document.getElementById("searchBut");
    }


    buttonPress(): void{
        if (this.setButton !== null) {
            this.setButton.onclick = (): void => {
                const data = <HTMLInputElement> document.getElementById("data");
                if (data !== null) {
                    const value = data.valueAsNumber;
                    this.tree.add(value);
                    this.tree.createTreeTable();

                }
            };
        }
        if (this.dellButton !== null) {
            this.dellButton.onclick = (): void => {
                const data = <HTMLInputElement> document.getElementById("data");
                if (data !== null) {
                    const value = data.valueAsNumber;
                    this.tree.delete(this.tree.root, value);
                    this.tree.createTreeTable();

                }
            };
        }

        if (this.searchButton !== null) {
            this.searchButton.onclick = (): void => {
                const data = <HTMLInputElement> document.getElementById("data");
                if (data !== null) {
                    const value = data.valueAsNumber;
                    const searchValue = this.tree.search(this.tree.root, value);
                    if (searchValue === undefined) {
                        alert(`ERROR: tree not have value = ${value}`);
                    }
                    this.tree.createTreeTable(value);

                }
            };
        }


    }

}




const BTP = new Browses();
BTP.buttonPress();
