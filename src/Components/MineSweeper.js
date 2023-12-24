import React, { useState, useEffect } from 'react';
const Game = () => {
    let board;
    let context;
    let rowNumber = 20;
    let columnNumber = 20;
    let minesNumber = Math.floor((rowNumber * columnNumber) / 20);
    const mainStyle = 'mainStyle'
    const squareColor = '#fff'; // Beyaz renk
    const lineColor ='#000'; // Siyah renk
    const rowCount = 20;
    const colCount = 20;
    let blockPixelSize = 25;
    // Klavye modunu izleyen state
    const [mode, setmode] = useState(false);
    const map = [];



    useEffect(() => {
        const initializeGame = () => {

            board = document.getElementById("board");
            context = board.getContext("2d"); //used for drawing on the board
            console.log("before the filling");
            fillMap();
            console.log("after the filling");
            draw() // ekrana karoları çizme
            addClickEvent();

        };
        const fillMap = () => {
            for (let i = 0; i < rowCount; i++){
                const temp = [];
                for (let j = 0; j < colCount; j++){
                    temp.push(new Block());
                }
                map.push(temp);
            }
            for (let i = 0; i< minesNumber; i++){
                let r;
                let c;
                do {
                    r = randomInt(0,rowCount);
                    c = randomInt(0, colCount);
                } while (map[r][c].value === -1);

                map[r][c].value = -1;
            }
            for(let i = 0; i< rowCount; i++){
                for(let j = 0; j<colCount; j++){
                    if (map[i][j].value === -1){
                        for (let k = i-1; k <= i+1; k++) {
                            for (let l = j-1; l <= j+1; l++) {
                                if (0<=k && k<rowNumber && 0<=l && l<columnNumber && map[k][l].value !== -1){
                                    map[k][l].value +=1;
                                }
                            }
                        }
                    }
                }
            }

            console.log('Mines List:');
            for (let i = 0; i < rowCount; i++) {
                let row = '';
                for (let j = 0; j < colCount; j++) {
                    row += map[i][j].value === -1 ? 'X ' : map[i][j].value+ ' ' ;
                }
                console.log(row);
            }
        }
        const clicked = (clickedRow,clickedColumn) =>{
            if(0<=clickedRow && clickedRow<rowNumber && 0<=clickedColumn && clickedColumn<columnNumber && map[clickedRow][clickedColumn].isOpen===false){
                if (map[clickedRow][clickedColumn].value === -1){
                    context.clearRect(0, 0, board.width, board.height);

                    // Display game over text
                    context.fillStyle = 'black';
                    context.font = '40px Arial';
                    context.fillText('Game Over!', board.width / 2 - 100, board.height / 2);
                    return;
                }
                if (map[clickedRow][clickedColumn].value === 0){
                    map[clickedRow][clickedColumn].isOpen=true;
                    clicked(clickedRow-1,clickedColumn)
                    clicked(clickedRow+1,clickedColumn)
                    clicked(clickedRow,clickedColumn-1)
                    clicked(clickedRow,clickedColumn+1)
                    clicked(clickedRow-1,clickedColumn-1)
                    clicked(clickedRow-1,clickedColumn+1)
                    clicked(clickedRow+1,clickedColumn-1)
                    clicked(clickedRow+1,clickedColumn+1)
                }
                map[clickedRow][clickedColumn].isOpen=true;
                if (map[clickedRow][clickedColumn].value !==-1){
                    changeSquare(clickedRow,clickedColumn);
                }
            }
            return null;
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

            return clicked(clickedRow, clickedCol);

        };

        // mode değişikliği

        const changeSquare = (row, col) => { // Tıklanan kareye yapılacak olan işlem
            // row, col değerleri istenecek. işlem yapılacak kare için
            // arrayden o kareneni değerleri çekilecek
            // mode istenecek karelere flag koymak için

            context.fillStyle = lineColor;
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(map[row][col].value, col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2);
        };
        const flagSquare=(row, col) =>{
            if (map[row][col].isOpen===false){
                context.fillStyle = '#F00';
                context.beginPath();
                context.arc(col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2, 4, 0, 2 * Math.PI, true);
                context.closePath();
                context.fill();
            }
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