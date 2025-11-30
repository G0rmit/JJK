const canvas = document.getElementById("firstCanvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#cae9ff";
ctx.lineWidth = 4
ctx.beginPath();
ctx.moveTo(250, 20);          
ctx.lineTo(150, 100);     
ctx.lineTo(50, 100);      
ctx.stroke();

const canvas2 = document.getElementById("secondCanvas");
const ctx2 = canvas2.getContext("2d");
ctx2.strokeStyle = "#cae9ff"
ctx2.lineWidth = 3;
ctx2.beginPath();
ctx2.moveTo(0, 120);
ctx2.lineTo(150, 120);
ctx2.lineTo(210, 0);
ctx2.stroke();

const canvas3 = document.getElementById("thirdCanvas");
const ctx3 = canvas3.getContext("2d");
ctx3.strokeStyle = "#cae9ff";
ctx3.lineWidth = 3;
ctx3.beginPath();
ctx3.moveTo(18, 100);
ctx3.lineTo(60, 60);
ctx3.lineTo(190, 60);
ctx3.stroke();

const canvas4 = document.getElementById("fourthCanvas");
const ctx4 = canvas4.getContext("2d");
ctx4.strokeStyle = "#cae9ff";
ctx4.lineWidth = 2;
ctx4.beginPath();
ctx4.moveTo(50, 60);
ctx4.lineTo(70, 120);
ctx4.lineTo(110, 120);
ctx4.stroke();

