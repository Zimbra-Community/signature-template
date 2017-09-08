function Com_Zimbra_SignatureZimlet() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  zimletInstance._dialog = appCtxt.getMsgDialog();
};

Com_Zimbra_SignatureZimlet.prototype = new ZmZimletBase();
Com_Zimbra_SignatureZimlet.prototype.constructor = Com_Zimbra_SignatureZimlet;

Com_Zimbra_SignatureZimlet.prototype._displayDialog = function() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  var sStatusMsg = zimletInstance.getMessage("simpledialog_status_launch"); // get i18n resource string
	
  zimletInstance.pView = new DwtComposite(zimletInstance.getShell()); //creates an empty div as a child of main shell div
  zimletInstance.pView.setSize("650", "450"); // set width and height
  zimletInstance.pView.getHtmlElement().style.overflow = "auto"; // adds scrollbar
  zimletInstance.pView.getHtmlElement().innerHTML = zimletInstance._createDialogView(); // insert html to the dialogbox

  var standardButtons = [
    DwtDialog.OK_BUTTON,
    DwtDialog.DISMISS_BUTTON,
  ]

  var dialogContents = {
    title: 'Configurar Assinatura',
    view:zimletInstance.pView,
    parent:zimletInstance.getShell(),
    standardButtons: standardButtons,
    disposeOnPopDown: true
  }
	
  zimletInstance.pbDialog = new ZmDialog(dialogContents);
  zimletInstance.pbDialog.setButtonListener(DwtDialog.OK_BUTTON, new AjxListener(zimletInstance, zimletInstance._okBtnListener)); 
  zimletInstance.pbDialog.setButtonListener(DwtDialog.DISMISS_BUTTON, new AjxListener(zimletInstance, zimletInstance._dismissBtnListener)); 
  zimletInstance.pbDialog.popup();
}

Com_Zimbra_SignatureZimlet.prototype._createDialogView = function() {
  var html = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signature#Main");   
  return html;
}

Com_Zimbra_SignatureZimlet.prototype.singleClicked = function() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  var bottomImageUrl = "https://raw.githubusercontent.com/Zimbra-Community/signature-template/master/zeta-alliance.png";

  var signatureContents;

  var dataObject = {
    name: '',
    occupation: '',
    other: '',
    image: bottomImageUrl,
  }

  var signatureHtml = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signatureBase#Main", dataObject);
  var signatureContents = {name: 'Assinatura Automatizada', value: signatureHtml, contentType: 'html'};

  zimletInstance._displayDialog();

  var signaturePreview = document.querySelector('#signature-preview');
  signaturePreview.innerHTML = signatureHtml;


  var signatureName = document.querySelector('[name=signature_name_prop]');
  var signatureOccupation = document.querySelector('[name=signature_occupation_prop]');
  var signatureOther = document.querySelector('[name="signature_other_prop"]');

  signatureName.addEventListener('input', function(){
    dataObject.name = signatureName.value;

    signatureHtml = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signatureBase#Main", dataObject);
    signaturePreview.innerHTML = signatureHtml;
    signatureContents.value = signatureHtml;
  });

  signatureOccupation.addEventListener('input', function(){
    dataObject.occupation = signatureOccupation.value;

    signatureHtml = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signatureBase#Main", dataObject);
    signaturePreview.innerHTML = signatureHtml;
    signatureContents.value = signatureHtml;
  });

  signatureOther.addEventListener('input', function(){
    dataObject.other = signatureOther.value.replace(/\n/g, '<br>');

    signatureHtml = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signatureBase#Main", dataObject);
    signaturePreview.innerHTML = signatureHtml;
    signatureContents.value = signatureHtml;
  })
};

Com_Zimbra_SignatureZimlet.prototype.doubleClicked = function() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  zimletInstance.singleClicked();
};

Com_Zimbra_SignatureZimlet.prototype._success = function() {
  var transitions = [ ZmToast . FADE_IN , ZmToast . PAUSE , ZmToast . PAUSE , ZmToast . PAUSE , ZmToast . FADE_OUT ];
  appCtxt.getAppController().setStatusMsg("Browser will be refreshed for changes to take effect ...", ZmStatusView.LEVEL_INFO, null , transitions);
  setTimeout( Com_Zimbra_SignatureZimlet.prototype._reloadBrowser, 5000); 
}

Com_Zimbra_SignatureZimlet.prototype._error = function() {
  return;
}

