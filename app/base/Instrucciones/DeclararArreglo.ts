import { nuevoArreglo } from './../Expresiones/nuevoArreglo';
import { Identificador } from './../Expresiones/Identificador';
import { Simbol } from './../Simbols/Simbol';

import { Return } from './Return';
import { Continue } from "../Instrucciones/Continue";
import { Break } from '../Instrucciones/Break';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type} from "../utilidad/Type";
import {types} from "../utilidad/Type";
import { trace } from 'console';
import { Expression } from '@angular/compiler';
/**
 * Permite imprimir expresiones en la consola
 */
export class DeclararArreglo extends Node{
  valorInicial:boolean;
  identificador:string;
  cantidadDimenciones:number;
  expresion:Expression;
  arregloExpreciones:Array<Node>;

  constructor(  valorInicial:boolean,identificador:string,tipo:Type,cantidadDimenciones:number,expresion:Expression,arregloexpresion:Array<Node>, linea:number,columna:number)
  {
    super(tipo,linea,columna)
  this.type=tipo
  this.valorInicial=valorInicial;
  this.identificador=identificador;
  this.cantidadDimenciones=cantidadDimenciones;
  this.expresion=expresion;
  this.arregloExpreciones=arregloexpresion;



  }
  codigo3direcciones(tabla: Tabla, tree: Tree) {
    let res=tabla.getVariable(this.identificador);
    if(res!==null){
      const error = new Exceptionn('Semantico',
      "el id del arreglo ya existe",
      this.line, this.column);
  tree.excepciones.push(error);
  return "error";

    }
    let temporal="t"+tree.getContador();
    let tipo=new Type(types.ARRAY)
    tipo.typeArray=this.type.type
    let simbolo=new Simbol(this.valorInicial,tipo,this.identificador,temporal);
    if(this.expresion==null&&this.arregloExpreciones==null)
    {
      tree.codigo3d.push(temporal+"=-1;");
      return null;
    }
    if(this.expresion!==null)
    {
      if(this.expresion instanceof Identificador){}
      if(this.expresion instanceof nuevoArreglo)
      {
        let valor=this.expresion.codigo3direcciones(tabla,tree);
        // seria lo mismo solo que los valores serian -1
        let temporal2="t"+tree.getContador();
        let temporal="t"+tree.getContador();
        let tipo=0;
        switch(this.cantidadDimenciones)
        {
          case 1:
            tree.codigo3d.push(`//---------- 1 dimencion-----------------`)

            tree.codigo3d.push("//agregamos arreglo al heap");
            tree.codigo3d.push(`${temporal}=p;`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=240;");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push(`t1=${valor};`)
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");

            if(this.type.type==types.STRING){tipo=239}
            else if(this.type.type==types.NUMERIC){tipo=238}
            else if(this.type.type==types.BOOLEAN){tipo=237}
            tree.codigo3d.push("t1="+tipo+";");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push(temporal2+"=p;");
            tree.codigo3d.push(`p=p+${valor};`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=-1;");
            tree.codigo3d.push("guardarString();");
            for (let x = 0; x < valor; x++) {
              tree.codigo3d.push(`heap[(int)${temporal2}]=-1;`)
              tree.codigo3d.push(temporal2+"="+temporal2+"+1;");
            }
            tabla.setVariable(simbolo);
            break;
          case 2:
            tree.codigo3d.push(`//---------- 2 dimencion-----------------`)
            //let temporal2="t"+tree.getContador();
            //let temporal="t"+tree.getContador();
            //let tipo=0;
            tree.codigo3d.push("//agregamos arreglo al heap");
            tree.codigo3d.push(`${temporal}=p;`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=241;");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push(`t1=${valor};`)
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");

            if(this.type.type==types.STRING){tipo=239}
            else if(this.type.type==types.NUMERIC){tipo=238}
            else if(this.type.type==types.BOOLEAN){tipo=237}
            tree.codigo3d.push("t1="+tipo+";");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push(temporal2+"=p;");
            tree.codigo3d.push(`p=p+${valor};`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=-1;");
            tree.codigo3d.push("guardarString();");
            for (let x = 0; x < valor; x++) {
              tree.codigo3d.push(`heap[(int)${temporal2}]=-1;`)
              tree.codigo3d.push(temporal2+"="+temporal2+"+1;");
            }
            tabla.setVariable(simbolo);
            break;
          case 3:
            tree.codigo3d.push(`//---------- 2 dimencion-----------------`)
            //let temporal2="t"+tree.getContador();
            //let temporal="t"+tree.getContador();
            //let tipo=0;
            tree.codigo3d.push("//agregamos arreglo al heap");
            tree.codigo3d.push(`${temporal}=p;`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=242;");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push(`t1=${valor};`)
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");

            if(this.type.type==types.STRING){tipo=239}
            else if(this.type.type==types.NUMERIC){tipo=238}
            else if(this.type.type==types.BOOLEAN){tipo=237}
            tree.codigo3d.push("t1="+tipo+";");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push(temporal2+"=p;");
            tree.codigo3d.push(`p=p+${valor};`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=-1;");
            tree.codigo3d.push("guardarString();");
            for (let x = 0; x < valor; x++) {
              tree.codigo3d.push(`heap[(int)${temporal2}]=-1;`)
              tree.codigo3d.push(temporal2+"="+temporal2+"+1;");
            }
            tabla.setVariable(simbolo);
            break;
        }
      }
    }
    else if(this.arregloExpreciones!==null)
    {
   let tem=this.agregarDatos(tabla,tree,this.arregloExpreciones,this.cantidadDimenciones);
   simbolo.value=tem;

   tabla.setVariable(simbolo);
    }




  }
  agregarDatos(tabla: Tabla, tree: Tree,arregloExpreciones:Array<Node>,dimenciones:number)
  {

    switch(dimenciones)
    {
      case 1:
        tree.codigo3d.push(`//---------- 1 dimencion-----------------`)
        let temporal2="t"+tree.getContador();
        let temporal="t"+tree.getContador();
        let tipo=0;
        tree.codigo3d.push("//agregamos arreglo al heap");
        tree.codigo3d.push(`${temporal}=p;`)
        tree.codigo3d.push("t0=p;");
        tree.codigo3d.push("t1=240;");
        tree.codigo3d.push("guardarString();");
        tree.codigo3d.push("t0=p;");
        tree.codigo3d.push(`t1=${arregloExpreciones.length};`)
        tree.codigo3d.push("guardarString();");
        tree.codigo3d.push("t0=p;");

        if(this.type.type==types.STRING){tipo=239}
        else if(this.type.type==types.NUMERIC){tipo=238}
        else if(this.type.type==types.BOOLEAN){tipo=237}
        tree.codigo3d.push("t1="+tipo+";");
        tree.codigo3d.push("guardarString();");
        tree.codigo3d.push(temporal2+"=p;");
        tree.codigo3d.push(`p=p+${arregloExpreciones.length};`)
        tree.codigo3d.push("t0=p;");
        tree.codigo3d.push("t1=-1;");
        tree.codigo3d.push("guardarString();");
        arregloExpreciones.forEach(element => {

            let valor=element.codigo3direcciones(tabla,tree);
            if(element.type.type!==this.type.type)
            {
              const error = new Exceptionn('Semantico',
              `el arreglo no tiene el mismo tipo que la expresion ${element.type.toString()}  ${this.type}`,
              this.line, this.column);
          tree.excepciones.push(error);
          return "error";
            }
           tree.codigo3d.push(`heap[(int)${temporal2}]=${valor};`)
            tree.codigo3d.push(temporal2+"="+temporal2+"+1;");


        });
          return temporal;
        case 2:
          tree.codigo3d.push(`//---------- 2 dimenciones-----------------`)
          let temporal22D="t"+tree.getContador();
          let temporal2D="t"+tree.getContador();
          tree.codigo3d.push("//agregamos arreglo al heap");
          tree.codigo3d.push(`${temporal2D}=p;`)
          tree.codigo3d.push("t0=p;");
          tree.codigo3d.push("t1=241;");
          tree.codigo3d.push("guardarString();");
          tree.codigo3d.push("t0=p;");
          tree.codigo3d.push(`t1=${arregloExpreciones.length};`)
          tree.codigo3d.push("guardarString();");
          tree.codigo3d.push("t0=p;");
          let tipo2D=0;
          if(this.type.type==types.STRING){tipo2D=239}
          else if(this.type.type==types.NUMERIC){tipo2D=238}
          else if(this.type.type==types.BOOLEAN){tipo2D=237}
          tree.codigo3d.push("t1="+tipo2D+";");
          tree.codigo3d.push("guardarString();");
          tree.codigo3d.push(temporal22D+"=p;");
          tree.codigo3d.push(`p=p+${arregloExpreciones.length};`)
          tree.codigo3d.push("t0=p;");
          tree.codigo3d.push("t1=-1;");
          tree.codigo3d.push("guardarString();");
      for (let x = 0; x < arregloExpreciones.length; x++) {
          const dato =arregloExpreciones[x];
          if(!(dato instanceof Array))
          {
            const error = new Exceptionn('Semantico',
            `el arreglo debe tener la misma cantidad de dimenciones`,
            this.line, this.column);
            tree.excepciones.push(error);
            return "error";
          }
          // hay que recorrer el arreglo
            let posArreglo=this.agregarDatos(tabla,tree,dato,dimenciones-1);

            tree.codigo3d.push(`heap[(int)${temporal22D}]=${posArreglo};`)
            tree.codigo3d.push(temporal22D+"="+temporal22D+"+1;");

        }
          return temporal2D;
          case 3:
            tree.codigo3d.push(`//---------- 3 dimenciones-----------------`)
            let temporal33D="t"+tree.getContador();
            let temporal3D="t"+tree.getContador();
            tree.codigo3d.push("//agregamos arreglo al heap");
            tree.codigo3d.push(`${temporal3D}=p;`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=242;");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push(`t1=${arregloExpreciones.length};`)
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push("t0=p;");
            let tipo3D=0;
            if(this.type.type==types.STRING){tipo3D=239}
            else if(this.type.type==types.NUMERIC){tipo3D=238}
            else if(this.type.type==types.BOOLEAN){tipo3D=237}
            tree.codigo3d.push("t1="+tipo3D+";");
            tree.codigo3d.push("guardarString();");
            tree.codigo3d.push(temporal33D+"=p;");
            tree.codigo3d.push(`p=p+${arregloExpreciones.length};`)
            tree.codigo3d.push("t0=p;");
            tree.codigo3d.push("t1=-1;");
            tree.codigo3d.push("guardarString();");
        for (let x = 0; x < arregloExpreciones.length; x++) {
            const dato =arregloExpreciones[x];
            if(!(dato instanceof Array))
            {
              const error = new Exceptionn('Semantico',
              `el arreglo debe tener la misma cantidad de dimenciones`,
              this.line, this.column);
              tree.excepciones.push(error);
              return "error";
            }
            // hay que recorrer el arreglo
              let posArreglo=this.agregarDatos(tabla,tree,dato,dimenciones-1);

              tree.codigo3d.push(`heap[(int)${temporal33D}]=${posArreglo};`)
              tree.codigo3d.push(temporal33D+"="+temporal33D+"+1;");

          }

          return temporal3D;
    }

  }
  execute(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
}



