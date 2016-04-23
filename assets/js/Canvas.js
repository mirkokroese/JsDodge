'use strict';
var Canvas = function() {
    this.element = document.getElementById('c');
    this.ctx = this.element.getContext('2d');
};

Canvas.prototype.set = function () {
    this.element.height = document.body.clientHeight;
    this.element.width = document.body.clientWidth;
};

Canvas.prototype.get = function () {
    return this.element;
};

Canvas.prototype.getWidth = function () {
    return this.element.width;
};

Canvas.prototype.getHeight = function () {
    return this.element.height;
};