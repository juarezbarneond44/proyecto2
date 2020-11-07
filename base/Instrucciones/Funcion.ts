import { Continue } from './Continue';
import { Break } from './Break';
import { Return } from './Return';
import { Asignacion } from './Asignacion';

import { declararLista } from './declararLista';
import { Simbol } from '../Simbols/Simbol';
import { Declaracion } from '../Instrucciones/Declaracion';
import { Exceptionn } from '../utilidad/Exceptionn';
import {Node} from "../Abstract/Node";
import {Tabla} from "../Simbols/Tabla";
import {Tree} from "../Simbols/Tree";
import {Type, types} from "../utilidad/Type";

/**
 * Permite imprimir expresiones en la consola
 */
export class Funcion extends Node{
  codigo3direcciones(table: Tabla, tree: Tree) {
    tree.etiquetaReturn=new Array<string>();;
    let listaIDDeclaraciones=new Array<String>();
    const res2 =table.getVariable(this.id);
    if (res2 !== null) {
      const error = new Exceptionn('Semantico',
          "La Funcion "+ this.id+" ya ha sido declarada",
          this.line, this.column);
      tree.excepciones.push(error);
      return null;
    //  tree.console.push(error.toString());
    }
let Simbolo1=new Simbol(true,this.TipoFuncion,this.id,null);
const res1 =table.setVariable(Simbolo1);
if (res1 != null) {
  const error = new Exceptionn('Semantico',
      "La Funcion "+ this.id+" ya ha sido declarada",
      this.line, this.column);
  tree.excepciones.push(error);
  return "error";
}





    tree.pila.push(new Type (types.FUNCION));
    let etiquetaS=tree.getEtiqueta();
    let etiquetaReturn="t"+tree.getContador();
    tree.codigo3d.push(`void ${this.id}(){`);
    tree.etiquetasS.push("L"+etiquetaS);
  // hay que pasar las declaraciones aqui
  let nuevaTabla=new Tabla(table);
if(this.ListaDeclaraciones!=null)
{
  this.ListaDeclaraciones.forEach(element => {
   // console.log(element)
   listaIDDeclaraciones.unshift(element.identifier);
     let sim=element.codigo3direcciones(nuevaTabla,tree);
     sim.temporal=tree.getContador();
     tree.codigo3d.push(`stack[(int)${sim.value}]=t${sim.temporal};`);
     //temporal
     sim.valorInicial=true;
     const res2 = nuevaTabla.setVariable(sim);

  });
}

let tablaInstrucciones=new Tabla(nuevaTabla);
let Simbolo=table.getVariable(this.id);
let vall=tree.getContador();
tree.codigo3d.push(`t${vall}=s+${tree.getSTACK()};`);
Simbolo.cantidadLlamadas="t"+tree.getContador();
tree.punteroReturn=Simbolo.cantidadLlamadas;
Simbolo.temporalreturn=tree.punteroReturn;
Simbolo.entornoFuncion=nuevaTabla;
Simbolo.FuncionListaId=listaIDDeclaraciones;



let resultadoFinal=null;
if(this.ListaInstrucciones!==null){
  for (let x = 0; x < this.ListaInstrucciones.length; x++) {
    tree.etiquetaReturn=new Array<string>();;
    let element = this.ListaInstrucciones[x];

    let val=element.codigo3direcciones(tablaInstrucciones,tree);

    if(val instanceof Return)
    {
      resultadoFinal=val.temporal
    }
    if(val instanceof Break)
    {
      const error = new Exceptionn('Semantico',`No se esperaba un break`,this.line, this.column);tree.excepciones.push(error);

    }
    if(val instanceof Continue){
      const error = new Exceptionn('Semantico',`No se esperaba un continue`,this.line, this.column);tree.excepciones.push(error);
      }



  }
}
tree.punteroReturn=Simbolo.cantidadLlamadas;

// se guarda la funcion en la tabla de simbolos


//let Simbolo=new Simbol(true,this.TipoFuncion,this.id,null);

Simbolo.FuncionInstrucciones=this.ListaInstrucciones;



    tree.pila.pop();
    tree.etiquetasS.pop();
    tree.codigo3d.push(`L${etiquetaS}:`);
    if(resultadoFinal!=null){
    tree.codigo3d.push(`${etiquetaReturn}=${resultadoFinal};`);
    }
    tree.codigo3d.push(`return;`);
    tree.codigo3d.push(`}`);

    tree.etiquetas=5;//L
    tree.contadorP=0;
    tree.contadorS=0;
    return null;
  }
  Traducir(tabla: Tabla, tree: Tree) {
    if(this.ListaInstrucciones!=null){
      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.ListaInstrucciones.length; x++) {
        let element = this.ListaInstrucciones[x];
        if(element instanceof Funcion){
           this.EsAnidada=true;
           }
        }
    }
    // ver que haya una funcion para que sea anidada
    //tabla.Padre=this.id
    //ahora recorrer las instrucciones en busca de declaraciones para cambiarles el nombre y sacarlas
    let arregloIDDeclaraciones:Array<string>=new Array();
    if(this.ListaInstrucciones!==null&&this.EsAnidada){
    for (let x = 0; x < this.ListaInstrucciones.length; x++) {
      const element = this.ListaInstrucciones[x];
      if(element instanceof declararLista){
        element.ListaDeclaraciones.forEach(element2 => {
          let valorr=null
          if(element2 instanceof Declaracion&&this.EsAnidada){
            let bandera=false;
            if(element2.Numero%2!==0)
            {
      // esto es impar
            if(element2.Numero===7||element2.Numero===9){bandera=true;}

              if(element2.Numero===7||element2.Numero===11){

                element2.Numero=8;}else
              {
                element2.Numero+=1;


              }
                  valorr=element2.value;
              arregloIDDeclaraciones.push(element2.identifier+"");
            }else{
              if(element2.Numero===12){element2.Numero=10;valorr=element2.value}
              arregloIDDeclaraciones.push(element2.identifier+"");}
              // hay que transformar la declaracion por asignacion
              element2.identifier=this.id+"_"+element2.identifier;
             let asigna:Asignacion= new Asignacion(""+element2.identifier,valorr,element2.line,element2.column);

            if(bandera){  asigna.type=new Type(types.ARRAY);asigna.listaARRAY=element2.valorArreglo; asigna.exprecion=null}
            this.ListaInstrucciones[x]= asigna;
          }
         });
        tree.Traduccion.push(element.Traducir(tabla,tree));
      }

    }
  }
   if(tree.Traduccion[tree.Traduccion.length-1]===null){tree.Traduccion.pop();}
   let lista_llamadas:Array<string>=new Array();


// ahora ya tenemos la declaracion afuera y la asigacicion adentro

