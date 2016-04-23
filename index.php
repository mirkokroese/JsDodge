<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Spelletje</title>

    <link rel="stylesheet" type="text/css" href="assets/css/style.css">

    <script type="text/javascript" src="assets/js/jquery.js"></script>
    <script type="text/javascript" src="assets/js/Game.js"></script>
    <script type="text/javascript" src="assets/js/Player.js"></script>
    <script type="text/javascript" src="assets/js/Canvas.js"></script>
    <script type="text/javascript" src="assets/js/Controller.js"></script>
    <script type="text/javascript" src="assets/js/Enemy.js"></script>
    <script type="text/javascript">
    $(document).ready( function() {

        canvas = new Canvas();
        canvas.set();

        function start() {
            var game = new Game();
            game.start();
            window.onresize = function (event) {
                canvas = new Canvas();
                canvas.set();
                game.draw();
            };
        }
        $('#start_game').click(function () {
            $('.menu').hide();
            start();
        });
    });
    </script>
</head>
<body>
    <canvas id="c" height="10"></canvas>
    <div class="menu">
        <button id="start_game">Start Game</button>
    </div>
</body>
</html>