<%@ Page Language="C#" AutoEventWireup="true" EnableEventValidation = "false" CodeBehind="Certificado.aspx.cs" Inherits="ManteniWeb.Certificado" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
     
<head id="Head1" runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name='viewport' content='width = device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no' />
    
    <title></title>
    <script type="text/javascript" src="./js/SubirFicherosJS.js" ></script>
    <style>
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }
        

        .red_text {
            color: darkred;
        }

        .divButtons {
            text-align: right;
            margin-right: 25px !important;
            margin-top: 40px;
            margin-bottom: 20px;
        }

        .top25{
          margin-top: 25px;
        }

        .btnInput {
            background-color: white !important;
        }

        .btnInput:hover {
            border-color: darkgrey;
            background-color: #f2f2f2 !important;
            font-weight: 600;
            cursor: pointer !important;
            color: darkblue !important;
        }

        body {
            font-family:'Roboto',sans-serif !important;
        }
        html{
            height: 100%;
        }

    </style>

    <%-- $(function () {
             $("input[type='file'].filepicker").filepicker();
         }); --%>

    
    <script type="text/javascript" src="./js/Certificado.js" ></script>
</head>
    
  
<body class="show-nav" style="height:100%;" >
    
    <form id="formASP" runat="server" style="height:100%;">
    <div>
    
    </div>
    </form>
    
</body>

</html>
