import { Identificador } from './Identificador';
import { ArregloValor } from './ArregloValor';
import { Declaracion } from './../Instrucciones/Declaracion';
import { declararLista } from './../Instrucciones/declararLista';
import { Asignacion } from './../Instrucciones/Asignacion';
import { Return } from '../Instrucciones/Return';
import {  types, Type } from '../utilidad/Type';
import { Node } from "../Abstract/Node";
import { Tabla } from "../Simbols/Tabla";
import { Tree } from "../Simbols/Tree";
import { Simbol } from "../Simbols/Simbol";
import { Exceptionn } from "../utilidad/Exceptionn";

/**
 * @class Nodo expresion identificador que obtendra el valor de una variable
 */
export class FuncionEjecutar extends Node {
  codigo3direcciones(Tabla: Tabla, tree: Tree) {
    throw new Error('Method not implemented.');
  }
  Traducir(tabla: Tabla, tree: Tree) {
    //console.log(this);
    let info="";
    if(this.ListaExpreciones!=null){
      for (let x = 0; x < this.ListaExpreciones.length; x++) {
        info=info+this.ListaExpreciones[x].Traducir(tabla,tree);
        if(x+1<this.ListaExpreciones.length){info=info+",";}

      }
    }
    let aux=tabla;

    while(aux!==null){
      if(aux.EsAnidada){
      //  console.log(aux)
        if(aux.llamadasHijas!==null){

          aux.llamadasHijas.forEach(element => {
          //  console.log(this.identifier+"   "+element)


            if(this.id===element&&this.id===aux.hija)
            {
             // console.log(this.identifier)

              this.id=aux.Padre+"_"+ this.id;
            }else if (this.id===element&&(this.id!==aux.hija))
            {
              if(aux.hija===""){this.id=aux.Padre+"_"+this.id;}
              else{this.id=aux.Padre+"_"+aux.hija+"_" +this.id;}

            }
          });

        }
        break;
      }
      aux=aux.Previous;
    }


    let dato=`${this.id}(${info})` ;
    if(this.tipo){
      return dato;
    }else {
      tree.Traduccion.push(dato+";");
      return null;
    }

  }
id:string;
ListaExpreciones:Array<Node>;
tipo:boolean;
valor:Object;
datojuan:any;
anidada:boolean
constructor(tipo:boolean,id:string,ListaExpreciones:Array<Node>,line:number,Column:number){
  super(null,line,Column);
  this.id=id;
  this.ListaExpreciones=ListaExpreciones;
  this.tipo=tipo;
  this.datojuan=null;
  this.anidada=false;

}
  execute(table: Tabla, tree: Tree) {
   try{
    let nombre=this.id+this.nombre(this.ListaExpreciones,table,tree);
      // ya tenemos el nombre ahora a buscar
      let sim=table.getVariable(nombre);
      let EntornoAnidado;
      //if(table.EsAnidada){EntornoAnidado=this.EntornoAnidado(table);}
      //else{
      EntornoAnidado=this.entorno(table);
      //}

    EntornoAnidado.EsAnidada=table.EsAnidada;
    let newEntorno=new Tabla(EntornoAnidado );
    newEntorno.EsAnidada=table.EsAnidada;
if(sim==null){
  const error = new Exceptionn('Semantico',`Funcion no existe `+nombre,this.line, this.column);tree.excepciones.push(error);
  tree.pila.pop();
  return error;
}

    for(let x=0;x<this.ListaExpreciones.length;x++){
     // console.log(this.ListaExpreciones[x])
      if(this.ListaExpreciones[x].type.type===types.TYPE||this.ListaExpreciones[x].type.typeObjeto===types.TYPE)
      {

let valorr=new Simbol(true,this.ListaExpreciones[x].type,sim.FuncionListaId[x],this.ListaExpreciones[x].execute(table,tree));
        newEntorno.setVariable(valorr);
      }
      else {
        let aux=this.ListaExpreciones[x] ;
        if(aux instanceof FuncionEjecutar){

         // console.log(aux)
          newEntorno.setVariable(new Simbol(true,aux.type,sim.FuncionListaId[x],aux.datojuan));
        }else {
          const datos=this.ListaExpreciones[x].execute(table,tree);

          let sim10=new Simbol(true,this.ListaExpreciones[x].type,sim.FuncionListaId[x],datos)
          if(this.ListaExpreciones[x].type.typeObjeto===types.ARRAY){
             // const aux=this.ListaExpreciones[x]

             const aux=this.ListaExpreciones[x];
             if(aux  instanceof Identificador){
             const arreglo=table.getVariable(aux.identifier);
             //console.log("******************")
             //console.log(aux)
             //console.log(arreglo)
             if(arreglo!==null){
               sim10.DemencionesArray=arreglo.DemencionesArray;
             }
             }
             newEntorno.setVariable( sim10);




             // const simaux=table.getVariable(this.ListaExpreciones[x].)
          }
          else{
          newEntorno.setVariable( sim10);
          }
      }
 // newEntorno.setVariable(new Simbol(true,this.ListaExpreciones[x].type,sim.FuncionListaId[x],this.ListaExpreciones[x].execute(table,tree)));
    }}
    tree.pila.push(new Type (types.FUNCION));
// ahora vienen las instrucciones
    const instrucciones=sim.FuncionInstrucciones;
if(instrucciones===null){return null;}
    for(let x=0;x<instrucciones.length;x++){
 if(instrucciones[x]+""===";"){continue;}
  let aux2=instrucciones[x] ;
 // console.log(aux2)

 if(aux2 instanceof FuncionEjecutar){
  let dato=this.ver_Hija(aux2.id);
  if(dato){  aux2.anidada=true;}
 }else if (aux2 instanceof Asignacion){

   const aux3=aux2.exprecion;
   if(aux3 instanceof FuncionEjecutar){
    let dato=this.ver_Hija(aux3.id);
    if(dato){  aux3.anidada=true;}
   }
 }else if (aux2 instanceof declararLista)
 {
  aux2.ListaDeclaraciones.forEach(element => {
    if(element instanceof Declaracion){
      let dato=element.value;
      if(dato instanceof FuncionEjecutar){
        let dato3=this.ver_Hija(dato.id);
        if(dato3){  dato.anidada=true;}
      }
    }
   });
 }

 let res=instrucciones[x].execute(newEntorno,tree);

   if(res instanceof Return){

   if((res.type.type===types.TYPE||res.type.typeObjeto===types.TYPE)&&sim.type.typeObjeto==types.TYPE){

    if(sim.type.nombre==res.type.nombre){
    tree.pila.pop(); this.datojuan=res.dato;   this.type=res.type;return res.dato;}

    else{ const error = new Exceptionn('Semantico',`el type del return no es valido`,this.line, this.column);tree.excepciones.push(error);
    tree.pila.pop();
    return error;
  }}
else if(res.type.typeObjeto===types.ARRAY){
    {
    //console.log(res)
    this.datojuan=res.dato;

    this.type=new Type(res.type.typeArray);
    return res.dato

  }
}

 else if(res.type.type===sim.type.type||sim.type.type==types.ANY){tree.pila.pop();  this.datojuan=res.dato;  this.type=res.type; return res.dato;}

else if (sim.type.type==types.VOID&&res.type.type==types.VOID){tree.pila.pop();  this.datojuan=null  ;this.type=res.type;return null;}
      else {
      const error = new Exceptionn('Semantico',`el type del return no es valido`,this.line, this.column);tree.excepciones.push(error);
      tree.pila.pop();
      return error;
      }
      }

}



}catch(error)
{const dataa = new Exceptionn('Semantico',error+"",this.line, this.column);tree.excepciones.push(dataa);
tree.pila.pop();
return dataa;

}
}

