import { Return } from './Return';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';

/**
 * Permite imprimir expresiones en la consola
 */
export class DoWhile extends Node{
  Traducir(tabla: Tabla, tree: Tree) {
    const newtable = new Tabla(tabla);
    let data="do{";
    tree.Traduccion.push(data);
    if(this.Instruciones!==null){
      this.Instruciones.forEach(element => {
        element.Traducir(newtable,tree);
        });
    }
  data="}while("+this.exprecion.Traducir(newtable,tree)+")\n";
  tree.Traduccion.push(data);

    return null;
  }
  exprecion:Node;
  Instruciones:Array<Node>;
  constructor(exprecion:Node,Instruciones:Array<Node>,line:number,column:number){
    super(null,line,column);
    this.exprecion=exprecion;
    this.Instruciones=Instruciones;
  }
  execute(table: Tabla, tree: Tree) {

        let result: Node;
        tree.pila.push(new Type (types.CICLO));
        do {
      const newtable = new Tabla(table);
        // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.Instruciones.length; i++) {
         const res = this.Instruciones[i].execute(newtable, tree);
         if(res instanceof Return){ tree.pila.pop(); return res;}
         if(res instanceof Break){
          tree.pila.pop();
          return null;
        }
        if(res instanceof Continue){break;}
           }
      result = this.exprecion.execute(table, tree);
      if (result instanceof Exceptionn) {
          tree.pila.pop();
          return null;
            }
      if (this.exprecion.type.type !== types.BOOLEAN) {   const error = new Exceptionn('Semantico',
        `Se esperaba una expresion booleana para la condicion`,
        this.line, this.column);
        tree.excepciones.push(error);
        tree.pila.pop();
        return null;}


        } while (result);
        tree.pila.pop();
    return null;
  }

}
