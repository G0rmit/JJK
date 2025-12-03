// Anime character data
const characters = [
    { 
        id: 1, 
        name: "Gojo Satoru", 
        image: "../assets/assets/gojo.webp", 
        strength: 85, 
        speed: 95, 
        defense: 90, 
        cursedEnergy: 100, 
        intelligence: 95, 
        type: "jujutsu" 
    },
    { 
        id: 2, 
        name: "Toji Fushiguro", 
        image: "../assets/assets/toji.webp", 
        strength: 90, 
        speed: 92, 
        defense: 85, 
        weapons: 95, 
        intelligence: 80, 
        type: "physical" 
    },
    { 
        id: 3, 
        name: "Goku", 
        image: "../assets/assets/goku.png", 
        strength: 100, 
        speed: 95, 
        defense: 90, 
        ki: 100, 
        intelligence: 60, 
        type: "saiyan" 
    },
    { 
        id: 4, 
        name: "Sukuna", 
        image: "../assets/assets/sukuna.jpg", 
        strength: 95, 
        speed: 90, 
        defense: 85, 
        cursedEnergy: 100, 
        intelligence: 90, 
        type: "jujutsu" 
    },
    { 
        id: 5, 
        name: "Naruto", 
        image: "../assets/assets/naruto.jpg", 
        strength: 90, 
        speed: 88, 
        defense: 85, 
        chakra: 95, 
        intelligence: 75, 
        type: "ninja" 
    },
    { 
        id: 6, 
        name: "Luffy", 
        image: "../assets/assets/luffy.jpeg", 
        strength: 92, 
        speed: 85, 
        defense: 90, 
        haki: 95, 
        intelligence: 50, 
        type: "pirate" 
    },
    { 
        id: 7, 
        name: "Ichigo", 
        image: "../assets/assets/ichigo.jpg", 
        strength: 88, 
        speed: 92, 
        defense: 85, 
        reiatsu: 95, 
        intelligence: 70, 
        type: "shinigami" 
    },
    { 
        id: 8, 
        name: "Rimuru", 
        image: "../assets/assets/rimuru.webp", 
        strength: 85, 
        speed: 90, 
        defense: 95, 
        magic: 100, 
        intelligence: 95, 
        type: "slime" 
    }
];

// DOM Elements
const characterOptions = document.querySelectorAll('.character-option');
const fightButton = document.getElementById('fightButton');
const wheelCircle = document.getElementById('wheelCircle');
const resultContainer = document.getElementById('resultContainer');
const versusArea = document.getElementById('versusArea');
const winnerText = document.getElementById('winnerText');
const historyList = document.getElementById('historyList');

// Game state
let selectedCharacter = null;
let wheelCharacters = [];
let selectedOpponent = null;
let isSpinning = false;

// Initialize the wheel with anime characters (excluding Gojo and Toji)
function initializeWheel() {
    wheelCircle.innerHTML = '';
    // Get random anime characters for the wheel (excluding characters 1 and 2 - Gojo and Toji)
    wheelCharacters = characters.filter(char => char.id > 2)
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    
    // Create segments for the wheel
    const segmentAngle = 360 / wheelCharacters.length;
    
    wheelCharacters.forEach((character, index) => {
        const angle = index * segmentAngle;
        const segment = document.createElement('div');
        segment.className = 'wheel-character';
        // Try different placement - simpler approach
        segment.style.transform = `rotate(${angle}deg) translate(130px) rotate(-${angle}deg)`;
        segment.innerHTML = `
            <img src="${character.image}" alt="${character.name}">
            <p class="wheel-character-name">${character.name}</p>
        `;
        wheelCircle.appendChild(segment);
    });
}

// Handle character selection
characterOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remove selection from all options
        characterOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        this.classList.add('selected');
        
        // Get selected character ID
        const characterId = parseInt(this.getAttribute('data-id'));
        selectedCharacter = characters.find(char => char.id === characterId);
        
        // Enable the fight button
        fightButton.disabled = false;
    });
    
    // Add keyboard support
    option.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Handle fight button click
fightButton.addEventListener('click', function() {
    if (!selectedCharacter || isSpinning) return;
    
    // Disable button during spin
    fightButton.disabled = true;
    isSpinning = true;
    
    // Select a random opponent from the wheel
    const randomIndex = Math.floor(Math.random() * wheelCharacters.length);
    selectedOpponent = wheelCharacters[randomIndex];
    
    // SIMPLIFIED CALCULATION
    const segmentAngle = 360 / wheelCharacters.length;
    // Each character occupies a segment. Pointer is at 0° (top)
    // We want to land with the selected character at the pointer
    const targetStopAngle = randomIndex * segmentAngle;
    const fullRotations = 5;
    
    // Reset and spin
    wheelCircle.style.transition = 'none';
    wheelCircle.style.transform = 'rotate(0deg)';
    void wheelCircle.offsetWidth;
    
    wheelCircle.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.18, 0.99)';
    // Spin backwards to land at pointer
    const spinAngle = -(360 * fullRotations + targetStopAngle);
    wheelCircle.style.transform = `rotate(${spinAngle}deg)`;
    
    // After spin completes, show result
    setTimeout(() => {
        isSpinning = false;
        fightButton.disabled = false;
        determineWinner();
    }, 4000);
});

// Determine the winner based on character stats
function determineWinner() {
    // Calculate total power for each character
    const playerPower = selectedCharacter.strength + selectedCharacter.speed + 
                      selectedCharacter.defense + (selectedCharacter.cursedEnergy || selectedCharacter.weapons || 0);
    
    const opponentPower = selectedOpponent.strength + selectedOpponent.speed + 
                         selectedOpponent.defense + (selectedOpponent.ki || selectedOpponent.cursedEnergy || 
                         selectedOpponent.chakra || selectedOpponent.haki || 
                         selectedOpponent.reiatsu || selectedOpponent.magic || 0);
    
    // Add some randomness to make it interesting
    const playerFinal = playerPower + Math.floor(Math.random() * 30);
    const opponentFinal = opponentPower + Math.floor(Math.random() * 30);
    
    // Determine winner
    let winner, loser;
    if (playerFinal > opponentFinal) {
        winner = selectedCharacter;
        loser = selectedOpponent;
    } else if (opponentFinal > playerFinal) {
        winner = selectedOpponent;
        loser = selectedCharacter;
    } else {
        // In case of a tie, randomly pick a winner
        winner = Math.random() > 0.5 ? selectedCharacter : selectedOpponent;
        loser = winner === selectedCharacter ? selectedOpponent : selectedCharacter;
    }
    
    // Display the result
    displayResult(winner, loser, playerFinal, opponentFinal);
}

// Display the fight result
function displayResult(winner, loser, playerScore, opponentScore) {
 
    resultContainer.hidden = false;
    
    
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
    
    // Set winner text
    winnerText.textContent = `${winner.name} WINS!`;
    
    // Scroll to results
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}


window.addEventListener('DOMContentLoaded', () => {
    initializeWheel();
    
    
    characterOptions[0].click();
});