    // tslint:disable-next-line: prefer-for-of
    if(this.ListaInstrucciones!=null){
    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.ListaInstrucciones.length; x++) {
      let element = this.ListaInstrucciones[x];
      if(element instanceof Funcion){

        lista_llamadas.push(element.id+"");
        this.EsAnidada=true;
        //element.EsAnidada=true;
        let nuevatabla=new Tabla(tabla);
        nuevatabla.llamadasHijas=lista_llamadas;
        nuevatabla.EsAnidada=true;
        nuevatabla.VariablesANIDADAS=arregloIDDeclaraciones;
        nuevatabla.Padre=this.id;
        nuevatabla.hija=element.id;
        tabla.EsAnidada=true;
        element.NombreHijo=element.id+"";
       element.id=this.id+"_"+element.id;
       element.Traducir(nuevatabla,tree);
       }
      }
  }
// ya se ejecuta todo


let newTabla2=new Tabla (tabla);
let data="function "+this.id+"(";
if (this.ListaDeclaraciones!==null){
      for (let x = this.ListaDeclaraciones.length-1; x > -1; x--) {
             const declara=this.ListaDeclaraciones[x].Traducir(newTabla2,tree).replace("const","");
        data=data+declara;
        if(x-1>-1){data=data+", ";
      }}}
    data=data+")";
   if (this.TipoFuncion.type===types.OBJET){
    if(this.TipoFuncion.typeObjeto===types.TYPE){ data=data+": "+this.TipoFuncion.nombre;}
    else if(this.TipoFuncion.typeObjeto===types.ARRAY) {
      let aux100=new Type(this.TipoFuncion.typeArray);
      data=data+":"+aux100.toString()+"[]"}
    }else{
      if(this.TipoFuncion.type===types.ANY){}
      else {data=data+": "+this.TipoFuncion.toString();}}

  data=data+"{";
// aqui se debe hacer un recorrido de declaraciones antes del push
// y volverlo una asignacion



//tabla.EsAnidada=true;
if(arregloIDDeclaraciones.length>0){
  arregloIDDeclaraciones.forEach(element => {
    if(element!==null&&tabla.VariablesANIDADAS!=null){ tabla.VariablesANIDADAS.push(element);}
});}


