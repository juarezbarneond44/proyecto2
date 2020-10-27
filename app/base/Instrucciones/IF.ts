
import { Return } from './Return';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';


export class IF extends Node {
  Traducir(tabla: Tabla, tree: Tree) {
const nueva=new Tabla(tabla)
    let data="if(";
    data=data+this.condicion.Traducir(tabla,tree)+"){";
    tree.Traduccion.push(data);
    if(this.ListaInstrucciones!=null)
    {
      for (let x = 0; x < this.ListaInstrucciones.length; x++) {
        this.ListaInstrucciones[x].Traducir(nueva,tree);
      }
    }
    data="}";
    tree.Traduccion.push(data);

  // ya esta el if faltael else if

if(this.LIfElse!==null){
  this.LIfElse.forEach(elseif => {
   tree.Traduccion.push("else ");
    elseif.Traducir(nueva,tree);
 });

}

    if(this.ListaElse!==null){
    tree.Traduccion.push("else{");
    this.ListaElse.forEach(element => {
      element.Traducir(nueva,tree);});
    tree.Traduccion.push("}");
  }




return null;

  }
 condicion:Node;
 ListaInstrucciones:Array<Node>;
 LIfElse:Array<Node>;
 ListaElse:Array<Node>;
 esElseIf:boolean;
// tslint:disable-next-line: max-line-length
constructor(esElseIf:boolean,condicion:Node,ListaInstrucciones:Array<Node>, LIfElse:Array<Node>,ListaElse:Array<Node>,line:number,column:number){
  super(null,line,column);
  this.condicion=condicion;
  this.ListaInstrucciones=ListaInstrucciones;
  this.LIfElse=LIfElse;
  this.ListaElse=ListaElse;
  this.esElseIf=esElseIf;
}
  execute(table: Tabla, tree: Tree) {


    const condicion=this.condicion.execute(table,tree);
    if (condicion instanceof Exceptionn)
    {
      // marcar error de error
      const error = new Exceptionn('Semantico',
             `no se puede ejecutar un error`,
             this.line, this.column);
             tree.excepciones.push(error);
      return null;
    }

    if(condicion+""==="true"){

      const newTable=new Tabla(table);
      // tslint:disable-next-line: prefer-for-of
      if(this.ListaInstrucciones===null){return null}
      for(let x=0;x <this.ListaInstrucciones.length;x++){
        if(this.ListaInstrucciones+""===";"){continue;}
        const resultado=this.ListaInstrucciones[x].execute(newTable,tree);
        if(resultado instanceof Return){
            return resultado;
        }
        if(resultado instanceof Continue){return resultado;}
        if(resultado instanceof Break){return resultado;}
        // AQUI VENDRA EL RESULT CON VOID Y ATRIBUTO
      }
      if(this.esElseIf){return true;}
      return null;
    }
    else if(condicion+""==="false"){

        if(this.LIfElse!=null){

          const newTable=new Tabla(table);
          // tslint:disable-next-line: prefer-for-of
          for(let x=0;x <this.LIfElse.length;x++){
           const elseif= this.LIfElse[x];
           const resultado=elseif.execute(newTable,tree);
           if(resultado+""==="true"){return null;}
           if(resultado instanceof Return){return resultado;}
            if(resultado instanceof Continue){return resultado;}
            if(resultado instanceof Break){return resultado;}
            // aca va a ir el return
          }


        }
      // aqui se evaluara el else si todo lo demas es false
        if(this.ListaElse!=null){
        const newTable=new Tabla(table);
        // tslint:disable-next-line: prefer-for-of
        for(let x=0;x <this.ListaElse.length;x++){

          const resultado=this.ListaElse[x].execute(newTable,tree);
          if(resultado instanceof Return){return resultado;}
          if(resultado instanceof Continue){return resultado;}
          if(resultado instanceof Break){return resultado;}
          // aca va a ir el return
        }
          return null;
      }
      return null;
    }
    else{
      const error = new Exceptionn('Semantico',
      `exprecion no valida`,
      this.line, this.column);
      tree.excepciones.push(error);
      return null;
    }







  }
}
