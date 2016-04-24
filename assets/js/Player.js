'use strict';
var Player = function (gameObject) {
    this.health = 100;
    this.boost = 100;
    this.width = 100;
    this.height = 100;
    this.x = (document.body.clientWidth / 2) - this.width;
    this.y = (document.body.clientHeight / 2) - this.height;
    this.game = gameObject;
    this.image = document.createElement('img');
    this.image.src = '/assets/img/player.png';
};

Player.prototype.getWidth = function () {
    return this.width;
};

Player.prototype.getHeight = function () {
    return this.height;
};

Player.prototype.getX = function () {
    return this.x;
};

Player.prototype.setX = function (val) {
    this.x = val;
};

Player.prototype.getY = function () {
    return this.y;
};

Player.prototype.setY = function (val) {
    this.y = val;
};

Player.prototype.moveLeft = function (speed) {
    if(! this.game.collide('x', 'left', speed, this)) {
        this.setX(this.getX() - speed);
    }
};

Player.prototype.moveRight = function (speed) {
    if (! this.game.collide('x', 'right', speed, this)) {
        this.x += speed;
    }
};

Player.prototype.moveUp = function (speed) {
    if (! this.game.collide('y', 'up', speed, this)) {
        this.y -= speed;
    }
};

Player.prototype.moveDown = function (speed) {
    if (! this.game.collide('y', 'down', speed, this)) {
        this.y += speed;
    }
};

Player.prototype.hitsEnemy = function (enemy) {
    var x = enemy.getX() - this.getX();
    var y = enemy.getY() - this.getY();

    if(x < 100 && x > -100 && y < 100 && y > -100) {
        return true;
    }

    return false;
}

Player.prototype.died = function () {
    if (this.health <= 0) {
        return true;
    }
    return false;
};