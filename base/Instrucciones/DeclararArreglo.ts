import { ValorArreglo } from './../Expresiones/ValorArreglo';
import { nuevoArreglo } from './../Expresiones/nuevoArreglo';
import { Identificador } from './../Expresiones/Identificador';
import { Simbol } from './../Simbols/Simbol';

import { Return } from './Return';
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import { trace } from 'console';
import { Expression } from '@angular/compiler';
/**
 * Permite imprimir expresiones en la consola
 */
export class DeclararArreglo extends Node{
  valorInicial:boolean;
  identificador:string;
  cantidadDimenciones:number;
  expresion:Node;
  arregloExpreciones:Array<Node>;

  constructor(  valorInicial:boolean,identificador:string,tipo:Type,cantidadDimenciones:number,expresion:Node,arregloexpresion:Array<Node>, linea:number,columna:number)
  {
    super(tipo,linea,columna)
  this.type=tipo
  this.valorInicial=valorInicial;
  this.identificador=identificador;
  this.cantidadDimenciones=cantidadDimenciones;
  this.expresion=expresion;
  this.arregloExpreciones=arregloexpresion;



  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let res=tabla.getVariable(this.identificador);
    if(res!==null){
      const error = new Exceptionn('Semantico',
      "el id del arreglo ya existe",
      this.line, this.column);
  tree.excepciones.push(error);
  return "error";

    }

    let temporal="t"+tree.getContador();

    let tipo=new Type(types.ARRAY)
    tipo.typeArray=this.type.type
    let simbolo=new Simbol(this.valorInicial,tipo,this.identificador,temporal);
    simbolo.DemencionesArray=this.cantidadDimenciones;
     let val=new ValorArreglo(this.type,this.cantidadDimenciones,this.expresion,this.arregloExpreciones,this.line,this.column).codigo3direcciones(tabla,tree);
     tree.codigo3d.push(`//** guardar variable en el stack ***`);
     tree.codigo3d.push(`${temporal}=s+${tree.getSTACK()};`);
     tree.codigo3d.push(`stack[(int)${temporal}]=${val};`);
     tabla.setVariable(simbolo);
     return simbolo;


  }

  execute(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
}



