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
    Traducir(Tabla: Tabla, tree: Tree) {

      if(this.expression!==null){
      let data="  case "+this.expression.Traducir(Tabla,tree)+": \n";
      tree.Traduccion.push(data);
      if(this.ListaInstrucciones!==null){
      this.ListaInstrucciones.forEach(element => {
      element.Traducir(Tabla,tree);
      });}}else{
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

    constructor(expression: Node, ListaInstrucciones:Array<Node>,line: number, column: number){
        super(null, line, column);
        this.expression = expression;
        this.ListaInstrucciones=ListaInstrucciones;
        this.bandera = false;

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




