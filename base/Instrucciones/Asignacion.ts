import { ValorArreglo } from './../Expresiones/ValorArreglo';

import { ArregloValor } from './../Expresiones/ArregloValor';

import { IdentificadorExprecion } from './IdentificadorExprecion';
import { Type, types } from '../utilidad/Type';

import { Simbol } from '../Simbols/Simbol';

import {Node} from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Exceptionn } from '../utilidad/Exceptionn';



export class Asignacion extends Node {
  codigo3direcciones(tabla: Tabla, tree: Tree) {

    const resultado=tabla.getVariable(this.idenfiticador);
    if(resultado==null)
    {
      const error = new Exceptionn('Semantico',
      `No exite id ${this.idenfiticador}`,
      this.line, this.column);
      tree.excepciones.push(error);
      return "error";
    }
    if(!resultado.valorInicial)
    {
      if(resultado.type.type==types.ANY){}
      else {
        const error = new Exceptionn('Semantico',
        `No se puede Asignar a una constante`,
        this.line, this.column);
        tree.excepciones.push(error);
        return "error"
      }
    }

    if(resultado.type.type===types.ARRAY)
    {
      let tipo=new Type(resultado.type.typeArray);
      let val=new ValorArreglo(tipo,resultado.DemencionesArray,this.exprecion,this.listaARRAY,this.line,this.column).codigo3direcciones(tabla,tree);
      tree.codigo3d.push("// asignacion de un arreglo")
      tree.codigo3d.push(resultado.value+"="+val+";");
      return null;
    }

    let valor =this.exprecion.codigo3direcciones(tabla,tree);
     if(resultado.type.type==types.ANY)
    {
      resultado.type=this.exprecion.type;
      tree.codigo3d.push(`//asignacion`);
      tree.codigo3d.push(`stack[(int)${resultado.value}]=${valor};`);
      return null;
    }
    else if(resultado.type.type==this.exprecion.type.type)
    {

      tree.codigo3d.push(`//asignacion`);
      tree.codigo3d.push(`stack[(int)${resultado.value}]=${valor};`);
      return null;
    }
    else{
      const error = new Exceptionn('Semantico',
      `tipos no validos ${resultado.type.toString()} y ${this.exprecion.type.toString()}`,
      this.line, this.column);
      tree.excepciones.push(error);
      return "error";
    }


  }
  Traducir(tabla: Tabla, tree: Tree) {
    let data="";
    let aux=tabla;
    while(aux!==null){
    //  console.log(aux)
      if(aux.EsAnidada){

    //    console.log(aux)
        if(aux.VariablesANIDADAS!==null){
          aux.VariablesANIDADAS.forEach(element => {
            //console.log(this.idenfiticador+ "   "+ element)
            // console.log(this.idenfiticador+ "   "+ aux.Padre)

            if(this.idenfiticador===element||this.idenfiticador===aux.Padre)
            {
             //   g(this.idenfiticador)

              this.idenfiticador=aux.Padre+"_"+ this.idenfiticador;
            }
          });
        }
      //  break;
      }
      aux=aux.Previous;
    }
   //   g(aux)

    if(this.exprecion!=null){
    data=data+this.idenfiticador +"="+this.exprecion.Traducir(tabla,tree)+";";
    }
    else if (this.type!=null){
      if (this.type.type===types.ARRAY){
        let arregloDato12=new ArregloValor(true,this.listaARRAY,10,this.line,this.column).Traducir(tabla,tree)+";";
          data=data+this.idenfiticador+"="+arregloDato12
      }else if(this.type.type===types.TYPE){
        let data2="{";
        for (let x = 0; x < this.listaTYPES.length; x++) {
          data2=data2+this.listaTYPES[x].identificador+":"+this.listaTYPES[x].exprecion.Traducir(tabla,tree);

        if(x+1<this.listaTYPES.length){data2=data2+", ";}

        }
        data2=data2+"}"

        data=data+this.idenfiticador +"="+data2+";";
      }


    }
else if (this.type===null)
{
  return null;
}
    else {


    }


  tree.Traduccion.push(data);
   return null;
  }


