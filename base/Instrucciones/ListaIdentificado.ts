
import { Simbol } from './../Simbols/Simbol';
import { Type, types } from '../utilidad/Type';
import { IDArray } from './IDArray';
import { Exceptionn } from '../utilidad/Exceptionn';

import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { table } from 'console';



export class ListaIdentificado extends Node {
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    let data="";
   for (let x = 0; x < this.linstaID.length; x++) {
     data = data+this.linstaID[x].identificador;
     if(x+1<this.linstaID.length){data=data+"."}
   }
   if(this.estado){
    return  data;
   }
   else{
    if(this.Expresion!==null){
     tree.Traduccion.push(data+"="+this.Expresion.Traducir(Tabla,tree)+";");
    }
     return null;
   }

  }
  linstaID:Array<IDArray>;
  Expresion:Node;
  estado:boolean;
  constructor(estado:boolean,linstaID:Array<IDArray>, Expresion:Node,line:number,column:number){
    super(null,line,column);
    this.linstaID=linstaID;
    this.Expresion=Expresion;
    this.estado=estado;
  }
  execute(table: Tabla, tree: Tree) {
    {
      try{
      // tslint:disable-next-line: prefer-for-of
      let valorFinal:Simbol=null;
      let tablaFinal=table;
      for(let x=0;x<this.linstaID.length;x++)
    {
      valorFinal=tablaFinal.getVariable(this.linstaID[x].identificador);

      if(valorFinal===null){  this.type = new Type(types.ERROR);return this.MetodoError('El ID ' + this.linstaID[x].identificador + ' No existe', tree); }
      else {
        if(valorFinal instanceof Simbol){
          if(valorFinal.type.type==types.TYPE||valorFinal.type.typeObjeto==types.TYPE){
            if(valorFinal.value instanceof Tabla){
              tablaFinal=valorFinal.value; continue;
             } else{
               if(valorFinal.value==="null"&& (x+1)==this.linstaID.length){break;}else{
                 this.type = new Type(types.ERROR);return this.MetodoError('El ID ' + this.linstaID[x].identificador + ' tiene valor nulo', tree); }}
              }
          else if(valorFinal.type.type==types.ARRAY||valorFinal.type.typeObjeto==types.ARRAY){}
          else{
            if((x+1)===this.linstaID.length){ break;}
            else{

              this.type = new Type(types.ERROR);return this.MetodoError('El ID ' + this.linstaID[x].identificador + ' no es tipo Type o Array', tree); }
          }
        }


      }
    }
   // si llega aqui es para ver si es instruccion o declaracion
      if(valorFinal!=null)
      {

      if(this.estado){
      //  console.log(this)

      if(valorFinal.type.type==types.TYPE||valorFinal.type.typeObjeto==types.TYPE){
        let sim=new Type(types.OBJET);
        sim.typeObjeto=valorFinal.type.typeObjeto;
        sim.nombre=valorFinal.type.nombre;
        this.type=sim;

        return valorFinal.value;

      }
      else if (valorFinal.type.type==types.ARRAY||valorFinal.type.typeObjeto==types.ARRAY){}
      else {

        this.type=valorFinal.type;

        return valorFinal.value;
      }}
      else
      {
      const data=this.Expresion.execute(table,tree);
      if(data instanceof Exceptionn){
       console.log("error")
       }else {
       if(this.Expresion.type.type==types.TYPE||this.Expresion.type.typeObjeto==types.TYPE){
       if(this.Expresion.type.nombre==valorFinal.type.nombre){
        valorFinal.value=data;
        return null}
}
else if (this.Expresion.type.type==types.ARRAY||this.Expresion.type.typeObjeto==types.ARRAY){return null;}
else if(this.Expresion.type.type==valorFinal.type.type){
    this.type=this.Expresion.type;
  valorFinal.value=data;

  return null;
}
else {console.log("nunca entro");
return null;
}

  }
    //const dat=new Asignacion(valorFinal.identifier+"",this.Expresion,this.line,this.column).execute(tablaFinal,tree);


   }
   }

   else{   this.type = new Type(types.ERROR);return this.MetodoError('El ID ' + this.linstaID[this.linstaID.length-1].identificador + ' es error', tree); }




  }catch(error)
  {const dataa = new Exceptionn('Semantico',error,this.line, this.column);tree.excepciones.push(error);
  tree.pila.pop();
  return dataa;

      }}  }

MetodoError(informe:string,tree:Tree){
  const error = new Exceptionn('Semantico',informe,this.line, this.column);
  tree.excepciones.push(error);
  if(this.estado){
    this.type = new Type(types.ERROR);
    return error;}
  else {return null;}

}


}
