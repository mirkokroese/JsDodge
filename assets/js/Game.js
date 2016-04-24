'use strict';
var Game = function () {
    this.fps = 60;
    this.moveSpeed = 6.3;
    this.enemySpawnTime = 5;
    this.running = false;
    this._intervalId = null;
    this._roundTimer = null;
    this._roundTimer = null;
    this.canvas = document.getElementById('c');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(this);
    this.enemies = [];
    this.canvas = new Canvas();
    this.controller = new Controller();
    this.level = 0;
    this.bgSound = null;;
};

Game.prototype.draw = function() {
    if (this.canvas.get().getContext) {

        this.ctx.clearRect(0,0,this.canvas.getWidth(),this.canvas.getHeight());
        this.ctx.drawImage(this.player.image, this.player.getX(), this.player.getY());
        for (var i = 0; i < this.enemies.length; i++) {
            this.ctx.drawImage(this.enemies[i].image, this.enemies[i].getX(), this.enemies[i].getY());
        }
        // Health background
        this.ctx.fillStyle = "#c0392b";
        this.ctx.fillRect(30,30,300,30);
        // Health bar
        this.ctx.fillStyle = "#2ecc71";
        this.ctx.fillRect(30,30,(300 / 100) * this.player.health,30);
        // Health text
        this.ctx.fillStyle = "#EFEFEF";
        this.ctx.font = "30px Arial";
        this.ctx.fillText("HEALTH", 350, 55.5);
        // Level text
        this.ctx.fillText("LEVEL: " + this.level, this.canvas.getWidth() - 160, 55.5);
        // Boost background
        this.ctx.fillStyle = "#34495e";
        this.ctx.fillRect(30,70,300,20);
        this.ctx.fillStyle = "#2980b9";
        this.ctx.fillRect(30,70,(300 / 100) * this.player.boost,20)
    }
};


Game.prototype.update = function() {

    this.bgSound.play();

    // Check if player hits an enemy
    for (var i = 0; i < this.enemies.length; i++) {
        if(this.player.hitsEnemy(this.enemies[i])) {
            this.player.health -= 0.5;
        }
    }

    // Check if player died
    if(this.player.died()) {
        this.stop();
        this.bgSound.pause();
        this.bgSound.currentTime = 0;
        alert('GAME OVER BITCH!, je behaalde level is: ' + this.level);
    }

    // Keyboard input
    var that = this.controller;

    document.addEventListener("keydown", function (e) {
        that.keyDown(e);
    }, false);
    document.addEventListener("keyup", function (e) {
        that.keyUp(e);
    }, false);

    if(this.controller.leftPressed()) {
        this.player.moveLeft(this.moveSpeed);
    }

    if(this.controller.rightPressed()) {
        this.player.moveRight(this.moveSpeed);
    }

    if(this.controller.upPressed()) {
        this.player.moveUp(this.moveSpeed);
    }

    if(this.controller.downPressed()) {
        this.player.moveDown(this.moveSpeed);
    }

    if(this.controller.boostPressed()) {
        if(this.player.boost > 0) {
            this.moveSpeed = 8;
            this.player.boost--;
            if(this.player.boost < 0) {
                this.player.boost = 0;
            }
        } else {
            this.moveSpeed = 4.3;
        }
    } else {
        this.moveSpeed = 4.3;
        if(this.player.boost < 100) {
            this.player.boost += 0.2;
        }
    }

    for (var x = 0; x < this.enemies.length; x++) {
        this.enemies[x].move(this.enemies[x].speed);
    }

    this.draw();
};

Game.prototype.start = function () {
    this.running = true;

    this.canvas.set();
    this.bgSound = new Audio();
    this.bgSound.src = 'assets/sounds/background.wav';

    var that = this;
    this._interValId =  setInterval(function () {
        that.run();
    }, 1000 / this.fps);

    // Add enemies
    if(this.enemies.length == 0) {
        that.addEnemy();
    }
    this._roundTimer = setInterval(function () {
        that.addEnemy();
    }, 1000 * this.enemySpawnTime)
};

Game.prototype.addEnemy = function () {
    var enemyX = Math.floor((Math.random() * (this.canvas.getWidth() - 150)) + 0);
    var enemyY = Math.floor((Math.random() * (this.canvas.getHeight() - 150)) + 0);

    this.level++;
    this.enemies.push(new Enemy(this, enemyX, enemyY, (Math.floor(Math.random() * 4 + 1))));
};

Game.prototype.run = function () {
    if (this.running) {
        this.update();
    } else {
        this.stop();
    }
};

Game.prototype.stop = function () {
    this.running = false;
    clearInterval(this._interValId);
};

Game.prototype.collide = function(axes, direction, speed, object) {
    if (axes == 'x') {
        if(direction == 'left') {
            if(! (object.getX() - speed <= 0 )) {
                return false;
            } else {
                return true;
            }
        }
        if(direction == 'right') {
            if(! (object.getX() + speed >= this.canvas.getWidth() - (object.getWidth() + 30) )) {
                return false;
            } else {
                return true;
            }
        }
    }
    if (axes == 'y') {
        if(direction == 'up') {
            if(! (object.getY() - speed <= 0 )) {
                return false;
            } else {
                return true;
            }
        }
        if(direction == 'down') {
            if(! (object.getY() + speed >= this.canvas.getHeight() - (object.getHeight() + 30) )) {
                return false;
            } else {
                return true;
            }
        }
    }
};