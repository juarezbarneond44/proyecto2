import {Tabla} from '../Simbols/Tabla';
import {Tree} from '../Simbols/Tree';
import {Type} from '../utilidad/Type';

export abstract class Node {
    line: number;
    column: number;
    type: Type;

    /**
     * @abstract Metodo que sirver para ejecutar una instruccion o expresion
     * si fuera instruccion devuelve nulo y si fuera expresion devuelve un valor
     */
    abstract execute(Tabla: Tabla, tree: Tree): any;
    abstract Traducir(Tabla: Tabla, tree: Tree): any;

    /**
     *
     * @constructor Base para cualquier instruccion o expresion, omitir tipo si fuera una instruccion
     * @param type Tipo de la expresion, si fuera una expresion poner valor de nulo
     * @param line Linea de la instruccion o expresion
     * @param column Columna de la instruccion o expresion
     */
    constructor(type: Type, line: number, column: number) {
        this.type = type;
        this.line = line;
        this.column = column;
    }
}
