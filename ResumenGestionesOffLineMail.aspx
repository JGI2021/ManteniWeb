<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ResumenGestionesOffLineMail.aspx.cs" Inherits="ManteniWeb.ResumenGestionesOffLineMail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%;">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>

    <link rel='stylesheet' href='css/style2.css' type='text/css' />
    <link rel='stylesheet' href='css/GestionesOffLineMail.css' type='text/css' />
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

        tr > td:hover > .BotonFila {
            visibility: visible !important;
        }
    </style>
    <script src="js/ResumenGestionesOffLineMail.js" type="text/javascript"></script>
</head>
<body class="show-nav">
    <form id="formASP" runat="server" class="clasedelform">
        <div onmouseover="">
        </div>
    </form>
</body>
</html>

