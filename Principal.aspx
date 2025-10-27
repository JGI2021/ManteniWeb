<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Principal.aspx.cs" Inherits="ManteniWeb.Principal" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" id="htmlPrincipal" style="height:100%;min-height:1550px;">
<head runat="server">
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="stylesheet" type="text/css" href="css/jPushMenu.css" />
    
    
    <link rel='stylesheet' href='css/style2.css' type='text/css'/>
    <!--link href='http://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type="text/css"/-->
    <link href='css/styleProgressBar.css' rel='stylesheet'/>
    <script type="text/javascript">
        
        var sendStr = "name=ModalEspera";

        function submitCallback()
        {
            //  var request = new XMLHttpRequest();
            $.ajax({
                type: "POST",
                url: getAbsolutePath() + "/Esperar.aspx",
                contentType: "application/x-www-form-urlencoded",
                IsLookup: "true",
                success: function (dato)
                {
                    var respuesta = JSON.parse(dato);
                    console.log('Respuesta: ' + respuesta);
                    if (respuesta == "true")
                    {
                        MostrarModalEspera();
                        submitCallback();
                    }
                    else if (respuesta == "false")
                    {
                        OcultarModalEspera();
                        submitCallback();
                    }
                    else
                    {
                        submitCallback();
                    }
                }
            });
            
        }

        function readyCallback()
        {
            
        }


    </script>
    
    <style>
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }

        a:hover,a:focus {
            color: #fff !important;
            text-decoration:none !important;
        }
        body {
            font-family:'Roboto',sans-serif !important;
        }
        /*h4 {
            font-size:20px !important;
        }*/
        /*#Mensaje{position:absolute; width:100%; height:100%; z-index:5;}*/
        
    </style>
    
    <title></title>
    
</head>
<body>
    <form  action="./login.aspx" method="post" target="_top"  id="formASPPrincipal" runat="server" class="clasedelform">
        <asp:placeholder id="Pagina" runat="server"> 
        </asp:placeholder>
    </form>
</body>
</html>


