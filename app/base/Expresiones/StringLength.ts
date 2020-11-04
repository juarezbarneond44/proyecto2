import { Exceptionn } from './../utilidad/Exceptionn';

import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import{Type, types} from "../utilidad/Type";
export class StringLength extends Node{
  execute(Tabla: Tabla, tree: Tree) {
     throw new Error("Method not implemented.");
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
     let valor=this.expresion.codigo3direcciones(tabla,tree);
   if(this.expresion.type.type==types.STRING)
   {
     tree.codigo3d.push("//************Length***********");
     tree.codigo3d.push(`t0=${valor};`);
     tree.codigo3d.push(`tamanioString();`);
     let temp=tree.getContador();
     tree.codigo3d.push(`t${temp}=t4;`);
     this.type=new Type(types.NUMERIC);
     return "t"+temp;


   }
   else{
    const error = new Exceptionn('Semantico',
    'error debe ser  una exprecion string' ,
    this.line, this.column);
    tree.excepciones.push(error);
     return error;
   }
  }

expresion:Node;
constructor(expresion:Node,linea:number,column:number)
{
  super(null,linea,column)
  this.expresion=expresion;
}


}
