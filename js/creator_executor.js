/*
 *  Copyright 2018-2019 Felix Garcia Carballeira, Alejandro Calderon Mateos, Diego Camarmas Alonso
 *
 *  This file is part of CREATOR.
 *
 *  CREATOR is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  CREATOR is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with CREATOR.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

// todo: draw_info y draw_space añadirlo a ret...
function packExecute(error, err_msg, err_type, draw){
  var ret = {} ;
  ret.error    = error;
  ret.msg      = err_msg ;
  ret.type     = err_type ;
  ret.draw     = draw;
  return ret ;
}

function executeInstruction(){
  var draw = {
    space: [] ,
    info: [] ,
    success: [] ,
    danger: [],
    flash: []
  } ;


  console_log(mutexRead);
  newExecution = false;

  do{
    console_log(executionIndex);
    console_log(architecture.components[0].elements[0].value);

    if(instructions.length == 0){
      return packExecute(true, 'No instructions in memory', 'danger', null);
      /*show_notification('No instructions in memory', 'danger');
      return;*/
    }

    if(executionIndex < -1){
      return packExecute(true, 'The program has finished', 'danger', null);
      /*show_notification('The program has finished', app._data.type ='danger') ;
      return;*/
    }
    else if(executionIndex == -1){
      return packExecute(true, 'The program has finished with errors', 'danger', null);
      /*show_notification('The program has finished with errors', 'danger') ;
      return;*/
    }
    else if(mutexRead == true){
      return;
    }

    /*Search a main tag*/
    if(executionInit == 1){
      for (var i = 0; i < instructions.length; i++) {
        if(instructions[i].Label == "main"){
          // instructions[executionIndex]._rowVariant = 'success';
          draw.success.push(executionIndex) ;
          architecture.components[0].elements[0].value = bigInt(parseInt(instructions[i].Address, 16)).value;
          executionInit = 0;
          break;
        }
        else if(i == instructions.length-1){
          executionIndex = -1;
          return packExecute(true, 'Label "main" not found', 'danger', null);
          /*show_notification('Label "main" not found', 'danger') ;
          executionIndex = -1;
          return;*/
        }
      }
    }

    var error = 0;
    var index;

    for (var i = 0; i < instructions.length; i++){
      if(parseInt(instructions[i].Address, 16) == architecture.components[0].elements[0].value){
        executionIndex = i;

        console_log(instructions[executionIndex].hide)
        console_log(executionIndex)
        console_log(instructions[i].Address)

        if(instructions[executionIndex].hide == false){
           // instructions[executionIndex]._rowVariant = 'info';
           draw.info.push(executionIndex);
        }
      }
      else{
        if(instructions[executionIndex].hide == false){
          // instructions[i]._rowVariant = '';
          if (instructions[i]._rowVariant != '') 
              draw.space.push(i);

        }
      }
    }

    var instructionExec = instructions[executionIndex].loaded;
    var instructionExecParts = instructionExec.split(' ');

    var signatureDef;
    var signatureParts;
    var signatureRawParts;
    var nwords;
    var auxDef;
    var binary;

    /*Search the instruction to execute*/
    for (var i = 0; i < architecture.instructions.length; i++) {
      var auxSig = architecture.instructions[i].signatureRaw.split(' ');
      var type;
      var auxIndex;

      var numCop = 0;
      var numCopCorrect = 0;

      if(architecture.instructions[i].co == instructionExecParts[0].substring(0,6)){
        if(architecture.instructions[i].cop != null && architecture.instructions[i].cop != ''){
          for (var j = 0; j < architecture.instructions[i].fields.length; j++){
            if (architecture.instructions[i].fields[j].type == "cop") {
              numCop++;
              if(architecture.instructions[i].fields[j].valueField == instructionExecParts[0].substring(((architecture.instructions[i].nwords*31) - architecture.instructions[i].fields[j].startbit), ((architecture.instructions[i].nwords*32) - architecture.instructions[i].fields[j].stopbit))){
                numCopCorrect++;
              }
            }
          }
          if(numCop == numCopCorrect){
            auxDef = architecture.instructions[i].definition;
            nwords = architecture.instructions[i].nwords;
            binary = true;
            auxIndex = i;
            break;
          }
        }
        else{
          auxDef = architecture.instructions[i].definition;
          nwords = architecture.instructions[i].nwords;
          binary = true;
          type = architecture.instructions[i].type;
          auxIndex = i;
          break;
        }
      }

      if(architecture.instructions[i].name == instructionExecParts[0] && instructionExecParts.length == auxSig.length){
        type = architecture.instructions[i].type;
        signatureDef = architecture.instructions[i].signature_definition;
        signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        re = new RegExp("[fF][0-9]+", "g");
        signatureDef = signatureDef.replace(re, "(.*?)");

        re = new RegExp(",", "g");
        var signature = architecture.instructions[i].signature.replace(re, " ");

        re = new RegExp(signatureDef+"$");
        var match = re.exec(signature);
        var signatureParts = [];
        for(var j = 1; j < match.length; j++){
          signatureParts.push(match[j]);
        }

        match = re.exec(architecture.instructions[i].signatureRaw);
        var signatureRawParts = [];
        for(var j = 1; j < match.length; j++){
          signatureRawParts.push(match[j]);
        }
        
        console_log(signatureParts);
        console_log(signatureRawParts);

        auxDef = architecture.instructions[i].definition;
        nwords = architecture.instructions[i].nwords;
        binary = false;
        break;
      }
    }

    /*Increase PC*/
    architecture.components[0].elements[0].value = architecture.components[0].elements[0].value + bigInt((nwords * 4)).value;

    console_log(auxDef);

    // preload
    if (typeof instructions[executionIndex].preload === "undefined"){

      if(binary == false){
        re = new RegExp(signatureDef+"$");
        var match = re.exec(instructionExec);
        instructionExecParts = [];

        for(var j = 1; j < match.length; j++){
          instructionExecParts.push(match[j]);
        }

        console_log(instructionExecParts);

        /*Replace the value with the name of the register*/
        for (var i = 1; i < signatureRawParts.length; i++){
          /*if(signatureParts[i] == "inm"){
            var re = new RegExp(signatureRawParts[i],"g");
            auxDef = auxDef.replace(re, "bigInt(" + instructionExecParts[i] + ").value");
          }
          else{
            var re = new RegExp(signatureRawParts[i],"g");
            auxDef = auxDef.replace(re, instructionExecParts[i]);
          }*/

          var re1 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');
          var re2 = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');
          var re3 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

          var prevSearchIndex;

          console_log(re1);
          console_log(re2);
          console_log(re3);

          while(auxDef.search(re1) != -1 || auxDef.search(re2) != -1 || auxDef.search(re3) != -1 && (auxDef.search(re1) != prevSearchIndex || auxDef.search(re2) != prevSearchIndex || auxDef.search(re3) != prevSearchIndex)){
            console_log(signatureRawParts[i])
            if(signatureParts[i] == "INT-Reg" || signatureParts[i] == "SFP-Reg" || signatureParts[i] == "DFP-Reg" || signatureParts[i] == "Ctrl-Reg"){
              re = new RegExp("[0-9]{" + instructionExecParts[i].length + "}");
              if(instructionExecParts[i].search(re) != -1){
                var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re, match[1] + "R" + instructionExecParts[i] + match[2]);
                }

                var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re,"R" + instructionExecParts[i] + match[1]);
                }

                var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re, match[1] + "R" + instructionExecParts[i]);
                }
              }
              else{
                var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re, match[1] + instructionExecParts[i] + match[2]);
                }

                var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re, instructionExecParts[i] + match[1]);
                }

                var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

                if (auxDef.search(re) != -1){
                  match = re.exec(auxDef);
                  console_log(match)
                  auxDef = auxDef.replace(re, match[1] + instructionExecParts[i]);
                }
              }
            }
            else{
              var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');

              if (auxDef.search(re) != -1){
                prevSearchIndex = auxDef.search(re);
                match = re.exec(auxDef);
                console_log(match)
                auxDef = auxDef.replace(re, match[1] + instructionExecParts[i] + match[2]);
              }

              var re = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');

              if (auxDef.search(re) != -1){
                prevSearchIndex = auxDef.search(re);
                match = re.exec(auxDef);
                console_log(match)
                auxDef = auxDef.replace(re, instructionExecParts[i] + match[1]);
              }

              var re = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');

              if (auxDef.search(re) != -1){
                prevSearchIndex = auxDef.search(re);
                match = re.exec(auxDef);
                console_log(match)
                auxDef = auxDef.replace(re, match[1] + instructionExecParts[i]);
              }
            }
            var re1 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'([^A-Za-z])');
            var re2 = new RegExp('^'+signatureRawParts[i]+'([^A-Za-z])');
            var re3 = new RegExp('([^A-Za-z])'+signatureRawParts[i]+'$');
          }
        }
      }

      if(binary == true){
        console_log("Binary");

        for (var j = 0; j < architecture.instructions[auxIndex].fields.length; j++){
          console_log(instructionExecParts[0]);
          console_log(architecture.instructions[auxIndex].fields.length);
          if(architecture.instructions[auxIndex].fields[j].type == "INT-Reg" || architecture.instructions[auxIndex].fields[j].type == "SFP-Reg" || architecture.instructions[auxIndex].fields[j].type == "DFP-Reg" || architecture.instructions[auxIndex].fields[j].type == "Ctrl-Reg") {
            console_log(instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit)));

            for (var z = 0; z < architecture.components.length; z++){
              console_log(architecture.components[z].type)
              if(architecture.components[z].type == "control" && architecture.instructions[auxIndex].fields[j].type == "Ctrl-Reg"){
                for (var w = 0; w < architecture.components[z].elements.length; w++){
                  var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                  console_log(auxLength);
                  console_log((w.toString(2)).padStart(auxLength, "0"));
                  if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                  
                  }
                }
              }
              if(architecture.components[z].type == "integer" && architecture.instructions[auxIndex].fields[j].type == "INT-Reg"){
                for (var w = 0; w < architecture.components[z].elements.length; w++){
                  var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                  console_log(auxLength);
                  console_log((w.toString(2)).padStart(auxLength, "0"));
                  if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                    var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                    auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                  }
                }
              }
              if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == false && architecture.instructions[auxIndex].fields[j].type == "SFP-Reg"){
                for (var w = 0; w < architecture.components[z].elements.length; w++){
                  var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                  console_log(auxLength);
                  console_log((w.toString(2)).padStart(auxLength, "0"));
                  if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                    var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                    auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                  }
                }
              }
              if(architecture.components[z].type == "floating point" && architecture.components[z].double_precision == true && architecture.instructions[auxIndex].fields[j].type == "DFP-Reg"){
                for (var w = 0; w < architecture.components[z].elements.length; w++){
                  var auxLength = ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit) - ((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit);
                  console_log(auxLength);
                  console_log((w.toString(2)).padStart(auxLength, "0"));
                  if((w.toString(2)).padStart(auxLength, "0") == instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))){
                    var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
                    auxDef = auxDef.replace(re, architecture.components[z].elements[w].name);
                  }
                }
              }
            }
          }
          if(architecture.instructions[auxIndex].fields[j].type == "inm-signed"){
            var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
            var valueSign = value.charAt(0);
            var newValue =  value.padStart(32, valueSign) ;
            newValue = parseInt(newValue, 2) ;
            var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
            auxDef = auxDef.replace(re, newValue >> 0);
          }
          if(architecture.instructions[auxIndex].fields[j].type == "inm-unsigned"){
            var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
            newValue = parseInt(newValue, 2) ;
            var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
            auxDef = auxDef.replace(re, newValue >> 0);
          }
          if(architecture.instructions[auxIndex].fields[j].type == "address"){
            var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
            var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
            auxDef = auxDef.replace(re, parseInt(value, 2));
          }
          if(architecture.instructions[auxIndex].fields[j].type == "offset_words"){
            var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
            var valueSign = value.charAt(0);
            var newValue =  value.padStart(32, valueSign) ;
            newValue = parseInt(newValue, 2) ;
            //danger
            var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
            auxDef = auxDef.replace(re, newValue >> 0);
          }
          if(architecture.instructions[auxIndex].fields[j].type == "offset_bytes"){
            var value = instructionExecParts[0].substring(((architecture.instructions[auxIndex].nwords*31) - architecture.instructions[auxIndex].fields[j].startbit), ((architecture.instructions[auxIndex].nwords*32) - architecture.instructions[auxIndex].fields[j].stopbit))
            var valueSign = value.charAt(0);
            var newValue =  value.padStart(32, valueSign) ;
            newValue = parseInt(newValue, 2) ;
            //danger
            var re = new RegExp(architecture.instructions[auxIndex].fields[j].name,"g");
            auxDef = auxDef.replace(re, newValue >> 0);
          }
        }
      }

      console_log(auxDef);

      /*Syscall*/
      var compIndex;
      var elemIndex;
      var compIndex2;
      var elemIndex2;

      console_log(auxDef);
      
      re = /print_int\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('print_int',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /print_float\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('print_float',"+compIndex+" , "+elemIndex+", null, null)");
      }


      re = /print_double\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('print_double',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /print_string\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('print_string',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /read_int\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('read_int',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /read_float\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('read_float',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /read_double\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('read_double',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /read_string\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        re = new RegExp(" ", "g");
        match[1] = match[1].replace(re, "");


        var auxMatch = match[1].split(',');

        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(auxMatch[0] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }

        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(auxMatch[1] == architecture.components[i].elements[j].name){
              compIndex2 = i;
              elemIndex2 = j;
            }
          }
        }
        re = /read_string\((.*?)\)/
        auxDef = auxDef.replace(re, "syscall('read_string',"+compIndex+" , "+elemIndex+","+compIndex2+" , "+elemIndex2+")");
      }

      re = /sbrk\((.*?)\)/
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('sbrk',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /exit\((.*?)\)/;
      auxDef = auxDef.replace(re, "syscall('exit', null, null, null, null)");

      re = /print_char\((.*?)\)/;
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('print_char',"+compIndex+" , "+elemIndex+", null, null)");
      }

      re = /read_char\((.*?)\)/
      if (auxDef.search(re) != -1){
        match = re.exec(auxDef);
        for (var i = 0; i < architecture.components.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if(match[1] == architecture.components[i].elements[j].name){
              compIndex = i;
              elemIndex = j;
            }
          }
        }
        auxDef = auxDef.replace(re, "syscall('read_char',"+compIndex+" , "+elemIndex+", null, null)");
      }

      console_log(auxDef);

      /*Divides a double into two parts*/
      re = /splitDouble\((.*)\)/;
      while (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        match[1] = match[1].replace(";", ",");
        auxDef = auxDef.replace(re, "divDouble(" + match [1] + ")");
      }

      console_log(auxDef);

      /*Replaces the name of the register with its variable*/
      var regIndex = 0;
      var regNum = 0;

      for (var i = 0; i < architecture.components.length; i++){
        if(architecture.components[i].type == "integer"){
          regNum = architecture.components[i].elements.length-1;
        }
        for (var j = architecture.components[i].elements.length-1; j >= 0; j--){
          var re;

          /*Write in the register*/
          re = new RegExp(architecture.components[i].elements[j].name+" *=[^=]");
          if (auxDef.search(re) != -1){
            re = new RegExp(architecture.components[i].elements[j].name+" *=","g");

            auxDef = auxDef.replace(re, "reg"+ regIndex+"=");
            auxDef = "var reg" + regIndex + "=null;\n" + auxDef;
            auxDef = auxDef + "\n var ret = writeRegister(reg"+regIndex+","+i+" ,"+j+");" +
                              "if (ret.error) {\n" +
                              "    return ret;" +
                              "}\n";
            regIndex++;
          }

          if(architecture.components[i].type == "integer"){
            re = new RegExp("R"+regNum+" *=[^=]");
            if (auxDef.search(re) != -1){
              re = new RegExp("R"+regNum+" *=","g");
              auxDef = auxDef.replace(re, "var reg"+ regIndex+"=");
              auxDef = "var reg" + regIndex + "=null\n" + auxDef;
              auxDef = auxDef + "\n var ret = writeRegister(reg"+regIndex+","+i+" ,"+j+");" +
                                "if (ret.error) {\n" +
                                "    return ret;" +
                                "}\n";
              regIndex++;
            }
          }

          /*Read in the register*/
          re = new RegExp("([^a-zA-Z0-9])" + architecture.components[i].elements[j].name + "(?!\.name)");
          while(auxDef.search(re) != -1){
            var match = re.exec(auxDef);
            auxDef = auxDef.replace(re, 
            match[1] + "readRegister("+i+" ,"+j+")");
          }

          if(architecture.components[i].type == "integer"){
            re = new RegExp("R"+regNum+"[^0-9]|[\\s]","g");
            if(auxDef.search(re) != -1){
              re = new RegExp("R"+regNum,"g");
              auxDef = auxDef.replace(re, 
                                      "var ret = readRegister("+i+" ,"+j+");" +
                                      "if (ret.error) {\n" + 
                                      "    ret.draw.danger.push(executionIndex);" +
                                      "    return ret;" +
                                      "}\n");
            }
          }

          if(architecture.components[i].type == "integer"){
            regNum--;
          }
        }
      }

      /*Leave the name of the register*/
      re = new RegExp("\.name","g");
      auxDef = auxDef.replace(re, "");

      console_log(auxDef);

      /*Check if stack limit was modify*/
      re = /check_stack_limit\((.*)\)/;
      if (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        var args = match[1].split(";");
        re = new RegExp(" +", "g");
        for (var i = 0; i < args.length; i++) {
          args[i] = args[i].replace(re, "");
        }
        re = /check_stack_limit\((.*)\)/;
        auxDef = auxDef.replace(re, "");
        auxDef = auxDef + "\n\nif('"+args[0]+"'=='"+args[1]+"'){\n\tif(("+args[2]+") != architecture.memory_layout[4].value){\n\t\twriteStackLimit("+args[2]+")\n\t}\n}";
      }

      console_log(auxDef);

      /*Check if stack limit was modify*/
      re = /assert\((.*)\)/;
      if (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        var args = match[1].split(";");
        auxDef = auxDef.replace(re, "");
        auxDef = "var exception = 0;\nif("+ args[0] +"){}else{exception=app.exception("+ args[1] +");}\nif(exception==0){" + auxDef + "}";
      }

      console_log(auxDef);

      /*Write in memory*/
      re = /MP.([whb]).\[(.*?)\] *=/;
      while (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        var auxDir;
        //eval("auxDir="+match[2]);

        re = /MP.[whb].\[(.*?)\] *=/;
        auxDef = auxDef.replace(re, "dir=");
        auxDef = "var dir=null\n" + auxDef;
        auxDef = auxDef + "\n writeMemory(dir"+","+match[2]+",'"+match[1]+"');"
        re = /MP.([whb]).\[(.*?)\] *=/;
      }

      re = new RegExp("MP.([whb]).(.*?) *=");
      while (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        re = new RegExp("MP."+match[1]+"."+match[2]+" *=");
        auxDef = auxDef.replace(re, "dir=");
        auxDef = "var dir=null\n" + auxDef;
        auxDef = auxDef + "\n writeMemory(dir,"+match[2]+",'"+match[1]+"');"
        re = new RegExp("MP.([whb]).(.*?) *=");
      }

      re = /MP.([whb]).\[(.*?)\]/;
      while (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        var auxDir;
        //eval("auxDir="+match[2]);
        re = /MP.[whb].\[(.*?)\]/;
        auxDef = auxDef.replace(re, "readMemory("+match[2]+", '"+match[1]+"')");
        re = /MP.([whb]).\[(.*?)\]/;
      }

      re = new RegExp("MP.([whb]).([0-9]*[a-z]*[0-9]*)");
      while (auxDef.search(re) != -1){
        var match = re.exec(auxDef);
        re = new RegExp("MP."+match[1]+"."+match[2]);
        auxDef = auxDef.replace(re, "readMemory("+match[2]+",'"+match[1]+"')");
        re = new RegExp("MP.([whb]).([0-9]*[a-z]*[0-9]*)");
      }

      console_log(auxDef);

      // preload instruction
      eval("instructions[" + executionIndex + "].preload = function(elto) { " + auxDef.replace(/this./g,"elto.") + " }; ") ;
    }

    try{
      var result = instructions[executionIndex].preload(this);
      if(result.error){
        return result;
      }
      //eval(auxDef);
    }
    catch(e){
      if (e instanceof SyntaxError) {
        console_log("Error");
        error = 1;
        //instructions[executionIndex]._rowVariant = 'danger';
        draw.danger.push(executionIndex) ;
        executionIndex = -1;
        return packExecute('The definition of the instruction contains errors, please review it', 'danger', null);
        /*show_notification('The definition of the instruction contains errors, please review it', 'danger') ;
        return;*/
      }
    }

    /*Refresh stats*/
    for (var i = 0; i < stats.length; i++){
      if(type == stats[i].type){
        stats[i].number_instructions++;
        totalStats++;
      }
    }
    for (var i = 0; i < stats.length; i++){
      stats[i].percentage = (stats[i].number_instructions/totalStats)*100;
    }

    /*Execution error*/
    if(executionIndex == -1){
      error = 1;
      return;
    }

    /*Next instruction to execute*/
    if(error != 1 && executionIndex < instructions.length){
      for (var i = 0; i < instructions.length; i++){
        if(parseInt(instructions[i].Address, 16) == architecture.components[0].elements[0].value){
          executionIndex = i;
          //instructions[executionIndex]._rowVariant = 'success';
          draw.success.push(executionIndex) ;
          break;
        }
        else if(i == instructions.length-1 && mutexRead == true){
          executionIndex = instructions.length+1;
        }
        else if(i == instructions.length-1){
          //instructions[executionIndex]._rowVariant = '';
          draw.space.push(executionIndex) ;
          executionIndex = instructions.length+1;
        }
      }
    }

    console_log(executionIndex);

    if(executionIndex >= instructions.length && mutexRead == true){
      /*for (var i = 0; i < instructions.length; i++){
        instructions[i]._rowVariant = '';
      }*/
      return;
    }
    else if(executionIndex >= instructions.length && mutexRead == false){
      for (var i = 0; i < instructions.length; i++){
        //instructions[i]._rowVariant = '';
        draw.space.push(i) ;
      }

      executionIndex = -2;
      return packExecute(false, 'The execution of the program has finished', 'success', draw);
      /*show_notification('The execution of the program has finished', 'success') ;
      return;*/
    }
    else{
      if(error != 1){
        //instructions[executionIndex]._rowVariant = 'success';
        draw.success.push(executionIndex);
      }
    }
    console_log(executionIndex);
  }
  while(instructions[executionIndex].hide == true);

  return packExecute(false, null, null, draw);
}

