//  The following gives us easy access to our WebFunctions
const webFun = new WebFunctions();
//      ... as an aside technical note:  you could access directly via:
//          WebFunctions.prototype.httpGetAsync (theUrl, callback)
//          WebFunctions.prototype.httpPostAsync (theUrl, msgToSend, callback)

let blnDOMisReady = false;
let blnAutomaticGet = false;
let automaticGetIntervalID;
let chatBoxMessageData;

function handleAutoGetStart (eventObj) {
    blnAutomaticGet = true;
    fnUpdateAutomaticGet();
}

function handleAutoGetStop (eventObj) {
    blnAutomaticGet = false;
    fnUpdateAutomaticGet();
}

function fnUpdateAutomaticGet() {
    if (blnAutomaticGet) {
        automaticGetIntervalID = setInterval(refreshData,1000);
    } else {
        clearInterval (automaticGetIntervalID);
        automaticGetIntervalID = void(0);
        automaticGetIntervalID = void 0 ;
        //  https://stackoverflow.com/questions/1291942/what-does-javascriptvoid0-mean
        automaticGetIntervalID = undefined;
    }
    document.getElementById("automaticGetStatus").innerHTML = blnAutomaticGet;
}

function refreshData () {
    webFun.httpGetAsync("http://localhost:3000/messages", fnGetAsyncCallback);  //GET REQUEST
}

function fnGetAsyncCallback (theGetFnCallResponse) {
    // since I know the "Chat Server API" will respond with JSON, I can just parse it & save for use:
    chatBoxMessageData = JSON.parse(theGetFnCallResponse);
    if (blnDOMisReady) {
        refreshPage();
    }
}    

function refreshPage () {
    if (chatBoxMessageData) {
        console.log("Page Refreshed after data call @ " + new Date());
        let parentElement = document.getElementById("chatBoxMessages");
        parentElement.innerHTML = "";
        let childElement;
        for( let iTop5 = 4; iTop5 >= 0; iTop5--){
            // console.log(iTop5 + ' ' + chatBoxMessageData[iTop5.toString()]);
            // console.log(iTop5 + ' ' + Object.keys(chatBoxMessageData)[iTop5]);
            // console.log(iTop5 + ' ' + chatBoxMessageData[   Object.keys(chatBoxMessageData)[iTop5]   ]);
            childElement = document.createElement("p");

            // [user:datetime] msg...
            // [created_by:created_at] message
            let objNewTagData = chatBoxMessageData[   Object.keys(chatBoxMessageData)[iTop5]   ];
            let newHTMLContents = "[" + objNewTagData.created_by + ":" + objNewTagData.created_at + ']  ' + objNewTagData.message;

            childElement.innerHTML = newHTMLContents;
            parentElement.appendChild(childElement);

            
        }        
    } else {
        let parentElement = document.getElementById("chatBoxMessages");
        if (blnAutomaticGet) {
            parentElement.innerHTML = "Server Not Responding";
        } else {
            parentElement.innerHTML = "Auto Data Refresh is Off";
        }
    }
}    

function handleSend (eventObj) {
    let messageObj = {
        created_by:"George's Padawan",
        message: document.getElementById("txtMessage").value,
    }
    let messageString = JSON.stringify(messageObj);
    console.log("messageObj === " + messageString);
    webFun.httpPostAsync ("http://localhost:3000/messages", messageString, displayPostFeedback);
}

function displayPostFeedback (thePostFnCallResponse) {
    document.getElementById('debugTxt').innerHTML = "Server Response to Sent Msg === " + thePostFnCallResponse;
    refreshData ();    
}



//  Note:  I am intentionally "fetching" the data "BEFORE" the page is loaded...  why?
//         ... because I want the "getting" of the data to run concurrently with the "loading" of the DOM
//         This will reduce the overall load time of the page, increasing user satisfaction & retention0  
if (blnAutomaticGet){
    refreshData ();
}

// onDOMContentLoaded ... i.e. HTML DOM is ready
//    ... here is where you "start" all your JS for the page "if" it needs access to the DOM
document.addEventListener( 'DOMContentLoaded', () => {
    blnDOMisReady = true;

    //  since the DOM is ready, I can now bind an event to listen for any document (HTML) Web API events...

    //  i.e.  this binds [id="sendMessage"] button click event to the "handleSend" callback function
    document.getElementById("sendMessage").addEventListener( 'click', handleSend ); 
    
    document.getElementById("automaticGetStart").addEventListener( 'click', handleAutoGetStart ); 
    document.getElementById("automaticGetStop").addEventListener( 'click', handleAutoGetStop ); 
    fnUpdateAutomaticGet();
    
    refreshPage ();
} );
  

  

// file:///D:/!Geo/!Development/CodeSmith/XHR-Demystified_byGeorge2.0/index.js
// created by George 2.0 Hope on 20171006
//  ... all rights reserved ... ☺
//  ... Creative Commons with Attribution License (CC BY 3.0 US)
//  ... https://creativecommons.org/licenses/by/3.0/us/ 
