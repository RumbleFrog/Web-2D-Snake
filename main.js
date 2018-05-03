const BORDER_WIDTH = 20
    , BORDER_HEIGHT = 20
    , SIZE = 20;

const DIRECTIONS = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

let direction = DIRECTIONS.DOWN
    , snakes = [];

function setup() {
    frameRate(2);
    createCanvas(windowWidth, windowHeight);

    innerWidth = width - BORDER_WIDTH * 2;
    innerHeight = height - BORDER_HEIGHT * 2;

    setUpSnake();
}

function draw() {

    background(0); // Re-render, clears everything

    fill('red');
    stroke('red');

    rect(0, 0, BORDER_WIDTH, height); //LEFT BORDER
    rect(width - BORDER_WIDTH, 0, BORDER_WIDTH, height); // RIGHT BORDER
    rect(0, height - BORDER_HEIGHT, width, BORDER_HEIGHT); //BOTTOM BORDER
    rect(0, 0, width, BORDER_HEIGHT); // TOP BORDER

    move();

    render();
}

function move() {
    if (snakes.length > 1) {
        for (var i = snakes.length - 1; i > 0; i--) {
            snakes[i].x = snakes[i - 1].x;
            snakes[i].y = snakes[i - 1].y;
        }
    }

    switch (direction) {
        case DIRECTIONS.UP: {
            snakes[0].y -= SIZE;
            break;
        }

        case DIRECTIONS.DOWN: {
            snakes[0].y += SIZE;
            break;
        }

        case DIRECTIONS.LEFT: {
            snakes[0].x -= SIZE;
            break;
        }

        case DIRECTIONS.RIGHT: {
            snakes[0].x += SIZE;
            break;
        }
    }
}

function setUpSnake() {
    snakes.push({
        x: innerWidth / 2,
        y: innerHeight / 2
    });
}

function render() {
    snakes.forEach((seg) => {
        rect(seg.x, seg.y, SIZE, SIZE);
    })
}

function keyPressed() {
    switch (keyCode) {
        case 87: {
            if (direction != DIRECTIONS.DOWN)
                direction = DIRECTIONS.UP;
            break;
        }

        case 83: {
            if (direction != DIRECTIONS.UP)
                direction = DIRECTIONS.DOWN;
            break;
        }

        case 65: {
            if (direction != DIRECTIONS.RIGHT)
                direction = DIRECTIONS.LEFT;
            break;
        }

        case 68: {
            if (direction != DIRECTIONS.LEFT)
                direction = DIRECTIONS.RIGHT;
            break;
        }
    }
}