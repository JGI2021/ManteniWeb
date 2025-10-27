/*
 *    Javascript del formulario de Estructuras de Datos
 * 
 */

class Variable {
    constructor(nombre, tipo) {
        this.NombreVariable = nombre;
        this.Orden = 0;
        this.TipoVariable = tipo;
        this.NombreTipoVariable = '';
    }
}

// Array de estructuras que se va a usar para nuevas variables de una estructura
var arrayEstructuras = new Array();


/// Panel para crear una nueva variable
function MostrarPanelAddVariable() {
    $('#BotoneraEstructura').css('display', 'none');
    $('#PanelAltaVariable').css('display', 'block')
    // vacío los campos
    $('#InputVariable').val('');
}


// 
// Cerramos el panel donde se crean o modiican las estructuras
function CerrarPanelEstructura() {
    $('#PanelAltaEstructura').removeClass('panel-sucess');
    $('#PanelAltaEstructura').removeClass('panel-primary');
    $('#PanelAltaEstructura').css('display', 'none');
    $('#InputNombreEstructura').val('');
    // Oculto el botón de añadir estructura
    $('#BtnCrearEstructura').prop('disabled', false);
}

/*
 *  Abrir panel para crear una nueva estructura
 *   
 */
function MostratPanelCrearEstructura(titulo) {

    if (!$('#PanelAltaEstructura').hasClass('panel-primary')) {
        $('#PanelAltaEstructura').addClass('panel-primary');
        $('#AccionEstructura').val('I');
    }

    // muestro el panel para crear estructura
    $('#PanelAltaEstructura').css('display', 'block');
    $('#InputNombreEstructura').val('');
    // Oculto el botón de añadir estructura
    $('#BtnCrearEstructura').prop('disabled', 'true');
    $('#TituloPanelEstructura').html('<strong>Nueva estructura de datos</strong>')

    // vacío el array de variables
    if (arrayVariables === null) {
        arrayVariables = new Array();
    }

    arrayVariables.forEach(function (variable, indice, array) {
        EliminarVariableDeArray(variable.NombreVariable, indice);
    });
}


/*
 * 
 *  Prepara panel para editar una estructura 
 *  
 */
function EditaEstructura(codigo) {
    if (!$('#PanelAltaEstructura').hasClass('panel-success')) {
        $('#PanelAltaEstructura').addClass('panel-success');
    }
    else {
        // ya está abierto no se puede volver a abrir
        return;
    }

    $('#PanelAltaEstructura').removeClass('panel-primary');
    // Indico que es una actualización
    $('#AccionEstructura').val('U');
    $('#CodigoDeEstructura').val(codigo);

    $('#BtnCrearEstructura').prop('disabled', 'true');

    var params = { "codigo": codigo };
    var url = getRutaAbsoluta() + "/Estructuras/ObtenerEstructura"
    $.ajax({
        url: url,
        type: 'POST',
        data: params,
        success: function (datos) {
            if (datos !== null && datos.NombreEstructura != '') {
                $('#PanelAltaEstructura').css('display', 'block');
                $('#InputNombreEstructura').val('');
                $('#TituloPanelEstructura').html('<strong>Modificar estructura de datos</strong>');

                RellenaDatosEstructura(datos);
            }
            else {
                $.alert({
                    title: 'Error',
                    content: "Se ha producido un error al recuperar los datos de la estructura"
                });
            }
        }
    });
}


/// Rellena los datos del panel con los datos que vienen de l estructura como parámetro
function RellenaDatosEstructura(estructura) {
    $('#InputNombreEstructura').val(estructura.NombreEstructura);
    var variables = estructura.Variables;
    variables.forEach(function (variable, indice, array) {
        var pos = arrayVariables.push(new Variable(variable.NombreVariable, variable.TipoVariable));
        // habilitamos la tabla si no está visible
        if ($('#DivTablaVariables').hasClass('no-mostrar')) {
            $(' #DivTablaVariables').removeClass('no-mostrar');
        }

        pos = pos - 1;
        // añadimos la fila a la tabla
        var row = '<tr id=\"tr_' + pos + '\"><td>' + variable.NombreVariable + '</td> ';
        row += '<td> ' + variable.NombreTipoVariable + '</td>';
        row += ' <td> ';
        row += '<span class="fa fa-close" style="color:red;" onclick="EliminarVariableDeArray(\'' + variable.NombreVariable + '\',' + pos + ')" ></span>';
        row += '</td > </tr > ';
        $('#TablaVariables > tbody:last-child').append(row);
    });
}


// Pulsamos botón de cancelar creación de variable
function CancelarVariable() {
    $('#BotoneraEstructura').css('display', 'block');
    $('#PanelAltaVariable').css('display', 'none');
}

