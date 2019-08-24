// JavaScript source code
function runFooterScript() {
    var __footerLayout = {
        body : document.getElementsByTagName('body')[0],
        headerDiv : document.getElementsByClassName('header')[0],
        footerDiv : document.getElementsByClassName('footer')[0],
        isiDevice : /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase()),
        isAndroid : /android/i.test(navigator.userAgent.toLowerCase()),
        feedbackButton : document.querySelector('.footer #feedback'),
        readCookie : function (name) {
            "use strict";
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        checkVisible : function (elm) {
            "use strict";
            var rect = elm.getBoundingClientRect();
            var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
            return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
        },

        moveFeedback : function () {
            var feedback = document.getElementById("floater");
            if (!__footerLayout.checkVisible(__footerLayout.footerDiv) && document.querySelector('.floating')) {
                feedback.className = feedback.className.replace('floating', '')
            } else if (__footerLayout.checkVisible(__footerLayout.footerDiv) && !document.querySelector('.floating')) {
                feedback.className = feedback.className + ' floating';
            }
        },
        setFullsite : function () {
            __footerLayout.body.className += ' fullsite';
            __footerLayout.headerDiv.className = __footerLayout.headerDiv.className.replace('resp', '')
            __footerLayout.footerDiv.className = __footerLayout.footerDiv.className.replace('resp', '')
        },
        sendFeedback : function () {
            var feedbackURL = "https://jr.co1.qualtrics.com/jfe/form/SV_2fsGaMrJ9MUeEx7?Q_SDID=SD_3UhijQGKDeuapz7&domain="+__headerData.site+"&lang="+__headerData.lang+"&currency="+__headerData.cur+"&url="+location;
            window.open(feedbackURL, '_blank');
        }
    }

    //feedback and live chat float triggers
    if (document.getElementById("floater")) {
        window.addEventListener('scroll', __footerLayout.moveFeedback);
        window.onload = __footerLayout.moveFeedback();
    }

    if (document.querySelector('.footer #feedback')) {
        __footerLayout.feedbackButton.addEventListener('click', __footerLayout.sendFeedback);    
    }
}

function waitForElementToDisplay(selector, time) {
  if(document.querySelector(selector)!=null) {
    runFooterScript();
    return;
  }
  else {
    setTimeout(function() {
      waitForElementToDisplay(selector, time);
    }, time);
  }
} waitForElementToDisplay("#footer", 250);