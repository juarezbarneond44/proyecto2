import { DeclararArray } from './DeclararArray';

import { Simbol } from './../Simbols/Simbol';
import { Declaracion } from "../Instrucciones/Declaracion";
import { Return } from './Return';
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";

/**
 * Permite imprimir expresiones en la consola
 */
export class ForIn extends Node{
  Traducir(tabla: Tabla, tree: Tree) {
    let data = 'for(';
    let nuevoEntorno=new Tabla(tabla);
    if(this.Instruccion!==null){

      let a=this.Instruccion.Traducir(nuevoEntorno,tree);
      data=data+a+" in "+this.Exprecion.Traducir(tabla,tree)+"){";
      tree.Traduccion.push(data);
    }
    else{
      data=data+this.identificador+" in "+this.Exprecion.Traducir(tabla,tree)+"){";
      tree.Traduccion.push(data);
    }


    let nuevoEntorn2o=new Tabla(nuevoEntorno);
    if(this.listaInstrucciones!==null){
    this.listaInstrucciones.forEach(element => {
      element.Traducir(nuevoEntorn2o,tree);
    });}
    tree.Traduccion.push("}");
    return null;

  }
  Instruccion:Node;
  Exprecion:Node;
  listaInstrucciones:Array<Node>;
  estado:boolean;
  identificador:string;
  // tslint:disable-next-line: max-line-length
  constructor( estado:boolean, Instruccion:Node,identificador:string,Exprecion:Node, listaInstrucciones:Array<Node>,line:number,columna:number){
    super(null,line,columna);
    this.Instruccion=Instruccion;
    this.Exprecion=Exprecion;
    this.listaInstrucciones=listaInstrucciones;
    this.estado=estado;
    this.identificador=identificador;
  }
  execute(tabla: Tabla, tree: Tree) {

if(this.estado){
let nuevoEntorno=new Tabla(tabla);
let sim=this.Instruccion.execute(nuevoEntorno,tree);
nuevoEntorno.setVariable(sim);

if(this.Instruccion instanceof Declaracion){
sim=nuevoEntorno.getVariable(this.Instruccion.identifier);
}
// ejecutar la exprecion y ver sçu tipo
let expresion=this.Exprecion.execute(tabla,tree);
if(this.Exprecion.type.type===types.STRING){
  tree.pila.push(new Type (types.CICLO));
  // tslint:disable-next-line: forin
  for (const dato in expresion) {
    // hay que asignarle los valores
sim.type=this.Exprecion.type;
sim.value=dato;
let nuevoEntorno3=new Tabla(nuevoEntorno);
if(this.listaInstrucciones==null){continue;}
else{
for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const res = this.listaInstrucciones[x].execute(nuevoEntorno3,tree);
    if(res instanceof Break){
      tree.pila.pop();
      return null;}
    if(res instanceof Continue){break;}
    if(res instanceof Return){  tree.pila.pop();return res;}
  }}}
}
else if(this.Exprecion.type.type===types.ARRAY||this.Exprecion.type.typeObjeto===types.ARRAY)
{tree.pila.push(new Type (types.CICLO));
  //if(this.Exprecion instanceof Node){
if(expresion instanceof Array){
  for (let x = 0; x < expresion.length; x++) {
    const dato = expresion[x];
    if(dato instanceof DeclararArray){
      sim.type= new Type(this.Exprecion.type.typeArray)
      sim.value=dato.ListaPosiciones[0];
//console.log(sim)

    }else {}
    let nuevoEntorno3=new Tabla(nuevoEntorno);
if(this.listaInstrucciones==null){continue;}
else{
for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const res = this.listaInstrucciones[x].execute(nuevoEntorno3,tree);
    if(res instanceof Break){
      tree.pila.pop();
      return null;}
    if(res instanceof Continue){break;}
    if(res instanceof Return){  tree.pila.pop();return res;}
  }}
  }

}


}
else if(this.Exprecion.type.type===types.TYPE||this.Exprecion.type.typeObjeto===types.TYPE)
{
  tree.pila.push(new Type (types.CICLO));
  // tslint:disable-next-line: forin
  let tab:Map<String, Simbol>;
  if(expresion instanceof Tabla){
   tab=expresion.Variables;
  }
 let  listaStrings:Array<string>=[];
tab.forEach(element => {
  listaStrings.push(element.identifier+"");});
  for (let x = 0; x < listaStrings.length; x++) {
sim.type=new Type(types.STRING);
sim.value=listaStrings[x];
let nuevoEntorno3=new Tabla(nuevoEntorno);
if(this.listaInstrucciones==null){}
else{
for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const res = this.listaInstrucciones[x].execute(nuevoEntorno3,tree);
    if(res instanceof Break){
    tree.pila.pop();
    return null;}
    if(res instanceof Continue){break;}
    if(res instanceof Return){  tree.pila.pop();return res;}
  }}}
}
}
else{
let sim=tabla.getVariable(this.identificador);
if(sim==null){
  const error = new Exceptionn('Semantico',
      'Identificador no encontrado',
      this.line, this.column);
      tree.excepciones.push(error);
      return null;
}
// ejecutar la exprecion y ver sçu tipo
let expresion=this.Exprecion.execute(tabla,tree);

if(this.Exprecion.type.type===types.STRING){
  tree.pila.push(new Type (types.CICLO));
  // tslint:disable-next-line: forin
  if(sim.type.type===types.ANY){sim.type=new Type(types.NUMERIC);}
  if(sim.type.type!==types.NUMERIC){const error = new Exceptionn('Semantico',
  'Typos no validos '+sim.type.toString()+" numeric",
  this.line, this.column);
  tree.excepciones.push(error);
  tree.pila.pop();
  return null;}
  for (const dato in expresion) {
    // hay que asignarle los valores

sim.value=dato;
let nuevoEntorno3=new Tabla(tabla);
if(this.listaInstrucciones==null){continue;}
else{
for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const res = this.listaInstrucciones[x].execute(nuevoEntorno3,tree);
    if(res instanceof Break){
      tree.pila.pop();
      return null;}
    if(res instanceof Continue){break;}
    if(res instanceof Return){  tree.pila.pop();return res;}
  }}}
}
else if(this.Exprecion.type.type===types.ARRAY||this.Exprecion.type.typeObjeto===types.ARRAY)
{

 console.log("arreglos")

}
else if(this.Exprecion.type.type===types.TYPE||this.Exprecion.type.typeObjeto===types.TYPE)
{
  tree.pila.push(new Type (types.CICLO));
  // tslint:disable-next-line: forin
  let tab:Map<String, Simbol>;
  if(expresion instanceof Tabla){
   tab=expresion.Variables;
  }
  let  listaStrings:Array<string>=[];
  tab.forEach(element => {
  listaStrings.push(element.identifier+"");});
  if(sim.type.type===types.ANY){sim.type=new Type(types.STRING);}
  if(sim.type.type!==types.STRING){const error = new Exceptionn('Semantico',
  'Typos no validos '+sim.type.toString()+" string",
  this.line, this.column);
  tree.excepciones.push(error);
  tree.pila.pop();
  return null;}
  for (let x = 0; x < listaStrings.length; x++) {


sim.value=listaStrings[x];
let nuevoEntorno3=new Tabla(tabla);
if(this.listaInstrucciones==null){}
else{
for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const res = this.listaInstrucciones[x].execute(nuevoEntorno3,tree);
    if(res instanceof Break){
    tree.pila.pop();
    return null;}
    if(res instanceof Continue){break;}
    if(res instanceof Return){  tree.pila.pop();return res;}
  }}}
}



}
tree.pila.pop();
return null;
   }

}
