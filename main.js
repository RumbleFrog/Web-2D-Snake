const BORDER_WIDTH = 20
    , BORDER_HEIGHT = 20;

let direction = "up"
    , grid = []
    , snake = 1;

function setup() {
    frameRate(15);
    createCanvas(windowWidth, windowHeight);

    background('black');

    innerWidth = width - BORDER_WIDTH * 2;
    innerHeight = height - BORDER_HEIGHT * 2;

    setUpSnake();
}

function draw() {

    fill('red');
    stroke('red');

    rect(0, 0, BORDER_WIDTH, height); //LEFT BORDER
    rect(width - BORDER_WIDTH, 0, BORDER_WIDTH, height); // RIGHT BORDER
    rect(0, height - BORDER_HEIGHT, width, BORDER_HEIGHT); //BOTTOM BORDER
    rect(0, 0, width, BORDER_HEIGHT); // TOP BORDER
}

function setUpSnake() {

    fill('red');

    rect(innerWidth / 2, innerHeight / 2, 20, 20);
}