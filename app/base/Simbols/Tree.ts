import { Type } from '../utilidad/Type';
import {Node} from "../Abstract/Node";
import {Exceptionn} from "../utilidad/Exceptionn";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Tree {

    instructions: Array<Node>;
    excepciones: Array<Exceptionn>;
    console: Array<String>;
    Traduccion: Array<String>;
    pila: Array<Type>;

    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instructions: Array<Node>,excepciones: Array<Exceptionn>) {
        this.instructions = instructions;
        this.excepciones = excepciones;
        this.console = new Array<String>();
        this.Traduccion = new Array<String>();
        this.pila=new Array<Type>();

    }
}
