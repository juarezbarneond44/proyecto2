import { DeclararArray } from './DeclararArray';

import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import {Type, types} from "../utilidad/Type";

export class ArrayPop extends Node{
  Traducir(tabla: Tabla, tree: Tree) {
    let data=this.id;
    let aux=tabla;
    while(aux!==null){
      if(aux.EsAnidada){
        if(aux.VariablesANIDADAS!==null){
          aux.VariablesANIDADAS.forEach(element => {
            //  g(this.idenfiticador+"   "+element)
            if(this.id===element)
            {
             //   g(this.idenfiticador)

              this.id=aux.Padre+"_"+ this.id;
            }
          });
        }
        break;
      }
      aux=aux.Previous;
    }
    if(this.value!==null){
      this.value.forEach(element => {
        if(element instanceof Node){
      data=data+"["+ element.Traducir(tabla,tree) +"]";
        }

      });

    }
    data=data+".pop(";
    tree.Traduccion.push(data+");");
  }
  id:string
  value: Array<Node>

      constructor( id:string,value: Array<Node>, line: number, column: number) {
      super(null, line, column);
      this.id=id
      this.value=value


  }
  execute(table: Tabla, tree: Tree) {
    try{
const res=table.getVariable(this.id);
if(res===null){
  const error = new Exceptionn('Semantico', `La variable ${this.id} no existe`,
  this.line, this.column);
tree.excepciones.push(error);
return error;

}
this.type=new Type(res.type.typeArray);

if(res.type.type===types.ARRAY||res.type.typeObjeto===types.ARRAY){
  let arreglo:Array<any>=[];
  if(this.value===null){
    //falta
        //falta
        if(res.value instanceof Array){
          let dato= this.cantidad_de_Arrays2(res.value);
          arreglo.push(dato);

         // res.value.forEach(element => {
           let ar:Array<object>=[];
           for (let x = 0; x < res.value.length; x++) {
            let a=this.eliminar(arreglo,res.value);
         if(a!==null){console.log(a); return a.valor;}
           }



         // });
         // console.log(res.value)


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


if(arreglo.length==res.DemencionesArray){
  let error =new Exceptionn('Semantico', ` No se puede eliminar en una dimencion mayor al arreglo `,this.line, this.column);
  tree.excepciones.push(error);
  return error;
}

arreglo.push(dato);
let a=this.eliminar(arreglo,res.value);

if(a!==null){
  //res.value.pop();

return a.valor;
}


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
  eliminar(Numeros:Array<number>,arreglo:Array<DeclararArray>)
  {
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
       // console.log(objeto)
        if(objeto  instanceof DeclararArray){
          for (let x = 0; x < Numeros.length; x++) {
            const numero = objeto.ListaPosiciones[x];
            dato2=dato2+numero;
          }

          if(dato1===dato2){
            let aux=objeto;
            for (let x = y; x < arreglo.length-1; x++) {
                arreglo[x]=arreglo[x+1];
             }
             arreglo[arreglo.length-1]=aux;

             return  arreglo.pop();
                     }
          dato2="";
        }
    }
return null
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
       }
    }
    return contador;
  }


}
