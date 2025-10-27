<%@ Page Language="C#" EnableEventValidation="false" AutoEventWireup="true" CodeBehind="PrediccionSistema.aspx.cs" Inherits="ManteniWeb.PrediccionSistema" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    <script src="js/jquery-3.7.1.min.js"></script>
    <script src="js/FuncionesJS.js"></script>
    <script src="js/PrediccionSistema.js"></script>

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

        .center {
            height: 500px;
            position: relative;
        }

            .center button {
                margin: 0;
                position: absolute;
                top: 50%;
                left: 50%;
                -ms-transform: translate(-50%, -50%) !important;
                transform: translate(-50%, -50%);
            }

        .CajaElementos500px {
            height: 500px;
            overflow-y: scroll;
            margin-top: 15px;
            border: 1px solid #c2c2c2;
        }

        .CajaElementos500pxSinScroll {
            height: 500px;
            margin-top: 15px;
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
