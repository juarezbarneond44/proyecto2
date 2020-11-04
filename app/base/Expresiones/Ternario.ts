
import { types } from 'util';
import { Node } from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Exceptionn } from "../utilidad/Exceptionn";


export class Ternario extends Node {
  codigo3direcciones(tabla: Tabla, tree: Tree) {


    let etiquetaT=tree.getEtiqueta();
    let etiquetaF=tree.getEtiqueta();
    let etiquetaSalida=tree.getEtiqueta();
    let condicion=this.condicion.codigo3direcciones(tabla,tree);
    let  temporal=tree.getContador();
    tree.codigo3d.push(`//ternario`)
    tree.codigo3d.push(`if(${condicion}==1)goto L${etiquetaT};`) // if(tn==1) goto Ln
    tree.codigo3d.push(`goto L${etiquetaF};`) //goto Ln;
    tree.codigo3d.push(`L${etiquetaT}:`) // Ln:
    tree.codigo3d.push(`t${temporal}=${this.operadorVerdadero.codigo3direcciones(tabla,tree)};`) //tn=valor;
    tree.codigo3d.push(`goto L${etiquetaSalida};`) // Ln+1:
    tree.codigo3d.push(`L${etiquetaF}:`) // Ln+1:
    tree.codigo3d.push(`t${temporal}=${this.operadorFalso.codigo3direcciones(tabla,tree)};`) //tn=valor;
    tree.codigo3d.push(`L${etiquetaSalida}:`) // Ln+1:
    this.type=this.operadorVerdadero.type;
    return "t"+temporal;

  }
  Traducir(Tabla: Tabla, tree: Tree) {
let data=this.condicion.Traducir(Tabla,tree)+"?\n";
let falso="";
let verdadero="";
if(this.operadorFalso!==null)
{
  falso=this.operadorFalso.Traducir(Tabla,tree);
}
if(this.operadorVerdadero!==null){
  verdadero=this.operadorVerdadero.Traducir(Tabla,tree);
}
return data+verdadero+":"+falso;
  }


  condicion: Node;
  operadorVerdadero: Node;
  operadorFalso: Node;

constructor(condicion:Node,operadorVerdadero:Node,operadorFalso:Node,line:number,column:number)
{
  super(null,line,column);
  this.condicion=condicion;
  this.operadorFalso=operadorFalso;
  this.operadorVerdadero=operadorVerdadero;
}

   execute(table: Tabla, tree: Tree) {
  const condicion=this.condicion.execute(table,tree);
  if(condicion instanceof Exceptionn)
  {
    const error = new Exceptionn('Semantico',
    `no se puede operar un error`,
    this.line, this.column);
    tree.excepciones.push(error);
    return error;
  }


  if((condicion+"")=="true"){
    const valV= this.operadorVerdadero.execute(table,tree);
      this.type = this.operadorVerdadero.type;
      return valV;
    }else if((condicion+"")=="false"){
      const valF= this.operadorFalso.execute(table,tree);
      this.type = this.operadorFalso.type;

      return valF;
    }else{
       const error = new Exceptionn('Semantico',
    `Condicion No valida `+this.condicion.type ,
    this.line, this.column);
           tree.excepciones.push(error);
           return error;}

  }



}




