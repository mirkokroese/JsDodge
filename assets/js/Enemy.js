'use strict';
var Enemy = function (gameObject) {
    this.width = 100;
    this.height = 100;
    this.x = (document.body.clientWidth / 2) - this.width;
    this.y = (document.body.clientHeight / 2) - this.height;
    this.game = gameObject;
};