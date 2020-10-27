
import {Type} from "../utilidad/Type";
import { Tabla } from '../Simbols/Tabla';
import { Node } from "../Abstract/Node";

/**
 * @class Esta clase me permite almacenar nodos en mis tablas de simbolos y de funciones
 */

export class Simbol {
    type: Type;
    identifier: String
    value: Object
    valorInicial: boolean
    entornoFuncion:Tabla;
    FuncionListaId:Array<String>;
    FuncionInstrucciones:Array<Node>;
  DemencionesArray:number;

    /**
     * @constructor Para crear un nuevo simbolo a utilizar en una tabla de simbolos o funciones
     * @param type Tipo de la varible o funcion
     * @param identifier Nombre de la variable o funcion
     * @param value Valor de la variable u objeto completo de la función
     */
    constructor(valorInicial:boolean, type: Type, identifier: String, value: Object) {
        this.type = type;
        this.identifier = identifier;
        this.value = value;
        this.valorInicial=valorInicial;
        this.entornoFuncion=null;
        this.FuncionListaId=new Array();
        this.FuncionInstrucciones=new Array()
        this.DemencionesArray=0;
    }
}
