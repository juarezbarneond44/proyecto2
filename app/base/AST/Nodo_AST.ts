
class Nodo_AST{
    name:String;
    parent:Nodo_AST;
    children: Array<Nodo_AST>;

    constructor(name:String, parent:Nodo_AST, children:Array<Nodo_AST>){
        this.name = name;
        this.parent = parent;
        this.children = children;
    }

}
export {Nodo_AST};
