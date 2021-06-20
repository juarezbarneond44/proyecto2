import { DeclararArray } from './../Instrucciones/DeclararArray';
import { Identificador } from './Identificador';
import { Exceptionn } from './../utilidad/Exceptionn';
import { Expression } from '@angular/compiler';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";
import { exception, table } from 'console';
import { of } from 'rxjs';


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class ArregloValor extends Node{
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
    Traducir(tabla: Tabla, tree: Tree) {
      let data="";

      data= this.traducot(tabla,tree,this.value);
      return data;
    }
    traducot(tabla: Tabla, tree: Tree,valor:Array<any>):string
    {  let data="";
      data=data+"[";
    if(valor!==null){
        let contador=0;
        valor.forEach(elemt => {
 contador++;
          if(elemt instanceof Node){
            data=data+elemt.Traducir(tabla,tree);
          }
          if(elemt instanceof Array){
            data=data+this.traducot(tabla,tree,elemt)
          }

        // else if(elemt instanceof Array){
        //   data=data+this.traducot(tabla,tree,elemt);
       // }
      if(contador<valor.length){data=data+", "}
       //let arr :number[]= [10, 20, 30, [1,3]];
        });
      }
      data=data+"]";
return data;

    }
    error:boolean;
    value: Array<Node>;
    typo:boolean;
    listaValores:Array<DeclararArray>;

    dimencion1:Array<number>;
    valorespos:Array<Boolean>;
juan:number;
     cantidad:number;
    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor( tipo:boolean,value: Array<Node>, cantidad:number, line: number, column: number){
        super(null, line, column);
        this.value = value;
        this.error=false;
        this.typo=tipo;
        this.listaValores=new Array();

        this.dimencion1=new  Array();
        for (let x = 0; x < cantidad; x++) {
         this.dimencion1.push(0);

        }
        this.juan=0;
        this.cantidad=cantidad;
        this.valorespos=new Array(false,false,false,false,false,false,false,false,false,false);

       }


    /**
     * Devuelve el valor inicial e.g. 4
     * @param Tabla Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(tabla1: Tabla, tree: Tree) {

let tabla2=new Tabla(tabla1)

  this.dimenciones(this.value,tabla2,tree);


if(this.error){

  this.type = new Type(types.ERROR);
     return this;

}
else{
 return this;
}


    }

dimenciones(aux,tabla,tree)
{
  for (let x = 0; x < aux.length; x++) {
    const aux2 = aux[x];
    if(aux2 instanceof Array)
    {

      for (let x = 0; x < this.valorespos.length; x++) {
        if(!this.valorespos[x]){
          this.valorespos[x]=true;
          break;
        }

      }

      let aux=this.listaValores;
      //this.line
     //this.juan++;
      this.dimenciones(aux2,tabla,tree);
      let contador=0;
      for (let x = 0; x < this.valorespos.length; x++) {
        const res = this.valorespos[x];
        if(res){
        contador++
        }
      }
      this.dimencion1[contador]=0;
      this.dimencion1[contador-1]++;

      for (let x =  this.valorespos.length-1; x >-1; x--) {
        if(this.valorespos[x]){
          this.valorespos[x]=false;
          break;
        }}
    }
    else{

     if(aux2 instanceof Node){


      let dato= aux2.execute(tabla,tree);


      if(dato instanceof Exceptionn)
      {

        if(this.typo){
          const er = new Exceptionn('Semantico', `Los Typos del arreglo no son los mismos`,this.line, this.column);
          this.type = new Type(types.ERROR);
          this.error=true;
          return er;
        }
        tree.excepciones.pop();

      }

      if(this.type==null){
        this.type=aux2.type;
      }else
      {
        if(this.type.type!==aux2.type.type){
          const er = new Exceptionn('Semantico', `Los Typos del arreglo no son los mismos`,this.line, this.column);
          tree.excepciones.push(er);
          this.type = new Type(types.ERROR);
          this.error=true;
          return er;

        }
      }
let contador=0;
      for (let x = 0; x < this.valorespos.length; x++) {
        const res = this.valorespos[x];
        if(res){
        contador++
        }
      }
   // console.log("contadorrrr   "+contador)
     switch(contador){
      case 0:
        this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
  break;
  case 1:
    this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 2:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 3:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 4:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 5:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 6:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 7:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 8:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 9:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;
case 10:
  this.listaValores.push(new DeclararArray(this.type,dato,this.dimencion1))
break;

     }
     this.dimencion1[contador]++;
     //console.log(this.dimencion1)
     }
         }

  }


}
}
