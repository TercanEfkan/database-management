import React, { useEffect } from 'react';
import './Styles.css'
import axios from "axios";

const Game = ({userID}) => {
    let rectColor = "white";
    const blockSize = 25;
    const rows = 20;
    const cols = 30;
    const skillsOnBoard = [];
    let skillsAvailable = 1;
    let ballsOnBoard = [];
    const tableColor = "blue";
    let direction = 0; // 0 for stationary, -1 for left, 1 for right
    const blocks = [];
    let score = 0;
    let timeSpent = 0;
    const colors = ['red', 'blue', 'green', 'orange'];
    let currentIndex = 0;
    const tableSize = { x: 100, y: 10 };
    let tableX = blockSize * cols / 2 - tableSize.x / 2;
    let tableY = 450;
    let board;
    let context;
    const handleSubmit = async () => {
        try {
            // Send a POST request to your backend
            const response = await axios.post('http://localhost:3001/post-game', {
                userID,
                score,
                timeSpent
            });
            alert(response.data['message']);
            if (response.data['success']){
                alert('Your Score is Saved');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        const audio = new Audio('./sfx/start.mp3');
        //audio.play();
        const initializeGame = () => {
            board = document.getElementById("board");
            context = board.getContext("2d");
            fillBlocks();
            document.addEventListener("keydown", go);
            document.addEventListener("keyup", stop);
            ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 0));
            setInterval(update, 1000 / 60);
        };

        const fillBlocks = () => {
            for (let i = 0; i < 5; i++) {
                let blockCount = cols / 2;
                let offset = (i % 2 === 0) ? 0 : 1;

                for (let j = 0; j < blockCount; j++) {
                    let col1 = j * 2 + offset;
                    let col2 = cols - 1 - j * 2 - offset;

                    let bl1 = new Block(6 - (i + 1), i + 1, col1, 6 - (i + 1));
                    let bl2 = new Block(6 - (i + 1), i + 1, col2, 6 - (i + 1));
                    blocks.push(bl1);
                    blocks.push(bl2);
                }
            }
        };

        const drawSkills = (skillsOnBoard, context) => {
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
                    skillsOnBoard.splice(i, 1);
                }
            }
        };
        const drawBlocks = (blocks, context) => {

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
        const go = (e) =>{
            if (e.code === "ArrowLeft" || e.key === "a") {
                direction = -1;
            } else if (e.code === "ArrowRight" || e.key === "d") {
                direction = 1;
            }
            else if (e.key === "1" && skillsAvailable % 2 === 0) {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 1));
                skillsAvailable = skillsAvailable / 2;
            }
            else if (e.key === "2" && skillsAvailable % 3 === 0) {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 2));
                skillsAvailable = skillsAvailable / 3;
            }
            else if (e.key === "3" && skillsAvailable % 5 === 0) {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 3));
                skillsAvailable = skillsAvailable / 5;
            }
            else if (e.key === "4" && skillsAvailable % 7 === 0) {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 4));
                skillsAvailable = skillsAvailable / 7;
            }
            else if (e.key === "5" && skillsAvailable % 11 === 0) {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 5));
                skillsAvailable = skillsAvailable / 11;
            }
            else if (e.key === " ") {
                ballsOnBoard.push(new Ball(tableX + tableSize.x / 2, tableY - 5, 5));
            }
        }
        const stop = (e) =>{
            if ((e.code === "ArrowLeft" || e.key === "a") && direction === -1) {
                direction = 0;
            } else if ((e.code === "ArrowRight" || e.key === "d") && direction === 1) {
                direction = 0;
            }
        }
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

                }
                else {
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

                if (this.x - this.radius < 0) {
                    this.x = this.radius;
                    this.dx = -this.dx;
                } else if (this.x + this.radius > board.width) {
                    this.x = board.width - this.radius;
                    this.dx = -this.dx;
                }
                else {
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

                    if (collidedBlockIndex !== -1) {
                        let block = blocks[collidedBlockIndex];
                        let x = block.col * blockSize;

                        if (this.x > x && this.x < x + blockSize) {
                            this.dy = -this.dy;
                        } else {
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
                                //Database
                                handleSubmit();
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
                    let collisionPoint = (this.x - (tableX + tableSize.x / 2)) / (tableSize.x / 2);
                    this.dx = collisionPoint * 5;
                    this.dy = -Math.sqrt(25 - this.dx ** 2);

                    if (this.type === 0) {
                    }
                }
            }
        }
        const displaySkillsOnScreen = (skillsOnBoard) => {
            const skillsDisplay = document.getElementById('skillsDisplay');
            skillsDisplay.innerHTML = '';
            skillsOnBoard.forEach(function () {
                const skillInfo = document.createElement('p');
                skillsDisplay.appendChild(skillInfo);
            });}

        const updateSkills = () => {
            if (skillsOnBoard.length !== 0) {
                let collidedSkillIndex = -1
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
                if (collidedSkillIndex !== -1) {
                    const skl = skillsOnBoard.splice(collidedSkillIndex, 1);
                    switch (skl[0].type) {
                        case 1:
                            if (skillsAvailable % 2 !== 0) {
                                skillsAvailable = skillsAvailable * 2;
                            }
                            break;
                        case 2:
                            if (skillsAvailable % 3 !== 0) {
                                skillsAvailable = skillsAvailable * 3;
                            }
                            break;
                        case 3:
                            if (skillsAvailable % 5 !== 0) {
                                skillsAvailable = skillsAvailable * 5;
                            }
                            break;
                        case 4:
                            if (skillsAvailable % 7 !== 0) {
                                skillsAvailable = skillsAvailable * 7;
                            }
                            break;
                        case 5:
                            if (skillsAvailable % 11 !== 0) {
                                skillsAvailable = skillsAvailable * 11;
                            }
                            break;
                    }
                }
                drawSkills(skillsOnBoard, context);
            }
        }
        const changeColor = () => {
            currentIndex = (currentIndex + 1) % colors.length;
            requestAnimationFrame(changeColor);}
        const update = () => {

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

            tableX += direction * 5;
            if (tableX < 0) {
                tableX = 0;
            } else if (tableX + tableSize.x > board.width) {
                tableX = board.width - tableSize.x;
            }
            ballsOnBoard.forEach(function (ball) {
                ball.draw(context);
                ball.move();
            })
        }

        initializeGame();
        return () => {
            audio.pause();
            audio.src = '';
        };
    });

    const mainStyle = 'mainStyle'

    return (
        <main className={mainStyle}>
            {/* HTML/JSX for rendering the game */}
                <canvas
                id="board"
                width={cols * blockSize}
                height={rows * blockSize}
                style={gameStyle}
            ></canvas>
        </main>
    );
};
const gameStyle = {
    fontSize: '1%',
    border: '10px solid grey',
    outline: 'none',
    marginLeft: '1%',
};



export default Game;
