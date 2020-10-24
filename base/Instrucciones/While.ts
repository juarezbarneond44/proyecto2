import { Return } from '../Instrucciones/Return';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
/**
 * Permite imprimir expresiones en la consola
 */
export class While extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let nueva=new Tabla(tabla);
    tree.pila.push(new Type (types.CICLO));
    tree.codigo3d.push("// *****while*****")
    let etiquetaWhile=tree.getEtiqueta();
    tree.codigo3d.push(`L${etiquetaWhile}:`)
    let exprecion=this.exprecion.codigo3direcciones(nueva,tree);
    let etiquetaV=tree.getEtiqueta();
    let etiquetaF=tree.getEtiqueta();

    tree.codigo3d.push(`if(${exprecion}==1) goto L${etiquetaV};`)
    tree.codigo3d.push(`goto L${etiquetaF};`)

    tree.codigo3d.push(`L${etiquetaV}:`)
if(this.Instruciones!=null)
{
  for (let x = 0; x < this.Instruciones.length; x++) {
    let element = this.Instruciones[x];
       let res=element.codigo3direcciones(nueva,tree);
   if(res instanceof Break)
    {
      tree.codigo3d.push(`goto L${etiquetaF};`)
    }
     else if(res instanceof Continue)
    {

      tree.codigo3d.push(`goto L${etiquetaWhile};`)
    }
    else if(res instanceof Return)
    {
      tree.codigo3d.push(`L${etiquetaF}:`)
      tree.pila.pop();
     return res
    }

  }
}

    // hay que hacer el incremento
    //this.Incremento.codigo3direcciones(nueva,tree);
    tree.codigo3d.push(`goto L${etiquetaWhile};`)
    tree.codigo3d.push(`L${etiquetaF}:`)
    tree.pila.pop();
  }

Traducir(tabla: Tabla, tree: Tree) {
let data="while("+this.exprecion.Traducir(tabla,tree)+"){";
tree.Traduccion.push(data);
let newtab=new Tabla(tabla)
if(this.Instruciones!=null){
  this.Instruciones.forEach(element => {
    element.Traducir(newtab,tree);
  });
}

tree.Traduccion.push("}");
return null;
  }
  exprecion:Node;
  Instruciones:Array<Node>;
  constructor(exprecion:Node,Instruciones:Array<Node>,line:number,column:number){
    super(null,line,column);
    this.exprecion=exprecion;
    this.Instruciones=Instruciones;
  }
  execute(table: Tabla, tree: Tree) {

    tree.pila.push(new Type (types.CICLO));
        let result: Node;
    do {
            const newtable = new Tabla(table);
            result = this.exprecion.execute(table, tree);
            if (result instanceof Exceptionn) {
              tree.pila.pop();
                return null;
            }


            if (result+""==="true") {
                // tslint:disable-next-line: prefer-for-of
                for (let i = 0; i < this.Instruciones.length; i++) {
                    const res = this.Instruciones[i].execute(newtable, tree);
                    if(res instanceof Return){ tree.pila.pop(); return res;}
                    if(res instanceof Break){
                      tree.pila.pop();return null;}
                    if(res instanceof Continue){break;}
                }
            }else if(result+""==="false"){ tree.pila.pop();return null;}else {
              const error = new Exceptionn('Semantico',
            `Se esperaba una expresion booleana para la condicion`,
            this.line, this.column);
              tree.excepciones.push(error);
              tree.pila.pop();
              return null;

            }

        } while (result);
        tree.pila.pop();
    return null;
  }

}
