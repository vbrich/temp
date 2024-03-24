var OneInc,__assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)};!function(OneInc){var OperationCategory,PortalEventType,CommandType,InteractionMode,preloadPortalStaticFiles=function(container){void 0===container&&(container=null);var frameHost=container||document.body,frame=document.createElement("iframe");frame.style.display="none",frame.src="https://testportalone.processonepayments.com/GenericModalV2/start-with-parameters?uniq="+(new Date).getTime(),frame.id="__OneInc__PaymentModal__StaticFilesPreloading",null==frameHost||frameHost.appendChild(frame)};(function(){if(!document.currentScript)return!0;var attr=document.currentScript.getAttribute("preload-static-files-disabled");return null!=attr&&(""===attr||"true"===attr.toLowerCase())})()||preloadPortalStaticFiles(),function(FeeContext){FeeContext.PaymentWithFee="PaymentWithFee",FeeContext.PaymentWithoutFee="PaymentWithoutFee"}(OneInc.FeeContext||(OneInc.FeeContext={})),function(PaymentCategory){PaymentCategory.CreditCard="CreditCard",PaymentCategory.ECheck="ECheck",PaymentCategory.UserSelect="UserSelect"}(OneInc.PaymentCategory||(OneInc.PaymentCategory={})),function(AmountContext){AmountContext.AmountDueOnly="AmountDueOnly",AmountContext.EnterAmountOnly="EnterAmountOnly",AmountContext.SelectAmount="SelectAmount",AmountContext.SelectOrEnterAmount="SelectOrEnterAmount",AmountContext.SelectOrEnterAmountConstrained="SelectOrEnterAmountConstrained"}(OneInc.AmountContext||(OneInc.AmountContext={})),function(OperationCategory){OperationCategory.MakePayment="makePayment",OperationCategory.SavePaymentMethod="savePaymentMethod",OperationCategory.ManagePaymentMethods="managePaymentMethods",OperationCategory.EnrollAutoPay="enrollAutoPay",OperationCategory.QuickPay="quickPay",OperationCategory.ManageNotifications="manageNotifications",OperationCategory.CsrMakePayment="csrMakePayment"}(OperationCategory=OneInc.OperationCategory||(OneInc.OperationCategory={})),function(PortalEventType){PortalEventType.Error="portalOne.error",PortalEventType.Load="portalOne.load",PortalEventType.PaymentComplete="portalOne.paymentComplete",PortalEventType.SaveComplete="portalOne.saveComplete",PortalEventType.Unload="portalOne.unload",PortalEventType.ApplePayCheckComplete="portalOne.applePayCheckComplete",PortalEventType.ApplePayMerchantValidateComplete="portalOne.validateMerchantComplete",PortalEventType.ApplePayPaymentAuthorized="portalOne.applePayPaymentAuthorized",PortalEventType.ApplePayPaymentCanceled="portalOne.applePayPaymentCanceled",PortalEventType.ModalDialogOpened="portalOne.modalDialogOpened",PortalEventType.ValidationComplete="portalOne.validationComplete",PortalEventType.GooglePayError="GooglePayError",PortalEventType.GooglePayIsReadyToPay="GooglePayIsReadyToPay",PortalEventType.GooglePayLoadPaymentData="GooglePayLoadPaymentData",PortalEventType.GooglePayCancelled="GooglePayCancelled"}(PortalEventType=OneInc.PortalEventType||(OneInc.PortalEventType={})),function(CommandType){CommandType.ApplePayCheck="ApplePayCheck",CommandType.ApplePayStart="ApplePayStart",CommandType.ApplePayCompleteMerchantValidation="ApplePayCompleteMerchantValidation",CommandType.ApplePayComplete="ApplePayComplete",CommandType.ApplePayAbort="ApplePayAbort",CommandType.PerformTargetOperation="PerformTargetOperation",CommandType.Close="Close",CommandType.Start="Start",CommandType.UpdateContentHeight="UpdateContentHeight",CommandType.UpdateFrameTitle="UpdateFrameTitle",CommandType.GooglePayStart="GooglePayStart",CommandType.GooglePayExecute="GooglePayExecute",CommandType.GooglePayRequestUpdated="GooglePayRequestUpdated"}(CommandType=OneInc.CommandType||(OneInc.CommandType={})),function(InteractionMode){InteractionMode.Isolated="Isolated",InteractionMode.ExternalExchange="ExternalExchange"}(InteractionMode=OneInc.InteractionMode||(OneInc.InteractionMode={}));var ApplePay=function(){function ApplePay(frameContent){this.frameContent=frameContent}return ApplePay.prototype.init=function(merchantIdentifier){var _this=this;this.supportedByDevice()?ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier).then((function(isApplePaySupported){_this.sendMessageToFrame(PortalEventType.ApplePayCheckComplete,isApplePaySupported)})):this.sendMessageToFrame(PortalEventType.ApplePayCheckComplete,!1)},ApplePay.prototype.beginPayment=function(paymentRequest){var _this=this;this.session=new ApplePaySession(3,paymentRequest),this.session.onvalidatemerchant=function(event){var data={validationUrl:event.validationURL};_this.sendMessageToFrame(PortalEventType.ApplePayMerchantValidateComplete,data)},this.session.onpaymentauthorized=function(event){console.log("ApplePay payment authorized:"+JSON.stringify(event.payment)),_this.sendMessageToFrame(PortalEventType.ApplePayPaymentAuthorized,event.payment)},this.session.oncancel=function(event){_this.sendMessageToFrame(PortalEventType.ApplePayPaymentCanceled)},this.session.begin()},ApplePay.prototype.completeMerchantValidation=function(merchantSession){this.session&&this.session.completeMerchantValidation(merchantSession)},ApplePay.prototype.completePayment=function(authorizationResult){this.session&&this.session.completePayment(authorizationResult)},ApplePay.prototype.abort=function(){if(this.session){try{this.session.abort()}catch(ex){}this.session=null}},ApplePay.prototype.handleCommand=function(command){switch(command.Command){case CommandType.ApplePayCheck:this.init(command.Data.merchantIdentifier);break;case CommandType.ApplePayStart:this.beginPayment(command.Data);break;case CommandType.ApplePayComplete:this.completePayment(command.Data);break;case CommandType.ApplePayCompleteMerchantValidation:this.completeMerchantValidation(command.Data);break;case CommandType.ApplePayAbort:this.abort()}},ApplePay.prototype.supportedByDevice=function(){return"ApplePaySession"in window},ApplePay.prototype.sendMessageToFrame=function(messageType,data){void 0===data&&(data=null);var message={PortalOne:{Message:messageType,Data:data}};this.frameContent.postMessage(JSON.stringify(message),"*")},ApplePay}();OneInc.ApplePay=ApplePay;var GooglePay=function(){function GooglePay(frameContent){this.environment="TEST",this.initialized=!1,this.frameContent=frameContent}return GooglePay.prototype.ensureGooglePayLoaded=function(){var _a,_b,isGooglePayLoaded="google"in window&&!!(null===(_b=null===(_a=null===google||void 0===google?void 0:google.payments)||void 0===_a?void 0:_a.api)||void 0===_b?void 0:_b.PaymentsClient);return new Promise((function(resolve,reject){if(isGooglePayLoaded)resolve();else{var script_1=document.createElement("script");script_1.src=GooglePay.googlePayScriptUrl,script_1.async=!0;var onScriptLoaded_1=function(){resolve()},onScriptError_1=function(){throw script_1.removeEventListener("load",onScriptLoaded_1),script_1.removeEventListener("error",onScriptError_1),new Error("Unable to load script ".concat(script_1.src))};script_1.addEventListener("load",onScriptLoaded_1),script_1.addEventListener("error",onScriptError_1),document.body.appendChild(script_1)}}))},GooglePay.prototype.getGoogleIsReadyToPayRequest=function(){return{apiVersion:this.paymentRequest.apiVersion,apiVersionMinor:this.paymentRequest.apiVersionMinor,allowedPaymentMethods:this.paymentRequest.allowedPaymentMethods}},GooglePay.prototype.handleCommand=function(command){switch(command.Command){case CommandType.GooglePayStart:this.googlePayStart(command.Data.environment,command.Data.paymentRequest);break;case CommandType.GooglePayExecute:this.execute()}},GooglePay.prototype.googlePayStart=function(environment,paymentRequest){var _this=this;this.ensureGooglePayLoaded().then((function(){_this.environment=environment,_this.paymentRequest=paymentRequest,_this.initialized||_this.initializeElement()}))},GooglePay.prototype.execute=function(){var _this=this;this.paymentsClient.loadPaymentData(this.paymentRequest).then((function(data){return _this.sendMessageToFrame(PortalEventType.GooglePayLoadPaymentData,data)})).catch((function(error){return _this.sendMessageToFrame(PortalEventType.GooglePayError,error)}))},GooglePay.prototype.sendMessageToFrame=function(messageType,data){void 0===data&&(data=null);var message={PortalOne:{Message:messageType,Data:data}};this.frameContent.postMessage(JSON.stringify(message),"*")},GooglePay.prototype.initializeElement=function(){var _this=this;this.paymentsClient=new google.payments.api.PaymentsClient({environment:this.environment,merchantInfo:this.paymentRequest.merchantInfo});try{this.paymentsClient.isReadyToPay(this.getGoogleIsReadyToPayRequest()).then((function(readyToPay){var _c,_d,isReadyToPay=null!==(_c=null==readyToPay?void 0:readyToPay.result)&&void 0!==_c&&_c;if(isReadyToPay){var readyToPayResponse={isButtonVisible:!0,isReadyToPay:isReadyToPay,paymentMethodPresent:null!==(_d=null==readyToPay?void 0:readyToPay.paymentMethodPresent)&&void 0!==_d&&_d};_this.sendMessageToFrame(PortalEventType.GooglePayIsReadyToPay,readyToPayResponse),_this.initialized=!0}}))}catch(err){this.sendMessageToFrame(PortalEventType.GooglePayError,err)}},GooglePay.googlePayScriptUrl="https://pay.google.com/gp/p/js/pay.js",GooglePay.elementLookupDelayMs=50,GooglePay}();OneInc.GooglePay=GooglePay;var SavePaymentMethodProxy=function(){function SavePaymentMethodProxy(frame,callbackId,options){this.callbackId=callbackId,this.options=options,this.frameContent=frame.contentWindow,this.portalOrigin=new URL(frame.src).origin;var listener=this.handlePostMessage.bind(this);window.addEventListener&&window.addEventListener("message",listener)}return SavePaymentMethodProxy.prototype.Save=function(){this.sendCommandToFrame(CommandType.PerformTargetOperation)},SavePaymentMethodProxy.prototype.sendCommandToFrame=function(commandType,data){void 0===data&&(data=null);var message={PortalOne:{Command:commandType,Data:data}};this.frameContent.postMessage(JSON.stringify(message),this.portalOrigin)},SavePaymentMethodProxy.prototype.handlePostMessage=function(event){var _c,_d,_e;if(event.origin===this.portalOrigin){var message=this.parseMessage(event.data);if(message){if(message.callbackId!==this.callbackId)return;switch(message.Message){case PortalEventType.SaveComplete:(null===(_c=this.options)||void 0===_c?void 0:_c.onSuccess)&&this.options.onSuccess(message.Data);break;case PortalEventType.Error:(null===(_d=this.options)||void 0===_d?void 0:_d.onFail)&&this.options.onFail(message.Data);break;case PortalEventType.ValidationComplete:(null===(_e=this.options)||void 0===_e?void 0:_e.onValidationComplete)&&this.options.onValidationComplete(message.Data.isReadyToPerform)}}}},SavePaymentMethodProxy.prototype.parseMessage=function(messageData){try{if(!messageData)return null;var message="string"==typeof messageData?JSON.parse(messageData):messageData;return message.PortalOne?message.PortalOne:null}catch(e){return null}},SavePaymentMethodProxy}();function ProcessingIndicator(options){var ID="__OneInc__PaymentModal__Loading",finalOptions=__assign(__assign({},{loaderHTML:'<div><div style="animation-delay: 0ms;"></div>\n  <div style="animation-delay: 150ms;"></div>\n  <div style="animation-delay: 300ms;"></div></div>',processingIndicatorModalStyles:{display:"flex","align-items":"center","align-content":"center","justify-content":"center",position:"fixed",top:0,left:0,width:"100%",height:"100%","background-color":"rgba(0,0,0,0.32)","z-index":2147483647},processingIndicatorInlineStyles:{display:"flex","align-items":"center","align-content":"center","justify-content":"center",position:"absolute",top:0,left:0,width:"100%","background-color":"rgba(0,0,0,0.32)","z-index":2147483647},processingIndicatorCss:"div#"+ID+" > div {display:flex;justify-content:space-between;width:100px;}\ndiv#"+ID+" > div div {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background-color: white;\n  animation: "+ID+"__Dots 1s steps(5, end) infinite;\n}\n@keyframes "+ID+"__Dots {\n  0%, 20% {\n\ttransform: scale(0);}\n  40% {\n\ttransform: scale(0.7);}\n  60% {\n\ttransform: scale(1);}\n  80%, 100% {\n\ttransform: scale(0);\n  }\n}"}),options);var _currentElements;return{start:function(params,element){if(!("false"==="".concat(params.loadingIndication).toLowerCase())){var isInlineMode=params.displayMode&&"inline"===params.displayMode.toString().toLowerCase();_currentElements=function _attach(isInlineMode,element){var piContainer=document.getElementById(ID);return piContainer||(piContainer=function(parent){var div=document.createElement("div");div.id=ID,div.innerHTML=finalOptions.loaderHTML;var styles=isInlineMode?finalOptions.processingIndicatorInlineStyles:finalOptions.processingIndicatorModalStyles;return Object.keys(styles).forEach((function(key){return div.style[key]=styles[key]})),parent.appendChild(div),div}(element||document.body)),[ensureStylesAttached("__OneInc__PaymentModal__Loading__Styles",finalOptions.processingIndicatorCss),piContainer]}(isInlineMode,element)}},stop:function(){_currentElements=function(currentElements){if(currentElements&&currentElements.length>0)for(var _i=0,currentElements_1=currentElements;_i<currentElements_1.length;_i++){var element=currentElements_1[_i];element&&element.parentNode.removeChild(element)}return null}(_currentElements)}}}OneInc.SavePaymentMethodProxy=SavePaymentMethodProxy;function BackgroundScroll(){var _currentElements,_verticalOffset;return{disable:function(params){var isInlineMode=params.displayMode&&"inline"===params.displayMode.toString().toLowerCase(),preventBackgroundScroll="true"==="".concat(params.preventBackgroundScroll).toLowerCase();if(!isInlineMode&&preventBackgroundScroll){var dto=function _attach(){return{offset:window.scrollY,elements:[ensureStylesAttached("__OneInc__PaymentModal__Background__Scroll__Styles","html body {position: fixed !important; width: 100% !important; top: -".concat(window.scrollY,"px !important;}"))]}}();_currentElements=dto.elements,_verticalOffset=dto.offset}},enable:function(){_currentElements=function(currentElements){if(currentElements&&currentElements.length>0)for(var _i=0,currentElements_2=currentElements;_i<currentElements_2.length;_i++){var element=currentElements_2[_i];element&&element.parentNode.removeChild(element)}return null}(_currentElements),_verticalOffset&&window.scrollTo(0,parseInt(_verticalOffset,10))}}}function ensureStylesAttached(styleId,css){var existingStyles=document.getElementById(styleId);if(existingStyles)return existingStyles;var head=document.getElementsByTagName("head")[0],style=document.createElement("style");return style.id=styleId,style.setAttribute("type","text/css"),style.appendChild(document.createTextNode(css)),head.appendChild(style),style}var Operations=function(){function Operations(startFunction,commonParams){this.commonParams=commonParams||{},this.startFunction=startFunction,this.referredOperations=[]}return Object.defineProperty(Operations.prototype,"allOperationParameters",{get:function(){return __assign(__assign(__assign({operation:this.primaryOperation,referredOperations:this.referredOperations},this.commonParams),this.makePaymentParams),this.autoPayParams)},enumerable:!1,configurable:!0}),Operations.prototype.makePayment=function(params){return this.makePaymentParams=params,this.assignOperation(OperationCategory.MakePayment),this},Operations.prototype.enrollAutoPay=function(params){return this.autoPayParams=params,this.assignOperation(OperationCategory.EnrollAutoPay),this},Operations.prototype.start=function(){this.primaryOperation?this.startFunction&&this.startFunction(this.allOperationParameters):console.error("couldn't start due to missing operations; chain at least one operation before starting.")},Operations.prototype.assignOperation=function(operation){this.primaryOperation?this.referredOperations.push(operation):this.primaryOperation=operation},Operations}();OneInc.Operations=Operations;var PortalOne=function(){function PortalOne(container,subscriptionCallback,customStyles){void 0===container&&(container=null),void 0===subscriptionCallback&&(subscriptionCallback=null),void 0===customStyles&&(customStyles={});var _this=this;this.defaultModalStyles={display:"none",width:"100%",height:"100%",background:"none transparent",position:"fixed",top:"0",left:"0",zIndex:"100500"},this.options={frameborder:"0",allowTransparency:"true"},this.defaultInlineStyles={width:"100%",position:"static"},this.container=null,this.parentDocumentOffset=0,this.hasCustomContainer=!1,this.sendAcknowledgeNotification=function(){var _c;(null===(_c=_this.portalOneFrame)||void 0===_c?void 0:_c.contentWindow)&&_this.portalOneFrame.contentWindow.postMessage("acknowledge",_this.messageTarget)},this.onError=function(e){_this.processingIndicator.stop(),_this.sendEvent(_this.container,PortalEventType.Error,{detail:{description:"The payment portal loading failed"}})},this.onLoad=function(){_this.postParams(),_this.show(),_this.toggleModal(),_this.sendEvent(_this.container,PortalEventType.Load),_this.backgroundScroll.disable(_this.params)},this.onMessageReceived=function(e){if(e.source===_this.portalOneFrame.contentWindow){var portalOneMessage=_this.parseMessage(e.data);if(null!=portalOneMessage){if(portalOneMessage.Message===PortalEventType.ModalDialogOpened)return _this.processingIndicator.stop(),void _this.sendEvent(_this.container,PortalEventType.ModalDialogOpened);portalOneMessage.Command===CommandType.Start&&_this.onLoad(),portalOneMessage.Command===CommandType.Close&&(_this.processingIndicator.stop(),_this.sendEvent(_this.container,PortalEventType.Unload),_this.hide(),_this.toggleModal(),_this.cleanup(),_this.backgroundScroll.enable()),portalOneMessage.Command===CommandType.UpdateContentHeight&&_this.setPortalOneFrameSize(portalOneMessage.Data.height),portalOneMessage.Command===CommandType.UpdateFrameTitle&&_this.setPortalOneFrameTitle(portalOneMessage.Data.newTitle),portalOneMessage.Message&&(portalOneMessage.Message===PortalEventType.PaymentComplete&&portalOneMessage.Data&&(portalOneMessage.Data.acknowledge=_this.sendAcknowledgeNotification),_this.sendEvent(_this.container,portalOneMessage.Message,{detail:portalOneMessage.Data})),portalOneMessage.Command&&_this.applePay&&_this.applePay.handleCommand(portalOneMessage),portalOneMessage.Command&&_this.googlePay&&_this.googlePay.handleCommand(portalOneMessage)}}};var internetExplorer=function isInternetExplorer(){return window.document.documentMode}(),outdatedSafari=function isOutdatedSafari(){var userAgentString=navigator.userAgent;return userAgentString.includes("Safari")&&!userAgentString.includes("Chrome")&&/version\/1?[0-3](\.|\s)/i.test(userAgentString)}();if(internetExplorer||outdatedSafari){var errorMessage="";return this.processingIndicator&&this.processingIndicator.stop(),internetExplorer?errorMessage="Internet Explorer is no longer supported by Microsoft. Please try again using Edge, Chrome, Firefox, or Safari.":outdatedSafari&&(errorMessage="This version of the browser is no longer supported, please update or use a different browser."),this.sendEvent(container||document.body,PortalEventType.Error,{detail:{description:errorMessage}}),window.alert(errorMessage),this}return document.getElementById("__OneInc__PaymentModal__StaticFilesPreloading")||preloadPortalStaticFiles(container),this.processingIndicator=ProcessingIndicator({}),this.backgroundScroll=BackgroundScroll(),this.portalOneFrame=document.createElement("iframe"),this.hasCustomContainer=!!container,this.container=container||document.body,this.customStyles=customStyles,this.portalOneFrame.removeAttribute("style"),this.portalUri="https://testportalone.processonepayments.com/GenericModalV2/",this.createPortalOneFrame(),this.setPortalOneFrameStyles({display:"none"}),subscriptionCallback&&subscriptionCallback(this.container),this}return Object.defineProperty(PortalOne.prototype,"messageTarget",{get:function(){return this.portalUri},enumerable:!1,configurable:!0}),PortalOne.prototype.savePaymentMethod=function(params,options){this.params=params,this.params.operation=OperationCategory.SavePaymentMethod;var callbackId=this.params.callbackId=(new Date).getTime().toString();return this.startFrameWithParameters(),(null==params?void 0:params.interactionMode)===InteractionMode.ExternalExchange?new OneInc.SavePaymentMethodProxy(this.portalOneFrame,callbackId,options):null},PortalOne.prototype.makePayment=function(params){this.params=params,this.params.operation=OperationCategory.MakePayment,this.startFrameWithParameters()},PortalOne.prototype.managePaymentMethods=function(params){this.params=params,this.params.operation=OperationCategory.ManagePaymentMethods,this.startFrameWithParameters()},PortalOne.prototype.enrollAutoPay=function(params){this.params=params,this.params.operation=OperationCategory.EnrollAutoPay,this.startFrameWithParameters()},PortalOne.prototype.quickPay=function(params){this.params=params,this.params.operation=OperationCategory.QuickPay,this.startFrameWithParameters()},PortalOne.prototype.manageNotifications=function(params){this.params=params,this.params.operation=OperationCategory.ManageNotifications,this.startFrameWithParameters()},PortalOne.prototype.operations=function(commonParams){var _this=this;return new Operations((function(params){return _this.startOperations(params)}),commonParams)},PortalOne.prototype.startOperations=function(params){this.params=params,this.startFrameWithParameters()},PortalOne.prototype.run=function(params){this.params=params;var src=this.portalUri;src+="access-token/"+this.params.accessTokenId+"?sessionId="+this.params.sessionId,src+="&referrer="+encodeURI(document.location.origin),this.params.displayMode&&(src+="&displayMode="+this.params.displayMode),this.params.allowClosing&&(src+="&allowClosing="+this.params.allowClosing),this.processingIndicator.start(this.params),this.initFrame(src)},PortalOne.prototype.csrMakePayment=function(params){this.params=params,this.params.operation=OperationCategory.CsrMakePayment,this.startFrameWithParameters()},PortalOne.prototype.cleanup=function(){var _c;window.removeEventListener("message",this.onMessageReceived),this.portalOneFrame&&(null===(_c=this.portalOneFrame.parentNode)||void 0===_c||_c.removeChild(this.portalOneFrame))},PortalOne.prototype.sendEvent=function(elem,eventName,eventArgs){var event;return"function"==typeof CustomEvent?event=new CustomEvent(eventName,eventArgs):(event=document.createEvent("CustomEvent")).initCustomEvent(eventName,!0,!0,eventArgs),elem.dispatchEvent(event),event},PortalOne.prototype.createPortalOneFrame=function(){var portalOneFrame=this.container.querySelector("#PortalOneFrame");portalOneFrame&&this.container.removeChild(portalOneFrame),this.container.appendChild(this.portalOneFrame),this.portalOneFrame.setAttribute("id","PortalOneFrame"),this.portalOneFrame.setAttribute("allowPaymentRequest","true"),this.portalOneFrame.setAttribute("role","dialog"),this.portalOneFrame.setAttribute("aria-label","Payment method"),window.addEventListener("message",this.onMessageReceived),this.applePay=new OneInc.ApplePay(this.portalOneFrame.contentWindow),this.googlePay=new OneInc.GooglePay(this.portalOneFrame.contentWindow)},PortalOne.prototype.checkIsInlineModal=function(){return this.params.displayMode&&"inline"===this.params.displayMode.toLowerCase()||!1},PortalOne.prototype.hide=function(){this.portalOneFrame.style.display="none"},PortalOne.prototype.show=function(){this.portalOneFrame.style.display="block"},PortalOne.prototype.toggleModal=function(){navigator.platform&&/iPad|iPhone|iPod/.test(navigator.platform)&&(0!==this.parentDocumentOffset?(document.body.scrollTop=this.parentDocumentOffset,this.parentDocumentOffset=0):(this.parentDocumentOffset=document.body.scrollTop,document.body.scrollTop=0))},PortalOne.prototype.preventModalBlinking=function(isInlineModal){if(isInlineModal&&this.hasCustomContainer)this.container.style.position="";else{var ua=navigator.userAgent;(ua.indexOf("MSIE ")>-1||ua.indexOf("Trident/")>-1)&&(this.hasCustomContainer&&(this.container.style.position="fixed"),this.portalOneFrame.style.position="inherit")}},PortalOne.prototype.postParams=function(){var _c;null===(_c=this.portalOneFrame.contentWindow)||void 0===_c||_c.postMessage({messageType:"parameters",parameters:this.params},this.messageTarget)},PortalOne.prototype.setPortalOneFrameStyles=function(styles){var _this=this;this.portalOneFrame.removeAttribute("style"),Object.keys(styles).forEach((function(key){_this.portalOneFrame.style[key]=styles[key]})),Object.keys(this.options).forEach((function(key){_this.portalOneFrame.setAttribute(key,_this.options[key])}))},PortalOne.prototype.setPortalOneFrameSize=function(height){this.portalOneFrame.style.height=height+"px"},PortalOne.prototype.setPortalOneFrameTitle=function(newTitle){this.portalOneFrame.setAttribute("title",newTitle)},PortalOne.prototype.subscribeToIframeEvents=function(){this.portalOneFrame.addEventListener("error",this.onError,{once:!0})},PortalOne.prototype.initFrame=function(frameSrc){var isInlineModal=this.checkIsInlineModal(),defaultStyles=isInlineModal?this.defaultInlineStyles:this.defaultModalStyles,finalStyles=__assign(__assign({},defaultStyles),this.customStyles);this.setPortalOneFrameStyles(finalStyles),this.subscribeToIframeEvents(),this.portalOneFrame.src=frameSrc,this.portalOneFrame.tabIndex=0,this.preventModalBlinking(isInlineModal)},PortalOne.prototype.startFrameWithParameters=function(){this.createPortalOneFrame();var src=this.portalUri;src+="start-with-parameters?uniq="+(new Date).getTime(),src+="&referrer="+encodeURI(document.location.origin),this.processingIndicator.start(this.params),this.initFrame(src)},PortalOne.prototype.parseMessage=function(messageData){if(!messageData)return null;var message;try{message=JSON.parse(messageData)}catch(e){return console.error("cannot parse message, error: "+e),null}return message.PortalOne?message.PortalOne:null},PortalOne}();OneInc.PortalOne=PortalOne}(OneInc||(OneInc={}));