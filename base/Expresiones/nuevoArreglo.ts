import { Exceptionn } from './../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class nuevoArreglo extends Node{
  numero:Node;
  constructor(numero:Node,linea:number,columna:number)
  {
    super(null,linea,columna);
    this.numero=numero;

  }
  execute(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error("Method not implemented.");
  }
  codigo3direcciones(Tabla: Tabla, tree: Tree) {

    let dato= this.numero.codigo3direcciones(Tabla,tree);
    if(this.numero.type.type===types.NUMERIC)
    { this.type=this.numero.type;
      return dato;
    }
    else{
      const error = new Exceptionn('Semantico',
      "el id del arreglo ya existe",
      this.line, this.column);
  tree.excepciones.push(error);
  return "error";
    }
  }
}
