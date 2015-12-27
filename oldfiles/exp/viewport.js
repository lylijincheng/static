// Safari on iOS viewport

// Executed at window onload.
this.viewport = function() {

    var width, height, screenWidth, screenHeight, innerWidth, innerHeight, isSafariOnIOS, orientation, userAgent;

    screenWidth  = window.screen.width;
    screenHeight = window.screen.height;
    innerWidth   = window.innerWidth;
    innerHeight  = window.innerHeight; 

    userAgent    = navigator.userAgent;
    orientation  = window.orientation;

    isSafariOnIOS = /Version\/(\d)\.\d Mobile/i.exec(userAgent);    

    width = innerWidth;
    
    height 
    = isSafariOnIOS 
    ? Math.max(innerHeight, (navigator.standalone ? innerHeight : ((orientation == 0 || orientation == 180) ? screenHeight - 44 : screenWidth - 32) - 20))
    : innerHeight;

    return {
        "width": width,
        "height": height
    }
}();

/* ----------------------------------------
iOS Platform: Version 5.1.1
Safari on iOS 5.1   "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B208 Safari/7534.48.3"
Safari on iOS 6     "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"
Chrome on iOS       "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X; zh-cn) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/21.0.1180.80 Mobile/9B208 Safari/7534.48.3 (C037B678-A630-40AC-9D5D-9282CC5CAD71)"
UC Browser          "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B208"
Dolphin Browser     "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B208"
QQ Browser          "MQQBrowser/36 Mozilla/5.0 (iPhone 4; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B208 Safari/7534.48.3"
Maxmon Browser      "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"
360 Browser         "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3"

Android Platform: Version 2.3

Android Platform: Version 4.0.3
---------------------------------------- */
