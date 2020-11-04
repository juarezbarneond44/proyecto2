import { Arithmetic } from './Arithmetic';
import { Exceptionn } from './../utilidad/Exceptionn';
import { uptime } from "process";
import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Type,types } from '../utilidad/Type';
export class StringConcat extends Node{
  execute(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let valor=this.expresion.codigo3direcciones(tabla,tree);
    let valor2=this.expresion2.codigo3direcciones(tabla,tree);
    let contador1=tree.getContador();
    if(this.expresion.type.type==types.STRING&&this.expresion2.type.type==types.STRING)
    {
      this.type=this.expresion.type;
      tree.codigo3d.push("//************Concat***********");
      tree.codigo3d.push("t"+contador1+"=p;"); // guardara el inicio de la cadena
      tree.codigo3d.push("t0="+valor+";");  //cargamos lavieja cadena
      tree.codigo3d.push("concatenarString();"); //realizamos la accion

      tree.codigo3d.push("t0="+valor2+";");  //cargamos lavieja cadena
      tree.codigo3d.push("concatenarString();"); //realizamos la accion
      tree.codigo3d.push("t0=p;");
      tree.codigo3d.push("t1=-1;");
      tree.codigo3d.push("guardarString();");


      return "t"+contador1;
    }
    else{
     const error = new Exceptionn('Semantico',
     'error debe ser una exprecion string' ,
     this.line, this.column);
     tree.excepciones.push(error);
      return error;
    }
  }
  expresion:Node;
  expresion2:Node;
  constructor( expresion:Node,expresion2:Node,linea:number,columna:number)
  {
    super(null,linea,columna)
    this.expresion=expresion;
    this.expresion2=expresion2;
  }
}
