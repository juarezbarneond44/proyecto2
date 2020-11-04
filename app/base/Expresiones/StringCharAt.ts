import { Exceptionn } from './../utilidad/Exceptionn';

import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Type, types } from '../utilidad/Type';
export class StringCharAt extends Node{
  execute(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let var1=this.Expression1.codigo3direcciones(tabla,tree);
    let var2=this.Expression2.codigo3direcciones(tabla,tree);
if(this.Expression1.type.type==types.STRING&&this.Expression2.type.type==types.NUMERIC)
{


tree.codigo3d.push(`//*****CahrAt*****`)
  tree.codigo3d.push(`t0=${var1};`)
  tree.codigo3d.push(`t3=${var2};`)
  tree.codigo3d.push(`CharAt();`);
  let etiquetaV=tree.getEtiqueta();
  let etiquetaF=tree.getEtiqueta();
  let etiquetas=tree.getEtiqueta();

  tree.codigo3d.push(`if(t5==1)goto L${etiquetaV};`);
  tree.codigo3d.push(`goto L${etiquetaF};`);
  let result=tree.getContador();
  tree.codigo3d.push(`L${etiquetaV}:`);
  // hay que guardar el nuevo caracter en el heap
  tree.codigo3d.push(`t${result}=p;`);
  tree.codigo3d.push("t0=p;");
  tree.codigo3d.push("guardarString();");
  tree.codigo3d.push("t0=p;");
  tree.codigo3d.push("t1=-1;");
  tree.codigo3d.push("guardarString();");
  tree.codigo3d.push(`goto L${etiquetas};`);
  // etiqueta falsa
  tree.codigo3d.push(`L${etiquetaF}:`);
  tree.codigo3d.push(`t${result}=p;`);
tree.codigo3d.push("t0=p;");
  tree.codigo3d.push("t1=-1;");
  tree.codigo3d.push("guardarString();");
  tree.codigo3d.push(`L${etiquetas}:`);
  this.type=new Type(types.STRING);
return "t"+result;

}else
{
  const error = new Exceptionn('Semantico',
        `los Tipos de las expresiones no son validos}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
}
  }
  Expression1:Node;
  Expression2:Node;
  constructor(  Expression1:Node,    Expression2:Node,linea:number,columna:number)
  {
    super(null,linea,columna)
    this.Expression1=Expression1;
    this.Expression2=Expression2;
  }
}
