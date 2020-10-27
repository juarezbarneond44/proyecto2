import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Primitive extends Node{
    Traducir(Tabla: Tabla, tree: Tree) {
      if(this.type.type===types.STRING){
        return "\""+this.value+"\"";
      }
      return this.value;
    }
    value: Object;

    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type:Type, value: Object, line: number, column: number){
        super(type, line, column);
        this.value = value;
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param Tabla Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(Tabla: Tabla, tree: Tree) {
        return this.value;
    }
}
