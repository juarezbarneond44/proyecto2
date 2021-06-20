import { Node } from "../Abstract/Node";


export class IDArray   {

  identificador:string;
  Listaexprecion:Array<Node>;
  line:number;
  column:number;

  constructor(  identificador:string, Listaexprecion:Array<Node>,line:number,column:number){
     this.identificador=identificador;
    this.Listaexprecion=Listaexprecion;
  }}

