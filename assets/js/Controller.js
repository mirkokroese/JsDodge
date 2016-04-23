'use strict';
var Controller = function () {
    this.leftKey = "37";
    this.rightKey = "39";
    this.upKey = "38";
    this.downKey = "40";

    this.leftDown = false;
    this.rightDown = false;
    this.upDown = false;
    this.downDown = false;
}

Controller.prototype.keyDown = function (e) {
    if (e.keyCode == this.leftKey) {
        this.leftDown = true;
    }
    if (e.keyCode == this.rightKey) {
        this.rightDown= true;
    }
    if (e.keyCode == this.downKey) {
        this.downDown = true;
    }
    if (e.keyCode == this.upKey) {
        this.upDown = true;
    }
};

Controller.prototype.keyUp = function (e) {
    if (e.keyCode == this.leftKey) {
        this.leftDown = false;
    }
    if (e.keyCode == this.rightKey) {
        this.rightDown = false;
    }
    if (e.keyCode == this.downKey) {
        this.downDown = false;
    }
    if (e.keyCode == this.upKey) {
        this.upDown = false;
    }
};

Controller.prototype.leftPressed = function () {
    if (this.leftDown) {
        return true;
    } else {
        return false;
    }
};

Controller.prototype.rightPressed = function () {
    if (this.rightDown) {
        return true;
    } else {
        return false;
    }
};

Controller.prototype.upPressed = function () {
    if (this.upDown) {
        return true;
    } else {
        return false;
    }
};

Controller.prototype.downPressed = function () {
    if (this.downDown) {
        return true;
    } else {
        return false;
    }
};