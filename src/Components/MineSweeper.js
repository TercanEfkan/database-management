import React, { useState, useEffect } from 'react';
const Game = () => {
    let board;
    let context;
    let rowNumber = 20;
    let columnNumber = 20;
    let minesNumber = Math.floor((rowNumber * columnNumber) / 5);
    const mainStyle = 'mainStyle'
    const squareColor = '#fff'; // Beyaz renk
    const lineColor ='#000'; // Siyah renk
    const rowCount = 20;
    const colCount = 20;
    let blockPixelSize = 25;
    // Klavye modunu izleyen state
    const [mode, setmode] = useState(false);
    const mines = [];



    useEffect(() => {
        const initializeGame = () => {

            board = document.getElementById("board");
            context = board.getContext("2d"); //used for drawing on the board
            console.log("before the filling");
            fillMines();
            console.log("after the filling");
            draw() // ekrana karoları çizme
            setInterval(update, 1000 / 60); //100 milliseconds

        };
        const fillMines = () => {
            for (let i = 0; i < rowCount; i++){
                const temp = [];
                for (let j = 0; j < colCount; j++){
                    temp.push(new Block());
                }
                mines.push(temp);
            }


            for (let i = 0; i< minesNumber; i++){
                let r;
                let c;
                do {
                    r = randomInt(0,rowCount);
                    c = randomInt(0, colCount);
                } while (mines[r][c].value === -1);

                mines[r][c].value = -1;
            }
            console.log('Mines List:');
            for (let i = 0; i < rowCount; i++) {
                let row = '';
                for (let j = 0; j < colCount; j++) {
                    row += mines[i][j].value === -1 ? 'X ' : '0 ';
                }
                console.log(row);
            }
        }
        const update = () => {
            addClickEvent(); //Tıklama işlemi
        }


        function randomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        const draw = ()=>{
            for (let row = 0; row < rowCount; row++) {
                for (let col = 0; col < colCount; col++) {
                    // Hücre çizilir
                    context.fillStyle =  squareColor
                    context.fillRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);

                    // Hücre sınırları çizilir
                    context.strokeStyle = lineColor
                    context.strokeRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);
                }
            }
        }

        const addClickEvent = () => {
            board.addEventListener('click', handleSquareClick);
            board.addEventListener('contextmenu', handleRightClick);
        };
        const handleRightClick = (event) => {
            event.preventDefault();
            // Your logic for right-click (flag placement)
            let gameAreaBorderSize = 10;
            const mouseX = event.clientX - board.getBoundingClientRect().left - gameAreaBorderSize;
            const mouseY = event.clientY - board.getBoundingClientRect().top - gameAreaBorderSize;

            const clickedCol = Math.floor(mouseX / blockPixelSize);
            const clickedRow = Math.floor(mouseY / blockPixelSize);

            flagSquare(clickedRow, clickedCol);
            // Handle flag placement logic at the clickedRow and clickedCol
            // Example: toggleFlag(clickedRow, clickedCol);
        };
        const handleSquareClick = (event) => { //tıklama işlemi
            // game Area çevresindeki border kordinatlarda sapmaya neden oluyor
            let gameAreaBorderSize = 10
            //mouse un tıkladığı yerin kordinatları.
            const mouseX = event.clientX - board.getBoundingClientRect().left - gameAreaBorderSize;
            const mouseY = event.clientY - board.getBoundingClientRect().top - gameAreaBorderSize;

            const clickedCol = Math.floor(mouseX / blockPixelSize);
            const clickedRow = Math.floor(mouseY / blockPixelSize);

            changeSquare(clickedRow, clickedCol);

        };

        // mode değişikliği

        const changeSquare = (row, col) => { // Tıklanan kareye yapılacak olan işlem
            // row, col değerleri istenecek. işlem yapılacak kare için
            // arrayden o kareneni değerleri çekilecek
            // mode istenecek karelere flag koymak için

            if(mode){
                // flag koyma işlemi
                // karenin flag değeri değiştirilecek
            }
            else{
                // Karelerin açılım işlemi
            }

            context.fillStyle = lineColor;
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(1/*value,*/, col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2);
        };
        const flagSquare=(row, col) =>{
            context.fillStyle = '#F00';
            context.beginPath();
            context.arc(col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2, 4, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }

        class Block {
            constructor() {
                this.value = 0;
                this.flag = false;
                this.isOpen = false;
            }
        }

        initializeGame();
    });

    return (

        <main className={mainStyle}>
            {/* HTML/JSX for rendering the game */}
            <canvas
                id="board"
                width={500}
                height={500}
                style={gameStyle}
            ></canvas>
        </main>
    );
};
const gameStyle = {
    fontSize: '1%',
    border: '10px solid grey',
    // Define border width, style, and color
    outline: 'none',
    marginLeft: '1%',
};
export default Game;