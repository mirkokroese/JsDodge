'use strict';
var Enemy = function (gameObject, startX, startY, direction) {
    this.width = 100;
    this.height = 100;
    this.x = startX;
    this.y = startY;
    this.game = gameObject;
    this.direction = direction;
    this.image = document.createElement('img');
    this.image.src = 'assets/img/enemy.png';
};

Enemy.prototype.move = function (speed) {
    console.log(this.direction);
    switch (this.direction) {
        case 1:
            this.setX(this.getX()+10);
            break;
        case 2:
            this.setX(this.getX()-10);
            break;
        case 3:
            this.setY(this.getY()+10);
            break;
        case 4:
            this.setY(this.getY()-10);
            break;
    }
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

Enemy.prototype.move = function (val) {

}