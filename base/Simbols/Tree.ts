import { Type } from '../utilidad/Type';
import {Node} from "../Abstract/Node";
import {Exceptionn} from "../utilidad/Exceptionn";
/**
 * @class Almacena el ast y ademas la lista de excepciones
 */
export class Tree {

    instructions: Array<Node>;
    excepciones: Array<Exceptionn>;
    console: Array<String>;
    Traduccion: Array<String>;
    codigo3d: Array<String>;
    Encabezadocodigo3d: Array<String>;
    pila: Array<Type>;
    contador:number;
    etiquetas:number;
    contadorP:number;
    contadorS:number;


    /**
     * Retorna un arbol con 2 atributos: 1 ast y 1 lista de excepciones
     * @param instructions AST generado por la gramatica
     */
    constructor(instructions: Array<Node>,excepciones: Array<Exceptionn>) {
        this.instructions = instructions;
        this.excepciones = excepciones;
        this.console = new Array<String>();
        this.Traduccion = new Array<String>();
        this.codigo3d = new Array<String>();
        this.Encabezadocodigo3d= new Array<String>();
       // this.codigo3d.push("#include <stdio.h>");
       // this.codigo3d.push("float heap[16384];");
       // this.codigo3d.push("float stack[16394];");
       // this.codigo3d.push("float p;");
       // this.codigo3d.push("float h;");
        // el metodo main

       // this.Encabezadocodigo3d.push("#include <stdio.h>");
        this.Encabezadocodigo3d.push("double heap[16384];");
        this.Encabezadocodigo3d.push("double stack[16394];");
        this.Encabezadocodigo3d.push("double p;");
        this.Encabezadocodigo3d.push("double s;");

        this.Encabezadocodigo3d.push("void potencia(){");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L0:");
        this.Encabezadocodigo3d.push("if(t1>0)goto L1;");
        this.Encabezadocodigo3d.push("goto L2;");
        this.Encabezadocodigo3d.push("L1:");
        this.Encabezadocodigo3d.push("t2=t2*t0;");
        this.Encabezadocodigo3d.push("t1=t1-1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
        // lafuncion imprimir
        this.Encabezadocodigo3d.push("void imprimirString(){");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L0:");
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
        this.Encabezadocodigo3d.push("if(t1!=-1)goto L1;");
        this.Encabezadocodigo3d.push("goto L2;");
        this.Encabezadocodigo3d.push("L1:");
        this.Encabezadocodigo3d.push("if(t1==-2)goto L3;");
        this.Encabezadocodigo3d.push("if(t1==-3)goto L4;");
        this.Encabezadocodigo3d.push("printf(\"%c\",(int)t1);");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L3:");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
        this.Encabezadocodigo3d.push("printf(\"%f\",t1);");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L4:");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
        this.Encabezadocodigo3d.push("if(t1==1) goto L5;");
        this.Encabezadocodigo3d.push("goto L6;");
        this.Encabezadocodigo3d.push("L5:");
        this.Encabezadocodigo3d.push("printf(\"%c\",116);");
        this.Encabezadocodigo3d.push("printf(\"%c\",114);");
        this.Encabezadocodigo3d.push("printf(\"%c\",117);");
        this.Encabezadocodigo3d.push("printf(\"%c\",101);");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L6:");
        this.Encabezadocodigo3d.push("printf(\"%c\",102);");
        this.Encabezadocodigo3d.push("printf(\"%c\",97);");
        this.Encabezadocodigo3d.push("printf(\"%c\",108);");
        this.Encabezadocodigo3d.push("printf(\"%c\",115);");
        this.Encabezadocodigo3d.push("printf(\"%c\",101);");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
        // metodo guardar en hepp el string
        this.Encabezadocodigo3d.push("void guardarString(){");
        this.Encabezadocodigo3d.push("heap[(int)t0]=t1;");
        this.Encabezadocodigo3d.push("p=p+1;");
       this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
        // concatenarString
        this.Encabezadocodigo3d.push("void concatenarString(){");
        this.Encabezadocodigo3d.push("L0:");// el valor del caracter
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");// el valor del caracter
        this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
       this.Encabezadocodigo3d.push("goto L2;");
        this.Encabezadocodigo3d.push("L1:");
        this.Encabezadocodigo3d.push("heap[(int)p]=t1;");
        this.Encabezadocodigo3d.push("p=p+1;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("return;");
          this.Encabezadocodigo3d.push("}");




// aqui vendrian mas funciones nativas
        this.Encabezadocodigo3d.push("void main(){");


        this.pila=new Array<Type>();
        this.contador=3;
        this.etiquetas=5;
        this.contadorP=0;
        this.contadorS=0;

    }
    getEtiqueta()
    {

      return this.etiquetas++;
    }
    getContador()
    {

      return this.contador++;
    }
    getSTACK()
    {

      return this.contadorS++;
    }
}
