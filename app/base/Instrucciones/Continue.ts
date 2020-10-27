import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import {types} from "../utilidad/Type";

export class Continue extends Node{
  Traducir(Tabla: Tabla, tree: Tree) {
   tree.Traduccion.push( "continue;");
   return null;
  }
 entro:boolean;
      constructor(line: number, column: number) {
      super(null, line, column);
      this.entro=false;
  }
  execute(table: Tabla, tree: Tree) {
    tree.pila.forEach(dato=>{

      if(dato.type===types.CICLO)
      {
        this.entro=true;
        return this;
      }
    });
    if(!this.entro){
    const error = new Exceptionn('Semantico',
    `Continue no esta dentro de un ciclo `,
    this.line, this.column);
    tree.excepciones.push(error);
    return null;}
    else{   return this;}
  }
}
