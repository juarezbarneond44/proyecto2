
import { DeclararArray } from './../Instrucciones/DeclararArray';
import { ArregloValor } from './ArregloValor';
import { Exceptionn } from './../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class ArrayLength extends Node{
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

      return data+".length";
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
        this.type=new Type(types.ERROR);
        let error =new Exceptionn('Semantico', `no existe el identificador: ${this.Identificador} `,this.line, this.column);
        tree.excepciones.push(error);
      return error;
      }

let tamaño=res.DemencionesArray;


let arreglo:Array<any>=[];

if(this.value===null){
  // aqui se hara el mas basico de todos
  if(res.value instanceof Array){
    let contador=0;
   //let cantidadTotal=0;
  res.value.forEach(datos => {
    if(datos instanceof DeclararArray){
      if(datos.ListaPosiciones[0]===contador){
          //cantidadTotal++;
          contador++;
      }
    }

  });
  this.type=new Type(types.NUMERIC);
return contador;
}
}


for (let x = 0; x <  this.value.length; x++) {
  const elem =  this.value[x];
  if(elem instanceof Node){
    let res=elem.execute(tabla,tree);

    if(elem.type.type===types.NUMERIC){
      arreglo.push( Math.round(res));
    }
    else{
      this.type=new Type(types.ERROR);
      let error =new Exceptionn('Semantico', `solo se permiten numeros en los []`,this.line, this.column);
      tree.excepciones.push(error);
    return error;
    }
  }
}

 if(tamaño<arreglo.length)
{
  this.type=new Type(types.ERROR);
  console.log(tabla)
  console.log(tamaño)
  console.log(this.Identificador)
  let error =new Exceptionn('Semantico', `cantidad del arreglo no valido es ${tamaño}  y vino ${arreglo.length}`,this.line, this.column);
  tree.excepciones.push(error);
return error;
}
this.type=res.type;

if(res.value !==null){


if(arreglo.length>=10){ this.type=new Type(types.ERROR);

  let error =new Exceptionn('Semantico', `cantidad del arreglo no valido vino ${arreglo.length} parametros`,this.line, this.column);
  tree.excepciones.push(error);
return error;}
if(res.value instanceof Array){
const final=this.cantidad_de_Arrays(arreglo,res.value);

this.type=new Type(types.NUMERIC);
return final;
}



}



else{
  let error =new Exceptionn('Semantico', `No se a declarado el arreglo ${this.Identificador}`,this.line, this.column);
  this.type=new Type(types.ERROR);
  tree.excepciones.push(error);
return error;


}}catch(err){ let error =new Exceptionn('Semantico', err+"",this.line, this.column);
tree.excepciones.push(error);
return error;}
    }

    cantidad_de_Arrays(Numeros:Array<number>,arreglo:Array<DeclararArray>)
    {
    //  let aux:Array<DeclararArray>=new Array();
      let dato1="";
      let dato2="";
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < Numeros.length; x++) {
        const numero = Numeros[x];
        dato1=dato1+numero;
      }
      let contador=0;
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
              if(contador===objeto.ListaPosiciones[Numeros.length])
              contador++
           //  aux.push(arreglo[y]);
           }
         dato2="";


          }

      }



  return contador;
    }





}
