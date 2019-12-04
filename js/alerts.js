"use strict";


// ------------------------------------------
//      CONSTANTS
// ------------------------------------------
var OPEN_HOURS = [
    [10,12+ 4],
    [9, 12+ 5],
    [9, 12+ 5],
    [9, 12+ 5],
    [9, 12+ 5],
    [9, 12+ 5],
    [9, 12+ 4]];
var specialClose = false;


// ------------------------------------------
//      WEATHER IMAGE
// ------------------------------------------
function updateWeather() {
   var wDate = new Date();
   // subtract 5 minutes before searching for valid image
   var durationInMinutes = 5;
   var MS_PER_MINUTE = 60000;
   var wDate = new Date ( wDate - durationInMinutes * MS_PER_MINUTE );

   // Find nearest image (ends in 6 or 1)
   var M1 = wDate.getUTCMinutes(); 
   var M2 = Math.floor ((M1-1)/5) * 5 + 1;
   durationInMinutes=M1-M2;
   wDate = new Date ( wDate - durationInMinutes * MS_PER_MINUTE ); // Adjust accordingly

   // Build date for NASA image jpg
   var yyyy= wDate.getUTCFullYear();
   var mm = wDate.getUTCMonth()+1; mm = mm.toString().padStart(2,"0");
   var dd = wDate.getUTCDay()+1; dd = dd.toString().padStart(2,"0");
   var HH = wDate.getUTCHours();  HH = HH.toString().padStart(2,"0");
   var MM = wDate.getUTCMinutes(); MM = MM.toString().padStart(2,"0");
   var SS = "16";
   var weatherString = yyyy+mm+dd+"_"+HH+MM+SS; // frmt: 20191202_022116
   var weatherImg="https://weather.msfc.nasa.gov/goes/abi/thumb/GOES16_abi_conus_"+weatherString+"_band13.jpg";
   
   // Update image source
   var imgElement=document.querySelectorAll(".weather-img img");
   imgElement[0].src=weatherImg;
   console.log(weatherImg);
}

function createWeatherCallback() {
   var imgElement=document.querySelectorAll(".weather-img img");
   console.log(imgElement.length);
   imgElement=imgElement[-1]; // add callback to overlay, not underneath
   if (imgElement.addEventListener) {
       imgElement.addEventListener("click", updateWeather, false);
   } else if (imgElement.attachEvent) {
       imgElement.attachEvent("onclick", updateWeather);
   }
   
   // Update Image every 5 minutes
   window.setInterval(updateWeather,5*60*1000); //update every 5 minutes
   console.log('end of create Weather Callback');
}

/* imgElem0 = { src: "img/botany/pic1.jpg",
                  alt: "",
                  id: "pic01"};
imgElem1 = { src: "img/botany.jpg",
                  alt: "",
                  id: "pic02"};
imgElem2 = { src: "img/botany.jpg",
                  alt: "",
                  id: "pic03"};
                  
pics = [imgElem0, imgElem1, imgElem2];  */


// ------------------------------------------
//      DEFAULT STATUSES
// ------------------------------------------
var parkstatusp=document.getElementById("parkstatusp");
var parknotificationsp=document.getElementById("parknotificationsp");
var roadclosuresp=document.getElementById("roadclosuresp");
var roadhazardsp=document.getElementById("roadhazardsp");
var pathclosuresp=document.getElementById("pathclosuresp");
var pathhazardsp=document.getElementById("pathhazardsp");

function updateStatus() {
    // Park Status
    var thisTime = new Date();
    var wk=thisTime.getDay(); // weekday 0=sun,4
    var hr=thisTime.getHours(); // 0=12am-12:59, 13=1pm-1:59
    if (hr >= OPEN_HOURS[wk][0] 
      & hr <  OPEN_HOURS[wk][1] & !specialClose) {
        
        parkstatusp.innerText="Open.";
    } else {
        parkstatusp.innerText="Closed.";
    }
    console.log("inside updateStatus");
}

// ------------------------------------------
//      MISSING PERSONS CAROUSEL
// ------------------------------------------
var missingObjects = [
    {fullname: "Amelia Earhart +1", since: "July 24, 1897",sex: "Female", story:"Plane disappeared: Lockheed Model 10-E Electra. Along with co-pilot. "},
    {fullname: "Thomas Arthur Garner +11", since: "July 10, 1945", sex: "Male", story:"Ship disappeared: US Navy PBM3S patrol seaplane, Bu. No.6545, Sqd VPB2-OTU#3"},
    {fullname: "Nigheve Stoodent +dog", since: "Sep 3, 2019", sex: "Male", story:"Body disappeared: Body never found after mysterious weather condition."},
];
var missingPics = [
    {name:"Amelia",src:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg/330px-Amelia_Earhart_standing_under_nose_of_her_Lockheed_Model_10-E_Electra%2C_small.jpg"},
    {name:"Thomas",src:"https://upload.wikimedia.org/wikipedia/commons/1/1a/Thomas_Arthur_Garner.jpg"},
    {name:"Nigheve",src:"img/alerts/missing-person.JPG"}
];
var owlNum = 0;

var missingName=document.getElementsByName("missing-name");
var missingDate=document.getElementsByName("missing-date");
var missingSex=document.getElementsByName("missing-sex");
var missingList=document.getElementsByName("missing-list");
var missingImg = document.querySelectorAll(".room-pic img");

function prev_cb (evt) {
    owlNum--; //decrement counter
    if (owlNum < 0) {
        owlNum = missingObjects.length-1;
    }
    updateOwl();
}
function next_cb (evt) {
    owlNum++; //increment counter
    if (owlNum >= missingObjects.length) {
        owlNum = 0;
    }
    updateOwl();
}
function updateOwl () {
    missingName[0].innerText=missingObjects[owlNum].fullname;
    missingDate[0].innerText=missingObjects[owlNum].since;
    missingList[0].innerText=missingObjects[owlNum].sex;
    missingList[1].innerText=missingObjects[owlNum].story;
    missingImg[0].src = missingPics[owlNum].src;
    console.log("updates");
}


// Add Prev-Next Button Callbacks
function createOwlCallbacks() {
   var btns=document.getElementsByClassName("primary-btn");
    var owlPrev=btns[0];
    var owlNext=btns[1];//document.getElementById("missingBtnNext");
    if (owlNext) {
        console.log("exists");
    } else {
        console.log("dne");
    }
    if (owlPrev.addEventListener) {
        owlPrev.addEventListener("click", prev_cb, false);
        owlNext.addEventListener("click", next_cb, false);
        console.log("added el v1");
    } else if (owlPrev.attachEvent) {
        owlPrev.attachEvent("click", prev_cb);
        owlNext.attachEvent("click", next_cb);
        console.log("added el v2");
    }
}

// ------------------------------------------
//      ADD CALLBACKS
// ------------------------------------------
function setupPage() {
    console.log("inside setupPage");
    updateStatus();
    // createOwlObjects();
    createOwlCallbacks();
    updateOwl();
    updateWeather();
    createWeatherCallback();
}

// On Load
if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setupPage);
}



// End of alerts.js
console.log("end of alerts.js");