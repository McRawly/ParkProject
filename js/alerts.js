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
    [9, 12+ 4]]; // normal hours
 OPEN_HOURS = [
    [3, 12+ 1],
    [3, 12+ 1],
    [3, 12+ 1],
    [3, 12+ 1],
    [3, 12+ 1],
    [3, 12+ 1],
    [3, 12+ 1]]; // bearmuda hours: 3am - 13:13pm
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
   // // // console.log(weatherImg);
}

function createWeatherCallback() {
   var imgElement=document.querySelectorAll(".weather-img img");
   imgElement=imgElement[0]; // add callback to overlay, not underneath
   if (imgElement.addEventListener) {
       imgElement.addEventListener("click", updateWeather, false);
   } else if (imgElement.attachEvent) {
       imgElement.attachEvent("onclick", updateWeather);
   }
   
   // Update Image every 5 minutes
   window.setInterval(updateWeather,5*60*1000); //update every 5 minutes
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
}

// ------------------------------------------
//      MISSING PERSONS CAROUSEL
// ------------------------------------------
var missingObjDefault={fullname: "Nigheve Stoodent +dog", since: "Sep 3, 2019", sex: "Male", story:"Body disappeared: Body never found after mysterious weather condition.",reporter:"wikipedia", contact: ""};
var missingObjects = [
    {fullname: "Amelia Earhart +1", since: "July 24, 1897",sex: "Female", story:"Plane disappeared: Lockheed Model 10-E Electra. Along with co-pilot. ",reporter:"wikipedia", contact: ""},
    {fullname: "Thomas Arthur Garner +11", since: "July 10, 1945", sex: "Male", story:"Ship disappeared: US Navy PBM3S patrol seaplane, Bu. No.6545, Sqd VPB2-OTU#3",reporter:"wikipedia", contact: ""},
    {fullname: "Nigheve Stoodent +dog", since: "Sep 3, 2019", sex: "Male", story:"Body disappeared: Body never found after mysterious weather condition.",reporter:"wikipedia", contact: ""},
];
var missingPicDefault={name:"Nigheve",src:"img/alerts/missing-person.JPG"}
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
}


// Add Prev-Next Button Callbacks
function createOwlCallbacks() {
   var btns=document.getElementsByClassName("primary-btn");
    var owlPrev=btns[0];
    var owlNext=btns[1];//document.getElementById("missingBtnNext");
    if (owlPrev.addEventListener) {
        owlPrev.addEventListener("click", prev_cb, false);
        owlNext.addEventListener("click", next_cb, false);
    } else if (owlPrev.attachEvent) {
        owlPrev.attachEvent("click", prev_cb);
        owlNext.attachEvent("click", next_cb);
    }
}


// ------------------------------------------
//      MISSING TABLE
// ------------------------------------------
var missingTable = document.getElementById("missing-table");

// var missingObjDefault={
// fullname: "Nigheve Stoodent +dog", 
// since: "Sep 3, 2019", 
// sex: "Male", 
// story:"Body disappeared: Body never found after mysterious weather condition.",
// reporter:"wikipedia", 
// contact: ""};

function submitMissing(evt) {
   // data validation first
   var validity = validateForm();
   if (validity) {}
   else {
      return;
   }
   
   // add new data to end of an array (in correct places)
   
   // 1) copy data to new object
   var newMissingObj = {}; // initialize new object as copy of a default object
       newMissingObj.since = document.forms[0].elements[0].value;
       newMissingObj.fullname = document.forms[0].elements[1].value;
       newMissingObj.sex = document.forms[0].elements[2].value;
       newMissingObj.story = document.forms[0].elements[3].value;
       newMissingObj.reporter = document.forms[0].elements[4].value;
       newMissingObj.contact = document.forms[0].elements[5].value; 
   
   // 2) add new object to end of array
   missingObjects.push(newMissingObj);
   
   // update Table
   updateTable();
   
   // clear form data
   defaultForm();
   
   // // // console.log("end of submitMissing");
}

// clear inputs of form
function validateForm() {
   var validity=true;
   return validity;
}

// clear inputs of form
function defaultForm() {
   // get form element objects (order matters)
   var orderForm = document.getElementsByTagName("form")[0]; 
   
}

// add submitMissing function as "submit" event listener
function addSubmitFcn() {
   
   var orderForm = document.getElementsByTagName("form")[0]; // get 1st form object
   if (orderForm.addEventListener) {
      orderForm.addEventListener("submit", submitMissing, false);
   } else if (orderForm.attachEvent) {
      orderForm.attachEvent("onsubmit", submitMissing);
   }
   // // // console.log("added submit fcn");
   
   // clear form (reset with defaults)
   defaultForm();
}

function updateTable() {
   var headerRow="<tr><th>Date Last Seen</th> <th>Missing Person</th> <th>Sex</th> <th>Description</th> <th>Reporter</th> <th>Contact Info</th> </tr>";
   var dataRow="\n<tr><td>{0}</td> <td>{1}</td> <td>{2}</td> <td>{3}</td> <td>{4}</td> <td>{5}</td> </tr>";
   var newHtml=headerRow; 
   
   for (var i=0; i<missingObjects.length; i++) {
      var newRow=dataRow; 
      newRow=newRow.replace("{0}",missingObjects[i].since);
      newRow=newRow.replace("{1}",missingObjects[i].fullname);
      newRow=newRow.replace("{2}",missingObjects[i].sex);
      newRow=newRow.replace("{3}",missingObjects[i].story);
      newRow=newRow.replace("{4}",missingObjects[i].reporter);
      newRow=newRow.replace("{5}",missingObjects[i].contact);
      newHtml+=newRow;
   }
   document.getElementById("missing-table").innerHTML=newHtml;
   
}

// ------------------------------------------
//      ADD CALLBACKS
// ------------------------------------------
function setupPage() {
    
    updateStatus();
    // createOwlObjects();
    createOwlCallbacks();
    updateOwl();
    updateWeather();
    createWeatherCallback();
    updateTable();
    addSubmitFcn();
}

// On Load
if (window.addEventListener) {
    window.addEventListener("load", setupPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setupPage);
}



// End of alerts.js
console.log("end of alerts.js");