import { Declaracion } from './Declaracion';
import { Simbol } from './../Simbols/Simbol';

import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import { Type, types } from '../utilidad/Type';


export class declararLista extends Node {
  codigo3direcciones(Tabla: Tabla, tree: Tree) {

    for (let i = 0; i < this.ListaDeclaraciones.length; i++) {
      let res = this.ListaDeclaraciones[i].codigo3direcciones(Tabla, tree);

      // aqui tenemos el smbolo cochino :v
      if(res instanceof Exceptionn)
      {continue;
      }else{
           if(res===null){
            const error = new Exceptionn('Semantico',
            "no se puede declarar un valor error",
            this.line, this.column);
        tree.excepciones.push(error);
        continue;
           }
            res.valorInicial=this.tipoInicial;
            const res2 = Tabla.setVariable(res);
         //   console.log(Tabla)
            if (res2 != null) {
                  const error = new Exceptionn('Semantico',
                      res2,
                      this.line, this.column);
                  tree.excepciones.push(error);
                //  tree.console.push(error.toString());
              }}
            }
return null;

  }
  Traducir(Tabla: Tabla, tree: Tree) {
   let data="";

   for (let x = 0; x < this.ListaDeclaraciones.length; x++) {

    data= data+"" +this.ListaDeclaraciones[x].Traducir(Tabla,tree).replace("const","");
    let aux=this.ListaDeclaraciones[x];
    if(aux instanceof Declaracion)
    {

     // if(aux.type.nombre!==""){aux.type=new Type(types.OBJET)}
       if(aux.type===null){aux.type=new Type(types.ANY)}

           Tabla.setVariable(new Simbol(this.tipoInicial,aux.type,aux.identifier,null));
    }

      if(x+1<this.ListaDeclaraciones.length){
        data=data+",";
      }
   }
   //data=data ;
   if(this.tipoInicial){data="let "+data;}
   else{data="const "+data;}
   tree.Traduccion.push(data+";");
      return null;

  }
  ListaDeclaraciones: Array<Node>;
  tipoInicial:boolean;
  constructor(tipoInicial:boolean,ListaDeclaraciones: Array<Node>,line:number,column:number){
    super(null,line,column)
    this.tipoInicial=tipoInicial;
    this.ListaDeclaraciones=ListaDeclaraciones;
  }
  execute(Tabla: Tabla, tree: Tree) {

    // tslint:disable-next-line: prefer-for-of


    // tslint:disable-next-line: prefer-for-of

    for (let i = 0; i < this.ListaDeclaraciones.length; i++) {
      let res = this.ListaDeclaraciones[i].execute(Tabla, tree);

      // aqui tenemos el smbolo cochino :v
      if(res instanceof Exceptionn)
      {continue;
      }else{
           if(res===null){
            const error = new Exceptionn('Semantico',
            "no se puede declarar un valor error",
            this.line, this.column);
        tree.excepciones.push(error);
        continue;
           }
            res.valorInicial=this.tipoInicial;
            const res2 = Tabla.setVariable(res);
         //   console.log(Tabla)
            if (res2 != null) {
                  const error = new Exceptionn('Semantico',
                      res2,
                      this.line, this.column);
                  tree.excepciones.push(error);
                //  tree.console.push(error.toString());
              }}
            }




    return null;
  }
}
