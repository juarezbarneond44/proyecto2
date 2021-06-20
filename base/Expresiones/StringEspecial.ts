
import {Node} from "../Abstract/Node";
import { ListaIdentificado } from '../Instrucciones/ListaIdentificado';
import { Return } from '..//Instrucciones/Return';
import { element } from 'protractor';
import { IdentificadorExprecion } from '../Instrucciones/IdentificadorExprecion';
import { Exceptionn } from '../utilidad/Exceptionn';
import{Type, types} from "../utilidad/Type";
import{Incremento} from "../utilidad/Incremento";
import { Primitive } from '../Expresiones/Primitive';
import { Tree } from '../Simbols/Tree';
import { Tabla } from '../Simbols/Tabla';
import { Component } from '@angular/core';
 import{Arithmetic}from "../Expresiones/Arithmetic";
 import{ForIn}from "../Instrucciones/ForIn";
import{Identificador}from "../Expresiones/Identificador";
import{FuncionEjecutar}from "../Expresiones/FuncionEjecutar";
import{Ternario}from "../Expresiones/Ternario";
import {Break} from "../Instrucciones/Break";
import {Case} from "../Instrucciones/Case";
import {Continue} from "../Instrucciones/Continue";
import {DeclararType} from "../Instrucciones/DeclararType";
import {DoWhile} from "../Instrucciones/DoWhile";
import {For} from "../Instrucciones/For";
import {Funcion} from "../Instrucciones/Funcion";
import {IF} from "../Instrucciones/IF";
import {Switch} from "../Instrucciones/Switch";
import {TypeDeclaracion} from "../Instrucciones/TypeDeclaracion";
import {While} from "../Instrucciones/While";
import {Asignacion} from "../Instrucciones/Asignacion";
import {Print} from "../Instrucciones/Print";
import {Declaracion} from "../Instrucciones/Declaracion";
import {declararLista} from "../Instrucciones/declararLista";
import {GraficarEntorno} from "../Instrucciones/GraficarEntorno";
import {ForOF} from "../Instrucciones/ForOF";
import pdfFonts from "pdfmake/build/vfs_fonts";
import{Parentesis}from "../Expresiones/Parentesis";

