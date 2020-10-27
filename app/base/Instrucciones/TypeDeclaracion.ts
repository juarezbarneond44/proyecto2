import { Tabla } from './../Simbols/Tabla';
import { Exceptionn } from '../utilidad/Exceptionn';
import { Type, types } from '../utilidad/Type';
import { Simbol } from './../Simbols/Simbol';
import { Declaracion } from './Declaracion';
import {Node} from "../Abstract/Node";

import { Tree } from '../Simbols/Tree';


export class TypeDeclaracion extends Node{
    Traducir(table: Tabla, tree: Tree) {
      let data="type "+this.id+"={";
      tree.Traduccion.push(data);
      let data2="";
      for (let x = 0; x < this.ListaDeclaraciones.length; x++) {

  if(this.ListaDeclaraciones[x].type.type===types.OBJET){
    // tslint:disable-next-line: max-line-length
    if(this.ListaDeclaraciones[x].type.typeObjeto===types.TYPE){ data2 =data2+ this.ListaDeclaraciones[x].identifier+":"+this.ListaDeclaraciones[x].type.nombre;}
    else{}

  }else{  data2 =data2+ this.ListaDeclaraciones[x].identifier+":"+this.ListaDeclaraciones[x].type.toString();}

  if(x+1<this.ListaDeclaraciones.length){
     data2=data2+",\n";
   }}
      tree.Traduccion.push(data2);
      tree.Traduccion.push("};");
      let a=new Type(types.OBJET)
      a.typeObjeto=types.TYPE
      a.nombre=this.id;
      table.setVariable(new Simbol(true,a,this.id,null))
      return null;
    }

    id : string;
    ListaDeclaraciones:Array<Declaracion>;
    tipo:boolean;

    constructor(  tipo:boolean,id : string,    ListaDeclaraciones:Array<Declaracion>,line: number, column: number){
        super(null, line, column);
        this.id=id;
        this.ListaDeclaraciones=ListaDeclaraciones;
        this.tipo=tipo;
    }
    execute(table: Tabla, tree: Tree) {
      let nuevaTabla=new Tabla(null);
      if(this.ListaDeclaraciones==null)
      {
        this.type=new Type(types.OBJET);
        this.type.typeObjeto=types.TYPE; this.type.nombre=this.id; return null;
      }
        // tslint:disable-next-line: align
        for(let x=0;x<this.ListaDeclaraciones.length;x++)
        {
          const res=this.ListaDeclaraciones[x].execute(nuevaTabla,tree);
          if(this.ListaDeclaraciones[x].type.type==types.OBJET )
          {
            if(this.ListaDeclaraciones[x].type.typeObjeto==types.TYPE)
            {
              const data=table.getVariable(this.ListaDeclaraciones[x].type.nombre);
              if(data==null&&this.ListaDeclaraciones[x].type.nombre!=this.id)
              {
                // tslint:disable-next-line: max-line-length
                const error = new Exceptionn('Semantico','No se encontro el objeto ' + this.ListaDeclaraciones[x].type.nombre,this.line, this.column);
                tree.excepciones.push(error);
                return error;
              }
            }
            else if (this.ListaDeclaraciones[x].type.typeObjeto==types.ARRAY)
            {
              console.log("arreglo")
            }
            else
            {
              const error = new Exceptionn('Semantico',"tipo de dato no valido",this.line, this.column);
              tree.excepciones.push(error);
              return null;

            }
          }
          if(res instanceof Simbol)
          {
            nuevaTabla.setVariable(res);
          }

        }
  let tipoo=new Type(types.OBJET);
  tipoo.typeObjeto=types.TYPE;
  tipoo.nombre=this.id;
  let sim=new Simbol(this.tipo,tipoo,this.id,nuevaTabla);
  const res=table.setVariable(sim);
  if(res==null)
  {
    this.type=tipoo; return null;
  }
  else
  {
  const error = new Exceptionn('Semantico',res,this.line, this.column);
  tree.excepciones.push(error);
  return null;
  }
}}