  nombre(aux:Array<Node>,ent:Tabla,tree:Tree){
    let dato="";
    if(aux!=null){

      aux.forEach(element => {
        const data=element.execute(ent,tree);

        if(element.type.type===types.TYPE||element.type.type===types.ARRAY||element.type.type===types.OBJET)
          {
          if(element.type.typeObjeto==types.ARRAY){

            if(element.type.typeArray==types.TYPE){
              dato=dato+"_"+element.type.nombre;
            }
            else{
              const valorr=new Type(element.type.typeArray);
              dato=dato+"_"+valorr.toString();

            }

          }else{
          dato=dato+"_"+element.type.nombre;
          }
        }
        else{dato=dato+"_"+element.type.toString();}
      });

    }
    return dato;
  }
entorno(aux:Tabla){
  while(aux.Previous!=null){aux=aux.Previous;}
  return aux;
}
ver_Hija(dato:string){
  //console.log("juanito ss")
let arreglo=dato.split("_");
let padre=this.id.split("_");
for (let x = 0; x < padre.length; x++) {

  if(padre[x]!==arreglo[x]){
      return false;
  }

}

return true;

}
EntornoAnidado(aux:Tabla)
{
 let aux2=aux;
  try{
    while(aux2.Previous.Previous!=null){aux2=aux2.Previous;}
    return aux2;

}catch(error){return this.entorno(aux);}}
}