//
// Pulsamos el botón de GUARDAR VARIABLE al crear una nueva variable
//
function GuardarVariable() {
    // nombre de la variable
    var nombre = $('#InputVariable').val();
    // Obtengo el tipo de variable;
    var tipo = $('#SelectTipo').val();
    var tipoTexto = $('#SelectTipo option:selected').text();
    var duplicado = false;
    // Miramos si ya exite ese nombre
    arrayVariables.forEach(function (variable, indice, array) {
        if (variable.NombreVariable === nombre) {
            $.alert("Ya existe una variable con ese nombre dentro de la estrucutra. No puede haber dos variables con el mismo nombre.");
            duplicado = true;
        }
    });

    if (!duplicado) {
        // Si no existe damos de alta la variable
        var pos = arrayVariables.push(new Variable(nombre, tipo));
        // habilitamos la tabla si no está visible
        if ($('#DivTablaVariables').hasClass('no-mostrar')) {
            $(' #DivTablaVariables').removeClass('no-mostrar');
        }

        pos = pos - 1;
        // añadimos la fila a la tabla
        var row = '<tr id="tr_' + pos + '"><td>' + nombre + '</td> ';
        row += '<td> ' + tipoTexto + '</td>';
        row += ' <td> ';
        row += '<span class="fa fa-close" style="color:red;" onclick="EliminarVariableDeArray(\'' + nombre + '\',' + pos + ')" ></span>';
        row += '</td > </tr > ';
        $('#TablaVariables > tbody:last-child').append(row);
        // Vaciamos el campo nombre
        $('#InputVariable').val('');
    }
}


// Eliminamos del array y de la tabla de variables la varible 
function EliminarVariableDeArray(nombre, pos) {
    // Busco el nombre para eliminarlo del array
    arrayVariables.forEach(function (variable, indice, array) {
        if (variable.NombreVariable === nombre) {
            // elimino el dato del array
            arrayVariables.splice(indice, 1);
        }
    });
    // elimino la fila de la tabla
    $('#tr_' + pos).remove();
    // Si no quedan variables oculto la tabla
    if (arrayVariables.length === 0) {
        $('#DivTablaVariables').addClass('no-mostrar');
    }
}

