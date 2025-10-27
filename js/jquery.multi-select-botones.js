/*
* MultiSelect v0.9.11
* Copyright (c) 2012 Louis Cuny
*
* This program is free software. It comes without any warranty, to
* the extent permitted by applicable law. You can redistribute it
* and/or modify it under the terms of the Do What The Fuck You Want
* To Public License, Version 2, as published by Sam Hocevar. See
* http://sam.zoy.org/wtfpl/COPYING for more details.
*/

!function ($) {

  "use strict";


 /* MULTISELECT CLASS DEFINITION
  * ====================== */
  
  var MultiSelect = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.$container = $('<div/>', { 'class': "ms-container" });
    this.$selectableContainer = $('<div/>', { 'class': 'ms-selectable' });
    this.$selectionContainer = $('<div/>', { 'class': 'ms-selection' });
    this.$selectableUl = $('<ul/>', { 'class': "ms-list", 'tabindex' : '-1' });
    this.$selectionUl = $('<ul/>', { 'class': "ms-list", 'tabindex' : '-1' });
    this.scrollTo = 0;
    this.elemsSelector = 'li:visible:not(.ms-optgroup-label,.ms-optgroup-container,.'+options.disabledClass+')';
  };

  MultiSelect.prototype = {
    constructor: MultiSelect,

    init: function(){
      var that = this,
          ms = this.$element;

      if (ms.next('.ms-container').length === 0){
        ms.css({ position: 'absolute', left: '-9999px' });
        ms.attr('id', ms.attr('id') ? ms.attr('id') : Math.ceil(Math.random()*1000)+'multiselect');
        this.$container.attr('id', 'ms-'+ms.attr('id'));
        this.$container.addClass(that.options.cssClass);
        ms.find('option').each(function(){
          that.generateLisFromOption(this);
        });

        this.$selectionUl.find('.ms-optgroup-label').hide();

        if (that.options.selectableHeader){
          that.$selectableContainer.append(that.options.selectableHeader);
        }
        that.$selectableContainer.append(that.$selectableUl);
        if (that.options.selectableFooter){
          that.$selectableContainer.append(that.options.selectableFooter);
        }

        if (that.options.selectionHeader){
          that.$selectionContainer.append(that.options.selectionHeader);
        }
        that.$selectionContainer.append(that.$selectionUl);
        if (that.options.selectionFooter){
          that.$selectionContainer.append(that.options.selectionFooter);
        }

        that.$container.append(that.$selectableContainer);
        that.$container.append(that.$selectionContainer);
        ms.after(that.$container);

        that.activeMouse(that.$selectableUl);
        that.activeKeyboard(that.$selectableUl);

        var action = that.options.dblClick ? 'dblclick' : 'click';

        that.$selectableUl.on(action, '.ms-elem-selectable', function (event) {
            if (!event) event = window.event;
            if (event.target.tagName == 'BUTTON' || event.target.className.includes('BotonConAccion')) {

            }
            else {
                that.select($(this).data('ms-value'));
            }
        });
        that.$selectionUl.on(action, '.ms-elem-selection', function (event) {
            if (!event) event = window.event;
            if (event.target.tagName == 'BUTTON' || event.target.className.includes('BotonConAccion'))
                 {

            }
            else {
                that.deselect($(this).data('ms-value'));
            }
        });
        //that.$selectionUl.on(action, 'span', function () {
        //    that.deselect($(this).data('ms-value'));
       // });
        that.activeMouse(that.$selectionUl);
        that.activeKeyboard(that.$selectionUl);

        ms.on('focus', function(){
          that.$selectableUl.focus();
        })
      }

      var selectedValues = ms.find('option:selected').map(function(){ return $(this).val(); }).get();
      that.select(selectedValues, 'init');

      if (typeof that.options.afterInit === 'function') {
        that.options.afterInit.call(this, this.$container);
      }
    },

    'generateLisFromOption' : function(option, index, $container){
        var that = this,
            ms = that.$element,
            attributes = "",
            $option = $(option),
              idCont = that.$container.attr("id");

        for (var cpt = 0; cpt < option.attributes.length; cpt++){
            var attr = option.attributes[cpt];

            if(attr.name !== 'value' && attr.name !== 'disabled'){
                attributes += attr.name+'="'+attr.value+'" ';
            }
        }

        var idComponenteListas = $option.val().split(':')[0];
        var idElemento = $option.val().split(':')[1];
        var contenidoMuestraElemento = $option.text();

        var botonIzquierdaListaSeleccionados = idComponenteListas.indexOf('BOTON_LD') !== -1;
        var botonIzquierdaPrioridad = idComponenteListas.indexOf('BOTON_PRIORIDAD') !== -1;
        var infoSeleccionados = idComponenteListas.indexOf('INFO_LD') !== -1;
        var infoNoSeleccionados = idComponenteListas.indexOf('INFO_LI') !== -1;
        var infoCanales = idComponenteListas.indexOf('INFO_CANALES') !== -1;

        var HTMLBotonesInfoSeleccionados = "";
        var HTMLBotonesInfoNoSeleccionados = "";
        var idBotonInfoFilaSeleccionados = "Button_InfoFilaDerecha_" + idComponenteListas + "_" + idElemento;
        var idBotonInfoFilaNoSeleccionados = "Button_InfoFilaIzquierda_" + idComponenteListas + "_" + idElemento;

        if (infoSeleccionados || infoCanales)
        {
            HTMLBotonesInfoSeleccionados = "<div style='float:right;'>";
        }
        if (infoNoSeleccionados)
        {
            HTMLBotonesInfoNoSeleccionados = "<div style='float:right;'>";
        }
      
        if (infoCanales)
        {
            var prefijoTelefonia = "PTlfn";
            var prefijoVM = "PVoic";
            var prefijoEmail = "PEmail";
            var prefijoChat = "PChat";
            var prefijoFax = "PFax";
            var prefijoWS = "PWS";
            var prefijoSMS = "PSMS";
            var prefijoChatMail = "PChatMail";
            var prefijoVideoChat = "PVideoChat";
            var prefijoVideoChatBidirecc = "PVideoChatBidirecc";
            var prefijoWhatsApp = "PWhatsApp";
            var prefijoTelegram = "PTelegram";
            var prefijoFacebook = "PFacebook";

            var idBotonTelefonia = "Button_" + prefijoTelefonia + "_" + idComponenteListas + "_" + idElemento;
            var idBotonVoiceMail = "Button_" + prefijoVM + "_" +  idComponenteListas + "_" + idElemento;
            var idBotonEmail = "Button_" + prefijoEmail + "_" + idComponenteListas + "_" + idElemento;
            var idBotonChat = "Button_" + prefijoChat + "_" + idComponenteListas + "_" + idElemento;
            var idBotonFax = "Button_" + prefijoFax + "_" + idComponenteListas + "_" + idElemento;
            var idBotonWS = "Button_" + prefijoWS + "_" + idComponenteListas + "_" + idElemento;
            var idBotonSMS = "Button_" + prefijoSMS + "_" + idComponenteListas + "_" + idElemento;
            var idBotonChatMail = "Button_" + prefijoChatMail + "_" + idComponenteListas + "_" + idElemento;
            var idBotonVideoChat = "Button_" + prefijoVideoChat + "_" + idComponenteListas + "_" + idElemento;
            var idBotonVideoChatBidirecc = "Button_" + prefijoVideoChatBidirecc + "_" + idComponenteListas + "_" + idElemento;
            var idBotonWhatsApp = "Button_" + prefijoWhatsApp + "_" + idComponenteListas + "_" + idElemento;
            var idBotonTelegram = "Button_" + prefijoTelegram + "_" + idComponenteListas + "_" + idElemento;
            var idBotonFacebook = "Button_" + prefijoFacebook + "_" + idComponenteListas + "_" + idElemento;

            var prefijoSi = "si";
            var prefijoNo = "no";
            var prefijoDistinct = "distinct";

            var idImagenVoiceMail = prefijoVM + "_" + idComponenteListas + "_" + idElemento;
            var idImagenTelefonia = prefijoTelefonia + "_" + idComponenteListas + "_" + idElemento;
            var idImagenEmail = prefijoEmail + "_" + idComponenteListas + "_" + idElemento;
            var idImagenChat = prefijoChat + "_" + idComponenteListas + "_" + idElemento;
            var idImagenFax = prefijoFax + "_" + idComponenteListas + "_" + idElemento;
            var idImagenWS = prefijoWS +  + "_" + idComponenteListas + "_" + idElemento;
            var idImagenSMS = prefijoSMS + "_" + idComponenteListas + "_" + idElemento;
            var idImagenChatMail = prefijoChatMail + "_" + idComponenteListas + "_" + idElemento;
            var idImagenVideoChat = prefijoVideoChat + "_" + idComponenteListas + "_" + idElemento;
            var idImagenVideoChatBidirecc = prefijoVideoChatBidirecc + "_" + idComponenteListas + "_" + idElemento;
            var idImagenWhatsApp = prefijoWhatsApp + "_" + idComponenteListas + "_" + idElemento;
            var idImagenTelegram = prefijoTelegram + "_" + idComponenteListas + "_" + idElemento;
            var idImagenFacebook = prefijoFacebook + "_" + idComponenteListas + "_" + idElemento;

            var VarTelefoniaSi = prefijoTelefonia + prefijoSi;
            var VarTelefoniaNo = prefijoTelefonia + prefijoNo;
            var VarTelefoniaAlgunos = prefijoTelefonia + prefijoDistinct;

            var VarVoiceMailSi = prefijoVM + prefijoSi;
            var VarVoiceMailNo = prefijoVM + prefijoNo;
            var VarVoiceMailAlgunos = prefijoVM + prefijoDistinct;

            var VarEmailSi = prefijoEmail + prefijoSi;
            var VarEmailNo = prefijoEmail + prefijoNo;
            var VarEmailAlgunos = prefijoEmail + prefijoDistinct;

            var VarChatSi = prefijoChat + prefijoSi;
            var VarChatNo = prefijoChat + prefijoNo;
            var VarChatAlgunos = prefijoChat + prefijoDistinct;

            var VarVideoChatSi = prefijoVideoChat + prefijoSi;
            var VarVideoChatNo = prefijoVideoChat + prefijoNo;
            var VarVideoChatAlgunos = prefijoVideoChat + prefijoDistinct;

            var VarVideoChatBidireccSi = prefijoVideoChatBidirecc + prefijoSi;
            var VarVideoChatBidireccNo = prefijoVideoChatBidirecc + prefijoNo;
            var VarVideoChatBidireccAlgunos = prefijoVideoChatBidirecc + prefijoDistinct;

            var VarWhatsAppSi = prefijoWhatsApp + prefijoSi;
            var VarWhatsAppNo = prefijoWhatsApp + prefijoNo;
            var VarWhatsAppAlgunos = prefijoWhatsApp + prefijoDistinct;

            var VarTelegramSi = prefijoTelegram + prefijoSi;
            var VarTelegramNo = prefijoTelegram + prefijoNo;
            var VarTelegramAlgunos = prefijoTelegram + prefijoDistinct;

            var VarFacebookSi = prefijoFacebook + prefijoSi;
            var VarFacebookNo = prefijoFacebook + prefijoNo;
            var VarFacebookAlgunos = prefijoFacebook + prefijoDistinct;

            var VarFaxSi = prefijoFax + prefijoSi;
            var VarFaxNo = prefijoFax + prefijoNo;
            var VarFaxAlgunos = prefijoFax + prefijoDistinct;

            var VarWSSi = prefijoWS + prefijoSi;
            var VarWSNo = prefijoWS + prefijoNo;
            var VarWSAlgunos = prefijoWS + prefijoDistinct;

            var VarSMSSi = prefijoSMS + prefijoSi;
            var VarSMSNo = prefijoSMS + prefijoNo;
            var VarSMSAlgunos = prefijoSMS + prefijoDistinct;

            var VarChatMailSi = prefijoChatMail + prefijoSi;
            var VarChatMailNo = prefijoChatMail + prefijoNo;
            var VarChatMailAlgunos = prefijoChatMail + prefijoDistinct;

            var StrClassImagenBotonTelefonia = "";
            var StrClassImagenBotonVoiceMail = "";
            var StrClassImagenBotonEmail = "";
            var StrClassImagenBotonChat = "";
            var StrClassImagenBotonFax = "";
            var StrClassImagenBotonWS = "";
            var StrClassImagenBotonSMS = "";
            var StrClassImagenBotonChatMail = "";
            var StrClassImagenBotonVideoChat = "";
            var StrClassImagenBotonVideoChatBidirecc = "";
            var StrClassImagenBotonWhatsApp = "";
            var StrClassImagenBotonTelegram = "";
            var StrClassImagenBotonFacebook = "";

            var ToolTipImagenBotonVoiceMail = "";
            var TooltipImagenBotonTelefonia = "";
            var ToolTipImagenBotonEmail = "";
            var TooltipImagenBotonChat = "";
            var ToolTipImagenBotonFax = "";
            var TooltipImagenBotonWS = "";
            var ToolTipImagenBotonSMS = "";
            var TooltipImagenBotonChatMail = "";
            var TooltipImagenBotonVideoChat = "";
            var TooltipImagenBotonVideoChatBidirecc = "";
            var TooltipImagenBotonWhatsApp = "";
            var TooltipImagenBotonTelegram = "";
            var TooltipImagenBotonFacebook = "";
            
            if (contenidoMuestraElemento.indexOf("[" + VarVoiceMailSi + "]") >= 0) {
                StrClassImagenBotonVoiceMail = "BotonTodosPertenecen";
                ToolTipImagenBotonVoiceMail = "VoiceMail: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarVoiceMailNo + "]") >= 0)
            {
                StrClassImagenBotonVoiceMail = "BotonNingunoPertenece";
                ToolTipImagenBotonVoiceMail = "VoiceMail: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarTelefoniaSi + "]") >= 0) {
                StrClassImagenBotonTelefonia = "BotonTodosPertenecen";
                TooltipImagenBotonTelefonia = "Teléfono: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarTelefoniaNo + "]") >= 0)
            {
                StrClassImagenBotonTelefonia = "BotonNingunoPertenece";
                TooltipImagenBotonTelefonia = "Teléfono: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarEmailSi + "]") >= 0) {
                StrClassImagenBotonEmail = "BotonTodosPertenecen";
                ToolTipImagenBotonEmail = "Email: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarEmailNo + "]") >= 0)
            {
                StrClassImagenBotonEmail = "BotonNingunoPertenece";
                ToolTipImagenBotonEmail = "Email: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarChatSi + "]") >= 0) {
                StrClassImagenBotonChat = "BotonTodosPertenecen";
                TooltipImagenBotonChat = "Chat: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarChatNo + "]") >= 0)
            {
                StrClassImagenBotonChat = "BotonNingunoPertenece";
                TooltipImagenBotonChat = "Chat: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarVideoChatSi + "]") >= 0) {
                StrClassImagenBotonVideoChat = "BotonTodosPertenecen";
                TooltipImagenBotonVideoChat = "VideoChat: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarVideoChatNo + "]") >= 0)
            {
                StrClassImagenBotonVideoChat = "BotonNingunoPertenece";
                TooltipImagenBotonVideoChat = "VideoChat: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarVideoChatBidireccSi + "]") >= 0) {
                StrClassImagenBotonVideoChatBidirecc = "BotonTodosPertenecen";
                TooltipImagenBotonVideoChatBidirecc = "VideoChat Bidireccional: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarVideoChatBidireccNo + "]") >= 0) 
            {
                StrClassImagenBotonVideoChatBidirecc = "BotonNingunoPertenece";
                TooltipImagenBotonVideoChatBidirecc = "VideoChat Bidireccional: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarWhatsAppSi + "]") >= 0) {
                StrClassImagenBotonWhatsApp = "BotonTodosPertenecen";
                TooltipImagenBotonWhatsApp = "WhatsApp: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarWhatsAppNo + "]") >= 0) 
            {
                StrClassImagenBotonWhatsApp = "BotonNingunoPertenece";
                TooltipImagenBotonWhatsApp = "WhatsApp: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarTelegramSi + "]") >= 0) {
                StrClassImagenBotonTelegram = "BotonTodosPertenecen";
                TooltipImagenBotonTelegram = "Telegram: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarTelegramNo + "]") >= 0) 
            {
                StrClassImagenBotonTelegram = "BotonNingunoPertenece";
                TooltipImagenBotonTelegram = "Telegram: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarFacebookSi + "]") >= 0) {
                StrClassImagenBotonFacebook = "BotonTodosPertenecen";
                TooltipImagenBotonFacebook = "Facebook: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarFacebookNo + "]") >= 0) 
            {
                StrClassImagenBotonFacebook = "BotonNingunoPertenece";
                TooltipImagenBotonFacebook = "Facebook: no";
            }


            if (contenidoMuestraElemento.indexOf("[" + VarFaxSi + "]") >= 0) {
                StrClassImagenBotonFax = "BotonTodosPertenecen";
                ToolTipImagenBotonFax = "Fax: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarFaxNo + "]") >= 0) 
            {
                StrClassImagenBotonFax = "BotonNingunoPertenece";
                ToolTipImagenBotonFax = "Fax: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarWSSi + "]") >= 0) {
                StrClassImagenBotonWS = "BotonTodosPertenecen";
                TooltipImagenBotonWS = "WS: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarWSNo + "]") >= 0) 
            {
                StrClassImagenBotonWS = "BotonNingunoPertenece";
                TooltipImagenBotonWS = "WS: no";
            }
    

            if (contenidoMuestraElemento.indexOf("[" + VarSMSSi + "]") >= 0) {
                StrClassImagenBotonSMS= "BotonTodosPertenecen";
                TooltipImagenBotonSMS = "Sms: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarSMSNo + "]") >= 0) 
    {
                StrClassImagenBotonSMS = "BotonNingunoPertenece";
                TooltipImagenBotonSMS = "Sms: no";
            }

            if (contenidoMuestraElemento.indexOf("[" + VarChatMailSi + "]") >= 0) {
                StrClassImagenBotonChatMail = "BotonTodosPertenecen";
                TooltipImagenBotonChatMail = "ChatMail: sí";
            }
            else if (contenidoMuestraElemento.indexOf("[" + VarChatMailNo + "]") >= 0) 
            {
                StrClassImagenBotonChatMail = "BotonNingunoPertenece";
                TooltipImagenBotonChatMail = "ChatMail: no";
            }

            if (StrClassImagenBotonTelefonia != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonTelefonia + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonTelefonia + "' " +
                                            "onClick='PulsaCanal_" + prefijoTelefonia + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-phone BotonConAccion " + StrClassImagenBotonTelefonia + "' id='" + idImagenTelefonia + "' aria-hidden='true'></i>"+
                                            "</button>";
            }
            if (StrClassImagenBotonVoiceMail != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonVoiceMail + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + ToolTipImagenBotonVoiceMail + "' " +
                                            "onClick='PulsaCanal_"+prefijoVM + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-file-audio-o BotonConAccion " + StrClassImagenBotonVoiceMail + "' id='" + idImagenVoiceMail + "' aria-hidden='true'></i>"+
                                            "</button>";
            }

            if (StrClassImagenBotonEmail != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonEmail + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + ToolTipImagenBotonEmail + "' " +
                                            "onClick='PulsaCanal_" +prefijoEmail+ "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-envelope-o BotonConAccion " + StrClassImagenBotonEmail + "' id='" + idImagenEmail + "' aria-hidden='true'></i>" +
                                            "</button>";
            }

            if (StrClassImagenBotonChat != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonChat + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonChat + "' " +
                                            "onClick='PulsaCanal_" + prefijoChat+"_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-comments-o BotonConAccion " + StrClassImagenBotonChat + "' id='" + idImagenChat + "' aria-hidden='true'></i>" +
                                            "</button>";
            }

            if (StrClassImagenBotonVideoChat != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonVideoChat + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonVideoChat + "' " +
                                            "onClick='PulsaCanal_" + prefijoVideoChat + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-video-camera BotonConAccion " + StrClassImagenBotonVideoChat + "' id='" + idImagenVideoChat + "' aria-hidden='true'></i>" +
                                            "</button>";
            }

            if (StrClassImagenBotonVideoChatBidirecc != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonVideoChatBidirecc + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonVideoChatBidirecc + "' " +
                                            "onClick='PulsaCanal_" + prefijoVideoChatBidirecc + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-exchange BotonConAccion " + StrClassImagenBotonVideoChatBidirecc + "' id='" + idImagenVideoChatBidirecc + "' aria-hidden='true'></i>" +
                                            "</button>";
            }

            if (StrClassImagenBotonWhatsApp != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonWhatsApp + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonWhatsApp + "' " +
                    "onClick='PulsaCanal_" + prefijoWhatsApp + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                    "<i class='fa fa-whatsapp BotonConAccion " + StrClassImagenBotonWhatsApp + "' id='" + idImagenWhatsApp + "' aria-hidden='true'></i>" +
                    "</button>";
            }

            if (StrClassImagenBotonTelegram != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonTelegram + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonTelegram + "' " +
                    "onClick='PulsaCanal_" + prefijoTelegram + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                    "<i class='fa fa-telegram BotonConAccion " + StrClassImagenBotonTelegram + "' id='" + idImagenTelegram + "' aria-hidden='true'></i>" +
                    "</button>";
            }

            if (StrClassImagenBotonFacebook != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonFacebook + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonFacebook + "' " +
                    "onClick='PulsaCanal_" + prefijoFacebook + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                    "<i class='fa fa-facebook-official BotonConAccion " + StrClassImagenBotonFacebook + "' id='" + idImagenFacebook + "' aria-hidden='true'></i>" +
                    "</button>";
            }

            if (StrClassImagenBotonFax != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonFax + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonFax + "' " +
                                            "onClick='PulsaCanal_"+ prefijoFax+ "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-fax BotonConAccion " + StrClassImagenBotonFax + "' id='" + idImagenFax + "' aria-hidden='true'></i>" +
                                            "</button>";
            }

            if (StrClassImagenBotonWS != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonWS + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonWS + "' " +
                                            "onClick='PulsaCanal_" + prefijoWS + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-weixin BotonConAccion " + StrClassImagenBotonWS + "' id='" + idImagenWS + "' aria-hidden='true'></i>" +
                                            "</button>";
            }
            if (StrClassImagenBotonSMS != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonSMS + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonSMS + "' " +
                                            "onClick='PulsaCanal_" + prefijoSMS+ "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-comment BotonConAccion " + StrClassImagenBotonSMS + "' id='" + idImagenSMS + "' aria-hidden='true'></i>" +
                                            "</button>";
            }
            if (StrClassImagenBotonChatMail != "") {
                HTMLBotonesInfoSeleccionados += "<button type='button' id='" + idBotonChatMail + "' class='btn btn-default boton-canal' data-toggle='tooltip' title='" + TooltipImagenBotonChatMail + "' " +
                                            "onClick='PulsaCanal_" + prefijoChatMail + "_" + idComponenteListas + "(\"" + idElemento + "\")" + "'>" +
                                            "<i class='fa fa-weixin BotonConAccion " + StrClassImagenBotonChatMail + "' id='" + idImagenChatMail + "' aria-hidden='true'></i>" +
                                            "</button>";
            }            
        }

        if (infoSeleccionados) {
            HTMLBotonesInfoSeleccionados += "<button type='button'  id='" + idBotonInfoFilaSeleccionados + "' class='btn btn-default boton-lupa' data-toggle='tooltip' title ='Ver información' >" +
                                        "<i class='fa fa-search BotonConAccion' aria-hidden='true'></i>"+
                                        "</button>";
        }
        if (infoNoSeleccionados) {
            HTMLBotonesInfoNoSeleccionados += "<button type='button' id='" + idBotonInfoFilaNoSeleccionados + "' class='btn btn-default boton-lupa' data-toggle='tooltip'  title ='Ver información'> " +
                                        "<i class='fa fa-search BotonConAccion' aria-hidden='true'></i>"+
                                        "</button>";
        }
            
        if (infoSeleccionados || infoCanales) {
            HTMLBotonesInfoSeleccionados += "</div>";
        }
        if (infoNoSeleccionados) {
            HTMLBotonesInfoNoSeleccionados += "</div>";
        }
        var EsLabel = false;
        var idListaNoSeleccionados = 'ns_' + idComponenteListas + '_' + idElemento;
        var idListaSeleccionados = idComponenteListas + '_' + idElemento;
        var inputOcultoInfoListaSeleccionados = '';

        if (infoCanales) {
            var idInputCanalesInfoHidden = 'hdn_' + idComponenteListas + '_' + idElemento;
            // Totmamos los valores de los canales a la variable e indicamos por defecto que no ha sido modificada
            var valInfoCanalesFila = contenidoMuestraElemento.substring(contenidoMuestraElemento.indexOf("[" + prefijoTelefonia));
            // Nombre del operador

            var styleLabelNoSeleccionados = "";
            var styleLabelSeleccionados = "";
            if (contenidoMuestraElemento.indexOf("["+prefijoTelefonia) >= 0) {
                contenidoMuestraElemento = contenidoMuestraElemento.substring(0, contenidoMuestraElemento.indexOf("[" + prefijoTelefonia));
                styleLabelSeleccionados = 'margin-left:1rem;';
            }
            else {
                EsLabel = true;
                styleLabelNoSeleccionados += "font-weight:600;color:black;";
                styleLabelSeleccionados += "font-weight:600;color:black;";

            }

            //oculto los valores de los canales
            
            if (!EsLabel)
                inputOcultoInfoListaSeleccionados = "<input type='hidden' id='" + idInputCanalesInfoHidden + "' value='" + valInfoCanalesFila + "'/>";
        }
      // Lista de no seleccionados
        var selectableLi = $('<li style=\"padding-top:1rem;\" ' + attributes + '><span id=\"' + idListaNoSeleccionados + '\" style=' + styleLabelNoSeleccionados + ' >' + that.escapeHTML(contenidoMuestraElemento) + '</span>' + HTMLBotonesInfoNoSeleccionados + '</li>');
        // Lista de seleccionados
      var HTMLBotonInfoListaSeleccionados = '';
      if (botonIzquierdaListaSeleccionados) {
          if (!EsLabel) {
              if (botonIzquierdaPrioridad)
                  HTMLBotonInfoListaSeleccionados = "<button type='button' class='btn btn-warning boton-prioridad' onClick='PulsaBotonLista_" + idComponenteListas + "(\"" + idElemento + "\")'>" +
                                                    "<i class='fa fa-pencil BotonConAccion' aria-hidden='true'></i>" +
                                                   // "<span class='glyphicon glyphicon-pencil BotonConAccion'  aria-hidden='true'></span>"+
                                                    "</button>";
          }
      }
      
      var selectedLi = $('<li style=\"padding-top:1rem;\" ' + attributes + '>' + HTMLBotonInfoListaSeleccionados + '<span style=\"' + styleLabelSeleccionados + '\" id=' + idListaSeleccionados + '>' + that.escapeHTML(contenidoMuestraElemento) + '</span>' + HTMLBotonesInfoSeleccionados + inputOcultoInfoListaSeleccionados + '</li>');
          //selectedLi = selectableLi.clone(),
      var value = $option.val(),
          elementId = that.sanitize(value);

      selectableLi
        .data('ms-value', value)
        .addClass('ms-elem-selectable')
        .attr('id',elementId+'-selectable');

      selectedLi
        .data('ms-value', value)
        .addClass('ms-elem-selection')
        .attr('id',elementId + '-selection')
        .hide();

      if ($option.prop('disabled') || ms.prop('disabled')){
        selectedLi.addClass(that.options.disabledClass);
        selectableLi.addClass(that.options.disabledClass);
      }

      var $optgroup = $option.parent('optgroup');

      if ($optgroup.length > 0){
        var optgroupLabel = $optgroup.attr('label'),
            optgroupId = that.sanitize(optgroupLabel),
            $selectableOptgroup = that.$selectableUl.find('#optgroup-selectable-'+optgroupId),
            $selectionOptgroup = that.$selectionUl.find('#optgroup-selection-'+optgroupId);

        if ($selectableOptgroup.length === 0){
          var optgroupContainerTpl = '<li class="ms-optgroup-container"></li>',
              optgroupTpl = '<ul class="ms-optgroup"><li class="ms-optgroup-label"><span>'+optgroupLabel+'</span></li></ul>';

          $selectableOptgroup = $(optgroupContainerTpl);
          $selectionOptgroup = $(optgroupContainerTpl);
          $selectableOptgroup.attr('id', 'optgroup-selectable-'+optgroupId);
          $selectionOptgroup.attr('id', 'optgroup-selection-'+optgroupId);
          $selectableOptgroup.append($(optgroupTpl));
          $selectionOptgroup.append($(optgroupTpl));
          if (that.options.selectableOptgroup){
            $selectableOptgroup.find('.ms-optgroup-label').on('click', function(){
              var values = $optgroup.children(':not(:selected, :disabled)').map(function(){ return $(this).val() }).get();
              that.select(values);
            });
            $selectionOptgroup.find('.ms-optgroup-label').on('click', function(){
              var values = $optgroup.children(':selected:not(:disabled)').map(function(){ return $(this).val() }).get();
              that.deselect(values);
            });
          }
          that.$selectableUl.append($selectableOptgroup);
          that.$selectionUl.append($selectionOptgroup);
        }
        index = index == undefined ? $selectableOptgroup.find('ul').children().length : index + 1;
        selectableLi.insertAt(index, $selectableOptgroup.children());
        selectedLi.insertAt(index, $selectionOptgroup.children());
      } else {
        index = index == undefined ? that.$selectableUl.children().length : index;

        selectableLi.insertAt(index, that.$selectableUl);
        selectedLi.insertAt(index, that.$selectionUl);
      }
    },

    'addOption' : function(options){
      var that = this;

      if (options.value) options = [options];
      $.each(options, function(index, option){
        if (option.value && that.$element.find("option[value='"+option.value+"']").length === 0){
          var $option = $('<option value="'+option.value+'">'+option.text+'</option>'),
              index = parseInt((typeof option.index === 'undefined' ? that.$element.children().length : option.index)),
              $container = option.nested == undefined ? that.$element : $("optgroup[label='"+option.nested+"']")

          $option.insertAt(index, $container);
          that.generateLisFromOption($option.get(0), index, option.nested);
        }
      })
    },

    'escapeHTML' : function(text){
      return $("<div>").text(text).html();
    },

    'activeKeyboard' : function($list){
      var that = this;

      $list.on('focus', function(){
        $(this).addClass('ms-focus');
      })
      .on('blur', function(){
        $(this).removeClass('ms-focus');
      })
      .on('keydown', function(e){
          switch (e.which) {
          case 17:
          case 40:
          case 38:
            e.preventDefault();
            e.stopPropagation();
            that.moveHighlight($(this), (e.which === 38) ? -1 : 1);
            return;
          case 37:
          case 39:
            e.preventDefault();
            e.stopPropagation();
            that.switchList($list);
            return;
          case 9:
            if(that.$element.is('[tabindex]')){
              e.preventDefault();
              var tabindex = parseInt(that.$element.attr('tabindex'), 10);
              tabindex = (e.shiftKey) ? tabindex-1 : tabindex+1;
              $('[tabindex="'+(tabindex)+'"]').focus();
              return;
            }else{
              if(e.shiftKey){
                that.$element.trigger('focus');
              }
            }
        }
        if($.inArray(e.which, that.options.keySelect) > -1){
          e.preventDefault();
          e.stopPropagation();
          that.selectHighlighted($list);
          return;
        }
      });
    },

    'moveHighlight': function($list, direction){
      var $elems = $list.find(this.elemsSelector),
          $currElem = $elems.filter('.ms-hover'),
          $nextElem = null,
          elemHeight = $elems.first().outerHeight(),
          containerHeight = $list.height(),
          containerSelector = '#'+this.$container.prop('id');

      $elems.removeClass('ms-hover');
      if (direction === 1){ // DOWN

        $nextElem = $currElem.nextAll(this.elemsSelector).first();
        if ($nextElem.length === 0){
          var $optgroupUl = $currElem.parent();

          if ($optgroupUl.hasClass('ms-optgroup')){
            var $optgroupLi = $optgroupUl.parent(),
                $nextOptgroupLi = $optgroupLi.next(':visible');

            if ($nextOptgroupLi.length > 0){
              $nextElem = $nextOptgroupLi.find(this.elemsSelector).first();
            } else {
              $nextElem = $elems.first();
            }
          } else {
            $nextElem = $elems.first();
          }
        }
      } else if (direction === -1){ // UP

        $nextElem = $currElem.prevAll(this.elemsSelector).first();
        if ($nextElem.length === 0){
          var $optgroupUl = $currElem.parent();

          if ($optgroupUl.hasClass('ms-optgroup')){
            var $optgroupLi = $optgroupUl.parent(),
                $prevOptgroupLi = $optgroupLi.prev(':visible');

            if ($prevOptgroupLi.length > 0){
              $nextElem = $prevOptgroupLi.find(this.elemsSelector).last();
            } else {
              $nextElem = $elems.last();
            }
          } else {
            $nextElem = $elems.last();
          }
        }
      }
      if ($nextElem.length > 0){
        $nextElem.addClass('ms-hover');
        var scrollTo = $list.scrollTop() + $nextElem.position().top - 
                       containerHeight / 2 + elemHeight / 2;

        $list.scrollTop(scrollTo);
      }
    },

    'selectHighlighted' : function($list){
      var $elems = $list.find(this.elemsSelector),
          $highlightedElem = $elems.filter('.ms-hover').first();

      if ($highlightedElem.length > 0){
        if ($list.parent().hasClass('ms-selectable')){
          this.select($highlightedElem.data('ms-value'));
        } else {
          this.deselect($highlightedElem.data('ms-value'));
        }
        $elems.removeClass('ms-hover');
      }
    },

    'switchList' : function($list){
      $list.blur();
      this.$container.find(this.elemsSelector).removeClass('ms-hover');
      if ($list.parent().hasClass('ms-selectable')){
        this.$selectionUl.focus();
      } else {
        this.$selectableUl.focus();
      }
    },

    'activeMouse' : function($list){
      var that = this;

      $('body').on('mouseenter', that.elemsSelector, function(){
        $(this).parents('.ms-container').find(that.elemsSelector).removeClass('ms-hover');
        $(this).addClass('ms-hover');
      });

      $('body').on('mouseleave', that.elemsSelector, function () {
          $(this).parents('.ms-container').find(that.elemsSelector).removeClass('ms-hover');;
      });
    },

    'refresh' : function() {
      this.destroy();
      this.$element.multiSelect(this.options);
    },

    'destroy' : function(){
      $("#ms-"+this.$element.attr("id")).remove();
      this.$element.css('position', '').css('left', '')
      this.$element.removeData('multiselect');
    },

    'select' : function(value, method){
      if (typeof value === 'string'){ value = [value]; }

      var that = this,
          ms = this.$element,
          idCont = that.$container.attr("id"),
          idElem = idCont + "-" + value,
          
          msIds = $.map(value, function (val) { return (that.sanitize(val)); }),
          selectables = this.$selectableUl.find('#' + /* idCont + "-" + */msIds.join('-selectable, #') + '-selectable').filter(':not(.' + that.options.disabledClass + ')'),
          selections = this.$selectionUl.find('#' + /*idCont + "-" + */ msIds.join('-selection, #') + '-selection').filter(':not(.'+that.options.disabledClass+')'),
          options = ms.find('option:not(:disabled)').filter(function(){ return($.inArray(this.value, value) > -1); });

      if (method === 'init'){
          selectables = this.$selectableUl.find('#' +/* idCont + "-" +*/ msIds.join('-selectable, #') + '-selectable'),
        selections = this.$selectionUl.find('#' + /*idCont + "-" +*/ msIds.join('-selection, #') + '-selection');
      }

      if (selectables.length > 0){
        selectables.addClass('ms-selected').hide();
        selections.addClass('ms-selected').show();

        options.prop('selected', true);

        that.$container.find(that.elemsSelector).removeClass('ms-hover');

        var selectableOptgroups = that.$selectableUl.children('.ms-optgroup-container');
        if (selectableOptgroups.length > 0){
          selectableOptgroups.each(function(){
            var selectablesLi = $(this).find('.ms-elem-selectable');
            if (selectablesLi.length === selectablesLi.filter('.ms-selected').length){
              $(this).find('.ms-optgroup-label').hide();
            }
          });

          var selectionOptgroups = that.$selectionUl.children('.ms-optgroup-container');
          selectionOptgroups.each(function(){
            var selectionsLi = $(this).find('.ms-elem-selection');
            if (selectionsLi.filter('.ms-selected').length > 0){
              $(this).find('.ms-optgroup-label').show();
            }
          });
        } else {
          if (that.options.keepOrder && method !== 'init'){
            var selectionLiLast = that.$selectionUl.find('.ms-selected');
            if((selectionLiLast.length > 1) && (selectionLiLast.last().get(0) != selections.get(0))) {
              selections.insertAfter(selectionLiLast.last());
            }
          }
        }
        if (method !== 'init'){
          ms.trigger('change');
          if (typeof that.options.afterSelect === 'function') {
            that.options.afterSelect.call(this, value);
          }
        }
      }
    },

    'deselect': function (value) {
        var idComponenteListas = value.split(':')[0];
        var idElemento = value.split(':')[1];
      if (typeof value === 'string'){ value = [value]; }

        var that = this,
          idCont = that.$container.attr("id"),
          idElem = idCont + "-" + value,
          ms = this.$element,

          msIds = $.map(value, function(val){ return(that.sanitize(val)); }),
          selectables = this.$selectableUl.find('#' + msIds.join('-selectable, #') + '-selectable'),
          selections = this.$selectionUl.find('#' +msIds.join('-selection, #') + '-selection').filter('.ms-selected').filter(':not(.' + that.options.disabledClass + ')'),
          options = ms.find('option').filter(function(){ return($.inArray(this.value, value) > -1); });

      if (selections.length > 0){
        selectables.removeClass('ms-selected').show();
        selections.removeClass('ms-selected').hide();
        options.prop('selected', false);

        that.$container.find(that.elemsSelector).removeClass('ms-hover');

        var selectableOptgroups = that.$selectableUl.children('.ms-optgroup-container');
        if (selectableOptgroups.length > 0){
          selectableOptgroups.each(function(){
            var selectablesLi = $(this).find('.ms-elem-selectable');
            if (selectablesLi.filter(':not(.ms-selected)').length > 0){
              $(this).find('.ms-optgroup-label').show();
            }
          });

          var selectionOptgroups = that.$selectionUl.children('.ms-optgroup-container');
          selectionOptgroups.each(function(){
            var selectionsLi = $(this).find('.ms-elem-selection');
            if (selectionsLi.filter('.ms-selected').length === 0){
              $(this).find('.ms-optgroup-label').hide();
            }
          });
        }
        ms.trigger('change');
        if (typeof that.options.afterDeselect === 'function') {
          that.options.afterDeselect.call(this, value);
        }
      }
    },

    'select_all' : function(){
      var ms = this.$element,
          values = ms.val();

      ms.find('option:not(":disabled")').prop('selected', true);
      this.$selectableUl.find('.ms-elem-selectable').filter(':not(.'+this.options.disabledClass+')').addClass('ms-selected').hide();
      this.$selectionUl.find('.ms-optgroup-label').show();
      this.$selectableUl.find('.ms-optgroup-label').hide();
      this.$selectionUl.find('.ms-elem-selection').filter(':not(.'+this.options.disabledClass+')').addClass('ms-selected').show();
      this.$selectionUl.focus();
      ms.trigger('change');
      if (typeof this.options.afterSelect === 'function') {
        var selectedValues = $.grep(ms.val(), function(item){
          return $.inArray(item, values) < 0;
        });
        this.options.afterSelect.call(this, selectedValues);
      }
    },

    'deselect_all' : function(){
      var ms = this.$element,
          values = ms.val();

      ms.find('option').prop('selected', false);
      this.$selectableUl.find('.ms-elem-selectable').removeClass('ms-selected').show();
      this.$selectionUl.find('.ms-optgroup-label').hide();
      this.$selectableUl.find('.ms-optgroup-label').show();
      this.$selectionUl.find('.ms-elem-selection').removeClass('ms-selected').hide();
      this.$selectableUl.focus();
      ms.trigger('change');
      if (typeof this.options.afterDeselect === 'function') {
        this.options.afterDeselect.call(this, values);
      }
    },

    sanitize: function(value){
      var hash = 0, i, character;
      if (value.length == 0) return hash;
      var ls = 0;
      for (i = 0, ls = value.length; i < ls; i++) {
        character  = value.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash |= 0; // Convert to 32bit integer
      }
      return hash;
    }
  };

  /* MULTISELECT PLUGIN DEFINITION
   * ======================= */

  $.fn.multiSelect = function () {
    var option = arguments[0],
        args = arguments;

    return this.each(function () {
      var $this = $(this),
          data = $this.data('multiselect'),
          options = $.extend({}, $.fn.multiSelect.defaults, $this.data(), typeof option === 'object' && option);

      if (!data){ $this.data('multiselect', (data = new MultiSelect(this, options))); }

      if (typeof option === 'string'){
        data[option](args[1]);
      } else {
        data.init();
      }
    });
  };

  $.fn.multiSelect.defaults = {
    keySelect: [32],
    selectableOptgroup: false,
    disabledClass : 'disabled',
    dblClick : false,
    keepOrder: false,
    cssClass: ''
  };

  $.fn.multiSelect.Constructor = MultiSelect;

  $.fn.insertAt = function(index, $parent) {
    return this.each(function() {
      if (index === 0) {
        $parent.prepend(this);
      } else {
        $parent.children().eq(index - 1).after(this);
      }
    });
}

}(window.jQuery);
