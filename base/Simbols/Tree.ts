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
    etiquetasS: Array<string>;
    contador:number;
    etiquetas:number;
    contadorP:number;
    contadorS:number;
    punteroReturn:string;
    etiquetaReturn: Array<string>;

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
        this.etiquetaReturn= new Array<string>();

       // this.codigo3d.push("#include <stdio.h>");
       // this.codigo3d.push("float heap[16384];");
       // this.codigo3d.push("float stack[16394];");
       // this.codigo3d.push("float p;");
       // this.codigo3d.push("float h;");
        // el metodo main

       // this.Encabezadocodigo3d.push("#include <stdio.h>");
        this.Encabezadocodigo3d.push("double heap[56384];");
        this.Encabezadocodigo3d.push("double stack[56394];");
        this.Encabezadocodigo3d.push("char Numero[500];");

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
        this.Encabezadocodigo3d.push("printf(\"%c\",(int)t1);");
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
              // numero a string
      this.Encabezadocodigo3d.push("void NumberToString(){");
      this.Encabezadocodigo3d.push('snprintf(Numero, 500, "%f", t2);');
      this.Encabezadocodigo3d.push("t3=0;");
      this.Encabezadocodigo3d.push("t6=0;");
      this.Encabezadocodigo3d.push("L0:");
      this.Encabezadocodigo3d.push("t4=Numero[(int)t3];");
      this.Encabezadocodigo3d.push("if(t4==0) goto L1;");
      this.Encabezadocodigo3d.push("if(t4==46) goto L2;"); // si es un punto
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=t4;");
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t3=t3+1;");
      this.Encabezadocodigo3d.push("t6=t6+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L2:"); // aqui son los decimales
      this.Encabezadocodigo3d.push("t5=t3;");
      this.Encabezadocodigo3d.push("L3:");
      this.Encabezadocodigo3d.push("t3=t3+1;");
      this.Encabezadocodigo3d.push("t4=Numero[(int)t3];");
      this.Encabezadocodigo3d.push("if(t4==48)goto L3;");
      this.Encabezadocodigo3d.push("if(t4==0)goto L4;");
      this.Encabezadocodigo3d.push("goto L2;");
      this.Encabezadocodigo3d.push("L4:");
      this.Encabezadocodigo3d.push("if(t5>t6)goto L5;");
      this.Encabezadocodigo3d.push("goto L1;");
      this.Encabezadocodigo3d.push("L5:");
      this.Encabezadocodigo3d.push("t4=Numero[(int)t6];");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=t4;");
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t6=t6+1;");
      this.Encabezadocodigo3d.push("if(t5<t6)goto L1;");
      this.Encabezadocodigo3d.push("if(t5>=t6)goto L5;");
      this.Encabezadocodigo3d.push("L1:");
      this.Encabezadocodigo3d.push("return;");
      this.Encabezadocodigo3d.push("}");
      // bool a string
      this.Encabezadocodigo3d.push("void BooleanToString(){");
      this.Encabezadocodigo3d.push('snprintf(Numero, 500, "%f", t2);');
      this.Encabezadocodigo3d.push("t3=0;");
      this.Encabezadocodigo3d.push("L0:");
      this.Encabezadocodigo3d.push("t4=Numero[(int)t3];");
      this.Encabezadocodigo3d.push("if(t4==49) goto L1;"); // 49 es 1
      this.Encabezadocodigo3d.push("goto L2;");
      this.Encabezadocodigo3d.push("L1:"); // imprimir true
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=116;"); //t
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=114;"); //r
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=117;"); //u
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=101;"); //e
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("goto L3;");
      this.Encabezadocodigo3d.push("L2:"); // imprimir false
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=102;");  //f
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=97;"); //a
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=108;"); //l
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=115;"); //s
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("t0=p;");
      this.Encabezadocodigo3d.push("t1=101;"); //e
      this.Encabezadocodigo3d.push("guardarString();");
      this.Encabezadocodigo3d.push("L3:");
      this.Encabezadocodigo3d.push("return;");
      this.Encabezadocodigo3d.push("}");

        // concatenarString
        this.Encabezadocodigo3d.push("void concatenarString(){");
        this.Encabezadocodigo3d.push("L0:");// el valor del caracter
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");// el valor del caracter
        this.Encabezadocodigo3d.push("if(t1==0) goto L3;");
        this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
        this.Encabezadocodigo3d.push("goto L2;");
        this.Encabezadocodigo3d.push("L1:");
        this.Encabezadocodigo3d.push("heap[(int)p]=t1;");
        this.Encabezadocodigo3d.push("p=p+1;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L3:");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
        // cantidadString
        this.Encabezadocodigo3d.push("void tamanioString(){");
        this.Encabezadocodigo3d.push("t4=0;");
        this.Encabezadocodigo3d.push("L0:");
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
        this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
        this.Encabezadocodigo3d.push("goto L2;");
        this.Encabezadocodigo3d.push("L1:");
        this.Encabezadocodigo3d.push("if(t1==-2) goto L3;");
        this.Encabezadocodigo3d.push("if(t1==-3) goto L3;");
        this.Encabezadocodigo3d.push("t4=t4+1;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L3:");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
        this.Encabezadocodigo3d.push("if(t1<0)goto L4;");
        this.Encabezadocodigo3d.push("t4=t4+1;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L4:");
        this.Encabezadocodigo3d.push("t4=t4+2;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
        // comparar string
        this.Encabezadocodigo3d.push("void compararString(){");
        this.Encabezadocodigo3d.push("L0:");
        this.Encabezadocodigo3d.push("t2=heap[(int)t0];");
        this.Encabezadocodigo3d.push("t3=heap[(int)t1];");
        this.Encabezadocodigo3d.push("if(t2!=t3)goto L2;");
        this.Encabezadocodigo3d.push("if(t2==-1) goto L3;");
        this.Encabezadocodigo3d.push("t0=t0+1;");
        this.Encabezadocodigo3d.push("t1=t1+1;");
        this.Encabezadocodigo3d.push("goto L0;");
        this.Encabezadocodigo3d.push("L2:");
        this.Encabezadocodigo3d.push("t4=0;");
        this.Encabezadocodigo3d.push("goto L5;");
        this.Encabezadocodigo3d.push("L3:");
        this.Encabezadocodigo3d.push("t4=1;");
        this.Encabezadocodigo3d.push("L5:");
        this.Encabezadocodigo3d.push("return;");
        this.Encabezadocodigo3d.push("}");
      // charat
      this.Encabezadocodigo3d.push("void CharAt(){");
      this.Encabezadocodigo3d.push("t5=0;");
      this.Encabezadocodigo3d.push("t4=-1;"); // contador
      this.Encabezadocodigo3d.push("L0:");
      this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
      this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
      this.Encabezadocodigo3d.push("goto L2;");
      this.Encabezadocodigo3d.push("L1:");
      this.Encabezadocodigo3d.push("if(t1==-2) goto L3;");
      this.Encabezadocodigo3d.push("if(t1==-3) goto L3;");
      this.Encabezadocodigo3d.push("t4=t4+1;");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("if(t3==t4) goto L10;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L3:");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
      this.Encabezadocodigo3d.push("if(t1<0)goto L4;");
      this.Encabezadocodigo3d.push("t4=t4+1;");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L4:");
      this.Encabezadocodigo3d.push("t4=t4+2;");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L10:");
      this.Encabezadocodigo3d.push("t5=1;");
      this.Encabezadocodigo3d.push("L2:");
      this.Encabezadocodigo3d.push("return;");
      this.Encabezadocodigo3d.push("}");
      // toLowerCase
      this.Encabezadocodigo3d.push("void toLowerCase(){");

      this.Encabezadocodigo3d.push("L0:");
      this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
      this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
      this.Encabezadocodigo3d.push("goto L2;");// salida
      this.Encabezadocodigo3d.push("L1:");
      this.Encabezadocodigo3d.push("if(t1<91)goto L3;");
      this.Encabezadocodigo3d.push("goto L10;");
      this.Encabezadocodigo3d.push("L3:");
      this.Encabezadocodigo3d.push("if(t1>64)goto L4;");
      this.Encabezadocodigo3d.push("goto L10;");
      this.Encabezadocodigo3d.push("L4:");
      this.Encabezadocodigo3d.push("t2=t1+32;");
      this.Encabezadocodigo3d.push("heap[(int)t0]=t2;");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L10:");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L2:");
      this.Encabezadocodigo3d.push("return;");
      this.Encabezadocodigo3d.push("}");
      //toUpperCase
      this.Encabezadocodigo3d.push("void toUpperCase(){");

      this.Encabezadocodigo3d.push("L0:");
      this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
      this.Encabezadocodigo3d.push("if(t1!=-1) goto L1;");
      this.Encabezadocodigo3d.push("goto L2;");// salida
      this.Encabezadocodigo3d.push("L1:");
      this.Encabezadocodigo3d.push("if(t1<123)goto L3;");
      this.Encabezadocodigo3d.push("goto L10;");
      this.Encabezadocodigo3d.push("L3:");
      this.Encabezadocodigo3d.push("if(t1>96)goto L4;");
      this.Encabezadocodigo3d.push("goto L10;");
      this.Encabezadocodigo3d.push("L4:");
      this.Encabezadocodigo3d.push("t2=t1-32;");
      this.Encabezadocodigo3d.push("heap[(int)t0]=t2;");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L10:");
      this.Encabezadocodigo3d.push("t0=t0+1;");
      this.Encabezadocodigo3d.push("goto L0;");
      this.Encabezadocodigo3d.push("L2:");
      this.Encabezadocodigo3d.push("return;");
      this.Encabezadocodigo3d.push("}");
 //imprimir Arreglo
 this.Encabezadocodigo3d.push("void PrintArreglo(){");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("if(t1==240)goto L0;");
 this.Encabezadocodigo3d.push("// 240 es un numero para ver si el arreglo tiene VALORES");
 this.Encabezadocodigo3d.push("if(t1==241)goto L4;");
 this.Encabezadocodigo3d.push("// 241 es un numero donde muestra la posicion de otro arreglo");
 this.Encabezadocodigo3d.push("if(t1==242)goto L5;");
 this.Encabezadocodigo3d.push("// 242 es un numero donde muestra la posicion de otro arreglo");
 this.Encabezadocodigo3d.push("L0:");
 this.Encabezadocodigo3d.push("t0=t0+2;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==239)goto L1;");
 this.Encabezadocodigo3d.push("if(t1==238)goto L2;");
 this.Encabezadocodigo3d.push("if(t1==237)goto L3;");
 this.Encabezadocodigo3d.push("L1:");// es un string
 this.Encabezadocodigo3d.push("t0=t0+1;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("if(t1==-2)goto L1;");
 this.Encabezadocodigo3d.push("t2=t0;");
 this.Encabezadocodigo3d.push("t0=heap[(int)t0];");
 this.Encabezadocodigo3d.push("imprimirString();");
 this.Encabezadocodigo3d.push("printf(\"%c\",32);");
 this.Encabezadocodigo3d.push("t0=t2;");
 this.Encabezadocodigo3d.push("goto L1;");
 this.Encabezadocodigo3d.push("L2:"); // es un numero
 this.Encabezadocodigo3d.push("t0=t0+1;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("if(t1==-2)goto L2;");
 this.Encabezadocodigo3d.push("t8=t0;");
 this.Encabezadocodigo3d.push("t0=heap[(int)t0];");// usar t7
 this.Encabezadocodigo3d.push("t7=p;");
 this.Encabezadocodigo3d.push("t2=t0;");
 this.Encabezadocodigo3d.push("NumberToString();");
 this.Encabezadocodigo3d.push("t0=p;");
 this.Encabezadocodigo3d.push("t1=-1;");
 this.Encabezadocodigo3d.push("guardarString();");
 this.Encabezadocodigo3d.push("t0=t7;");
 this.Encabezadocodigo3d.push("imprimirString();");
 this.Encabezadocodigo3d.push("printf(\"%c\",32);");
 this.Encabezadocodigo3d.push("t0=t8;");
 this.Encabezadocodigo3d.push("goto L2;");
 this.Encabezadocodigo3d.push("L3:");
 this.Encabezadocodigo3d.push("t0=t0+1;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("if(t1==-2)goto L3;");
 this.Encabezadocodigo3d.push("t8=t0;");
 this.Encabezadocodigo3d.push("t0=heap[(int)t0];");// usar t7
 this.Encabezadocodigo3d.push("t7=p;");
 this.Encabezadocodigo3d.push("t2=t0;");
 this.Encabezadocodigo3d.push("BooleanToString();");
 this.Encabezadocodigo3d.push("t0=p;");
 this.Encabezadocodigo3d.push("t1=-1;");
 this.Encabezadocodigo3d.push("guardarString();");
 this.Encabezadocodigo3d.push("t0=t7;");
 this.Encabezadocodigo3d.push("imprimirString();");
 this.Encabezadocodigo3d.push("printf(\"%c\",32);");
 this.Encabezadocodigo3d.push("t0=t8;");
 this.Encabezadocodigo3d.push("goto L3;");

 this.Encabezadocodigo3d.push("L4:");
 this.Encabezadocodigo3d.push("t0=t0+3;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("t9=t0;");
 this.Encabezadocodigo3d.push("t0=t1;");
 this.Encabezadocodigo3d.push("PrintArreglo();");
 this.Encabezadocodigo3d.push("t0=t9;");
 this.Encabezadocodigo3d.push("t0=t0-2;");
 this.Encabezadocodigo3d.push("goto L4;");
 this.Encabezadocodigo3d.push("L5:");
 this.Encabezadocodigo3d.push("t0=t0+3;");
 this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
 this.Encabezadocodigo3d.push("if(t1==-1)goto L20;");
 this.Encabezadocodigo3d.push("t10=t0;");
 this.Encabezadocodigo3d.push("t0=t1;");
 this.Encabezadocodigo3d.push("PrintArreglo();");
 this.Encabezadocodigo3d.push("t0=t10;");
 this.Encabezadocodigo3d.push("t0=t0-2;");
 this.Encabezadocodigo3d.push("goto L5;");
 this.Encabezadocodigo3d.push("L20:");
 this.Encabezadocodigo3d.push("printf(\"%c\",10);");
 this.Encabezadocodigo3d.push("return;");
 this.Encabezadocodigo3d.push("}");
// obtener la pocicion en el arreglo
this.Encabezadocodigo3d.push("void ObtenerPosArreglo(){");
this.Encabezadocodigo3d.push("if(t0==-1)goto L20;");
this.Encabezadocodigo3d.push("if(t0==-2)goto L20;");
this.Encabezadocodigo3d.push("t0=t0+1;");
this.Encabezadocodigo3d.push("t1=heap[(int)t0];");
this.Encabezadocodigo3d.push("if(t1<=t2)goto L20;");
this.Encabezadocodigo3d.push("t5=2+t2;");
this.Encabezadocodigo3d.push("t0=t0+t5;");
this.Encabezadocodigo3d.push("goto L10;");
this.Encabezadocodigo3d.push("L20:");
this.Encabezadocodigo3d.push("t0=-1;");
this.Encabezadocodigo3d.push("L10:");
this.Encabezadocodigo3d.push("return;");
this.Encabezadocodigo3d.push("}");



// aqui vendrian mas funciones nativas

this.etiquetasS=new Array<string>();
        this.pila=new Array<Type>();
        this.contador=15;//T
        this.etiquetas=5;//L
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
