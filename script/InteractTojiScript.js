"use strict"
/*getting all elements from html*/
const beforeQuiz = document.getElementById('beforeQuiz');
const quiz = document.getElementById('quiz');
const start = document.getElementById('startButton')
let currentIndex = 0;
const questionContainer = document.getElementById('question');
let tojiReaction = document.getElementById('image');
let count = 0;
const afterQuiz = document.getElementById('afterQuiz');
let score = document.getElementById('score');
/*creating the list of answer buttons*/
const options = [
	document.getElementById('q1'),
	document.getElementById('q2'),
	document.getElementById('q3'),
	document.getElementById('q4')
];
/*creating an array of objects(questions), answers and right indexes to switch them between rounds*/
const quizData = [
	{
		question: "1/5: Which prominent sorcerer clan was Toji Fushiguro originally a member of before he left?",
		answers: ["A) The Gojo Clan", "B) The Kamo Clan", "C) The Zenin Clan", "D) The Inumaki Clan"],
		correctIndex: 2
	},
	{
		question: "2/5: Who is Toji Fushiguro's son?",
		answers: ["A) Yuji Itadori", "B) Yuta Okkotsu", "C) Megumi Fushiguro", "D) Toge Inumaki"],
		correctIndex: 2
	},
	{
		question: "3/5: Toji possesses a 'Heavenly Restriction' that grants him immense physical prowess and sharpened senses. What did he sacrifice in exchange for this power?",
		answers: ["A) His ability to see cursed spirits entirely", "B) All of his cursed energy, leaving him with zero", "C) His lifespan, limiting him to a very short life", "D) The ability to use any form of cursed tools"],
		correctIndex: 1
	},
	{
		question: "4/5: Toji wields a special grade cursed tool called the 'Inverted Spear of Heaven.' What is the unique ability of this weapon?",
		answers: ["A) It cuts directly through the soul, ignoring physical toughness", "B) It extends infinitely as long as the back end is hidden", "C) It forces the opponent to forcibly switch places with the user", "D) It completely nullifies any cursed technique it comes into contact with"],
		correctIndex: 3
	},
	{
		question: "5/5: How does Toji carry his massive arsenal of cursed tools without being detected by sorcerers who can sense cursed energy, such as the 'Six Eyes'?",
		answers: ["A) He keeps them inside a 'Inventory Curse' spirit, which he can swallow to mask its energy with his own body", "B) He uses a Binding Vow that makes his weapons invisible to the naked eye until he swings them", "C) He stores them in a shadow dimension accessible only through his bloodline", "D) He wraps them in high-grade talismans that suppress all magical signatures"],
		correctIndex: 0
	}
]
/*add event to start quiz if the button Start is pressed*/
start.addEventListener('click', quizStart);
/*function to change screens and start the game*/
function quizStart(){
	beforeQuiz.style.display = 'none';
	quiz.style.display = 'block';
	game();
}
/*function to get data from array for current question(index). Switching qestion and answer options, cheking if the answer is right when the answer box is clicked, and returning answer buttons normal clicking functional*/
function game(){
	tojiReaction.src = '../assets/tojiThinking.jpg';
	const data = quizData[currentIndex]; /*getting data for current question round*/
	questionContainer.innerText = data.question;
	/*giving answer option for each answer button*/
	options.forEach((q, index) => {
		q.innerText = data.answers[index];
		q.onclick = () => checkAnswer(index);
		q.style.pointerEvents = 'auto';
	})
}
/*function to check if the answer is right, count the score, decide if the game is finished, freeze buttons while checking answer, switching toji picture depending on answer*/
function checkAnswer(selectedIndex){
	options.forEach(q => {
        q.style.pointerEvents = 'none'; /*freeze the button, preventing user from multiclicking it*/
    });
	const correctIndex = quizData[currentIndex].correctIndex;
	const selectedAnswer = options[selectedIndex];
	/*if the answers was chosen correctly*/
	if (selectedIndex === correctIndex){
		count++;
		tojiReaction.src = "../assets/happyToji.jpg";
		selectedAnswer.style.color = 'white';
		selectedAnswer.style.backgroundColor = 'green';
	}
	/*if the answer was incorrect*/
	else{
		selectedAnswer.style.color = 'white';
		selectedAnswer.style.backgroundColor = 'red';
		tojiReaction.src = "../assets/angryToji.jpg";
	}
	/*function to make a 1.5s delay for user to see if his answer is right(green) or wrong(red) before deciding if the game is over or no*/
	setTimeout(() => {
		/*reset answer buttons colors*/
		selectedAnswer.style.color = '';
		selectedAnswer.style.backgroundColor = '';
		currentIndex++;
		/*check if it's the last round*/
		if (currentIndex < quizData.length){
			game();
		}
		else{
			afterQuiz.style.display = 'block';
			quiz.style.display = 'none';
			/*decide on the result message after quiz, based on the user's count(score)*/
			if (count >= 3){
				score.innerText = 'You scored ' + count + '/5, which means you passed the test! Good job!';
			}
			else{
				score.innerText = "You scored " + count + "/5, which means you didn't pass the test. Try one more time!";
			}
		}
	}, 1500);
}
/*function to make form work and thank the user for a review*/
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