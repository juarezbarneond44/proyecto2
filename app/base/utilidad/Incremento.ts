import { Simbol } from '../Simbols/Simbol';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {types} from "./Type";
/**
 * Permite imprimir expresiones en la consola
 */


export class Incremento extends Node{
  codigo3direcciones(tabla: Tabla, tree: Tree) {
   let variable = tabla.getVariable(this.id);

    if (variable == null) {
        const error = new Exceptionn('Semantico',
            'No se ha encontrado la variable ' + this.id,
            this.line, this.column);
        tree.excepciones.push(error);
        if(this.TipoOperacion){
          return null;
        }
        return error;
    }
    if(variable.type.type!=types.NUMERIC){
      const error = new Exceptionn('Semantico',
      'Solo se puede hacer la operacion con un numero ' + variable.type.type,
      this.line, this.column);
      tree.excepciones.push(error);
      if(this.TipoOperacion){
    return null;
  }
      return error;

    }

    let operador=""  ;
    if(this.TipoFuncion)
    {
      let contador=tree.getContador();
      tree.codigo3d.push(`t${contador}=stack[(int)${variable.value}];`);
      tree.codigo3d.push(`stack[(int)${variable.value}]=t${contador}+1;`);
      if(this.TipoOperacion){return null;}

      else { this.type=variable.type; return `t${contador}`;
    }
    }
  else{
    let contador=tree.getContador();
    tree.codigo3d.push(`t${contador}=stack[(int)${variable.value}];`);
    tree.codigo3d.push(`stack[(int)${variable.value}]=t${contador}-1;`);
  if(this.TipoOperacion){return null;}

  else { this.type=variable.type; return `t${contador}`;
  }
}



    //throw new Error('Method not implemented.');
  }
Traducir(Tabla: Tabla, tree: Tree) {
  let operador=""  ;
  if(this.TipoFuncion){operador="++";}
else{operador="--";}
let data="";
  if (this.TipoPocicion){data=operador+this.id;}
else{data=this.id+operador;}

if(this.TipoOperacion){
  tree.Traduccion.push(data+";");



  return null;
}
else {return data;}

}
  TipoOperacion:boolean;
  TipoFuncion:boolean;
  id:string;
  TipoPocicion:boolean;
  constructor( TipoOperacion:boolean,TipoFuncion:boolean,TipoPocicion:boolean,id:string,line:number,column:number) {
    super(null,line,column);
this.TipoOperacion=TipoOperacion;
this.TipoFuncion=TipoFuncion;
this.id=id;
this.TipoPocicion=TipoPocicion;

  }

  execute(Table: Tabla, tree: Tree) {
    let variable: Simbol;

    variable = Table.getVariable(this.id);

    if (variable == null) {
        const error = new Exceptionn('Semantico',
            'No se ha encontrado la variable ' + this.id,
            this.line, this.column);
        tree.excepciones.push(error);
        if(this.TipoOperacion){
          return null;
        }
        return error;
    }
    if(variable.type.type!=types.NUMERIC){
      const error = new Exceptionn('Semantico',
      'Solo se puede hacer la operacion con un numero ' + variable.type.type,
      this.line, this.column);
      tree.excepciones.push(error);
      if(this.TipoOperacion){
    return null;
  }
      return error;

    }

    this.type=variable.type;
    // tslint:disable-next-line: one-variable-per-declaration
    let valor= variable.value+"";


    if(this.TipoFuncion){
      const datofinal=parseInt(valor)+1;
     variable.value=datofinal;
    }
else{
  const datofinal=parseInt(valor)-1;
  variable.value=datofinal;
 }
    if(this.TipoOperacion){return null;} //instruccion
    else {
      // es exprecion
      if(this.TipoPocicion){  return variable.value;}// devuelve el valor incrementado
      return parseInt(valor);
    }

  }

}
