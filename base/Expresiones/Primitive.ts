import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";


/**
 * Crea un nuevo objeto Nodo expresion en base a un valor primitivo,
 * por ejemplo numeros, booleanos o cadenas(suponiendo que la cadena es primitivo)
 */
export class Primitive extends Node{
    codigo3direcciones(Tabla: Tabla, tree: Tree) {

      if(this.type.type===types.STRING){
        {


          // let aux:string=this.expression[0].codigo3direcciones(tabla,tree);
          let data:string=this.value+"";
          let estado=0;
          for (let x = 0; x < data.length; x++) {
            const iterator = data[x];
              switch(estado){
              case 0:{
                if(iterator=="\\"){estado=1; continue;}
              tree.codigo3d.push("//agregamos el string al heap");
              tree.codigo3d.push("t0=p;");

              tree.codigo3d.push("t1="+iterator.charCodeAt(0)+";");
              tree.codigo3d.push("guardarString();");
              break;
               }
               case 1:
                 {
                   let assci=0;
                  if(iterator=="n"){assci=10;}
                  else if(iterator=="\""){assci=34;}
                  else if(iterator=="\\"){assci=92}
                  else if(iterator=="r"){assci=10}
                  else if(iterator=="t"){assci=9;}
                  else
                  {tree.codigo3d.push("//agregamos el string al heap");
                  tree.codigo3d.push("t0=p;");

                  tree.codigo3d.push("t1="+34+";");
                  tree.codigo3d.push("guardarString();");
                  tree.codigo3d.push("//agregamos el string al heap");
                  tree.codigo3d.push("t0=p;");

                  tree.codigo3d.push("t1="+iterator.charAt(0)+";");
                  tree.codigo3d.push("guardarString();");
                }
                  tree.codigo3d.push("//agregamos el string al heap");
                  tree.codigo3d.push("t0=p;");

                  tree.codigo3d.push("t1="+assci+";");
                  tree.codigo3d.push("guardarString();");
                  estado=0;
                   break;
                 }
              }
            }



           tree.codigo3d.push("t0=p;");
           tree.codigo3d.push("t1=-1;");
           tree.codigo3d.push("guardarString();");
           //tree.codigo3d.push("t0=p-"+data.length+";");
           //tree.codigo3d.push("imprimirString();");
           const contador=tree.getContador();
           tree.codigo3d.push("t"+contador+"=p-"+(data.length+1)+";");
           return "t"+contador;

          // tree.codigo3d.push("printf(\"%c\",10);");

         }

      }

      else if(this.type.type===types.BOOLEAN){
        if(this.value==="true"||this.value){ return 1;}
        else {return 0;}

       }

       return this.value;
    }
    Traducir(Tabla: Tabla, tree: Tree) {
      if(this.type.type===types.STRING){
        return "\""+this.value+"\"";
      }
      return this.value;
    }
    value: Object;

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
    }

    /**
     * Devuelve el valor inicial e.g. 4
     * @param Tabla Tabla de simbolos
     * @param tree Arbol de instrucciones y excepciones
     */
    execute(Tabla: Tabla, tree: Tree) {
        return this.value;
    }
}
