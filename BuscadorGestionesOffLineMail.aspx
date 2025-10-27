<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BuscadorGestionesOffLineMail.aspx.cs" Inherits="ManteniWeb.BuscadorGestionesOffLineMail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;">
<head runat="server">
<meta charset="utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<title></title>

<link rel='stylesheet' href='css/style2.css' type='text/css'/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=mark_email_unread" />
    
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
    

    .panelEmail {
        width: 1000px;
        border: 1px solid lightgray;
        border-radius: 10px;
        height: 650px;
        position: absolute !important;
        z-index: 20;
        background-color: white;
        left: 51%;
        box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
        top: 385px;
        overflow: auto;
    }

    .resizable-panel {
      resize: both;      
      min-width: 400px;
      min-height: 150px;
    }

    .resize-handle {
      position: absolute;
      width: 10px;
      height: 10px;
      background: #007bff;
      bottom: 0;
      right: 0;
      cursor: nwse-resize;
      visibility:hidden;
    }


    

/*    .estado-form {
        margin-top: 22px;
        text-align: right;
        font-weight: 600;
        color: cornflowerblue;
        right: -70px;
    }*/


  /*  .header_fijo {
        width: 750px;
        table-layout: fixed;
        border-collapse: collapse;
    }
        .header_fijo thead {
            background-color: #333;
            color: #FDFDFD;

        }
    .header_fijo thead tr {
        display: block;
        position: relative;
    }
        .header_fijo tbody {
            display: block;
            overflow: auto;
            width: 100%;
        }*/

          .panel-heading {
            cursor: pointer; /* Hace que la cabecera parezca clickeable */
            background-color: #f5f5f5;
            padding: 5px;
        }

        .header-table {
            width: 100%;
            table-layout: fixed; /* Mantiene el tamaño uniforme */
        }

        .header-table td {
            /*text-align: left; /* Alinea el texto al centro */
            vertical-align: middle;
            padding: 5px;
        }


</style>
    <link href='Content/bootstrap-select.min.css' rel='stylesheet' />
    <link href="css/datepicker3.css" rel="stylesheet" />
  <link rel='stylesheet' href='css/style2.css' type='text/css'/>    
    <link rel='stylesheet' href='css/GestionesOffLineMail.css' type='text/css'/>       
</head>
<body class="show-nav" >
    <form id="formASP" runat="server" class="clasedelform">    
    <div>
    
    </div>
    </form>
    <script src="Scripts/bootstrap-select.min.js" type='text/javascript'></script>
    <script src="jquery/bootstrap-datepicker.js" type='text/javascript'></script>

    <script src="js/GestionesOffLineMail.js" type="text/javascript"></script>
</body>
</html>

