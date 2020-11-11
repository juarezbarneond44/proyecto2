import { Simbol } from './../Simbols/Simbol';
import { Type, types } from '../utilidad/Type';
import { IDArray } from './IDArray';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";


export class ListaIdentificado extends Node {
codigo3direcciones(table: Tabla, tree: Tree)
{
  try{
  let tablaFinal=table;


  let val=tablaFinal.getVariable(this.linstaID[0].identificador);
  let aux= "t"+tree.getContador();

  let obtenerType=tablaFinal.getVariable(val.type.nombre);
  let valor=null;
  tree.codigo3d.push("//*******ID.ID.ID*******");
  tree.codigo3d.push(aux+"="+val.value+";")
  for (let x = 1; x < this.linstaID.length; x++) {
    const elemento = this.linstaID[x];

    if(obtenerType.value instanceof Tabla){
      let contador=1;
      obtenerType.value.Variables.forEach(variableDelType => {
        if(variableDelType.identifier===elemento.identificador)
        {
          //si existe igualacion hay que retornar el valor del type mas la stack :v
         //  valor= "t"+tree.getContador();
            valor=1;
           this.type=variableDelType.type;
           tree.codigo3d.push(`${aux}=${aux}+${contador};`)
           tree.codigo3d.push(`${aux}=stack[(int)${aux}];`);
        }
        contador++;
      });
  }
  }
    if(valor==null)
    {const error = new Exceptionn('Semantico',
      "no existe el ID",
   this.line, this.column);
   tree.excepciones.push(error);
   return null;
  }
   // existe la variable :v
if(this.estado) // esto es para obtener un valor
{
  return aux;
}
else  // esto es una instruccion
{
  tree.codigo3d.pop();
  tree.codigo3d.push("//*******asignar valor en type****")
  let exp=this.Expresion.codigo3direcciones(table,tree);
  if(this.type.type===types.OBJET)
  {
    if(this.Expresion.type.type===this.type.typeObjeto)
    {
      if(this.Expresion.type.nombre===this.type.nombre)
      {
        tree.codigo3d.push(`stack[(int)${aux}]=${exp};`)
        return null;
      }
      else
      {
        const error = new Exceptionn('Semantico',
  "el type no es el mismo que el otro",
  this.line, this.column);
  tree.excepciones.push(error);
  return null;
      }
    }
  }
  else if(this.Expresion.type.type!==this.type.type)
  {

    const error = new Exceptionn('Semantico',
  "la exprecion no es del mismo tipo ",
  this.line, this.column);
  tree.excepciones.push(error);
  return null;
  }
tree.codigo3d.push(`stack[(int)${aux}]=${exp};`)
return null;
}

}catch(err)
{
  const error = new Exceptionn('Semantico',
  "error inesperado en types",
  this.line, this.column);
  tree.excepciones.push(error);
  return null;
}

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


   }
   }

   else{   this.type = new Type(types.ERROR);return this.MetodoError('El ID ' + this.linstaID[this.linstaID.length-1].identificador + ' es error', tree); }




  }catch(error)
  {const dataa = new Exceptionn('Semantico',error,this.line, this.column);tree.excepciones.push(error);
  tree.pila.pop();
  return dataa;

      }}
     }

MetodoError(informe:string,tree:Tree){
  const error = new Exceptionn('Semantico',informe,this.line, this.column);
  tree.excepciones.push(error);
  if(this.estado){
    this.type = new Type(types.ERROR);
    return error;}
  else {return null;}

}


}
