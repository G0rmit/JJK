/*Pavlo Kvartiuk*/
"use strict"
let answerButton = document.getElementById("button");
answerButton.addEventListener("click", validateRating);
function validateRating(){
	event.preventDefault();
	let selected = document.querySelector("input[name='rating']:checked");
	let message = document.querySelector("#message");
	const name = document.querySelector("#name").value;
	if (!selected){
		message.innerText = "Please make a selection:";
	}
	else {
		message.innerText = "Thank you " + name + " for giving " + selected.value + " star(s)";
	}
}