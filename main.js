const BORDER_WIDTH = 20
    , BORDER_HEIGHT = 20
    , SIZE = 20;

const DIRECTIONS = Object.freeze({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

const GRADIENT = new Rainbow();

let direction = DIRECTIONS.DOWN
    , snakes = []
    , fruit = {}
    , score = 0;

function setup() {
    frameRate(4);

    createCanvas(
        Math.ceil(windowWidth / SIZE) * SIZE, 
        Math.ceil(windowHeight / SIZE) * SIZE
    );

    innerWidth = width - BORDER_WIDTH * 2;
    innerHeight = height - BORDER_HEIGHT * 2;

    setUpSnake();

    spawnFruit();
}

function draw() {

    GRADIENT.setSpectrumByArray(['#08b9b6', '#c5f40b']);
    GRADIENT.setNumberRange(0, 20);

    background(0); // Re-render, clears everything

    textSize(20);
    text(`Score: ${score}`, windowWidth / 2 - BORDER_WIDTH * 2, BORDER_HEIGHT * 3);

    fill('red');
    stroke('red');

    rect(0, 0, BORDER_WIDTH, height); //LEFT BORDER
    rect(width - BORDER_WIDTH, 0, BORDER_WIDTH, height); // RIGHT BORDER
    rect(0, height - BORDER_HEIGHT, width, BORDER_HEIGHT); //BOTTOM BORDER
    rect(0, 0, width, BORDER_HEIGHT); // TOP BORDER

    move();

    render();

    checkBodyCollision();

    checkBound();

    checkFruit();
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

function appendSeg() {
    switch (direction) {
        case DIRECTIONS.UP: {
            snakes.push({
                x: snakes[snakes.length - 1].x,
                y: snakes[snakes.length - 1].y + SIZE,
            });
            break;
        }

        case DIRECTIONS.DOWN: {
            snakes.push({
                x: snakes[snakes.length - 1].x,
                y: snakes[snakes.length - 1].y - SIZE
            });
            break;
        }

        case DIRECTIONS.LEFT: {
            snakes.push({
                x: snakes[snakes.length - 1].x + SIZE,
                y: snakes[snakes.length - 1].y
            });
            break;
        }

        case DIRECTIONS.RIGHT: {
            snakes.push({
                x: snakes[snakes.length - 1].x + SIZE,
                y: snakes[snakes.length - 1].y
            });
            break;
        }
    }
}

function setUpSnake() {
    snakes.push({
        x: Math.ceil((innerWidth / 2) / SIZE) * SIZE,
        y: Math.ceil((innerHeight / 2) / SIZE) * SIZE
    });
}

function render() {
    for (var i = 0; i < snakes.length; i++) {

        let color = GRADIENT.colorAt(i);

        fill(`#${color}`);
        stroke(`#${color}`);

        rect(snakes[i].x, snakes[i].y, SIZE, SIZE);

    }
}

function checkBound() {
    if (snakes[0].x <= BORDER_WIDTH 
        || snakes[0].x >= width - BORDER_WIDTH 
        || snakes[0].y <= BORDER_HEIGHT 
        || snakes[0].y >= height - BORDER_HEIGHT) {
            alert('You hit the border!');
            noLoop();
        }
}

function checkBodyCollision() {
    if (snakes.length > 1) {
        for (var i = 1; i < snakes.length; i++) {
            if (snakes[i].x == snakes[0].x && snakes[i].y == snakes[0].y) {
                alert('You hit your own tail!');
                noLoop();
            }
        }
    }
}

function checkFruit() {

    fill('yellow');
    stroke('yellow');

    rect(fruit.x, fruit.y, SIZE, SIZE);

    if(snakes[0].x == fruit.x && snakes[0].y == fruit.y) {
        score++;
        appendSeg();
        spawnFruit();
    }
}

function spawnFruit() {
    fruit = {
        x: floor(random(BORDER_WIDTH, innerWidth / SIZE)) * SIZE,
        y: floor(random(BORDER_HEIGHT, innerHeight / SIZE)) * SIZE
    };
}

function keyPressed() {
    switch (keyCode) {
        case 87, 38: {
            if (direction != DIRECTIONS.DOWN)
                direction = DIRECTIONS.UP;
            break;
        }

        case 83, 40: {
            if (direction != DIRECTIONS.UP)
                direction = DIRECTIONS.DOWN;
            break;
        }

        case 65, 37: {
            if (direction != DIRECTIONS.RIGHT)
                direction = DIRECTIONS.LEFT;
            break;
        }

        case 68, 39: {
            if (direction != DIRECTIONS.LEFT)
                direction = DIRECTIONS.RIGHT;
            break;
        }
    }
}