  idenfiticador: string;
  exprecion: Node;
  type:Type;
  listaTYPES:Array<IdentificadorExprecion>;
  listaARRAY:Array<any>;

constructor(identificador: string, exprecion: Node, line: number, column: number)
{
  super(null, line, column);
  this.idenfiticador = identificador;
  this.exprecion = exprecion;
  this.type=null;
  this.listaTYPES=new Array();
  this.listaARRAY=new Array();

}
// tslint:disable-next-line: typedef
execute(table: Tabla, tree: Tree) {
  try{

  // si es nulo puede ser un type o un array
  if(this.exprecion==null){
  const info1=table.getVariable(this.idenfiticador);
if (info1==null)
{
  const error = new Exceptionn('Semantico',
  `Id no existe `+this.idenfiticador,
  this.line, this.column);
  tree.excepciones.push(error);
  return error;
}
    if(!info1.valorInicial ){const error = new Exceptionn('Semantico',
    `No se puede asignar a una constante`,
    this.line, this.column);
    if(info1.value==="null" ||info1.value===null){}
    else
    {
      tree.excepciones.push(error);
      return error;
    }

}
// aqui empieza l aasignacion
//  g("entra")
if(this.type.type===types.ARRAY){
//  g(info1)
  if(info1.type.type===types.ARRAY||info1.type.typeObjeto===types.ARRAY){

    let arregloDato1:ArregloValor;
    arregloDato1=new ArregloValor(true,this.listaARRAY,info1.DemencionesArray,this.line,this.column).execute(table,tree);

    if(arregloDato1.type===null){
   //     g(arregloDato1)
      info1.value=arregloDato1.listaValores;
      return null;
    }
    else if(arregloDato1.type.type===types.ERROR){
      return null;

      }

    else{
      if(arregloDato1.type.type===types.TYPE||arregloDato1.type.typeObjeto===types.TYPE){
          if(arregloDato1.type.nombre===info1.type.nombre){

            //  g(arregloDato1)
            info1.value=arregloDato1.listaValores;
            return null;
          }
          else{ //error no son iguales
            let error =new Exceptionn('Semantico', `los types no son los mismos ${info1.type.nombre}  ${arregloDato1.type.nombre} `,this.line, this.column);
                      tree.excepciones.push(error);
                    return error

          }

      }
      else{

        if(arregloDato1.type.type===info1.type.typeArray){
          info1.value=arregloDato1.listaValores;
        //    g(info1)
          return null;
        }else{
          //error no son iguales
          let error =new Exceptionn('Semantico', `los types no son los mismos ${this.type}  ${arregloDato1.type} `,this.line, this.column);
                    tree.excepciones.push(error);
                  return error
        }

      }

    }

  }else{
    const error = new Exceptionn('Semantico',
    `No se puede asignar un tipo ${info1.type.toString()} con un ${this.type.toString()}`,
    this.line, this.column);
    tree.excepciones.push(error);
    return error;

  }



  return null;
}
const resultado=table.getVariable(info1.type.nombre);
if(resultado==null){
  return null;
}
if(resultado.type.typeObjeto===types.TYPE)
{
 //   g("entra11")
  let tablaData=new Tabla(null);
  info1.type.typeObjeto=resultado.type.typeObjeto;
  if(resultado.value instanceof Tabla)
  {

    if(resultado.value.Variables.size===this.listaTYPES.length)
    {
      for (let x = 0; x < this.listaTYPES.length; x++)
      {
        const resultado1=resultado.value.getVariable(this.listaTYPES[x].identificador);
        if(resultado1===null)
        {
          const error = new Exceptionn('Semantico',
          'el atributo '+ this.listaTYPES[x].identificador+" no existe",
          this.line, this.column);
          tree.excepciones.push(error);
          return error;
        }
        const total=this.listaTYPES[x].exprecion.execute(table,tree);
        tablaData.setVariable(new Simbol(true,resultado1.type,resultado1.identifier,total));
      }
      info1.value=tablaData;
      return null;
    }
    else
    {
    //    g(resultado.value.Variables.size);
   //   g(this.listaTYPES.length)
      const error = new Exceptionn('Semantico',
      `El type no tiene el mismo tamaño: `+this.idenfiticador,
      this.line, this.column);
      tree.excepciones.push(error);
      return error;
    }
  }

}
else if(resultado.type.typeObjeto===types.ARRAY)
{
  //  g("entra3333")

}
else
{
const error = new Exceptionn('Semantico',
`el typo de dato no es valido para: `+this.idenfiticador,
this.line, this.column);
tree.excepciones.push(error);
return error;

}
return null;
}
// esto es la parte izi
  const result = this.exprecion.execute(table, tree);
  if(result==null){   const error = new Exceptionn('Semantico',
  `No se puede Asignar un valor Nulo`,
  this.line, this.column);
  tree.excepciones.push(error);
  return error;}
  if (result.valor === "Exception") {
    const error = new Exceptionn('Semantico',
    `No se puede Asignar un valor Error`,
    this.line, this.column);
    tree.excepciones.push(error);
    return error;}

  // hay que buscar el id de la table de simbolos
  let variable: Simbol;
  variable = table.getVariable(this.idenfiticador);
  if (variable == null) {
      const error = new Exceptionn('Semantico',
          'No se ha encontrado la variable ' + this.idenfiticador,
          this.line, this.column);
      tree.excepciones.push(error);
      return error;}
    // hay que ver si tiene tipo o no
  if (variable.type.type===types.ANY){
      variable.type=this.exprecion.type;
      variable.value=result;
      return null;
    }

  if(variable.type.type===this.exprecion.type.type)
    {

      if(variable.type.type==types.ARRAY||variable.type.typeObjeto===types.ARRAY){


        //  g(this.exprecion)
        if(variable.type.typeArray===this.exprecion.type.typeArray)
        {
          if(variable.type.typeArray===types.TYPE){
            if(variable.type.nombre===this.exprecion.type.nombre){
              if(variable.valorInicial){
                variable.value= result;
                return null;}
                else { // es una constante error
                  const error = new Exceptionn('Semantico',
                 'No se puede asignar a una constante ' ,
                 this.line, this.column);
                  tree.excepciones.push(error);return error;
                   }

              }
            else {
              const error = new Exceptionn('Semantico',
              'No se puede asgnar types diferentes '+variable.type.nombre+" "+this.exprecion.type.nombre ,
              this.line, this.column);
               tree.excepciones.push(error);return error;
            }
          }
          if(variable.valorInicial){
            variable.value= result;
            return null;}
            else { // es una constante error
              const error = new Exceptionn('Semantico',
             'No se puede asignar a una constante ' ,
             this.line, this.column);
              tree.excepciones.push(error);return error;

            }

        }
        else{
          //error de tipos no iguales
          const error = new Exceptionn('Semantico','No se puede asgnar types diferentes '+variable.type.nombre+" "+this.exprecion.type.nombre , this.line, this.column);
           tree.excepciones.push(error);return error;
        }

      }
      // ver si no es constante
      if(variable.valorInicial){
      variable.value= result;
      return null;}
      else { // es una constante error
        const error = new Exceptionn('Semantico',
       'No se puede asignar a una constante ' ,
       this.line, this.column);
        tree.excepciones.push(error);return error;

      }
    }
    else if (variable.type.type===types.TYPE||variable.type.typeObjeto==types.TYPE)
    {

      if(this.exprecion.type.type===types.TYPE||this.exprecion.type.typeObjeto==types.TYPE){
        if(variable.type.nombre!==this.exprecion.type.nombre){
          const error = new Exceptionn('Semantico',
          'el nombre del type no es el mismo '+variable.type.nombre+"  "+this.exprecion.type.nombre ,
          this.line, this.column);
           tree.excepciones.push(error);return error;
        }
          if(!variable.valorInicial)
        {
          if(variable.value==="null" ||variable.value===null){}
          else{const error = new Exceptionn('Semantico',
          `No se puede asignar a una constante`,
          this.line, this.column);
          tree.excepciones.push(error);
          return null;}
        }
        variable.value=result;
        return null;
      }
      else{
        const error = new Exceptionn('Semantico',
       'El type de la expresion no es valida' ,
       this.line, this.column);
        tree.excepciones.push(error);return error;
      }
    }
    else if (variable.type.type===types.ARRAY||variable.type.typeObjeto==types.ARRAY){

    }
    else {
      const error = new Exceptionn('Semantico',
      'el type no es valido '+variable.type.toString() ,
      this.line, this.column);
       tree.excepciones.push(error);return error;


    }



  }catch(err){ let error =new Exceptionn('Semantico', err+"",this.line, this.column);
  tree.excepciones.push(error);
  return error;}
  }


}


