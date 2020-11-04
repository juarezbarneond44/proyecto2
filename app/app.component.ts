import { StringConcat } from './base/Expresiones/StringConcat';
import { StringToUpperCase } from './base/Expresiones/StringToUpperCase';
import { StringToLowerCase } from './base/Expresiones/StringToLowerCase';
import { StringCharAt } from './base/Expresiones/StringCharAt';
import { StringLength } from './base/Expresiones/StringLength';


import { DeclararArray } from './base/Instrucciones/DeclararArray';
import { ArregloValor } from './base/Expresiones/ArregloValor';

import { ListaIdentificado } from './base/Instrucciones/ListaIdentificado';
import { Return } from './base/Instrucciones/Return';
import { element } from 'protractor';
import { IdentificadorExprecion } from './base/Instrucciones/IdentificadorExprecion';
import {ArrayInstruccion} from './base/Instrucciones/ArrayInstruccion';
import { Exceptionn } from './base/utilidad/Exceptionn';
import{Type, types} from "./base/utilidad/Type";
import{Incremento} from "./base/utilidad/Incremento";
import { Primitive } from './base/Expresiones/Primitive';
import { ArrayBusqueda } from './base/Expresiones/ArrayBusqueda';
import { Tree } from './base/Simbols/Tree';
import { Tabla } from './base/Simbols/Tabla';
import { Component, ɵɵinjectPipeChangeDetectorRef } from '@angular/core';
 import{Arithmetic}from "./base/Expresiones/Arithmetic";
 import{ForIn}from "./base/Instrucciones/ForIn";
import{Identificador}from "./base/Expresiones/Identificador";
import{FuncionEjecutar}from "./base/Expresiones/FuncionEjecutar";
import{Ternario}from "./base/Expresiones/Ternario";
import {Break} from "./base/Instrucciones/Break";
import {Case} from "./base/Instrucciones/Case";
import {Continue} from "./base/Instrucciones/Continue";
import {DeclararType} from "./base/Instrucciones/DeclararType";
import {DoWhile} from "./base/Instrucciones/DoWhile";
import {For} from "./base/Instrucciones/For";
import {Funcion} from "./base/Instrucciones/Funcion";
import {IF} from "./base/Instrucciones/IF";
import {Switch} from "./base/Instrucciones/Switch";
import {TypeDeclaracion} from "./base/Instrucciones/TypeDeclaracion";
import {While} from "./base/Instrucciones/While";
import {Asignacion} from "./base/Instrucciones/Asignacion";
import {Print} from "./base/Instrucciones/Print";
import {Declaracion} from "./base/Instrucciones/Declaracion";
import {declararLista} from "./base/Instrucciones/declararLista";
import {GraficarEntorno} from "./base/Instrucciones/GraficarEntorno";

import {ForOF} from "./base/Instrucciones/ForOF";
import pdfFonts from "pdfmake/build/vfs_fonts";
import{Parentesis}from "./base/Expresiones/Parentesis";
import{StringEspecial}from "./base/Expresiones/StringEspecial";
import {Nodo_AST} from "../app/AST/Nodo_AST";
import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { Simbol } from './base/Simbols/Simbol';
import {ArrayLength} from './base/Expresiones/ArrayLength';
import {ArraPush}  from './base/Instrucciones/ArraPush';
import {ArrayPop}  from './base/Instrucciones/ArrayPop';
import { type } from 'os';
import { identifierModuleUrl, Expression } from '@angular/compiler';

const parser = require('./base/Grammar/Grammar.js');


declare var generateTree;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  codeMirrorOptions: any = {
    theme: 'blackboard',
    mode: 'application/typescript',
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true

  };
  codeMirrorOptions2: any = {
    theme: '3024-night',
    mode: 'application/typescript',
    readOnly:true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: false,
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true

  };


  title = 'Compi2';
