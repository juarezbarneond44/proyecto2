import {Simbol} from "../Simbols/Simbol";
/**
 * @class En esta clase es donde vamos a guardar y obtener las variables y funciones
 */
export class Tabla{
    Previous: Tabla;
    Variables: Map<String, Simbol>;
    EsAnidada:boolean;
    VariablesANIDADAS:Array<String>;
    Padre:String;
    hija:String;
    llamadasHijas:Array<String>;

    /**
     * @constructor Crea una nueva tabla
     * @param Previous Tabla anterior para manejar los ambitos
     */
    constructor(Previous: Tabla){
        this.Previous = Previous;
        this.Variables = new Map<String, Simbol>();
        this.EsAnidada=false;
        this.VariablesANIDADAS=null;
        this.llamadasHijas=null;
        this.Padre="";
        this.hija="";
    }

    /**
     *
     * @method setVariable Almacena una variable, si ya existe arroja error
     * @param simbol Simbolo que contiene la informacion de la variable a almacenar
     */
    setVariable(simbol: Simbol){
        let env: Tabla;
        ///for(env = this; env != null; env = env.Previous){
          env=this;
            for(let key of Array.from( env.Variables.keys()) ) {
                if(key === simbol.identifier){
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
      //  }
        this.Variables.set(simbol.identifier, simbol);
        return null;
    }
    /**
     *
     * @method getVariable Obtiene una variable dentro de la tabla de simbolos
     * @param identifier Nombre de la variable a obtener
     */

    getVariable(identifier: String): Simbol{
        let env: Tabla;
        for(env = this; env != null; env = env.Previous){
            for(let key of Array.from( env.Variables.keys()) ) {
          //    console.log(key)
            //  console.log(identifier)
                if(key === identifier){
                    return env.Variables.get(key);
                }
            }
        }
        return null;
    }



}
