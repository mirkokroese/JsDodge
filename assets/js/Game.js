'use strict';
var Game = function () {
    this.fps = 60;
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
        this.ctx.fillRect(this.player.getX(),this.player.getY(),this.player.getWidth(),this.player.getHeight());
    }
};


Game.prototype.update = function() {

    var that = this.controller;
    document.addEventListener("keydown", function () {
        that.keyDown();
    }, false);
    document.addEventListener("keyup", function () {
        that.keyUp();
    }, false);

    console.log(this.controller.leftPressed());
    if(this.controller.leftPressed()) {
        this.player.moveLeft(3);
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

Game.prototype.collide = function(axes, speed, object) {
    if (axes == 'x') {
        if(! (object.getX() - speed <= 0 ) && ! (object.getX() + speed >= this.canvas.getWidth() - object.getWidth())) { // || (! (object.getX() - speed) <= 0)
            return false;
        } else {
            return true;
        }
    }
    if (axes == 'y') {
        if(! (object.getY() - speed <= 0 ) && ! (object.getY() + speed >= this.canvas.getHeight() - object.getHeight())) {
            return false;
        } else {
            return true;
        }
    }
};