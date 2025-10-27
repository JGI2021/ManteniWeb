<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GrupoAtencion.aspx.cs" Inherits="ManteniWeb.GrupoAtencion" %>
<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
        
        .list-group-item-cabecera {
            display: block;
            position: relative;
            padding: 5px 5px 5px 15px;
            font-size: 16px;
            font-weight: 600;
            background-color:#778899;
            font-weight: 600; 
            font-size: 16px;
            color:white;
        }

        .list-group-myitem {
            position: relative;
            display: block;
            padding: 10px 15px;
            margin-bottom: -1px;
            background-color: #fff;
            /* border: 1px solid #ddd; */
            margin-bottom: 5px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 2px 0px;
        }

        .cls-orden {
            cursor: move;
        }

        .cajaRegla.over {
            border: 3px dotted #666;
        }

        .txt-activo {
            top: 7px;
            left: 5px;
            position: relative;
            font-size: 16px;
            font-weight: 600;
            color: darkgreen;
        }

        .txt-inactivo {
            top: 7px;
            left: 5px;
            position: relative;
            font-size: 16px;
            font-weight: 600;
            color: red;
        }

        .top-7 {
            top: 7px;
        }

    </style>   
</head>
<body>
    <form id="formASP"  runat="server" class="clasedelform">
    <div>         
    
    </div>
    </form>
    <script src="js/sweetalert2/dist/sweetalert2.all.min.js" type="text/javascript"></script>
    <script src="js/MarcacionesSalientes.js"></script>
</body>
</html>

