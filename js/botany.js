/**
Author: Francis Mayen
Date 12/01/2019
Project: CIS 193 Final

use of arrays
use of functions 
**/

var scientific;
var common; 
var quickInfo;
var symptoms;
var buttonLink;
var specimenImg;
var plantCounter;
var plantArray;
var btnPoisonedLink = document.getElementById("btnPoison");

btnPoisonedLink.href = "botanyPoisonedNumber.html";
console.log("you are looking at " + btnPoison.href);

var hemlock ={
		sci:"Conium Maculatum", 
		comm:"Poison Hemlock", 
		info:"Eating even a small amount of any part of this plant is deadly, it is also toxic to the skin and respiratory system.", 
		symp:"Symptoms: pupil dilation, dizziness, and trembling followed by slowing of the heartbeat, paralysis of the central nervous system, muscle paralysis, and death due to respiratory failure.", 
		cure:true,
		imgs: ["hemlock01.jpg", "hemlock02.jpg", "hemlock03.jpg"] // <<------------------------------------use of arrays
	};
	
var dogbane ={
		sci: "Apocynum cannabinum",
		comm: "dogbane",
		info: "Lethal dose of dogbane or milkweed is approximately 0.05% of body weight. Fresh leaves are the most toxic, but dried leaves also contain the toxic compounds. Death from poisoning usually occurs within 12-24 hours of ingestion.",
		symp: "Symptoms: rad, weak  or otherwise abnormal pulse, depression, weakness, staggered gait, and lack of muscular control, pupil dilation, difficulty breathing, and colic, and/or blat. ",
		cure: true,
		imgs: ["dogbane01.jpg","dogbane02.jpg","dogbane03.jpg"]
	};
	
var monkshood ={
		sci: "Aconitum napellus",
		comm: "monkshood",
		info: "All parts of the plant, especially the roots, contain toxins. Symptoms occur within minutes to a few hours after swallowing.  The severity of poisoning is related to the rapid onset of life-threatening heart rhythm changes. ",
		symp: "Numbness, tingling, slow or fast heart rate, and gastrointestinal manifestations  such as nausea, vomiting, abdominal pain, and diarrhea. Respiratory paralysis and heart rhythm abnormalities can lead to death. ",
		cure: false,
		imgs:["monkshood01.jpg", "monkshood02.jpg", "monkshood03.jpg"]
	};

var nightshade ={
		sci: "Atropa Belladonna",
		comm: "Deadly Nightshade",
		info: "The root is believed to have the highest concentration of toxins.  Symptoms are slow to appear but last for several days.",
		symp: "Dryness in the mouth, thirst, difficulty swallowing and speaking, blurred vision from dilated pupils, vomiting, excessive stimulation of the heart, drowsiness, slurred speech, hallucinations, confusion, disorientation, delirium, and agitation. Coma and convulsions often precede death. ",
		cure: true,
		imgs: ["nightshade01.jpg", "nightshade02.jpg", "nightshade03.jpg"]
	};
	/*
var newPlant01 ={
		sci: 
		comm: 
		info: 
		symp: 
		cure: 
		imgs: 
	};
	
var newPlant02 ={
		sci: 
		comm: 
		info: 
		symp: 
		cure:
		imgs: 
	};
	*/
	
plantArray = [hemlock, dogbane,monkshood,nightshade];

function nextPlant (evt){ // <<----------------------------------------------------------------------use of functions
	plantCounter ++;
	if(plantCounter >= plantArray.length){
		plantCounter = 0;

	}
	displayInfo();
	poisonLink();
}
	
function prevPlant(evt){
	plantCounter --;
	if(plantCounter < 0){
		plantCounter = plantArray.length -1;
	}
	displayInfo();
	poisonLink();
}

function btnGoToLink(evt){
	var btnType = document.getElementById("btnPoison");
	document.open(btnPoisonedLink.href);
}

function poisonLink(evt){

	if(plantArray[plantCounter].cure == false){
		btnPoisonedLink.href = "botanyPoisonedTooBad.html";
	}else{
		btnPoisonedLink.href = "botanyPoisonedNumber.html";
	}
}
function createEventListeners(){
	var btnBack = document.getElementById("btnBack");
	if (btnBack.addEventListener){
		btnBack.addEventListener("click", prevPlant, false);
	}
	else if (btnBack.attachEvent){
		     btnBack.attachEvent("onclick", prevPlant);
	}

	var btnNext = document.getElementById("btnNext");
	if (btnNext.addEventListener){
		btnNext.addEventListener("click", nextPlant, false);
	}
	else if (btnNext.attachEvent){
		btnNext.attachEvent("onclick", nextPlant);
	}

	var btnPoison = document.getElementById("btnPoison");
	if (btnPoison.addEventListener){
		btnPoison.addEventListener("click", poisonLink, false);
	}
	else if (btnPoison.attachEvent){
		     btnPoison.attachEvent("onclick", poisonLink);
	}
}

function displayInfo (){
    
	document.getElementById("scientific").innerText = plantArray[plantCounter].sci;
	document.getElementById("common").innerText = plantArray[plantCounter].comm;
	document.getElementById("quickInfo").innerText = plantArray[plantCounter].info;
	document.getElementById("symptoms").innerText = plantArray[plantCounter].symp;
	
	displayPics();
}

function displayPics(){
	var pics = document.querySelectorAll(".single-room-pic img");
	for(var i = 0; i < pics.length; i++){
		//grab image name
		var a= i % plantArray[plantCounter].imgs.length;
		var imgName = plantArray[plantCounter].imgs[a]; // <<--------------------------------use of arrays
		
		//build url string	
		var fileAddress = "img/botany/" + imgName;

		// assign url to correct image element
		// var imgElem = document.getElementById("pic0"+(i+1));
		var imgElem = pics[i];
		imgElem.src = fileAddress;
	}
}

function setUpPage() {
	createEventListeners();
	plantCounter = 0;
	displayPics();
}


/* run setup function when page finishes loading */
if (window.addEventListener) {
window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
window.attachEvent("onload", setUpPage);
}
