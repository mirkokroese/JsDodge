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
    }
};


Game.prototype.update = function() {

    // Check if player hits an enemy
    for (var i = 0; i < this.enemies.length; i++) {
        if(this.player.hitsEnemy(this.enemies[i])) {
            this.player.health -= 0.5;
        }
    }

    // Check if player died
    if(this.player.died()) {
        this.stop();
        alert('GAME OVER BITCH!');
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
        this.moveSpeed = 8;
    } else {
        this.moveSpeed = 4.3;
    }

    for (var x = 0; x < this.enemies.length; x++) {
        this.enemies[x].move(this.enemies[x].speed);
    }

    this.draw();
};

Game.prototype.start = function () {
    this.running = true;

    this.canvas.set();

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