<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="ManteniWeb.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title></title>
    <!--link href='http://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'/-->
    <link href="css/principal.css" rel="stylesheet" type="text/css"/>
    <style type="text/css">
            @font-face {
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 300;
                src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
            }

        html {
            height:75%;
        }
        body {

            height:100%;
        }

        @media (min-width: 700px) {
            .changesize-tablet-mobile {
                width: 65% !important;
            }
        }

        @media (min-width: 900px) {
            .changesize-tablet-mobile {
                width: 50% !important;
            }
        }

        .changesize-tablet-mobile {
            width: 100%;
        }
    </style>
</head>
<body>        
    <form id="formASP" runat="server" method="post" style="height:100%;" >
    <div>
        
    
    </div>
    </form>
</body>
</html>
