// Enemies our player must avoid
var Enemy = function(x, y, speed) {
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

        checkCollision(this);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel, playerLives);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/char-boy.png'
    }
    // update() method
Player.prototype.update = function() {

    if (this.x > 505) {
        this.x = 505;
    }

};
// render() method
Player.prototype.render = function() {
    if (playerLives > 0) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// handleInput() method
Player.prototype.handleInput = function(keyPressed) {
    if (keyPressed == 'left') {
        player.x -= player.speed;
    }
    if (keyPressed == 'right') {
        player.x += player.speed;
    }
    if (keyPressed == 'up') {
        player.y -= player.speed;
    }
    if (keyPressed == 'down') {
        player.y += player.speed;
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
var player = new Player(202, 385, 50);

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


var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90 &&
        player.x + 25 <= anEnemy.x + 88 &&
        player.y + 73 <= anEnemy.y + 135 &&
        player.x + 76 >= anEnemy.x + 11) {
        playerLives -= 1;
        console.log('collided =' + playerLives);
        player.x = 202.5;
        player.y = 383;
    }

    // check for player reaching top of canvas and winning the game
    // if player wins, add 1 to the score and level
    // pass score as an argument to the increaseDifficulty function
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        console.log('you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('current score: ' + score + ', current level: ' + gameLevel);


    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

//Gems our player can collect
var Gem = function() {
    this.x = this.x = 0 + 101 * Math.floor(5 * Math.random());
    this.y = this.y = 62 + 85.5 * Math.floor(3 * Math.random());
    this.sprite = 'images/GemOrange.png';
};


// render() method
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// update() method
Gem.prototype.update = function() {

    if (this.x > 505) {
        this.x = 505;
    }
    checkCollect(this);

};

var gem = new Gem();
var score = 0;
var playerLives = 10;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('h3');

var checkCollect = function(anGem) {
    // check if playe collect a gem
    if (
        player.y + 131 >= anGem.y + 90 &&
        player.x + 25 <= anGem.x + 88 &&
        player.y + 73 <= anGem.y + 135 &&
        player.x + 76 >= anGem.x + 11) {
        console.log('collected');
        score += (10 * gameLevel);
        console.log('current score: ' + score + ', current level: ' + gameLevel + ' lives: ' + playerLives);
        gem.x = 0 + 101 * Math.floor(5 * Math.random());
        gem.y = 62 + 85.5 * Math.floor(3 * Math.random());
    };

};
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