Com_Zimbra_SignatureZimlet.prototype._okBtnListener = function() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  var bottomImageUrl = zimletInstance.getResource('images/bottom.jpg');

  var signatureName = document.querySelector('[name=signature_name_prop]');
  var signatureOccupation = document.querySelector('[name=signature_occupation_prop]');
  var signatureOther = document.querySelector('[name="signature_other_prop"]');
  
  var dataObject = {
    name: signatureName.value,
    occupation: signatureOccupation.value,
    other: signatureOther.value.replace(/\n/g, '<br>'),
    image: bottomImageUrl,
  }

  var signatureCollection = appCtxt.getSignatureCollection();

  var signatureHtml = AjxTemplate.expand("com_zimbra_signature_zimlet.templates.signatureBase#Main", dataObject);
  var signatureContents = {name: 'Assinatura Automatizada', content: signatureHtml, contentType: 'text/html'};
  var signature = new ZmSignature();


  var successCallback = new AjxCallback(signature, zimletInstance.setPreference);
  var errorCallback = new AjxCallback(signature, zimletInstance._error);
  var objMail=new ZmMailApp(); 
  var signatures = objMail.getSignatureCollection(appCtxt.getActiveAccount()); // Retrieve signature collection 
  
  //if there is still a signature in the cache, but the user removed it, `continue` with the batch after we get `failed to remove no such id...`
  var jsonObj = { BatchRequest : { _jsns:"urn:zimbra" , onerror:"continue" }}; 
  var request = jsonObj.BatchRequest;

  //remove old signature, if we find one
  if(signatures._nameMap['Assinatura Automatizada'])
  {
     request.DeleteSignatureRequest = { _jsns:"urn:zimbraAccount", requestId:"0" };
     request.DeleteSignatureRequest.signature = { id : signatures._nameMap['Assinatura Automatizada'].id }; 
  }

  request.CreateSignatureRequest = { _jsns:"urn:zimbraAccount", requestId:"0" };
  request.CreateSignatureRequest.signature = { name : signatureContents.name , content : { type : signatureContents.contentType , _content:signatureHtml }}; 
  appCtxt.getAppController().sendRequest ({ jsonObj:jsonObj , asyncMode:true , errorCallback:errorCallback,callback:successCallback});
     
  zimletInstance.pbDialog.popdown();
};

Com_Zimbra_SignatureZimlet.prototype.setPreference = function(result)
{
   var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
   //console.log("Com_Zimbra_SignatureZimlet setting default zimbraPrefDefaultSignatureId/zimbraPrefForwardReplySignatureId:");
   //console.log(result._data.BatchResponse.CreateSignatureResponse[0].signature[0].id);
   try{
      if(result._data.BatchResponse.CreateSignatureResponse[0].signature[0].id.length == 36)
      {
         //got an id
         var successCallback = new AjxCallback(zimletInstance, Com_Zimbra_SignatureZimlet.prototype._success);
         var errorCallback = new AjxCallback(zimletInstance, Com_Zimbra_SignatureZimlet.prototype._error);           

         var soapDoc = AjxSoapDoc.create("ModifyPrefsRequest", "urn:zimbraAccount");
         var zimbraPrefDefaultSignatureIdNode;
         var zimbraPrefForwardReplySignatureIdNode;

         zimbraPrefDefaultSignatureIdNode = soapDoc.set("pref", result._data.BatchResponse.CreateSignatureResponse[0].signature[0].id);
         zimbraPrefDefaultSignatureIdNode.setAttribute("name", "zimbraPrefDefaultSignatureId");
      
         zimbraPrefForwardReplySignatureIdNode = soapDoc.set("pref", result._data.BatchResponse.CreateSignatureResponse[0].signature[0].id);
         zimbraPrefForwardReplySignatureIdNode.setAttribute("name", "zimbraPrefForwardReplySignatureId");
      
         appCtxt.getAppController().sendRequest({
            soapDoc: soapDoc,
            asyncMode: true,
            errorCallback:errorCallback,callback:successCallback
         });             
         
      }
   }
   catch(err)
   {
      console.log('Com_Zimbra_SignatureZimlet something went wrong'+err);
   }
};

Com_Zimbra_SignatureZimlet.prototype._reloadBrowser = function () {
   window.onbeforeunload = null; 
   var url = AjxUtil.formatUrl ({}); 
   ZmZimbraMail.sendRedirect ( url ); 
};  

Com_Zimbra_SignatureZimlet.prototype._dismissBtnListener = function() {
  var zimletInstance = appCtxt._zimletMgr.getZimletByName('com_zimbra_signature_zimlet').handlerObject;
  zimletInstance.pbDialog.popdown();
};
