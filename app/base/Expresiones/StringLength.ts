import { ArrayBusqueda } from './ArrayBusqueda';
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


   }else if(this.expresion.type.type==types.ARRAY)
   {
    tree.codigo3d.push("//*****length del arreglo****");

    let val=tree.getEtiqueta();
    let vals=tree.getEtiqueta();
    let etiqueta="t"+tree.getContador();
    let temporal="t"+tree.getContador();
    if(this.expresion instanceof ArrayBusqueda)
    {tree.codigo3d.push(`${temporal}=${valor};`)
    }else{tree.codigo3d.push(`${temporal}=stack[(int)${valor}];`)}

    tree.codigo3d.push(`if(${temporal}==-1)goto L${val};`)
    tree.codigo3d.push(`${temporal}=${temporal}+1;`)
    tree.codigo3d.push(`${etiqueta}=heap[(int)${temporal}];`)
    tree.codigo3d.push(`goto L${vals};`)
    tree.codigo3d.push(`L${val}:`)
    tree.codigo3d.push(`${etiqueta}=0;`)
    tree.codigo3d.push(`L${vals}:`)
    this.type=new Type(types.NUMERIC);
    return etiqueta
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
