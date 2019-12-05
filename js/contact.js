/* 	Contact Validation
	Author: Valerie Gutierrez
*/

"use strict";

// global variables
var formValidity = true;

// validate entered name
function validateName() {
	var nameInput = document.getElementById("namebox");
	var errorDiv = document.getElementById("nameError");
	try {
		if (nameInput.value === "" || nameInput.value === nameInput.placeholder) {
			throw "Please enter your name";
		}
		// remove any name error styling and message
      	nameInput.style.background = "";
      	errorDiv.innerHTML = "";
      	errorDiv.style.display = "none";
	}
	catch(msg) {
      	// display error message
      	errorDiv.innerHTML = msg;
      	errorDiv.style.display = "block";
      	errorDiv.style.color = "red";
      	// change input style
      	nameInput.style.background = "rgb(255,233,233)";
      	formValidity = false;
	}
}

//validate entered email
function validateEmail() {
	var emailInput = document.getElementById("emailbox");
	var errorDiv = document.getElementById("emailError");
	var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	try {
		if (emailCheck.test(emailInput.value) === false || emailInput.value === emailInput.placeholder) {
			//throw "Please provide a valid email address";
			throw "Please enter a valid email address";
		}
		// remove any email error styling and message
      	emailInput.style.background = "";
      	errorDiv.innerHTML = "";
      	errorDiv.style.display = "none";
      	// convert email address to lowercase
      	emailInput.value = emailInput.value.toLowerCase();
	}
	catch(msg) {
      	// display error message
      	errorDiv.innerHTML = msg;
      	errorDiv.style.display = "block";
      	errorDiv.style.color = "red";
      	// change input style
      	emailInput.style.background = "rgb(255,233,233)";
      	formValidity = false;
   }
}

function validatePhone() {
	var phoneInput = document.getElementById("telbox");
	var errorDiv = document.getElementById("phoneError");
	//var phoneCheck = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
	var phoneCheck = /^\d{10}$/;
	try {
		//if (phoneCheck.test(phoneInput.value) === false) {
		if (isNaN(phoneInput.value) || phoneInput.value === "" || phoneInput.value === phoneInput.placeholder || phoneInput.value < 10) {
			//throw "Please provide a 10-digit phone number";
			throw "Please enter a 10-digit phone number";
		}
		// remove any phone error styling and message
		phoneInput.style.background = "";
		errorDiv.innerHTML = "";
		errorDiv.style.display = "none";
	}
	catch(msg) {
		// display error message
		errorDiv.innerHTML = msg;
		errorDiv.style.display = "block";
		errorDiv.style.color = "red";
		// change input style
		phoneInput.style.background = "rgb(255,233,233)";
		formValidity = false;
	}
}

function validateMessage() {
	//var errorDiv = document.querySelector("#message .errorMessage");
	var errorDiv = document.getElementById("msgError");
	var msgBox = document.getElementById("message");
	try {
		if (msgBox.value === "" || msgBox.value === msgBox.placeholder) {
			throw "Please enter your message text.";
		} else {
			// remove error styling and message
			errorDiv.style.display = "none";
			msgBox.style.background = "white";
		}
	}
	catch(msg) {
		// display error message
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		errorDiv.style.color = "red"
		// change input style
		msgBox.style.background = "rgb(255,233,233)";
		formValidity = false;
	}
}

function validateForm(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true; // reset value for revalidation
	validateName();
	validateEmail();
	validatePhone();
	validateMessage();
	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
		alert("\tThank you for your submission.\t\n\n You will be contacted within 13 hours.\t\n\n\t\tHave a haunting day! :)");
	} else {
		document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
		document.getElementById("errorText").style.display = "block";
		document.getElementById("errorText").style.color = "red";
		scroll(0,0);
	}
}

// create event listeners
function createEventListeners() {
	var nameInput = document.getElementById("namebox");
	var emailInput = document.getElementById("emailbox");
	var phoneInput = document.getElementById("telbox");
	var messageBox = document.getElementById("message");
	if (nameInput.addEventListener) {
		nameInput.addEventListener("change", validateName, false);
		emailInput.addEventListener("change", validateEmail, false);
		phoneInput.addEventListener("change", validatePhone, false);
		messageBox.addEventListener("change", validateMessage, false);
	} else if (nameInput.attachEvent) {
		nameInput.attachEvent("onchange", validateName);
		emailInput.attachEvent("onchange", validateEmail);
		phoneInput.attachEvent("onchange", validatePhone);
		messageBox.attachEvent("onchange", validateMessage);
	}
	
	var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", validateForm, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", validateForm);
	}
}


if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}