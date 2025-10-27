<%@ Page Language="C#" EnableEventValidation = "false" AutoEventWireup="true" CodeBehind="GruposDelOperador.aspx.cs" Inherits="ManteniWeb.GruposDelOperador" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <%--Codigo JavaScript--%>
  <script type="text/javascript">


        function fPreguntaDesvincularGrupos(grupo) {
            __doPostBack('botonPreguntaDesvincular', grupo);
            return true;
        }

        function fcambiaEstilo(grupo) {
            __doPostBack('botonCambiaEstilo', grupo);
            return true;
        }

        function fPreguntaMoverGrupos(grupo) {
            __doPostBack('botonPreguntaMover', grupo);
            return true;
        }
        function fPreguntaCopiarGrupos(grupo) {
            __doPostBack('botonPreguntaCopiar', grupo);
            return true;
        }

        function __doPostBack(eventTarget, eventArgument) {
            var theform;
            if (window.navigator.appName.toLowerCase().indexOf("microsoft") > -1) {
                theform = document.Form1;
            }
            else {
                theform = document.forms["formASP"];
            }
            theform.__EVENTTARGET.value = eventTarget.split("$").join(":");
            theform.__EVENTARGUMENT.value = eventArgument;
            theform.submit();
        }




    </script>
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title></title>
    
    <style>
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }
        body {
            font-family:'Roboto',sans-serif !important;
        }
        html{
            height: 100%;
        }
    </style>
</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">        
    <div>
     
    </div>
    </form>
</body>
</html>
