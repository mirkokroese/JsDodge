getCanvas = function()
{
    var canvas = document.getElementById('c');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    return canvas;
}

$(document).ready( function() {

    canvas = getCanvas();

    window.onresize = function(event) {
        canvas = getCanvas();
        draw();
    };

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var x = 100;
        var y = 100;

        var right = false;


        draw = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillRect(x, y, 100, 100);
        }
        function onTimerTick() {
            draw();
        }
        //setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec


        document.createEvent('KeyboardEvent');
        window.addEventListener("keydown", checkKeyPressed, false);

        function checkKeyPressed(e) {
            // Left arrow
            if (e.keyCode == "37") {
                if(! (x - 1 <= 0)) {
                    x -= 20;
                    draw();
                }
            }
            // Right arrow
            if (e.keyCode == "39") {
                if (! (x + 101 >= canvas.width)) {
                    //x += 20;
                    right = true;
                    draw();
                }
            }
            // Up arrow
            if (e.keyCode == "38") {
                if (! (y - 1 <= 0)) {
                    y -= 20;
                    draw();
                }
            }
            // Down arrow
            if (e.keyCode == "40") {
                if (! (y + 101 >= canvas.height)) {
                    y += 20;
                    draw();
                }
            }
        }
    }
});
