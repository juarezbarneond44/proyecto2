import { ValorArreglo } from './../Expresiones/ValorArreglo';
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
export class ForOF extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
if(this.estado)
{
  let nuevoEntorno=new Tabla(tabla);
let sim=this.Instruccion.codigo3direcciones(nuevoEntorno,tree);
nuevoEntorno.setVariable(sim);
let valorsalida:object=null
tree.pila.push(new Type (types.CICLO));
let etiquetaFor=tree.getEtiqueta();
let exprecion="t"+tree.getContador();

let  datoo=this.Exprecion.codigo3direcciones(nuevoEntorno,tree);

if(this.Exprecion.type.type!==types.ARRAY)
{
  this.type=new Type(types.ERROR);
  let error =new Exceptionn('Semantico', `la expresion no es de tipo arreglo`,this.line, this.column);
  tree.excepciones.push(error);
return error;
}
tree.codigo3d.push("// *****for of*****")

tree.codigo3d.push(`${exprecion}=stack[(int)${datoo}];`)
let etiquetaF=tree.getEtiqueta();
tree.etiquetasS.push("L"+etiquetaF);
tree.codigo3d.push(`if(${exprecion}==-1) goto L${etiquetaF};`);
let temporalArreglo="t"+tree.getContador();
let valorArreglo="t"+tree.getContador();
let variable=sim.value;
tree.codigo3d.push(`${temporalArreglo}=3+${exprecion};`);
tree.codigo3d.push(`L${etiquetaFor}:`);

tree.codigo3d.push(`${valorArreglo}=heap[(int)${temporalArreglo}];`);
tree.codigo3d.push(`if(${valorArreglo}==-1) goto L${etiquetaF};`);
tree.codigo3d.push(`stack[(int)${variable}]=${valorArreglo};`);
sim.type=new Type(this.Exprecion.type.typeArray);
sim.value=variable;

if(this.listaInstrucciones!==null){

  let entorno=new Tabla(nuevoEntorno);
  for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const element = this.listaInstrucciones[x];
    let res=element.codigo3direcciones(entorno,tree);
    if(element instanceof Break)
    {
      tree.codigo3d.push(`goto L${etiquetaF};`)
    }
     else if(res instanceof Continue)
    {
      tree.codigo3d.push(`${temporalArreglo}=${temporalArreglo}+1;`);
      tree.codigo3d.push(`goto L${etiquetaFor};`);
    }
    else if(res instanceof Return)
    {
      if(valorsalida===null){valorsalida= res;   tree.codigo3d.push(`goto L${etiquetaF};`)}
    }
  }
}
tree.codigo3d.push(`${temporalArreglo}=${temporalArreglo}+1;`);
tree.codigo3d.push(`goto L${etiquetaFor};`);
tree.codigo3d.push(`L${etiquetaF}:`);
return valorsalida;
}
else{
  let etiquetaFor=tree.getEtiqueta();
  let nuevoEntorno=new Tabla(tabla);
let sim=tabla.getVariable(this.identificador);
if(sim ==null)
{
  this.type=new Type(types.ERROR);
  let error =new Exceptionn('Semantico', `no se encontro la variable`,this.line, this.column);
  tree.excepciones.push(error);
return error;
}
let exprecion;
exprecion=this.Exprecion.codigo3direcciones(nuevoEntorno,tree);
if(this.Exprecion.type.type!==types.ARRAY)
{
  this.type=new Type(types.ERROR);
  let error =new Exceptionn('Semantico', `la expresion no es de tipo arreglo`,this.line, this.column);
  tree.excepciones.push(error);
return error;
}
tree.pila.push(new Type (types.CICLO));
let valorsalida:object=null
tree.codigo3d.push("// *****for of*****")
let etiquetaF=tree.getEtiqueta();
tree.etiquetasS.push("L"+etiquetaF);
tree.codigo3d.push(`if(${exprecion}==-1) goto L${etiquetaF};`);
let temporalArreglo="t"+tree.getContador();
let valorArreglo="t"+tree.getContador();
let variable="t"+tree.getContador();
tree.codigo3d.push(`${temporalArreglo}=3+${exprecion};`);
tree.codigo3d.push(`L${etiquetaFor}:`);
tree.codigo3d.push(`${valorArreglo}=heap[(int)${temporalArreglo}];`);
tree.codigo3d.push(`if(${valorArreglo}==-1) goto L${etiquetaF};`);
tree.codigo3d.push(`stack[(int)${variable}]=${valorArreglo};`);
sim.type=new Type(this.Exprecion.type.typeArray);
sim.value=variable;
let entorno=new Tabla(nuevoEntorno);
if(this.listaInstrucciones!==null){

  let entorno=new Tabla(nuevoEntorno);
  for (let x = 0; x < this.listaInstrucciones.length; x++) {
    const element = this.listaInstrucciones[x];
    let res=element.codigo3direcciones(entorno,tree);
    if(res instanceof Break)
    {
      tree.codigo3d.push(`goto L${etiquetaF};`)
    }
     else if(res instanceof Continue)
    {
      tree.codigo3d.push(`${temporalArreglo}=${temporalArreglo}+1;`);
      tree.codigo3d.push(`goto L${etiquetaFor};`);
    }
    else if(res instanceof Return)
    {
      if(valorsalida===null){valorsalida= res;   tree.codigo3d.push(`goto L${etiquetaF};`)}
    }
  }
}
tree.codigo3d.push(`${temporalArreglo}=${temporalArreglo}+1;`);
tree.codigo3d.push(`goto L${etiquetaFor};`);
tree.codigo3d.push(`L${etiquetaF}:`);

return valorsalida;
}

  }
  Traducir(tabla: Tabla, tree: Tree) {
    let data = 'for(';
    let newTabl2a=new Tabla (tabla);
    if(this.Instruccion!==null){

      let a=this.Instruccion.Traducir(newTabl2a,tree);
      data=data+a+" of "+this.Exprecion.Traducir(tabla,tree)+"){";
      tree.Traduccion.push(data);
    }
    else{
      data=data+this.identificador+" of "+this.Exprecion.Traducir(tabla,tree)+"){";
      tree.Traduccion.push(data);
    }



    if(this.listaInstrucciones!==null){
    this.listaInstrucciones.forEach(element => {
      let newTabla=new Tabla (newTabl2a);
      element.Traducir(newTabla,tree);
    });}
    tree.Traduccion.push("}");
    return null;
  }
  Instruccion:Node;
  Exprecion:Node;
  listaInstrucciones:Array<Node>;
  estado:boolean;
  identificador:string;
  listaValores:Array<Node>;
  constructor(estado:boolean, Instruccion:Node,identificador:string,Exprecion:Node, listaInstrucciones:Array<Node>,line:number,columna:number){
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
  for (const dato of expresion) {
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
      sim.value=dato.valor;
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
else{

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
 let  listaStrings:Array<any>=[];
tab.forEach(element => {
  listaStrings.push(element.value);});
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
  for (const dato of expresion) {
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
{}
else if(this.Exprecion.type.type===types.TYPE||this.Exprecion.type.typeObjeto===types.TYPE)
{
  tree.pila.push(new Type (types.CICLO));
  // tslint:disable-next-line: forin
  let tab:Map<String, Simbol>;
  if(expresion instanceof Tabla){
   tab=expresion.Variables;
  }
  let  listaStrings:Array<any>=[];
  tab.forEach(element => {
  listaStrings.push(element.value);});
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
