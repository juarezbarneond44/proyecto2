import { Node } from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Simbol } from "../Simbols/Simbol";
import { Exceptionn } from "../utilidad/Exceptionn";
import { ɵConsole } from '@angular/core';

/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
export class Identificador extends Node {
    Traducir(tabla: Tabla, tree: Tree) {
    //  console.log(tabla)
     // console.log(this.identifier)
      let aux=tabla;
      while(aux!==null){
        if(aux.EsAnidada){
          if(aux.VariablesANIDADAS!==null){
            aux.VariablesANIDADAS.forEach(element => {
            //  console.log(this.identifier+"   "+element)
              if(this.identifier===element)
              {
               // console.log(this.identifier)
                this.identifier=aux.Padre+"_"+ this.identifier;
              }
            });
          }
          break;
        }
        aux=aux.Previous;
      }



    return this.identifier;
    }
    identifier: String;
    /**
     * @constructor Retorna el objeto identificador creado
     * @param identifier nombre de la variable
     * @param line Linea del identificador
     * @param column Columna del identificador
     */
    constructor(identifier: String, line: number, column: number) {
        // tipo null porque aun no se el tipo
        super(null, line, column);
        this.identifier = identifier;
    }

    execute(table: Tabla, tree: Tree) {
        let variable: Simbol;
//console.log(this.identifier)
        variable = table.getVariable(this.identifier);
       // console.log(variable)
        if (variable == null) {
            const error = new Exceptionn('Semantico',
                'No se ha encontrado la variable ' + this.identifier,
                this.line, this.column);
            tree.excepciones.push(error);

            return error;
        }
        this.type = variable.type;
        return variable.value;
    }
}
