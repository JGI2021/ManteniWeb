<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="AlertasMonitor.aspx.cs" Inherits="ManteniWeb.AlertasMonitor" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>

    <style>
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }

        body {
            font-family: 'Roboto',sans-serif !important;
        }

        html {
            height: 100%;
        }

        .alinea-boton-mas {
            text-align: right !important;
            padding-right: 20px !important;
            color: cornflowerblue !important;
            padding-bottom: 2px !important;
        }

        .boton-mas {
            padding: 3px 3px 1px 3px;
            background-color: white;
        }

        td {
            padding-left: 15px !important;
        }

        .alinea-botones-accion {
            text-align: right !important;
            padding-right: 20px !important;
        }

        .alta {
            color: cornflowerblue !important;
            padding-left: 20px;
        }

        .actualiza {
            color: darkgreen !important;
            padding-left: 20px;
        }
        .elimina {
            color: red !important;
            padding-left: 20px;
        }

        .dialog-alertas {
           width: 50% !important;
           left: 25% !important;
           top: 10% !important;
        }

    </style>
</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">
        <div>
        </div>
    </form>
</body>
    <script src="js/MWFuncionesComunes.js"></script>
    <script src="js/AlertasMonitor.js"></script>

</html>

