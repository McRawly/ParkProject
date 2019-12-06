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
// updateWeather creates a new URL that points to the theoretically most recent NASA image file.
// The NASA weather image has a format as follows:
// "https://weather.msfc.nasa.gov/goes/abi/thumb/GOES16_abi_conus_20191204_233616_band13.jpg"
// Assigns this new URL to the existing hardcoded value in the HTML. 

   // initialize
   var wDate = new Date(); // get current date time
   
   // subtract 5 minutes before searching for valid image
   var durationInMinutes = 5;
   var MS_PER_MINUTE = 60000;
   var wDate = new Date ( wDate - durationInMinutes * MS_PER_MINUTE );

   // Find nearest image (ends in 6 or 1) and subtrcat the difference in minutes from now until then.
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
   var imgElement=document.querySelectorAll(".weather-img img"); //class ="weather-img" filter all "img" tags
   imgElement[0].src=weatherImg;
   
}

function createWeatherCallback() {
// Adds event listener to the weather image "img" element 
// so when you click it, it will call "updateWeather"
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
 // Updates Park Status as "Open" or "Closed" based on time of day. 
 // Uses OPEN_HOURS global variable constant to define open hours.
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
/* 
 * Declare two paralell arrays representing missing persons:
 * 1) missingObjects = object with properties: 
 *     fullname, since, sex, story, reporter, contact
 * 2) missingPics = object with properties:
 *     name, src
 */
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
var owlNum = 0; // which missing person object to show

// Grab object pointers of relevant HTML elements (all are arrays of objects)
var missingName=document.getElementsByName("missing-name");
var missingDate=document.getElementsByName("missing-date");
var missingSex=document.getElementsByName("missing-sex");
var missingList=document.getElementsByName("missing-list");
var missingImg = document.querySelectorAll(".room-pic img");

// Define callbacks for next and preivous buttons:
// They each increment or decrement global variable owlNum,
// then call "updateOwl" which updates HTML elements. 
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


// Add Prev-Next Button Callbacks as click event listeners
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
/* Table that lists each person in the missingObjects array. */

// Get table HTML element object pointer
var missingTable = document.getElementById("missing-table");

// var missingObjDefault={
// fullname: "Nigheve Stoodent +dog", 
// since: "Sep 3, 2019", 
// sex: "Male", 
// story:"Body disappeared: Body never found after mysterious weather condition.",
// reporter:"wikipedia", 
// contact: ""};

function submitMissing(evt) {
   // prevent form from submitting
   if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}
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
   
}

// clear inputs of form
function validateForm() {
   var validity=true;
   return validity;
}

// clear inputs of form
function defaultForm() {
   // get form element objects (order matters)
   var submitForm = document.getElementsByTagName("form")[0]; 
    submitForm.elements[0].value="";
    submitForm.elements[1].value="";
    submitForm.elements[2].value="";
    submitForm.elements[3].value="";
    submitForm.elements[4].value="";
    submitForm.elements[5].value=""; 
}

// add submitMissing function as "submit" event listener
function addSubmitFcn() {
   
   var submitForm = document.getElementsByTagName("form")[0]; // get 1st form object
   if (submitForm.addEventListener) {
      submitForm.addEventListener("submit", submitMissing, false);
   } else if (submitForm.attachEvent) {
      submitForm.attachEvent("onsubmit", submitMissing);
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



// // End of alerts.js
// console.log("end of alerts.js");