function executeProgramOneShot(){
  var ret = null;
  for (var i=0; i<10000000; i++)
  {
    ret = executeInstruction();

    if(ret.error == true){
      console.log('"ERROR:"' + ret.msg);
      return;
    }
    if (executionIndex < -1) {
        return ;
    }
  }

  console.log('"ERROR:" Infinite loop');
}




















/*todo: indice danger read write*/
/*todo:
   ret = readRegister(...);
   if (ret.error) {
       ret.draw.danger.push(!!!!!!"executionIndex"¡!!!!1) ;
       return ret ;
       }
*/







/*Read register value*/
function readRegister(indexComp, indexElem){
  if(architecture.components[indexComp].elements[indexElem].properties[0] != "read" && architecture.components[indexComp].elements[indexElem].properties[1] != "read"){
    /*show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be read', 'danger') ;
    instructions[executionIndex]._rowVariant = 'danger';*/
    var draw = {
        space: [] ,
        info: [] ,
        success: [] ,
        danger: [],
        flash: []
      } ;
    for (var i = 0; i < instructions.length; i++) {
      draw.space.push(i);
    }
    
    draw.danger.push(executionIndex);

    executionIndex = -1;
    return packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be read', 'danger', draw);
    
    //return;
  }

  if(architecture.components[indexComp].type == "control" || architecture.components[indexComp].type == "integer"){
    console_log(parseInt((architecture.components[indexComp].elements[indexElem].value).toString()));
    return parseInt((architecture.components[indexComp].elements[indexElem].value).toString());
  }
  if(architecture.components[indexComp].type == "floating point"){
    return parseFloat((architecture.components[indexComp].elements[indexElem].value).toString());
  }
  
}
/*Write value in register*/
function writeRegister(value, indexComp, indexElem){
  if(value == null){
    return;
  }

  if(architecture.components[indexComp].type == "integer" || architecture.components[indexComp].type == "control"){
    if(architecture.components[indexComp].elements[indexElem].properties[0] != "write" && architecture.components[indexComp].elements[indexElem].properties[1] != "write"){
      /*show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/

      var draw = {
          space: [] ,
          info: [] ,
          success: [] ,
          danger: [],
          flash: []
        } ;
      for (var i = 0; i < instructions.length; i++) {
        draw.space.push(i);
      }

      draw.danger.push(executionIndex);

      executionIndex = -1;
      return packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', draw);
      //return;
    }

    architecture.components[indexComp].elements[indexElem].value = bigInt(parseInt(value) >>> 0).value;

    
    if (!window.document)
    {
      var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name  + "Int";
      var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

      $(buttonDec).attr("class", "btn btn-outline-secondary btn-block btn-sm modRegister");
      $(buttonHex).attr("class", "btn btn-outline-secondary btn-block btn-sm modRegister");

      setTimeout(function() {
        $(buttonDec).attr("class", "btn btn-outline-secondary btn-block btn-sm registers");
        $(buttonHex).attr("class", "btn btn-outline-secondary btn-block btn-sm registers");
      }, 500);
    }
    
  }

  else if(architecture.components[indexComp].type =="floating point"){
    if(architecture.components[indexComp].double_precision == false){
      if(architecture.components[indexComp].elements[indexElem].properties[0] != "write" && architecture.components[indexComp].elements[indexElem].properties[1] != "write"){
        return packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', null);
        //show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger') ;
        //return;
      }

      architecture.components[indexComp].elements[indexElem].value = parseFloat(value);

      this.updateDouble(indexComp, indexElem);

      if (!window.document)
      {
        var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name + "FP";
        var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

        $(buttonDec).attr("style", "background-color:#c2c2c2;");
        $(buttonHex).attr("style", "background-color:#c2c2c2;");

        setTimeout(function() {
          $(buttonDec).attr("style", "background-color:#f5f5f5;");
          $(buttonHex).attr("style", "background-color:#f5f5f5;");
        }, 500);
      }
    }
    
    else if(architecture.components[indexComp].double_precision == true){
      if (architecture.components[indexComp].elements[indexElem].properties[0] != "write" && architecture.components[indexComp].elements[indexElem].properties[1] != "write"){
          /*show_notification('The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger') ;
          return;*/
          return packExecute(true, 'The register '+ architecture.components[indexComp].elements[indexElem].name +' cannot be written', 'danger', null);
      }

      architecture.components[indexComp].elements[indexElem].value = parseFloat(value);

      this.updateSimple(indexComp, indexElem);

      if (!window.document)
      {
         var buttonDec = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name + "DFP";
         var buttonHex = '#popoverValueContent' + architecture.components[indexComp].elements[indexElem].name;

         $(buttonDec).attr("style", "background-color:#c2c2c2;");
         $(buttonHex).attr("style", "background-color:#c2c2c2;");

         setTimeout(function() {
           $(buttonDec).attr("style", "background-color:#f5f5f5;");
           $(buttonHex).attr("style", "background-color:#f5f5f5;");
         }, 500);
      } // if

    }
  }  
}




