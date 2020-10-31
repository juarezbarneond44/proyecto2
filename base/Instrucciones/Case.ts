import { Arithmetic } from './../Expresiones/Arithmetic';
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
export class Case extends Node{
    codigo3direcciones(tabla: Tabla, tree: Tree) {
      if(this.SoloExpresion){
        if(this.expression!==null){
        tree.codigo3d.push("//********Condicion case*******")
        let comparacion=new Arithmetic(this.temporal,this.expression,"==",this.line,this.column);
// comparacion es 1 o 0

      let expresion=comparacion.codigo3direcciones(tabla,tree);
     // console.log(expresion)
     this.etiquetaV=tree.getEtiqueta();

    tree.codigo3d.push(`if(1==${expresion})goto L${this.etiquetaV};`);
     // tree.codigo3d.push(`if(${this.temporal}==${expresion})goto L${this.etiquetaV};`);
    return false;
      }else{return true;}
      }
      else{
      tree.codigo3d.push("//********case*******")
      tree.codigo3d.push(`L${this.etiquetaV}:`);
let returnvalor:Object=null;
     if(this.ListaInstrucciones!==null){
for (let x = 0; x <  this.ListaInstrucciones.length; x++) {
  const element =  this.ListaInstrucciones[x];
      let res=element.codigo3direcciones(tabla,tree);
    // si es break;
    if(res instanceof Break ){

    tree.codigo3d.push(`goto ${this.etiqueta};`);
      }
   else  if(res instanceof Continue ){


    tree.codigo3d.push(`goto ${this.etiqueta};`);
    if(returnvalor===null){returnvalor= res;}
     }
     else  if(res instanceof Return ){
       returnvalor= res;
    }
    }
      }
return returnvalor;


    }
    return false;
    }
    Traducir(Tabla: Tabla, tree: Tree) {

      if(this.expression!==null){
      let data="  case "+this.expression.Traducir(Tabla,tree)+": \n";
      tree.Traduccion.push(data);
      if(this.ListaInstrucciones!==null){
      this.ListaInstrucciones.forEach(element => {
      element.Traducir(Tabla,tree);
      });}
    }else{
        let data="  default: \n";
        tree.Traduccion.push(data);
        if(this.ListaInstrucciones!==null){
        this.ListaInstrucciones.forEach(element => {
        element.Traducir(Tabla,tree);
        });
      }}
      return null;
    }
    expression : Node;
    ListaInstrucciones:Array<Node>;
    bandera:boolean;
    temporal:Node;
    etiqueta:string;
    SoloExpresion:boolean;
    etiquetaV:number;
    etiquetaFinal:string;
    valorSalida:object
    constructor(expression: Node, ListaInstrucciones:Array<Node>,line: number, column: number){
        super(null, line, column);
        this.expression = expression;
        this.ListaInstrucciones=ListaInstrucciones;
        this.SoloExpresion=this.bandera = false;
        this.etiqueta=null;
        this.etiquetaV=-1;
        this.valorSalida=null;

    }

    execute(table: Tabla, tree: Tree): any {
      this.bandera=true;
      if(this.ListaInstrucciones==null){ return this;}
      const newTable=new Tabla(table);
      let datoEnviar;
      let estado=false;


      // tslint:disable-next-line: prefer-for-of
      for(let x=0;x<this.ListaInstrucciones.length;x++){
        const red=this.ListaInstrucciones[x].execute(newTable,tree);
        if((red instanceof Break || red instanceof Continue|| red instanceof Return)&&!estado){
          return red ;
        }}
        return this;
      }
    }




