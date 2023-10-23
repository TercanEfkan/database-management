var blockSize = 25;
var rows = 20;
var cols = 30;
var board;
var context;
var skillsOnBoard = [];
var skillsAvailable = 1;
var ballsOnBoard = [];
var tableVelocity = 0;
const tableColor = "blue";
var direction = 0; // 0 for stationary, -1 for left, 1 for right
var blocks = [];
var scoreParagraph = document.getElementById("score");
var timeParagraph = document.getElementById("time");
var score = 0;
var timeSpent = 0;
const colors = ['red', 'blue', 'green', 'orange'];
const credits = document.getElementById('credits');
let currentIndex = 0;
const start = document.getElementById("startSound");
const collisionSound = document.getElementById("collisionSound");
const miss = document.getElementById("missSound");
start.volume = 0.1;
collisionSound.volume = 0.04;
miss.volume = 0.1;
class Block {
    constructor(toughness, row, col, type) {
        this.row = row + 1;
        this.col = col;
        this.toughness = toughness;
        this.type = type;
    }
}
class Skill {
    constructor(type, row, col) {
        this.row = row;
        this.col = col;
        this.type = type;
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

    const gameLoop = setInterval(update, 1000 / 60); //100 milliseconds
}

function fillBlocks() {

    for (let i = 0; i < 5; i++) {
        let blockCount = this.cols / 2;
        let offset = (i % 2 === 0) ? 0 : 1;

        for (let j = 0; j < blockCount; j++) {
            let col1 = j * 2 + offset;
            let col2 = cols - 1 - j * 2 - offset;

            let bl1 = new Block(6 - (i + 1), i + 1, col1, 6 - (i + 1));
            let bl2 = new Block(6 - (i + 1), i + 1, col2, 6 - (i + 1));
            this.blocks.push(bl1);
            this.blocks.push(bl2);
        }
    }
}
function drawSkills(skillsOnBoard, context) {
    for (let i = skillsOnBoard.length - 1; i >= 0; i--) {
        let skill = skillsOnBoard[i];
        let x = skill.col * blockSize;
        let y = skill.row * blockSize;
        let color;

        switch (skill.type) {
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
        context.fillStyle = color;
        context.fillRect(x, y, blockSize - 20, blockSize - 20);
        skill.row += 0.1;
        if (skill.row > 21) {
            skillsOnBoard.splice(i, 1); // Remove the skill at index i
        }
    }
}

function drawBlocks(blocks, context) {

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
    if (e.code == "ArrowLeft" || e.key == "a") {
        direction = -1;
    } else if (e.code == "ArrowRight" || e.key == "d") {
        direction = 1;
    }
    else if (e.key == "1" && skillsAvailable % 2 === 0) {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 1));
        skillsAvailable = skillsAvailable / 2;
        rectangleElement = document.querySelector(".rectangle1");
        rectangleElement.style.backgroundColor = "darkred";
    }
    else if (e.key == "2" && skillsAvailable % 3 === 0) {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 2));
        skillsAvailable = skillsAvailable / 3;
        rectangleElement = document.querySelector(".rectangle2");
        rectangleElement.style.backgroundColor = "darkred";
    }
    else if (e.key == "3" && skillsAvailable % 5 === 0) {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 3));
        skillsAvailable = skillsAvailable / 5;
        rectangleElement = document.querySelector(".rectangle3");
        rectangleElement.style.backgroundColor = "darkred";
    }
    else if (e.key == "4" && skillsAvailable % 7 === 0) {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 4));
        skillsAvailable = skillsAvailable / 7;
        rectangleElement = document.querySelector(".rectangle4");
        rectangleElement.style.backgroundColor = "darkred";
    }
    else if (e.key == "5" && skillsAvailable % 11 === 0) {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 5));
        skillsAvailable = skillsAvailable / 11;
        rectangleElement = document.querySelector(".rectangle5");
        rectangleElement.style.backgroundColor = "darkred";
    }
    else if (e.key == " ") {
        ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 5));
    }
}

