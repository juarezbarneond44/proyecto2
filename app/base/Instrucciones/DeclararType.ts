

import { Simbol } from './../Simbols/Simbol';
import { IdentificadorExprecion } from './IdentificadorExprecion';

import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";

/**
 * Permite imprimir expresiones en la consola
 */
export class DeclararType extends Node{
  codigo3direcciones(table: Tabla, tree: Tree) {

    const res = table.getVariable(this.tipo); // se busca si existe el tipo
    if (res === null){
      const error = new Exceptionn('Semantico',
      'no existe Type ' + this.tipo,
      this.line, this.column);
      tree.excepciones.push(error);
      return "error";
    }
    let tablaa:Tabla;
    if(res.value instanceof Tabla){
      tablaa=res.value;}
// se obtene su entorno donde estan las variables del tipe

    if(res.type.typeObjeto!==types.TYPE){
        const error = new Exceptionn('Semantico',
    'tipo no valido ' + res.identifier,
    this.line, this.column);
    tree.excepciones.push(error);
    return "error";

    }
// aqui ya es type y existe e ltype
// tslint:disable-next-line: prefer-for-of
if(this.listaAsignaciones.length!=tablaa.Variables.size){
const error = new Exceptionn('Semantico',
"El tamaño de la declaracion del type no es el mismo que el del type original",
this.line, this.column);
tree.excepciones.push(error);
return null;

}
    let nuevaTabla=new Tabla (null);
    for (let x=0;x<this.listaAsignaciones.length;x++){
     const dato= tablaa.getVariable(this.listaAsignaciones[x].identificador);
       if(dato==null){     const error = new Exceptionn('Semantico',
      'no exite atributo ' +this.listaAsignaciones[x].identificador+ " dentro del type",
      this.line, this.column);
      tree.excepciones.push(error);
      return null;


    }
    else if (dato instanceof Exceptionn){const error = new Exceptionn('Semantico',
    'No se puede asignar un valor tipo error',
    this.line, this.column);
    tree.excepciones.push(error);
    return null;
    }
     const resultado=this.listaAsignaciones[x].exprecion.codigo3direcciones(table,tree);

   if(resultado instanceof Exceptionn ||resultado.valor==="Exception"){
    const error = new Exceptionn('Semantico',
    'No se puede asignar un valor tipo error',
    this.line, this.column);
    tree.excepciones.push(error);
    return null;
   }

     if (this.listaAsignaciones[x].exprecion.type.type===dato.type.type||dato.type.type==types.ANY){
  // if(this.listaAsignaciones[x].exprecion.type.type==types.OBJET)
  {
 // tslint:disable-next-line: max-line-length
 const resultado1=nuevaTabla.setVariable(new Simbol(true,this.listaAsignaciones[x].exprecion.type,this.listaAsignaciones[x].identificador,resultado))
if(resultado1!=null){  const error = new Exceptionn('Semantico',
resultado1,
this.line, this.column);
tree.excepciones.push(error);
return null;}
   }
}else if(this.listaAsignaciones[x].exprecion.type.type===types.NULL){
  // tslint:disable-next-line: max-line-length

  this.listaAsignaciones[x].exprecion.type.nombre=dato.type.nombre;
  let  fin=new Type(dato.type.typeObjeto);
  fin.typeObjeto=types.TYPE;
  fin.nombre=dato.type.nombre

  const resultado1= nuevaTabla.setVariable(new Simbol(true,fin,this.listaAsignaciones[x].identificador,resultado))

  if(resultado1!=null){
      const error = new Exceptionn('Semantico',
      resultado1,
   this.line, this.column);
   tree.excepciones.push(error);
   return null;}
}else if (this.listaAsignaciones[x].exprecion.type.type===types.TYPE )
{



  //&&this.listaAsignaciones[x].exprecion.type.nombre===this.tipo
  const resultado1=nuevaTabla.setVariable(new Simbol(true,this.listaAsignaciones[x].exprecion.type,this.listaAsignaciones[x].identificador,resultado))
  if(resultado1!=null){  const error = new Exceptionn('Semantico',
  resultado1,
  this.line, this.column);
  tree.excepciones.push(error);
  return null;}
}

else {
// al final si noexiste o no se puede alguno tirar error y pa feura

    const error = new Exceptionn('Semantico',
    'el Tipo de dato '+ this.listaAsignaciones[x].identificador+' no es el mismo al type',
    this.line, this.column);
    tree.excepciones.push(error);
    return null;
}

}
let tipoo=new Type(types.OBJET);
tipoo.type=types.TYPE;
tipoo.nombre=this.tipo;
const sim=new Simbol(this.tipoInicial,tipoo,this.identificador,nuevaTabla);;
const final=table.setVariable(sim);
if(final!==null){
const error = new Exceptionn('Semantico',
final,
this.line, this.column);
tree.excepciones.push(error);
return null;

}
return null;
  }
  Traducir(tabla: Tabla, tree: Tree) {
  //  console.log(this)
    let data="";
   if(this.tipoInicial){
     data="let ";
   }
   else{data="const ";}
   data=data+this.identificador+":"+this.tipo+" = {";
   for (let x = 0; x < this.listaAsignaciones.length; x++) {
     let nuevoEntorno=new Tabla(tabla)
          data=data+this.listaAsignaciones[x].identificador+":"+this.listaAsignaciones[x].exprecion.Traducir(nuevoEntorno,tree);

          if(x+1<this.listaAsignaciones.length){
            data=data+", ";
          }

   }
   let  fin=new Type(types.OBJET);
   fin.typeObjeto=types.TYPE;
   fin.nombre=this.tipo;
   let sim=new Simbol(true,fin,this.identificador,null);

   tabla.setVariable(sim)
   tree.Traduccion.push(data+'};');
   return null;
  }
  tipoInicial:boolean;
  identificador:string;
  tipo:string;
  listaAsignaciones:Array<IdentificadorExprecion>;
  Linee:number;
  columna:number;


constructor(tipoInicial:boolean,identificador:string,tipo:string,listaAsignaciones:Array<IdentificadorExprecion>,line:number,column:number)
{
  super(null,line,column);
  this.tipoInicial=tipoInicial;
  this.identificador=identificador;
  this.tipo=tipo;
  this.listaAsignaciones=listaAsignaciones;
  this.Linee=line;
  this.columna=column;


}
  // tslint:disable-next-line: typedef
  execute(table: Tabla, tree: Tree) {


      const res = table.getVariable(this.tipo); // se busca si existe el tipo
      if (res === null){
        const error = new Exceptionn('Semantico',
        'no existe Type ' + this.tipo,
        this.line, this.column);
        tree.excepciones.push(error);
        return null;
      }

      let tablaa:Tabla;
      if(res.value instanceof Tabla){
        tablaa=res.value;}
// se obtene su entorno donde estan las variables del tipe

      if(res.type.typeObjeto!==types.TYPE){
          const error = new Exceptionn('Semantico',
      'tipo no valido ' + res.identifier,
      this.line, this.column);
      tree.excepciones.push(error);
      return null;

      }
// aqui ya es type y existe e ltype
// tslint:disable-next-line: prefer-for-of
if(this.listaAsignaciones.length!=tablaa.Variables.size){
  const error = new Exceptionn('Semantico',
  "El tamaño de la declaracion del type no es el mismo que el del type original",
  this.line, this.column);
  tree.excepciones.push(error);
  return null;

}
      let nuevaTabla=new Tabla (null);
      for (let x=0;x<this.listaAsignaciones.length;x++){
       const dato= tablaa.getVariable(this.listaAsignaciones[x].identificador);
         if(dato==null){     const error = new Exceptionn('Semantico',
        'no exite atributo ' +this.listaAsignaciones[x].identificador+ " dentro del type",
        this.line, this.column);
        tree.excepciones.push(error);
        return null;


      }
      else if (dato instanceof Exceptionn){const error = new Exceptionn('Semantico',
      'No se puede asignar un valor tipo error',
      this.line, this.column);
      tree.excepciones.push(error);
      return null;
      }
       const resultado=this.listaAsignaciones[x].exprecion.execute(table,tree);

     if(resultado instanceof Exceptionn ||resultado.valor==="Exception"){
      const error = new Exceptionn('Semantico',
      'No se puede asignar un valor tipo error',
      this.line, this.column);
      tree.excepciones.push(error);
      return null;
     }

       if (this.listaAsignaciones[x].exprecion.type.type===dato.type.type||dato.type.type==types.ANY){
    // if(this.listaAsignaciones[x].exprecion.type.type==types.OBJET)
    {
   // tslint:disable-next-line: max-line-length
   const resultado1=nuevaTabla.setVariable(new Simbol(true,this.listaAsignaciones[x].exprecion.type,this.listaAsignaciones[x].identificador,resultado))
 if(resultado1!=null){  const error = new Exceptionn('Semantico',
 resultado1,
 this.line, this.column);
 tree.excepciones.push(error);
 return null;}
     }
  }else if(this.listaAsignaciones[x].exprecion.type.type===types.NULL){
    // tslint:disable-next-line: max-line-length

    this.listaAsignaciones[x].exprecion.type.nombre=dato.type.nombre;
    let  fin=new Type(dato.type.typeObjeto);
    fin.typeObjeto=types.TYPE;
    fin.nombre=dato.type.nombre

    const resultado1= nuevaTabla.setVariable(new Simbol(true,fin,this.listaAsignaciones[x].identificador,resultado))

    if(resultado1!=null){
        const error = new Exceptionn('Semantico',
        resultado1,
     this.line, this.column);
     tree.excepciones.push(error);
     return null;}
  }else if (this.listaAsignaciones[x].exprecion.type.type===types.TYPE )
  {



    //&&this.listaAsignaciones[x].exprecion.type.nombre===this.tipo
    const resultado1=nuevaTabla.setVariable(new Simbol(true,this.listaAsignaciones[x].exprecion.type,this.listaAsignaciones[x].identificador,resultado))
    if(resultado1!=null){  const error = new Exceptionn('Semantico',
    resultado1,
    this.line, this.column);
    tree.excepciones.push(error);
    return null;}
  }

  else {
// al final si noexiste o no se puede alguno tirar error y pa feura

      const error = new Exceptionn('Semantico',
      'el Tipo de dato '+ this.listaAsignaciones[x].identificador+' no es el mismo al type',
      this.line, this.column);
      tree.excepciones.push(error);
      return null;
  }

}
let tipoo=new Type(types.OBJET);
tipoo.type=types.TYPE;
tipoo.nombre=this.tipo;
const sim=new Simbol(this.tipoInicial,tipoo,this.identificador,nuevaTabla);;
const final=table.setVariable(sim);
if(final!==null){
  const error = new Exceptionn('Semantico',
  final,
  this.line, this.column);
  tree.excepciones.push(error);
  return null;

}
return null;

  }}


