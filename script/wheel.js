'use strict';//makes sure ur code is written properly
// okay so heres all the anime characters in an array
// each one's an object with their stats n stuff
const characters = [
    { id: 1, name: "Gojo Satoru", image: "../assets/assets/gojo.webp", strength: 85, speed: 80, defense: 90, cursedEnergy: 100, intelligence: 85, type: "jujutsu" },
    { id: 2, name: "Toji Fushiguro", image: "../assets/assets/toji.webp", strength: 75, speed: 80, defense: 70, weapons: 80, intelligence: 80, type: "physical" },
    { id: 3, name: "Goku", image: "../assets/assets/goku.png", strength: 100, speed: 100, defense: 100, ki: 100, intelligence: 60, type: "saiyan" },
    { id: 4, name: "Sukuna", image: "../assets/assets/sukuna.jpg", strength: 95, speed: 90, defense: 80, cursedEnergy: 100, intelligence: 90, type: "jujutsu" },
    { id: 5, name: "Naruto", image: "../assets/assets/naruto.jpg", strength: 80, speed: 90, defense: 85, chakra: 95, intelligence: 75, type: "ninja" },
    { id: 6, name: "Luffy", image: "../assets/assets/luffy.jpeg", strength: 75, speed: 85, defense: 90, haki: 85, intelligence: 50, type: "pirate" },
    { id: 7, name: "Ichigo", image: "../assets/assets/ichigo.jpg", strength: 88, speed: 92, defense: 85, reiatsu: 95, intelligence: 70, type: "shinigami" },
    { id: 8, name: "Rimuru", image: "../assets/assets/rimuru.webp", strength: 100, speed: 100, defense: 100, magic: 100, intelligence: 100, type: "slime" }
];

// grabbing stuff from the html page
const characterOptions = document.querySelectorAll('.character-option');
const fightButton = document.getElementById('fightButton');
const wheelCircle = document.getElementById('wheelCircle');
const resultContainer = document.getElementById('resultContainer');
const versusArea = document.getElementById('versusArea');
const winnerText = document.getElementById('winnerText');

// variables to keep track of whats happening
// these get updated as the user interacts
let selectedCharacter = null;      // which character the player picked
let wheelCharacters = [];          // characyers that are on the wheel
let selectedOpponent = null;       // who the wheel lands on
let isSpinning = false;            // so we dont spin twice at once

