
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
/**
 * Permite imprimir expresiones en la consola
 */
export class For extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    tree.pila.push(new Type (types.CICLO));
    let valorsalida:object=null
    let nueva=new Tabla(tabla);
    tree.codigo3d.push("// *****for*****")
    let etiquetaFor=tree.getEtiqueta();
     this.Instruccion.codigo3direcciones(nueva,tree);
     tree.codigo3d.push(`L${etiquetaFor}:`)
    let exprecion=this.Exprecion.codigo3direcciones(nueva,tree);

    let etiquetaV=tree.getEtiqueta();
    let etiquetaF=tree.getEtiqueta();
    tree.etiquetasS.push("L"+etiquetaF);

    tree.codigo3d.push(`if(${exprecion}==1) goto L${etiquetaV};`)
    tree.codigo3d.push(`goto L${etiquetaF};`)

    tree.codigo3d.push(`L${etiquetaV}:`)
if(this.Instrucciones!=null)
{
  let nueva2=new Tabla(nueva);
  this.Instrucciones.forEach(element =>
    {
    let res=element.codigo3direcciones(nueva2,tree);
    if(res instanceof Break)
    {
      tree.codigo3d.push(`goto L${etiquetaF};`)
    }
     else if(res instanceof Continue)
    {
      this.Incremento.codigo3direcciones(nueva,tree);
      tree.codigo3d.push(`goto L${etiquetaFor};`)
    }
    else if(res instanceof Return)
    {
      if(valorsalida===null){valorsalida= res;   tree.codigo3d.push(`goto L${etiquetaF};`)}


    }
  });
}
    // hay que hacer el incremento
    this.Incremento.codigo3direcciones(nueva,tree);
    tree.codigo3d.push(`goto L${etiquetaFor};`)
    tree.codigo3d.push(`L${etiquetaF}:`)
    tree.etiquetasS.pop();
    tree.pila.pop();
    return valorsalida;
  }


  Traducir(tabla: Tabla, tree: Tree) {

let data="for(";
let nueva=new Tabla(tabla);
//tree.Traduccion.push(data);
this.Instruccion.Traducir(nueva,tree);
data=data+tree.Traduccion[tree.Traduccion.length-1];
tree.Traduccion.pop();
data=data+this.Exprecion.Traducir(nueva,tree)+";";
//tree.Traduccion.push(data);
this.Incremento.Traducir(nueva,tree);
data=data+tree.Traduccion[tree.Traduccion.length-1];
tree.Traduccion.pop();
data=data.slice(0, -1);
tree.Traduccion.push(data+"){")
let nueva2=new Tabla(nueva);
if(this.Instrucciones!==null){
this.Instrucciones.forEach(element => {
  element.Traducir(nueva2,tree);
});}

tree.Traduccion.push("}");
return null;

  }
  Instruccion:Node;
  Exprecion:Node;
  Incremento:Node;
  Instrucciones:Array<Node>;
  constructor(Instruccion:Node,Exprecion:Node,Incremento:Node,Instrucciones:Array<Node>,line:number,column:number){
    super(null,line,column);
    this.Exprecion=Exprecion;
    this.Instruccion=Instruccion;
    this.Instrucciones=Instrucciones;
    this.Incremento=Incremento;
  }
  execute(table: Tabla, tree: Tree) {
    tree.pila.push(new Type (types.CICLO));
    const newEntorno=new Tabla(table);


    this.Instruccion.execute(newEntorno,tree);
    let expresion=this.Exprecion.execute(newEntorno,tree);

    if (!(expresion+""=="true" || expresion+""=="false")){
 // error no es una exprecion booleana
      const error = new Exceptionn('Semantico',
      'error en el tipo de exprecion' + this.Exprecion.type,
      this.line, this.column);
      tree.excepciones.push(error);
      tree.pila.pop();
      return null;
     }

    while(expresion){
      const Entorno3=new Tabla(newEntorno);
    // tslint:disable-next-line: prefer-for-of
      for(let x=0;x <this.Instrucciones.length;x++){
        const res =this.Instrucciones[x].execute(Entorno3,tree);
        // aqui ira el break y el continue xD
        if(res instanceof Break){
          tree.pila.pop();
          return null;
        }
        if(res instanceof Continue){break;}
        if(res instanceof Return){  tree.pila.pop();return res;}
    }
    // se hace el incremento
      this.Incremento.execute(newEntorno,tree);
      expresion=this.Exprecion.execute(newEntorno,tree);
      }
    tree.pila.pop();
    return null;



  }

}
