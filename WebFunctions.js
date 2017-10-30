class WebFunctions {
    constructor() {
        //everything is ready so this can empty
    }
    
    //just the method inside WebFunctions which is a "helper" class
    httpGetAsync (theUrl, callback) {   // when the async operation is complete the callback function is executed with the async results passed into callback
        var xmlHttp = new XMLHttpRequest();

        //  onreadystatechange
        //    https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/onreadystatechange
        xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true);  // true for asynchronous ... note:  the option to have a "choice (t/f)" is actually deprecated if you read the tech doc...  i.e. should always be true
        xmlHttp.send(null);
    }
    
    httpPostAsync (theUrl, msgToSend, callback) {   // when the async operation is complete the callback function is executed with the async results passed into callback
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log("xhttp.responseText === " + xhttp.responseText);
                callback(xhttp.responseText);
            }
        };
        // test xhr open for Unit8 project slack ...
        //   xhttp.open("POST", theUrl + "?bar=a", true);  // true for asynchronous ... note:  the option to have a "choice (t/f)" is actually deprecated if you read the tech doc...  i.e. should always be true
        xhttp.open("POST", theUrl, true);  // true for asynchronous ... note:  the option to have a "choice (t/f)" is actually deprecated if you read the tech doc...  i.e. should always be true
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(msgToSend);
    }        
}

// file:///D:/!Geo/!Development/CodeSmith/XHR-Demystified_byGeorge2.0/WebFunctions.js
// created by George 2.0 Hope on 20171006
//  ... all rights reserved ... ☺
//  ... Creative Commons with Attribution License (CC BY 3.0 US)
//  ... https://creativecommons.org/licenses/by/3.0/us/ 
