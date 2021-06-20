
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import { Simbol } from "../Simbols/Simbol";


export class DeclararArray  {
  tipo:Type;
  valor:object;
  ListaPosiciones:Array<number>;
constructor(  tipo:Type,valor:object,ListaPosiciones:Array<number>)
{
 this.tipo=tipo;
  this.valor=valor;
  this.ListaPosiciones=new Array(0,0,0,0,0,0,0,0,0,0);
 for (let x = 0; x < ListaPosiciones.length; x++) {
   const element = ListaPosiciones[x];
   this.ListaPosiciones[x]=element;


 }
}

}
