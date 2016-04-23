'use strict';
var Game = function () {
    this.fps = 60;
    this.moveSpeed = 4.3;
    this.running = false;
    this._intervalId = null;
    this.canvas = document.getElementById('c');
    this.ctx = this.canvas.getContext('2d');
    this.player = new Player(this);
    this.canvas = new Canvas();
    this.controller = new Controller();
};

Game.prototype.draw = function() {
    if (this.canvas.get().getContext) {

        this.ctx.clearRect(0,0,this.canvas.getWidth(),this.canvas.getHeight());
        this.ctx.drawImage(this.player.image, this.player.getX(), this.player.getY());
    }
};


Game.prototype.update = function() {

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

    this.draw();
};

Game.prototype.start = function () {
    this.running = true;

    this.canvas.set();

    var that = this;
    this._interValId =  setInterval(function () {
        that.run();
    }, 1000 / this.fps);
};

Game.prototype.stop = function () {
    this.running = false;
    clearInterval(this._interValId);
};

Game.prototype.run = function () {
    if (this.running) {
        this.update();
    } else {
        this.stop();
    }
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
            if(! (object.getX() + speed >= this.canvas.getWidth() - object.getWidth())) {
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
            if(! (object.getY() + speed >= this.canvas.getHeight() - object.getHeight())) {
                return false;
            } else {
                return true;
            }
        }
    }
};