<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TiendasLME.aspx.cs" Inherits="ManteniWeb.TiendasLME" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title></title>
    <link rel='stylesheet' href='css/style2.css' type='text/css'/>
    
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

        .tooltip-wrap {
           position: relative;
        }

        .tooltip-wrap .tooltip-content {
           display: none;
           text-align:center;
           position: absolute;
           bottom: -35%;
           left: 70px;
           right: -250%;
           background-color: #fff;
           padding: .5em;
           border: 1px solid black;
        }


       .tooltip-wrap:hover .tooltip-content {
         display: block;
       }


       #tooltip1 { position: relative; }
       #tooltip1 a span { display: none; color: #FFFFFF; }
       #tooltip1 a:hover span { display: block; position: absolute; width: 200px; height: 50px; left: 100px; top: -10px; color: #FFFFFF; padding: 0 5px; }

    </style>


</head>
<body class="show-nav" style="height:100%;" >
    <form id="formASP" runat="server" style="height:100%;">
    <div>
    
    </div>
    </form>
</body>
</html>
