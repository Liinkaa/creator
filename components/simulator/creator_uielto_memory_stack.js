/*
 *  Copyright 2018-2021 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
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


        /* jshint esversion: 6 */

        var uielto_memory_stack = {

			  props:      {
											memory:   					{ type: Array,  required: true },
											callee_subrutine:   { type: String, required: true },
											caller_subrutine:   { type: String, required: true }
										},

				data: 			function () {
											return {
          							/*Memory table fields*/
      									memFields: ['Tag', 'Address', 'Binary', 'Value']
  										}
        						},

			  methods: 		{
			  							/*Filter table instructions*/
								      filter(row, filter){
								        return (Math.abs(row.Address - app._data.end_callee) < 40);
								      },

			  							select_stack_type(record, index){
								        app._data.row_index = index;  //TODO: vue bidirectional updates
								        app.$refs['stack_modal'].show(); //TODO: vue bidirectional updates
								      }				
			  						},

      	template:   '	<div class="col-lg-12 col-sm-12">' +
										'	  <b-table sticky-header ' +
										'	           striped ' +
										'	           small ' +
										'	           hover ' +
										'	           :items="memory" ' +
										'	           :fields="memFields" ' +
										'	           :filter-function=filter ' +
										'	           filter=" " ' +
										'	           class="memory_table" ' +
										'	           @row-clicked="select_stack_type">' +
										'	' +
										'	    <template v-slot:head(Tag)="row">' +
										'	      &nbsp;' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Tag)="row">' +
										'	      <div v-for="item in architecture_hash">' +
										'	        <div v-for="item2 in architecture.components[item.index].elements">' +
										'	          <b-badge variant="info" ' +
										'	                   class="border border-info shadow memoryTag" ' +
										'	                   v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'stack\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	            {{item2.name[0]}}' +
										'	          </b-badge>' +
										'	          <span class="fas fa-long-arrow-alt-right" ' +
										'	                v-if="item2.properties.includes(\'pointer\') && item2.properties.includes(\'stack\') && ((parseInt(item2.value) & 0xFFFFFFFC) == (row.item.Address & 0xFFFFFFFC))">' +
										'	          </span>' +
										'	' +
										'	        </div>' +
										'	      </div>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Address)="row">' +
										'	      <span class="h6Sm text-secondary" v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">' + //Llamado
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm text-success" v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">' + //Llamante
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">' +
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	      <span class="h6Sm" v-if="(row.item.Address >= app._data.begin_caller)">' + //Antes del llamante
										'	        0x{{((row.item.Address + 3).toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}} - 0x{{(row.item.Address.toString(16)).padStart(row.item.Address.length-2, "0").toUpperCase()}}' +
										'	      </span>' +
										'	    </template>' +
										'	' +
										'	    <template v-slot:cell(Binary)="row">' +
										'	      <span class="h6Sm text-secondary" v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">' + //Llamado
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	' +
										'	      <span class="h6Sm text-success" v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										' ' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										' ' +
										'	      <span class="h6Sm" v-if="(row.item.Address >= app._data.begin_caller)">' + //Antes del llamante
										'	        <span class="memoryBorder" v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[3].Tag == null">' +
										'	          {{row.item.Binary[3].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[3].Tag != null">' +
										'	          {{row.item.Binary[3].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[2].Tag != null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[2].Tag == null">' +
										'	          {{row.item.Binary[2].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[2].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[1].Tag == null">' +
										'	          {{row.item.Binary[1].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[1].Tag != null">' +
										'	          {{row.item.Binary[1].Tag}}' +
										'	        </b-badge>' +
										'	' +
										'	        <span class="memoryBorder" v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span> ' +
										'	        <span v-if="row.item.Binary[0].Tag == null">' +
										'	          {{row.item.Binary[0].Bin.toUpperCase()}}' +
										'	        </span>' +
										'	        <b-badge pill variant="info" ' +
										'	                 class="border border-info shadow binaryTag" ' +
										'	                 v-if="row.item.Binary[0].Tag != null">' +
										'	          {{row.item.Binary[0].Tag}}' +
										'	        </b-badge>' +
										'	      </span>' +
										'	' +
										'	    </template>' +
										'	    <template v-slot:cell(Value)="row">' +
										'	      <span class="h6Sm text-secondary"  v-if="((row.item.Address < app._data.end_callee) && (Math.abs(row.item.Address - app._data.end_callee) < 40))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm text-success"    v-if="((row.item.Address < app._data.begin_callee) && (row.item.Address >= app._data.end_callee))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm text-blue-funny" v-if="((row.item.Address < app._data.begin_caller) && (row.item.Address >= app._data.end_caller))">{{row.item.Value}}</span>' +
										'	      <span class="h6Sm"                 v-if="(row.item.Address >= app._data.begin_caller)">{{row.item.Value}}</span>' +
										'	    </template>' +
										'	  </b-table>' +
										'	  <div class="col-lg-12 col-sm-12 row">' +
										'	  	<div class="col-lg-12 col-sm-12">' +
										'	    	<span>Stack memory key:</span>' +
										'	    </div>' +
										'	' +
										'	    <div class="col-lg-1 col-sm-12"></div>' +
										'	    <div class="col-auto">' +
										'	    	<b-badge variant="secondary">Free Stack</b-badge>' +
										'	    </div>' +
										'	    <div class="col-auto">' +
										'	      <h5><b-badge variant="success">Callee Subrutine: {{callee_subrutine}}</b-badge></h5>' +
										'	    </div>' +
										'	    <div class="col-auto">' +
										'	      <h5><b-badge class="variant-blue-funny">Caller Subrutine: {{caller_subrutine}}</b-badge></h5>' +
										'	    </div>' +
										'	    <div class="col-auto">' +
										'	      <h5><b-badge variant="dark">Protected stack</b-badge></h5>' +
										'	    </div>' +
										'	    	<div class="col-lg-1 col-sm-12"></div>' +
										'	    </div>' +
										'	</div>'
		  
				}

        Vue.component('table-mem-stack', uielto_memory_stack) ;

