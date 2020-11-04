export enum types {
    NUMERIC,
    STRING,
    BOOLEAN,
    VOID,
    ARRAY,
    TYPE,
    ANY,
    CICLO,
    SWITCH,
    FUNCION,
    OBJET,
    NULL,
    ERROR
}

/**
 *
 * @class Permite llevar el control de los tipos del lenguaje
 */
export class Type{
    type : types;
    typeObjeto:types;
    typeArray:types;
    nombre:string;

    /**
     *
     * @constructor Crea un nuevo tipo con el tipo primitivo indicado en el enum
     * @param type Tipo seleccionado para la variable o funcion
     *
     */

    constructor(type: types){
        this.type = type;
        this.typeObjeto=null;
        this.typeArray=null;
        this.nombre="";
    }


    toString(){
        if(this.type === types.BOOLEAN){
            return 'boolean';
        }else if(this.type === types.NUMERIC){
            return 'number';
        }else if(this.type === types.STRING){
            return 'string';
        }else if(this.type === types.VOID){
            return 'void';
        }else if(this.type === types.ARRAY){
        return 'array';
      }else if(this.type === types.TYPE){
        return 'type';}
        else if(this.type === types.ANY){
          return 'any';}
          else if(this.type === types.CICLO){
            return 'ciclo';}
            else if(this.type === types.SWITCH){
              return 'switch';}
         else if(this.type === types.FUNCION){
          return 'Funcion';}
          else if(this.type === types.OBJET){
            return 'objet';}
            else if(this.type === types.NULL){
              return 'null';}
              else if(this.type === types.ERROR){
                return 'Error';}
    }
      }
