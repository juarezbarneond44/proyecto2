%{
const {Primitive} = require('../Expresiones/Primitive');
const {Arithmetic} = require('../Expresiones/Arithmetic');
const {Identificador} = require('../Expresiones/Identificador');
const {Ternario} = require('../Expresiones/Ternario');
const {Print} = require('../Instrucciones/Print');
const {Excepcionn} = require('../utilidad/Exceptionn');
const {Type, types} = require('../utilidad/Type');
const {Tree} = require('../Simbols/Tree');
const {Declaracion} = require('../Instrucciones/Declaracion');
const {Asignacion} = require('../Instrucciones/Asignacion');
const {declararLista} = require('../Instrucciones/declararLista');
const {While} = require('../Instrucciones/While');
const {IF} = require('../Instrucciones/IF');
const {DoWhile} = require('../Instrucciones/DoWhile');
const {Incremento} = require('../utilidad/Incremento');
const {Exceptionn} = require('../utilidad/Exceptionn');
const {For} = require('../Instrucciones/For');
const {Case} = require('../Instrucciones/Case');
const {Switch} = require('../Instrucciones/Switch');
const {Break} = require('../Instrucciones/Break');
const {Continue} = require('../Instrucciones/Continue');
const {Return} = require('../Instrucciones/Return');
const {Funcion} = require('../Instrucciones/Funcion');
const {TypeDeclaracion} = require('../Instrucciones/TypeDeclaracion');
const {FuncionEjecutar} = require('../Expresiones/FuncionEjecutar')
const {Parentesis} = require('../Expresiones/Parentesis');
const {DeclararType} = require('../Instrucciones/DeclararType');
const {IdentificadorExprecion} = require('../Instrucciones/IdentificadorExprecion');
const {ListaIdentificado} = require('../Instrucciones/ListaIdentificado');
const {ForIn} = require('../Instrucciones/ForIn');
const {IDArray} = require('../Instrucciones/IDArray');
const {GraficarEntorno} = require('../Instrucciones/GraficarEntorno');
const {ForOF} = require('../Instrucciones/ForOF');
const {StringEspecial} = require('../Expresiones/StringEspecial');
const {ArrayBusqueda} = require('../Expresiones/ArrayBusqueda');
const {ArrayInstruccion} = require('../Instrucciones/ArrayInstruccion');
const {ArrayLength} = require('../Expresiones/ArrayLength');
const {ArraPush} = require('../Instrucciones/ArraPush');
const {ArrayPop} = require('../Instrucciones/ArrayPop');
const {StringLength} = require('../Expresiones/StringLength');
const {StringCharAt} = require('../Expresiones/StringCharAt');
const {StringToLowerCase} = require('../Expresiones/StringToLowerCase');
const {StringToUpperCase} = require('../Expresiones/StringToUpperCase');
const {StringConcat} = require('../Expresiones/StringConcat');
const {DeclararArreglo} = require('../Instrucciones/DeclararArreglo');
const {nuevoArreglo} = require('../Expresiones/nuevoArreglo');

var pilaFuncion=new Array();
var pilaError=new Array();
var pilaprint=new Array();
var token_error;

%}
%lex
%options case-insensitive
entero [0-9]+
decimal {entero}("."{entero})?
stringliteral ((\"[^"]*\") |(\'[^']*\'))
identifier ([a-zA-Z_])[a-zA-Z0-9_]*
sringSpecial ((\`[^`]*\`) )


%%

((\/\*)[^\*\/]*(\*\/))          /* */
[ \\\t\r\n\f]              /* */
\s+                   /* skip whitespace */
(\/\/[^\n]*)            /* */


{decimal}              return 'decimal'
{sringSpecial}       return 'STRINGESPECIAL'
{stringliteral}       return 'STRING_LITERAL'
"**"                   return '**'
"/"                   return '/'
";"                   return ';'
"--"                   return '--'
"-"                   return '-'
","                   return ','
"++"                   return '++'
"+"                   return '+'

"?"                   return '?'

"*"                   return '*'
":"                   return ':'

"%"                   return '%'


"<="                  return '<='
">="                  return '>='
"<"                   return '<'
">"                   return '>'
"=="                  return '=='
"!="                  return '!='
"||"                  return '||'
"&&"                  return '&&'
"!"                   return '!'
"="                   return '='
".length"                return '.length'
".charAt"                return '.charAt'
".toLowerCase"          return '.toLowerCase'
".toUpperCase"          return '.toUpperCase'
".concat"              return '.concat'

"."                   return '.'

"("                   return '('
")"                   return ')'
"["                   return '['
"]"                   return ']'
"{"                   return '{'
"}"                   return '}'

"true"                return 'true'
"return"                return 'return'
"graficar_ts"          return 'graficar_ts'
"for"                return 'for'


"new"                return 'new'
"array"                return 'array'
"in"                return 'in'
"of"              return 'of'
"let"               return 'let'
"const"               return 'const'
"false"               return 'false'
"console.log"         return 'console.log'
"if"                  return 'if'
"null"                  return 'null'
"else"                return 'else'
"break"               return 'break'
"switch"               return 'switch'
"case"               return 'case'
"default"               return 'default'
"continue"            return 'continue'
"while"               return 'while'
"numeric"             return 'numeric'
"function"             return 'function'
"number"             return 'number'
"string"              return 'string'
"boolean"             return 'boolean'
"push"             return 'push'
"do"             return 'do'

"void"             return 'void'
"Array"             return 'Array'
"type"             return 'type'
"pop"             return 'pop'
{identifier}          return 'identifier'
. {

    pilaError.push(new Exceptionn('Lexico', "no es un caracter valido: "+yytext,yylloc.first_line, yylloc.first_column));
}

<<EOF>>	          return 'EOF'

/lex
%right '?'
%left 'else'
%left '||'
%left '&&'
%left '==', '!='
%left '>=', '<=', '<', '>'
%left '+' '-''++''--'
%left '*' '/' '%'
%left '**'
%left '.length','.charAt','.toLowerCase','.toUpperCase','.concat'


%right '!'
%left UMENOS



%start INICIO
%%

INICIO : INSTRUCCIONES EOF {$$ = new Tree($1,pilaError);pilaError=new Array(); return $$;}
| EOF {$$=null;}
;

ERROR: error ';' { pilaError.push(new Exceptionn('Sintactico',"Se encontro un error En la instruccion",@1.first_line-1, @1.first_column));}
|error '}'';' { pilaError.push(new Exceptionn('Sintactico',"Se encontro un error En la instruccion",@1.first_line-1, @1.first_column));}
|error '}' { pilaError.push(new Exceptionn('Sintactico',"Se encontro un error En la instruccion",@1.first_line-1, @1.first_column));}
;

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION   { $$ = $1;
                 if($2+""===";"){ }
                 else  if($2+""==="}"){}
                 else  if ($2+""==="};"){}
                 else { $$.push($2);}   }

              | INSTRUCCION             {

                 if($1+""===";"){ $$ = [];}
                 else  if($1+""==="}"){$$ = [];}
                  else  if ($1+""==="};"){$$ = [];}

                 else {$$ = [$1];}

                 }
              ;

INSTRUCCION : PRINT  ';' {$$ = $1;}
            | TIPOINICIAL  LISTADECLARACIONES   ';'  {$$=new declararLista($1,$2,@1.first_line, @1.first_column);}
            | ASIGNACION  ';'  {$$=$1;}
            | IF         {$$=$1;}
            | WHILE         {$$=$1;}
            | DOWHILE       {$$=$1;}
            |INCREMENTO  ';'    {$$=$1;}
            | 'for' FOR     {$$=$2;}
            | SWITCH {$$=$1;}
            | BREAK ';' {$$=$1;}
            | CONTINUE ';' {$$=$1;}
            |FUNCION  {$$=$1;}
            | RETURN ';' {$$=$1;}
            |FUNCIONEJECUTAR ';' {$1.tipo=false;$$=$1;}
            |TYPE  ';' {$$=$1;}
            | DECLARARTYPE ';'{$$=$1;}
            | LISTADEIDS '=' EXPRESION ';'  {$$ = new ListaIdentificado(false,$1,$3,@1.first_line,  @1.first_column);}
            |GRAFICARENTORNO {$$=$1;}
            //|AsignarArreglo ';'{$$=$1}
            |DECLARARARREGLO ';'{$$=$1}


           //|  ERROR {}
            ;



GRAFICARENTORNO:'graficar_ts' '(' ')'';' {$$=new GraficarEntorno(@1.first_line,  @1.first_column);};


DECLARARARREGLO: TIPOINICIAL  'identifier' ':' TIPO  LISTAARRAYS {$$=new DeclararArreglo($1,$2,$4,$5,null,null,@1.first_line,  @1.first_column);}
| TIPOINICIAL  'identifier' ':' TIPO LISTAARRAYS '='EXPRESION  {$$=new DeclararArreglo($1,$2,$4,$5,$7,null,@1.first_line,  @1.first_column);}
|TIPOINICIAL  'identifier' ':' TIPO LISTAARRAYS '='ARRAYLISTA1  {$$=new DeclararArreglo($1,$2,$4,$5,null,$7,@1.first_line,  @1.first_column);}
;

AsignarArreglo: 'identifier' ARRAYBUSCAR '=' ARRAYLISTA1 {$$=new ArrayInstruccion($1,$2,$4,null,@1.first_line,  @1.first_column);}
               |'identifier' ARRAYBUSCAR '=' EXPRESION   {$$=new ArrayInstruccion($1,$2,null,$4,@1.first_line,  @1.first_column);}
;


BREAK: 'break' {$$=new Break(@1.first_line, @1.first_column);}

;
CONTINUE: 'continue' {$$=new Continue(@1.first_line, @1.first_column);}
;
RETURN: 'return' EXPRESION {$$=new Return($2,@1.first_line, @1.first_column);}
| 'return'  {$$=new Return(null,@1.first_line, @1.first_column);}
| 'return' ARRAYBUSCAR  {var dato=new Return(null,@1.first_line, @1.first_column);dato.arrays=$2; $$=dato;}
| 'return' LISTAARRAYS  {var dato=new Return(null,@1.first_line, @1.first_column);dato.arrays=[]; $$=dato;}
;

FUNCION: 'function' identifier  '('  LISTADECLARACIONESFUNCION')'  TIPOFUNCION LISTAINTRUCCIONFUNCION {$$ =new Funcion($2,$4,$6,$7 ,@1.first_line, @1.first_column); pilaFuncion=new Array();}
   |'function' identifier  '('  ')'  TIPOFUNCION  LISTAINTRUCCIONFUNCION {$$ =new Funcion($2,null,$5,$6 ,@1.first_line, @1.first_column); pilaFuncion=new Array();}
;
LISTADECLARACIONESFUNCION :DECLARACIONFUNCION   LISTADECLARACIONESFUNCION1 { $$ = $2; $$.push ($1); }
;
LISTADECLARACIONESFUNCION1: ',' DECLARACIONFUNCION LISTADECLARACIONESFUNCION1{  $$ = $3; $$.push ($2);}
                          | { $$ = []}
                          ;


DECLARACIONFUNCION:  'identifier' ':' TIPO {$$= new Declaracion(4,false,$1,$3,null,@1.first_line, @1.first_column);}
                  |  'identifier' ':' identifier {var dec=new Declaracion(6,false,$1,null,null,@1.first_line, @1.first_column);  dec.Identificador=$3;  $$=dec;}
                  | identifier ':'TIPO LISTAARRAYS   {var dec=new Declaracion(8,false,$1,$3,null,@1.first_line, @1.first_column);  dec.Arrays=$4;  $$=dec;}
                  |  'identifier' ':' identifier LISTAARRAYS  {var dec=new Declaracion(10,false,$1,null,null,@1.first_line, @1.first_column);  dec.Identificador=$3; dec.Arrays=$4; $$=dec;}
;
TIPOFUNCION: ':' TIPO {$$=$2;}
           | {$$=new Type(types.ANY);}
           |':' identifier {var data=new Type(types.OBJET);data.nombre=$2; $$=data;}
           |':' TIPO  LISTAARRAYS {var dato=new Type(types.OBJET);dato.typeObjeto=types.ARRAY;dato.typeArray=$2.type; $$=dato;}
;
LISTAINTRUCCIONFUNCION:'{'INSTRUCCIONES '}' {$$=$2;}
| '{''}'{$$=null};




INCREMENTO:identifier '++' {$$=new Incremento(true,true,false,$1,@1.first_line, @1.first_column);}
          |identifier '--' {$$=new Incremento(true,false,false,$1,@1.first_line, @1.first_column);}
          | '++' identifier   {$$=new Incremento(true,true,true,$2,@1.first_line, @1.first_column);}
          | '--' identifier  {$$=new Incremento(true,false,true,$2,@1.first_line, @1.first_column);}
          ;
DOWHILE: 'do' BLOQUEINIF 'while' '('EXPRESION ')'   {$$= new DoWhile($5,$2,@1.first_line, @1.first_column);}
|'do' BLOQUEINIF 'while' '('EXPRESION ')' ';'  {$$= new DoWhile($5,$2,@1.first_line, @1.first_column);}
;
WHILE:  'while' '('EXPRESION ')' BLOQUEINIF {$$= new While($3,$5,@1.first_line, @1.first_column);}
      ;

SWITCH:  'switch' '('EXPRESION')' '{'LCASES'}'  {   $$ = new Switch($3,$6,@1.first_line, @1.first_column);}
;
LCASES: LCASES CASE  {  $$ = $1; $$.push ($2);}
      | CASE    {   $$ = [$1];}
;
CASE: 'case' EXPRESION ':' BIC    {   $$ = new Case($2,$4,@1.first_line, @1.first_column);}
    | 'default' ':' BIC           {   $$ = new Case(null,$3,@1.first_line, @1.first_column);}
;

BIC: '{' '}'   {$$=null;}
    | '{'INSTRUCCIONES'}'  {$$=$2;}
    | INSTRUCCIONES  {$$=$1;}
    | {$$=null;}
;
IF: 'if' '(' EXPRESION')' BLOQUEINIF  BLOQUEIF BLOQUEELSE  {$$= new IF(false,$3,$5,$6,$7,@1.first_line, @1.first_column);}
     |'if' '(' EXPRESION')' BLOQUEINIF   BLOQUEELSE  {$$= new IF(false,$3,$5,null,$6,@1.first_line, @1.first_column);}
   ;
BLOQUEINIF: '{'INSTRUCCIONES '}' {$$=$2}
            | '{' '}'            {$$=null}
            ;

BLOQUEIF:  BLOQUEIF ELSEIF   {  $$ = $1; $$.push ($2);}
       |   ELSEIF              {   $$ = [$1];}
       ;
ELSEIF: 'else' 'if' '(' EXPRESION')'  BLOQUEINIF { $$=new IF(true,$4,$6,null,null,@1.first_line, @1.first_column);}
;

BLOQUEELSE: 'else' '{'INSTRUCCIONES'}' {$$=$3}
          | 'else' '{''}'              {$$=null}
          |                            {$$=null}
          ;
FOR:   '(' INSTRUCCION  EXPRESION ';'INCREMENTO ')' BLOQUEINIF {$$=new For($2,$3,$5,$7,@1.first_line, @1.first_column);}
      |'(' INSTRUCCION  EXPRESION ';'ASIGNACION ')' BLOQUEINIF {$$=new For($2,$3,$5,$7,@1.first_line, @1.first_column);}
      |'(' TIPOINICIAL identifier    'in'   EXPRESION ')' BLOQUEINIF  {$$=new ForIn(true,new Declaracion(2,$2,$3,null,null ,@1.first_line, @1.first_column),null,$5,$7,@1.first_line,  @1.first_column);}
      |'('  identifier 'in' EXPRESION ')' BLOQUEINIF  {$$=new ForIn(false,null,$2,$4,$6,@1.first_line,  @1.first_column);}
      |'(' TIPOINICIAL identifier    'of'   EXPRESION ')' BLOQUEINIF  {$$=new ForOF(true,new Declaracion(2,$2,$3,null,null ,@1.first_line, @1.first_column),null,$5,$7,@1.first_line,  @1.first_column);}
      |'('  identifier 'of' EXPRESION ')' BLOQUEINIF  {$$=new ForOF(false,null,$2,$4,$6,@1.first_line,  @1.first_column);}
    ;

//FORIN: //'for' '(' EXPRESION    'in' EXPRESION ')' BLOQUEINIF  {$$=new ForIn($3,$5,$7,@1.first_line,  @1.first_column);}
  //       'for' '('  DECLARACION 'in' EXPRESION ')' BLOQUEINIF  {$$=new ForIn($3,$5,$7,@1.first_line,  @1.first_column);}
//;


DECLARARTYPE:TIPOINICIAL identifier ':'identifier  '=' '{'LISTAIDS'}'{$$=new DeclararType($1,$2,$4,$7,@1.first_line, @1.first_column);}

;
LISTAIDS:LISTAIDS SEPARACION ID {$$ = $1; $$.push ($3);}
|ID  {$$=[$1];}
;
ID:identifier ':' EXPRESION {$$=new IdentificadorExprecion($1,$3,@1.first_line, @1.first_column);}

   ;


ASIGNACION : identifier '=' EXPRESION {$$ = new Asignacion($1, $3, @1.first_line, @1.first_column);}
            | identifier '=' '{'LISTAIDS '}' {var data= new Asignacion($1, null, @1.first_line, @1.first_column);data.listaTYPES=$4;data.type=new Type(types.TYPE);$$=data;}
            | identifier '=' ARRAYLISTA1 {var data= new Asignacion($1, null, @1.first_line, @1.first_column);data.listaARRAY=$3;data.type=new Type(types.ARRAY);$$=data;}
          ;

LISTADECLARACIONES : LISTADECLARACIONES ',' DECLARACION   { $$ = $1; $$.push($3); }
                  |   DECLARACION  { $$ = [$1]; }
                  ;

DECLARACION:  identifier '=' EXPRESION  {$$= new Declaracion(1,false,$1,null,$3 ,@1.first_line, @1.first_column);}
            | identifier  {$$= new Declaracion(2,false,$1,null,null ,@1.first_line, @1.first_column);}
            |  identifier ':' TIPO '=' EXPRESION {$$= new Declaracion(3,false,$1,$3,$5 ,@1.first_line, @1.first_column);}
            |  identifier ':' TIPO {$$= new Declaracion(4,false,$1,$3,null,@1.first_line, @1.first_column);}
            | identifier ':'identifier  '=' EXPRESION {var dec=new Declaracion(5,false,$1,null,$5,@1.first_line, @1.first_column);dec.Identificador=$3;  $$=dec;}
            | identifier ':'identifier    {var dec=new Declaracion(6,false,$1,null,null,@1.first_line, @1.first_column);  dec.Identificador=$3;  $$=dec;}

            ;

LISTAARRAYS: LISTAARRAYS ARRAY {$$=$1+1;}
            |ARRAY {$$=1;}
;
ARRAY:'['']' {$$=1;};
TYPE: TIPOINICIAL 'type' identifier '=' '{' LISTADECLARACIONESTYPE ',''}' {$$=new TypeDeclaracion($1,$3,$6,@1.first_line, @1.first_column); }
    |TIPOINICIAL 'type' identifier '=' '{' LISTADECLARACIONESTYPE ';''}' {$$=new TypeDeclaracion($1,$3,$6,@1.first_line, @1.first_column); }
    |TIPOINICIAL  'type' identifier '=' '{' LISTADECLARACIONESTYPE '}' {$$=new TypeDeclaracion($1,$3,$6,@1.first_line, @1.first_column); }
    | 'type' identifier '=' '{' LISTADECLARACIONESTYPE ',''}' {$$=new TypeDeclaracion(true,$2,$5,@1.first_line, @1.first_column); }
    | 'type' identifier '=' '{' LISTADECLARACIONESTYPE ';''}' {$$=new TypeDeclaracion(true,$2,$5,@1.first_line, @1.first_column); }
    |  'type' identifier '=' '{' LISTADECLARACIONESTYPE '}' {$$=new TypeDeclaracion(true,$2,$5,@1.first_line, @1.first_column); }
;
LISTADECLARACIONESTYPE: LISTADECLARACIONESTYPE SEPARACION DECLARACIONTYPE { $$ = $1; $$.push($3);}
                      |  DECLARACIONTYPE  {$$=[$1];}
;
SEPARACION: ',' {$$=$1;}
          | ';'  {$$=$1;}
          ;



DECLARACIONTYPE:    identifier ':' TIPO {$$= new Declaracion(4,true,$1,$3,null,@1.first_line, @1.first_column);}
|                   identifier ':' identifier { let tipo=new Type(types.OBJET); tipo.typeObjeto= types.TYPE;tipo.nombre=$3; $$= new Declaracion(4,true,$1,tipo,null,@1.first_line, @1.first_column);}
 ;



TIPO: 'string' {$$=new Type(types.STRING)}
    | 'number' {$$=new Type(types.NUMERIC)}
    | 'boolean' {$$=new Type(types.BOOLEAN)}
    | 'void' {$$=new Type(types.VOID)}
    | 'type' {$$=new Type(types.TYPE)}
    | 'Array' {$$=new Type(types.ARRAY)}

;

PRINT : 'console.log' '(' LISTAEXP ')' { $$ = new Print(pilaprint, @1.first_line,  @1.first_column);pilaprint=new Array();}

      ;

LISTAEXP:EXPRESION LISTAEXP1 {pilaprint.push($1);};


LISTAEXP1:  ',' EXPRESION LISTAEXP1 {pilaprint.push($2);}
|  {$$=null}
;


TIPOINICIAL: 'let' {$$=true;}
           | 'const' {$$=false;}

           ;

FUNCIONEJECUTAR: identifier '(' LISTAEXPRECIONES')'   {$$=new FuncionEjecutar(true,$1,$3,@1.first_line,  @1.first_column);}
;
LISTAEXPRECIONES: LISTAEXPRECIONES ','EXPRESION    { $$ = $1; $$.push($3);}
  | EXPRESION {$$=[$1];}
  |  {$$=[];}
  ;

LISTADEIDS: identifier '.' LISTADEIDS2  {$$ = $3; $$.unshift(new IDArray($1,null,@1.first_line, @1.first_column));}
//| identifier listaarrays '.' LISTADEIDS2  {$$ = $3; $$.unshift(new IDArray($1,$2,@1.first_line, @1.first_column));}
;
LISTADEIDS2:LISTADEIDS2 '.' IDARRAY {$$ = $1; $$.push($3);}
            |IDARRAY {$$=[$1];}
;
IDARRAY: identifier   {$$=new IDArray($1,null,@1.first_line, @1.first_column);}
       //| identifier   LISTAARRAYS {$$=new IDArray($1,$2,@1.first_line, @1.first_column);}
;

EXPRESION :'-'EXPRESION %prec UMENOS	    { $$ = new Arithmetic($2, null, '-', @1.first_line, @1.first_column);  }
          |EXPRESION '+' EXPRESION		    { $$ = new Arithmetic( $1,  $3, '+', @1.first_line, @1.first_column); }
          |EXPRESION '?' EXPRESION ':'	EXPRESION   { $$ = new Ternario( $1,  $3 ,$5,  @1.first_line, @1.first_column);  }
          |EXPRESION '-' EXPRESION		    { $$ = new Arithmetic($1, $3, '-', @1.first_line, @1.first_column); }
          |EXPRESION '*' EXPRESION		    { $$ = new Arithmetic($1, $3, '*', @1.first_line, @1.first_column); }
          |EXPRESION '/' EXPRESION	          { $$ = new Arithmetic($1, $3, '/', @1.first_line, @1.first_column); }
          |EXPRESION '%' EXPRESION	          { $$ = new Arithmetic($1, $3, '%', @1.first_line, @1.first_column); }
          |EXPRESION '**' EXPRESION	          { $$ = new Arithmetic($1, $3, '**', @1.first_line, @1.first_column); }
          |'decimal'				    { $$ = new Primitive(new Type(types.NUMERIC), Number($1), @1.first_line, @1.first_column); }
          |'true'				    { $$ = new Primitive(new Type(types.BOOLEAN), true, @1.first_line, @1.first_column); }
          |'false'				    { $$ = new Primitive(new Type(types.BOOLEAN), false, @1.first_line, @1.first_column); }
          |'null'				    { $$ = new Primitive(new Type(types.NULL), "null", @1.first_line, @1.first_column); }
          |STRING_LITERAL			    { $1= $1.replace(/\'/g,""); $1= $1.replace(/\"/g,"");    $$ = new Primitive(new Type(types.STRING), $1,@1.first_line, @1.first_column); }
          |'(' EXPRESION ')'		          { $$ = new Parentesis ( $2,@1.first_line, @1.first_column);}
          |EXPRESION '<' EXPRESION     { $$ = new Arithmetic($1, $3, '<', @1.first_line, @1.first_column); }
          |EXPRESION '<=' EXPRESION    { $$ = new Arithmetic($1, $3, '<=', @1.first_line, @1.first_column); }
          |EXPRESION '>' EXPRESION     { $$ = new Arithmetic($1, $3, '>', @1.first_line, @1.first_column); }
          |EXPRESION '>=' EXPRESION    { $$ = new Arithmetic($1, $3, '>=', @1.first_line, @1.first_column); }
          |EXPRESION '==' EXPRESION    { $$ = new Arithmetic($1, $3, '==', @1.first_line, @1.first_column); }
          |EXPRESION '!=' EXPRESION    { $$ = new Arithmetic($1, $3, '!=', @1.first_line, @1.first_column); }
          |EXPRESION '&&' EXPRESION    { $$ = new Arithmetic($1, $3, '&&', @1.first_line, @1.first_column); }
          |EXPRESION '||' EXPRESION    { $$ = new Arithmetic($1, $3, '||', @1.first_line, @1.first_column); }
          |identifier '++' {$$=new Incremento(false,true,false,$1,@1.first_line, @1.first_column);}
          |identifier '--'{$$=new Incremento(false,false,false,$1,@1.first_line, @1.first_column);}
          |'++' identifier  {$$=new Incremento(false,true,true,$2,@1.first_line, @1.first_column);}
          |'--'identifier {$$=new Incremento(false,false,true,$2,@1.first_line, @1.first_column);}
          |'!' EXPRESION    { $$ = new Arithmetic($2, null, '!', @1.first_line, @1.first_column); }
          |'identifier'  { $$ = new Identificador($1, @1.first_line, @1.first_column); }
          |FUNCIONEJECUTAR {$$=$1;}
          |STRINGESPECIAL { $1= $1.replace(/\`/g,"") ;$$ = new StringEspecial(new Type(types.STRING),$1, @1.first_line, @1.first_column);}
          | LISTADEIDS  {$$ = new ListaIdentificado(true,$1,null,@1.first_line,  @1.first_column);}
          //| identifier ARRAYBUSCAR  {$$ = new ArrayBusqueda($1,$2,@1.first_line,  @1.first_column);}
         // | identifier ARRAYBUSCAR '.' 'length'  {$$ = new ArrayLength($1,$2,@1.first_line,  @1.first_column);}
          //| identifier  '.length'  {$$ = new ArrayLength($1,null,@1.first_line,  @1.first_column);}
         // |  ArregloPOP {$$=$1}
          |  EXPRESION '.length' 	 {$$ = new StringLength($1,@1.first_line,  @1.first_column);}
          |  EXPRESION '.charAt'  '('EXPRESION')'	 {$$ = new StringCharAt($1,$4,@1.first_line,  @1.first_column);}
          |  EXPRESION '.toLowerCase' '('')'	 {$$ = new StringToLowerCase($1,@1.first_line,  @1.first_column);}
          |  EXPRESION '.toUpperCase' '('')'	 {$$ = new StringToUpperCase($1,@1.first_line,  @1.first_column);}
          |  EXPRESION '.concat' '('EXPRESION')'	 {$$ = new StringConcat($1,$4,@1.first_line,  @1.first_column);}
          | 'new' 'array' '(' EXPRESION ')'  {$$=new nuevoArreglo($4,@1.first_line,  @1.first_column);}
          ;


ARRAYBUSCAR: ARRAYBUSCAR '['EXPRESION']' {$$=$1;$$.push($3);}
 |'['EXPRESION']'{$$=[$2]}

;

ARRAYLISTA1: '['ARRAYLISTA2']' {$$=$2}

;

ARRAYLISTA2:ARRAYLISTA2 ','ARRAYLISTA3 {$$=$1; $$.push($3)}
|ARRAYLISTA3 {   $$=[$1];if($1==null){$$.pop()}}


;

ARRAYLISTA3:EXPRESION  {$$=$1;}
|'['ARRAYLISTA2']' {$$=$2;}
| {$$=null}
;


