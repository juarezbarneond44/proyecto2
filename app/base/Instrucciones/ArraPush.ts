import { DeclararArray } from './DeclararArray';
import { table } from 'console';

import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import {types} from "../utilidad/Type";

export class ArraPush extends Node{
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(tabla: Tabla, tree: Tree) {
let data=this.id;
if(this.value!==null){
  this.value.forEach(element => {
    if(element instanceof Node){
  data=data+"["+ element.Traducir(tabla,tree) +"]";
    }

  });

}


data=data+".push("+this.expresion.Traducir(tabla,tree);
tree.Traduccion.push(data+");");
  }
  id:string
  value: Array<Node>
  expresion:Node
      constructor( id:string,value: Array<Node>,expresion:Node, line: number, column: number) {
      super(null, line, column);
      this.id=id
      this.value=value
      this.expresion=expresion

  }
  execute(table: Tabla, tree: Tree) {
try{
const res=table.getVariable(this.id);
if(res===null){
  const error = new Exceptionn('Semantico', `La variable ${this.id} no existe`,
  this.line, this.column);
tree.excepciones.push(error);
return null;

}
const exp=this.expresion.execute(table,tree);
if(exp instanceof Exceptionn){
 const error = new Exceptionn('Semantico', `No se puede asignar un error al arreglo ${this.id}`,
  this.line, this.column);
tree.excepciones.push(error);
  return null;
}
if(res.type.type===types.ARRAY||res.type.typeObjeto===types.ARRAY){
  let arreglo:Array<any>=[];
  if(this.value===null){
    //falta
    if(res.value instanceof Array){
     let dato= this.cantidad_de_Arrays2(res.value);
     arreglo.push(dato);
     let nuevo=new DeclararArray(res.type,exp,arreglo);
     res.value.push(nuevo);
    // console.log(res.value)
     return null;

    }

  }
  else{
    for (let x = 0; x <  this.value.length; x++) {
      const elem =  this.value[x];
      if(elem instanceof Node){
        let res=elem.execute(table,tree);
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
    if(res.value instanceof Array){
          let dato=this.cantidad_de_Arrays(arreglo,res.value);
          arreglo.push(dato);
if(arreglo.length>res.DemencionesArray){
  let error =new Exceptionn('Semantico', ` No se puede asignar en una dimencion mayor al arreglo `,this.line, this.column);
  tree.excepciones.push(error);
  return error;
}
          let nuevo=new DeclararArray(res.type,exp,arreglo);
          res.value.push(nuevo);
         // console.log(res.value)
          return null;

      }

  }



}else{
  let error =new Exceptionn('Semantico', ` el id ${this.id} no es un arreglo `,this.line, this.column);
  tree.excepciones.push(error);
  return error;
}




}catch(err){ let error =new Exceptionn('Semantico', err+"",this.line, this.column);
tree.excepciones.push(error);
return error;}
  }
  cantidad_de_Arrays(Numeros:Array<number>,arreglo:Array<DeclararArray>)
  {
       let dato1="";
       let dato2="";
       let contador:number=0;

    // tslint:disable-next-line: prefer-for-of
       for (let x = 0; x < Numeros.length; x++) {
      const numero = Numeros[x];
      dato1=dato1+numero;
    }
    // ahora buscamos entre todos los arreglos el numero que queremos
       for (let y = 0; y < arreglo.length; y++) {
        const objeto = arreglo[y];
       // console.log(objeto)
        if(objeto  instanceof DeclararArray){


          for (let x = 0; x < Numeros.length; x++) {
            const numero = objeto.ListaPosiciones[x];
            dato2=dato2+numero;
          }

          if(dato1===dato2){

            if(objeto.ListaPosiciones[Numeros.length]>contador){contador=objeto.ListaPosiciones[Numeros.length]
            }

           else if(objeto.ListaPosiciones[Numeros.length]===contador){contador=objeto.ListaPosiciones[Numeros.length]; contador++;
            }

           // console.log("hola")
            // arreglo[y].valor=valor
            // return arreglo[y];

         }
          dato2="";


        }

    }

    return contador;
  }
  cantidad_de_Arrays2(arreglo:Array<DeclararArray>)
  {


       let contador:number=0;

    // tslint:disable-next-line: prefer-for-of

    // ahora buscamos entre todos los arreglos el numero que queremos
       for (let y = 0; y < arreglo.length; y++) {
        const objeto = arreglo[y];
       // console.log(objeto)
        if(objeto  instanceof DeclararArray){


            if(objeto.ListaPosiciones[0]>contador){contador=objeto.ListaPosiciones[0]
            }

           else if(objeto.ListaPosiciones[0]===contador){contador=objeto.ListaPosiciones[0]; contador++;
            }






        }

    }

    return contador;
  }
}
