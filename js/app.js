
//Enemy class
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
}

//Update enemy's position
// parameter dt = time delta between ticks
Enemy.prototype.update = function (dt) {
    //multiply enemy x position by dt -  to ensure game runs at same speed for all computers
    this.x += this.speed * dt;

    if (this.x > 550) {
        this.x = -100;
        this.speed = Math.random() * 500 + 80;
    }
    this.collisionCheck();
};

//detect the collision!
//Source : http://blog.sklambert.com/html5-canvas-game-2d-collision-detection
Enemy.prototype.collisionCheck = function () {
    if (player.x < this.x + 60 &&
        player.x + 50 > this.x &&
        player.y < this.y + 70 &&
        40 + player.y > this.y) {
        player.resetPosition();
        player.decreasePoint();
        player.decreaseLife();
    }
};

// Draw the Enemy
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//the Player, life, and point - player object will hold life and point value
class Player {
    constructor() {
        this.x = 200;
        this.y = 400;
        this.position = 50;
        this.sprite = 'images/char-princess-girl.png';
        this.life = 3;
        this.point = 0;
    }
}

// Reset player position
Player.prototype.resetPosition = function () {
    this.x = 200;
    this.y = 400;
};

//Player cannot move off game screen
Player.prototype.update = function () {

    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
        this.x = 200;
        this.y = 400;
        player.increasePoint()
    }
};

//Point increase!
Player.prototype.increasePoint = function () {
    this.point += 3
};

//Loses point
Player.prototype.decreasePoint = function () {
    this.point -= 1;
    if (this.point < 0)
        this.point = 0
};
// Loses a life
Player.prototype.decreaseLife = function () {
    this.life -= 1;
    if (this.life === 0)
        player.gameOver()
};

// Life = 0
Player.prototype.gameOver = function () {
    if (localStorage.getItem('point') == null)
        localStorage.setItem("point", this.point);
    else {
        if (localStorage.getItem('point') < this.point)
            localStorage.setItem("point", this.point);
    }
    alert('Sorry! Game Over ! \n' +
        'Score : ' + this.point + '\n' +
        'High Score : ' + localStorage.getItem('point'));
    player.restartGame()
};

// reset game after game over
Player.prototype.restartGame = function () {
    this.point = 0;
    this.life = 3;
};

// draw player on screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = 'white';
    ctx.font = "13px Arial";
    ctx.fillText('⭐️ ' + this.point, 15, 75);
    ctx.fillText('❤️ ' + this.life, 450, 75);
};

// This is the input handler
Player.prototype.handleInput = function(direction) {
    if(direction == 'left' && this.x > 0) {
        this.x -= 50;
    }
    if(direction == 'right' && this.x < 400) {
        this.x += 50;
    }
    if(direction == 'up' && this.y > 3) {
        this.y -= 50;
    }
    if(direction == 'down' && this.y < 400) {
        this.y += 50;
    }
};



// instantiation of player and enemies

//enemies in array
let allEnemies = [];
// the player object in variable
let player = new Player();

// Y-axis is the position where the enemies are coming from
let enemyY = [60, 140, 220];
let enemy;
enemyY.forEach(function (Y) {
    enemy = new Enemy(0, Y, Math.random() * 500 + 80);
    allEnemies.push(enemy);
});

// keypress Listener - listens to what keys you type
document.addEventListener('keyup', function (e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
