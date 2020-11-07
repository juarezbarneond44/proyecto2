import { Identificador } from './../Expresiones/Identificador';
import { Type } from './../utilidad/Type';
import { nuevoArreglo } from './../Expresiones/nuevoArreglo';
import { DeclararArray } from './DeclararArray';

import { ArregloValor } from './../Expresiones/ArregloValor';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";

import {types} from "../utilidad/Type";
import { ValorArreglo } from '../Expresiones/ValorArreglo';


export class ArrayInstruccion extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {

    let resultado=tabla.getVariable(this.iden);
    if(resultado===null){
      //error no se encontro
      let error =new Exceptionn('Semantico', `el id ${this.iden}  no existe`,this.line, this.column);
      tree.excepciones.push(error);
      return null;
    }
    if(resultado.type.type!==types.ARRAY){
 // error el id no es arreglo
 let error =new Exceptionn('Semantico', `el id ${this.iden}  no es un arreglo`,this.line, this.column);
 tree.excepciones.push(error);
 return null;
}


let posisionTemporal="t"+tree.getContador();
tree.codigo3d.push(posisionTemporal+"="+resultado.value+";");
for (let x = 0; x < this.listaArrays.length; x++) {
  const element = this.listaArrays[x];
if(element instanceof Node){
let numero=element.codigo3direcciones(tabla,tree);
tree.codigo3d.push("//***obtener la posicion del arreglo****")
tree.codigo3d.push("t2="+numero+";");
tree.codigo3d.push("t0="+posisionTemporal+";");
tree.codigo3d.push("ObtenerPosArreglo();");
tree.codigo3d.push(posisionTemporal+"=t0;");
if(1+x!=this.listaArrays.length)
{tree.codigo3d.push( `${posisionTemporal}=heap[(int)${posisionTemporal}];`);}
 }}

if(this.listaExpreciones!==null)
{

  if(resultado.DemencionesArray<=this.listaArrays.length)
  {
    let error =new Exceptionn('Semantico', `el acceso del arreglo no es valido`,this.line, this.column);
    tree.excepciones.push(error);
    return null;
  }
  // aqui se agregara al heap el valor del arreglo
  tree.codigo3d.push("//*** agregar el valor al arreglo****");
  let tipo=new Type(resultado.type.typeArray);
  let val=new ValorArreglo(tipo,resultado.DemencionesArray-this.listaArrays.length,null,this.listaExpreciones,this.line,this.column) .codigo3direcciones(tabla,tree);
  tree.codigo3d.push(`heap[(int)${posisionTemporal}]=${val};`);
  return null;
}else
{
  if(this.expresion instanceof nuevoArreglo){
    tree.codigo3d.push("//*** agregar el valor al arreglo****");
    let tipo=new Type(resultado.type.typeArray);
    let val=new ValorArreglo(tipo,resultado.DemencionesArray-this.listaArrays.length,null,this.listaExpreciones,this.line,this.column) .codigo3direcciones(tabla,tree);
    tree.codigo3d.push(`heap[(int)${posisionTemporal}]=${val};`);return null;

  }else if(this.expresion instanceof Identificador)
  {
    if(this.listaArrays.length==resultado.DemencionesArray)
    {
      tree.codigo3d.push("//*** agregar el valor al arreglo****");
      let val=this.expresion.codigo3direcciones(tabla,tree);
      tree.codigo3d.push(`heap[(int)${posisionTemporal}]=${val};`);
      return null
    }



    tree.codigo3d.push("//*** agregar el valor al arreglo****");
    let tipo=new Type(resultado.type.typeArray);
    let val=new ValorArreglo(tipo,resultado.DemencionesArray-this.listaArrays.length,this.expresion,null,this.line,this.column) .codigo3direcciones(tabla,tree);
    tree.codigo3d.push(`heap[(int)${posisionTemporal}]=${val};`);
    return null;
  }


}
if(this.listaArrays.length==resultado.DemencionesArray)
{
  tree.codigo3d.push("//*** agregar el valor al arreglo****");
  let val=this.expresion.codigo3direcciones(tabla,tree);
  tree.codigo3d.push(`heap[(int)${posisionTemporal}]=${val};`);
  return null
}else{

  //error
  let error =new Exceptionn('Semantico', `el valor en la posicion deseada no es valida`,this.line, this.column);
  tree.excepciones.push(error);
  return null;
}

}
  Traducir(tabla: Tabla, tree: Tree) {


let data=this.iden;

this.listaArrays.forEach(element => {
  if(element instanceof Node){
data=data+"["+ element.Traducir(tabla,tree) +"]";
  }

});

if(this.expresion!==null){

data=data+"="+this.expresion.Traducir(tabla,tree);

}
else{

  let val =new ArregloValor(true,this.listaExpreciones,10,this.line,this.column).Traducir(tabla,tree);
  data=data+"="+  val;
}


tree.Traduccion.push(data+";")

  }

 iden:string;
 expresion:Node;
 listaArrays:Array<object>;
 listaExpreciones:Array<Node>;
      constructor( iden:string, listaArrays:Array<object>, listaExpreciones:Array<Node>,expresion:Node,line: number, column: number) {
   super(null, line, column);
   this.expresion=expresion;
   this.iden=iden;
   this.listaArrays=listaArrays;
   this.listaExpreciones=listaExpreciones;
  }
  execute(table: Tabla, tree: Tree) {
    try{
    let resultado=table.getVariable(this.iden);
    if(resultado===null){
      //error no se encontro
      let error =new Exceptionn('Semantico', `el id ${this.iden}  no existe`,this.line, this.column);
      tree.excepciones.push(error);
      return null;
    }
    if(resultado.type.typeObjeto!==types.ARRAY){
 // error el id no es arreglo
 let error =new Exceptionn('Semantico', `el id ${this.iden}  no es un arreglo`,this.line, this.column);
 tree.excepciones.push(error);
 return null;
}
    let arreglo:Array<any>=[];

// tslint:disable-next-line: prefer-for-of
    for (let x = 0; x <  this.listaArrays.length; x++) {
  const elem =  this.listaArrays[x];
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




    if(this.expresion!==null){
      //if(arreglo.length!==resultado.DemencionesArray-1){
        //let error =new Exceptionn('Semantico', `no se puede asignar un varlor en la posicion deseada`,this.line, this.column);
        //tree.excepciones.push(error);
        //return null;
    //  }
      const res=this.expresion.execute(table,tree);
      if(resultado.type.typeArray===this.expresion.type.type){

          if(this.expresion.type.type==types.TYPE){
            if(resultado.type.nombre===this.expresion.type.nombre){
              // hay que buscar el id :,v
           //   this.cantidad_de_Arrays(resultado.DemencionesArray,resultado.value,arreglo,this.expresion)
              return null

            }
            else{
              let error =new Exceptionn('Semantico', `el id ${this.iden}  no es del mismo tipo que la expresion`,this.line, this.column);
              tree.excepciones.push(error);
              return null;
            }
          }else{


         if(resultado.value instanceof Array){

          let dat=this.cantidad_de_Arrays(arreglo,resultado.value,res);
         // console.log(dat)
          if(dat===null){
            //console.log( resultado.value)
            let nuevo=new DeclararArray(resultado.type,res,arreglo);
            resultado.value.push(nuevo);
            //let error =new Exceptionn('Semantico', `no existe el valor en la posicion deseada`,this.line, this.column);
          //  tree.excepciones.push(error);
            return null;
          }else{
             return null
          }
         }
        // console.log("adios")


    //   console.log(dat)
         return null
          }

        }else{
         // console.log(resultado)
          //console.log(this.expresion)
          let error =new Exceptionn('Semantico', `el id ${this.iden}  no es del mismo tipo que la expresion`,this.line, this.column);
          tree.excepciones.push(error);
          return null;

        }
    }
    else if (this.listaExpreciones!==null){

      let tamaño=resultado.DemencionesArray;
//      if(tamaño<this.listaExpreciones.length)
      {
      //  console.log("entra aqu")
        let arregloDato1:ArregloValor;
        arregloDato1=new ArregloValor(true,this.listaExpreciones,resultado.DemencionesArray,this.line,this.column).execute(table,tree)
        if(arregloDato1.type===null){
          let nuevo=new DeclararArray(resultado.type,[],arreglo);
          if(resultado.value instanceof Array){
          let dat=this.cantidad_de_Arrays(arreglo,resultado.value,[]);
        //  console.log("///////////////////")
         // console.log(resultado.value)
          if(dat===null){
             //console.log( resultado.value)
           //  let nuevo=new DeclararArray(resultado.type,res,arreglo);
           //console.log(nuevo)
             resultado.value.push(nuevo);
            // console.log("///////////////////")
            // console.log(resultado.value)
             return null;
           }}




          return null;
         }else{
          if(arregloDato1.type.type === types.ERROR){
            return new Exceptionn('Semantico', `Los Tipos del arreglo no son los mismos`,this.line, this.column);
           }

          if (resultado.type.typeArray === arregloDato1.type.type){

            arregloDato1.listaValores.forEach(elemento2 => {


            if(resultado.value instanceof Array){

              for (let x = 0; x < resultado.DemencionesArray-1; x++) {
                   arreglo.push(elemento2.ListaPosiciones[x]);

              }

              let dat=this.cantidad_de_Arrays2(arreglo,resultado.value,elemento2.valor);
              if(dat===null){

                let nuevo=new DeclararArray(resultado.type,elemento2.valor,arreglo);


                resultado.value.push(nuevo);
              }
                //let error =new Exceptionn('Semantico', `no existe el valor en la posicion deseada`,this.line, this.column);
              //  tree.excepciones.push(error);

              arreglo.pop();
              //  return null;



            }
            });



         //     let arregloDato1:ArregloValor;
           //   arregloDato1=new ArregloValor(true,this.listaExpreciones,resultado.DemencionesArray,this.line,this.column).execute(table,tree);




            return null;
            }else{
                let error =new Exceptionn('Semantico', `los types no son los mismos ${resultado.type}  ${arregloDato1.type} `,this.line, this.column);
                tree.excepciones.push(error);
                return error
            }

         }


      }







    }
  }catch(err){ let error =new Exceptionn('Semantico', err+"",this.line, this.column);
  tree.excepciones.push(error);
  return error;}

  }
  cantidad_de_Arrays(Numeros:Array<number>,arreglo:Array<DeclararArray>,valor:object)
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
           // console.log("hola")
             arreglo[y].valor=valor
             return arreglo[y];
         }
          dato2="";


        }

    }



       return null;
  }
  cantidad_de_Arrays2(Numeros:Array<number>,arreglo:Array<DeclararArray>,valor:object)
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
      //  console.log(objeto)
        if(objeto  instanceof DeclararArray){


          for (let x = 0; x < Numeros.length; x++) {
            const numero = objeto.ListaPosiciones[x];
            dato2=dato2+numero;
          }

          if(dato1===dato2){
            //console.log("hola")
             arreglo[y].valor=valor
             return arreglo[y];
         }
          dato2="";


        }

    }



    return null;
  }
}
