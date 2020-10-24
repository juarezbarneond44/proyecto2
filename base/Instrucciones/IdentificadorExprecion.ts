import { Node } from "../Abstract/Node";



export class IdentificadorExprecion   {

  identificador:string;
  exprecion:Node;

  constructor(  identificador:string, exprecion:Node,line:number,column:number){
     this.identificador=identificador;
    this.exprecion=exprecion;
  }}

