
/*
 *  Copyright 2018-2025 Felix Garcia Carballeira, Diego Camarmas Alonso, Alejandro Calderon Mateos
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

  var uielto_institutions = {

    props:      {
                  id:                   { type: String,  required: true }
                },

    template:   ' <b-modal  :id ="id" ' +
                '           title="They Use CREATOR" ' +
                '           scrollable' +
                '           hide-footer' +
                '           size="xl">' +
                ' ' +
                
                ' ' +
                ' </b-modal>'
  }

  Vue.component('uielto-institutions', uielto_institutions) ;


