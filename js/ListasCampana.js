

function ObtenerRegistrosLista(table, condicion, codigo, alias) {

    var spin = "<i  class='fa fa-circle-o-notch fa-spin fa-fw'></i>  <span class='sr-only'>Loading...</span>";
    $('#tooltipwrap_' + codigo).html(spin);

    
    // En condición las comillas se cambian por #cs# y hay que volver a reemplazarla. Lo mismo para > que viene como #gt# y < que viene como #lt#
    condicion = condicion.replace(/#cs#/g, "'");
    condicion = condicion.replace(/#gt#/g, ">");
    condicion = condicion.replace(/#lt#/g, "<");
    var params = { "tablename": table, "condicion": condicion, "codigo": codigo, "alias": alias }

    $.ajax({ 
      type: 'POST', 
      url: getAbsolutePath() + '/ListasCampana.aspx/ObtenerRegistrosLista',
      data: JSON.stringify(params),
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
          var regs = $.parseJSON(data.d); 
          if (regs != null && regs.telefonos != '0') {
              $('#tooltipwrap_' + regs.codigo).text("Registros: " + regs.telefonos);
          } 
          else {
              $('#tooltipwrap_' + codigo).text('Sin registros');
              return;
          }
          var texto = '<b>Lista ' + regs.alias + '</b>';
          texto += '<pre>';
          texto += ' Total teléfonos:   ' + regs.telefonos + '\n'; 
          texto += ' Total clientes:    ' + regs.clientes + '\n'; 
          texto += ' •  Finalizados:    ' + regs.finalizados + '\n'; 
          texto += ' •  No tocados:     ' + regs.notocados + '\n'; 
          texto += ' •  Reprogramados:  ' + regs.reprogramados + '\n';
          texto += ' •  Para llamar:  \n';
          texto += '    -  Ahora:    ' + regs.llamarAhora + '\n';
          texto += '    -  Después:  ' + regs.llamarDespues;
                   

          if (regs.cancelados != 0)
              texto += '\n' + ' •   Cancelados:     ' + regs.cancelados;
          if (regs.anulados != 0)
              texto += '\n' + ' •   Anulados:       ' + regs.anulados;
          if (regs.otros != 0)
              texto += '\n' + ' •   Otros:          ' + regs.otros;
          texto += ' </pre> ';
          $('#lista_' + regs.codigo).val(texto);
//        $('#lateralderecho').html(texto);

      }, error: function (e) { console.log(e); }
   });
}



function ObtenerRegistrosCampana(table, codigo, alias) {

    var spin = "<i  class='fa fa-circle-o-notch fa-spin fa-fw'></i>  <span class='sr-only'>Loading...</span>";
    $('#tooltipwrap_' + codigo).html(spin);
    var params = { "tablename": table, "codigo": codigo, "alias": alias }

    $.ajax({
        type: 'POST',
        url: getAbsolutePath() + '/Campanas.aspx/ObtenerRegistrosCampana',
        data: JSON.stringify(params),
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $('#imgspin_' + codigo).css('display', 'none');
            var regs = $.parseJSON(data.d);
            if (regs != null && regs.telefonos != '0') {
                $('#tooltipwrap_' + regs.codigo).text("Registros: " + regs.telefonos);
            }
            else {
                $('#tooltipwrap_' + codigo).text('Sin registros');
                return;
            }
            var texto = '<b>Campaña ' + regs.alias + '</b>';
            texto += '<pre>';
            texto += ' Total teléfonos:   ' + regs.telefonos + '\n';
            texto += ' Total clientes:    ' + regs.clientes + '\n';
            texto += ' •  Finalizados:    ' + regs.finalizados + '\n';
            texto += ' •  No tocados:     ' + regs.notocados + '\n';
            texto += ' •  Reprogramados:  ' + regs.reprogramados + '\n';
            texto += ' •  Para llamar:  \n';
            texto += '    -  Ahora:    ' + regs.llamarAhora + '\n';
            texto += '    -  Después:  ' + regs.llamarDespues;


            if (regs.cancelados != 0)
                texto += '\n' + ' •   Cancelados:     ' + regs.cancelados;
            if (regs.anulados != 0)
                texto += '\n' + ' •   Anulados:       ' + regs.anulados;
            if (regs.otros != 0)
                texto += '\n' + ' •   Otros:          ' + regs.otros;
            texto += ' </pre> ';
            $('#lista_' + regs.codigo).val(texto);
            //        $('#lateralderecho').html(texto);

        }, error: function (e) { console.log(e); }
    });
}




function OptionsChecked() {
    var activas = document.getElementById('MostrarActivos');
    var inactivas = document.getElementById('MostrarNoActivos');
    var cerradas = document.getElementById('MostrarCerrados');
    var mostrar = 0;

    if (activas.checked) {
        mostrar = 1;
        $('.REGISTRO_ACTIVO').css('display', 'table-row');
    }
    else {
        $('.REGISTRO_ACTIVO').css('display', 'none');
    }
    if (inactivas.checked) {
        mostrar += 2;
        $('.REGISTRO_INACTIVO').css('display', 'table-row');
    }
    else {
        $('.REGISTRO_INACTIVO').css('display', 'none');
    }
    if (cerradas) {
        if (cerradas.checked) {
            mostrar += 4;
            $('.REGISTRO_CERRADO').css('display', 'table-row');
        }
        else {
            $('.REGISTRO_CERRADO').css('display', 'none');
        }
    }
    
    $('#Mostrar').val(mostrar);
    
}




function GetUrlActual() {
    var mostrar = $('#Mostrar').val();
    var url = $('#UrlActual').val();

    return url + "?mostrar=" + mostrar;
}

function GetParamMostrar() {
    var mostrar = $('#Mostrar').val();
    return "&mostrar=" + mostrar;
}