import { ArregloValor } from './../Expresiones/ArregloValor';
import { ListaIdentificado } from './ListaIdentificado';
//import { FuncionEjecutar } from './../Expresiones/FuncionEjecutar';
import { Arithmetic } from './../Expresiones/Arithmetic';
import { Identificador } from './../Expresiones/Identificador';
import { Primitive } from './../Expresiones/Primitive';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";

export class Return extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
// aqui si esta fea la cosa  u.u
if(this.Exprecion!==null)
{
  tree.codigo3d.push("//***return***")
  let valor =this.Exprecion.codigo3direcciones(tabla,tree);
    tree.codigo3d.push(`stack[(int)${tree.punteroReturn}]=${valor};`);
  return this;
}
else {return this;}
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    let data="return ";
    let valor="";
if(this.Exprecion!=null){
 valor=this.Exprecion.Traducir(Tabla,tree);
}
if(this.arrays!=null){
let   arregloDato1=new ArregloValor(true,this.arrays,10,this.line,this.column).Traducir(Tabla,tree)
tree.Traduccion.push(data+arregloDato1+";");
  return null;
}
    tree.Traduccion.push(data+valor+";")
    return null;
  }
  temporal:string;
 entro:boolean;
  Exprecion:Node;
  dato:object;
  arrays:Array<Node>;

      constructor(exprecion:Node,line: number, column: number) {
      super(null, line, column);
      this.entro=false;
      this.Exprecion=exprecion;
      this.dato=null;
      this.arrays=null;
  }
  execute(table: Tabla, tree: Tree) {

    for(let x=0;x<tree.pila.length;x++)
    {
      if(tree.pila[x].type===types.FUNCION){

        this.entro=true;
        if(this.Exprecion==null){
          if(this.arrays!==null){
// arreglo
    let valore:ArregloValor= new ArregloValor(true,this.arrays,10,this.line,this.column).execute(table,tree)
    let dato1=new Type(types.OBJET);
    dato1.typeObjeto=types.ARRAY
    if(valore.type!==null){
    dato1.typeArray=valore.type.type;

    }else{this.type=new Type(types.ARRAY)}


      this.type=dato1;
      this.dato=valore;
      return this;
          }

          this.type=new Type(types.VOID);
          this.dato=null;
          return this;
        }
      const res=  this.Exprecion.execute(table,tree);
      // if(this.Exprecion==null){
       //  this.dato=new Primitive(new Type(types.VOID),null,this.line,this.column);
        // return this;        }
        //if(this.dato instanceof Identificador){
         // this.type=this.Exprecion.type;
        //  this.dato=this.Exprecion.type;
       // }

        if (this.Exprecion instanceof ListaIdentificado){
        if(this.Exprecion.type===null){this.type=new Type(types.ERROR);}
        else{this.type=this.Exprecion.type; }
        this.dato=res;
         return this;
        }
        else if (this.Exprecion instanceof Arithmetic){
        this.type=this.Exprecion.type;
        this.dato=res;
         return this;
        }
        else if(this.Exprecion instanceof Primitive){

          this.type=this.Exprecion.type;
          this.dato=res;
           return this;
        }else if (this.Exprecion instanceof Identificador){
          if(this.Exprecion.type===null){this.type=new Type(types.ERROR);}
          else{this.type=this.Exprecion.type;}
          this.dato=res;
          return this;
        }
        /*else if(this.Exprecion instanceof FuncionEjecutar)
        {
          this.type=this.Exprecion.type;
          this.dato=res;
          return this;
        } */

        this.type=this.Exprecion.type;
        this.dato=res;

        return this;
      }

    }
    if(!this.entro){
    const error = new Exceptionn('Semantico',
    `RETURN no esta dentro de una funcion`,
    this.line, this.column);
    tree.excepciones.push(error);
    return null;}
    else{   return this;}
  }
}
