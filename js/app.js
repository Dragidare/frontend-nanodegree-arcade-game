// 'constant' variables as sugessted in the code review
var titleWidth = 101,
    titleHeight = 83;

// Superclass for all characters as sugessted in the code review
var Chraracter = function(x, y) {
    this.x = x;
    this.y = y;
};


// Enemies our player must avoid
Enemy.prototype = new Chraracter;

function Enemy(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (playerLives > 0) {
        this.x += this.speed * dt * gameLevel;

        if (this.x > 505) {
            this.x = 0;
        }

    };


    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function

};

Player.prototype.checkCollisions = function(){
    if (
        player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >= this.x + 11) {
        playerLives -= 1;
        console.log('collided =' + playerLives);
        player.x = 202.5;
        player.y = 383;
    }
};



// Draw the character on the screen, required method for game
Chraracter.prototype.render = function() {

    if (playerLives > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        displayScoreLevel(score, gameLevel, playerLives);
    }

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype = new Chraracter;

function Player(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png'
}
// update() method
Player.prototype.update = function() {

    if (this.x > 505) {
        this.x = 505;
    }
    if (this.y > 383) {
        this.y = 383;
    }
    if (this.x > 402.5) {
        this.x = 402.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }

    if (this.y + 63 <= 0) {
        this.x = 202.5;
        this.y = 383;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);


    }

};
// render() method

// handleInput() method
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'left') {
        this.x -= titleWidth;
    }
    if (keyPressed == 'right') {
        this.x += titleWidth;
    }
    if (keyPressed == 'up') {
        this.y -= titleHeight;
    }
    if (keyPressed == 'down') {
        this.y += titleHeight;
    }
    if (keyPressed == 'space' && playerLives == 0) {
        score = 0;
        playerLives = 10;
        gameLevel = 1;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new Player(202, 385);

for (var i = 0; i <= 2; i++) {
    var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 125);

    allEnemies.push(enemy);
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//Gems our player can collect
Gem.prototype = new Chraracter;

function Gem(x, y) {
    this.x = this.x = 0 + titleWidth * Math.floor(5 * Math.random());
    this.y = this.y = 62 + titleHeight * Math.floor(3 * Math.random());
    this.sprite = 'images/GemOrange.png';
};


// update() method

Gem.prototype.update = function() {

    if (this.x > 505) {
        this.x = 505;
    }
    if (
        player.y + 131 >= this.y + 90 &&
        player.x + 25 <= this.x + 88 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 76 >= this.x + 11) {
        console.log('collected');
        score += (10 * gameLevel);
        console.log('current score: ' + score + ', current level: ' + gameLevel + ' lives: ' + playerLives);
        gem.x = 0 + titleWidth * Math.floor(5 * Math.random());
        gem.y = 62 + titleHeight * Math.floor(3 * Math.random());
    };

};

var gem = new Gem();
var score = 0;
var playerLives = 10;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('h3');


// Function to display player's score
var displayScoreLevel = function(aScore, aLevel, aLives) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score lives and level to div element
    scoreLevelDiv.innerHTML = 'Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel + ' / ' + 'Lives: ' + aLives;
    document.body.appendChild(scoreLevelDiv, firstCanvasTag[0]);
};

console.log(allEnemies);
console.log(gem);
