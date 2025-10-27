<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="InformesDeCarga.aspx.cs" Inherits="ManteniWeb.InformesDeCarga" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name='viewport' content='width = device-width, initial-scale = 1.0, minimum-scale = 1.0, maximum-scale = 1.0, user-scalable = no' />

    <title></title>
    <style>
        @font-face {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 300;
            src: local('Roboto Light'), local('Roboto-Light'), url(./fonts/Roboto-Light.woff2) format('woff2');
        }
        .margen {
            margin-bottom: 1rem;
        }
       
        .mytext-center {
            text-align: center;
            margin-right: 95px;
            margin-top: 15px;
            margin-bottom: 20px;
        }

        .mytext-right {
            text-align: right;
            margin-right: 95px;
            margin-top: 15px;
            margin-bottom: 20px;
        }

        .mytext-left {
            text-align: left;
            margin-right: 95px;
            margin-top: 15px;
            margin-bottom: 20px;
        }

        body {
            font-family:'Roboto',sans-serif !important;
        }
        html{
            height: 100%;
        }

        .rowSeparacion45 {
            margin-top: 45px !important;
            margin-left: 0px !important;
        }

    </style>
    <script src="js/jquery-3.7.1.min.js"></script>
    <!--script-- type='text/javascript' src='./scripts/jquery-3.3.1.min.js'></!--script-->

    <link href="bootstrap/css/bootstrap.css" rel="stylesheet" />
	<link href="js/footable/css/footable.core.css?v=2-0-1" rel="stylesheet" type="text/css"/>    
    <script src="bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/MWFuncionesComunes.js"></script>
    <script type="text/javascript" src="js/InformeDeCarga.js"></script>
    
</head>
<body>
    <form id="formASP" runat="server" class="clasedelform">
    </form>
</body>
    <script src="js/jquery-3.7.1.min.js"></script>
    <!--script type='text/javascript' src='./scripts/jquery-3.3.1.min.js'></script-->
    <script src="js/footable/js/footable.js" type="text/javascript"></script>
	<script src="js/footable/js/footable.paginate.js" type="text/javascript"></script>
    <script src="js/FuncionesJS.js"></script>
<%--    <script src="js/MWFuncionesComunes.js"></script>--%>
    <script>
        if ($.isFunction($.fn.footable)) {
            $('table').footable();
        }

        $('.footable').data('limit-navigation', 5);
        $('.footable').trigger('footable_initialized');
        
        $('#buscar').keyup(function () {
            // When value of the input is not blank
            if ($(this).val() != '') {
                // Show only matching TR, hide rest of them
                $("#TablaNegocio tbody>tr").hide();
                $("#TablaNegocio td:contains-ci('" + $(this).val() + "')").parent('tr').show();
            }
            else {
                // When there is no input or clean again, show everything back
                $("TablaNegocio tbody>tr").show();
            }
        });

        $.extend($.expr[":"],
        {
            "contains-ci": function (elem, i, match, array) {
                return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
            }
        });

    </script>
</html>