// Comprueba que los caracteres introducidos sean caractres alfabéticos, numeros y _
function CompruebaCaracter(e) {
    if (e.charCode === ' ')
        return false;

    var regex = new RegExp("^[a-zA-Z0-9_]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
}

/// Guarda la estructura creada en la base de datos
function GuardarEstructura() {
    var nombreEstructura = $('#InputNombreEstructura').val();
    // Comprobamos que se ha puesto un nombre a la estructura
    if (nombreEstructura === '') {
        $.alert('El nombre de la estructura no puede ir en blanco');
        return;
    }
    // Miramos que se han creado variables, para eso miramos si la tabla de varibles es visible, y que solo se muestra si hay variables
    if ($('#DivTablaVariables').hasClass('no-mostrar')) {
        $.alert('La estructura debe contener al menos una variable');
        return;
    }
    // Accion que se va a realizar 'I' alta, 'U' actualizar datos
    var accion = $('#AccionEstructura').val();
    var url = getRutaAbsoluta();

    if (accion == 'I') {
        var params = { "nombreestructura": nombreEstructura, "variables": arrayVariables };
        // PAsamos al controlador para salvar los datos
        $.post(url + "/Estructuras/AltaEstructura", params, function (resultado) {
            if (resultado === 'OK') {
                $('#PanelAltaEstructura').css('display', 'none');
                // Activo el botón de añadir estructura
                $('#BtnCrearEstructura').prop('disabled', 'false');
                window.location.href = getRutaAbsoluta() + "/Estructuras/Index";
            }
            else {
                $.alert({
                    title: 'Error',
                    content: resultado,
                });
            }
        });
    }
    else if (accion == 'U') {
        // obtenemos el código de la estructura
        var codigo = $('#CodigoDeEstructura').val();
        var params = { "codigo": codigo, "nombreestructura": nombreEstructura, "variables": arrayVariables };
        // PAsamos al controlador para salvar los datos
        $.post(url + "/Estructuras/ActualizaEstructura", params, function (resultado) {
            if (resultado === 'OK') {
                $('#PanelAltaEstructura').css('display', 'none');
                // Activo el botón de añadir estructura
                $('#BtnCrearEstructura').prop('disabled', 'false');
                window.location.href = getRutaAbsoluta() + "/Estructuras/Index";
            }
            else {
                $.alert({
                    title: 'Error',
                    content: resultado,
                });
            }
        });
    }
}


/*
 * Eliminamos una estructura de datos y sus variables
 * 
 */
function EliminaEstructura(codigo) {
    $.confirm({
        title: 'Eliminar estructura',
        content: 'Pulse Eliminar para dar de baja la estructura y sus variables',
        type: 'red',
        buttons: {
            eliminar: {
                text: 'Eliminar',
                btnClass: 'btn-red',
                action: function () {
                    var params = { "codigo": codigo };
                    var url = getRutaAbsoluta() + '/Estructuras/EliminaEstructura';

                    $.ajax({
                        url: url,
                        type: 'DELETE',
                        data: params,
                        success: function (result) {
                            if (result == 'OK') {                                
                                window.location.href = getRutaAbsoluta() + '/Estructuras/Index';
                            }
                            else {
                                $.alert({
                                    title: 'Error',
                                    content: resultado,
                                });
                            }
                        }
                    });
                }
            },
            cerrar: {
                text: 'Cerrar',
                btnClass: 'btn-default',
                action: function() {
                }
            }
        }
    });
}


/*
 * 
 * SUBIR VARIABLE. CAMBIAR DE ORDEN LA VARIABLE SUBIENDOLA HACIA ARRIBA 
 * 
 */
function Subirvariable(codigo, orden) {
    // Si ya es la primera no puede subir más
    if (orden <= 1) {
        alert("No se puede cambiar de orden, ya es la primera");
        return;
    }

    var url = getRutaAbsoluta() + "/Estructuras/ModificaOrdenVariables";
    var params = { "codigo": codigo, "orden": orden, "accion": "U" };

    $.ajax({
        url: url,
        type: 'PUT',
        data: params,
        success: function (result) {
            if (result !== 'OK') {
                $.alert(result);
            }
            else {
                var idSelected = 'tr_' + codigo + "_ord_" + orden;
                // Busco la tabla que tengo que mirar
                var table = document.getElementById("myOpTable_" + codigo)
                // Cojo todas sus filas
                var tr = table.getElementsByTagName("tr");
                var posAnt = 0;
                var posSelected = 0;

                for (i = 0; i < tr.length; i++) {
                    if (tr[i].id === idSelected) {
                        posAnt = i - 1;
                        posSelected = i;
                        break;
                    }
                }
                // Intercambio los campos de una fila a la otra
                var tdSelect = tr[posSelected].getElementsByTagName("td");
                var tdAnt = tr[posAnt].getElementsByTagName("td");
                // Intercambio los valores de los campos
                IntercambiaValoresTD(tdSelect, tdAnt);
            }
        }
    });

}


/*
 * 
 * BAJAS VARIABLE. CAMBIAR VARIABLE DE ORDEN HACIA ABAJO 
 * 
 */
function Bajarvariable(codigo, orden) {
    // Busco la tabla que tengo que mirar
    var table = document.getElementById("myOpTable_" + codigo)
    // Para saber si es la última tengo que saber las filas de la tabla, quitando la de la cabecera
    var tr = table.getElementsByTagName("tr");
    var totfilas = tr.length - 1; // Le quito la fila de la cabecesa
    // Si ya es la primera no puede subir más
    if (orden >= totfilas) {
        alert("No se puede cambiar de orden, ya es la última");
        return;
    }

    var url = getRutaAbsoluta() + "/Estructuras/ModificaOrdenVariables";
    var params = { "codigo": codigo, "orden": orden, "accion": "D" };

    $.ajax({
        url: url,
        type: 'PUT',
        data: params,
        success: function (result) {
            if (result !== 'OK') {
                $.alert(result);
            }
            else {
                var idSelected = 'tr_' + codigo + "_ord_" + orden;
                var posSig = 0;
                var posSelected = 0;

                for (i = 0; i < tr.length; i++) {
                    if (tr[i].id === idSelected) {
                        posSig = i + 1;
                        posSelected = i;
                        break;
                    }
                }
                // Intercambio los campos de una fila a la otra
                var tdSelect = tr[posSelected].getElementsByTagName("td");
                var tdSig = tr[posSig].getElementsByTagName("td");
                // Intercambio los valores de los campos
                IntercambiaValoresTD(tdSelect, tdSig);
            }
        }
    });
}


function IntercambiaValoresTD(tdA, tdB) {    
    // Paso los valores de A a unos campos auxiliares
    var c1 = tdA[0].innerText;
    var c2 = tdA[1].innerText;
    // paso los valores de B a A
    tdA[0].innerText = tdB[0].innerText;
    tdA[1].innerText = tdB[1].innerText;
    // Paso el valor de los campos a B
    tdB[0].innerText = c1;
    tdB[1].innerText = c2;
}




/*
 * 
 * ELIMINA UNA VARIABLE DE BD Y DE LA TABLA
 * 
 */
function EliminarVariable(codigo, variable, orden) {
    // Lo primero que miro es si solo tiene una variable, en tal caso debe borrar la estructura o modificarla pero no p
    // puede haber unaestructura sin variables
    // Busco la tabla que tengo que mirar
    var table = document.getElementById("myOpTable_" + codigo)
    // Para saber si es la última tengo que saber las filas de la tabla, quitando la de la cabecera
    var tr = table.getElementsByTagName("tr");
    if (orden == tr.length - 1) {
        $.alert("No se puede dejar una estructura sin variables. Borre la estructura o modifíquela");
        return;
    }

    var url = getRutaAbsoluta() + "/Estructuras/EliminarVariable";
    var params = { "codigo": codigo, "variable": variable };

    $.ajax({
        url: url,
        type: 'DELETE',
        data: params,
        async: false,
        success: function (result) {
            if (result === 'OK') {
                // Elimino la fila
                $('#tr_' + codigo + "_ord_" + orden).remove();
                for (i = 1; i <= tr.length; i++) {
                    var td = tr[i].getElementsByTagName("td");
                    if (td[2].innerText >= orden) {
                        td[2].innerText = orden;
                        orden++;
                    }                    
                }                
            }
            else {
                $.alert(result);
            }
        }
    });
}