public textoEntrada:string="";
public textoSalida:string="";
listaErroresEjecucion:Array<Exceptionn>=new Array();
ejecutarr:boolean=true;
 tabla = new Tabla(null);
  tree:Tree;
  traducir()
  {


    this.ejecutarr=false;
      this.listaErroresEjecucion=new Array();
      this. tree = parser.parse(this.textoEntrada);

      this.tabla=new Tabla(null);
      if(this.tree.instructions==null){return;}
      this.tree.instructions.map((m) => {
               if(m instanceof Funcion){ const res = m.codigo3direcciones(this.tabla, this.tree);}
      });

      this.tree.codigo3d.push("void main(){");

      this.tree.instructions.map((m) => {
        if(!(m instanceof Funcion)){  const res = m.codigo3direcciones(this.tabla, this.tree);}
       });



      this.textoSalida = "";
      this.textoSalida=this.textoSalida="#include <stdio.h>\n#include<math.h>\n";
      // se agregaran todos lo s temporales
      for (let x = 0; x < this.tree.contador; x++) {
       if(x==0){this.textoSalida=this.textoSalida+"double "}
       else if(x%20==0){this.textoSalida=this.textoSalida+"\n"}
      this.textoSalida=this.textoSalida+"t"+x;
      if(this.tree.contador-1!==x){this.textoSalida=this.textoSalida+","}

     }
      if( this.tree.contador!==0){this.textoSalida=this.textoSalida+";\n"}
// se imprimiran todas las funciones nativas


    this.tree.Encabezadocodigo3d.forEach(element => {
      this.textoSalida=this.textoSalida+element+"\n";});
      // aqui vendra todo el codigo

      this.tree.codigo3d.forEach(element =>
      {
        if(element===null){}
        else{

          this.textoSalida=this.textoSalida+element+'\n'; }

    });
    this.textoSalida=this.textoSalida+"return;\n}";
      this.listaErroresEjecucion=this.tree.excepciones;
      console.log(this.listaErroresEjecucion);


  }
  optimizar()
  {

  }
  limpiarEntrada()
  {
       if(confirm("Desea eliminar el texto de entrada?")){this.textoEntrada="";}
  }
  limpiarSalida()
  {
       if(confirm("Desea eliminar el texto de salida?")){this.textoSalida="";}
  }
  generarAST()
  {
    if (document.getElementById("grafo")) {
      document.getElementById("grafo").innerHTML = "";
    }

    if(this.tree.instructions!=null){

   this.reporte_ast(this.tree.instructions);
  //console.log("holaaa")
  }
  }
  generarPDF()
  {
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    let titulo="";
    if(this.ejecutarr){titulo="Reporte De errores En Ejecucion";}
    else{titulo="Reporte De errores En Traduccion";}


    let tituloPDF=new Txt(titulo).alignment('center').end;
  pdf.add(tituloPDF);
  pdf.add("\n");

  let tabla=new Table([ [ "Typo","Descripcion","Linea","Columna"]]).widths([ 60, 350 ,30,50]).alignment('center').end;
  pdf.add(tabla);

  this.listaErroresEjecucion.forEach(element =>
  {

   let tabla=new Table([[ element.type,element.description,element.line,element.column]]).widths([ 60, 350,30,50 ]).alignment('center').end;
   pdf.add(tabla);
  });



  pdf.create().open();

  }
  ast(element):any{
    let exp = new Nodo_AST("Expresion",null,[]);
    if(element instanceof Arithmetic){
      if(element.leftOperator != null){
        let izq: Nodo_AST= this.ast(element.leftOperator);
        izq.parent = exp;
        exp.children.push(izq);
      }
     exp.children.push(new Nodo_AST(element.Operator,exp,[]));
      if(element.rightOperator != null){
        let der: Nodo_AST= this.ast(element.rightOperator);
        der.parent = exp;
        exp.children.push(der);
    }



    }else if(element instanceof Primitive){
      let hijo = new Nodo_AST(element.value.toString(), null, []);
      return hijo;
    }else if (element instanceof Identificador){
      let hijo = new Nodo_AST(element.identifier, null, []);
      return hijo;
    }else if (element instanceof Incremento){
      if(element.TipoFuncion)
      {
        if(element.TipoPocicion)
        {
          exp.children.push(new Nodo_AST("++",exp,[]));
          exp.children.push(new Nodo_AST(element.id,exp,[]));
        }else {
          exp.children.push(new Nodo_AST(element.id,exp,[]));
          exp.children.push(new Nodo_AST("++",exp,[]));
        }
      }else {
        if(element.TipoPocicion)
        {
          exp.children.push(new Nodo_AST("--",exp,[]));
          exp.children.push(new Nodo_AST(element.id,exp,[]));
        }else {
          exp.children.push(new Nodo_AST(element.id,exp,[]));
          exp.children.push(new Nodo_AST("--",exp,[]));

      }
    }
    }else if (element instanceof FuncionEjecutar){
    let padre = new Nodo_AST("",null,[]);
    let hijo: Nodo_AST;
    padre.name="Funcion Ejetutar";
    hijo=new Nodo_AST(element.id,padre,[]);
    if(element.ListaExpreciones!=null){
      let hijo2=new Nodo_AST("Expresion",padre,[]);
      element.ListaExpreciones.forEach(element1 => {
        let aux=this.ast(element1);
        hijo2.children.push(aux);
      });
      padre.children.push(hijo2);
    return padre;
    }
    }else if (element instanceof ListaIdentificado){
   let padre=new Nodo_AST("Lista ID",exp,[]);
    element.linstaID.forEach(element1 => {
      if(element1.Listaexprecion==null){
        let aux=new Nodo_AST("ID",padre,[]);
        aux.children.push(new Nodo_AST(element1.identificador,aux,[]));
        padre.children.push(aux);
      }else {
        // aca estara el array
      }

    });
    exp.children.push(padre);

    }else if (element instanceof Ternario){
      let padre=new Nodo_AST("Ternario",exp,[]);
    padre.children.push(this.ast(element.condicion));
    padre.children.push(new Nodo_AST("?",padre,[]));
    padre.children.push(this.ast(element.operadorVerdadero));
    padre.children.push(new Nodo_AST(":",padre,[]));
    padre.children.push(this.ast(element.operadorFalso));
    exp.children.push(padre);
    }else if (element instanceof ArrayBusqueda){
      exp.children.push(new Nodo_AST(element.Identificador,exp,[]));
      if(element.value!==null){
        element.value.forEach(ele => {

          let hijo=this.ast(ele);
          if(hijo instanceof Nodo_AST){hijo.name="[ "+hijo.name+" ]"}
          exp.children.push(hijo);
        });
      }
    }else if (element instanceof ArrayLength){
      exp.children.push(new Nodo_AST(element.Identificador,exp,[]));
      if(element.value!==null){
        element.value.forEach(ele => {

          let hijo=this.ast(ele);
          if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
          exp.children.push(hijo);
        });
      }
      exp.children.push(new Nodo_AST(". lenght",null,[]))
    }else if (element instanceof ArregloValor){

     exp.children.push(new Nodo_AST("[",null,null))
      if(element.value!==null){
        element.value.forEach(ele => {
          let hijo=this.ast(ele);
        //  if(hijo instanceof Nodo_AST){}
          exp.children.push(hijo);
        });
      }
      exp.children.push(new Nodo_AST("]",null,null))
    }else if (element instanceof Array){
   //   exp.children.push(new Nodo_AST("[",null,[]))
      element.forEach(ele => {
        let hijo1=this.ast(ele);
        exp.children.push(hijo1)
      });
     // exp.children.push(new Nodo_AST("]",null,[]))












    }
    if(element instanceof Parentesis){
      if(element.expresion != null){
        let izq: Nodo_AST= this.ast(element.expresion);
        izq.parent = exp;
        exp.children.push(izq);
      }
     //exp.children.push(new Nodo_AST(element,exp,[]));
    }
    if(element instanceof StringConcat){

        let izq: Nodo_AST= this.ast(element.expresion);
        izq.parent = exp;
        exp.children.push(izq);
        let op: Nodo_AST= new Nodo_AST("Concat",null,[]);
        exp.children.push(op);
        let der: Nodo_AST= this.ast(element.expresion2);
        der.parent = exp;
        exp.children.push(der);

    }
    if(element instanceof StringToUpperCase){

      let izq: Nodo_AST= this.ast(element.expresion);
      izq.parent = exp;
      exp.children.push(izq);
      let op: Nodo_AST= new Nodo_AST("ToUpperCase()",null,[]);
      exp.children.push(op);
  }
  if(element instanceof StringToLowerCase){

    let izq: Nodo_AST= this.ast(element.expresion);
    izq.parent = exp;
    exp.children.push(izq);
    let op: Nodo_AST= new Nodo_AST("ToLowerCase()",null,[]);
    exp.children.push(op);
}
if(element instanceof StringCharAt){

  let izq: Nodo_AST= this.ast(element.Expression1);
  izq.parent = exp;
  exp.children.push(izq);
  let op: Nodo_AST= new Nodo_AST("CharAt",null,[]);
  exp.children.push(op);
  let der: Nodo_AST= this.ast(element.Expression2);
  der.parent = exp;
  exp.children.push(der);
}
if(element instanceof StringLength){

  let izq: Nodo_AST= this.ast(element.expresion);
  izq.parent = exp;
  exp.children.push(izq);
  let op: Nodo_AST= new Nodo_AST("length()",null,[]);
  exp.children.push(op);

}


   // import {   } from './base/Expresiones/StringLength';






    return exp;
  }
  reporte_ast(listaInstrucciones){
  let results = new Nodo_AST("Instrucciones",null,[]);
 // console.log(results)


  listaInstrucciones.forEach(element => {
  //  console.log(this.tree)
  let padre=this.reporteInstruccion(element);
  padre.parent = results;
  results.children.push(padre);

  });
  results.children.push(new Nodo_AST("#",null,[]));
  generateTree([results]);


}
reporteInstruccion(element):any
{
  let padre = new Nodo_AST("",null,[]);
  let hijo: Nodo_AST;

  if(element instanceof Print){
          padre.name = "Imprimir";

          hijo = this.ast(element.expression);
          hijo.parent = padre;
          padre.children.push(hijo);

    }
    else if(element instanceof Asignacion)
      {

      padre.name = "Asignacion";
      padre.children.push(new Nodo_AST(element.idenfiticador,padre,[]));
      padre.children.push(new Nodo_AST("=",padre,[]));
      if(element.exprecion!=null){
        hijo = this.ast(element.exprecion);
        hijo.parent = padre;
      padre.children.push(hijo);
      }else {
        if(element.listaTYPES!==null){
          let exp = new Nodo_AST("Expresion",null,[]);
          exp.children.push(new Nodo_AST("{",exp,[]));
          element.listaTYPES.forEach(jison =>
          {
            if(jison instanceof IdentificadorExprecion){
                exp.children.push(new Nodo_AST(jison.identificador,exp,[]));
                exp.children.push(new Nodo_AST(":",exp,[]));
                hijo = this.ast(jison.exprecion);
                hijo.parent=exp;
                exp.children.push(hijo);
            }
          });
          exp.children.push(new Nodo_AST("}",exp,[]));
          exp.parent=padre;
          padre.children.push(exp);
        }
        else {
          // sera pra el arreglo :,v
        }

      }



    }
    else if (element instanceof Declaracion){
      let dec = new Nodo_AST("Declaracion",null,[]);
      switch(element.Numero)
      {
          case 1:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST("=",dec,[]));
            hijo = this.ast(element.value);
            hijo.parent=dec;
            dec.children.push(hijo);
          break;
          case 2:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
          break;
          case 3:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.type.toString(),dec,[]));
            dec.children.push(new Nodo_AST("=",dec,[]));
            hijo = this.ast(element.value);
            hijo.parent=dec;
            dec.children.push(hijo);
          break;
          case 4:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            if(element.type.typeObjeto!=null){
              dec.children.push(new Nodo_AST(element.type.nombre,dec,[]));
            }else{
            dec.children.push(new Nodo_AST(element.type.toString(),dec,[]));}
          break;
          case 5:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.Identificador,dec,[]));
            hijo = this.ast(element.value);
            hijo.parent=dec;
            dec.children.push(hijo);
          break;
          case 6:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.Identificador,dec,[]));
          break;
          case 7:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.type.toString(),dec,[]));
          for (let x = 0; x < element.Arrays; x++) {
            dec.children.push(new Nodo_AST("[ ]",dec,[]));}
            dec.children.push(new Nodo_AST("=",dec,[]));
            element.valorArreglo.forEach(ele => {
              let hijo=this.ast(ele);
              if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
              dec.children.push(hijo);
            });
          break;

          case 8:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.type.toString(),dec,[]));
          for (let x = 0; x < element.Arrays; x++) {
            dec.children.push(new Nodo_AST("[ ]",dec,[]));}

          break;
          case 9:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.Identificador,dec,[]));
          for (let x = 0; x < element.Arrays; x++) {
            dec.children.push(new Nodo_AST("[ ]",dec,[]));}
            dec.children.push(new Nodo_AST("=",dec,[]));
            element.valorArreglo.forEach(ele => {
              let hijo=this.ast(ele);
              if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
              dec.children.push(hijo);
            });
          break;
          case 10:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.Identificador,dec,[]));
          break;
          case 11:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.type.toString(),dec,[]));
          for (let x = 0; x < element.Arrays; x++) {
            dec.children.push(new Nodo_AST("[ ]",dec,[]));}
            dec.children.push(new Nodo_AST("=",dec,[]));
            hijo = this.ast(element.value);
            hijo.parent=dec;
            dec.children.push(hijo);
          break;
          case 12:
            dec.children.push(new Nodo_AST(element.identifier,dec,[]));
            dec.children.push(new Nodo_AST(element.Identificador,dec,[]));
          for (let x = 0; x < element.Arrays; x++) {
            dec.children.push(new Nodo_AST("[ ]",dec,[]));}
            dec.children.push(new Nodo_AST("=",dec,[]));
            hijo = this.ast(element.value);
            hijo.parent=dec;
            dec.children.push(hijo);
          break;

      }
      dec.parent=padre;
      padre.children.push(dec);
    }
    else if (element instanceof declararLista)
    {
      padre.name = "ListaDeclaracion";
      if(element.tipoInicial){
      padre.children.push(new Nodo_AST("let",padre,[]));
      }else{ padre.children.push(new Nodo_AST("const",padre,[]));}
      element.ListaDeclaraciones.forEach(declaracion => {
        hijo=this.reporteInstruccion(declaracion);
        hijo.parent=padre;
        padre.children.push(hijo);

      });

    }
    else if (element instanceof IF){
      padre.name = "IF";
      hijo=this.ast(element.condicion);
      hijo.parent=padre;
      padre.children.push(hijo);
      if(element.ListaInstrucciones!=null){
        let hijo2=new Nodo_AST('Instrucciones',padre,[]);
        element.ListaInstrucciones.forEach(element2 => {
        hijo2.children.push(this.reporteInstruccion(element2));
        });
        hijo2.parent=padre;
        padre.children.push(hijo2);
// ahora los else ifs
        if(element.LIfElse!=null){
          let hijo3=new Nodo_AST('Bloque ElseIF',padre,[]);
          element.LIfElse.forEach(element3 => {
            let aux=this.reporteInstruccion(element3);
            aux.name="Else If";
            hijo3.children.push(aux);
          });
          hijo3.parent=padre;
          padre.children.push(hijo3);
        }
        if(element.ListaElse!=null)
        {
          let hijo4=new Nodo_AST('Bloque Else',padre,[]);
          element.ListaElse.forEach(element4 => {
            let aux=this.reporteInstruccion(element4);
            hijo4.children.push(aux);
          });
          hijo4.parent=padre;
          padre.children.push(hijo4);

        }

      }

    }
    else if (element instanceof While){
      padre.name="While";
      hijo=this.ast(element.exprecion);
      hijo.parent=padre;
      padre.children.push(hijo);
      let hijo2=new Nodo_AST("Instrucciones",padre,[]);
      if(element.Instruciones!==null){
        element.Instruciones.forEach(element => {
        let aux=this.reporteInstruccion(element);
        aux.parent=hijo2;
        hijo2.children.push(aux);
        });
        padre.children.push(hijo2);

      }

    }
    else if (element instanceof DoWhile){
      padre.name="Do While";

      let hijo2=new Nodo_AST("Instrucciones",padre,[]);
      if(element.Instruciones!==null){
        element.Instruciones.forEach(element => {
        let aux=this.reporteInstruccion(element);
        aux.parent=hijo2;
        hijo2.children.push(aux);
        });
        padre.children.push(hijo2);
        hijo=this.ast(element.exprecion);
      hijo.parent=padre;
      padre.children.push(hijo);

      }

    }
    else if (element instanceof Incremento){
      let exp = new Nodo_AST("Expresion",null,[]);
      if(element.TipoFuncion)
      {
        if(element.TipoPocicion)
        {
          exp.children.push(new Nodo_AST("++",exp,[]));
          exp.children.push(new Nodo_AST(element.id,exp,[]));
        }else {
          exp.children.push(new Nodo_AST(element.id,exp,[]));
          exp.children.push(new Nodo_AST("++",exp,[]));
        }
      }else {
        if(element.TipoPocicion)
        {
          exp.children.push(new Nodo_AST("--",exp,[]));
          exp.children.push(new Nodo_AST(element.id,exp,[]));
        }else {
          exp.children.push(new Nodo_AST(element.id,exp,[]));
          exp.children.push(new Nodo_AST("--",exp,[]));

      }
    }
    padre=exp;
    }
    else if (element instanceof For){
      padre.name="For";
      let aux=new Nodo_AST("Instruccion",padre,[]);

      hijo=this.reporteInstruccion(element.Instruccion);
      hijo.parent=aux;
      aux.children.push(hijo);
      padre.children.push(aux);
      let hijo2 =this.ast(element.Exprecion);
      padre.children.push(hijo2);
      let aux2=new Nodo_AST("Instruccion",padre,[]);
      hijo=this.reporteInstruccion(element.Incremento);
      hijo.parent=aux2;
      aux2.children.push(hijo);
      padre.children.push(aux2);
      if(element.Instrucciones!=null){
        let aux3=new Nodo_AST("Instrucciones",padre,[]);
        element.Instrucciones.forEach(element => {
           aux3.children.push(this.reporteInstruccion(element));


        });
       padre.children.push(aux3);
      }


    }
    else if (element instanceof Break){
      padre.name="Break";
    }
    else if (element instanceof Continue){
      padre.name="Continue";
    }
    else if (element instanceof Return){
      padre.name="Return";
      if(element.Exprecion!=null){
        hijo=this.ast(element.Exprecion);
        padre.children.push(hijo);
      }
    }
    else if (element instanceof Funcion){
      padre.name="Funcion";
      hijo=new Nodo_AST(element.id,padre,[]);
      padre.children.push(hijo);
      if(element.ListaDeclaraciones!=null){
        let aux=new Nodo_AST("Instrucciones",padre,[]);

        element.ListaDeclaraciones.forEach(element1 => {
          hijo=this.reporteInstruccion(element1);
          hijo.parent=aux;
          aux.children.push(hijo);
        });
        padre.children.push(aux);
      }
      if(element.TipoFuncion!=null){
        let aux=new Nodo_AST("Tipo",padre,[]);
        padre.children.push(aux);
        aux.children.push(new Nodo_AST(element.TipoFuncion.toString(),padre,[]));
      }
      if(element.ListaInstrucciones!=null){
        let aux=new Nodo_AST("Instrucciones",padre,[]);
        padre.children.push(aux);
        element.ListaInstrucciones.forEach(element2 => {
          let hijo2=this.reporteInstruccion(element2);
          aux.children.push(hijo2);
        });
      }
    }
    else if(element instanceof GraficarEntorno){
      padre.name="Graficar_Ts";

    }
    else if (element instanceof TypeDeclaracion){

      padre.name="TYPE";
      if(element.tipo){
        hijo=new Nodo_AST("let",padre,[]);
        padre.children.push(hijo);
      }else {
        hijo=new Nodo_AST("const",padre,[]);
        padre.children.push(hijo);
      }
      hijo=new Nodo_AST(element.id,padre,[]);
      padre.children.push(hijo);
      if(element.ListaDeclaraciones!=null){

        hijo=new Nodo_AST("ListaDeclaraciones",padre,[]);
        hijo.children.push(new Nodo_AST("{",hijo,[]));
        element.ListaDeclaraciones.forEach(element1 => {
                  let aux=this.reporteInstruccion(element1);
                  hijo.children.push(aux);
        });
        hijo.children.push(new Nodo_AST("}",hijo,[]));
        padre.children.push(hijo);
      }

    }
    else if (element instanceof DeclararType){
        padre.name="Declaracion";
        if(element.tipo){
          hijo=new Nodo_AST("let",padre,[]);
          padre.children.push(hijo);
        }else {
          hijo=new Nodo_AST("const",padre,[]);
          padre.children.push(hijo);
        }
        hijo=new Nodo_AST(element.identificador,padre,[]);
        padre.children.push(hijo);
        hijo=new Nodo_AST(element.tipo,padre,[]);
        padre.children.push(hijo);
        hijo=new Nodo_AST("=",padre,[]);
        padre.children.push(hijo);
        if(element.listaAsignaciones!=null){
          hijo=new Nodo_AST("ListaDeclaraciones",padre,[]);
          padre.children.push(hijo);
         let aux=new Nodo_AST("{",hijo,[]);
         hijo.children.push(aux);
          element.listaAsignaciones.forEach(element1 => {
            let data=new Nodo_AST("Asignacion",hijo,[]);
            hijo.children.push(data);
           let hijo1=new Nodo_AST(element1.identificador,data,[]);
           data.children.push(hijo1);
           data.children.push(new Nodo_AST(":",data,[]));
            hijo1=this.ast(element1.exprecion);
            data.children.push(hijo1);
          });
          let aux1=new Nodo_AST("}",hijo,[]);
          hijo.children.push(aux1);
        }


    }
    else if (element instanceof ListaIdentificado){
      padre.name="Lista ID";
      element.linstaID.forEach(element1 => {
        if(element1.Listaexprecion==null){
          let aux=new Nodo_AST("ID",padre,[]);
          aux.children.push(new Nodo_AST(element1.identificador,aux,[]));
          padre.children.push(aux);
        }else {
          // aca estara el array
        }
      });
      let abuelo=new Nodo_AST("Referencias",null,[]);
      abuelo.children.push(padre);
      abuelo.children.push(new Nodo_AST("=",abuelo,[]));
      abuelo.children.push(this.ast(element.Expresion));
      return abuelo;
    }
    else if (element instanceof Switch){
    padre.name="Switch";
    hijo=this.ast(element.expression);

    padre.children.push(new Nodo_AST("Expresion",padre,[hijo]));
    let hijo2=new Nodo_AST("Lista Case",padre,[]);
    if(element.ListaInstrucciones!=null){
      element.ListaInstrucciones.forEach(element1 => {
        if(element1.expression!=null){
          let aux=new Nodo_AST("Case",hijo2,[]);
          aux.children.push(this.ast(element1.expression));
          if(element1.ListaInstrucciones!=null){
            element1.ListaInstrucciones.forEach(element2 => {
              aux.children.push(this.reporteInstruccion(element2));
            });
          }
          hijo2.children.push(aux);
        }else{
          let aux=new Nodo_AST("Default",hijo2,[]);
           if(element1.ListaInstrucciones!=null){
            element1.ListaInstrucciones.forEach(element2 => {
              aux.children.push(this.reporteInstruccion(element2));

            });
          }
          hijo2.children.push(aux);
        }
     });
    }
    padre.children.push(hijo2);
    }else if (element instanceof ForIn){
      padre.name="For In";
      if(element.Instruccion instanceof Declaracion){hijo=new Nodo_AST("Declaracion",padre,[new Nodo_AST(element.Instruccion.TipoInicial ? "let":"const",hijo,[]),new Nodo_AST(element.Instruccion.identifier,hijo,[])]);}
      else {hijo=new Nodo_AST("Expresion",padre,[new Nodo_AST(element.identificador,hijo,[])]);}
      padre.children.push(hijo);
      padre.children.push(new Nodo_AST("in",padre,[]));
      padre.children.push(new Nodo_AST("Expresion",padre,[this.ast(element.Exprecion)]));
      if(element.listaInstrucciones!=null){
        let aux3=new Nodo_AST("Instrucciones",padre,[]);
        element.listaInstrucciones.forEach(element1 => {
           aux3.children.push(this.reporteInstruccion(element1));
        });
       padre.children.push(aux3);
      }
    }
    else if (element instanceof ForOF){
      padre.name="For In";
      if(element.Instruccion instanceof Declaracion){hijo=new Nodo_AST("Declaracion",padre,[new Nodo_AST(element.Instruccion.TipoInicial ? "let":"const",hijo,[]),new Nodo_AST(element.Instruccion.identifier,hijo,[])]);}
      else {hijo=new Nodo_AST("Expresion",padre,[new Nodo_AST(element.identificador,hijo,[])]);}
      padre.children.push(hijo);
      padre.children.push(new Nodo_AST("of",padre,[]));
      padre.children.push(new Nodo_AST("Expresion",padre,[this.ast(element.Exprecion)]));
      if(element.listaInstrucciones!=null){
        let aux3=new Nodo_AST("Instrucciones",padre,[]);
        element.listaInstrucciones.forEach(element1 => {
           aux3.children.push(this.reporteInstruccion(element1));
        });
       padre.children.push(aux3);
      }
    }else if (element instanceof FuncionEjecutar){

      let hijo: Nodo_AST;
      padre.name="Funcion Ejetutar";
      hijo=new Nodo_AST(element.id,padre,[]);
      if(element.ListaExpreciones!=null){
        let hijo2=new Nodo_AST("Expresion",padre,[]);
        element.ListaExpreciones.forEach(element1 => {
          let aux=this.ast(element1);
          hijo2.children.push(aux);
        });
        padre.children.push(hijo2); }
    }else if (element instanceof ArrayPop){
      padre.name="Array pop"
      padre.children.push(new Nodo_AST(element.id,null,[]));
      if(element.value!==null){
        element.value.forEach(ele => {

          let hijo=this.ast(ele);
          if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
          padre.children.push(hijo);
        });
      }
      padre.children.push(new Nodo_AST(". pop()",null,[]))
    }else if (element instanceof ArraPush){
      padre.name="Array push"
      padre.children.push(new Nodo_AST(element.id,null,[]));
      if(element.value!==null){
        element.value.forEach(ele => {

          let hijo=this.ast(ele);
          if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
          padre.children.push(hijo);
        });
      }
      let hijo1=new Nodo_AST(". push",null,[]);
      hijo1.children.push(this.ast((element.expresion)));
      padre.children.push(hijo1);
    }else if (element instanceof ArrayInstruccion){
      padre.name="Asignar"

      padre.children.push(new Nodo_AST(element.iden,null,[]));
      if(element.listaArrays!==null){
        element.listaArrays.forEach(ele => {
          let hijo=this.ast(ele);
          if(hijo instanceof Nodo_AST){hijo.name="["+hijo.name+"]"}
          padre.children.push(hijo);
        });

      }

      let hijo1=new Nodo_AST("=",null,[]);

     // hijo1.children.push(this.ast((element.expresion)));
      padre.children.push(hijo1);
      if(element.expresion!==null){
        padre.children.push(this.ast(element.expresion));
      }
      else{
        let  valor=new Nodo_AST("Lista Dimenciones",null,[]);
        if(element.listaExpreciones.length===0){
          valor.children.push(new Nodo_AST("[ ]",null,[]))
        }else{
          valor.children.push(new Nodo_AST("[",null,[]))
        element.listaExpreciones.forEach(dato => {

        valor.children.push((this.ast(dato)))

        });
        valor.children.push(new Nodo_AST("]",null,[]))
      }
      padre.children.push(valor)
    }

    }

    return padre;

}
graficarEntornos(){
let dato=this.tabla.getVariable("GraficarEntornosJuanito44");
if(dato==null){
  alert("No hay ninguna funcion graficar_ts en el archivo de entrada");
}
else {
  PdfMakeWrapper.setFonts(pdfFonts);
  const pdf = new PdfMakeWrapper();
  let titulo="Tabla De Simbolos";

let tituloPDF=new Txt(titulo).alignment('center').end;
pdf.add(tituloPDF);
pdf.add("\n");




  if(dato.value instanceof Tabla){

    let tablas=dato.value;
    let tabla1=new Table([ [ 'Entorno Actual']]).widths([ 537]).alignment('center').end;     pdf.add(tabla1);
    let booleano=false;
    while(tablas!==null){
      if(tablas.Previous==null){
        let tabla1=new Table([ [ 'Entorno Global']]).widths([ 537]).alignment('center').end;     pdf.add(tabla1);
      }    else if(booleano) {let tabla1=new Table([ [ 'Entorno Anterior']]).widths([ 537]).alignment('center').end;     pdf.add(tabla1);}
      booleano=true;
      let tabla=new Table([ [ 'Valor Inicial','Tipo','Identificador','puntero stack']]).widths([ 110, 130 ,150,120]).alignment('center').end;
      pdf.add(tabla);
      tablas.Variables.forEach(element => {
        let val1="";
      if(element.valorInicial){
      val1="let";
      }
      else{
      val1="const";
      }
        if(element.identifier=="GraficarEntornosJuanito44"){}
      else{


        if(element.DemencionesArray>0){
        //  console.log("holaaaaaaaaaa")
        let tipos="";
        if(element.type.typeArray===types.TYPE){
          tipos="Arreglo -> "+element.type.nombre;
        //  let tabla2=new Table([ [ val1,"Arreglo -> "+element.type.nombre,element.identifier,element.value]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);
        }else {
        //  console.log(element.value)
          let tipo:Type=new Type(element.type.typeArray);

          let datoss=""+tipo.toString();
          //console.log(datoss)
          tipos="Arreglo -> "+datoss;
         // let tabla2=new Table([ [ val1,"Arreglo -> "+typ,element.identifier,element.value]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);
        }
        let aux2=element.value
        if(aux2 instanceof Array){
          if(aux2.length===0){let tabla2=new Table([ [ val1,tipos,element.identifier,"[]"]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);}
          else{
            let aux10="";
            aux2.forEach(valores => {
            //  console.log(valores)
              if(valores instanceof DeclararArray){}
                   aux10=aux10+valores.valor+" ";
            });
            let tabla2=new Table([ [ val1,tipos,element.identifier,"["+aux10+"]"]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);

          }
        }

        }


        else  if(element.entornoFuncion!==null||element.FuncionListaId.length>0||element.FuncionInstrucciones.length>0){
         let dato= element.type.toString();
          if(element.type.type==types.OBJET){
           if(element.type.typeObjeto==types.ARRAY){
             if(element.type.typeArray===types.TYPE){
              // console.log(element)
             dato="Arreglo-> "+element.type.nombre;console.log(element)
             }else{    dato="Arreglo ";console.log(element)}

            }
           if(element.type.typeObjeto==types.TYPE){dato="TYPE -> "+element.type.nombre;}}
           // tslint:disable-next-line: max-line-length
          let tabla2=new Table([ [ val1,"Funcion -> "+dato,element.identifier,"---"]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);
         }

       else if(element.type.type==types.OBJET){
          let tipoo="";
          if(element.type.typeObjeto==types.ARRAY){tipoo="Arreglo";element.value="---"}
          if(element.type.typeObjeto==types.TYPE){tipoo="TYPE";element.value="---"}
          let tabla2=new Table([ [ val1,tipoo+" -> "+element.type.nombre,element.identifier,element.value]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);
        }

        else{

          if(element.type.type===types.TYPE)
          {
            let datos=this.valorTypes(element.value);
            element.value=datos;
          }
          let tabla2=new Table([ [ val1,element.type.toString(),element.identifier,element.value]]).widths([ 110, 130 ,150,120]).alignment('center').end;    pdf.add(tabla2);}
      }

      });


      pdf.add("\n");
      pdf.add("\n");



    tablas=tablas.Previous;
    }

  }
  pdf.create().open();
}

}
copyInputMessage(){


  if(confirm("desea copiar el texto ?")){
    this.textoEntrada= this.textoSalida
      alert("Texto Copiado");
  }

}
valorTypes(aux:any)
{
  if(aux===null){return "---";}
  if(aux instanceof Tabla){


    let data:string="{";
   // for(let x=0;x<value.Variables.size;x++){ value.Variables.keys}
   let contador=0;
    aux.Variables.forEach(element => {
      contador++;
      data=data+"\""+element.identifier+"\": "+element.value;
      if(contador<aux.Variables.size){
        data=data+", ";}
    });
    data=data+"}"

     return data;
  }else {return "---"}

}


}
