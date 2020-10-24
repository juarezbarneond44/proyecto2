import { ArregloValor } from './../Expresiones/ArregloValor';


import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import { Simbol } from "../Simbols/Simbol";


export class Declaracion extends Node {
  codigo3direcciones(tabla: Tabla, tree: Tree) {

if(this.value!==null)
{
  let dato=this.value.codigo3direcciones(tabla,tree);
  let simbol = new Simbol(this.TipoInicial,this.value.type, this.identifier, null);
  let stack=tree.getSTACK();
  let contador=tree.getContador(); //temporales
  simbol.temporal=stack;
  tree.codigo3d.push(`// declaracion`);
  tree.codigo3d.push(`t${contador}=s+${stack};`);
  tree.codigo3d.push(`stack[(int)t${contador}]=${dato};`);
  simbol.value=`t${contador}`;
  this.type=this.value.type;
 return simbol;

}else{
  let contador=tree.getContador();
  let simbol = new Simbol(this.TipoInicial,new Type(types.ANY), this.identifier,`t${contador}`);
  let stack=tree.getSTACK();
   //let contador=tree.getContador();
  simbol.temporal=stack;

  //tree.codigo3d.push("stask[t"+contador+"]=dato;");
 return simbol;


}

//   let simbol = new Simbol(this.TipoInicial,this.value.type, this.identifier, null);


  }
  Traducir(Tabla1: Tabla, tree: Tree) {
    let data="";
    if(this.TipoInicial){data="let ";}
   else{data="const ";}
    switch(this.Numero)
   {
    case 1:
      data=data+this.identifier+"="+this.value.Traducir(Tabla1,tree);
    break;
    case 2:
      data=data+this.identifier;
    break;
    case 3:
      data=data+this.identifier+":"+this.type.toString()+" ="+this.value.Traducir(Tabla1,tree);
    break;
    case 4:
      data=data+this.identifier+":"+this.type.toString();
      break;

    case 5:
      data=data+this.identifier+":"+this.Identificador+" ="+this.value.Traducir(Tabla1,tree);
    break;
    case 6:
      let data1=new Type(types.OBJET);
      data1.nombre=this.Identificador;
      data1.typeObjeto=types.TYPE;
      this.type=data1;
      data=data+this.identifier+":"+this.Identificador;

    break;
    case 7:
     // | identifier ':'TIPO LISTAARRAYS'=' ARRAYLISTA1
      let data7=this.identifier+":"+this.type.toString() ;
      for (let x = 0; x < this.Arrays; x++) {
        data7=data7+"[]";
        }

        let arregloDato1=new ArregloValor(true,this.valorArreglo,this.Arrays,this.line,this.column).Traducir(Tabla1,tree);
        data7=data7+"="+arregloDato1;
        data=data+data7;
      break;
      case 8:
        data=data+this.identifier+":"+this.type.toString() ;
        for (let x = 0; x < this.Arrays; x++) {
          data=data+"[]";
          }

      break;
      case 9:
// | identifier ':'TIPO LISTAARRAYS'=' ARRAYLISTA1
 data=data+this.identifier+":"+this.Identificador ;
for (let x = 0; x < this.Arrays; x++) {
  data=data+"[]";
  }

  let arregloDato12=new ArregloValor(true,this.valorArreglo,this.Arrays,this.line,this.column).Traducir(Tabla1,tree);
  data=data+"="+arregloDato12;


      break;
      case 10:
        data=data+this.identifier+":"+this.Identificador ;
        for (let x = 0; x < this.Arrays; x++) {
          data=data+"[]";
          }

      break;
      case 11:
        data=data+this.identifier+":"+this.type.toString() ;
        for (let x = 0; x < this.Arrays; x++) {
          data=data+"[]";
          }
          data=data+"="+this.value.Traducir(Tabla1,tree)

      break;
      case 12:
        data=data+this.identifier+":"+this.Identificador ;
        for (let x = 0; x < this.Arrays; x++) {
          data=data+"[]";
          }
          data=data+"="+this.value.Traducir(Tabla1,tree)

      break;
   }
return data;

  }
  type: Type;
  identifier: String;
  value: Node;
  TipoInicial: boolean;
  Numero:number;
  Arrays:number;
  Identificador:string;
  valorArreglo:any[]=[];
  /**
   * @constructor Crea el nodo instruccion para la sentencia Declaracion
   * @param type Tipo de la variable
   * @param identifier nombre de la variable
   * @param value valor de la variable
   * @param line Linea de la sentencia if
   * @param column Columna de la sentencia if    let id:numer=12;
   */


