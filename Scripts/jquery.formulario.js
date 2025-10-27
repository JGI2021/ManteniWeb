"use strict";

function getRutaAbsolutaT() {
    var loc = window.location;
    var href = loc.href.trim();
    if (href[href.length - 1] == '#')
        href = href.substring(0, href.length - 1);
    var pathName = loc.pathname;
    pathName = pathName.substring(1, pathName.length - 1);

    pathName = pathName.substring(0, pathName.indexOf("/"));

    href = window.location.protocol + "//" + window.location.host + "/" + pathName;
    return href;
}

(function ($) {
    $.fn.formulario = function (opciones) {

        // Dependiendo de si queremos que acceda a SQL o a Oracle usar una de las dos llamadas
        var urlWebserviceAccesoOracle = getRutaAbsolutaT() + "/Formulario.asmx/JSONFormularioDatosLista";
        var urlControladorAccesoSql = urlWebserviceAccesoOracle;
        // Cambiar esta variable para cambiar el acceso
        var urlAcceso = urlWebserviceAccesoOracle;


        // Se aplica sobre un elemento form del tipo <form class="form-horizontal" id="miFormulario"></form>
        // Crea dentro del elemento el fieldset, el legend, y agrega los componentes del formulario pasado como parámetro.
        // Necesita de jquery-ui para el calendario.        
        //
        // Opciones
        //
        //  idFormulario:   id del formulario que queremos renderizar, por defecto "FAVORITOS",
        //  onSubmit:       función que queremos que se ejecute cuando se produzca el evento submit del formulario.
        //                  Por defecto, serializa y muestra los datos enviados.
        //
        // Ejemplo de uso:
        //
        //  $("#miFormulario").formulario({ idFormulario: "'35c72198-56f0-4a87-af22-ffa87a8154c8'", onSubmit: miFuncionPersonalizada });
        
            
        var submitPorDefecto = function (event) {
            //Por defecto, muestra cuáles serían los datos que enviaría el formulario creado            
            var datos = formulario.serialize();
            console.log("Se provocaría el envío del formulario con los siguientes datos:\n" + datos);
            return false;
        };

        //Opciones por defecto
        var settings = $.extend({
            idFormulario: "FAVORITOS",
            onSubmit: submitPorDefecto
        }, opciones);

        //Configuración regional de datepicker de jquery-ui
        $.datepicker.regional['es'] = {
            closeText: 'Cerrar',
            currentText: 'Hoy',
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
            dateFormat: 'dd/mm/yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: '',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true
        };
        $.datepicker.setDefaults($.datepicker.regional['es']);
        //No quiero que lea de cache, quiero que repita la llamada asíncrona
        $.ajaxSetup({
            cache: false
        });

        //Variables

        var formulario = this; //elemento form que ha llamado a la función, donde dibujaremos el formulario

        //Funciones

        var agregarComponente = function (value) {
            //value es un componente del formulario
            var tipo = value.tipo;
            var orden = value.orden;
            var id = value.id;
            var name = value.name;
            var valor = value.value;
            var required = value.required;
            var htmlRequired = '';
            if (required == 'true') {
                htmlRequired = ' required="" ';
            }
            var label = value.label;
            var es_password = value.es_password;
            var min = value.min;
            var max = value.max;
            var checkeado = value.checkeado;
            var htmlCheckeado = '';
            if (checkeado == 'true') {
                htmlCheckeado = ' checked="" ';
            }
            var texto_radio = value.texto_radio;
            var texto_button = value.texto_button;
            var es_checkbox = value.es_checkbox;
            var es_submit = value.es_submit;
            var htmlSubmit = '';
            var claseBoton;
            if (es_submit == 'true') {
                htmlSubmit = ' type="submit" ';
                claseBoton = ' btn btn-success ';
            } else {
                htmlSubmit = ' type="button"';
                claseBoton = ' btn btn-danger ';
            }
            var htmlBotonera = "";//Solamente se dibuja, no da opción de modificación
            //data-elementosContenidos será un array que contendrá el número de orden de los elementos contenidos en el form-group donde irá el elemento.
            //Salvo en grupos de radiobutton o checkboxes contendrá un solo elemento. Lo guardaremos como data del form-group para poder identificarlos.
            var htmlText = "";
            switch (tipo) {
                case "InputText":
                    if (es_password == 'true') {
                        htmlText = '<div class="form-group" data-elementoscontenidos="[' + orden + ']"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4">' +
                            '<input data-orden = ' + orden + ' id="' + id + '" name="' + name + '" type="password" value="' + valor + '"' + htmlRequired + htmlCheckeado + ' class="form-control input-md"></div>' + htmlBotonera + '</div>';
                    } else {
                        htmlText = '<div class="form-group" data-elementoscontenidos="[' + orden + ']"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4">' +
                            '<input data-orden = ' + orden + ' id="' + id + '" name="' + name + '" type="text" value="' + valor + '"' + htmlRequired + htmlCheckeado + ' class="form-control input-md"></div>' + htmlBotonera + '</div>';
                    }
                    fieldset.append(htmlText);
                    break;
                case "InputNumber":
                    htmlText = '<div class="form-group" data-elementoscontenidos="[' + orden + ']"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4">' +
                        '<input data-orden = ' + orden + ' id="' + id + '" name="' + name + '" type="number" value="' + valor + '" min="' + min + '" max="' + max + '"' + htmlRequired + htmlCheckeado + ' class="form-control input-md"></div>' + htmlBotonera + '</div>';
                    fieldset.append(htmlText);
                    break;
                case "InputDate":
                    htmlText = '<div class="form-group" data-elementoscontenidos="[' + orden + ']"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4">' +
                        '<input data-orden = ' + orden + ' id="' + id + '" name="' + name + '" type="text" value="' + valor + '" min="' + min + '" max="' + max + '"' + htmlRequired + htmlCheckeado + ' class="form-control input-md"></div>' + htmlBotonera + '</div>';
                    fieldset.append(htmlText);
                    fieldset.find("#" + id).datepicker();
                    fieldset.find("#" + id).val(valor);
                    break;
                case "InputRadio": //RadioButton o CheckBox
                    if (es_checkbox == 'true') {
                        //var checkBoxGroup = $("#checkBoxGroup_" + id);
                        //Lo busco dentro de este formulario, por si se estuviera renderizando el mismo formulario en sitios distintos
                        var checkBoxGroup = fieldset.find("#checkBoxGroup_" + id);
                        if (checkBoxGroup.length == 0) {
                            //Es el primer checkbox que agrego al formulario. Creo el grupo.
                            htmlText = '<div class="form-group" data-elementoscontenidos="[]"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4 checkBoxGroup" id="' + 'checkBoxGroup_' + id + '"></div>' + htmlBotonera + '</div>';
                            fieldset.append(htmlText);
                        }
                        //Agrego el elemento al grupo
                        //checkBoxGroup = $("#checkBoxGroup_" + id);
                        checkBoxGroup = fieldset.find("#checkBoxGroup_" + id);
                        //Los datos están contenidos en el padre del grupo de radio buttons, que es el form-group
                        var elementoscontenidos = checkBoxGroup.parent().data("elementoscontenidos");
                        elementoscontenidos.push(orden); //Agrego este elemento al data del form-group
                        checkBoxGroup.parent().data("elementoscontenidos", elementoscontenidos);
                        var contador = checkBoxGroup.find(".checkbox").length;
                        var elementId = id + "-" + contador;
                        htmlText = '<div class="checkbox"><label for="' + elementId + '">' +
                            '<input data-orden = ' + orden + ' type="checkbox" name="' + name + '" id="' + elementId + '" value="' + valor + '" ' + htmlCheckeado + '>' + texto_radio + '</label></div>';
                        checkBoxGroup.append(htmlText);
                    } else {
                        //var radioButtonGroup = $("#radioButtonGroup_" + id);
                        //Lo busco dentro de este formulario, por si se estuviera renderizando el mismo formulario en sitios distintos
                        var radioButtonGroup = fieldset.find("#radioButtonGroup_" + id);
                        if (radioButtonGroup.length == 0) {
                            //Es el primer radiobutton que agrego al formulario. Creo el grupo.
                            htmlText = '<div class="form-group" data-elementoscontenidos="[]"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4 radioButtonGroup" id="' + 'radioButtonGroup_' + id + '"></div>' + htmlBotonera + '</div>';
                            fieldset.append(htmlText);
                        }
                        //Agrego el elemento al grupo
                        //radioButtonGroup = $("#radioButtonGroup_" + id);
                        radioButtonGroup = fieldset.find("#radioButtonGroup_" + id);
                        //Los datos están contenidos en el padre del grupo de radio buttons, que es el form-group
                        var elementoscontenidos = radioButtonGroup.parent().data("elementoscontenidos");
                        elementoscontenidos.push(orden); //Agrego este elemento al data del form-group
                        radioButtonGroup.parent().data("elementoscontenidos", elementoscontenidos);
                        var contador = radioButtonGroup.find(".radio").length;
                        var elementId = id + "-" + contador;
                        htmlText = '<div class="radio"><label for="' + elementId + '">' +
                            '<input data-orden = ' + orden + ' type="radio" name="' + name + '" id="' + elementId + '" value="' + valor + '" ' + htmlCheckeado + '>' + texto_radio + '</label></div>';
                        radioButtonGroup.append(htmlText);
                    }
                    break;
                case "InputButton":
                    htmlText = '<div class="form-group" data-elementosContenidos="[' + orden + ']"><label class="col-md-4 control-label" for="' + id + '">' + label + '</label><div class="col-md-4"><button data-orden = ' + orden + ' ' + htmlSubmit + ' id="' + id + '" name="' + name + '" value="' + valor + '" text="' + texto_button + '" class="' + claseBoton + '">' + texto_button + '</button></div>' + htmlBotonera + '</div>';
                    fieldset.append(htmlText);
                    break;
            }

        }

        var mostrarVistaPreviaFormulario = function (datos, accion) {
            //Recibe datos de la forma { idFormulario: idForm } y solicita del servidor una lista (array)
            //con todos los componentes del formulario dado. Después los renderiza uno a uno.

            $.ajax({
                type: "POST",
                url: urlAcceso,
                data: 'idFormulario=' + datos.idFormulario,
                //dataType: "json",
                success: function (data) {
                    //data será un array con los elementos del formulario                        
                    $.each(data, function (index, value) {
                        agregarComponente(value);
                    });
                },
                error: function (e) {
                    console.log(e);
                }
            });
        };

            


        //Eventos

        //Cuando se provoque el envío del formulario se ejecutará la función pasada como parámetro.
        //Si no se ha pasado ninguna, por defecto mostrará una alerta con los datos recogidos del formulario
        formulario.off();
        formulario.on("submit", settings.onSubmit);        
        //formulario.on("submit", function (event) { settings.onSubmit(event); return false;});


        //Sentencias

        //Creo el fieldset dentro del form
        formulario.append('<fieldset id="fieldsetFormularioVistaPrevia"><legend class="text-info">Formulario</legend></fieldset>');
        var fieldset = formulario.find("fieldset").first();
        formulario.data("idFormulario", settings.idFormulario);
        console.log("Id del form: " + fieldset.parent().attr("id"));
        //Le agrego todos los componentes del formulario pasado como parámetro
        if (settings.idFormulario != null) {
            var datos = {
                idFormulario: settings.idFormulario
            };
            mostrarVistaPreviaFormulario(datos, 'renderizar');
        }

    } //fn.formulario

})(jQuery);