if(lista_llamadas.length>0){
  if(tabla.llamadasHijas===null){tabla.llamadasHijas=new Array<string>();tabla.Padre=this.id;}
  lista_llamadas.forEach(element => {
    if(element!=null){tabla.llamadasHijas.push(element);}
});}

  tree.Traduccion.push(data);


  if(this.NombreHijo===""){tabla.VariablesANIDADAS=arregloIDDeclaraciones}
  let posicionArreglo=tree.Traduccion.length;
  if(this.ListaInstrucciones!==null){
for (let x = 0; x < this.ListaInstrucciones.length; x++) {
  const element = this.ListaInstrucciones[x];

 if(!(element instanceof Funcion)){
   //if(element instanceof declararLista&&this.EsAnidada)
   {

     //  continue;
   }
   element.Traducir(tabla,tree);
  }
}
// aqui se deberia de cambiar todos los nombres de los string del hijo por el nuevo id :,v
//addad


let Simbolo=new Simbol(true,this.TipoFuncion,this.id,null);
Simbolo.entornoFuncion=new Tabla(null);
tabla.setVariable(Simbolo);
tree.Traduccion.push("}");
  }
return null;
  }
 id:String;
 ListaDeclaraciones:Array<Declaracion>;
 TipoFuncion:Type;
 ListaInstrucciones:Array<Node>;
 line:number;
 EsAnidada:boolean;
 column:number;
 NombreHijo:string;
 returntemporal:string;
 contadorLLamada:string;
 constructor(id:string,ListaDeclaraciones:Array<Declaracion>, TipoFuncion:Type,ListaInstrucciones:Array<Node>, line:number,column:number){
super(null,line,column);
this.line=line;
this.column=column;
this.ListaDeclaraciones=ListaDeclaraciones;
this.id=id;
this.ListaInstrucciones=ListaInstrucciones;
this.TipoFuncion=TipoFuncion;
this.EsAnidada=false;
this.contadorLLamada=this.NombreHijo="";

 }
  execute(table: Tabla, tree: Tree) {
 // se debe declarar aqui
 // crear un nuevo entorno y meterle lsa variables;
 // guardar en la table el nombre de la funcion mas el tipo de sus atributos
 // guardar la lista de intrucciones en el value del simbolo
if(table.Previous!=null){
  const error = new Exceptionn('Semantico',
  "La Funcion "+ this.id+" no se puede declarar en una funcion anidada",
  this.line, this.column);
tree.excepciones.push(error);
return null;

}

let newTable=new Tabla(table);
let varableID=this.id;
let listaIDDeclaraciones=new Array<String>();

if(this.ListaDeclaraciones!=null){
for (let x=this.ListaDeclaraciones.length-1;x>= 0;x--){
  listaIDDeclaraciones.push(this.ListaDeclaraciones[x].identifier);

  if(this.ListaDeclaraciones[x].type==null){
    const res=table.getVariable(this.ListaDeclaraciones[x].Identificador);
    if(res!=null){    varableID=varableID+"_"+this.ListaDeclaraciones[x].Identificador;}
    else {
      const error = new Exceptionn('Semantico',
      "el type de la funcion  "+ this.ListaDeclaraciones[x].Identificador+" No existe",
      this.line, this.column);
  tree.excepciones.push(error);
      return null;
    }
  }else{
  varableID=varableID+"_"+this.ListaDeclaraciones[x].type.toString();
  }
 }


  new declararLista(true,this.ListaDeclaraciones,this.line,this.column).execute(newTable,tree);

}else{listaIDDeclaraciones=null;}



if(this.TipoFuncion.type==types.OBJET){
  const res1=table.getVariable(this.TipoFuncion.nombre);
  if(this.TipoFuncion.typeObjeto===types.ARRAY){



  }

  else if(res1==null){
    const error = new Exceptionn('Semantico',
    "el type de la funcion  "+ this.id+" No existe",
    this.line, this.column);
tree.excepciones.push(error);
return null;

  }

if(res1!==null){
  this.TipoFuncion.typeObjeto=res1.type.typeObjeto;
  this.TipoFuncion.nombre=res1.type.nombre;
}
}

let Simbolo=new Simbol(true,this.TipoFuncion,varableID,null);
Simbolo.entornoFuncion=newTable;
Simbolo.FuncionListaId=listaIDDeclaraciones;
Simbolo.FuncionInstrucciones=this.ListaInstrucciones;

const res2 =table.setVariable(Simbolo);
if (res2 != null) {
  const error = new Exceptionn('Semantico',
      "La Funcion "+ this.id+" ya ha sido declarada",
      this.line, this.column);
  tree.excepciones.push(error);
//  tree.console.push(error.toString());
}

    return null;

  }
  ver_Hija(dato:string){
    try{
    //console.log("juanito ss")
  let hija=dato.split("_");
  let padre=this.id.split("_");
  //console.log(hija);
  //console.log(padre)
  for (let x =0; x <hija.length; x++) {

    if(padre[padre.length-x]!==hija[hija.length-x]){


        return false
    }

  }

  return true;

 }catch(error){return false;}
}
}
