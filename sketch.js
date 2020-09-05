var w = 30, h = 150, r = 20;
var bot, player, ball;
var playerP = 0, botP = 0;
var arrx = [-10, -9, -8, -7, -6, -5, -4, 4, 5, 6, 7, 8, 9, 10];
var arry = [-3, -2, -1, 1, 2, 3];
var name;

function setup() {
    createCanvas(600, 400);
    bot = new Bot();
    player = new Palyer();
    ball = new Ball();
    name = prompt("Enter your name: ");
}

function draw() {
    background(51);
    bot.update();
    player.update();
    ball.update();
    textAlign(CENTER);
    text("Bot Points\n" + botP, width / 4, 20, width / 6, 40);
    // text("Player Points\n" + playerP, 350, 20, 100, 40);
    text(name + "`s Points\n" + playerP, width - (10 * width) / 24, 20, width / 6, 40);
    text("Pong Game - Walid Sharaiyra - 05 Sep, 2020", width / 4, height - 30, width / 2, 20);
}

function Bot() {
    this.x = 0;
    this.y = random(250);
    this.yspeed;

    this.update = function () {

        if (ball.y > this.y + h / 2) this.yspeed = abs(ball.xspeed / 4);
        if (ball.y < this.y + h / 2) this.yspeed = -1 * abs(ball.xspeed / 4);
        // if (ball.xspeed > 0) this.yspeed = 0;
        this.y += this.yspeed;
        if (this.y < 0) this.y = 0;
        if (this.y > height - h) this.y = height - h;

        // noStroke();
        strokeWeight(2);
        stroke(51);
        fill(255);
        rect(this.x, this.y, w, h);
    }
}

function Palyer() {
    this.x = width - w;
    this.y;
    this.update = function () {
        this.y = mouseY - h / 2;

        if (this.y < 0) this.y = 0;
        if (this.y > height - h) this.y = height - h;

        // noStroke();
        strokeWeight(2);
        stroke(51);
        fill(255);
        rect(this.x, this.y, w, h);
    }
}

function Ball() {
    this.x = width / 2;
    this.y = random(50, height - 50);
    this.xspeed = random(arrx);
    this.yspeed = random(arry);

    this.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;

        if (this.y < r) this.yspeed *= -1;
        if (this.y > height - r) this.yspeed *= -1;

        if (this.x < -1 * r) {
            playerP++;
            this.x = 120;
            this.y = random(50, height - 50);
            this.xspeed = abs(random(arrx));
            this.yspeed = random(arry);
        }

        if (this.x > width + r) {
            botP++;
            this.x = width - 120;
            this.y = random(50, height - 50);
            this.xspeed = -1 * abs(random(arrx));
            this.yspeed = random(arry);
        }


        if (this.x < r + w && this.y > bot.y && this.y < bot.y + h) {
            this.xspeed *= -1.05;
        }

        if (this.x > width - (r + w) && this.y > player.y && this.y < player.y + h) {
            this.xspeed *= -1.05;
        }

        // noStroke();
        strokeWeight(2);
        stroke(51);
        fill(255);
        ellipse(this.x, this.y, r * 2, r * 2);
    }
}