/*Read memory value*/
function readMemory(addr, type){
  var memValue = '';
  var index;

  if (type == "w"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to read in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
          for (var z = 0; z < memory[index][i].Binary.length; z++){
            memValue = memory[index][i].Binary[z].Bin + memValue;
          }
          //return bigInt(memValue, 16).value;
          return parseInt(memValue,16);
        }
      }
    }
    //return bigInt(0).value;
    return 0;
  }

  if (type == "h"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to read in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
          if(j < 2){
            for (var z = 0; z < memory[index][i].Binary.length -2; z++){
              memValue = memory[index][i].Binary[z].Bin + memValue;
            }
            //return bigInt(memValue, 16).value;
            return parseInt(memValue,16);
          }
          else{
            for (var z = 2; z < memory[index][i].Binary.length; z++){
              memValue = memory[index][i].Binary[z].Bin + memValue;
            }
            //return bigInt(memValue, 16).value;
            return parseInt(memValue,16);
          }
        }
      }
    }
    //return bigInt(0).value;
    return 0;
  }

  if (type == "b"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to read in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
          memValue = memory[index][i].Binary[j].Bin + memValue;
          //return bigInt(memValue, 16).value;
          return parseInt(memValue,16);
        }
      }
    }
    //return bigInt(0).value; 
    return 0;
  }
}
/*Write value in memory*/
function writeMemory(value, addr, type){

  if(value == null){
    return;
  }

  var memValue = (value.toString(16)).padStart(8, "0");
  var index;

  if (type == "w"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
          memory[index][i].Value = (parseInt(memValue, 16) >> 0);
          var charIndex = memValue.length-1;
          for (var z = 0; z < memory[index][i].Binary.length; z++){
            memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
            charIndex = charIndex - 2;
          }
          memory[index][i].Value = (parseInt(memValue, 16) >> 0);
          app._data.memory[index] = memory[index];
          return;
        }
      }
    }

    for (var i = 0; i < memory[index].length; i++){
      if(memory[index][i].Address > parseInt(addr, 16)){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
          charIndex = charIndex - 2;
        }
        app._data.memory[index] = memory[index];
        return;
      }
      else if(i == memory[index].length-1){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
          charIndex = charIndex - 2;
        }
        app._data.memory[index] = memory[index];
        return;
      }
    }

    if(memory[index].length == 0){
      var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
      memory[index].push({Address: aux_addr, Binary: [], Value: (parseInt(memValue, 16) >> 0), DefValue: null, reset: false});
      var charIndex = memValue.length-1;
      for (var z = 0; z < 4; z++){
        (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase(), Tag: null},);
        charIndex = charIndex - 2;
      }
      app._data.memory[index] = memory[index];
      return;
    }
  }

  if (type == "h"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
           if(j < 2){
            var charIndex = memValue.length-1;
            for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
              memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
              charIndex = charIndex - 2;
            }

            memory[index][i].Value = null;
            for (var z = 3; z < 4; z=z-2){
              memory[index][i].Value = memory[index][i].Value + parseInt((memory[index][i].Binary[z].Bin + memory[index][i].Binary[z-1].Bin), 16) + " ";
            }
            app._data.memory[index] = memory[index];
            return;
          }
          else{
            var charIndex = memValue.length-1;
            for (var z = 2; z < memory[index][i].Binary.length; z++){
              memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
              charIndex = charIndex - 2;
            }
            app._data.memory[index] = memory[index];
            return;
          }
        }
      }
    }

    for (var i = 0; i < memory[index].length; i++){
      if(memory[index][i].Address > parseInt(addr, 16)){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
        }
        for (var j = 0; j < memory[index][i].Binary.length; j++){
          var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
          if(aux == addr || memory[index][i].Binary[j].Tag == addr){
             if(j < 2){
              var charIndex = memValue.length-1;
              for (var z = 0; z < memory[index][i].Binary.length - 2; z++){
                memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                charIndex = charIndex - 2;
              }
              memory[index][i].Value = "0 " + (parseInt(memValue, 16) >> 0); 
              app._data.memory[index] = memory[index];
              return;
            }
            else{
              var charIndex = memValue.length-1;
              for (var z = 2; z < memory[index][i].Binary.length; z++){
                memory[index][i].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                charIndex = charIndex - 2;
              }
              memory[index][i].Value = (parseInt(memValue, 16) >> 0) + " 0";    
              app._data.memory[index] = memory[index];             
              return;
            }
          }
        }
        return;
      }
      else if(i == memory[index].length-1){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
        }
        for (var j = 0; j < memory[index][i+1].Binary.length; j++){
          var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
          if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
             if(j < 2){
              var charIndex = memValue.length-1;
              for (var z = 0; z < memory[index][i+1].Binary.length - 2; z++){
                memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                charIndex = charIndex - 2;
              }
              memory[index][i+1].Value = "0 " + (parseInt(memValue, 16) >> 0); 
              app._data.memory[index] = memory[index];
              return;
            }
            else{
              var charIndex = memValue.length-1;
              for (var z = 2; z < memory[index][i].Binary.length; z++){
                memory[index][i+1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
                charIndex = charIndex - 2;
              }
              memory[index][i+1].Value = (parseInt(memValue, 16) >> 0) + " 0"; 
              app._data.memory[index] = memory[index];
              return;
            }
          }
        }
        return;
      }
    }

    if(memory[index].length == 0){
      var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
      memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
      var charIndex = memValue.length-1;
      for (var z = 0; z < 4; z++){
        (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
      }
      for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
        var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
           if(j < 2){
            var charIndex = memValue.length-1;
            for (var z = 0; z < memory[index][memory[index].length-1].Binary.length - 2; z++){
              memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
              charIndex = charIndex - 2;
            }
            memory[index][memory[index].length-1].Value = "0 " + (parseInt(memValue, 16) >> 0); 
            app._data.memory[index] = memory[index];
            return;
          }
          else{
            var charIndex = memValue.length-1;
            for (var z = 2; z < memory[index][i].Binary.length; z++){
              memory[index][memory[index].length-1].Binary[z].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
              charIndex = charIndex - 2;
            }
            memory[index][memory[index].length-1].Value = (parseInt(memValue, 16) >> 0) + " 0"; 
            app._data.memory[index] = memory[index];
            return;
          }
        }
      }
      return;
    }
  }

  if (type == "b"){
    if((parseInt(addr, 16) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr, 16) == architecture.memory_layout[0].value || parseInt(addr, 16) == architecture.memory_layout[1].value){
      /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }

    if((parseInt(addr, 16) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr, 16) == architecture.memory_layout[2].value || parseInt(addr, 16) == architecture.memory_layout[3].value){
      index = memory_hash[0];
    }

    if((parseInt(addr, 16) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr, 16) == architecture.memory_layout[4].value || parseInt(addr, 16) == architecture.memory_layout[5].value){
      index = memory_hash[2];
    }

    for (var i = 0; i < memory[index].length; i++){
      for (var j = 0; j < memory[index][i].Binary.length; j++){
        var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][i].Binary[j].Tag == addr){
          var charIndex = memValue.length-1;
          memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
          memory[index][i].Value = null;
          for (var z = 3; z < 4; z--){
            memory[index][i].Value = memory[index][i].Value + parseInt(memory[index][i].Binary[z].Bin, 16) + " ";
          }
          return;
        }
      }
    }

    for (var i = 0; i < memory[index].length; i++){
      if(memory[index][i].Address > parseInt(addr, 16)){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].splice(i, 0, {Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
        }
        for (var j = 0; j < memory[index][i].Binary.length; j++){
          var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
          if(aux == addr || memory[index][i].Binary[j].Tag == addr){
            var charIndex = memValue.length-1;
            memory[index][i].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
            for (var z = 3; z < 4; z--){
              memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
            }
            return;
          }
        }
        return;
      }
      else if(i == memory[index].length-1){
        var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
        memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
        var charIndex = memValue.length-1;
        for (var z = 0; z < 4; z++){
          (memory[index][i+1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
        }
        for (var j = 0; j < memory[index][i+1].Binary.length; j++){
          var aux = "0x"+(memory[index][i+1].Binary[j].Addr).toString(16);
          if(aux == addr || memory[index][i+1].Binary[j].Tag == addr){
            var charIndex = memValue.length-1;
            memory[index][i+1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
            for (var z = 3; z < 4; z--){
              memory[index][i+1].Value = memory[index][i+1].Value + parseInt(memory[index][i+1].Binary[z].Bin, 16) + " ";
            }
            return;
          }
        }
        return;
      }
    }

    if(memory[index].length == 0){
      var aux_addr = parseInt(addr, 16) - (parseInt(addr, 16)%4);
      memory[index].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: false});
      var charIndex = memValue.length-1;
      for (var z = 0; z < 4; z++){
        (memory[index][memory[index].length-1].Binary).push({Addr: aux_addr + z, DefBin: "00", Bin: "00", Tag: null},);
      }
      for (var j = 0; j < memory[index][memory[index].length-1].Binary.length; j++){
        var aux = "0x"+(memory[index][memory[index].length-1].Binary[j].Addr).toString(16);
        if(aux == addr || memory[index][memory[index].length-1].Binary[j].Tag == addr){
          var charIndex = memValue.length-1;
          memory[index][memory[index].length-1].Binary[j].Bin = memValue.charAt(charIndex-1).toUpperCase()+memValue.charAt(charIndex).toUpperCase();
          for (var z = 3; z < 4; z--){
            memory[index][memory[index].length-1].Value = memory[index][memory[index].length-1].Value + parseInt(memory[index][memory[index].length-1].Binary[z].Bin, 16) + " ";
          }
          return;
        }
      }
      return;
    }
  }
}
/*Modify the stack limit*/
function writeStackLimit(stackLimit){
  if(stackLimit != null){
    if(stackLimit <= architecture.memory_layout[3].value && stackLimit >= architecture.memory_layout[2].value){
      /*show_notification('Segmentation fault. You tried to write in the data segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
      executionIndex = -1;
      //return;
    }
    else if(stackLimit <= architecture.memory_layout[1].value && stackLimit >= architecture.memory_layout[0].value){
      /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
      instructions[executionIndex]._rowVariant = 'danger';*/
      executionIndex = -1;
      //return;
      return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
    }
    else{
      if(stackLimit < architecture.memory_layout[4].value){
        var diff = architecture.memory_layout[4].value - stackLimit;
        var auxStackLimit = stackLimit;

        for (var i = 0; i < (diff/4); i++){
          if(unallocated_memory.length > 0){
            memory[memory_hash[2]].splice(i, 0, unallocated_memory[unallocated_memory.length-1]);
            memory[memory_hash[2]][0].unallocated = false;
            unallocated_memory.splice(unallocated_memory.length-1, 1);
          }
          else{
            memory[memory_hash[2]].splice(i, 0,{Address: auxStackLimit, Binary: [], Value: null, DefValue: null, reset: true, unallocated: false});
            for (var z = 0; z < 4; z++){
              (memory[memory_hash[2]][i].Binary).push({Addr: auxStackLimit, DefBin: "00", Bin: "00", Tag: null},);
              auxStackLimit++;
            }
          }
        }
      }
      else if(stackLimit > architecture.memory_layout[4].value){
        var diff = stackLimit - architecture.memory_layout[4].value;
        for (var i = 0; i < (diff/4); i++){
          unallocated_memory.push(memory[memory_hash[2]][0]);
          unallocated_memory[unallocated_memory.length-1].unallocated = true;
          app._data.unallocated_memory = unallocated_memory;
          memory[memory_hash[2]].splice(0, 1);
          if(unallocated_memory.length > 20){
            unallocated_memory.splice(0, 15);
          }
        }
      }
      
      architecture.memory_layout[4].value = stackLimit;
      
    }
  }
}
/*Syscall*/
function syscall(action, indexComp, indexElem, indexComp2, indexElem2){
  switch(action){
    case "print_int":
      var value = architecture.components[indexComp].elements[indexElem].value;
      app._data.display = app._data.display + (parseInt(value.toString()) >> 0);
      break;
    case "print_float":
      var value = architecture.components[indexComp].elements[indexElem].value;
      app._data.display = app._data.display + value;
      break;
    case "print_double":
      var value = architecture.components[indexComp].elements[indexElem].value;
      app._data.display = app._data.display + value;
      break;
    case "print_string":
      var addr = architecture.components[indexComp].elements[indexElem].value;
      var index;

      if((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value){
        /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
        instructions[executionIndex]._rowVariant = 'danger';*/
        executionIndex = -1;
        this.keyboard = "";
        return packExecute(true, 'Segmentation fault. You tried to read in the text segment', 'danger', null);
        //return;
      }

      if((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
        index = memory_hash[0];
      }

      if((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
        index = memory_hash[2];
      }

      for (var i = 0; i < memory[index].length; i++){
        for (var j = 0; j < memory[index][i].Binary.length; j++){
          var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
          if(aux == addr){
            for (var i; i < memory[index].length; i++){
              for (var k = j; k < memory[index][i].Binary.length; k++){
                console_log(parseInt(memory[index][i].Binary[k].Bin, 16));
                console_log(String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16)));
                app._data.display = app._data.display + String.fromCharCode(parseInt(memory[index][i].Binary[k].Bin, 16));
                if(memory[index][i].Binary[k].Bin == 0){
                  return
                }
                else if(i == memory[index].length-1 && k == memory[index][i].Binary.length-1){
                  return;
                }
                j=0;
              }
            }
          }
        }
      }

      break;
    case "read_int":
      mutexRead = true;
      app._data.enter = false;

      console_log(mutexRead);
      if(newExecution == true){
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        //show_notification('The data has been uploaded', 'info') ;

        if(runExecution == false){
          this.executeProgram();
        }

        //return;
        return packExecute(true, 'The data has been uploaded', 'info', null);
      }

      if(consoleMutex == false){
        setTimeout(this.syscall, 1000, "read_int", indexComp, indexElem, indexComp2, indexElem2);
      }
      else{
        var value = parseInt(this.keyboard);
        console_log(value);
        this.writeRegister(value, indexComp, indexElem);
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if (window.document)
            show_notification('The data has been uploaded', 'info') ;

        if(executionIndex >= instructions.length){
          for (var i = 0; i < instructions.length; i++) {
            //instructions[i]._rowVariant = '';
            draw.space.push(i);
          }

          executionIndex = -2;
          /*show_notification('The execution of the program has finished', 'success') ;
          return;*/

          return packExecute(true, 'The execution of the program has finished', 'success', draw);
        }
        else if(runExecution == false){
          this.executeProgram();
        }
        break;
      }

      break;
    case "read_float":
      mutexRead = true;
      app._data.enter = false;
      console_log(mutexRead);
      if(newExecution == true){
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if (window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(runExecution == false){
          this.executeProgram();
        }

        return;
      }

      if(consoleMutex == false){
        setTimeout(this.syscall, 1000, "read_float", indexComp, indexElem, indexComp2, indexElem2);
      }
      else{
        var value = parseFloat(this.keyboard, 10);
        console_log(value);
        this.writeRegister(value, indexComp, indexElem);
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if (window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(executionIndex >= instructions.length){
          for (var i = 0; i < instructions.length; i++) {
            //instructions[i]._rowVariant = '';
            draw.space.push(i);
          }

          executionIndex = -2;
          /*show_notification('The execution of the program has finished', 'success') ;
          return;*/

          return packExecute(true, 'The execution of the program has finished', 'success', draw);
        }
        else if(runExecution == false){
          this.executeProgram();
        }

        break;
      }

      break;
    case "read_double":
      mutexRead = true;
      app._data.enter = false;
      console_log(mutexRead);
      if(newExecution == true){
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;
        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(runExecution == false){
          this.executeProgram();
        }

        return;
      }

      if(consoleMutex == false){
        setTimeout(this.syscall, 1000, "read_double", indexComp, indexElem, indexComp2, indexElem2);
      }
      else{
        var value = parseFloat(this.keyboard, 10);
        console_log(value);
        this.writeRegister(value, indexComp, indexElem);
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(executionIndex >= instructions.length){
          for (var i = 0; i < instructions.length; i++) {
            //instructions[i]._rowVariant = '';
            draw.space.push(i);
          }

          executionIndex = -2;
          /*show_notification('The execution of the program has finished', 'success') ;
          return;*/

          return packExecute(true, 'The execution of the program has finished', 'success', draw);
        }
        else if(runExecution == false){
          this.executeProgram();
        }

        break;
      }

      break;
    case "read_string":
      mutexRead = true;
      app._data.enter = false;
      console_log(mutexRead);
      if(newExecution == true){
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(runExecution == false){
          this.executeProgram();
        }

        return;
      }

      if(consoleMutex == false){
        setTimeout(this.syscall, 1000, "read_string", indexComp, indexElem, indexComp2, indexElem2);
      }
      else{
        var addr = architecture.components[indexComp].elements[indexElem].value;
        var value = "";
        var valueIndex = 0;

        for (var i = 0; i < architecture.components[indexComp2].elements[indexElem2].value && i < this.keyboard.length; i++){
          value = value + this.keyboard.charAt(i);
        }

        console_log(value);

        var auxAddr = data_address;
        var index;

        if((parseInt(addr) > architecture.memory_layout[0].value && parseInt(addr) < architecture.memory_layout[1].value) ||  parseInt(addr) == architecture.memory_layout[0].value || parseInt(addr) == architecture.memory_layout[1].value){
          /*show_notification('Segmentation fault. You tried to write in the text segment', 'danger') ;
          instructions[executionIndex-1]._rowVariant = 'danger';*/
          executionIndex = -1;
          this.keyboard = "";
          //return;
          return packExecute(true, 'Segmentation fault. You tried to write in the text segment', 'danger', null);
        }

        if((parseInt(addr) > architecture.memory_layout[2].value && parseInt(addr) < architecture.memory_layout[3].value) ||  parseInt(addr) == architecture.memory_layout[2].value || parseInt(addr) == architecture.memory_layout[3].value){
          index = memory_hash[0];
        }

        if((parseInt(addr) > architecture.memory_layout[4].value && parseInt(addr) < architecture.memory_layout[5].value) ||  parseInt(addr) == architecture.memory_layout[4].value || parseInt(addr) == architecture.memory_layout[5].value){
          index = memory_hash[2];
        }

        for (var i = 0; i < memory[index].length && this.keyboard.length > 0; i++){
          for (var j = 0; j < memory[index][i].Binary.length; j++){
            var aux = "0x"+(memory[index][i].Binary[j].Addr).toString(16);
            if(aux == addr){
              for (var j = j; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
                memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
                auxAddr = memory[index][i].Binary[j].Addr;
                valueIndex++;
                addr++;
              }

              memory[index][i].Value = "";
              for (var j = 0; j < memory[index][i].Binary.length; j++){
                memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
              }

              if((i+1) < memory[index].length && valueIndex < value.length){
                i++;
                for (var j = 0; j < memory[index][i].Binary.length && valueIndex < value.length; j++){
                  memory[index][i].Binary[j].Bin = (value.charCodeAt(valueIndex)).toString(16);
                  auxAddr = memory[index][i].Binary[j].Addr;
                  valueIndex++;
                  addr++;
                }

                memory[index][i].Value = "";
                for (var j = 0; j < memory[index][i].Binary.length; j++){
                  memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
                }

              }
              else if(valueIndex < value.length){
                data_address = auxAddr;
                memory[index].push({Address: data_address, Binary: [], Value: null, DefValue: null, reset: false});
                i++;
                for (var z = 0; z < 4; z++){
                  if(valueIndex < value.length){
                    (memory[index][i].Binary).push({Addr: data_address, DefBin: (value.charCodeAt(valueIndex)).toString(16), Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
                    valueIndex++;
                    data_address++;
                  }
                  else{
                    (memory[index][i].Binary).push({Addr: data_address, DefBin: "00", Bin: "00", Tag: null},);
                    data_address++;
                  }
                }
                
                memory[index][i].Value = "";
                for (var j = 0; j < memory[index][i].Binary.length; j++){
                  memory[index][i].Value = String.fromCharCode(parseInt(memory[index][i].Binary[j].Bin, 16)) + " " + memory[index][i].Value;
                }
              }
            }
          }
        }

        if(valueIndex == value.length){
          this.keyboard = "";
          consoleMutex = false;
          mutexRead = false;
          app._data.enter = null;

          if(window.document)
            show_notification('The data has been uploaded', 'info');


          if(executionIndex >= instructions.length){
            for (var i = 0; i < instructions.length; i++) {
              //instructions[i]._rowVariant = '';
              draw.space.push(i);
            }

            executionIndex = -2;
            /*show_notification('The execution of the program has finished', 'success') ;
            return;*/

            return packExecute(true, 'The execution of the program has finished', 'success', draw);
          }
          else if(runExecution == false){
            this.executeProgram();
          }

          return;
        }

        var auxAddr = parseInt(addr);

        while(valueIndex < value.length){
          memory[index].push({Address: auxAddr, Binary: [], Value: "", DefValue: "", reset: false});
          for (var z = 0; z < 4; z++){
            if(valueIndex > value.length-1){
              (memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: "00", Tag: null},);
            }
            else{
              (memory[index][i].Binary).push({Addr: auxAddr, DefBin: "00", Bin: (value.charCodeAt(valueIndex)).toString(16), Tag: null},);
              memory[index][i].Value = value.charAt(valueIndex) + " " + memory[index][i].Value;
            }
            auxAddr++;
            valueIndex++;
          }
          i++;
        }

        app._data.memory[index] = memory[index];
        
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(executionIndex >= instructions.length){
          for (var i = 0; i < instructions.length; i++) {
            //instructions[i]._rowVariant = '';
            draw.space.push(i);
          }

          executionIndex = -2;
          /*show_notification('The execution of the program has finished', 'success') ;
          return;*/

          return packExecute(true, 'The execution of the program has finished', 'success', draw);
        }
        else if(runExecution == false){
          this.executeProgram();
        }

        break;
      }

      break;
    case "sbrk":
      var aux_addr = architecture.memory_layout[3].value;

      if((architecture.memory_layout[3].value+parseInt(architecture.components[indexComp].elements[indexElem].value)) >= architecture.memory_layout[4].value){
        /*show_notification('Not enough memory for data segment', 'danger') ;
        instructions[executionIndex]._rowVariant = 'danger';*/
        executionIndex = -1;
        //return;
        return packExecute(true, 'Not enough memory for data segment', 'success', null);
      }

      for (var i = 0; i < ((parseInt(architecture.components[indexComp].elements[indexElem].value))/4); i++){
        memory[memory_hash[0]].push({Address: aux_addr, Binary: [], Value: null, DefValue: null, reset: true});
        for (var z = 0; z < 4; z++){
          (memory[memory_hash[0]][memory[memory_hash[0]].length-1].Binary).push({Addr: aux_addr, DefBin: "00", Bin: "00", Tag: null},);
          aux_addr++;
        }
      }

      app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
      architecture.memory_layout[3].value = aux_addr-1;
      this.architecture.memory_layout[3].value = aux_addr-1;

      break;
    case "exit":
      executionIndex = instructions.length + 1;
      break;
    case "print_char":
      var aux = architecture.components[indexComp].elements[indexElem].value;
      var aux2 = aux.toString(16);
      var length = aux2.length;

      var value = aux2.substring(length-2, length);
      this.display = this.display + String.fromCharCode(parseInt(value, 16));
      break;
    case "read_char":
      mutexRead = true;
      app._data.enter = false;
      console_log(mutexRead);
      if(newExecution == true){
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        if(runExecution == false){
          this.executeProgram();
        }

        return;
      }
      if(consoleMutex == false){
        setTimeout(this.syscall, 1000, "read_char", indexComp, indexElem, indexComp2, indexElem2);
      }
      else{
        var value = (this.keyboard).charCodeAt(0);
        this.writeRegister(value, indexComp, indexElem);
        this.keyboard = "";
        consoleMutex = false;
        mutexRead = false;
        app._data.enter = null;

        if(window.document)
          show_notification('The data has been uploaded', 'info') ;

        console_log(mutexRead);

        if(executionIndex >= instructions.length){
          for (var i = 0; i < instructions.length; i++) {
            //instructions[i]._rowVariant = '';
            draw.space.push(i);
          }

          executionIndex = -2;
          /*show_notification('The execution of the program has finished', 'success') ;
          return;*/

          return packExecute(true, 'The execution of the program has finished', 'success', draw);
        }
        else if(runExecution == false){
          this.executeProgram();
        }

        break;
      }
      break;
  }
}

/*Divides a double into two parts*/
function divDouble(reg, index){
  var value = bin2hex(double2bin(reg));
  console_log(value);
  if(index == 0){
    return "0x" + value.substring(0,8);
  }
  if(index == 1) {
    return "0x" + value.substring(8,16);
  }
}









/*Reset execution*/
function reset (){
  for (var i = 0; i < instructions.length; i++) {
    instructions[i]._rowVariant = '';
  }
  executionIndex = 0;
  executionInit = 1;
  
  /*Reset stats*/
  totalStats=0;
  for (var i = 0; i < stats.length; i++){
    stats[i].percentage = 0;
    stats[i].number_instructions = 0;
  }

  /*Reset console*/
  mutexRead    = false;
  newExecution = true;

  for (var i = 0; i < architecture_hash.length; i++) {
    for (var j = 0; j < architecture.components[i].elements.length; j++) {
      if(architecture.components[i].double_precision == false){
        architecture.components[i].elements[j].value = architecture.components[i].elements[j].default_value;
      }

      else{
        var aux_value;
        var aux_sim1;
        var aux_sim2;

        for (var a = 0; a < architecture_hash.length; a++) {
          for (var b = 0; b < architecture.components[a].elements.length; b++) {
            if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[0]){
              aux_sim1 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
            }
            if(architecture.components[a].elements[b].name == architecture.components[i].elements[j].simple_reg[1]){
              aux_sim2 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
            }
          }
        }

        aux_value = aux_sim1 + aux_sim2;
        architecture.components[i].elements[j].value = hex2double("0x" + aux_value);
      }
    }
  }

  architecture.memory_layout[4].value = backup_stack_address;
  architecture.memory_layout[3].value = backup_data_address;

  for (var i = 0; i < memory[memory_hash[0]].length; i++) {
    if(memory[memory_hash[0]][i].reset == true){
      memory[memory_hash[0]].splice(i, 1);
      i--;
    }
    else{
      memory[memory_hash[0]][i].Value = memory[memory_hash[0]][i].DefValue;
      for (var j = 0; j < memory[memory_hash[0]][i].Binary.length; j++) {
        memory[memory_hash[0]][i].Binary[j].Bin = memory[memory_hash[0]][i].Binary[j].DefBin;
      }
    }
  }

  for (var i = 0; i < memory[memory_hash[2]].length; i++) {
    if(memory[memory_hash[2]][i].reset == true){
      memory[memory_hash[2]].splice(i, 1);
      i--;
    }
    else{
      memory[memory_hash[2]][i].Value = memory[memory_hash[2]][i].DefValue;
      for (var j = 0; j < memory[memory_hash[2]][i].Binary.length; j++) {
        memory[memory_hash[2]][i].Binary[j].Bin = memory[memory_hash[2]][i].Binary[j].DefBin;
      }
    }
  }

  unallocated_memory = [];

  for (var i = 0; i < instructions.length; i++) {
    if(instructions[i].Label == "main"){
      if(window.document)
        instructions[i]._rowVariant = 'success';
    }
  }
}

