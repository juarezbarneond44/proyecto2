import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Parentesis extends Node{
  expresion:Node;
  constructor(expre:Node,lin:number,col:number){
    super(null,lin,col);
    this.expresion=expre;
  }

  execute(Tabla: Tabla, tree: Tree) {
   let data=this.expresion.execute(Tabla,tree);
   this.type=this.expresion.type;
   return data;
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    let data="("+this.expresion.Traducir(Tabla,tree)+")";

    return data;
  }

}
