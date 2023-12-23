import React, { useState, useEffect } from 'react';
const Game = () => {
    let board;
    let context;
    let rowNumber = 20;
    let columnNumber = 20;
    let minesNumber = Math.floor((rowNumber * columnNumber) / 5);
    //let backendMap
    const mainStyle = 'mainStyle'
    const squareColor = '#fff'; // Beyaz renk
    const lineColor ='#000'; // Siyah renk
    const rowCount = 20;
    const colCount = 20;
    let blockPixelSize = 25;
    // Klavye modunu izleyen state
    const [mode, setmode] = useState(false);


 
    useEffect(() => {
        let backendMap
        const initializeGame = () => {

            board = document.getElementById("board");
            context = board.getContext("2d"); //used for drawing on the board
            //createBackendMap()
            draw() // ekrana karoları çizme
            setInterval(update, 1000 / 60); //100 milliseconds

        };
        const update = () => {
            document.addEventListener('keyup', handleKeyUp);

            addClickEvent(); //Tıklama işlemi
        }
        const createBackendMap = () => {
            backendMap = createArray(rowNumber,columnNumber);
            createMines();
            findValueAroundOfMines();
        }
        const createArray = (rowNumber, columnNumber)=>{
            let myArray = new Array(rowNumber)
            let block = new Block()

            for (let i = 0; i < rowNumber; i++) {
                myArray[i] = new Array(columnNumber);

                for (let j = 0; j < columnNumber; j++) {
                    myArray[i][j] = block;
                }
            }
            return myArray;
        }
        const createMines = () =>{

            for (let i = 0; i < minesNumber;) {
                let randomRow = randomInt(0,rowNumber)
                let randomColumn = randomInt(0,columnNumber)

                if(backendMap[randomRow][randomColumn]===0){
                    backendMap[randomRow][randomColumn].value=-1;
                    i++;
                }
            }
        }
        function findValueAroundOfMines(){ // mayının konumunu bulur
            for (let i = 0; i < backendMap.length; i++) {
                for (let j = 0; j < backendMap[i].length; j++) {
                    if (backendMap[i][j] === -1){
                        increaseValueArounOfMines(i,j)
                    }
                }
            }
        }

        function increaseValueArounOfMines(row,column){ //mayının çevresindeki block ların değerini arttırır

            for (let i = row-1; i < row+2; i++) {
                for (let j = column-1; j < column+2; j++) {
                    if (0<=i && i<rowNumber && 0<=j && j<columnNumber && backendMap[i][j] !== -1){
                        backendMap[i][j] += 1;
                    }
                }
            }
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
        const handleKeyUp = (event) => {
            if (event.code === 'Space') {
                // Mod aç kapa işlemi
                setmode(!mode);
            }
        };

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

            //let value = backendMap[row][col].value;
            context.fillStyle = lineColor;
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(1/*value,*/, col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2);
        };

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