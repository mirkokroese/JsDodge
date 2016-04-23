'use strict';
var Enemy = function (gameObject, startX, startY, direction) {
    this.width = 100;
    this.height = 100;
    this.x = startX;
    this.y = startY;
    this.game = gameObject;
    this.direction = direction;
    this.speed = 4;
    this.image = document.createElement('img');
    this.image.src = 'assets/img/enemy.png';
};

Enemy.prototype.move = function (speed) {
    switch (this.direction) {
        // Bottom right
        case 1:
            if ((! this.game.collide('x', 'right', speed, this)) && (! this.game.collide('y', 'down', speed, this))) {
                this.setX(this.getX() + speed);
                this.setY(this.getY() + speed);
                return;
            }
            break;
        // Bottom left
        case 2:
            if ((! this.game.collide('x', 'left', speed, this)) && (! this.game.collide('y', 'down', speed, this))) {
                this.setX(this.getX() - speed);
                this.setY(this.getY() + speed);
                return;
            }
            break;
        // Upper right
        case 3:
            if ((! this.game.collide('y', 'up', speed, this)) && (! this.game.collide('x', 'right', speed, this))) {
                this.setY(this.getY() - speed);
                this.setX(this.getX() + speed);
                return;
            }
            break;
        // Upper left
        case 4:
            if((! this.game.collide('y', 'up', speed, this)) && (! this.game.collide('x', 'left', speed, this))) {
                this.setY(this.getY() - speed);
                this.setX(this.getX() - speed);
                return;
            }
            break;
    }

    this.direction = (Math.floor(Math.random() * 4 + 1));
};

Enemy.prototype.getWidth = function () {
    return this.width;
};

Enemy.prototype.getHeight = function () {
    return this.height;
};

Enemy.prototype.getX = function () {
    return this.x;
};

Enemy.prototype.setX = function (val) {
    this.x = val;
};

Enemy.prototype.getY = function () {
    return this.y;
};

Enemy.prototype.setY = function (val) {
    this.y = val;
};