
import { Return } from './Return';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';


export class IF extends Node {
  codigo3direcciones(tabla: Tabla, tree: Tree) {
   // console.log(this.esElseIf)
    const nueva=new Tabla(tabla)
    let condicion=this.condicion.codigo3direcciones(tabla,tree);
    let etiquetaV=tree.getEtiqueta();
    let etiquetaF=tree.getEtiqueta();
    let etiquetaSalida:string;
    if(!this.esElseIf){
      this.etiqueta=etiquetaSalida=tree.getEtiqueta()+"";
    // console.log(etiquetaSalida)
  }else{

    etiquetaSalida=this.etiqueta;
   // console.log(etiquetaSalida)
  }
  //console.log(etiquetaSalida)
    tree.codigo3d.push(`//******IF*****`);
    tree.codigo3d.push(`if(${condicion}==1)goto L${etiquetaV};`);
    tree.codigo3d.push(`goto L${etiquetaF};`);
    tree.codigo3d.push(`L${etiquetaV}:`);
   let datos=null;
    if(this.ListaInstrucciones!==null)
    {
      for (let x = 0; x < this.ListaInstrucciones.length; x++) {
        let res=this.ListaInstrucciones[x].codigo3direcciones(nueva,tree);
        if(res instanceof Break){
           let valor=tree.etiquetasS.pop();tree.etiquetasS.push(valor);
          tree.codigo3d.push(`goto ${valor};`);
          datos =res}
        if(res instanceof Continue){      ;datos= res}
        if(res instanceof Return){    datos=res;
          tree.codigo3d.push(`//****SALIDA DEL RETURN****`);
           if(this.returnnn===null){
           // tree.codigo3d.push(`//****JUAN****`);
             this.returnnn=res.temporal;
             let valor=tree.etiquetasS.pop();tree.etiquetasS.push(valor);
             tree.codigo3d.push(`goto ${valor};`);
            }
           else{
            //  tree.codigo3d.push(`${this.returnnn}=${res.temporal};`);
           let valor=tree.etiquetasS.pop();tree.etiquetasS.push(valor);
           tree.codigo3d.push(`goto ${valor};`);
          }
          // tree.codigo3d.push(`goto L${etiquetaSalida};`);
          }


      }

      tree.codigo3d.push(`goto L${etiquetaSalida};`);
      tree.codigo3d.push(`L${etiquetaF}:`);
    }


// ahora a hacer el else if
    if(this.LIfElse!==null){
      tree.codigo3d.push(`//******else IF*****`);
     // tree.codigo3d.push(`L${etiquetaF}:`);
      this.LIfElse.forEach(elseif => {
        if(elseif instanceof IF){elseif.etiqueta=etiquetaSalida;elseif.returnnn=this.returnnn;}
       elseif.codigo3direcciones(nueva,tree);
    });
    }


// falta el else


if(this.ListaElse!==null){
  tree.codigo3d.push(`//******else*********`);
  this.ListaElse.forEach(element => {
   // if(element instanceof IF){element.etiqueta=etiquetaSalida;}
    let res=element.codigo3direcciones(nueva,tree);
    if(res instanceof Break){
      let valor=tree.etiquetasS.pop();tree.etiquetasS.push(valor);
      tree.codigo3d.push(`goto ${valor};`);
      ;datos =res}
    if(res instanceof Continue){      ;datos= res}
  if(res instanceof  Return)
  {
    datos= res;
    //if(this.returnnn===null){this.returnnn=res.temporal;}else{ tree.codigo3d.push(`${this.returnnn}=${res.temporal};`);}
  }
  });
    //tree.codigo3d.push(`goto L${etiquetaF};`);

}
if(!this.esElseIf){
tree.codigo3d.push(`L${etiquetaSalida}:`);}

return datos;
    // este es el de salida

  }
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
 etiqueta:string;
 returnnn:string;
// tslint:disable-next-line: max-line-length
constructor(esElseIf:boolean,condicion:Node,ListaInstrucciones:Array<Node>, LIfElse:Array<Node>,ListaElse:Array<Node>,line:number,column:number){
  super(null,line,column);
  this.condicion=condicion;
  this.ListaInstrucciones=ListaInstrucciones;
  this.LIfElse=LIfElse;
  this.ListaElse=ListaElse;
  this.esElseIf=esElseIf;
  this.etiqueta="";
  this.returnnn=null;
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
