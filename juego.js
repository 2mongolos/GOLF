/* Burak Kanber */
var width = 1000;
var height = 1000;
var canvas = ctx = false;
var frameRate = 1/40; // Seconds
var frameDelay = frameRate * 1000; // ms
var loopTimer = false;

/*
 * Experiment with values of mass, radius, restitution,
 * gravity (ag), and density (rho)!
 *
 * Changing the constants literally changes the environment
 * the ball is in.
 *
 * Some settings to try:
 * the moon: ag = 1.6
 * water: rho = 1000, mass 5
 * beach ball: mass 0.05, radius 30
 * lead ball: mass 10, restitution -0.05
 */
var ball = {
    position: {x: width/2, y: 0},
    velocity: {x: 10, y: 0},
    mass: 0.1, //kg
    radius: 15, // 1px = 1cm
    restitution: -0.7
    };

var Cd = 0.47;  // Dimensionless
var rho = 1.22; // Dentsitatea
var A = Math.PI * ball.radius * ball.radius / (10000); // Azalera
var ag = 9.81;  // Grabitatea
var mouse = {x: 0, y: 0, isDown: false};

function getMousePosition(e) {
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
}
var mouseDown = function(e) {
    if (e.which == 1) {
        getMousePosition(e);
        mouse.isDown = true;
        //ball.position.x = mouse.x;
        //ball.position.y = mouse.y;
    }
}
var mouseUp = function(e) {
    if (e.which == 1) {
        mouse.isDown = false;
        ball.velocity.y = (ball.position.y - mouse.y) /10;
        ball.velocity.x = (ball.position.x - mouse.x) / 10;
    }
}

var hasi = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
}
var loop = function() {
    if ( ! mouse.isDown) {
        // Fisikak definitzeko
            // Drag force: Fd = -1/2 * Cd * A * rho * v * v
        var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
        var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

        Fx = (isNaN(Fx) ? 0 : Fx);
        Fy = (isNaN(Fy) ? 0 : Fy);

            // bolaren azelerazioa
        var ax = Fx / ball.mass;
        var ay = ag + (Fy / ball.mass);
            // Bolari abiadura ematen dio
        ball.velocity.x += ax*frameRate;
        ball.velocity.y += ay*frameRate;

            // Bolari posizioa ematen dio
        ball.position.x += ball.velocity.x*frameRate*100;
        ball.position.y += ball.velocity.y*frameRate*100;
    }
    // Bolaren kolisioak paretekin
    if (ball.position.y > 900 - ball.radius) {
        ball.velocity.y *= ball.restitution;
        ball.position.y = 900 - ball.radius;
    }
    if (ball.position.x > width - ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = width - ball.radius;
    }
    if (ball.position.x < ball.radius) {
        ball.velocity.x *= ball.restitution;
        ball.position.x = ball.radius;
    }
    if (ball.position.y < 0 + ball.radius){
      ball.velocity.y *= ball.restitution;
      ball.position.y = 0 + ball.radius;
    }
    if (ball.velocity.x == 1)
    {
      ball.velocity.x = 0;
    }

//Bola marraztu

    ctx.clearRect(0,0,width,height);

    ctx.save();

    ctx.translate(ball.position.x, ball.position.y);
    ctx.beginPath();
    ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();

    ctx.restore();



    // Tiroaren marratxoa marrazteko
    if (mouse.isDown) {
        ctx.beginPath();
        ctx.moveTo(ball.position.x, ball.position.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
        ctx.closePath();
    }

}
    hasi();
	
(function calc(number, power, sum) {
  return power === 0 ? sum : calc(number, --power, (sum || 1) * number );
})(2, 10)


(function calculate(number, power, result, i) {
  if (i === 10) { return; }
  i++;
  result = result * number;
  console.log(result);
  calculate(number, power, result, i);
})(2, 10, 1, 0);
	
