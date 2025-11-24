const canvas = document.getElementById("firstCanvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#cae9ff";
ctx.lineWidth = 5;
ctx.beginPath();
ctx.moveTo(60, 0);
ctx.lineTo(150, 0);
ctx.lineTo(250, 130);
ctx.stroke();
const canvas2 = document.getElementById("secondCanvas");
const ctx2 = canvas2.getContext("2d");
ctx2.strokeStyle = "#cae9ff"
ctx2.lineWidth = 2;
ctx2.beginPath();
ctx2.moveTo(0, 100);
ctx2.lineTo(150, 100);
ctx2.lineTo(250, 50);
ctx2.stroke();
const canvas3 = document.getElementById("thirdCanvas");
const ctx3 = canvas3.getContext("2d");
ctx3.strokeStyle = "#cae9ff";
ctx3.lineWidth = 2;
ctx3.beginPath();
ctx3.moveTo(0, 130);
ctx3.lineTo(60, 90);
ctx3.lineTo(180, 90);
ctx3.stroke();
const canvas4 = document.getElementById("fourthCanvas");
const ctx4 = canvas4.getContext("2d");
ctx4.strokeStyle = "#cae9ff";
ctx4.lineWidth = 2;
ctx4.beginPath();
ctx4.moveTo(0, 0);
ctx4.lineTo(50, 150);
ctx4.lineTo(110, 150);
ctx4.stroke();
let hint = document.querySelector("#hint");
const point = document.querySelector("#point");
let info = document.querySelector("#info");
const point2 = document.querySelector("#point2");
let info2 = document.querySelector("#info2");
const point3 = document.querySelector("#point3");
let info3 = document.querySelector("#info3");
const point4 = document.querySelector("#point4");
let info4 = document.querySelector("#info4");
point.addEventListener('click', () => turnVisible(info));
point2.addEventListener('click', () => turnVisible(info2));
point3.addEventListener('click', () => turnVisible(info3));
point4.addEventListener('click', () => turnVisible(info4));
function turnVisible(infoVariable)
{
	hint.style.visibility = "hidden";
	const loadCss = getComputedStyle(infoVariable).visibility;
	if (loadCss === "hidden")
	{
		infoVariable.style.visibility = "visible";
	}
	else
	{
		infoVariable.style.visibility = "hidden";
	}
}