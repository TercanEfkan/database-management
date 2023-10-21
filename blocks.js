var blockSize = 25;
var rows = 20;
var cols = 30;
var board;
var context;
var tableVelocity = 0;
var direction = 0; // 0 for stationary, -1 for left, 1 for right
var blocks = [];
var scoreParagraph = document.getElementById("score");
var score = 1000;
const colors = ['red', 'blue', 'green', 'orange'];
const credits = document.getElementById('credits');
let currentIndex = 0;

class Block {
    constructor(toughness, row, col) {
        this.row = row;
        this.col = col;
        this.toughness = toughness;
    }
    die() {

    }
}

var tableSize = { x: 100, y: 10 };
var tableX = blockSize * cols / 2 - tableSize.x / 2;
var tableY = 450;


window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    fillBlocks();

    document.addEventListener("keydown", go);
    document.addEventListener("keyup", stop);
    // update();

    setInterval(update, 1000 / 60); //100 milliseconds
}


function update() {
    changeColor();
    context.fillStyle = 'black';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = 'blue';
    tableX += direction * 100; // move the table based on the direction of movement
    if (tableX < 0) {
        tableX = 0; // prevent the table from moving beyond the left border
    } else if (tableX + tableSize.x > board.width) {
        tableX = board.width - tableSize.x; // prevent the table from moving beyond the right border
    }
    context.fillRect(tableX, tableY, tableSize.x, tableSize.y);

    drawBlocks(blocks, context)

}

function fillBlocks() {

    for (let i = 0; i < 5; i++) {
        let blockCount = this.cols / 2;
        let offset = (i % 2 === 0) ? 0 : 1;

        for (let j = 0; j < blockCount; j++) {
            let col1 = j * 2 + offset;
            let col2 = cols - 1 - j * 2 - offset;

            let bl1 = new Block(6 - (i + 1), i, col1);
            let bl2 = new Block(6 - (i + 1), i, col2);
            this.blocks.push(bl1);
            this.blocks.push(bl2);
        }
    }
}

function drawBlocks(blocks, context) {
    scoreParagraph.textContent = "Score: " + score;
    score += 1;
    blocks.forEach(function (block) {
        let x = block.col * blockSize;
        let y = block.row * blockSize;
        let color;

        switch (block.toughness) {
            case 1:
                color = '#AC00AC';
                break;
            case 2:
                color = 'green';
                break;
            case 3:
                color = 'yellow';
                break;
            case 4:
                color = 'orange';
                break;
            case 5:
                color = 'red';
                break;
        }

        // draw block
        context.fillStyle = color;
        context.fillRect(x, y, blockSize, blockSize);

        // draw lines
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + blockSize, y);
        context.lineTo(x + blockSize, y + blockSize);
        context.lineTo(x, y + blockSize);
        context.lineTo(x, y);
        context.closePath();
        context.strokeStyle = 'black';
        context.stroke();
    });
}

function go(e) {
    if (e.code == "ArrowLeft") {
        direction = -1;
    } else if (e.code == "ArrowRight") {
        direction = 1;
    }
}

function stop(e) {
    if (e.code == "ArrowLeft" && direction == -1) {
        direction = 0;
    } else if (e.code == "ArrowRight" && direction == 1) {
        direction = 0;
    }
}
class Ball {
    constructor() {
        this.radius = 10;
        this.color = '#99F';
        this.reset();
    }

    reset() {
        score -= 1000;
        this.x = tableX + tableSize.x / 2;
        this.y = tableY - this.radius;
        this.dx = 3;
        this.dy = 4;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // check for collisions with the walls
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx = -this.dx;
        } else if (this.x + this.radius > board.width) {
            this.x = board.width - this.radius;
            this.dx = -this.dx;
        }
        else {
            // check for collisions with blocks
            let collidedBlockIndex = -1;

            for (let i = 0; i < blocks.length; i++) {
                let block = blocks[i];
                let x = block.col * blockSize;
                let y = block.row * blockSize;

                if (this.y - this.radius < y + blockSize && this.y + this.radius > y &&
                    this.x + this.radius > x && this.x - this.radius < x + blockSize) {
                    // collision detected
                    collidedBlockIndex = i;
                    break;
                }
            }

            if (collidedBlockIndex != -1) {
                let block = blocks[collidedBlockIndex];
                let x = block.col * blockSize;
                let y = block.row * blockSize;

                if (this.x > x && this.x < x + blockSize) {
                    // ball hit the top or bottom of the block
                    this.dy = -this.dy;
                } else {
                    // ball hit the left or right side of the block
                    this.dx = -this.dx;
                }

                block.toughness--;

                if (block.toughness <= 0) {
                    let rng = Math.floor(Math.random() * 10);
                    if ( rng > 4) {
                        /*collided block index ile skill spawn edilecek*/
                    }
                    blocks.splice(collidedBlockIndex, 1);
                }
            }
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy = -this.dy;
        } else if (this.y + this.radius > board.height) {
            this.reset();
        } else if (this.y + this.radius > tableY && this.y - this.radius < tableY + tableSize.y && this.x > tableX && this.x < tableX + tableSize.x) {
            // adjust the direction based on the collision point
            let collisionPoint = (this.x - (tableX + tableSize.x / 2)) / (tableSize.x / 2);
            this.dx = collisionPoint * 5;
            this.dy = -Math.sqrt(25 - this.dx ** 2);
        }

    }
}

var ball = new Ball(tableX + tableSize.x / 2, tableY - blockSize, 5, 5);


function changeColor() {
  credits.style.color = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
  requestAnimationFrame(changeColor);
}
function update() {
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "blue";
    context.fillRect(tableX, tableY, tableSize.x, tableSize.y);

    drawBlocks(blocks, context);
    tableX += direction * 5; // move the table based on the direction of movement
    if (tableX < 0) {
        tableX = 0; // prevent the table from moving beyond the left border
    } else if (tableX + tableSize.x > board.width) {
        tableX = board.width - tableSize.x; // prevent the table from moving beyond the right border
    }
    ball.draw(context);
    ball.move();
    ball.checkCollisions(blocks, table);
}