import { Primitive } from './Primitive';

import { Node } from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Exceptionn } from "../utilidad/Exceptionn";
import { types, Type } from "../utilidad/Type";

/**
 * @class Genera un nuevo nodo expresion para realizar operaciones aritmeticas
 */
export class Arithmetic extends Node {
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    let izquierdo="";
    let derecho="";
    let data="";
    if(this.leftOperator!==null){izquierdo=this.leftOperator.codigo3direcciones(Tabla,tree);}
    if(this.rightOperator!==null){derecho=this.rightOperator.codigo3direcciones(Tabla,tree);}

    if(this.Operator==="+"){

      if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {   tree.codigo3d.push("// suma de operadores");
        const contador=tree.getContador();
        data="t"+contador+"="+ izquierdo+this.Operator+derecho+";";
        tree.codigo3d.push(data);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else if(this.leftOperator.type.type===types.STRING||this.rightOperator.type.type===types.STRING)
      { this.type=new Type(types.STRING);
        tree.codigo3d.push("// suma de operadores");

        let contador1=tree.getContador();
          if(this.leftOperator.type.type==types.STRING)
          {

            tree.codigo3d.push("t"+contador1+"=p;"); // guardara el inicio de la cadena
            tree.codigo3d.push("t0="+izquierdo+";");  //cargamos lavieja cadena
            tree.codigo3d.push("concatenarString();"); //realizamos la accion
          }
          else if(this.leftOperator.type.type==types.NUMERIC||this.leftOperator.type.type==types.BOOLEAN)
          {
          if(this.leftOperator instanceof Primitive)
            {

              let aux:string=izquierdo+"";
              tree.codigo3d.push("t"+contador1+"=p;");
              for (const iterator of aux)
              {
                tree.codigo3d.push("//agregamos el numero o boolean al heap");
                tree.codigo3d.push("t0=p;");
                tree.codigo3d.push("t1="+iterator.charCodeAt(0)+";");
                tree.codigo3d.push("guardarString();");
              }

            } else // aqui debe de estar el temporal
            {
            tree.codigo3d.push("t"+contador1+"=p;"); // guardara el inicio de la cadena
             tree.codigo3d.push("t0=p;");
             if(this.leftOperator.type.type==types.BOOLEAN){tree.codigo3d.push("t1=-3;");}
             else{tree.codigo3d.push("t1=-2;");}
             tree.codigo3d.push("guardarString();");
             tree.codigo3d.push("t0=p;");
             if(this.leftOperator.type.type==types.BOOLEAN){   tree.codigo3d.push("t1="+izquierdo+";");}
             else{tree.codigo3d.push("t1="+izquierdo+";");}
             tree.codigo3d.push("guardarString();");
            }
          }
          // la derecha
          if(this.rightOperator.type.type==types.STRING)
          {
            //let contador1=tree.getContador();
           // tree.codigo3d.push("t"+contador1+"=p;"); // guardara el inicio de la cadena
            tree.codigo3d.push("t0="+derecho+";");  //cargamos lavieja cadena
            tree.codigo3d.push("concatenarString();"); //realizamos la accion
          }
          else if(this.rightOperator.type.type==types.NUMERIC||this.rightOperator.type.type==types.BOOLEAN)
          {
            if(this.rightOperator instanceof Primitive)
            {

              let aux:string=derecho+"";
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
             }
             else // aqui debe de estar el temporal
             {
              tree.codigo3d.push("t0=p;");
              if(this.rightOperator.type.type==types.BOOLEAN){tree.codigo3d.push("t1=-3;");}
              else{tree.codigo3d.push("t1=-2;");}

              tree.codigo3d.push("guardarString();");
              tree.codigo3d.push("t0=p;");
              if(this.rightOperator.type.type==types.BOOLEAN){   tree.codigo3d.push("t1="+derecho+";");}
              else{tree.codigo3d.push("t1="+derecho+";");}
              tree.codigo3d.push("guardarString();");
             }
          }


        tree.codigo3d.push("t0=p;");
        tree.codigo3d.push("t1=-1;");
        tree.codigo3d.push("guardarString();");


        return "t"+contador1;
      }
      else{
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
          }
    }
    else if(this.Operator==="-")
    {
      if(this.rightOperator===null)
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//negacion -`);
        data="t"+contador+"="+ this.Operator+izquierdo+";";
        tree.codigo3d.push(data);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;

      }
      else if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//resta -`);
        data="t"+contador+"="+ izquierdo+this.Operator+derecho+";";
        tree.codigo3d.push(data);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else{
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
          }
    }
    else if(this.Operator==="*")
    {
      if(this.leftOperator.type.type===types.NUMERIC&&this.rightOperator.type.type===types.NUMERIC)
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//multiplicacion *`);
        data="t"+contador+"="+ izquierdo+this.Operator+derecho+";";
        tree.codigo3d.push(data);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }

    }
    else if(this.Operator==="/")
    {
      if(this.leftOperator.type.type===types.NUMERIC&&this.rightOperator.type.type===types.NUMERIC)
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//division /`);
        data="t"+contador+"="+ izquierdo+this.Operator+derecho+";";
        tree.codigo3d.push(data);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }

    }
    else if(this.Operator==="**")
    {
      if(this.leftOperator.type.type===types.NUMERIC&&this.rightOperator.type.type===types.NUMERIC)
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//POTENCIA **`);
        tree.codigo3d.push(`t0=${izquierdo}; \nt1=${derecho};\nt2=1; \npotencia();\nt${contador}=t2;`);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator==="%")
    {
      if(this.leftOperator.type.type===types.NUMERIC&&this.rightOperator.type.type===types.NUMERIC)
      {
        const contador=tree.getContador();
        tree.codigo3d.push(`//comparar %`);
        tree.codigo3d.push("t"+contador+`=fmod(${izquierdo},${derecho});`);
        this.type=new Type(types.NUMERIC);
        return "t"+contador;
      }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator==="||")
    {
      if(this.leftOperator.type.type===types.BOOLEAN&&this.rightOperator.type.type===types.BOOLEAN)
      {

       let valor;
       tree.codigo3d.push(`//comparar ||`);
       tree.codigo3d.push(`if(${izquierdo}||${derecho})goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.getContador()}=1;`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.contador-1}=0;`);
       tree.codigo3d.push(`L${tree.etiquetas-1}:`);
       this.type=new Type(types.BOOLEAN);
        return "t"+(tree.contador-1);
      }else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator==="&&")
    {
      if(this.leftOperator.type.type===types.BOOLEAN&&this.rightOperator.type.type===types.BOOLEAN)
      {

       let valor;
       tree.codigo3d.push(`//comparar &&`);
       tree.codigo3d.push(`if(${izquierdo}&&${derecho})goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.getContador()}=1;`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.contador-1}=0;`);
       tree.codigo3d.push(`L${tree.etiquetas-1}:`);
       this.type=new Type(types.BOOLEAN);
        return "t"+(tree.contador-1);
      }else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator==="==")
    {
      if((this.leftOperator.type.type===types.BOOLEAN||this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.STRING)
      &&(this.rightOperator.type.type===types.BOOLEAN||this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.STRING))
      {

       let valor;
       tree.codigo3d.push(`//comparar ==`);
       tree.codigo3d.push(`if(${izquierdo}==${derecho})goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.getContador()}=1;`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.contador-1}=0;`);
       tree.codigo3d.push(`L${tree.etiquetas-1}:`);
       this.type=new Type(types.BOOLEAN);
        return "t"+(tree.contador-1);
      }else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator===">")
    {
      if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {


        {
        let valor;
        tree.codigo3d.push(`if(${izquierdo}>${derecho})goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.getContador()}=1;`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.contador-1}=0;`);
        tree.codigo3d.push(`L${tree.etiquetas-1}:`);
        this.type=new Type(types.BOOLEAN);

         return "t"+(tree.contador-1);

      }
    }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }


    }
    else if(this.Operator==="<")
    {
      //comparar <
      if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {


        {
        let valor;
        tree.codigo3d.push(`//comparar <`);
        tree.codigo3d.push(`if(${izquierdo}<${derecho})goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.getContador()}=1;`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.contador-1}=0;`);
        tree.codigo3d.push(`L${tree.etiquetas-1}:`);
        this.type=new Type(types.BOOLEAN);

         return "t"+(tree.contador-1);

      }
    }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }


    }
    else if(this.Operator===">=")
    {
      if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {


        {
        let valor;
        tree.codigo3d.push(`//comparar >=`);
        tree.codigo3d.push(`if(${izquierdo}>=${derecho})goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.getContador()}=1;`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.contador-1}=0;`);
        tree.codigo3d.push(`L${tree.etiquetas-1}:`);
        this.type=new Type(types.BOOLEAN);

         return "t"+(tree.contador-1);

      }
    }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }


    }
    else if(this.Operator==="<=")
    {
      if((this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.BOOLEAN)&&(this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.BOOLEAN))
      {


        {
        let valor;
        tree.codigo3d.push(`//comparar <=`);
        tree.codigo3d.push(`if(${izquierdo}<=${derecho})goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.getContador()}=1;`);
        tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
        tree.codigo3d.push(`L${tree.etiquetas-2}:`);
        tree.codigo3d.push(`t${tree.contador-1}=0;`);
        tree.codigo3d.push(`L${tree.etiquetas-1}:`);
        this.type=new Type(types.BOOLEAN);

         return "t"+(tree.contador-1);

      }
    }
      else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }


    }
    else if(this.Operator==="!=")
    {
      if((this.leftOperator.type.type===types.BOOLEAN||this.leftOperator.type.type===types.NUMERIC||this.leftOperator.type.type===types.STRING)
      &&(this.rightOperator.type.type===types.BOOLEAN||this.rightOperator.type.type===types.NUMERIC||this.rightOperator.type.type===types.STRING))
      {

       let valor;
       tree.codigo3d.push(`//comparar !=`);
       tree.codigo3d.push(`if(${izquierdo}!=${derecho})goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.getContador()}=1;`);
       tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
       tree.codigo3d.push(`L${tree.etiquetas-2}:`);
       tree.codigo3d.push(`t${tree.contador-1}=0;`);
       tree.codigo3d.push(`L${tree.etiquetas-1}:`);
       this.type=new Type(types.BOOLEAN);
        return "t"+(tree.contador-1);
      }else
      {
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }
    else if(this.Operator==="!")
    {
      if(this.leftOperator.type.type===types.BOOLEAN)
      {
      let valor;
      tree.codigo3d.push(`//comparar !`);
      tree.codigo3d.push(`if(!${izquierdo})goto L${tree.getEtiqueta()};`);
      tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
      tree.codigo3d.push(`L${tree.etiquetas-2}:`);
      tree.codigo3d.push(`t${tree.getContador()}=1;`);
      tree.codigo3d.push(`goto L${tree.getEtiqueta()};`);
      tree.codigo3d.push(`L${tree.etiquetas-2}:`);
      tree.codigo3d.push(`t${tree.contador-1}=0;`);
      tree.codigo3d.push(`L${tree.etiquetas-1}:`);
      this.type=new Type(types.BOOLEAN);

       return "t"+(tree.contador-1);
      }
      else{
        const error = new Exceptionn('Semantico',
        `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
        this.line, this.column);
        tree.excepciones.push(error);
        // tree.console.push(error.toString());
        this.type = new Type(types.ERROR);return "error";
      }
    }

return "error";


  }
  Traducir(Tabla: Tabla, tree: Tree) {
let izquierdo="";
let derecho="";
if(this.leftOperator!==null){izquierdo=this.leftOperator.Traducir(Tabla,tree);}
if(this.rightOperator!==null){derecho=this.rightOperator.Traducir(Tabla,tree);}
else{  let data=  this.Operator+izquierdo;  return data;}

  let data= izquierdo+this.Operator+derecho;
  return data;



  }
    leftOperator: Node;
    rightOperator: Node;
    Operator: String;

    /**
     * @constructor Devuelve el nodo expresion para ser utilizado con otras operaciones
     * @param leftOperator Nodo expresion izquierdo
     * @param rightOperator Nodo expresion derecho
     * @param Operator Operador
     * @param line linea de la operacion
     * @param column columna de la operacion
     */

     constructor(leftOperator: Node, rightOperator: Node, Operator: String, line: number, column: number) {
        // Envio null porque aun no se el tipo de la operación
        super(null, line, column);
        this.leftOperator = leftOperator;
        this.rightOperator = rightOperator;
        this.Operator = Operator;
    }

    // tslint:disable-next-line: typedef
    execute(Tabla: Tabla, tree: Tree) {

        if (this.rightOperator !== null) {
            let LeftResult = this.leftOperator.execute(Tabla, tree);
           // console.log(LeftResult);
            if (LeftResult instanceof Exceptionn) {
                return LeftResult;
            }
            let  RightResult ;
            if(this.Operator!=="&&"&&this.Operator!=="||"){RightResult= this.rightOperator.execute(Tabla, tree);}
           // console.log(RightResult);
            if (RightResult instanceof Exceptionn) {
                return RightResult;
            }

            if (this.Operator === '+') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult + RightResult;
                } else if (this.leftOperator.type.type === types.STRING || this.rightOperator.type.type === types.STRING) {

                  // tslint:disable-next-line: max-line-length
                  if (this.leftOperator.type.type === types.ARRAY || this.rightOperator.type.type === types.ARRAY || this.leftOperator.type.type === types.TYPE || this.rightOperator.type.type === types.TYPE  )
                  {
                    const error = new Exceptionn('Semantico',
                    `Error de tipos en la suma se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                    this.line, this.column);
                    tree.excepciones.push(error);
               // tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                  }else{
                  this.type = new Type(types.STRING);
                  return LeftResult + RightResult;
                  }
                } else {
                    const error = new Exceptionn('Semantico',
                        `Error de tipos en la suma se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                        this.line, this.column);
                    tree.excepciones.push(error);

                   // tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                }

            } else if (this.Operator === '-') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult - RightResult;
                } else {
                   // console.log(this.leftOperator)
                    const error = new Exceptionn('Semantico', `Error de tipos en la resta se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                   // tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                }

            }
                        else if (this.Operator === '*') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult * RightResult;
                } else {
                    const error = new Exceptionn('Semantico',
                        `Error de tipos en la multiplicacion se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                   // tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                }
            } else if (this.Operator === '/') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    if (RightResult === 0) {
                        const error = new Exceptionn('Semantico', `La division con cero no esta permitida`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                       // tree.console.push(error.toString());
                         this.type = new Type(types.ERROR);return error;
                    }
                    return LeftResult / RightResult;
                } else {
                    const error = new Exceptionn('Semantico',
                        `Error de tipos en la division se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                   // tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                }
            } else if (this.Operator === '%') {
              if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                  this.type = new Type(types.NUMERIC);
                  if (RightResult === 0) {
                      const error = new Exceptionn('Semantico', `el modulo con cero no esta permitido`,
                          this.line, this.column);
                      tree.excepciones.push(error);
                     // tree.console.push(error.toString());
                       this.type = new Type(types.ERROR);return error;
                  }
                  return LeftResult % RightResult;
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el Modulo se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error;
              }
              }
              else if (this.Operator === '**') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return LeftResult ** RightResult;
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en la Exponenciacion se esta tratando de operar ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error;
              }
              }
              else if (this.Operator === '<') {


                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult < RightResult){
                      return true;
                    }else {return false; }
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el menor que ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '<=') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult <= RightResult){
                      return true;
                    }else {return false; }
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el menor que o igual ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
               else if (this.Operator === '>') {

                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult > RightResult){
                      return true;
                    }else {return false; }
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el mayor que  ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '>=') {
                if (this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult >= RightResult){
                      return true;
                    }else {return false; }
                }else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el mayor que o igual ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '==') {
                if ((this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) ||
                (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) ||
                (this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.BOOLEAN)) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult === RightResult){
                      return true;
                    }else {return false; }
                }     else {

                    if((this.leftOperator.type.type === types.OBJET||this.leftOperator.type.type === types.TYPE) && this.rightOperator.type.type === types.OBJET){

                      if (LeftResult === RightResult){
                        return true;
                      }else {return false; }
                    }
                    else if ((this.leftOperator.type.type === types.OBJET||this.leftOperator.type.type === types.TYPE) && this.rightOperator.type.type === types.NULL){

                      if ((LeftResult === RightResult)||LeftResult==="null"||LeftResult===null){

                        return true;
                      }else {return false; }
                    }
                    else if (this.leftOperator.type.type === types.NULL && (this.rightOperator.type.type === types.OBJET||this.rightOperator.type.type === types.TYPE)){

                      if ((LeftResult === RightResult)||RightResult==="null"||RightResult===null){
                        return true;
                      }else {return false; }
                    }


                    const error = new Exceptionn('Semantico',
                      `Error de tipos en el igual ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '!=') {

                if ((this.leftOperator.type.type === types.NUMERIC && this.rightOperator.type.type === types.NUMERIC) ||
                (this.leftOperator.type.type === types.STRING && this.rightOperator.type.type === types.STRING) ||
                (this.leftOperator.type.type === types.BOOLEAN && this.rightOperator.type.type === types.BOOLEAN)) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult !== RightResult){
                      return true;
                    }else {return false; }
                }     else {
                  if(this.leftOperator.type.type === types.OBJET && this.rightOperator.type.type === types.OBJET){
                    if (LeftResult !==  RightResult){
                      return true;
                    }else {return false; }
                  }
                  else if (this.leftOperator.type.type === types.OBJET && this.rightOperator.type.type === types.NULL){


                    if (LeftResult!=="null"){

                      return true;
                    }else {return false; }
                  }
                  else if (this.leftOperator.type.type === types.NULL && this.rightOperator.type.type === types.OBJET){
                    if (RightResult!=="null"){
                      return true;
                    }else {return false; }
                  }
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '&&') {
                           if (this.leftOperator.type.type === types.BOOLEAN ) {
                    this.type = new Type(types.BOOLEAN);
                    if (!LeftResult){

                      return false;
                    }else {
                      RightResult=this.rightOperator.execute(Tabla,tree);
                      if (RightResult instanceof Exceptionn) {
                        return RightResult;
                    }
                      if (this.rightOperator.type.type === types.BOOLEAN){
                        if (RightResult){
                          return true;
                        }else{return false; }
                      }
                      else {
                        const error = new Exceptionn('Semantico',
                            `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                       // tree.console.push(error.toString());
                         this.type = new Type(types.ERROR);return error; }
                    }
                }     else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }
              else if (this.Operator === '||') {
                if (this.leftOperator.type.type === types.BOOLEAN ) {
                    this.type = new Type(types.BOOLEAN);
                    if (LeftResult){
                      return true;
                    }else {
                      RightResult= this.rightOperator.execute(Tabla, tree);
                      if (RightResult instanceof Exceptionn) {
                        return RightResult;
                    }if (this.rightOperator.type.type === types.BOOLEAN){
                        if (RightResult){
                          return true;
                        }else{return false; }
                      }
                      else {
                        const error = new Exceptionn('Semantico',
                            `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                            this.line, this.column);
                        tree.excepciones.push(error);
                       // tree.console.push(error.toString());
                         this.type = new Type(types.ERROR);return error; }
                    }
                }     else {
                  const error = new Exceptionn('Semantico',
                      `Error de tipos en el diferente ${this.leftOperator.type.toString()} y ${this.rightOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error; }
              }

              else {
                const error = new Exceptionn('Semantico',
                    `Error, Operador desconocido.`,
                    this.line, this.column);
                tree.excepciones.push(error);
             //   tree.console.push(error.toString());
                 this.type = new Type(types.ERROR);return error;
            }
        }
        else {
            const LeftResult = this.leftOperator.execute(Tabla, tree);
            if (LeftResult instanceof Exceptionn) {
                return LeftResult;
            }
            if (this.Operator === '-') {
                if (this.leftOperator.type.type === types.NUMERIC) {
                    this.type = new Type(types.NUMERIC);
                    return -1 * LeftResult;
                } else {
                    const error = new Exceptionn('Semantico',
                        `error no se puede negar un tipo: ${this.leftOperator.type.toString()}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    //tree.console.push(error.toString());
                     this.type = new Type(types.ERROR);return error;
                }
            }
            else if (this.Operator === '!') {
              if ( this.leftOperator.type.type === types.BOOLEAN) {
                  this.type = new Type(types.BOOLEAN);
                  return !LeftResult;
              } else {
                 // console.log(this.leftOperator)
                  const error = new Exceptionn('Semantico', `error de tipos no se puede negar un tipo: ${this.leftOperator.type.toString()}`,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
                   this.type = new Type(types.ERROR);return error;
              }
            }

            else {
                const error = new Exceptionn('Semantico',
                    `Error, Operador desconocido`,
                    this.line, this.column);
                tree.excepciones.push(error);
               // tree.console.push(error.toString());
                 this.type = new Type(types.ERROR);return error;
            }
        }
    }
}
