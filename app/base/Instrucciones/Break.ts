import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import {types} from "../utilidad/Type";

export class Break extends Node{
  Traducir(Tabla: Tabla, tree: Tree) {
    tree.Traduccion.push( "break;");
   return null;
  }
 entro:boolean;
      constructor(line: number, column: number) {
      super(null, line, column);
      this.entro=false;
  }
  execute(table: Tabla, tree: Tree) {
    tree.pila.forEach(dato=>{

      if(dato.type===types.CICLO||dato.type===types.SWITCH)
      {
        this.entro=true;
        return this;
      }
    });
    if(!this.entro){
    const error = new Exceptionn('Semantico',
    `break no esta dentro de un ciclo o un switch`,
    this.line, this.column);
    tree.excepciones.push(error);
    return null;}
    else{   return this;}
  }
}
