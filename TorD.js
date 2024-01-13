let playerNamesArray = [];
let currentPlayerIndex = 0;
let selectedCategory = "";
let playerChoicesCounter = {};
let gameStarted = false;
let usedColors = [];


function addPlayer() {
    // Adds input fields for each player based on the user's input, with a maximum of 20 players
    const numPlayers = parseInt(document.getElementById("numPlayers").value);

    if (numPlayers > 20) {
        alert("Error: Number of players cannot exceed 20.");
        return;
    }

    const playerInputContainer = document.getElementById("playerInputContainer");

    // Clear existing content
    playerInputContainer.innerHTML = "";

    // Create input fields for each player
    for (let i = 1; i <= numPlayers; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Player ${i}`;
        playerInputContainer.appendChild(input);
    }

    // Hide the "Add Player Names" button
    const addPlayerButton = document.getElementById("addPlayerButton");
    addPlayerButton.style.display = "none";
}



// start the game
function startGame() {
    playerNamesArray = [];
    currentPlayerIndex = 0;
    selectedCategory = document.getElementById("category").value;

    const playerInputs = document.getElementById("playerInputContainer").getElementsByTagName("input");
    for (const input of playerInputs) {
        const playerName = input.value.trim();
        if (playerName !== "") {
            playerNamesArray.push(playerName);
            playerChoicesCounter[playerName] = {
                truth: 0,
                dare: 0
            };
        }
    }

    // If no names are entered, use default names
    if (playerNamesArray.length < 1) {
        const numPlayers = Math.min(parseInt(document.getElementById("numPlayers").value), 20);
        for (let i = 1; i <= numPlayers; i++) {
            const defaultPlayerName = `Player ${i}`;
            playerNamesArray.push(defaultPlayerName);
            // Initialize counters for each default player
            playerChoicesCounter[defaultPlayerName] = { truth: 0, dare: 0 };
        }
    }

    // Hide start section and display game section
    document.getElementById("startSection").style.display = "none";
    document.getElementById("gameSection").style.display = "block";
    document.getElementById("nextPlayerContainer").style.display = "block";
    gameStarted = true;

    displayPlayerName();
    enableButtons();
}

// display the current player
function displayPlayerName() {

    const playerNameDisplay = document.getElementById("playerNameDisplay");
    playerNameDisplay.textContent = `Current Player: ${playerNamesArray[currentPlayerIndex]}`;
    const randomColor = getRandomColor();
    playerNameDisplay.style.color = randomColor;
}

function nextPlayer() {


    // Moves to the next player, clears the output, and enables Truth and Dare buttons
    const outputDiv = document.getElementById("output");
    if (outputDiv.innerHTML.trim() !== "") {
        currentPlayerIndex = (currentPlayerIndex + 1) % playerNamesArray.length;
        displayPlayerName();
        outputDiv.innerHTML = ""; // Clear the output
        enableButtons("truthButton"); // Enable Truth button
        enableButtons("dareButton"); // Enable Dare button
    }
}


function getTruth() {

    const playerName = playerNamesArray[currentPlayerIndex];

    if (!playerChoicesCounter[playerName]) {
        playerChoicesCounter[playerName] = { truth: 0, dare: 0 };
    }

    if (playerChoicesCounter[playerName].truth < 3) {
        const truth = getRandomQuestion(selectedCategory, "truth");
        displayMessage(truth);
        playerChoicesCounter[playerName].truth++;
        playerChoicesCounter[playerName].dare = 0; // Reset dare counter
        disableButtons("truthButton");
        disableButtons("dareButton");
        enableButtons("nextPlayerButton");
    } else {
        alert(`${playerName} can only choose truth 3 times in a row.`);
    }
}

function getDare() {

    const playerName = playerNamesArray[currentPlayerIndex];

    if (!playerChoicesCounter[playerName]) {
        playerChoicesCounter[playerName] = { truth: 0, dare: 0 };
    }

    if (playerChoicesCounter[playerName].dare < 3) {
        const dare = getRandomQuestion(selectedCategory, "dare");
        displayMessage(dare);
        playerChoicesCounter[playerName].dare++;
        playerChoicesCounter[playerName].truth = 0;
        disableButtons("dareButton");
        disableButtons("truthButton");
        enableButtons("nextPlayerButton");
    } else {
        alert(`${playerName} can only choose dare 3 times in a row.`);
    }
}



// random question/dare

function getRandomQuestion(category, type) {

    // Replace with databaseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

    const questions = {
        general: {
            truth: [
                "If you could have dinner with any historical figure, who would it be?",
                "What's the most adventurous thing you've ever done?",
                "If you were a superhero, what would your superpower be?"
            ],
            dare: [
                "Do your best impression of a famous celebrity.",
                "Create a 30-second commercial for a quirky product of your choice.",
                "Send a funny selfie to the second person in your contact list."
            ]
        },
        funny: {
            truth: [
                "If your life was a sitcom, what would the title be?",
                "Tell us about a moment that made you laugh uncontrollably.",
                "What's the funniest joke you know by heart?"
            ],
            dare: [
                "Speak in rhyme for the next three rounds.",
                "Wear a funny hat for the rest of the game.",
                "Send a funny voice message to the last person you called."
            ]
        },
        embarrassing: {
            truth: [
                "What's your most embarrassing childhood nickname?",
                "Have you ever accidentally sent a message to the wrong person?",
                "Share a story about a time you got caught doing something you shouldn't."
            ],
            dare: [
                "Perform an interpretive dance of an embarrassing moment from your past.",
                "Wear your clothes backward for the next three rounds.",
                "Tell a dramatic story about a fictional embarrassing moment."
            ]
        }

    };

    const categoryQuestions = questions[category] || {};
    const typeQuestions = categoryQuestions[type] || [];

    if (typeQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * typeQuestions.length);
        return typeQuestions[randomIndex];
    } else {
        return `No ${type} questions available for the selected category.`;
    }
}

// Function to display a message in the output div
function displayMessage(message) {
    // Enhance this function based on your requirements (e.g., different message formats or styles)
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `<p>${message}</p>`;
}



// Function to disable buttons
function disableButtons(buttonId) {
    const button = document.getElementById(buttonId);
    button.disabled = true;
    button.style.backgroundColor = "#eeeeee"; // Change button color to indicate it's disabled
}

// Function to enable buttons
function enableButtons(buttonId) {
    const button = document.getElementById(buttonId);
    button.disabled = false;
    button.style.backgroundColor = "#4CAF50"; // Reset button color
}

// Function to get a random color
function getRandomColor() {
    const colors = [
        "red", "blue", "green", "purple", "orange", "yellow",
        "pink", "brown", "cyan", "magenta", "teal", "lime",
        "indigo", "maroon", "navy", "olive", "silver", "aqua"
    ];

    // Filter out used colors
    const availableColors = colors.filter(color => !usedColors.includes(color));

    if (availableColors.length === 0) {
        // All colors are used, reset the used colors
        usedColors = [];
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const selectedColor = availableColors[randomIndex];

    // Mark the selected color as used
    usedColors.push(selectedColor);

    return selectedColor;
}