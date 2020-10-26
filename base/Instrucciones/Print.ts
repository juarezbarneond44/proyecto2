import { Arithmetic } from './../Expresiones/Arithmetic';
import { Primitive } from './../Expresiones/Primitive';
import { DeclararArray } from './DeclararArray';
import { StringEspecial } from './../Expresiones/StringEspecial';
import { Exceptionn } from './../utilidad/Exceptionn';
import { Tabla } from './../Simbols/Tabla';

import {Node} from "../Abstract/Node";

import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
/**
 * Permite imprimir expresiones en la consola
 */
export class Print extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let data="";
    if(this.expression!==null){

      if(this.expression.length===1)
      {  tree.codigo3d.push("//***print****")

        data=this.expression[0].codigo3direcciones(tabla,tree);
        if(this.expression[0].type===null){return null}
        if(this.expression[0].type.type==types.STRING)
        {
          tree.codigo3d.push("t0="+data+";");
          tree.codigo3d.push("imprimirString();");
          tree.codigo3d.push("printf(\"%c\",10);");
        return null


            if(this.expression[0] instanceof Primitive)
              {
               // let aux:string=this.expression[0].codigo3direcciones(tabla,tree);
               let aux:string=""+data;
                for (const iterator of aux)
                 {
                   tree.codigo3d.push("//agregamos el string al heap");
                   tree.codigo3d.push("t0=p;");

                   tree.codigo3d.push("t1="+iterator.charCodeAt(0)+";");
                   tree.codigo3d.push("guardarString();");
                 }
                 tree.codigo3d.push("t0=p;");
                 tree.codigo3d.push("t1=-1;");
                 tree.codigo3d.push("guardarString();");
                 //tree.codigo3d.push("t0=p-"+data.length+";");
                 //tree.codigo3d.push("imprimirString();");
                 const contador=tree.getContador();
                 tree.codigo3d.push("t"+contador+"=p-"+(aux.length+1)+";");
                 data= "t"+contador;
                // tree.codigo3d.push("printf(\"%c\",10);");

            }
            else if (this.expression[0] instanceof Arithmetic)
            {
              tree.codigo3d.push("t0="+data+";");
              tree.codigo3d.push("imprimirString();");
              tree.codigo3d.push("printf(\"%c\",10);");
            return null
            }

              tree.codigo3d.push("t0="+data+";");
              tree.codigo3d.push("imprimirString();");
              tree.codigo3d.push("printf(\"%c\",10);");

            // variable
        }
       else if(this.expression[0].type.type==types.NUMERIC)
       {

       tree.codigo3d.push("printf(\"%f\","+data+");");
       tree.codigo3d.push("printf(\"%c\",10);");

       }
       else if(this.expression[0].type.type==types.BOOLEAN)
       {
        let etiquetaV=tree.getEtiqueta();
        let etiquetaF=tree.getEtiqueta();
        let etiquetaS=tree.getEtiqueta();
       tree.codigo3d.push(`if(${data}==1) goto L${etiquetaV};`);
       tree.codigo3d.push(`goto L${etiquetaF};`);
       tree.codigo3d.push(`L${etiquetaV}:`);
       tree.codigo3d.push("printf(\"%c\",116);");
       tree.codigo3d.push("printf(\"%c\",114);");
       tree.codigo3d.push("printf(\"%c\",117);");
       tree.codigo3d.push("printf(\"%c\",101);");
       tree.codigo3d.push(`goto L${etiquetaS};`);
       tree.codigo3d.push(`L${etiquetaF}:`);
       tree.codigo3d.push("printf(\"%c\",102);");
       tree.codigo3d.push("printf(\"%c\",97);");
       tree.codigo3d.push("printf(\"%c\",108);");
       tree.codigo3d.push("printf(\"%c\",115);");
       tree.codigo3d.push("printf(\"%c\",101);");
       tree.codigo3d.push(`L${etiquetaS}:`);
       tree.codigo3d.push("printf(\"%c\",10);");
       }else
       {

       }



      }else
      {
        for (let x =this.expression.length-1; x >-1; x--) {
          data=data+this.expression[x].codigo3direcciones(tabla,tree);
          if(x-1>-1){data=data+",";}
        }

        tree.codigo3d.push("printf(\"%f\","+data+");");
      }



    }
  }
  Traducir(Tabla: Tabla, tree: Tree) {
   let data="";
   if(this.expression!==null){
    for (let x =this.expression.length-1; x >-1; x--) {
      data=data+this.expression[x].Traducir(Tabla,tree);
      if(x-1>-1){data=data+",";}
     }
     tree.Traduccion.push("console.log("+data+");");




   }

    return null;
  }
    expression :Array <Node>;
    /**
     * @constructor Retorna el objeto Print
     * @param expression Expresion que se va a mostrar en consola
     * @param line Fila de donde se creo la sentencia
     * @param column Columna donde se creo la sentencia
     */
    listaDEString:Array<any>;
    constructor( expression :Array <Node>, line: number, column: number){
        super(new Type(types.VOID), line, column);
        this.expression = expression;
        this.listaDEString=new Array();
    }
      lista(Tabla1: Tabla, tree: Tree,expression:Node,contador:number)
      {

        const value = expression.execute(Tabla1, tree);


        if(expression.type==null){
          const error = new Exceptionn('Semantico',
      `el tipo de la expresion es nullo`,
      this.line, this.column);
             tree.excepciones.push(error);
          return null}
          if(value==null){this.listaDEString.push("undefined"); return null;}

        if(value instanceof Tabla){

            let data:string="{";
           // for(let x=0;x<value.Variables.size;x++){ value.Variables.keys}
           let contador=0;
            value.Variables.forEach(element => {
              contador++;
              data=data+"\""+element.identifier+"\": "+element.value;
              if(contador<value.Variables.size){
                data=data+", ";}
            });
            data=data+"}"
            this.listaDEString.push(data);
             return null;
          }
          if(value instanceof Array){
            let valor="[";

            //console.log(value);

            // a hacer el metodo de los arreglos para que se pueda imprimir bien

              for (let x = 0; x < value.length; x++) {
                const dato = value[x];
                valor=valor+dato.valor;
                if(x+1<value.length){
                  valor=valor+", ";

                }
              }
            valor=valor+"]";
            this.listaDEString.push(valor);
            return null
          }

     if(expression.type.type===types.OBJET&&expression.type.typeObjeto===types.ARRAY){
        // metodo para imprimir el arreglo alv

        let data=this.arreglos(value,Tabla1,tree);
        this.listaDEString.push(data);
        return null
     }
      if (!(value.valor === "Exception")) {
            if (expression.type.type==types.STRING){
              let data="";
              let esstring=true;
               if (value instanceof StringEspecial){
                data=value.valorString;
                esstring=false;

              }
              if(esstring){ data=value+"";}

               for (let x = 0; x < 20; x++) {
            data= data.replace("\\r","\r");
            data= data.replace("\\\"","\"");
            data=  data.replace("\\n","\n");
            data=data.replace("\\t","\t");
            data=  data.replace("\\\\","\\");
           }
           this.listaDEString.push(data);
           return null;
          }
          this.listaDEString.push(value);
          }

      }
    execute(Tabla1: Tabla, tree: Tree): any {
     // console.log(this.expression)
      if(this.expression!==null){
        for (let x = 0; x < this.expression.length; x++) {
          this.lista(Tabla1,tree,this.expression[x],x);}

          let data="";
          for (let x = this.listaDEString.length-1; x >-1 ; x--) {
            data=data+" "+this.listaDEString[x];
             }
             this.listaDEString=new Array();
             if(data!=="error"){
             tree.console.push(data);}
      }

      return null;
    }
    arreglos(nodo:Array<any>,tabla,tree)
    {
    //  console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
     // console.log(nodo)
      let dato="["
      for (let x = 0; x < nodo.length; x++) {
      const aux2 = nodo[x];
      if(aux2 instanceof Array)
        {
        dato=dato+  this.arreglos(aux2,tabla,tree);

        }
        else{
         if(aux2 instanceof Node){
          let dato2= aux2.execute(tabla,tree);
          if(dato2 instanceof Exceptionn){

            return "error"

          }
          else if(dato2 instanceof Tabla)
          {


              let data5:string="{";
             // for(let x=0;x<value.Variables.size;x++){ value.Variables.keys}
             let contador=0;
              dato2.Variables.forEach(element => {
                contador++;
                data5=data5+"\""+element.identifier+"\": "+element.value;
                if(contador<dato2.Variables.size){
                  data5=data5+", ";}
              });
              data5=data5+"}";
              dato=dato+data5;
          }

          else{    dato=dato+dato2;}


          if(x+1<nodo.length){
          dato=dato+",";
          }
          }
           else if (aux2 instanceof DeclararArray){

            // aqui se hace lo de arreglos pero sera todo con recursividad :v

              dato=dato+aux2.valor;
              console.log(aux2.valor)
              if(x+1<nodo.length){
                dato=dato+",";
                }


          }
          else{

            dato=dato+aux2
            if(x+1<nodo.length){
              dato=dato+",";
              }
          }

         }

      }

          dato=dato+"]";
          return dato;
    }
}

