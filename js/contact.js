/* 	Contact Validation
	Author: Valerie Gutierrez
*/

"use strict";

//validate entered email
function validateEmail() {
	var emailInput = document.getElementById("emailbox");
	var errorDiv = document.getElementById("emailError");
	var emailCheck = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/;
	try {
		if (emailCheck.test(emailInput.value) === false) {
			throw "Please provide a valid email address";
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
      	// change input style
      	emailInput.style.background = "rgb(255,233,233)";
   }
}

function createEventListeners() {
	var emailInput = document.getElementById("emailbox");
	if (emailInput.addEventListener) {
		emailInput.addEventListener("change", validateEmail, false);
	} else if (emailInput.attachEvent) {
		emailInput.attachEvent("onchange", validateEmail);
	}
}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}