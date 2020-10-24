import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import { Simbol } from "../Simbols/Simbol";

/**
 * Permite imprimir expresiones en la consola
 */
export class GraficarEntorno extends Node{
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    tree.Traduccion.push("graficar_ts;")
    let aux=Tabla;
    // recorrer la tabla de simbolos
    while(aux.Previous!=null){
      aux=aux.Previous;
    }
    aux.setVariable(new Simbol(true,null,"GraficarEntornosJuanito44",Tabla));
    return null;
  }
  constructor(line:number,column:number){
    super(null,line,column);
  }
  execute(table: Tabla, tree: Tree) {
    let aux=table;
    // recorrer la tabla de simbolos
    while(aux.Previous!=null){
      aux=aux.Previous;
    }
    aux.setVariable(new Simbol(true,null,"GraficarEntornosJuanito44",table));
    return null;

  }


}
