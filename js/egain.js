/*eGain Chat server */
var egainDockChat = egainDockChat  || {};
egainDockChat.serverURL = "https://digikey.egain.cloud/system";
configureEgainForLanguage();
/*eGain template name*/
if (window.__headerData.lang.toLowerCase() === 'en' || window.__headerData.lang.toLowerCase() === 'es') {
    egainDockChat.Template = "digikey_nasp";
} else {
    egainDockChat.Template = "digikey_ol";
}

/*Set to true to enable posting attributes to templates*/
egainDockChat.PostChatAttributes = true;
/*eGain video chat parameters */
egainDockChat.VChatParams = '';
/*Set to true if custom button is used to launch docked chat */
egainDockChat.UseCustomButton=true;
/*Method to set customer Parameters. To be called by client website. All the parameters specified in application-chat-defaults must be set here.*/
egainDockChat.SetCustomerParameters = function (egainAttributeName, attributeValue) {
    if (!egainDockChat.SetParameter) {
    egainDockChat.CallQueue = egainDockChat.CallQueue || [];
    egainDockChat.CallQueue.push({name:'SetParameter', args:[egainAttributeName,attributeValue]});
    } else {
        egainDockChat.SetParameter(egainAttributeName,attributeValue);
    }
};

/* Method to be called on click of custom button to launch chat in docked mode */
egainDockChat.openHelp = function() {
    egainDockChat.IsChatLaunched = true;
    startChat();
};

function startChat(){
    if (!egainDockChat.launchChat) {
        egainDockChat.CallQueue = egainDockChat.CallQueue || [];
        egainDockChat.CallQueue.push({name:'launchChat', args:[]});
    } else {
        egainDockChat.launchChat();
    }
    populateForm();
}

function populateForm(){
    var url = "/mydigikey/home/getcurrentuser";
    var request = new XMLHttpRequest;
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
            // Success!
            data = JSON.parse(request.responseText);
            if (data && data.IsLoggedIn) {
                if (data.DisplayName) {
                    egainDockChat.SetCustomerParameters("full_name", data.DisplayName);
                }
                if (data.Email) {
                    egainDockChat.SetCustomerParameters("email_address", data.Email);
                }
                if (data.CompanyName) {
                    egainDockChat.SetCustomerParameters("company", data.CompanyName);
                }
                if (data.CustomerId) {
                    egainDockChat.SetCustomerParameters("customer_number", data.CustomerId.toString());
                }
            }
        } else {
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
        // There was a connection error of some sort
        console.log("There was a connection error.");
    };

    request.send();
}

function configureEgainForLanguage() {
    /*eGain Chat Entry Point*/
    egainDockChat.EntryPointId  = "1002"; //the default
    switch(window.__headerData.lang.toLowerCase()) {
        case 'en':
            egainDockChat.Locale =  "en-US";
            break;
        case 'es':
            egainDockChat.Locale = "es-ES";
            break;
        case 'de':
            egainDockChat.Locale = "de-DE";
            egainDockChat.EntryPointId = "1014";
            break;
        case 'it':
            egainDockChat.Locale = "it-IT";
            egainDockChat.EntryPointId = "1015";
            break;
        case 'fr':
            egainDockChat.Locale = "fr-FR";
            egainDockChat.EntryPointId = "1016";
            break;
        case 'ja':
            egainDockChat.Locale = "ja-JP";
            break;
        case 'ko':
            egainDockChat.Locale = "ko-KR";
            break;
        case 'zh':
            egainDockChat.Locale = "zh-HK";
            egainDockChat.EntryPointId = "1013";
            break;
        default:
            egainDockChat.Locale = "en-US";
            break;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var customEgainButton = document.getElementById("custom-egain-button");
    if (customEgainButton !== null) {
        customEgainButton.addEventListener("click", egainDockChat.openHelp);
    }
    var extraLivechatButtons = document.querySelectorAll(".rte-livechat");
    var realExtraLivechatButtons = Array.prototype.slice.call(extraLivechatButtons);
    realExtraLivechatButtons.forEach(function (btn) {
        btn.addEventListener("click", egainDockChat.openHelp);
    });
});