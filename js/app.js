var Scorces = 1;
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';

    this.x = x;
    this.y = y;

    this.speed = Math.floor((Math.random() * 200) + 100);
};

Enemy.prototype.update = function(dt) {
    if (this.x <= 505) {
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

var Player = function() {
    this.sprite = 'images/char-pink-girl.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    var self = this;


    if (this.y < 0) {
        this.reset();
        document.getElementById("scores").innerHTML = Scorces
        Scorces++
    }

    allEnemies.forEach(function(enemy) {
        if (self.x >= enemy.x - 25 && self.x <= enemy.x + 25 && self.y >= enemy.y - 25 && self.y <= enemy.y + 25) {
             self.reset();
        }
    })

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var SPAWNPOINT_x = [0, 100, 200, 300, 400];
var SPAWNPOINT_y = [300, 400];



Player.prototype.reset = function() {
    this.x = SPAWNPOINT_x[Math.floor(Math.random() * SPAWNPOINT_x.length)];
    this.y = SPAWNPOINT_y[Math.floor(Math.random() * SPAWNPOINT_y.length)];
};


var allEnemies = [];

(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());


var player = new Player();

Player.prototype.handleInput = function(key){
  this.pressedKey = key;
    var self = this;
   if (key === 'left' && this.x > 0) {
      this.x = this.x - 101;
  }

  if (key === 'right' && this.x < 350) {
      this.x = this.x + 101;
  }

  if (key === 'up' && this.y > 0) {
      this.y = this.y - 83;
  }

  if (key === 'down' && this.y < 350) {
      this.y = this.y + 83;
  }

};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
