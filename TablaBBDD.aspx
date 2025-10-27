<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TablaBBDD.aspx.cs" Inherits="ManteniWeb.TablaBBDD" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
<meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title></title>
    <script type="text/javascript" src="./js/jquery-3.7.1.min.js"></script>

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

        .mytable {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
            border: 1px solid #ccc;
            font-family: "Open Sans", Arial, Helvetica, sans-serif;
            color: #444444;
            background: #fff;
            -moz-border-radius: 0;
            -webkit-border-radius: 0;
            border-radius: 0;
        }
        
        .mytable > thead > tr > th {
            background-color: #ccc;  
            border: 1px solid #FFFFFF;
            color: #444444;
            font-weight: bolder;
            margin-top: 2px;
            margin-bottom:1px;
            font-weight: normal;
            border-left: 1px solid #ccc;
            border-top: 1px solid #ccc;      
            padding: 0px 0px 0px 6px !important;    
        }

        .mytable > thead > tr > th {
            border-bottom: 1px solid #dddddd;
            padding-left: 6px;
            text-align: left;
        }

        .mytable > tbody > tr > td {
            border-top: 1px solid #ccc;
            text-align: left;            
            padding-bottom: 0px !important;
            padding-top: 0px !important;
            padding-left: 6px;
       }

        .mycheck {
            margin-top:0px;
            margin-bottom:0px;
            position:relative;
        }

        .mybutton {
            text-align: right;
            margin-right: 95px;
            margin-top: 15px;
            margin-bottom: 20px;
        }
    </style>

    <script>
        function HacerSubmitAceptar() {
          $('#botonAceptarF').val('true');
          $('#salir').val('false');  
          $('#BbotonAceptarF').attr('disabled', true); 
          $('#BbotonAceptarYSalir').attr('disabled', true); 
          $('#formASP').submit(); 
       } 

       function HacerSubmitAceptarYSalir() 
       {
          $('#botonAceptarYSalir').val('true'); 
          $('#salir').val('true'); 
          $('#BbotonAceptarF').attr('disabled', true); 
          $('#BbotonAceptarYSalir').attr('disabled', true); 
           $('#formASP').submit(); 
       } 
    </script>
    

</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">
    <div>

    </div>
    </form>
</body>
</html>
