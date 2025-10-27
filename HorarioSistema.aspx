<%@ Page Language="C#" EnableEventValidation = "false" AutoEventWireup="true" CodeBehind="HorarioSistema.aspx.cs" Inherits="ManteniWeb.PgHorarioSistema" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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

        .button_hour {
            font-size: 85% !important;
            width: 3.5% !important;
            padding: 1.5px !important;
            white-space: pre-wrap;
            display: inline-block !important;
            margin-bottom: 2px !important;
        }
    
        .button_red {
            color: red !important;
            border: 1px red solid !important;
            background-color: white !important;
        }


        .button_green{
            background-color: forestgreen !important;
            color: white !important;
            border: 1px forestgreen solid !important;
            box-shadow:none !important;
        }

        .red_text {
            color: darkred;
        }

        .darkgreen_text {
            color: darkgreen;
        }
         
        .text_top_padding_8 {
            padding-top: 8px;
        }

        .div_NoVisible {
            display: none;
        }

        .div_margin_bottom_15 {
            margin-bottom: 15px;
        }

        .div_padding_l_r_15 {
            padding-left: 15px;
            padding-right: 15px;
        }

        .tituloDiaEspecial {
            color: darkblue;
            display: none;
            padding-top: 15px;
            font-weight: 600;
        }

        .PosCheckBoxTodos {
            margin-top: 45px !important;
            margin-left: 15px !important;  
        }

        #MySearch {
            background-image: url('images/search-icon-32.png');
            background-position: 2px 2px;
            background-repeat: no-repeat;
            width: 100%;
            font-size: 14px;
            padding: 8px 20px 8px 40px;
            border: 1px solid #c2c2c2;
            margin-right: 5px;
            margin-bottom: 0px;
        }
        

    </style>
</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">
    <div>
    
    </div>
    </form>

    <script src="js/HorarioSistema.js"></script>
    <script src="js/MWFuncionesComunes.js"></script>
</body>
</html>
