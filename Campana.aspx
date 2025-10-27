<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Campana.aspx.cs" Inherits="ManteniWeb.Campana" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title></title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.css" />

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

        .table-responsive {
            height: 410px;
            overflow: scroll;
        }

        .botonMenu {            
            margin-top: 8px;
            margin-right: 10px;
            float: right;
            padding: 5px 10px;
            border-radius: 15%;
            color: white;
        }

        .botonMenu-Azul {
            background-color: #fff;
            border: 1px solid #0275d8;
            color: #0275d8;
        }

        .botonMenu-RojoOscuro {
            background-color: #fff;
            border: 1px solid #d9534f;
            color: #d9534f;
        }

        .botonMenu:hover {
            opacity: 0.6;
        }

        .text-darkgreen {
            color: darkgreen;
        }

        .text-darkred {
            color: darkred;
        }

        thead tr:nth-child(1) th {
            background: white;
            position: sticky;
            top: 0;
            z-index: 10;
        }


        .card {
            border: 1px solid #c2c2c2;
            border-radius: 6px;
        }


        .card .card-body {
            display: table;
            width: 100%;
            padding: 12px;
        }

        .card .card-header {
            border-radius: 6px 6px 0 0;
            padding: 8px;
        }

        .card .card-footer {
            border-radius: 0 0 6px 6px;
            padding: 8px;
            border-top: 1px solid #c2c2c2;
        }

        .card .card-left {
            position: relative;
            float: left;
            padding: 0 0 8px 0;
        }

        .card .card-right {
            position: relative;
            float: left;
            padding: 8px 0 0 0;
        }

        .card .card-body h1:first-child,
        .card .card-body h2:first-child,
        .card .card-body h3:first-child,
        .card .card-body h4:first-child,
        .card .card-body .h1,
        .card .card-body .h2,
        .card .card-body .h3,
        .card .card-body .h4 {
            margin-top: 0;
        }

        .card .card-body .heading {
            display: block;
        }

        .card .card-body .heading:last-child {
            margin-bottom: 0;
        }

        .card .card-body .lead {
            text-align: center;
        }

        #lateralderecho {
            display: none;
        }    
    </style>
        
    <script src="js/ListasCampana.js"></script>
</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">
        <div>
        </div>
    </form>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.2/jquery-confirm.min.js"></script>   
</body>     
    <script src="js/MWFuncionesComunes.js"></script>
    <script src="js/MensajeriaInstantanea.js"></script>
</html>