  constructor( Numero:number, TipoInicial:boolean,  identifier: String,type: Type, value: Node, line: number, column: number) {
      super(type, line, column);
      this.identifier = identifier;
      this.value = value;
      this.Numero=Numero;
      this.TipoInicial=TipoInicial;
      this.Identificador="";
      this.Arrays=0;
  }
  execute(Table: Tabla, tree: Tree) {
       let simbol: Simbol;
       switch(this.Numero)
      {
          case 1:
            // ejecutamos el valor de laexprecion
            const result = this.value.execute(Table, tree);
            if (result.valor === "Exception") {
             const error = new Exceptionn('Semantico',
             `No se puede declarar un valor Error`,
             this.line, this.column);
             tree.excepciones.push(error);
             return null;
             }
              // se agrega el simbolo a la tabla cochina


            simbol = new Simbol(this.TipoInicial,this.value.type, this.identifier, result);

            //console.log(simbol)
            /*
            const res = Tabla.setVariable(simbol);
            if (res != null) {
                  const error = new Exception('Semantico',
                      res,
                      this.line, this.column);
                  tree.excepciones.push(error);
                 // tree.console.push(error.toString());
              }
              */
            return simbol;
          case 2:
            simbol = new Simbol(this.TipoInicial,new Type(types.ANY), this.identifier, null);
          /*
            const res2 = Tabla.setVariable(simbol);
            if (res2 != null) {
                  const error = new Exception('Semantico',
                      res2,
                      this.line, this.column);
                  tree.excepciones.push(error);
                //  tree.console.push(error.toString());
              }
              */
            return simbol;
          case 3:
          const result1 = this.value.execute(Table, tree);
          if (result1.valor === "Exception") {
            const error = new Exceptionn('Semantico',
            `No se puede declarar un valor Error`,
            this.line, this.column);
            tree.excepciones.push(error);
            return null;
            }
          if(this.value.type.type === this.type.type){
             simbol = new Simbol(this.TipoInicial,this.value.type, this.identifier, result1);
           /* const res3 = Tabla.setVariable(simbol);
            if (res3 != null) {
                  const error = new Exception('Semantico',
                      res3,
                      this.line, this.column);
                  tree.excepciones.push(error);
                  return error;
                //  tree.console.push(error.toString());
              }
              */
            return simbol;

          }
            else
            {
              const error = new Exceptionn('Semantico',
              "Los tipos no son iguales "+this.value.type+" "+this.type,
              this.line, this.column);
              tree.excepciones.push(error);
              return error;
            }
          case 4:

           simbol = new Simbol(this.TipoInicial, this.type, this.identifier, null);
           /* const res4 = Tabla.setVariable(simbol);
            if (res4 != null) {
                  const error = new Exception('Semantico',
                      res4,
                      this.line, this.column);

                  tree.excepciones.push(error);
                  return error;
                //  tree.console.push(error.toString());
              }
              */
            return simbol;
            case 5:

              const res=Table.getVariable(this.Identificador);
              if(res===null)
              {
                const error = new Exceptionn('Semantico',
                "No existe el tipo "+this.Identificador,
                this.line, this.column);
                tree.excepciones.push(error);
                return error;
              }
              const data=this.value.execute(Table,tree);
              if(this.value.type.nombre===res.identifier&& (res.type.typeObjeto===types.TYPE||types.TYPE===this.value.type.type))
              { let nuevaTabla=new Tabla(null);
                if(data instanceof Tabla){

                  data.Variables.forEach(element => {

                  nuevaTabla.setVariable(new Simbol(true,element.type,element.identifier,element.value));
                  });
                }
                let sim=new Type(types.OBJET);
                sim.typeObjeto=types.TYPE;
                sim.nombre=this.Identificador;
              return simbol = new Simbol(this.TipoInicial,sim, this.identifier, nuevaTabla);
              }else {
              const error = new Exceptionn('Semantico',
              "los tipos no son iguales "+this.value.type.nombre+' con '+res.identifier,
              this.line, this.column);
              tree.excepciones.push(error);
              return error;


              }
              case 6:
                const resx=Table.getVariable(this.Identificador);
                if(resx===null){
                  const error = new Exceptionn('Semantico',
                  "No existe el tipo "+this.Identificador,
                  this.line, this.column);
                  tree.excepciones.push(error);
                  return error;

                }
                  let data1=new Type(types.OBJET);
                  data1.nombre=this.Identificador;
                  data1.typeObjeto=types.TYPE;
                return simbol = new Simbol(this.TipoInicial,data1, this.identifier, null);
                case 7:
               let arregloDato1:ArregloValor;
               arregloDato1=new ArregloValor(true,this.valorArreglo,this.Arrays,this.line,this.column).execute(Table,tree);
             //  console.log(this)
            // console.log(arregloDato1)
                let data10=new Type(types.OBJET);
               // data10.nombre=this.Identificador;
               if(arregloDato1.type===null){
                let data10=new Type(types.OBJET);
                data10.typeObjeto=types.ARRAY;
                data10.typeArray=this.type.type;

                let sim10=new Simbol(this.TipoInicial,data10,this.identifier,arregloDato1.listaValores);
                sim10.DemencionesArray=this.Arrays
              // console.log(sim10)
                return sim10;
               }
               if(arregloDato1.type.type===types.ERROR){
                return new Exceptionn('Semantico', `Los Tipos del arreglo no son los mismos`,this.line, this.column);
               }
                data10.typeObjeto=types.ARRAY;
                data10.typeArray=this.type.type;
                if(this.type.type===arregloDato1.type.type){
                let sim10=new Simbol(this.TipoInicial,data10,this.identifier,arregloDato1.listaValores);
                sim10.DemencionesArray=this.Arrays
            //    console.log(sim10)
                return sim10;
                }else{
                    let error =new Exceptionn('Semantico', `los types no son los mismos ${this.type}  ${arregloDato1.type} `,this.line, this.column);
                    tree.excepciones.push(error);
                  return error
                }
                case 8:
                  let data101=new Type(types.OBJET);
                 // data10.nombre=this.Identificador;
                  data101.typeObjeto=types.ARRAY;
                  data101.typeArray=this.type.type;

                  let sim101=new Simbol(this.TipoInicial,data101,this.identifier,null);
                  sim101.DemencionesArray=this.Arrays
                  return sim101;
                case 9:
                  const res11=Table.getVariable(this.Identificador);
                  if(res11===null){
                    const error = new Exceptionn('Semantico',
                    "No existe el tipo "+this.Identificador,
                    this.line, this.column);
                    tree.excepciones.push(error);
                    return error;
                  }
                 let arregloDato2:ArregloValor;
                 arregloDato2=new ArregloValor(false,this.valorArreglo,this.Arrays,this.line,this.column).execute(Table,tree)
                //  console.log(this)
              //  console.log(arregloDato2)
                   let data11=new Type(types.OBJET);
                  // data11.nombre=this.Identificador;
                  if(arregloDato2.type===null){
                   let data11=new Type(types.OBJET);
                   data11.typeObjeto=types.ARRAY;
                   data11.typeArray=types.TYPE;
                   data11.nombre=this.Identificador;
                   let sim10=new Simbol(this.TipoInicial,data11,this.identifier,arregloDato2.listaValores);
                   sim10.DemencionesArray=this.Arrays
                  // console.log(sim10)
                  // console.log(arregloDato2)
                   return sim10;
                  }
                  if(arregloDato2.type.type===types.ERROR){
                      this.type=new Type(types.ERROR);
                   return new Exceptionn('Semantico', `Los Tipos del arreglo no son los mismos`,this.line, this.column);
                  }
                   data11.typeObjeto=types.ARRAY;
                   data11.typeArray=types.TYPE;
                   data11.nombre=this.Identificador;
                   if(this.type.nombre===arregloDato2.type.nombre){

                  let sim10=new Simbol(this.TipoInicial,data11,this.identifier,this.value);
                  sim10.DemencionesArray=this.Arrays
                   return sim10;
                   }else{
                       let error =new Exceptionn('Semantico', `los types no son los mismos ${this.type}  ${arregloDato2.type} `,this.line, this.column);
                       tree.excepciones.push(error);
                     return error;
                    }
                case 10:
                  const res12=Table.getVariable(this.Identificador);
                  if(res12===null){
                    const error = new Exceptionn('Semantico',
                    "No existe el tipo "+this.Identificador,
                    this.line, this.column);
                    tree.excepciones.push(error);
                    return error;
                  }
                  data11.typeObjeto=types.ARRAY;
                   data11.typeArray=types.TYPE;
                   data11.nombre=this.Identificador;
                  let sim10=new Simbol(this.TipoInicial,data11,this.identifier,null);
                    sim10.DemencionesArray=this.Arrays;
                   return sim10;
                case 11:
                  const result3 = this.value.execute(Table, tree);
                  if (result3.valor === "Exception") {
                   const error = new Exceptionn('Semantico',
                   `No se puede declarar un valor Error`,
                   this.line, this.column);
                   tree.excepciones.push(error);
                   return null;
                   }
                   if(this.value.type.typeArray===this.type.type){

                        let sim10=new Simbol(this.TipoInicial,this.value.type,this.identifier,result3);
                        sim10.DemencionesArray=this.Arrays
                        //console.log(sim10)
                        return sim10;
                   }
                   else{
                    let error =new Exceptionn('Semantico', `los types no son los mismos ${this.type}  ${this.value.type} `,this.line, this.column);
                    tree.excepciones.push(error);
                  return error;
                   }
                case 12:
                  const result31 = this.value.execute(Table, tree);
                  if (result31.valor === "Exception") {
                   const error = new Exceptionn('Semantico',
                   `No se puede declarar un valor Error`,
                   this.line, this.column);
                   tree.excepciones.push(error);
                   return null;
                   }
                   const elid=Table.getVariable(this.Identificador);
                   if(elid===null){  let error =new Exceptionn('Semantico', `no existe el id ${this.Identificador}`,this.line, this.column);
                   tree.excepciones.push(error);
                 return error;}
                     if(this.value.type.nombre===elid.type.nombre){
                        let sim10=new Simbol(this.TipoInicial,this.value.type,this.identifier,result31);
                        sim10.DemencionesArray=this.Arrays;
                        return sim10;}
                        else{ let error =new Exceptionn('Semantico', `los types no son los mismos ${this.Identificador}  ${this.value.type.nombre} `,this.line, this.column);
                        tree.excepciones.push(error);}
                       break;




      }



      const error = new Exceptionn('Semantico',
      "Declaracion No Valida "+this.Identificador,
      this.line, this.column);
      tree.excepciones.push(error);
      return error;


    }

}




