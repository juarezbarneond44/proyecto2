import { DeclararArray } from './../Instrucciones/DeclararArray';
import { Exceptionn } from './../utilidad/Exceptionn';

import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class ArrayBusqueda extends Node{
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
    Traducir(tabla: Tabla, tree: Tree) {
      let data="";
      let aux=tabla;
      while(aux!==null){
        if(aux.EsAnidada){
          if(aux.VariablesANIDADAS!==null){
            aux.VariablesANIDADAS.forEach(element => {
              //  g(this.idenfiticador+"   "+element)
              if(this.Identificador===element)
              {
               //   g(this.idenfiticador)

                this.Identificador=aux.Padre+"_"+ this.Identificador;
              }
            });
          }
          break;
        }
        aux=aux.Previous;
      }
      data=this.Identificador;
      if(this.value!==null){

        this.value.forEach(element => {

          if(element instanceof Node){
            data=data+"["+element.Traducir(tabla,tree) +"]";
          }


        });
      }

      return data;

    }
    value: Array<any>;
Identificador:string;
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(identificador:string, value:  Array<any>, line: number, column: number){
        super(null, line, column);
        this.value = value;
        this.Identificador=identificador;
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param Tabla Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(tabla: Tabla, tree: Tree) {
try{

      const res=tabla.getVariable(this.Identificador);
      if(res===null){
        let error =new Exceptionn('Semantico', `no existe el identificador: ${this.Identificador} `,this.line, this.column);
        tree.excepciones.push(error);
      return error;
      }

let tamaño=res.DemencionesArray;


let arreglo:Array<any>=[];


for (let x = 0; x <  this.value.length; x++) {
  const elem =  this.value[x];
  if(elem instanceof Node){
    let res=elem.execute(tabla,tree);

    if(elem.type.type===types.NUMERIC){
      arreglo.push( Math.round(res));
    }
    else{
      let error =new Exceptionn('Semantico', `solo se permiten numeros en los []`,this.line, this.column);
      tree.excepciones.push(error);
    return error;
    }
  }
}

if(tamaño<arreglo.length)
{
  let error =new Exceptionn('Semantico', `cantidad del arreglo no valido es ${tamaño}  y vino ${arreglo.length}`,this.line, this.column);
  tree.excepciones.push(error);
return error;
}
this.type=res.type;

//console.log(res)
if(res.value !==null){

// hay que buscar el valor xD
if(res.value instanceof Array ){
  //console.log(arreglo)
  //console.log(res.value)
let valores=this.cantidad_de_Arrays(arreglo,res.value);

if(valores.length==1)
{
  this.type.type=res.type.typeArray;
  //  console.log(valores)
if(valores[0] instanceof DeclararArray)
{
  //console.log(valores)
  return valores[0].valor;

}

}
else if (valores.length>1)
{
  this.type.type=res.type.typeArray;
  let aux2=Array();
  valores.forEach(element => {
    aux2.push(element.valor)
  });
  return aux2;
}else{
  let error =new Exceptionn('Semantico', `No hay Ningun valor en esa pocicion`,this.line, this.column);
  tree.excepciones.push(error);
return error}
}

}
else {
  let error =new Exceptionn('Semantico', `la dimencion del arreglo no existe`,this.line, this.column);
  tree.excepciones.push(error);
return error;

}}catch(error){
  let error2 =new Exceptionn('Semantico',error+"",this.line, this.column);
  tree.excepciones.push(error2);
return error2;
}



  }
  cantidad_de_Arrays(Numeros:Array<number>,arreglo:Array<DeclararArray>)
  {
    let aux:Array<DeclararArray>=new Array();
    let dato1="";
    let dato2="";
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < Numeros.length; x++) {
      const numero = Numeros[x];
      dato1=dato1+numero;
    }
    // ahora buscamos entre todos los arreglos el numero que queremos
    for (let y = 0; y < arreglo.length; y++) {
        const objeto = arreglo[y];
      //  console.log(objeto)
        if(objeto  instanceof DeclararArray){


          for (let x = 0; x < Numeros.length; x++) {
            const numero = objeto.ListaPosiciones[x];
            dato2=dato2+numero;
          }

          if(dato1===dato2){
           aux.push(arreglo[y]);
         }
       dato2="";


        }

    }



return aux;
  }

}

