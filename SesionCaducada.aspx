<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SesionCaducada.aspx.cs" Inherits="ManteniWeb.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>

    <style type="text/css">
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }
        #Button1 {
            width: 100px;
        }
    </style>

    <link href='css/StyleSheet1.css' rel='stylesheet' type='text/css' />
    <link rel="stylesheet" href="bootstrap/css/bootstrap.min.css" />
    <link href='Content/font-awesome.min.css' rel='stylesheet' type='text/css' />
   <%-- <link rel='stylesheet' href='css/jquery.dataTables.min.css' />--%>
    <link href="Content/DataTables/datatables.min.css" rel="stylesheet" />
    <link rel='stylesheet' href='css/datepicker3.css' />
    <script src="js/jquery-3.7.1.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>

</head>
<body>

    <nav class="navbar navbar-default" style="border-color: rgb(69, 90, 100); background-color: rgb(69, 90, 100); margin-bottom: 20px">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class='navbar-brand' href='#' data-toggle='tooltip' data-placement='bottom' title='Menú' id='clickMenu2'>
                    <img src='./img/logo_tiphone.png' alt='Logo Tiphone' style="height: 25px" />
                </a>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-right">
                    <li data-toggle='tooltip' data-placement='bottom' title='Marcar como favorito'>
                        <a>
                            <span class='glyphicon glyphicon-star-empty' id='favOff' style='color: #fff; cursor: pointer;'></span>
                            <span class='glyphicon glyphicon-star' id='favOn' style='display: none; color: #FFEB3B;'></span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="jumbotron" style="padding: 4px; margin-bottom: 0px">
            <div class='container'>
                <h2 class='tituloGrande visible-lg visible-md' style="font-family: inherit;">
                    <i class='fa fa-comments-o' aria-hidden="true"></i>
                    <span style='margin-left: 1em;'>Sesión caducada</span>
                </h2>
            </div>
        </div>


        <form id="form1" runat="server" action="Login.aspx" target="_parent">

            <label class="control-label danger">La sesión ha caducado. Pulse Salir para volver a entrar al sistema</label>
            <input class="btn btn-default" type="submit" id="Button1" form="form1" value="Fin" formmethod="post" name="Salir" title="Quit" onclick="finalizar();" />


        </form>
    </div>
</body>
<script>
    function finalizar() {
        window.location = 'Principal.aspx';
    }

</script>
</html>
