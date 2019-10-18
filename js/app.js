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



/****************
 * Vue instance *
 ****************/
try{

  window.app = new Vue({

    /*DOM ID*/
    el: "#app",


    /*Vue data*/
    data: {
      /*Global*/
      /*View*/
      creator_mode: "load_architecture",
      /*Notification speed*/
      notificationTime: 1500,
      /*Debug*/
      c_debug: false,
      /*Dark Mode*/
      dark: false,
      dark_mode_style: "",




      /*Architecture editor*/

      /*Available architectures*/
      arch_available: architecture_available,
      /*Architectures card background*/
      back_card: back_card,
      /*Backup date*/
      date_copy: '',
      /*New architecture modal*/
      showLoadArch: false,
      /*New architecture form*/
      name_arch: '',
      description_arch: '',
      load_arch: '',
      /*Delete architecture modal*/
      modalDeletArch:{
        title: '',
        index: 0,
      },
      /*Architecture name*/
      architecture_name: '',
      /*Architecture bits*/
      number_bits: 32,
      /*Load architecture*/
      architecture: architecture,
      architecture_hash: architecture_hash,
      /*Saved file name*/
      name_arch_save: '',
      /*Advanced mode*/
      advanced_mode: true,
      /*Memory layout form*/
      memory_layout: ["", "", "", "", "", ""],
      /*Memory layout reset*/
      modalResetMem: {
        title: '',
        element: '',
      },
      /*Align memory*/
      align: false,
      /*Component table fields*/
      archFields: ['name', 'ID', 'nbits', 'default_value', 'properties', 'actions'],
      /*Components types*/
      componentsTypes: componentsTypes,
      /*Floating point registers*/
      simple_reg: [],
      /*Components reset*/
      modalResetArch: {
        title: '',
        element: '',
      },
      /*Modals components*/
      showNewComponent: false,
      showEditComponent: false,
      /*Edit component modal*/
      modalEditComponent: {
        title: '',
        element: '',
      },
      /*Delete component modal*/
      modalDeletComp:{
        title: '',
        element: '',
      },
      /*Modals elements*/
      showNewElement: false,
      showEditElement: false,
      /*New element modal*/
      modalNewElement:{
        title: '',
        element: '',
        type: '',
        double_precision: '',
        simple1: '',
        simple2: '',
      },
      /*Edit element modal*/
      modalEditElement:{
        title: '',
        element: '',
        type: '',
        double_precision: '',
        simple1: '',
        simple2: '',
      },
      /*Delete element modal*/
      modalDeletElement:{
        title: '',
        element: '',
      },
      /*Element form*/
      formArchitecture: {
        name: '',
        id: '',
        type: '',
        defValue: '',
        properties: [],
        precision: '',
      },
      /*Instructions table fields*/
      instFields: ['name', 'co', 'cop', 'nwords', 'signature', 'signatureRaw', 'fields', 'definition', 'actions'],
      /*Instructions types*/
      instructionsTypes: instructionsTypes,
      /*Instructions fields*/
      modalViewFields:{
        title: '',
        element: '',
        co: '',
        cop: '',
      },
      /*Instructions reset*/
      modalResetInst:{
        title: '',
        element: '',
      },
      /*Modals instructions*/
      showNewInstruction: false,
      showEditInstruction: false,
      /*Modal pagination*/
      instructionFormPage: 1,
      instructionFormPageLink: ['#Principal', '#Fields', '#Syntax', '#Definition'],
      /*Edit instruction modal*/
      modalEditInst:{
        title: '',
        element: '',
        co: '',
        cop: '',
      },
      /*Delete instruction modal*/
      modalDeletInst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Instruction form*/
      formInstruction: {
        name: '',
        type: '',
        co: '',
        cop: '',
        nwords: 1,
        numfields: "1",
        numfieldsAux: "1",
        nameField: [],
        typeField: [],
        startBitField: [],
        stopBitField: [],
        valueField: [],
        assignedCop: false,
        signature: '',
        signatureRaw: '',
        signature_definition: '',
        definition: '',
      },
      /*Pseudoinstructions table fields*/
      pseudoinstFields: ['name', 'nwords', 'signature', 'signatureRaw', 'fields', 'definition', 'actions'],
      /*Pseudoinstructions reset*/
      modalResetPseudoinst:{
        title: '',
        element: '',
      },
      /*Modals pseudoinstructions*/
      showNewPseudoinstruction: false,
      showEditPseudoinstruction: false,
      /*Edit pseudoinstruction modal*/
      modalEditPseudoinst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Delete pseudoinstruction modal*/
      modalDeletPseudoinst:{
        title: '',
        element: '',
        index: 0,
      },
      /*Pseudoinstruction form*/
      formPseudoinstruction: {
        name: '',
        nwords: 1,
        numfields: "0",
        numfieldsAux: "0",
        nameField: [],
        typeField: [],
        startBitField: [],
        stopBitField: [],
        signature: '',
        signatureRaw: '',
        signature_definition: '',
        definition: '',
      },
      /*Directives table fields*/
      directivesFields: ['name', 'action', 'size', 'actions'],
      /*Directives types*/
      actionTypes: actionTypes,
      /*Directives reset*/
      modalResetDir: {
        title: '',
        element: '',
      },
      /*Modals directives*/
      showNewDirective: false,
      showEditDirective: false,
      /*Edit directive modal*/
      modalEditDirective:{
        title: '',
        element: '',
      },
      /*Delete pseudoinstruction modal*/
      modalDeletDir:{
        title: '',
        element: '',
      },
      /*Directive form*/
      formDirective:{
        name: '',
        action: '',
        size: 0,
      },
      


      /*Compilator*/
      
      /*Available examples*/
      example_available: example_available,
      
      load_assembly: '',
      /*Saved file name*/
      save_assembly: '',
      /*Code error modal*/
      modalAssemblyError:{
        code1: '',
        code2: '',
        code3: '',
        error: '',
      },
      /*Binary code loaded*/
      name_binary_load: '',
      /*Load binary*/
      load_binary: false,
      update_binary: update_binary,
      /*Saved file name*/
      name_binary_save: '',
      /*Assembly code*/
      assembly_code: "",
      

      
      /*Simulator*/

      /*Alert toasts content*/
      alertMessage: '',
      type: '',
      /*Displayed notifications*/
      notifications: notifications,
      /*Accesskey*/
      navigator: "",
      /*Calculator*/
      calculator: {
        bits: 32,
        hexadecimal: "",
        sign: "",
        exponent: "",
        mantissa: "",
        mantisaDec: 0,
        exponentDec: "",
        decimal: "",
        variant32: "primary",
        variant64: "outline-primary",
        lengthHexadecimal: 8,
        lengthSign: 1,
        lengthExponent: 8,
        lengthMantissa: 23,
      },
      /*Run instructions*/
      instructionsPacked: 20,
      /*Run button*/
      runExecution: false,
      /*Reset button*/
      resetBut: false,
      /*Instrutions table fields*/
      archInstructions: ['Break', 'Address', 'Label', 'User Instructions', 'Loaded Instructions'],
      /*Instructions memory*/
      instructions: instructions,
      /*Register type displayed*/
      register_type: 'integer',
      /*Register select*/
      nameTabReg: 'Decimal',
      nameReg: 'INT Registers',
      register_popover: '',
      /*Data mode*/
      data_mode: 'registers',
      /*Register form*/
      newValue: '',
      /*Memory table fields*/
      memFields: ['Address', 'Binary', 'Value'],
      /*Memory*/
      memory: memory,
      unallocated_memory: unallocated_memory,
      /*Stats table fields*/
      statsFields: {
        type: {
          label: 'Type',
          sortable: true
        },
        number_instructions: {
          label: 'Number of instructions',
          sortable: true
        },
        percentage: {
          label: 'Percentage',
          sortable: true
        },
        abbreviation: {
          label: 'Abbreviation',
          sortable: false
        },
      },
      /*Stats*/
      stats: stats,
      /*Display*/
      display: '',
      /*Keyboard*/
      keyboard: '', 
      enter: null,
    },


    /*Created vue instance*/
    created(){
      this.load_arch_available();
      this.load_examples_available();
      this.detectNavigator();
    },


    /*Mounted vue instance*/
    mounted(){
      this.backupCopyModal();
      this.verifyNavigator();
    },


    /*Vue methods*/
    methods:{
      /*Generic*/
      /*Dark  Mode*/
      change_dark_mode(){
        app._data.dark= !app._data.dark;
        if (app._data.dark){
          document.getElementsByTagName("body")[0].style = "filter: invert(88%) hue-rotate(160deg) !important; background-color: #111 !important;";
          localStorage.setItem("dark_mode", "filter: invert(88%) hue-rotate(160deg) !important; background-color: #111 !important;");
        }
        else{
          document.getElementsByTagName("body")[0].style = "";
          localStorage.setItem("dark_mode", "");

        }
      },
      verifyNavigator(){
        if (navigator.userAgent.indexOf("OPR") > -1) {
          this.$refs.navigator.show();
        } 
        else if (navigator.userAgent.indexOf("MIE") > -1) {
          this.$refs.navigator.show();
        }
        else if (navigator.userAgent.indexOf("Edge") > -1) {
          this.$refs.navigator.show();
        } 
        else if(navigator.userAgent.indexOf("Chrome") > -1) {
          return;
        } 
        else if (navigator.userAgent.indexOf("Safari") > -1) {
          return;
        } 
        else if (navigator.userAgent.indexOf("Firefox") > -1) {
          return
        } 
        else{
          this.$refs.navigator.show();
        }
      },
      change_UI_mode(e){
      	// slow transition <any> => "architecture"
      	if (e == "architecture") 
      	{
      	    $(".loading").show();
                  setTimeout(function(){
      		          app._data.creator_mode = e;
      			  app.$forceUpdate();
      	                  $(".loading").hide();
      		       }, 50) ;
      	    return ;
      	}

      	// fast transition <any> => <any> - "architecture"
      	app._data.creator_mode = e;

      	if(e == "assembly"){
      	  setTimeout(function(){
      	    codemirrorStart();
      	    if(app._data.update_binary != ""){
      	      $("#divAssembly").attr("class", "col-lg-10 col-sm-12");
      	      $("#divTags").attr("class", "col-lg-2 col-sm-12");
      	      $("#divTags").show();
      	    }
      	  },50);
      	}
      	else{
      	  if(textarea_assembly_editor != null){
      	    app._data.assembly_code = textarea_assembly_editor.getValue();
      	    textarea_assembly_editor.toTextArea();
      	  }
      	}

      	app.$forceUpdate();
      },


      /*Architecture editor*/

      /*Load the available architectures and check if exists backup*/
      load_arch_available(){
        $.getJSON('architecture/available_arch.json', function(cfg){
          architecture_available = cfg;
          
          if (typeof(Storage) !== "undefined"){
            if(localStorage.getItem("load_architectures_available") != null){
              var auxArch = localStorage.getItem("load_architectures_available");
              var aux = JSON.parse(auxArch);

              for (var i = 0; i < aux.length; i++){
                architecture_available.push(aux[i]);
                load_architectures_available.push(aux[i]);

                var auxArch2 = localStorage.getItem("load_architectures");
                var aux2 = JSON.parse(auxArch2);
                load_architectures.push(aux2[i]);
              }
            }
          }

          app._data.arch_available = architecture_available;

          for (var i = 0; i < architecture_available.length; i++){
            back_card.push({name: architecture_available[i].name , background: "default"});
          }
        });
      },
      /*Change the background of selected achitecture card*/
      change_background(name, type){
        if(type == 1){
          for (var i = 0; i < back_card.length; i++){
            if(name == back_card[i].name){
              back_card[i].background = "secondary";
            }
            else{
              back_card[i].background = "default";
            }
          }
        }
        if(type == 0){
          for (var i = 0; i < back_card.length; i++){
            back_card[i].background = "default";
          }
        }
      },
      /*Show backup modal*/
      backupCopyModal(){
        if (typeof(Storage) !== "undefined"){
          if(localStorage.getItem("architecture_copy") != null && localStorage.getItem("assembly_copy") != null && localStorage.getItem("date_copy") != null){
            this.date_copy = localStorage.getItem("date_copy");
            this.$refs.copyRef.show();
          }
        }
      },
      /*Load backup*/
      load_copy(){
        this.architecture_name = localStorage.getItem("arch_name");
        
        var auxArchitecture = JSON.parse(localStorage.getItem("architecture_copy"));
        architecture = bigInt_deserialize(auxArchitecture);

        app._data.architecture = architecture;
        app._data.assembly_code = localStorage.getItem("assembly_copy");
                  code_assembly = app._data.assembly_code ;
        //textarea_assembly_editor.setValue(localStorage.getItem("assembly_copy"));

        architecture_hash = [];
        for (var i = 0; i < architecture.components.length; i++){
          architecture_hash.push({name: architecture.components[i].name, index: i}); 
          app._data.architecture_hash = architecture_hash;
        }

        backup_stack_address = architecture.memory_layout[4].value;
        backup_data_address = architecture.memory_layout[3].value;

        this.reset();

        //$("#architecture_menu").hide();
        app.change_UI_mode('simulator');
        app.change_data_view('registers' , 'integer');
        app.$forceUpdate();
        /*$("#save_btn_arch").show();
        $("#advanced_mode").show();
        $("#assembly_btn_arch").show();
        $("#load_arch_btn_arch").hide();
        $("#sim_btn_arch").show();
        $("#load_arch").hide();
        $("#load_menu_arch").hide();
        $("#view_components").show();*/

        this.$refs.copyRef.hide();

        show_notification('The backup has been loaded correctly', 'success') ;
      },
      /*Delete backup*/
      remove_copy(){
        localStorage.removeItem("architecture_copy");
        localStorage.removeItem("assembly_copy");
        localStorage.removeItem("date_copy");
        this.$refs.copyRef.hide();
      },
      /*Load the selected architecture*/
      load_arch_select(e){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(e == load_architectures[i].id){
            var auxArchitecture = JSON.parse(load_architectures[i].architecture);
            architecture = bigInt_deserialize(auxArchitecture);

            app._data.architecture = architecture;

            architecture_hash = [];
            for (var i = 0; i < architecture.components.length; i++){
              architecture_hash.push({name: architecture.components[i].name, index: i}); 
              app._data.architecture_hash = architecture_hash;
            }

            backup_stack_address = architecture.memory_layout[4].value;
            backup_data_address = architecture.memory_layout[3].value;

            app._data.architecture_name = e;

            //$("#architecture_menu").hide();
            app.change_UI_mode('simulator');
            app.change_data_view('registers' , 'integer');
            app.$forceUpdate();
            hide_loading();

            show_notification('The selected architecture has been loaded correctly', 'success') ;
            return;
          }
        }

        $.getJSON('architecture/'+e+'.json', function(cfg){
          var auxArchitecture = cfg;
          architecture = bigInt_deserialize(auxArchitecture);
          app._data.architecture = architecture;

          architecture_hash = [];
          for (var i = 0; i < architecture.components.length; i++){
            architecture_hash.push({name: architecture.components[i].name, index: i}); 
            app._data.architecture_hash = architecture_hash;
          }

          backup_stack_address = architecture.memory_layout[4].value;
          backup_data_address = architecture.memory_layout[3].value;

          app._data.architecture_name = e;

          //$("#architecture_menu").hide();
          app.change_UI_mode('simulator');
          app.change_data_view('registers' , 'integer');
          app.$forceUpdate();
          hide_loading();

          show_notification('The selected architecture has been loaded correctly', 'success') ;
        })

        .fail(function() {
          hide_loading();
          show_notification('The selected architecture is not currently available', 'info') ;
        });
      },
      /*Read the JSON of new architecture*/
      read_arch(e){
        show_loading();

        e.preventDefault();
        if(!this.name_arch || !this.load_arch){
          hide_loading();
          show_notification('Please complete all fields', 'danger') ;
          return;
        }

        this.showLoadArch = false;

        var file;
        var reader;
        var files = document.getElementById('arch_file').files;

        for (var i = 0; i < files.length; i++){
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event){
          architecture_available.push({name: app._data.name_arch, img: "./images/personalized_logo.png", alt: app._data.name_arch + " logo" , id:"select_conf"+app._data.name_arch , description: app._data.description_arch});
          load_architectures_available.push({name: app._data.name_arch, img: "./images/personalized_logo.png", alt: app._data.name_arch + " logo" , id:"select_conf"+app._data.name_arch , description: app._data.description_arch});
          back_card.push({name: architecture_available[architecture_available.length-1].name , background: "default"});
          load_architectures.push({id: app._data.name_arch, architecture: event.currentTarget.result});

          if (typeof(Storage) !== "undefined"){
            var auxArch = JSON.stringify(load_architectures, null, 2);
            localStorage.setItem("load_architectures", auxArch);

            auxArch = JSON.stringify(load_architectures_available, null, 2);
            localStorage.setItem("load_architectures_available", auxArch);
          }

          show_notification('The selected architecture has been loaded correctly', 'success') ;
          
          app._data.name_arch = '';
          app._data.description_arch = '';
          app._data.load_arch = '';

          hide_loading();
        }
      },
      /*Create a new architecture*/
      new_arch(){
        //$("#architecture_menu").hide();
        app.change_UI_mode('simulator');
        app.change_data_view('registers' , 'integer');
        app.$forceUpdate();
        hide_loading();
      },
      /*Check if it is a new architecture*/
      default_arch(item){
        for (var i = 0; i < load_architectures_available.length; i++) {
          if(load_architectures_available[i].name == item){
            return true;
          }
        }
        return false;
      },
      /*Show remove architecture modal*/
      modal_remove_cache_arch(index, elem, button){
        this.modalDeletArch.title = "Delete Architecture";
        this.modalDeletArch.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletArch', button);
      },
      /*Remove architecture*/
      remove_cache_arch(index){
        var id = architecture_available[index].name;

        for (var i = 0; i < load_architectures.length; i++){
          if(load_architectures[i].id == id){
            load_architectures.splice(i, 1);
          }
        }

        for (var i = 0; i < load_architectures_available.length; i++){
          if(load_architectures_available[i].name == id){
            load_architectures_available.splice(i, 1);
          }
        }

        architecture_available.splice(index, 1);

        var auxArch = JSON.stringify(load_architectures, null, 2);
        localStorage.setItem("load_architectures", auxArch);

        auxArch = JSON.stringify(load_architectures_available, null, 2);
        localStorage.setItem("load_architectures_available", auxArch);

        show_notification('Architecture deleted successfully', 'success') ;
      },
      /*Save the current architecture in a JSON file*/
      arch_save(){
        var auxObject = jQuery.extend(true, {}, architecture);
        var auxArchitecture = bigInt_serialize(auxObject);

        var textToWrite = JSON.stringify(auxArchitecture, null, 2);
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/json' });
        var fileNameToSaveAs;

        if(this.name_arch_save == ''){
          fileNameToSaveAs = "architecture.json";
        }
        else{
          fileNameToSaveAs = this.name_arch_save + ".json";
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "My Hidden Link";

        window.URL = window.URL || window.webkitURL;

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();

        show_notification('Save architecture', 'success') ;
      },
      /*Change the execution mode of architecture editor*/
      change_mode(){
        if(app._data.advanced_mode == false){
          app._data.advanced_mode = true;
        }
        else{
          app._data.advanced_mode = false;
        }
      },
      /*Show reset modal of memory layout*/
      resetMemModal(elem, button){
        this.modalResetMem.title = "Reset memory layout";
        this.modalResetMem.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetMem', button);
      },
      /*Reset memory layout*/
      resetMemory(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = bigInt_deserialize(auxArch);

            architecture.memory_layout = auxArchitecture.memory_layout;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The memory layout has been reset correctly', 'success') ;
            
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = bigInt_deserialize(auxArchitecture);
          architecture.memory_layout = auxArchitecture2.memory_layout;
          app._data.architecture = architecture;

          hide_loading();
          show_notification('The memory layout has been reset correctly', 'success') ;
        });
      },
      /*Check de memory layout changes*/
      changeMemoryLayout(){
        var auxMemoryLayout = jQuery.extend(true, {}, architecture.memory_layout);

        for(var i = 0; i < this.memory_layout.length; i++){
          if(this.memory_layout[i] != "" && this.memory_layout[i] != null){
            if(!isNaN(parseInt(this.memory_layout[i]))){
              auxMemoryLayout[i].value = parseInt(this.memory_layout[i]);
              if (auxMemoryLayout[i].value < 0) {
                  show_notification('The value can not be negative', 'danger') ;
                  return;
              }
            }
            else {
                  show_notification('The value must be a number', 'danger') ;
                  return;
            }
          }
        }

        for(var i = 0; i < 6; i++){
          /*if (i%2 == 0 && auxMemoryLayout[i].value % 4 != 0){
                show_notification('The memory must be aligned', 'danger') ;
                return;
            }*/

          for (var j = i; j < 6; j++) {
            if (auxMemoryLayout[i].value > auxMemoryLayout[j].value) {
                show_notification('The segment can not be overlap', 'danger') ;
                return;
            }
          }
        }

        for(var i = 0; i < 6; i++){
          architecture.memory_layout[i].value = auxMemoryLayout[i].value;
        }

        app._data.architecture = architecture;

        backup_stack_address = architecture.memory_layout[4].value;
        backup_data_address = architecture.memory_layout[3].value;

        for(var i = 0; i < 6; i++){
          app._data.memory_layout[i] = "";
        }
        app.$forceUpdate();
      },
      /*Register ID assigment*/
      element_id(name, type, double){
        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].elements[j].name == name){
              return id;
            }
            if(architecture.components[i].type == type && architecture.components[i].double_precision == double){
              id++;
            }
          }
        }
      },
      /*Show reset modal of components*/
      resetArchModal(elem, button){
        this.modalResetArch.title = "Reset " + elem + " registers";
        this.modalResetArch.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetArch', button);
      },
      /*Reset components*/
      resetArchitecture(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = bigInt_deserialize(auxArch);

            architecture.components = auxArchitecture.components;
            app._data.architecture = architecture;

            architecture_hash = [];
            for (var i = 0; i < architecture.components.length; i++) {
              architecture_hash.push({name: architecture.components[i].name, index: i}); 
              app._data.architecture_hash = architecture_hash;
            }

            hide_loading();
            show_notification('The registers has been reset correctly', 'success') ;
            
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = bigInt_deserialize(auxArchitecture);
          architecture.components = auxArchitecture2.components;

          app._data.architecture = architecture;

          architecture_hash = [];
          for (var i = 0; i < architecture.components.length; i++){
            architecture_hash.push({name: architecture.components[i].name, index: i}); 
            app._data.architecture_hash = architecture_hash;
          }

          hide_loading();
          show_notification('The registers has been reset correctly', 'success') ;
        });
      },

      /*Verify all field of new component*/
      newComponentVerify(evt){
        evt.preventDefault();
        if (!this.formArchitecture.name || !this.formArchitecture.type) {
            show_notification('Please complete all fields', 'danger') ;
        } 
        else{
          this.newComponent();
        }
      },
      /*Create a new component*/
      newComponent(){
        for (var i = 0; i < architecture_hash.length; i++) {
          if (this.formArchitecture.name == architecture_hash[i].name) {
              show_notification('The component already exists', 'danger') ;
              return;
          }
        }

        this.showNewComponent = false;

        var precision = false;
        if (this.formArchitecture.precision == "precision"){
            precision = true;
        }

        var newComp = {name: this.formArchitecture.name, type: this.formArchitecture.type, double_precision: precision ,elements:[]};
        architecture.components.push(newComp);
        var newComponentHash = {name: this.formArchitecture.name, index: architecture_hash.length};
        architecture_hash.push(newComponentHash);
      },
      /*Show edit component modal*/
      editCompModal(comp, index, button){
        this.modalEditComponent.title = "Edit Component";
        this.modalEditComponent.element = comp;
        this.formArchitecture.name = comp;
        this.$root.$emit('bv::show::modal', 'modalEditComponent', button);
      },
      /*Verify all field of modified component*/
      editCompVerify(evt, comp){
        evt.preventDefault();
        if (!this.formArchitecture.name) {
            show_notification('Please complete all fields', 'danger') ;
        } 
        else {
            this.editComponent(comp);
        }
      },
      /*Edit the component*/
      editComponent(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          if ((this.formArchitecture.name == architecture_hash[i].name) && (comp != this.formArchitecture.name)){
              show_notification('The component already exists', 'danger') ;
              return;
          }
        }

        this.showEditComponent = false;

        for (var i = 0; i < architecture_hash.length; i++){
          if(comp == architecture_hash[i].name){
            architecture_hash[i].name = this.formArchitecture.name;
            architecture.components[i].name = this.formArchitecture.name;
          }
        }
        this.formArchitecture.name ='';
      },
      /*Show delete component modal*/
      delCompModal(elem, button){
        this.modalDeletComp.title = "Delete Component";
        this.modalDeletComp.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletComp', button);
      },
      /*Delete the component*/
      delComponent(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          if(comp == architecture_hash[i].name){
            architecture.components.splice(i,1);
            architecture_hash.splice(i,1);
            for (var j = 0; j < architecture_hash.length; j++){
              architecture_hash[j].index = j;
            }
          }
        }
      },
      /*Show new element modal*/
      newElemModal(comp, index, button){
        this.modalNewElement.title = "New element";
        this.modalNewElement.element = comp;
        this.modalNewElement.type = architecture.components[index].type;
        this.modalNewElement.double_precision = architecture.components[index].double_precision;

        this.$root.$emit('bv::show::modal', 'modalNewElement', button);

        app._data.simple_reg = [];
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length && architecture.components[i].type =="floating point" && architecture.components[i].double_precision == false; j++){
            app._data.simple_reg.push({ text: architecture.components[i].elements[j].name, value: architecture.components[i].elements[j].name},);
          }
        }

        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].name == comp && architecture.components[i].elements.length-1 == j){
              id++;
              this.formArchitecture.id = id;
            }
            if(architecture.components[i].type == architecture.components[index].type && architecture.components[i].double_precision == architecture.components[index].double_precision){
              id++;
            }
          }
        }
      },
      /*Verify all field of new element*/
      newElementVerify(evt, comp){
        evt.preventDefault();
        if (!this.formArchitecture.name){
             show_notification('Please complete all fields', 'danger') ;
        } 
        else{
          if (!this.formArchitecture.defValue && this.formArchitecture.double_precision == false){
             show_notification('Please complete all fields', 'danger') ;
          }
          else if(isNaN(this.formArchitecture.defValue)){
             show_notification('The default value must be a number', 'danger') ;
          }
          else{
            this.newElement(comp);
          }
        }
      },

      /*Create a new element*/
      newElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if (this.formArchitecture.name == architecture.components[i].elements[j].name){
                show_notification('The element already exists', 'danger') ;
                return;
            }
          } 
        }

        this.showNewElement = false;

        for (var i = 0; i < architecture_hash.length; i++){
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "integer")){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: bigInt(parseInt(this.formArchitecture.defValue) >>> 0, 10).value, default_value:bigInt(parseInt(this.formArchitecture.defValue) >>> 0, 10).value, properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "control")){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: bigInt(parseInt(this.formArchitecture.defValue) >>> 0, 10).value, default_value:bigInt(parseInt(this.formArchitecture.defValue) >>> 0, 10).value, properties: ["read", "write"]};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "floating point")&&(architecture.components[i].double_precision == false)){
            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits, value: parseFloat(this.formArchitecture.defValue), default_value:parseFloat(this.formArchitecture.defValue), properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
          if((comp == architecture_hash[i].name)&&(architecture.components[i].type == "floating point")&&(architecture.components[i].double_precision == true)){
            var aux_new;
            var aux_value;
            var aux_sim1;
            var aux_sim2;

            for (var a = 0; a < architecture_hash.length; a++){
              for (var b = 0; b < architecture.components[a].elements.length; b++) {
                if(architecture.components[a].elements[b].name == this.formArchitecture.simple1){
                  aux_sim1 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
                }
                if(architecture.components[a].elements[b].name == this.formArchitecture.simple2){
                  aux_sim2 = bin2hex(float2bin(architecture.components[a].elements[b].default_value));
                }
              }
            }

            aux_value = aux_sim1 + aux_sim2;
            aux_new = hex2double("0x" + aux_value);

            var newElement = {name:this.formArchitecture.name, nbits: this.number_bits*2, value: aux_new, properties: this.formArchitecture.properties};
            architecture.components[i].elements.push(newElement);
            break;
          }
        }
      },
      /*Show edit element modal*/
      editElemModal(elem, comp, button){
        this.modalEditElement.title = "Edit Element";
        this.modalEditElement.element = elem;
        this.modalEditElement.type = architecture.components[comp].type;
        this.modalEditElement.double_precision = architecture.components[comp].double_precision;

        app._data.simple_reg = [];
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length && architecture.components[i].type =="floating point" && architecture.components[i].double_precision == false; j++){
            app._data.simple_reg.push({ text: architecture.components[i].elements[j].name, value: architecture.components[i].elements[j].name},);
          }
        }

        for(var j=0; j < architecture.components[comp].elements.length; j++){
          if(elem == architecture.components[comp].elements[j].name){
            this.formArchitecture.name = elem;
            this.formArchitecture.properties = architecture.components[comp].elements[j].properties;
            if(this.modalEditElement.double_precision == true){
              this.formArchitecture.simple1 = architecture.components[comp].elements[j].simple_reg[0];
              this.formArchitecture.simple2 = architecture.components[comp].elements[j].simple_reg[1];
            }
            else{
              this.formArchitecture.defValue = (architecture.components[comp].elements[j].default_value).toString();
            }
          }
        }

        var id = 0;
        for(var i = 0; i < architecture.components.length; i++){
          for(var j = 0; j < architecture.components[i].elements.length; j++){
            if(architecture.components[i].elements[j].name == this.formArchitecture.name){
              this.formArchitecture.id = id;
            }
            if(architecture.components[i].type == architecture.components[comp].type && architecture.components[i].double_precision == architecture.components[comp].double_precision){
              id++;
            }
          }
        }

        this.$root.$emit('bv::show::modal', 'modalEditElement', button);
      },
      /*Check all field of modified element*/
      editElementVerify(evt, comp){
        evt.preventDefault();
        if (!this.formArchitecture.name || !this.formArchitecture.defValue) {
            show_notification('Please complete all fields', 'danger') ;
        } 
        else if(isNaN(this.formArchitecture.defValue)){
          show_notification('The default value must be a number', 'danger') ;
        }
        else {
          this.editElement(comp);
        }
      },
      /*Modify element*/
      editElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for (var j = 0; j < architecture.components[i].elements.length; j++){
            if ((this.formArchitecture.name == architecture.components[i].elements[j].name) && (comp != this.formArchitecture.name)){
                show_notification('The element already exists', 'danger') ;
                return;
            }
          } 
        }

        this.showEditElement = false;

        for (var i = 0; i < architecture_hash.length; i++){
          for(var j=0; j < architecture.components[i].elements.length; j++){
            if(comp == architecture.components[i].elements[j].name){
              architecture.components[i].elements[j].name = this.formArchitecture.name;
              if(architecture.components[i].type == "control" || architecture.components[i].type == "integer"){
                architecture.components[i].elements[j].default_value = bigInt(parseInt(this.formArchitecture.defValue) >>> 0, 10).value;
              }
              else{
                if(architecture.components[i].double_precision == false){
                  architecture.components[i].elements[j].default_value = parseFloat(this.formArchitecture.defValue, 10);
                }
                else{
                  
                  var aux_value;
                  var aux_sim1;
                  var aux_sim2;

                  for (var a = 0; a < architecture_hash.length; a++) {
                    for (var b = 0; b < architecture.components[a].elements.length; b++) {
                      if(architecture.components[a].elements[b].name == this.formArchitecture.simple1){
                        aux_sim1 = bin2hex(float2bin(architecture.components[a].elements[b].value));
                      }
                      if(architecture.components[a].elements[b].name == this.formArchitecture.simple2){
                        aux_sim2 = bin2hex(float2bin(architecture.components[a].elements[b].value));
                      }
                    }
                  }

                  aux_value = aux_sim1 + aux_sim2;

                  architecture.components[i].elements[j].value = hex2double("0x" + aux_value);

                  architecture.components[i].elements[j].simple_reg[0] = this.formArchitecture.simple1;
                  architecture.components[i].elements[j].simple_reg[1] = this.formArchitecture.simple2;
                }
              }
              architecture.components[i].elements[j].properties = this.formArchitecture.properties;
            }
          }
        } 
      },
      /*Show delete element modal*/
      delElemModal(elem, button){
        this.modalDeletElement.title = "Delete Element";
        this.modalDeletElement.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletElement', button);
      },
      /*Delete the element*/
      delElement(comp){
        for (var i = 0; i < architecture_hash.length; i++){
          for(var j=0; j < architecture.components[i].elements.length; j++){
            if(comp == architecture.components[i].elements[j].name){
              architecture.components[i].elements.splice(j,1);
            }
          }
        }
      },
      /*Empty form*/
      emptyFormArch(){
        this.formArchitecture.name = '';
        this.formArchitecture.id = '';
        this.formArchitecture.type = '';
        this.formArchitecture.defValue = '';
        this.formArchitecture.properties = [];
        this.formArchitecture.precision = '';
      },
      /*Show reset instructions modal*/
      resetInstModal(elem, button){
        this.modalResetInst.title = "Reset " + elem + " instructions";
        this.modalResetInst.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetInst', button);
      },
      /*Reset instructions*/
      resetInstructions(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++){
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = bigInt_deserialize(auxArch);

            architecture.instructions = auxArchitecture.instructions;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The instruction set has been reset correctly', 'success') ;
            
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = bigInt_deserialize(auxArchitecture);
          architecture.instructions = auxArchitecture2.instructions;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The instruction set has been reset correctly', 'success') ;
        });
      },
      /*Verify new number of fields*/
      changeNumfield(type){
        if(type == 0){
          if(this.formInstruction.numfields > (this.formInstruction.nwords * 32)){
            this.formInstruction.numfieldsAux = (this.formInstruction.nwords * 32);
            this.formInstruction.numfields = (this.formInstruction.nwords * 32);
          }
          else if(this.formInstruction.numfields < 1){
            this.formInstruction.numfieldsAux = 1;
            this.formInstruction.numfields = 1;
          }
          else{
            this.formInstruction.numfieldsAux = this.formInstruction.numfields;
          }
        }
        if(type == 1){
          if(this.formPseudoinstruction.numfields > (this.formPseudoinstruction.nwords * 32)){
            this.formPseudoinstruction.numfieldsAux = (this.formPseudoinstruction.nwords * 32);
            this.formPseudoinstruction.numfields = (this.formPseudoinstruction.nwords * 32);
          }
          else if(this.formPseudoinstruction.numfields < 0){
            this.formPseudoinstruction.numfieldsAux = 0;
            this.formPseudoinstruction.numfields = 0;
          }
          else{
            this.formPseudoinstruction.numfieldsAux = this.formPseudoinstruction.numfields;
          }
        }
      },
      /*Show instruction fields modal*/
      viewFielsInst(elem, co, cop, button){
        this.modalViewFields.title = "Fields of " + elem;
        this.modalViewFields.element = elem;
        for (var i = 0; i < architecture.instructions.length; i++){
          if(elem == architecture.instructions[i].name && co == architecture.instructions[i].co && cop == architecture.instructions[i].cop){
            this.formInstruction.name = architecture.instructions[i].name;
            this.formInstruction.cop = architecture.instructions[i].cop;
            this.formInstruction.co = architecture.instructions[i].co;
            app._data.modalViewFields.co = architecture.instructions[i].co;
            app._data.modalViewFields.cop = architecture.instructions[i].cop;
            this.formInstruction.numfields = architecture.instructions[i].fields.length;
            this.formInstruction.numfieldsAux = architecture.instructions[i].fields.length;

            for (var j = 0; j < architecture.instructions[i].fields.length; j++) {
              this.formInstruction.nameField [j]= architecture.instructions[i].fields[j].name;
              this.formInstruction.typeField[j] = architecture.instructions[i].fields[j].type;
              this.formInstruction.startBitField[j] = architecture.instructions[i].fields[j].startbit;
              this.formInstruction.stopBitField[j] = architecture.instructions[i].fields[j].stopbit;
              this.formInstruction.valueField[j] = architecture.instructions[i].fields[j].valueField;
            }
          }
        }
        this.$root.$emit('bv::show::modal', 'modalViewFields', button);
      },
      /*Verify all fields of new instructions*/
      newInstVerify(evt){
        evt.preventDefault();

        for (var i = 0; i < this.formInstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formInstruction.nameField.length; j++){
            if (this.formInstruction.nameField[i] == this.formInstruction.nameField[j]){
                show_notification('Field name repeated', 'danger') ;
                return;
            }
          }
        }

        var empty = 0;
        var auxCop = "";

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if(this.formInstruction.typeField[z] == 'cop'){
            if(!this.formInstruction.valueField[z]){
              empty = 1;
            }
            else{
              if((this.formInstruction.valueField[z]).length != (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1)){
                show_notification('The length of cop should be ' + (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1) + ' binary numbers', 'danger') ;
                return;
              }

              for (var i = 0; i < this.formInstruction.valueField[z].length; i++){
                if (this.formInstruction.valueField[z].charAt(i) != "0" && this.formInstruction.valueField[z].charAt(i) != "1"){
                    show_notification('The value of cop must be binary', 'danger') ;
                    return;
                }
              }
              auxCop = auxCop + this.formInstruction.valueField[z];
            }
          }
        }

        this.formInstruction.cop = auxCop;

        for (var i = 0; i < this.formInstruction.co.length; i++){
          if (this.formInstruction.co.charAt(i) != "0" && this.formInstruction.co.charAt(i) != "1"){
              show_notification('The value of co must be binary', 'danger') ;
              return;
          }
        }

        for (var i = 0; i < this.formInstruction.numfields; i++){
          if(this.formInstruction.nameField.length <  this.formInstruction.numfields || this.formInstruction.typeField.length <  this.formInstruction.numfields || this.formInstruction.startBitField.length <  this.formInstruction.numfields || this.formInstruction.stopBitField.length <  this.formInstruction.numfields){
            empty = 1;
          }
        }

        if (!this.formInstruction.name || !this.formInstruction.type || !this.formInstruction.co || !this.formInstruction.nwords || !this.formInstruction.numfields || !this.formInstruction.signature_definition || !this.formInstruction.definition || empty == 1) {
            show_notification('Please complete all fields', 'danger') ;
        } 
        else if (isNaN(this.formInstruction.co)){
                 show_notification('The field co must be numbers', 'danger') ;
        }
        else if(isNaN(this.formInstruction.cop)){
                 show_notification('The field cop must be numbers', 'danger') ;
        }
        else if((this.formInstruction.co).length != (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1)){
                 show_notification('The length of co should be ' + (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1) + ' binary numbers', 'danger');
        }
        else {
          this.newInstruction();
        }
      },
      /*Create a new instruction*/
      newInstruction(){
        for (var i = 0; i < architecture.instructions.length; i++){
          if  (this.formInstruction.co == architecture.instructions[i].co){
            if  ((!this.formInstruction.cop)){
                 show_notification('The instruction already exists', 'danger') ;
                 return;
            }
          }
        }

        for (var i = 0; i < architecture.instructions.length; i++){
          if ((this.formInstruction.cop == architecture.instructions[i].cop) && (!this.formInstruction.cop == false)){
               show_notification('The instruction already exists', 'danger') ;
               return;
          }
        }

        this.showNewInstruction = false;

        //var cop = false;

        this.generateSignatureInst();

        var signature = this.formInstruction.signature;
        var signatureRaw = this.formInstruction.signatureRaw;

        /*if(cop == false){
          this.formInstruction.cop='';
        }*/

        var newInstruction = {name: this.formInstruction.name, type: this.formInstruction.type, signature_definition: this.formInstruction.signature_definition, signature: signature, signatureRaw: signatureRaw, co: this.formInstruction.co , cop: this.formInstruction.cop, nwords: this.formInstruction.nwords , fields: [], definition: this.formInstruction.definition};
        architecture.instructions.push(newInstruction);

        for (var i = 0; i < this.formInstruction.numfields; i++){
          var newField = {name: this.formInstruction.nameField[i], type: this.formInstruction.typeField[i], startbit: parseInt(this.formInstruction.startBitField[i]), stopbit: parseInt(this.formInstruction.stopBitField[i]), valueField: this.formInstruction.valueField[i]};
          architecture.instructions[architecture.instructions.length-1].fields.push(newField);
        }   
      },
      /*Show edit instruction modal*/
      editInstModal(elem, co, cop, button){
        this.modalEditInst.title = "Edit Instruction";
        this.modalEditInst.element = elem;
        for (var i = 0; i < architecture.instructions.length; i++) {
          if(elem == architecture.instructions[i].name && co == architecture.instructions[i].co && cop == architecture.instructions[i].cop){
            this.formInstruction.name = architecture.instructions[i].name;
            this.formInstruction.type = architecture.instructions[i].type;
            this.formInstruction.cop = architecture.instructions[i].cop;
            this.formInstruction.co = architecture.instructions[i].co;
            app._data.modalEditInst.co = architecture.instructions[i].co;
            app._data.modalEditInst.cop = architecture.instructions[i].cop;
            this.formInstruction.nwords = architecture.instructions[i].nwords;
            this.formInstruction.numfields = architecture.instructions[i].fields.length;
            this.formInstruction.numfieldsAux = architecture.instructions[i].fields.length;
            this.formInstruction.signature_definition= architecture.instructions[i].signature_definition;
            this.formInstruction.definition = architecture.instructions[i].definition;

            for (var j = 0; j < architecture.instructions[i].fields.length; j++) {
              this.formInstruction.nameField [j]= architecture.instructions[i].fields[j].name;
              this.formInstruction.typeField[j] = architecture.instructions[i].fields[j].type;
              this.formInstruction.startBitField[j] = architecture.instructions[i].fields[j].startbit;
              this.formInstruction.stopBitField[j] = architecture.instructions[i].fields[j].stopbit;
              this.formInstruction.valueField[j] = architecture.instructions[i].fields[j].valueField;
            }
            this.generateSignatureInst();
          }
        }
        this.$root.$emit('bv::show::modal', 'modalEditInst', button);
      },
      /*Check all fields of modify instruction*/
      editInstVerify(evt, inst, co, cop){
        evt.preventDefault();

        for (var i = 0; i < this.formInstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formInstruction.nameField.length; j++){
            if (this.formInstruction.nameField[i] == this.formInstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var empty = 0;
        var auxCop = "";

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if (this.formInstruction.typeField[z] == 'cop'){
            if (!this.formInstruction.valueField[z]){
                empty = 1;
            }
            else {
              if ((this.formInstruction.valueField[z]).length != (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1)){
                 show_notification('The length of cop should be ' + (this.formInstruction.startBitField[z] - this.formInstruction.stopBitField[z] + 1) + ' binary numbers', 'danger') ;
                 return;
              }

              for (var i = 0; i < this.formInstruction.valueField[z].length; i++){
                if (this.formInstruction.valueField[z].charAt(i) != "0" && this.formInstruction.valueField[z].charAt(i) != "1"){
                   show_notification('The value of cop must be binary', 'danger') ;
                   return;
                }
              }
            }
            auxCop = auxCop + this.formInstruction.valueField[z];
          }
        }

        this.formInstruction.cop = auxCop;

        for (var i = 0; i < this.formInstruction.co.length; i++){
          if (this.formInstruction.co.charAt(i) != "0" && this.formInstruction.co.charAt(i) != "1"){
              show_notification('The value of co must be binary', 'danger') ;
              return;
          }
        }

        for (var i = 0; i < this.formInstruction.numfields; i++){
          if(!this.formInstruction.nameField[i] || !this.formInstruction.typeField[i] || (!this.formInstruction.startBitField[i] && this.formInstruction.startBitField[i] != 0) || (!this.formInstruction.stopBitField[i] && this.formInstruction.stopBitField[i] != 0)){
            empty = 1;
          }
        }
        if (!this.formInstruction.name || !this.formInstruction.type || !this.formInstruction.co || !this.formInstruction.nwords || !this.formInstruction.numfields || !this.formInstruction.signature_definition || !this.formInstruction.definition || empty == 1) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else if(isNaN(this.formInstruction.co)){
          show_notification('The field co must be numbers', 'danger') ;
        }
        else if(isNaN(this.formInstruction.cop)){
          show_notification('The field cop must be numbers', 'danger') ;
        }
        else if((this.formInstruction.co).length != (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1)){
          show_notification('The length of co should be ' + (this.formInstruction.startBitField[0] - this.formInstruction.stopBitField[0] + 1) + ' binary numbers', 'danger') ;
        }
        else {
          this.editInstruction(inst, co, cop);
        }
      },

      /*Edit the instruction*/
      editInstruction(comp, co, cop)
      {
        var exCop = false;

        for (var z = 1; z < this.formInstruction.numfields; z++){
          if (this.formInstruction.typeField[z] == 'cop'){
              exCop = true;
          }
        }

        for (var i = 0; i < architecture.instructions.length; i++){
          if ((this.formInstruction.co == architecture.instructions[i].co) && (this.formInstruction.co != co) && (exCop == false)){
            if (((!this.formInstruction.cop) || (exCop != true))){
                show_notification('The instruction already exists', 'danger') ;
                return;
            }
          }
        }

        for (var i = 0; i < architecture.instructions.length && exCop == true ; i++){
          if ((this.formInstruction.cop == architecture.instructions[i].cop) && (!this.formInstruction.cop == false) && (this.formInstruction.cop != cop)){
               show_notification('The instruction already exists', 'danger') ;
               return;
          }
        }

        this.showEditInstruction = false;

        for (var i = 0; i < architecture.instructions.length; i++){
          if (architecture.instructions[i].name == comp && architecture.instructions[i].co == co && architecture.instructions[i].cop == cop){
            architecture.instructions[i].name = this.formInstruction.name;
            architecture.instructions[i].type = this.formInstruction.type;
            architecture.instructions[i].co = this.formInstruction.co;
            architecture.instructions[i].cop = this.formInstruction.cop;
            architecture.instructions[i].nwords = this.formInstruction.nwords;
            architecture.instructions[i].signature_definition = this.formInstruction.signature_definition;
            architecture.instructions[i].definition = this.formInstruction.definition;

            for (var j = 0; j < this.formInstruction.numfields; j++){
              if (j < architecture.instructions[i].fields.length)
              {
                architecture.instructions[i].fields[j].name = this.formInstruction.nameField[j];
                architecture.instructions[i].fields[j].type = this.formInstruction.typeField[j];
                architecture.instructions[i].fields[j].startbit = parseInt(this.formInstruction.startBitField[j]);
                architecture.instructions[i].fields[j].stopbit = parseInt(this.formInstruction.stopBitField[j]);
                architecture.instructions[i].fields[j].valueField = this.formInstruction.valueField[j];
              }
              else{
                var newField = {name: this.formInstruction.nameField[j], type: this.formInstruction.typeField[j], startbit: this.formInstruction.startBitField[j], stopbit: this.formInstruction.stopBitField[j], valueField: this.formInstruction.valueField[j]};
                architecture.instructions[i].fields.push(newField);
              }
            }

            this.generateSignatureInst();

            var signature = this.formInstruction.signature;
            var signatureRaw = this.formInstruction.signatureRaw;

            if(exCop == false){
              architecture.instructions[i].cop='';
            }

            architecture.instructions[i].signature = signature;
            architecture.instructions[i].signatureRaw = signatureRaw;

            if(architecture.instructions[i].fields.length > this.formInstruction.numfields){
              architecture.instructions[i].fields.splice(this.formInstruction.numfields, (architecture.instructions[i].fields.length - this.formInstruction.numfields));
            }
          }
        }

        show_notification('The instruction has been modified, please check the definition of the pseudoinstructions', 'info') ;
      },
      /*Show delete instruction modal*/
      delInstModal(elem, index, button){
        this.modalDeletInst.title = "Delete Instruction";
        this.modalDeletInst.element = elem;
        this.modalDeletInst.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletInst', button);
      },
      /*Delete the instruction*/
      delInstruction(index){
        architecture.instructions.splice(index,1);
      },
      /*Generate the instruction signature*/
      generateSignatureInst(){
        var signature = this.formInstruction.signature_definition;

        var re = new RegExp("^ +");
        this.formInstruction.signature_definition= this.formInstruction.signature_definition.replace(re, "");

        re = new RegExp(" +", "g");
        this.formInstruction.signature_definition = this.formInstruction.signature_definition.replace(re, " ");

        re = new RegExp("^ +");
        signature= signature.replace(re, "");

        re = new RegExp(" +", "g");
        signature = signature.replace(re, " ");

        for (var z = 0; z < this.formInstruction.numfields; z++){
          re = new RegExp("[Ff]"+z, "g");

          if(z == 0){
            signature = signature.replace(re, this.formInstruction.name);
          }
          else{
            signature = signature.replace(re, this.formInstruction.typeField[z]);
          }
        }

        re = new RegExp(" ", "g");
        signature = signature.replace(re , ",");

        var signatureRaw = this.formInstruction.signature_definition;

        re = new RegExp("^ +");
        signatureRaw= signatureRaw.replace(re, "");

        re = new RegExp(" +", "g");
        signatureRaw = signatureRaw.replace(re, " ");

        for (var z = 0; z < this.formInstruction.numfields; z++){
          re = new RegExp("[Ff]"+z, "g");
          signatureRaw = signatureRaw.replace(re, this.formInstruction.nameField[z]);
        }

        this.formInstruction.signature = signature;
        this.formInstruction.signatureRaw = signatureRaw;
      },
      /*Empty instruction form*/
      emptyFormInst(){
        this.formInstruction.name = '';
        this.formInstruction.type = '';
        this.formInstruction.co = '';
        this.formInstruction.cop = '';
        this.formInstruction.nwords = 1;
        this.formInstruction.numfields = "1";
        this.formInstruction.numfieldsAux = "1";
        this.formInstruction.nameField = [];
        this.formInstruction.typeField = [];
        this.formInstruction.startBitField = [];
        this.formInstruction.stopBitField = [];
        this.formInstruction.valueField = [];
        this.formInstruction.assignedCop = false;
        this.formInstruction.signature ='';
        this.formInstruction.signatureRaw = '';
        this.formInstruction.signature_definition = '';
        this.formInstruction.definition = '';
        this.instructionFormPage = 1;
      },
      /*Show pseudoinstruction fields modal*/
      viewFielsPseudo(elem, index, button){
        this.modalViewFields.title = "Fields of " + elem;
        this.modalViewFields.element = elem;
        
        this.formPseudoinstruction.name = architecture.pseudoinstructions[index].name;
        this.formPseudoinstruction.numfields = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.numfieldsAux = architecture.pseudoinstructions[index].fields.length;

        for (var j = 0; j < architecture.pseudoinstructions[index].fields.length; j++){
          this.formPseudoinstruction.nameField[j] = architecture.pseudoinstructions[index].fields[j].name;
          this.formPseudoinstruction.typeField[j] = architecture.pseudoinstructions[index].fields[j].type;
          this.formPseudoinstruction.startBitField[j] = architecture.pseudoinstructions[index].fields[j].startbit;
          this.formPseudoinstruction.stopBitField[j] = architecture.pseudoinstructions[index].fields[j].stopbit;
        }

        this.$root.$emit('bv::show::modal', 'modalViewPseudoFields', button);
      },
      /*Show reset pseudoinstructions modal*/
      resetPseudoinstModal(elem, button){
        this.modalResetPseudoinst.title = "Reset " + elem + " pseudoinstructions";
        this.modalResetPseudoinst.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetPseudoinst', button);
      },
      /*Reset pseudoinstructions*/
      resetPseudoinstructionsModal(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++) {
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = bigInt_deserialize(auxArch);

            architecture.pseudoinstructions = auxArchitecture.pseudoinstructions;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The registers has been reset correctly', 'success') ;
            
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = bigInt_deserialize(auxArchitecture);
          architecture.pseudoinstructions = auxArchitecture2.pseudoinstructions;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The pseudoinstruction set has been reset correctly', 'success') ;
        });
      },
      /*Check all fields of new pseudoinstruction*/
      newPseudoinstVerify(evt){
        evt.preventDefault();

        for (var i = 0; i < this.formPseudoinstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formPseudoinstruction.nameField.length; j++){
            if (this.formPseudoinstruction.nameField[i] == this.formPseudoinstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var vacio = 0;

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          if(this.formPseudoinstruction.nameField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.typeField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.startBitField.length <  this.formPseudoinstruction.numfields || this.formPseudoinstruction.stopBitField.length <  this.formPseudoinstruction.numfields){
            vacio = 1;
          }
        }

        var result = this.pseudoDefValidator(this.formPseudoinstruction.name, this.formPseudoinstruction.definition, this.formPseudoinstruction.nameField);

        if(result == -1){
          return;
        }

        if (!this.formPseudoinstruction.name || !this.formPseudoinstruction.nwords || !this.formPseudoinstruction.numfields || !this.formPseudoinstruction.signature_definition || !this.formPseudoinstruction.definition || vacio == 1) {
          show_notification('Please complete all fields', 'danger') ;
        } 
        else {
          this.newPseudoinstruction();
        }
      },
      /*Create a new pseudoinstruction*/
      newPseudoinstruction(){
        this.showNewPseudoinstruction = false;

        this.generateSignaturePseudo();

        var signature = this.formPseudoinstruction.signature;
        var signatureRaw = this.formPseudoinstruction.signatureRaw;

        var newPseudoinstruction = {name: this.formPseudoinstruction.name, signature_definition: this.formPseudoinstruction.signature_definition, signature: signature, signatureRaw: signatureRaw, nwords: this.formPseudoinstruction.nwords , fields: [], definition: this.formPseudoinstruction.definition};
        architecture.pseudoinstructions.push(newPseudoinstruction);

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          var newField = {name: this.formPseudoinstruction.nameField[i], type: this.formPseudoinstruction.typeField[i], startbit: this.formPseudoinstruction.startBitField[i], stopbit: this.formPseudoinstruction.stopBitField[i]};
          architecture.pseudoinstructions[architecture.pseudoinstructions.length-1].fields.push(newField);
        }
      },
      /*Show edit pseudoinstruction modal*/
      editPseudoinstModal(elem, index, button){
        this.modalEditPseudoinst.title = "Edit Pseudoinstruction";
        this.modalEditPseudoinst.element = elem;
        this.modalEditPseudoinst.index = index;
        
        this.formPseudoinstruction.name = architecture.pseudoinstructions[index].name;
        this.formPseudoinstruction.nwords = architecture.pseudoinstructions[index].nwords;
        this.formPseudoinstruction.numfields = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.numfieldsAux = architecture.pseudoinstructions[index].fields.length;
        this.formPseudoinstruction.signature_definition = architecture.pseudoinstructions[index].signature_definition;
        this.formPseudoinstruction.definition = architecture.pseudoinstructions[index].definition;

        for (var j = 0; j < architecture.pseudoinstructions[index].fields.length; j++) {
          this.formPseudoinstruction.nameField[j] = architecture.pseudoinstructions[index].fields[j].name;
          this.formPseudoinstruction.typeField[j] = architecture.pseudoinstructions[index].fields[j].type;
          this.formPseudoinstruction.startBitField[j] = architecture.pseudoinstructions[index].fields[j].startbit;
          this.formPseudoinstruction.stopBitField[j] = architecture.pseudoinstructions[index].fields[j].stopbit;
        }

        this.generateSignaturePseudo();

        this.$root.$emit('bv::show::modal', 'modalEditPseudoinst', button);
      },
      /*Check all fields of modify pseudoinstruction*/
      editPseudoinstVerify(evt, inst, index){
        evt.preventDefault();

        for (var i = 0; i < this.formPseudoinstruction.nameField.length; i++){
          for (var j = i + 1; j < this.formPseudoinstruction.nameField.length; j++){
            if (this.formPseudoinstruction.nameField[i] == this.formPseudoinstruction.nameField[j]){
              show_notification('Field name repeated', 'danger') ;
              return;
            }
          }
        }

        var vacio = 0;

        for (var i = 0; i < this.formPseudoinstruction.numfields; i++) {
          if(!this.formPseudoinstruction.nameField[i] || !this.formPseudoinstruction.typeField[i] || (!this.formPseudoinstruction.startBitField[i] && this.formPseudoinstruction.startBitField[i] != 0) || (!this.formPseudoinstruction.stopBitField[i] && this.formPseudoinstruction.stopBitField[i] != 0)){
            vacio = 1;
          }
        }

        var result = this.pseudoDefValidator(inst, this.formPseudoinstruction.definition, this.formPseudoinstruction.nameField);

        if(result == -1){
          return;
        }

        if (!this.formPseudoinstruction.name || !this.formPseudoinstruction.nwords || !this.formPseudoinstruction.numfields || !this.formPseudoinstruction.signature_definition || !this.formPseudoinstruction.definition || vacio == 1) {
          show_notification('Please complete all fields', 'danger') ;
        }
        else {
          this.editPseudoinstruction(inst, index);
        }
      },
      /*Edit the pseudoinstruction*/
      editPseudoinstruction(comp, index){

        this.showEditPseudoinstruction = false;
        
        architecture.pseudoinstructions[index].name = this.formPseudoinstruction.name;
        architecture.pseudoinstructions[index].nwords = this.formPseudoinstruction.nwords;
        architecture.pseudoinstructions[index].definition = this.formPseudoinstruction.definition;
        architecture.pseudoinstructions[index].signature_definition = this.formPseudoinstruction.signature_definition;

        for (var j = 0; j < this.formPseudoinstruction.numfields; j++){
          if(j < architecture.pseudoinstructions[index].fields.length){
            architecture.pseudoinstructions[index].fields[j].name = this.formPseudoinstruction.nameField[j];
            architecture.pseudoinstructions[index].fields[j].type = this.formPseudoinstruction.typeField[j];
            architecture.pseudoinstructions[index].fields[j].startbit = this.formPseudoinstruction.startBitField[j];
            architecture.pseudoinstructions[index].fields[j].stopbit = this.formPseudoinstruction.stopBitField[j];
          }
          else{
            var newField = {name: this.formPseudoinstruction.nameField[j], type: this.formPseudoinstruction.typeField[j], startbit: this.formPseudoinstruction.startBitField[j], stopbit: this.formPseudoinstruction.stopBitField[j]};
            architecture.pseudoinstructions[index].fields.push(newField);
          }
        }

        this.generateSignaturePseudo();

        var signature = this.formPseudoinstruction.signature;
        var signatureRaw = this.formPseudoinstruction.signatureRaw;

        architecture.pseudoinstructions[index].signature = signature;
        architecture.pseudoinstructions[index].signatureRaw = signatureRaw;

        if(architecture.pseudoinstructions[index].fields.length > this.formPseudoinstruction.numfields){
          architecture.pseudoinstructions[index].fields.splice(this.formPseudoinstruction.numfields, (architecture.pseudoinstructions[i].fields.length - this.formPseudoinstruction.numfields));
        }
      },
      /*Show delete pseudoinstruction modal*/
      delPseudoinstModal(elem, index, button){
        this.modalDeletPseudoinst.title = "Delete Pseudointruction";
        this.modalDeletPseudoinst.element = elem;
        this.modalDeletPseudoinst.index = index;
        this.$root.$emit('bv::show::modal', 'modalDeletPseudoinst', button);
      },
      /*Delete the pseudoinstruction*/
      delPseudoinstruction(index){
        architecture.pseudoinstructions.splice(index,1);
      },
      /*Verify the pseudoinstruction definition*/
      pseudoDefValidator(name, definition, fields){
        var re = new RegExp("^\n+");
        definition = definition.replace(re, "");
        
        re = new RegExp("\n+", "g");
        definition = definition.replace(re, "");

        var newDefinition = definition;

        re = /{([^}]*)}/g;
        var code = re.exec(definition);

        if(code != null){
          while(code != null){
            console_log(code)
            var instructions = code[1].split(";");
            if (instructions.length == 1){
                show_notification('Enter a ";" at the end of each line of code', 'danger') ;
                return -1;
            }

            for (var j = 0; j < instructions.length-1; j++){
              var re = new RegExp("^ +");
              instructions[j] = instructions[j].replace(re, "");

              re = new RegExp(" +", "g");
              instructions[j] = instructions[j].replace(re, " ");

              var instructionParts = instructions[j].split(" ");

              var found = false;
              for (var i = 0; i < architecture.instructions.length; i++){
                if(architecture.instructions[i].name == instructionParts[0]){
                  found = true;
                  var numFields = 0;
                  var regId = 0;

                  signatureDef = architecture.instructions[i].signature_definition;
                  signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                  re = new RegExp("[fF][0-9]+", "g");
                  signatureDef = signatureDef.replace(re, "(.*?)");

                  console_log(instructions[j])

                  re = new RegExp(signatureDef+"$");
                  if(instructions[j].search(re) == -1){
                    show_notification('Incorrect signature --> ' + architecture.instructions[i].signatureRaw, 'danger') ;
                    return -1;
                  }

                  re = new RegExp(signatureDef+"$");
                  var match = re.exec(instructions[j]);
                  var instructionParts = [];
                  for(var z = 1; z < match.length; z++){
                    instructionParts.push(match[z]);
                  }

                  re = new RegExp(",", "g");
                  var signature = architecture.instructions[i].signature.replace(re, " ");

                  re = new RegExp(signatureDef+"$");
                  var match = re.exec(signature);
                  var signatureParts = [];
                  for(var j = 1; j < match.length; j++){
                    signatureParts.push(match[j]);
                  }

                  console_log(instructionParts)
                  console_log(signatureParts)

                  for (var z = 1; z < signatureParts.length; z++){

                    if(signatureParts[z] == "INT-Reg" || signatureParts[z] == "SFP-Reg" || signatureParts[z] == "DFP-Reg" ||signatureParts[z] == "Ctrl-Reg"){
                      console_log("REG")
                      var found = false;

                      var id = -1;
                      re = new RegExp("R[0-9]+");
                      console_log(z)
                      if(instructionParts[z].search(re) != -1){
                        re = new RegExp("R(.*?)$");
                        match = re.exec(instructionParts[z]);
                        id = match[1];
                      }

                      for (var a = 0; a < architecture.components.length; a++){
                        for (var b = 0; b < architecture.components[a].elements.length; b++){
                          if(architecture.components[a].elements[b].name == instructionParts[z]){
                            found = true;
                          }
                          if(architecture.components[a].type == "integer" && regId == id){
                            found = true;
                          }
                          if(architecture.components[a].type == "integer"){
                            regId++;
                          }
                        }
                      }

                      for (var b = 0; b < fields.length; b++){
                        if(fields[b] == instructionParts[z]){
                          found = true;
                        }
                      }

                      if(!found){
                        show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                        return -1;
                      }
                    }

                    if(signatureParts[z] == "inm-signed" || signatureParts[z] == "inm-unsigned" || signatureParts[z] == "offset_bytes" || signatureParts[z] == "offset_words"){
                      var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                      if(instructionParts[z].match(/^0x/)){
                        var value = instructionParts[z].split("x");
                        if (isNaN(parseInt(instructionParts[z], 16)) == true){
                            show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                            return -1;
                        }

                        if(value[1].length*4 > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                      else if (instructionParts[z].match(/^(\d)+\.(\d)+/)){
                        if(isNaN(parseFloat(instructionParts[z])) == true){
                          show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        if(float2bin(parseFloat(instructionParts[z])).length > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                      else if(isNaN(parseInt(instructionParts[z]))){
                        
                      }
                      else {
                        var numAux = parseInt(instructionParts[z], 10);
                        if(isNaN(parseInt(instructionParts[z])) == true){
                          show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        /*if((numAux.toString(2)).length > fieldsLength){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }*/

                        var comNumPos = Math.pow(2, fieldsLength-1);
                        var comNumNeg = comNumPos * (-1);
                        comNumPos = comNumPos -1;

                        console_log(comNumPos);
                        console_log(comNumNeg);

                        if(parseInt(instructionParts[z], 10) > comNumPos || parseInt(instructionParts[z], 10) < comNumNeg){
                          show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        }
                      }
                    }

                    if(signatureParts[z] == "address"){
                      var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                      if(instructionParts[z].match(/^0x/)){
                        var value = instructionParts[z].split("x");
                        if(isNaN(parseInt(instructionParts[z], 16)) == true){
                          show_notification("Address " + instructionParts[z] + " is not valid", 'danger') ;
                          return -1;
                        }

                        if(value[1].length*4 > fieldsLength){
                          show_notification("Address " + instructionParts[z] + " is too big", 'danger') ;
                          return -1;
                        } 
                      }
                    }

                    if(!found){
                      show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                      return -1;
                    }
                  }
                }
              }
              if(!found){
                show_notification('Instruction ' + instructions[j] + ' do not exists', 'danger') ;
                return -1;
              }
            }

            definition = definition.replace(code[0], "");

            re = /{([^}]*)}/g;
            code = re.exec(definition);
          }
        }
        else{
          var instructions = definition.split(";");
          console_log(instructions.length)
          if(instructions.length == 1){
            show_notification('Enter a ";" at the end of each line of code', 'danger') ;
            return -1;
          }

          for (var j = 0; j < instructions.length-1; j++){
            var re = new RegExp("^ +");
            instructions[j] = instructions[j].replace(re, "");

            re = new RegExp(" +", "g");
            instructions[j] = instructions[j].replace(re, " ");

            var instructionParts = instructions[j].split(" ");

            var found = false;
            for (var i = 0; i < architecture.instructions.length; i++){
              if(architecture.instructions[i].name == instructionParts[0]){
                found = true;
                var numFields = 0;
                var regId = 0;

                signatureDef = architecture.instructions[i].signature_definition;
                signatureDef = signatureDef.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                re = new RegExp("[fF][0-9]+", "g");
                signatureDef = signatureDef.replace(re, "(.*?)");

                console_log(instructions[j])

                re = new RegExp(signatureDef+"$");
                if(instructions[j].search(re) == -1){
                  show_notification('Incorrect signature --> ' + architecture.instructions[i].signatureRaw, 'danger') ;
                  return -1;
                }

                re = new RegExp(signatureDef+"$");
                var match = re.exec(instructions[j]);
                var instructionParts = [];
                for(var z = 1; z < match.length; z++){
                  instructionParts.push(match[z]);
                }

                re = new RegExp(",", "g");
                var signature = architecture.instructions[i].signature.replace(re, " ");

                re = new RegExp(signatureDef+"$");
                var match = re.exec(signature);
                var signatureParts = [];
                for(var j = 1; j < match.length; j++){
                  signatureParts.push(match[j]);
                }

                console_log(instructionParts)
                console_log(signatureParts)

                for (var z = 1; z < signatureParts.length; z++){

                  if(signatureParts[z] == "INT-Reg" || signatureParts[z] == "SFP-Reg" || signatureParts[z] == "DFP-Reg" ||signatureParts[z] == "Ctrl-Reg"){
                    console_log("REG")
                    var found = false;

                    var id = -1;
                    re = new RegExp("R[0-9]+");
                    console_log(z)
                    if(instructionParts[z].search(re) != -1){
                      re = new RegExp("R(.*?)$");
                      match = re.exec(instructionParts[z]);
                      id = match[1];
                    }

                    for (var a = 0; a < architecture.components.length; a++){
                      for (var b = 0; b < architecture.components[a].elements.length; b++){
                        if(architecture.components[a].elements[b].name == instructionParts[z]){
                          found = true;
                        }
                        if(architecture.components[a].type == "integer" && regId == id){
                          found = true;
                        }
                        if(architecture.components[a].type == "integer"){
                          regId++;
                        }
                      }
                    }

                    for (var b = 0; b < fields.length; b++){
                      if(fields[b] == instructionParts[z]){
                        found = true;
                      }
                    }

                    if(!found){
                      show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                      return -1;
                    }
                  }

                  if(signatureParts[z] == "inm-signed" || signatureParts[z] == "inm-unsigned" || signatureParts[z] == "offset_bytes" || signatureParts[z] == "offset_words"){
                    var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                    if(instructionParts[z].match(/^0x/)){
                      var value = instructionParts[z].split("x");
                      if(isNaN(parseInt(instructionParts[z], 16)) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(value[1].length*4 > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                    else if (instructionParts[z].match(/^(\d)+\.(\d)+/)){
                      if(isNaN(parseFloat(instructionParts[z])) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(float2bin(parseFloat(instructionParts[z])).length > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                    else if(isNaN(parseInt(instructionParts[z]))){
                      
                    }
                    else {
                      var numAux = parseInt(instructionParts[z], 10);
                      if(isNaN(parseInt(instructionParts[z])) == true){
                        show_notification("Immediate number " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      /*if((numAux.toString(2)).length > fieldsLength){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }*/

                      var comNumPos = Math.pow(2, fieldsLength-1);
                      var comNumNeg = comNumPos * (-1);
                      comNumPos = comNumPos -1;

                      console_log(comNumPos);
                      console_log(comNumNeg);

                      if(parseInt(instructionParts[z], 10) > comNumPos || parseInt(instructionParts[z], 10) < comNumNeg){
                        show_notification("Immediate number " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      }
                    }
                  }

                  if(signatureParts[z] == "address"){
                    var fieldsLength = architecture.instructions[i].fields[z].startbit - architecture.instructions[i].fields[z].stopbit + 1;
                    if(instructionParts[z].match(/^0x/)){
                      var value = instructionParts[z].split("x");
                      if(isNaN(parseInt(instructionParts[z], 16)) == true){
                        show_notification("Address " + instructionParts[z] + " is not valid", 'danger') ;
                        return -1;
                      }

                      if(value[1].length*4 > fieldsLength){
                        show_notification("Address " + instructionParts[z] + " is too big", 'danger') ;
                        return -1;
                      } 
                    }
                  }

                  if(!found){
                    show_notification('Register ' + instructionParts[z] + ' not found', 'danger') ;
                    return -1;
                  }
                }
              }
            }
            if(!found){
              show_notification('Instruction ' + instructions[j] + ' do not exists', 'danger') ;
              return -1;
            }
          }
        }

        return 0;
      },
      /*Generate the pseudoinstruction signature*/
      generateSignaturePseudo(){
        var signature = this.formPseudoinstruction.signature_definition;

        var re = new RegExp("^ +");
        this.formPseudoinstruction.signature_definition = this.formPseudoinstruction.signature_definition.replace(re, "");

        re = new RegExp(" +", "g");
        this.formPseudoinstruction.signature_definition = this.formPseudoinstruction.signature_definition.replace(re, " ");

        re = new RegExp("^ +");
        signature= signature.replace(re, "");

        re = new RegExp(" +", "g");
        signature = signature.replace(re, " ");

        for (var z = 0; z < this.formPseudoinstruction.numfields; z++) {
          re = new RegExp("[Ff]"+z, "g");

          signature = signature.replace(re, this.formPseudoinstruction.typeField[z]);
        }

        re = new RegExp(" ", "g");
        signature = signature.replace(re , ",");

        var signatureRaw = this.formPseudoinstruction.signature_definition;

        re = new RegExp("^ +");
        signatureRaw= signatureRaw.replace(re, "");

        re = new RegExp(" +", "g");
        signatureRaw = signatureRaw.replace(re, " ");

        for (var z = 0; z < this.formPseudoinstruction.numfields; z++) {
          re = new RegExp("[Ff]"+z, "g");

          signatureRaw = signatureRaw.replace(re, this.formPseudoinstruction.nameField[z]);
        }

        this.formPseudoinstruction.signature = signature;
        this.formPseudoinstruction.signatureRaw = signatureRaw;
      },
      /*Empty pseudoinstruction form*/
      emptyFormPseudo(){
        this.formPseudoinstruction.name = '';
        this.formPseudoinstruction.nwords = 1;
        this.formPseudoinstruction.numfields = "0";
        this.formPseudoinstruction.numfields = "0";
        this.formPseudoinstruction.nameField = [];
        this.formPseudoinstruction.typeField = [];
        this.formPseudoinstruction.startBitField = [];
        this.formPseudoinstruction.stopBitField = [];
        this.formPseudoinstruction.signature ='';
        this.formPseudoinstruction.signatureRaw = '';
        this.formPseudoinstruction.signature_definition = '';
        this.formPseudoinstruction.definition = '';
        this.instructionFormPage = 1;
      },
      /*Pagination bar names*/
      linkGen (pageNum) {
        return this.instructionFormPageLink[pageNum - 1]
      },
      pageGen (pageNum) {
        return this.instructionFormPageLink[pageNum - 1].slice(1)
      },
      /*Show reset directive modal*/
      resetDirModal(elem, button){
        this.modalResetDir.title = "Reset " + elem + " directives";
        this.modalResetDir.element = elem;
        this.$root.$emit('bv::show::modal', 'modalResetDir', button);
      },
      /*Reset directives*/
      resetDirectives(arch){
        show_loading();

        for (var i = 0; i < load_architectures.length; i++) {
          if(arch == load_architectures[i].id){
            var auxArch = JSON.parse(load_architectures[i].architecture);
            var auxArchitecture = bigInt_deserialize(auxArch);

            architecture.directives = auxArchitecture.directives;
            app._data.architecture = architecture;

            hide_loading();
            show_notification('The directive set has been reset correctly', 'success') ;
            return;
          }
        }

        $.getJSON('architecture/'+arch+'.json', function(cfg){
          var auxArchitecture = cfg;

          var auxArchitecture2 = bigInt_deserialize(auxArchitecture);
          architecture.directives = auxArchitecture2.directives;

          app._data.architecture = architecture;

          hide_loading();
          show_notification('The directive set has been reset correctly', 'success') ;
        });
      },
      /*Verify all fields of new directive*/
      newDirVerify(evt){
        evt.preventDefault();

        if (!this.formDirective.name || !this.formDirective.action) {
          show_notification('Please complete all fields', 'danger') ;
        } 
        else {
          if(isNaN(parseInt(this.formDirective.size)) && (this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space')){
            show_notification('Please complete all fields', 'danger') ;
          }
          else{
            this.newDirective();
          }
        }
      },
      /*Create new directive*/
      newDirective(){
        for (var i = 0; i < architecture.directives.length; i++) {
          if(this.formDirective.name == architecture.directives[i].name){
            show_notification('The directive already exists', 'danger') ;
            return;
          }
        }

        this.showNewDirective = false;
        if(this.formDirective.action != 'byte' && this.formDirective.action != 'half_word' && this.formDirective.action != 'word' && this.formDirective.action != 'double_word' && this.formDirective.action != 'float' && this.formDirective.action != 'double' && this.formDirective.action != 'space'){
          this.formDirective.size = null;
        }

        var newDir = {name: this.formDirective.name, action: this.formDirective.action, size: this.formDirective.size};
        architecture.directives.push(newDir);
      },
      /*Show edit directive modal*/
      editDirModal(elem, button){
        this.modalEditDirective.title = "Edit " + elem;
        this.modalEditDirective.element = elem;

        for (var i = 0; i < architecture.directives.length; i++){
          if(elem == architecture.directives[i].name){
            this.formDirective.name = architecture.directives[i].name;
            this.formDirective.action = architecture.directives[i].action;
            this.formDirective.size = architecture.directives[i].size;
          }
        }
        this.$root.$emit('bv::show::modal', 'modalEditDirective', button);
      },
      /*Verify all fields of modify directive*/
      editDirVerify(evt, name){
        evt.preventDefault();

        if (!this.formDirective.name || !this.formDirective.action) {
          show_notification('Please complete all fields', 'danger') ;
        } 
        else {
          if(isNaN(parseInt(this.formDirective.size)) && (this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space')){
            show_notification('Please complete all fields', 'danger') ;
          }
          else{
            this.editDirective(name);
          }
        }
      },
      /*edit directive*/
      editDirective(name){
        for (var i = 0; i < architecture.directives.length; i++) {
          if((this.formDirective.name == architecture.directives[i].name) && (name != this.formDirective.name)){
            show_notification('The directive already exists', 'danger') ;
            return;
          }
        }

        this.showEditDirective = false;

        for (var i = 0; i < architecture.directives.length; i++) {
          if(name == architecture.directives[i].name){
            architecture.directives[i].name = this.formDirective.name;
            architecture.directives[i].action = this.formDirective.action;
            if(this.formDirective.action == 'byte' || this.formDirective.action == 'half_word' || this.formDirective.action == 'word' || this.formDirective.action == 'double_word' || this.formDirective.action == 'float' || this.formDirective.action == 'double' || this.formDirective.action == 'space'){
              architecture.directives[i].size = this.formDirective.size;
            }
            else{
              architecture.directives[i].size = null;
            }
            return;
          }
        }
      },
      /*Show delete directive modal*/
      delDirModal(elem, button){
        this.modalDeletDir.title = "Delete " + elem;
        this.modalDeletDir.element = elem;
        this.$root.$emit('bv::show::modal', 'modalDeletDir', button);
      },
      /*Delete directive*/
      delDirective(comp){
        for (var i = 0; i < architecture.directives.length; i++) {
          if(comp == architecture.directives[i].name){
            architecture.directives.splice(i,1);
          }
        }
      },
      /*Empty directive form*/
      emptyFormDirective(){
        this.formDirective.name = '';
        this.formDirective.action = '';
        this.formDirective.size = 0;
      },
      /*Form validator*/
      valid(value){
        if(parseInt(value) != 0){
          if(!value){
            return false;
          }
          else{
            return true;
          }
        }
        else{
          return true;
        }
      },



      /*Compilator*/

      /*Empty assembly textarea*/
      newAssembly(){
        textarea_assembly_editor.setValue("");
      },
      /*Load external assembly code*/
      read_assembly(e){
        show_loading();
        var file;
        var reader;
        var files = document.getElementById('assembly_file').files;

        for (var i = 0; i < files.length; i++){
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event) {
          code_assembly = event.currentTarget.result;
        }
        hide_loading();
      },
      assembly_update(){
        textarea_assembly_editor.setValue(code_assembly);
      },
      /*Save assembly code in a local file*/
      assembly_save(){
        var textToWrite = textarea_assembly_editor.getValue();
        var textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });
        var fileNameToSaveAs;

        if(this.save_assembly == ''){
          fileNameToSaveAs = "assembly.s";
        }
        else{
          fileNameToSaveAs = this.save_assembly + ".s";
        }

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "My Hidden Link";

        window.URL = window.URL || window.webkitURL;

        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
      },
      /*Load the available examples*/
      load_examples_available(){
        $.getJSON('examples/available_example.json', function(cfg){
          example_available = cfg;
          app._data.example_available = example_available;
        });
      },
      /*Load a selected example*/
      load_example(id){
        this.$root.$emit('bv::hide::modal', 'examples', '#closeExample');

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
          if (this.readyState == 4 && this.status == 200) {
            code_assembly = this.responseText;
            textarea_assembly_editor.setValue(code_assembly);

            show_notification(' The selected example has been loaded correctly', 'success') ;
          }
        };
        xhttp.open("GET", "examples/"+id+".txt", true);
        xhttp.send();
      },
      /*Save a binary in a local file*/
      library_save(){
        if(this.assembly_compiler() == -1){
          return;
        }
        promise.then((message) => {
          if(message == "-1"){
            return;
          }
          if(memory[memory_hash[0]].length != 0){
            show_notification('You can not enter data in a library', 'danger') ;
            return;
          }

          for (var i = 0; i < instructions_binary.length; i++){
            console_log(instructions_binary[i].Label)
            if(instructions_binary[i].Label == "main_symbol"){
              show_notification('You can not use the "main" tag in a library', 'danger') ;
              return;
            }
          }

          var aux = {instructions_binary: instructions_binary, instructions_tag: instructions_tag};

          var textToWrite = JSON.stringify(aux, null, 2);
          var textFileAsBlob = new Blob([textToWrite], { type: 'text/json' });
          var fileNameToSaveAs;

          if(this.name_binary_save == ''){
            fileNameToSaveAs = "binary.o";
          }
          else{
            fileNameToSaveAs = this.name_binary_save + ".o";
          }

          var downloadLink = document.createElement("a");
          downloadLink.download = fileNameToSaveAs;
          downloadLink.innerHTML = "My Hidden Link";

          window.URL = window.URL || window.webkitURL;

          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);

          downloadLink.click();

          show_notification('Save binary', 'success') ;
        });
      },
      /*Load binary file*/
      library_load(e){
        var file;
        var reader;
        var files = document.getElementById('binary_file').files;

        for (var i = 0; i < files.length; i++) {
          file = files[i];
          reader = new FileReader();
          reader.onloadend = onFileLoaded;
          reader.readAsBinaryString(file);
        }

        function onFileLoaded(event) {
          code_binary = event.currentTarget.result;
        }
      },
      library_update(){
        update_binary = JSON.parse(code_binary);
        this.update_binary = update_binary;
        $("#divAssembly").attr("class", "col-lg-10 col-sm-12");
        $("#divTags").attr("class", "col-lg-2 col-sm-12");
        $("#divTags").show();
        this.load_binary = true;
      },
      /*Remove a loaded binary*/
      removeLibrary(){
        update_binary = "";
        this.update_binary = update_binary;
        $("#divAssembly").attr("class", "col-lg-12 col-sm-12");
        $("#divTags").attr("class", "col-lg-0 col-sm-0");
        $("#divTags").hide();
        this.load_binary = false;
      },

      /*Compile assembly code*/
      assembly_compiler(){
        show_loading();
        promise = new Promise((resolve, reject) => {

          setTimeout(function(){
	          /* compile */
            code_assembly = textarea_assembly_editor.getValue();
            var ret = assembly_compiler() ;

      	    /* update */
      	    app._data.instructions = instructions;
      	    app._data.memory[memory_hash[1]] = memory[memory_hash[1]];
      	    app._data.memory[memory_hash[0]] = memory[memory_hash[0]];
      	    app._data.memory[memory_hash[2]] = memory[memory_hash[2]];
            tokenIndex = 0;
            app.reset();

            /*Save a backup in the cache memory*/
            if (typeof(Storage) !== "undefined") 
            {
              var auxObject = jQuery.extend(true, {}, architecture);
              var auxArchitecture = bigInt_serialize(auxObject);
              var auxArch = JSON.stringify(auxArchitecture, null, 2);

              var date = new Date();
              var auxDate = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" - "+date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
              console_log(app._data.architecture_name);

              localStorage.setItem("arch_name", app._data.architecture_name);
              localStorage.setItem("architecture_copy", auxArch);
              localStorage.setItem("assembly_copy", textarea_assembly_editor.getValue());
              localStorage.setItem("date_copy", auxDate);
            }

            // show error/warning
            hide_loading();

            if (ret.status == "error") {
                app.compileError(ret.errorcode, ret.token, textarea_assembly_editor.posFromIndex(tokenIndex).line);
            }
      	    else if (ret.status == "warning") {
                show_notification(ret.token, ret.type) ;
            }       
      	    else {
                show_notification('Compilation completed successfully', 'success') ;
            }       

            // end
            resolve("0");

          }, 25);
        });
      },

      /*Show error message in the compilation*/
      compileError(error, token, line){
        this.$root.$emit('bv::show::modal', 'modalAssemblyError');
        if (line > 0){
          this.modalAssemblyError.code1 = line + "  " + textarea_assembly_editor.getLine(line - 1);
        }
        else{
          this.modalAssemblyError.code1 = "";
        }
        this.modalAssemblyError.code2 = (line + 1) + "  " + textarea_assembly_editor.getLine(line);
        if(line < textarea_assembly_editor.lineCount() - 1){
          this.modalAssemblyError.code3 = (line + 2) + "  " + textarea_assembly_editor.getLine(line + 1);
        }
        else{
          this.modalAssemblyError.code3 = "";
        }
        this.modalAssemblyError.error = compileError[error].mess1 + token + compileError[error].mess2;
      },


      /*Simulator*/

      /*Detects the browser being used*/
      detectNavigator(){
        if(navigator.appVersion.indexOf("Mac")!=-1) {
          this.navigator = "Mac";
          return;
        }
    
        if (navigator.userAgent.search("Chrome") >= 0) {
          this.navigator = "Chrome";
        }
        else if (navigator.userAgent.search("Firefox") >= 0) {
          this.navigator = "Firefox";
        }
        else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
          this.navigator = "Chrome";
        }
      },

      /*Change bits of calculator*/
      changeBitsCalculator(index){
        if(index == 0){
          this.calculator.bits = 32;
          this.calculator.variant32 = "primary";
          this.calculator.variant64 = "outline-primary";
          this.calculator.lengthHexadecimal = 8;
          this.calculator.lengthSign = 1;
          this.calculator.lengthExponent = 8;
          this.calculator.lengthMantissa = 23;
        }
        if(index == 1){
          this.calculator.bits = 64;
          this.calculator.variant64 = "primary";
          this.calculator.variant32 = "outline-primary";
          this.calculator.lengthHexadecimal = 16;
          this.calculator.lengthSign = 1;
          this.calculator.lengthExponent = 11;
          this.calculator.lengthMantissa = 52;
        }
        this.calculator.hexadecimal = "";
        this.calculator.sign = "";
        this.calculator.exponent = "";
        this.calculator.mantissa = "";
        this.calculator.decimal = "";
        this.calculator.sign = "";
        this.calculator.exponentDec = "";
        this.calculator.mantissaDec = "";
      },
      /*Calculator functionality*/
      calculatorFunct(index){
        switch(index){
          case 0:
            console_log(this.calculator.hexadecimal.padStart((this.calculator.bits/4), "0"));
            var hex = this.calculator.hexadecimal.padStart((this.calculator.bits/4), "0");
            var float;
            var binary;

            if(this.calculator.bits == 32){
              var re = /[0-9A-Fa-f]{8}/g;
              if(!re.test(hex)){
                show_notification('Character not allowed', 'danger') ;

                this.calculator.sign = "";
                this.calculator.exponent = "";
                this.calculator.mantissa = "";
                this.calculator.exponentDec = "";
                this.calculator.mantissaDec = 0;
                this.calculator.decimal = "";

                return;
              }

              float = this.hex2float("0x" + hex);
              console_log(this.hex2float("0x" + hex));
              binary = float2bin(float).padStart(this.calculator.bits, "0");

              this.calculator.decimal = float;
              this.calculator.sign = binary.substring(0, 1);
              this.calculator.exponent = binary.substring(1, 9);
              this.calculator.mantissa = binary.substring(9, 32);
              this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
              this.calculator.mantissaDec = 0;

              var j = 0;
              for (var i = 0; i < this.calculator.mantissa.length; i++) {
                j--;
                this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
              }
            }
            if(this.calculator.bits == 64){
              var re = /[0-9A-Fa-f]{16}/g;
              if(!re.test(hex)){
                show_notification('Character not allowed', 'danger') ;

                this.calculator.sign = "";
                this.calculator.exponent = "";
                this.calculator.mantissa = "";
                this.calculator.exponentDec = "";
                this.calculator.mantissaDec = 0;
                this.calculator.decimal = "";

                return;
              }

              float = hex2double("0x"+hex);
              binary = double2bin(float);

              this.calculator.decimal = float;
              this.calculator.sign = binary.substring(0, 1);
              this.calculator.exponent = binary.substring(1, 12);
              this.calculator.mantissa = binary.substring(12, 64);
              this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
              this.calculator.mantissaDec = 0;

              var j = 0;
              for (var i = 0; i < this.calculator.mantissa.length; i++) {
                j--;
                this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
              }
            }

            break;
          case 1:
            if(this.calculator.bits == 32){
              this.calculator.sign = this.calculator.sign.padStart(1, "0");
              this.calculator.exponent = this.calculator.exponent.padStart(8, "0");
              this.calculator.mantissa = this.calculator.mantissa.padStart(23, "0");

              var binary = this.calculator.sign + this.calculator.exponent + this.calculator.mantissa;
              console_log(binary);

              var re = /[0-1]{32}/g;
              if(!re.test(binary)){
                show_notification('Character not allowed', 'danger') ;

                this.calculator.hexadecimal = "";
                this.calculator.decimal = "";
                this.calculator.exponentDec = "";
                this.calculator.mantissaDec = 0;
                return;
              }

              float = this.hex2float("0x" + bin2hex(binary));
              hexadecimal = bin2hex(binary);

              this.calculator.decimal = float;
              this.calculator.hexadecimal = hexadecimal.padStart((this.calculator.bits/4), "0");
              this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
              this.calculator.mantissaDec = 0;

              var j = 0;
              for (var i = 0; i < this.calculator.mantissa.length; i++) {
                j--;
                this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
              }
            }
            if(this.calculator.bits == 64){
              this.calculator.sign = this.calculator.sign.padStart(1, "0");
              this.calculator.exponent = this.calculator.exponent.padStart(11, "0");
              this.calculator.mantissa = this.calculator.mantissa.padStart(52, "0");

              var binary = this.calculator.sign + this.calculator.exponent + this.calculator.mantissa;

              var re = /[0-1]{64}/g;
              if(!re.test(binary)){
                show_notification('Character not allowed', 'danger') ;

                this.calculator.hexadecimal = "";
                this.calculator.decimal = "";
                this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
                this.calculator.mantissaDec = 0;

                var j = 0;
                for (var i = 0; i < this.calculator.mantissa.length; i++) {
                  j--;
                  this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
                }
                return;
              }

              double = hex2double("0x" + bin2hex(binary));
              hexadecimal = bin2hex(binary);

              this.calculator.decimal = double;
              this.calculator.hexadecimal = hexadecimal.padStart((this.calculator.bits/4), "0");
            }

            break;
          case 2:
            var float = parseFloat(this.calculator.decimal, 10);
            var binary;
            var hexadecimal;

            if(this.calculator.bits == 32){
              hexadecimal = bin2hex(float2bin(float));
              binary = float2bin(float);

              console_log(hexadecimal);

              this.calculator.hexadecimal = hexadecimal.padStart((this.calculator.bits/4), "0");
              this.calculator.sign = binary.substring(0, 1);
              this.calculator.exponent = binary.substring(1, 9);
              this.calculator.mantissa = binary.substring(9, 32);
              this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
              this.calculator.mantissaDec = 0;

              var j = 0;
              for (var i = 0; i < this.calculator.mantissa.length; i++) {
                j--;
                this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
              }
            }

            if(this.calculator.bits == 64){
              hexadecimal = bin2hex(double2bin(float));
              binary = double2bin(float);

              this.calculator.hexadecimal = hexadecimal.padStart((this.calculator.bits/4), "0");
              this.calculator.sign = binary.substring(0, 1);
              this.calculator.exponent = binary.substring(1, 12);
              this.calculator.mantissa = binary.substring(12, 64);
              this.calculator.exponentDec = parseInt(bin2hex(this.calculator.exponent), 16);
              this.calculator.mantissaDec = 0;

              var j = 0;
              for (var i = 0; i < this.calculator.mantissa.length; i++) {
                j--;
                this.calculator.mantissaDec = this.calculator.mantissaDec + (parseInt(this.calculator.mantissa.charAt(i)) * Math.pow(2, j))
              }
            }
            break;
        }
      },
      /*Update a new register value*/
      updateReg(comp, elem, type, precision){
        for (var i = 0; i < architecture.components[comp].elements.length; i++) {
          if(type == "integer" || type == "control"){
            if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^0x/)){
              var value = this.newValue.split("x");
              if(value[1].length * 4 > architecture.components[comp].elements[i].nbits){
                value[1] = value[1].substring(((value[1].length * 4) - architecture.components[comp].elements[i].nbits)/4, value[1].length)
              }
              architecture.components[comp].elements[i].value = bigInt(value[1], 16).value;
            }
            else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^(\d)+/)){
              architecture.components[comp].elements[i].value = bigInt(parseInt(this.newValue) >>> 0, 10).value;
            }
            else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^-/)){
              architecture.components[comp].elements[i].value = bigInt(parseInt(this.newValue) >>> 0, 10).value;
            }
          }
          else if(type =="floating point"){
            if(precision == false){
              if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^0x/)){
                architecture.components[comp].elements[i].value = this.hex2float(this.newValue);
                this.updateDouble(comp, i);
              }
              else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^(\d)+/)){
                architecture.components[comp].elements[i].value = parseFloat(this.newValue, 10);
                this.updateDouble(comp, i);
              }
              else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^-/)){
                architecture.components[comp].elements[i].value = parseFloat(this.newValue, 10);
                this.updateDouble(comp, i);
              }
            }

            else if(precision == true){
              if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^0x/)){
                architecture.components[comp].elements[i].value = hex2double(this.newValue);
                this.updateSimple(comp, i);
              }
              else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^(\d)+/)){
                architecture.components[comp].elements[i].value = parseFloat(this.newValue, 10);
                this.updateSimple(comp, i);
              }
              else if(architecture.components[comp].elements[i].name == elem && this.newValue.match(/^-/)){
                architecture.components[comp].elements[i].value = parseFloat(this.newValue, 10);
                this.updateSimple(comp, i)
              }
            }
          }
        }
        this.newValue = '';
      },

      /*Execute one instruction*/
      executeInstruction(){
         var ret = executeInstruction();

         if (ret.msg != null) {
             show_notification(ret.msg, ret.type);
             return ;
         }

         if (ret.draw != null) {
            // console.log(JSON.stringify(ret,2,null));
             for (var i=0; i<ret.draw.space.length; i++) {
                  instructions[ret.draw.space[i]]._rowVariant = '';
             }
             for (var i=0; i<ret.draw.info.length; i++) {
                  instructions[ret.draw.info[i]]._rowVariant = 'info';
             }
             for (var i=0; i<ret.draw.success.length; i++) {
                  instructions[ret.draw.success[i]]._rowVariant = 'success';
             }
             for (var i=0; i<ret.draw.danger.length; i++) {
                  instructions[ret.draw.danger[i]]._rowVariant = 'danger';
             }
             
             return ;
         }
      },

      /*Execute all program*/
      executeProgram(but){
        app._data.runExecution = true;
        this.runExecution = false;

        if(instructions.length == 0){
          show_notification('No instructions in memory', 'danger') ;
          return;
        }

        if(executionIndex < -1){
          show_notification('The program has finished', 'danger') ;
          return;
        }
        else if(executionIndex == -1){
          show_notification('The program has finished with errors', 'danger') ;
          return;
        }

        $("#stopExecution").show();
        $("#playExecution").hide();

        this.programExecutionInst(but);
      },

      programExecutionInst(but){
        for (var i=0; (i<app._data.instructionsPacked) && (executionIndex >= 0); i++){
          if(mutexRead == true){
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            return;
          }
          else if(instructions[executionIndex].Break == true && iter1 == 0){
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            return;
          }
          else if(this.runExecution == true){
            app._data.runExecution = false;
            iter1 = 1;
            $("#stopExecution").hide();
            $("#playExecution").show();
            return;
          }
          else if(but == true && i == 0){
            app._data.resetBut = false;
          }
          else if(this.resetBut == true){
            app._data.resetBut = false;

            $("#stopExecution").hide();
            $("#playExecution").show();
            return;
          }
          else{
            executeInstruction();
            iter1 = 0;
          }
        }

        if(executionIndex >= 0){
          setTimeout(this.programExecutionInst, 15);
        }
        else{
          $("#stopExecution").hide();
          $("#playExecution").show();
        }
      },

      /*Stop program excution*/
      stopExecution(){
        app._data.runExecution = true;
      },

    
      /*Exception Notification*/
      exception(error){
        show_notification("There is been an exception. Error description: '" + error, 'danger') ;
        instructions[executionIndex]._rowVariant = 'danger';
        executionIndex = -1;
        return;
      },
      

      /*Reset execution*/
      reset(){
        show_loading();
        setTimeout(function() {

          app._data.resetBut = true;
          app._data.keyboard = "";
          app._data.display = "";
          app._data.enter = null;

          reset() ;

          app._data.unallocated_memory = unallocated_memory;
          hide_loading();

        }, 25);
      },
      /*Enter a breakpoint*/
      breakPoint(record, index){
        for (var i = 0; i < instructions.length; i++) {
          if(instructions[i].Address == record.Address){
            index = i;
            break;
          }
        }

        if(instructions[index].Break == null){
          instructions[index].Break = true;
          app._data.instructions[index].Break = true;
        }
        else if(instructions[index].Break == true){
          instructions[index].Break = null;
          app._data.instructions[index].Break = null;
        }
      },
      /*Console mutex*/
      consoleEnter(){
        if(this.keyboard != ""){
          consoleMutex = true;
        }
      },
      /*Empty keyboard and display*/
      consoleClear(){
        this.keyboard = "";
        this.display = "";
      },
      /*Convert hexadecimal number to floating point number*/
      hex2float ( hexvalue ){
        var value = hexvalue.split('x');
        var value_bit = '';

        for (var i = 0; i < value[1].length; i++){
          var aux = value[1].charAt(i);
          aux = (parseInt(aux, 16)).toString(2).padStart(4, "0");
          value_bit = value_bit + aux;
        }

        var buffer = new ArrayBuffer(4);
        new Uint8Array( buffer ).set( value_bit.match(/.{8}/g).map( binaryStringToInt ) );
        return new DataView( buffer ).getFloat32(0, false);
      },
      /*Convert hexadecimal number to char*/
      hex2char8 ( hexvalue ){
        var num_char = ((hexvalue.toString().length))/2;
        var exponent = 0;
        var pos = 0;

        var valuec = new Array();

        for (var i = 0; i < num_char; i++) {
          var auxHex = hexvalue.substring(pos, pos+2);
          valuec[i] = String.fromCharCode(parseInt(auxHex, 16));
          pos = pos + 2;
        }

        var characters = '';

        for (var i = 0; i < valuec.length; i++){
          characters = characters + valuec[i] + ' ';
        }

        return  characters;
      },

      /*Convert hexadecimal number to char*/
      bin2hex ( value ){
         return bin2hex(value) ;
      },
      hex2double ( value ){
         return hex2double(value) ;
      },
      float2bin ( value ){
         return float2bin(value) ;
      },
      double2bin ( value ){
         return double2bin(value) ;
      },
      /*Modifies double precision registers according to simple precision registers*/
      updateDouble(comp, elem){
        for (var j = 0; j < architecture.components.length; j++) {
          for (var z = 0; z < architecture.components[j].elements.length && architecture.components[j].double_precision == true; z++) {
            if(architecture.components[j].elements[z].simple_reg[0] == architecture.components[comp].elements[elem].name){
              var simple = bin2hex(float2bin(architecture.components[comp].elements[elem].value));
              var double = bin2hex(double2bin(architecture.components[j].elements[z].value)).substr(8, 15);
              var newDouble = simple + double;

              architecture.components[j].elements[z].value = hex2double("0x"+newDouble);
            }
            if(architecture.components[j].elements[z].simple_reg[1] == architecture.components[comp].elements[elem].name){
              var simple = bin2hex(float2bin(architecture.components[comp].elements[elem].value));
              var double = bin2hex(double2bin(architecture.components[j].elements[z].value)).substr(0, 8);
              var newDouble = double + simple;

              architecture.components[j].elements[z].value = hex2double("0x"+newDouble);
            }
          }
        }
      },
      /*Modifies single precision registers according to double precision registers*/
      updateSimple(comp, elem){
        var part1 = bin2hex(double2bin(architecture.components[comp].elements[elem].value)).substr(0, 8);
        var part2 = bin2hex(double2bin(architecture.components[comp].elements[elem].value)).substr(8, 15);

        for (var j = 0; j < architecture.components.length; j++) {
          for (var z = 0; z < architecture.components[j].elements.length; z++) {
            if(architecture.components[j].elements[z].name == architecture.components[comp].elements[elem].simple_reg[0]){
              architecture.components[j].elements[z].value = this.hex2float("0x"+part1);
            }
            if(architecture.components[j].elements[z].name == architecture.components[comp].elements[elem].simple_reg[1]){
              architecture.components[j].elements[z].value = this.hex2float("0x"+part2);
            }
          }
        }
      },
      /*Filter table instructions*/
      filter(row, filter){
        if(row.hide == true){
          return false;
        }
        else{
          return true;
        }
      },
      /*Debug*/
      toggle_debug ( )
      {
         creator_debug = app._data.c_debug ;
      },
      /*Popover functions*/
      popoverId(i){
        return 'popoverValueContent' + i;
      },
      closePopover(){
        this.$root.$emit('bv::hide::popover')
      },
      /*Show integer registers*/
      change_data_view(e, type){

        app._data.data_mode = e;

        if (e == "registers")
	{
          app._data.register_type = type;
          if(type == "integer"){
            app._data.nameTabReg = "Decimal";
            app._data.nameReg    = 'INT Registers';
          }
          else if(type == "floating point"){
            app._data.nameTabReg = "Real";
            app._data.nameReg    = 'FP Registers';
          }
        }

        if (e == "memory"){
          app._data.data_mode = "stats";
          setTimeout(function(){
            app.$forceUpdate();
            app._data.data_mode = e;
          }, 10);
        }

        app.$forceUpdate();
      },
      change_popover_register(e){
        app._data.register_popover = e;
        app.$forceUpdate();
      },
      /*Stop user interface refresh*/
      debounce: _.debounce(function (param, e) {
        console_log(param);
        console_log(e);

        e.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        var re = new RegExp("'","g");
        e = e.replace(re, '"');
        re = new RegExp("[\f]","g");
        e = e.replace(re, '\\f');
        re = new RegExp("[\n\]","g");
        e = e.replace(re, '\\n');
        re = new RegExp("[\r]","g");
        e = e.replace(re, '\\r');
        re = new RegExp("[\t]","g");
        e = e.replace(re, '\\t');
        re = new RegExp("[\v]","g");
        e = e.replace(re, '\\v');

        if(e == ""){
          this[param] = null;
          return;
        }

        console_log("this." + param + "= '" + e + "'");

        eval("this." + param + "= '" + e + "'");

        //this[param] = e.toString();
        app.$forceUpdate();
      }, getDebounceTime())
    },
  });



  /*************
   * Functions *
   *************/

  /*All modules*/

  /*Error handler*/
  Vue.config.errorHandler = function (err, vm, info) {
      show_notification('An error has ocurred, the simulator is going to restart.  \n Error: ' + err, 'danger') ;
      setTimeout(function(){
        location.reload(true)
      }, 3000);
  }

  /*Closing alert*/
  window.onbeforeunload = confirmExit;
  function confirmExit(){
    return "He's tried to get off this page. Changes may not be saved.";
  }

  /*Determines the refresh timeout depending on the device being used*/
  function getDebounceTime(){
    if(screen.width > 768){
      return 500;
    }
    else{
      return 1000;
    }
  }
  /*Stop the transmission of events to children*/
  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }

  /*Architecture editor*/


  /*Codemirror*/
  function codemirrorStart(){
    var editor_cfg = {
      lineNumbers: true,
      autoRefresh:true
    };

    var textarea_assembly_obj = document.getElementById("textarea_assembly");

    if(textarea_assembly_obj != null){
      textarea_assembly_editor = CodeMirror.fromTextArea(textarea_assembly_obj, editor_cfg);
      textarea_assembly_editor.setOption('keyMap', 'sublime') ; // vim -> 'vim', 'emacs', 'sublime', ...
      textarea_assembly_editor.setValue(app._data.assembly_code);
      textarea_assembly_editor.setSize("auto", "550px");

      // add Ctrl-m
      /*var map = {
        'Ctrl-m': function(cm) { cm.execCommand('toggleComment'); }
      } ;
      textarea_assembly_editor.addKeyMap(map);*/
    }
  }



  /*Simulator*/

  /*Binary string to integer number*/
  function binaryStringToInt( b ) {
    return parseInt(b, 2);
  }
}
catch(e)
{
   show_notification('An error has ocurred, the simulator is going to restart.  \n Error: ' + e, 'danger') ;

   setTimeout(function(){
     location.reload(true)
   }, 3000);
}