// sets up the wheel with 6 characters
function initializeWheel() {
    wheelCircle.innerHTML = ''; // clears any old stuff
    
    // filters out gojo and toji (ids 1 and 2) cause theyre player choices
    // sort with random shuffles the array
    // slice takes first 6 after shuffling
    wheelCharacters = characters.filter(char => char.id > 2).sort(() => 0.5 - Math.random()).slice(0, 6);
    
    const segmentAngle = 360 / wheelCharacters.length; // divides circle evenly for each character
    
    // puts each character around the wheel
    wheelCharacters.forEach((character, index) => {
        const angle = index * segmentAngle;
        const segment = document.createElement('div');
        segment.className = 'wheel-character';
        // the math here positions them in a circle
        // first rotate, then move out 130px, then rotate back so they face center
        segment.style.transform = `rotate(${angle}deg) translate(130px) rotate(-${angle}deg)`;
        segment.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p class="wheel-character-name">${character.name}</p>
        `;
        wheelCircle.appendChild(segment); // adds to the wheel
    });
}

// makes the character buttons clickable
characterOptions.forEach(option => {
    // click event for selecting a character
    option.addEventListener('click', function() {
        // removes 'selected' class from all options first
        characterOptions.forEach(opt => opt.classList.remove('selected'));
        
        // adds 'selected' class to clicked one
        this.classList.add('selected');
        
        // gets the character id from the html data attribute
        const characterId = parseInt(this.getAttribute('data-id'));
        // finds the matching character object in the array
        selectedCharacter = characters.find(char => char.id === characterId);
        
        // enables the fight button now that we have a character
        fightButton.disabled = false;
    });
    
    // enter or space also selects if u want to use keyboard
    option.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// when fight button is clicked
fightButton.addEventListener('click', function() {
    // stops if no character selected or wheel already spinning
    if (!selectedCharacter || isSpinning) return;
    fightButton.disabled = true;
    isSpinning = true;
	
    // picks random opponent from the wheel
    const randomIndex = Math.floor(Math.random() * wheelCharacters.length);
    selectedOpponent = wheelCharacters[randomIndex];

    const segmentAngle = 360 / wheelCharacters.length;
    const targetStopAngle = randomIndex * segmentAngle;
    const fullRotations = 5; // spins 5 full times for visual effect
    
    // resets wheel position
    wheelCircle.style.transition = 'none';
    wheelCircle.style.transform = 'rotate(0deg)';
    void wheelCircle.offsetWidth; // forces browser to notice the change
    
    // does the spin animation
    wheelCircle.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.18, 0.99)';
    const spinAngle = -(360 * fullRotations + targetStopAngle);
    wheelCircle.style.transform = `rotate(${spinAngle}deg)`;
    
    // after 4 seconds, figure out who won
    setTimeout(() => {
        isSpinning = false;
        fightButton.disabled = false;
        determineWinner();
    }, 4000);
});

// figures out who wins the fight
function determineWinner() {
    // adds up all the player's stats
    // the || 0 handles characters that dont have cursedEnergy property
    const playerPower = selectedCharacter.strength + selectedCharacter.speed + selectedCharacter.defense + (selectedCharacter.cursedEnergy || selectedCharacter.weapons || 0);
    
    // adds up opponent's stats
    // checks different energy types since characters are from different anime
    const opponentPower = selectedOpponent.strength + selectedOpponent.speed + selectedOpponent.defense + (selectedOpponent.ki || selectedOpponent.cursedEnergy || selectedOpponent.chakra || selectedOpponent.haki || selectedOpponent.reiatsu || selectedOpponent.magic || 0);
    
    let winner, loser;
    
    // simple comparison
    if (playerPower > opponentPower) {
        winner = selectedCharacter;
        loser = selectedOpponent;
    } else if (opponentPower > playerPower) {
        winner = selectedOpponent;
        loser = selectedCharacter;
    } else {
        // tie - randomly picks winner
        winner = Math.random() > 0.5 ? selectedCharacter : selectedOpponent;
        loser = winner === selectedCharacter ? selectedOpponent : selectedCharacter;
    }
    
    // shows the results
    displayResult(winner, loser, playerPower, opponentPower);
}

// shows the fight results on the page
function displayResult(winner, loser, playerScore, opponentScore) {
    resultContainer.hidden = false; // makes results visible
    
    // builds html for the vs display
    // ternary operator adds 'winner' or 'loser' class based on who won
    versusArea.innerHTML = `
        <article class="fighter">
            <img src="${selectedCharacter.image}" class="fighter-image ${winner === selectedCharacter ? 'winner' : 'loser'}" alt="${selectedCharacter.name}">
            <h3 class="character-name">${selectedCharacter.name}</h3>
            <ul class="character-stats">
                <li class="stat">
                    Power
                    <strong class="stat-value">${playerScore}</strong>
                </li>
            </ul>
        </article>
        <p class="vs-text">VS</p>
        <article class="fighter">
            <img src="${selectedOpponent.image}" class="fighter-image ${winner === selectedOpponent ? 'winner' : 'loser'}" alt="${selectedOpponent.name}">
            <h3 class="character-name">${selectedOpponent.name}</h3>
            <ul class="character-stats">
                <li class="stat">
                    Power
                    <strong class="stat-value">${opponentScore}</strong>
                </li>
            </ul>
        </article>
    `;
    
    winnerText.textContent = `${winner.name} WINS!`;
    
    // scrolls to show results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

// when page loads
window.addEventListener('DOMContentLoaded', () => {
    initializeWheel();
    
    // auto-selects the first character (gojo)
    characterOptions[0].click();
});

//Vriten
// Feedback Form Functionality
const feedbackForm = document.querySelector("footer form");
if (feedbackForm) {
    const feedbackBtn = feedbackForm.querySelector("button[type='submit']");
    const emailInput = feedbackForm.querySelector("#email");
    const nameInput = feedbackForm.querySelector("#name");
    const suggestionInput = feedbackForm.querySelector("#suggestion");
    const messageH3 = feedbackForm.querySelector("#feedbackMessage");
    
    // Prevent form submission
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    
    // Handle feedback submission
    feedbackBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        const suggestion = suggestionInput.value.trim();
        
        if (!email.endsWith("@dawsoncollege.qc.ca")) {
            messageH3.textContent = "Suggestions from Dawsonites only!";
            messageH3.style.color = "#ff0033";
            return;
        }
        
        messageH3.textContent = `Thank you ${name} for your suggestion!`;
        messageH3.style.color = "#00ff00";
        
        // Clear form
        emailInput.value = "";
        nameInput.value = "";
        suggestionInput.value = "";
    });
}