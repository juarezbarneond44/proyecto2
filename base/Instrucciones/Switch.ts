
import { Return } from '../Instrucciones/Return';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import{Case} from "../Instrucciones/Case";
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';


/**
 * Permite imprimir expresiones en la consola
 */
export class Switch extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    tree.pila.push(new Type (types.SWITCH));
    tree.codigo3d.push("//********Switch*******")
    let expresion=this.expression.codigo3direcciones(tabla,tree);
    let nueva=new Tabla(tabla)
    let etiqueta=tree.getEtiqueta();
    let dato:any=false;
    this.ListaInstrucciones.forEach(element => {
      if(element instanceof Case)
      {
        element.SoloExpresion=true;
        element.temporal=expresion;
        element.etiqueta="L"+etiqueta;
      }
      dato= element.codigo3direcciones(nueva,tree);
      if(dato instanceof Continue){return dato}
       if(dato){
        tree.codigo3d.push("//********Condicon Default*******")
        let val=tree.getEtiqueta();
        tree.codigo3d.push(`goto L${val};`);
        element.etiquetaV=val;
      }
    });
    this.ListaInstrucciones.forEach(element => {
      if(element instanceof Case)
      {
        element.SoloExpresion=false;
        element.temporal=expresion;
        element.etiqueta="L"+etiqueta;
      }
      element.codigo3direcciones(nueva,tree);
    });




    tree.codigo3d.push("L"+etiqueta+":");
    tree.pila.pop();
  }





  Traducir(tabla: Tabla, tree: Tree) {
  let data="switch ("+this.expression.Traducir(tabla,tree)+"){";
  tree.Traduccion.push(data);
  let nueva=new Tabla(tabla)
  this.ListaInstrucciones.forEach(element => {
  element.Traducir(nueva,tree);
});


tree.Traduccion.push("}");
return null;
    }
    expression : Node;
    ListaInstrucciones:Array<Case>;
    default:Case;

    constructor(expression: Node, ListaInstrucciones:Array<Case>,line: number, column: number){
        super(null, line, column);
        this.expression = expression;
        this.ListaInstrucciones=ListaInstrucciones;
        this.default=null;
    }

    execute(table: Tabla, tree: Tree): any {
    let  hayDefault=false;
    let casoCorrecto=false;
    let NoHayBreak=false;
    tree.pila.push(new Type (types.SWITCH));
    const result =this.expression.execute(table,tree);
    if (result instanceof Exceptionn) {
        tree.pila.pop();
        return null;
      }
      // ahora validar si la exprecion es correctacon algun case
   // tslint:disable-next-line: prefer-for-of
   for(let x=0 ; x<this.ListaInstrucciones.length;x++){

    if(this.ListaInstrucciones[x].expression==null){hayDefault=true;}
    else{
      // viene un case por lo tanto hay que obtener su expresion
      const exprecionCaso=this.ListaInstrucciones[x].expression.execute(table,tree);
      if(exprecionCaso==result || NoHayBreak){
        //significa que el caso es verdadero por lo tanto hay que realizar sus instrucciones
        casoCorrecto=true;
        const infoCaso=this.ListaInstrucciones[x].execute(table,tree);
        // tslint:disable-next-line: align
        if(infoCaso instanceof Return){ tree.pila.pop(); return infoCaso;}
        if(infoCaso instanceof Break){
          tree.pila.pop();
          return null;
        }else if(infoCaso instanceof Continue) {
            tree.pila.pop();
            return infoCaso;
          }

        else if (infoCaso instanceof Case) { NoHayBreak=true;}
    }
  }
    if(NoHayBreak &&this.ListaInstrucciones[x].expression==null){

      // es un default
       const infoCaso=this.ListaInstrucciones[x].execute(table,tree);
      // tslint:disable-next-line: align
      if(infoCaso instanceof Continue || infoCaso instanceof Break){
        tree.pila.pop();
        return infoCaso;}
       if(infoCaso instanceof Return){ tree.pila.pop(); return infoCaso;}
        else if (infoCaso instanceof Case){
          NoHayBreak=infoCaso.bandera;
        }

    }
  }
  //aqui es cuando no hay  ninguno corecto por lo tanto hay que ver si hay default y si lo hay ejecutar todo lo que este debajo de el
    if(hayDefault&&!casoCorrecto){
    let banderaDefault=false;
    for(let x=0;x<this.ListaInstrucciones.length;x++){
    if(this.ListaInstrucciones[x].expression==null ||banderaDefault ) {
    banderaDefault=true;
       // es un default
       const infoCaso=this.ListaInstrucciones[x].execute(table,tree);
      // tslint:disable-next-line: align
      if(infoCaso instanceof Return){ tree.pila.pop(); return infoCaso;}
      if(infoCaso instanceof Continue || infoCaso instanceof Break){
        tree.pila.pop();
        return infoCaso;}
}

    }


  }
  return null;
}
}