function stop(e) {
    if ((e.code == "ArrowLeft" || e.key == "a") && direction == -1) {
        direction = 0;
    } else if ((e.code == "ArrowRight" || e.key == "d") && direction == 1) {
        direction = 0;
    }
}
class Ball {
    constructor(x, y, type) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.dx = 3;
        this.dy = 4;
        this.radius = 10;
        this.color = '#FFF';
    }

    reset() {
        if (this.type === 0) {
            score -= 1000;
            this.x = tableX + tableSize.x / 2;
            this.y = tableY - this.radius;
            this.dx = 3;
            this.dy = 4;
            miss.play();
        }
        else {
            // Find the index of this ball in the ballsOnBoard array
            const index = ballsOnBoard.indexOf(this);

            if (index !== -1) {
                // If the ball is in the array, remove it
                ballsOnBoard.splice(index, 1);
            }
        }
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
        context.closePath();
        context.fillStyle = this.color;
        context.fill();

        context.beginPath();
        context.arc(this.x, this.y, this.radius - 3, 0, 2 * Math.PI, true);
        context.closePath();
        switch (this.type) {
            case 0: context.fillStyle = '#FFF';
                break;
            case 1: context.fillStyle = "#AC00AC";
                break;
            case 2: context.fillStyle = 'green';
                break;
            case 3: context.fillStyle = 'yellow';
                break;
            case 4: context.fillStyle = 'orange';
                break;
            case 5: context.fillStyle = '#F00';
                break;
        }
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
                    let blk = blocks.splice(collidedBlockIndex, 1);
                    score += blk[0].type * 100;
                    if (rng > 4) {
                        let skill = new Skill(blk[0].type, blk[0].row, blk[0].col);
                        skillsOnBoard.push(skill);
                    }
                    if(blocks.length === 0){
                        alert("Game Over! Your Score: " + score);
                        clearInterval(gameLoop);
                    }
                }
            }
        }
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy = -this.dy;
        } else if (this.y > board.height) {
            this.reset();
        } else if (this.y + this.radius > tableY && this.y - this.radius < tableY + tableSize.y && this.x > tableX && this.x < tableX + tableSize.x) {
            // i want to run a sound here
            let collisionPoint = (this.x - (tableX + tableSize.x / 2)) / (tableSize.x / 2);
            this.dx = collisionPoint * 5;
            this.dy = -Math.sqrt(25 - this.dx ** 2);

            if (this.type === 0) {
                collisionSound.play();
            }
        }
    }
}

function displaySkillsOnScreen(skillsOnBoard) {
    const skillsDisplay = document.getElementById('skillsDisplay');
    skillsDisplay.innerHTML = ''; // Clear any previous content

    skillsOnBoard.forEach(function (skill) {
        // Create a new paragraph for each skill and display its information
        const skillInfo = document.createElement('p');
        skillInfo.textContent = `Type: ${skill.type}, Row: ${skill.row}, Column: ${skill.col}`;

        // Append the skill information to the display element
        skillsDisplay.appendChild(skillInfo);
    });
}
function updateSkills() {
    if (skillsOnBoard.length != 0) {
        var collidedSkillIndex = -1
        for (let i = 0; i < skillsOnBoard.length; i++) {

            let skill = skillsOnBoard[i];

            if (
                skill.col * blockSize > tableX &&
                skill.col * blockSize < tableX + tableSize.x &&
                skill.row * blockSize > tableY - tableSize.y
            ) {
                // Collision detected
                collidedSkillIndex = i;
                break;
            }
        }
        if (collidedSkillIndex != -1) {
            var skl = skillsOnBoard.splice(collidedSkillIndex, 1);
            var rectangleElement;
            switch (skl[0].type) {
                case 1:
                    rectangleElement = document.querySelector(".rectangle1");
                    if (skillsAvailable % 2 !== 0) {
                        skillsAvailable = skillsAvailable * 2;
                    }
                    break;
                case 2:
                    rectangleElement = document.querySelector(".rectangle2");
                    if (skillsAvailable % 3 !== 0) {
                        skillsAvailable = skillsAvailable * 3;
                    }
                    break;
                case 3:
                    rectangleElement = document.querySelector(".rectangle3");
                    if (skillsAvailable % 5 !== 0) {
                        skillsAvailable = skillsAvailable * 5;
                    }
                    break;
                case 4:
                    rectangleElement = document.querySelector(".rectangle4");
                    if (skillsAvailable % 7 !== 0) {
                        skillsAvailable = skillsAvailable * 7;
                    }
                    break;
                case 5:
                    rectangleElement = document.querySelector(".rectangle5");
                    if (skillsAvailable % 11 !== 0) {
                        skillsAvailable = skillsAvailable * 11;
                    }
                    break;
            }
            rectangleElement.style.backgroundColor = "#50FF50";
        }
        drawSkills(skillsOnBoard, context);
    }
}
function changeColor() {
    credits.style.color = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
    requestAnimationFrame(changeColor);
}
ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 0));
function update() {

    start.play();
    scoreParagraph.textContent = "Score: " + score;
    timeParagraph.textContent = "Time: " + parseInt(timeSpent / 3600) + ":" + parseInt(timeSpent % 3600 / 60) + "." + parseInt(timeSpent % 60 / 60 * 100) + "";
    timeSpent++;

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.beginPath();
    context.arc(tableX + 50, tableY + 100, tableSize.x, -Math.PI / 3, -Math.PI / 3 * 2, true);
    context.closePath();
    context.fillStyle = tableColor;
    context.fill();
    context.fillStyle = tableColor;
    context.fillRect(tableX, tableY + 13, tableSize.x, tableSize.y);


    drawBlocks(blocks, context);
    updateSkills();

    tableX += direction * 5; // move the table based on the direction of movement
    if (tableX < 0) {
        tableX = 0; // prevent the table from moving beyond the left border
    } else if (tableX + tableSize.x > board.width) {
        tableX = board.width - tableSize.x; // prevent the table from moving beyond the right border
    }
    ballsOnBoard.forEach(function (ball) {
        ball.draw(context);
        ball.move();
    })
}