import { Exceptionn } from './../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Type, types } from '../utilidad/Type';
export class StringToUpperCase extends Node{
  execute(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let val=this.expresion.codigo3direcciones(tabla,tree);
    if(this.expresion.type.type==types.STRING)
    {
      tree.codigo3d.push("//*****ToLowerCase******");
      tree.codigo3d.push(`t0=${val};`);
      tree.codigo3d.push(`toUpperCase();`);
      this.type=new Type(types.STRING);
      return val;
//toLowerCase

    }
    else{
      const error = new Exceptionn('Semantico',
        `Error, la expresion no es tipo string`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
    }


  }
  expresion:Node
  constructor(expresion:Node,linea:number,columna:number)
  {
    super(null,linea,columna);
    this.expresion=expresion;
  }
}