/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class StringEspecial extends Node{
  codigo3direcciones(table: Tabla, tree1: Tree)
  {
    let temporales;
  let data:String=this.value+"";
  let estado=0;
  let valor_imprimir="";
  let texto="";
  for (let x = 0; x < data.length; x++) {
    let caracter=data[x];


  switch(estado){

  case 0:
    {

    if(caracter==="$"){estado=1; }
    else{ valor_imprimir=valor_imprimir+caracter;}
    break;
    }
  case 1:{
  if(caracter==="{"){estado=2; }
  else{valor_imprimir=valor_imprimir+"$"+caracter;estado=0;}
    break;
  }
  case 2:{
  if(caracter==="}")
  {
  x--;
    estado=100; //aca se va a hacer el analizador sintactico otra vez;

  }else{texto=texto+caracter;}
  break;
  }
  case 100:{

    let parser = require('../Grammar/Grammar.js');
    let tree:Tree;

    tree = parser.parse("let juanito444="+texto+";");

      let tabla=new Tabla(table);

      if(tree.instructions==null){return;}
      tree.instructions.map((m) => {
       {  let res = m.codigo3direcciones(tabla, tree1);}
         });

       tabla.Variables.forEach(element => {
        if(element.identifier==="juanito444")
        {
          //console.log(valor_imprimir)
          //console.log(element)
          let derecha

            if(this.valorString==null)
            {

              let val=new Primitive(new Type(types.STRING),valor_imprimir,this.line,this.column).codigo3direcciones(tabla,tree1);
              this.valorString="t"+tree1.getContador();
               derecha="t"+tree1.getContador();

              tree1.codigo3d.push(this.valorString+"=p;"); // guardara el inicio de la cadena
              tree1.codigo3d.push("t0="+val+";");  //cargamos lavieja cadena
              tree1.codigo3d.push("concatenarString();"); //realizamos la accion+

              tree1.codigo3d.push(derecha+"=stack[(int)"+element.value+"];");  //cargamos lavieja cadena
              //tree1.codigo3d.push("concatenarString();"); //realizamos la accion+
            }else
            {
              let val=new Primitive(new Type(types.STRING),valor_imprimir,this.line,this.column).codigo3direcciones(tabla,tree1);
              //console.log(valor_imprimir)
              tree1.codigo3d.push("t0="+this.valorString+";");  //cargamos lavieja cadena
              this.valorString="t"+tree1.getContador();
              tree1.codigo3d.push(this.valorString+"=p;"); // guardara el inicio de la cadena
              tree1.codigo3d.push("concatenarString();"); //realizamos la accion


              tree1.codigo3d.push("t0="+val+";");  //cargamos lavieja cadena
             tree1.codigo3d.push("concatenarString();"); //realizamos la accion+

              derecha="t"+tree1.getContador();
              tree1.codigo3d.push(derecha+"=stack[(int)"+element.value+"];");  //cargamos lavieja cadena



            }

            if(element.type.type==types.NUMERIC)
            {
              //console.log("entra aqu")
            tree1.codigo3d.push("t2="+derecha+";");
            tree1.codigo3d.push("NumberToString();");

            }
            else if(element.type.type==types.BOOLEAN)
            {
              tree1.codigo3d.push("t2="+derecha+";");  //cargamos lavieja cadena
              tree1.codigo3d.push("BooleanToString();"); //realizamos la accion
            }
            else if (element.type.type==types.STRING)
            {
              tree1.codigo3d.push("t0="+derecha+";");  //cargamos lavieja cadena
              tree1.codigo3d.push("concatenarString();"); //realizamos la accion
            }
            tree1.codigo3d.push("t0=p;");
            tree1.codigo3d.push("t1=-1;");
         tree1.codigo3d.push("guardarString();");


          }});
       valor_imprimir="";
       texto="";
  // se agregara al texto se debera pushear los errores del tree temporal
  estado=0;
    break;
  }
}
}
if(this.valorString!==null){
let contador=tree1.getContador();
tree1.codigo3d.push("t"+contador+"=p;"); // guardara el inicio de la cadena
tree1.codigo3d.push("t0="+this.valorString+";");  //cargamos lavieja cadena
tree1.codigo3d.push("concatenarString();"); //realizamos la accion+

let val=new Primitive(new Type(types.STRING),valor_imprimir,this.line,this.column).codigo3direcciones(table,tree1);
tree1.codigo3d.push("t0="+val+";");  //cargamos lavieja cadena
tree1.codigo3d.push("concatenarString();"); //realizamos la accion
tree1.codigo3d.push("t0=p;");
tree1.codigo3d.push("t1=-1;");
tree1.codigo3d.push("guardarString();");

this.type=new Type(types.STRING);

return "t"+contador;
}
else
{

let val=new Primitive(new Type(types.STRING),valor_imprimir,this.line,this.column).codigo3direcciones(table,tree1);
let contador=tree1.getContador();
tree1.codigo3d.push("t"+contador+"=p;"); // guardara el inicio de la cadena
tree1.codigo3d.push("t0="+val+";");  //cargamos lavieja cadena
tree1.codigo3d.push("concatenarString();"); //realizamos la accion
tree1.codigo3d.push("t0=p;");
tree1.codigo3d.push("t1=-1;");
tree1.codigo3d.push("guardarString();");
  this.type=new Type(types.STRING);
  return "t"+contador;

}




      }











    Traducir(Tabla: Tabla, tree: Tree) {
      if(this.type.type===types.STRING){
        return "\`"+this.value+"\`";
      }
      return this.value;
    }
    value: Object;
    valorString:string;

    /**
     * @constructor Devuelve un nodo que internamente sera una expresion por tener un tipo
     * @param type Tipo del valor, puede ser numero, cadena o booleano
     * @param value Valor primitivo que crear
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    constructor(type:Type, value: Object, line: number, column: number){
        super(type, line, column);
        this.value = value;
        this.valorString=null;

    }
    /**
     * Devuelve el valor inicial e.g. 4
     * @param Tabla Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
execute(table: Tabla, tree1: Tree)
{
let data:String=this.value+"";
let estado=0;
let valor_imprimir="";
let texto="";
for (let x = 0; x < data.length; x++) {
  let caracter=data[x];


switch(estado){

case 0:
  {

  if(caracter==="$"){estado=1; }
  else{ valor_imprimir=valor_imprimir+caracter;}
  break;
  }
case 1:{
if(caracter==="{"){estado=2; }
else{valor_imprimir=valor_imprimir+"$"+caracter;estado=0;}
  break;
}
case 2:{
if(caracter==="}")
{
x--;
  estado=100; //aca se va a hacer el analizador sintactico otra vez;

}else{texto=texto+caracter;}
break;
}
case 100:{

  let parser = require('../Grammar/Grammar.js');
  let tree:Tree;

  tree = parser.parse("let juanito444="+texto+";");

    let tabla=new Tabla(table);

    if(tree.instructions==null){return;}
    tree.instructions.map((m) => {
     {  let res = m.execute(tabla, tree);}
       });
     if(tree.excepciones.length>0){tree1.excepciones.push(tree.excepciones[0])}

     tabla.Variables.forEach(element => {
      if(element.identifier==="juanito444"){valor_imprimir=valor_imprimir+element.value;}


     });
     texto="";
// se agregara al texto se debera pushear los errores del tree temporal
estado=0;
  break;
}}}
this.valorString=valor_imprimir;

this.type=new Type(types.STRING);
      return this;
    }

}
