import React, { useState, useEffect } from 'react';
let board;
let context;
const rowCount = 20;
const colCount = 20;
let minesNumber = Math.floor((rowCount * colCount) / 20);
const squareColor = '#fff'; // Beyaz renk
const lineColor ='#000'; // Siyah renk
let blockPixelSize = 25;
const map = [];

const Game = () => {

    let [score, setScore] = useState(0);
    let [numberOfMineFlags, setNumberOfMineFlags] = useState(minesNumber);
    let [gameOver, setGameOver] = useState('')




    useEffect(() => {
        board = document.getElementById("board");
        context = board.getContext("2d"); //used for drawing on the board
        fillMap();
        draw()
        addClickEvent()
    },[])

    useEffect(() => {
        // ekrana score yazdırılır.
    },[score,numberOfMineFlags, gameOver])


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

        clicked(clickedRow, clickedCol);

    };

    const changeSquare = (row, col) => { // Tıklanan kareye yapılacak olan işlem

        context.fillStyle = lineColor;
        context.font = "bold 12px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(map[row][col].value, col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2);
    };
    const flagSquare=(row, col) =>{
        if (map[row][col].isOpen===false){
            context.font = "bold 12px Arial";
            context.textAlign = "center";
            context.textBaseline = "middle";
            if (map[row][col].flag === false){
                context.fillStyle = '#8B0000';
                context.fillText('\u{1F6A9}', col * blockPixelSize + blockPixelSize / 2, row * blockPixelSize + blockPixelSize / 2);
                map[row][col].flag = true;
                setNumberOfMineFlags((prevNumberOfMineFlags) => {
                    return prevNumberOfMineFlags-1;
                });
            }else{
                // Hücre çizilir
                context.fillStyle =  squareColor
                context.fillRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);

                // Hücre sınırları çizilir
                context.strokeStyle = lineColor
                context.strokeRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);

                map[row][col].flag = false;
                setNumberOfMineFlags((prevNumberOfMineFlags) => {
                    return prevNumberOfMineFlags+1;
                });
            }
        }
    }

    const clicked = (clickedRow,clickedColumn) =>{
        if(0<=clickedRow && clickedRow<rowCount && 0<=clickedColumn && clickedColumn<colCount && map[clickedRow][clickedColumn].isOpen===false && map[clickedRow][clickedColumn].flag===false){
            if (map[clickedRow][clickedColumn].value === -1){
                // Patlama sesi ekle.
                showTheMines()
                setGameOver((prevGameOver) => {
                    return 'Game Over';
                });

            }
            if (map[clickedRow][clickedColumn].value === 0){
                map[clickedRow][clickedColumn].isOpen=true;
                clicked(clickedRow-1,clickedColumn);
                clicked(clickedRow+1,clickedColumn);
                clicked(clickedRow,clickedColumn-1);
                clicked(clickedRow,clickedColumn+1);
                clicked(clickedRow-1,clickedColumn-1);
                clicked(clickedRow-1,clickedColumn+1);
                clicked(clickedRow+1,clickedColumn-1);
                clicked(clickedRow+1,clickedColumn+1);
            }
            map[clickedRow][clickedColumn].isOpen=true; // 0 dışındaki sayılar için
            if (map[clickedRow][clickedColumn].value !==-1){
                setScore((prevScore) => {
                    return prevScore + map[clickedRow][clickedColumn].value;
                });
                changeSquare(clickedRow,clickedColumn);
            }
        }
        return null;
    }

    const showTheMines = () =>{
        for (let i = 0; i < rowCount; i++) {
            for (let j = 0; j < colCount; j++) {
                if(map[i][j].value === -1){
                    context.fillStyle = '#8B0000';
                    context.font = "bold 12px Arial";
                    context.textAlign = "center";
                    context.textBaseline = "middle";
                    context.fillText('\u2734', j * blockPixelSize + blockPixelSize / 2, i * blockPixelSize + blockPixelSize / 2);
                }
            }
        }
    }

    const mainStyle = 'mainStyle'
    const informationBox = 'information-box'
    const textGameOver = 'text-game-over'
    const container = 'container'

    return (

        <main className={mainStyle}>
            {/* HTML/JSX for rendering the game */}
            <div id={container}>
                <canvas
                    id="board"
                    width={500}
                    height={500}
                    style={gameStyle}
                ></canvas>
                <aside id={informationBox}>
                    <p style={{order:1}}>Score: {score}</p>
                    <p id={textGameOver}>{gameOver}</p>
                    <p style={{order:3}}>Mines: {numberOfMineFlags}</p>
                </aside>
            </div>

        </main>
    );
}
const draw = ()=>{
    for (let row = 0; row < rowCount; row++) {
        for (let col = 0; col < colCount; col++) {
            // Hücre çizilir
            blockPixelSize = 25
            context.fillStyle =  squareColor
            context.fillRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);

            // Hücre sınırları çizilir
            context.strokeStyle = lineColor
            context.strokeRect(col * blockPixelSize, row * blockPixelSize, blockPixelSize, blockPixelSize);
        }
    }
}

const fillMap = () => {

    // Map bilgilerinin içereceği list in oluşturulması
    for (let i = 0; i < rowCount; i++){
        const temp = [];
        for (let j = 0; j < colCount; j++){
            temp.push(new Block());
        }
        map.push(temp);
    }

    // mayınların random listeye yerleştirme
    for (let i = 0; i< minesNumber; i++){
        let r;
        let c;
        do {
            r = randomInt(0,rowCount);
            c = randomInt(0, colCount);
        } while (map[r][c].value === -1);

        map[r][c].value = -1;
    }

    // mayınların çevresindeki karelerin değerinin arttırılması.
    for(let i = 0; i< rowCount; i++){
        for(let j = 0; j<colCount; j++){
            if (map[i][j].value === -1){
                for (let k = i-1; k <= i+1; k++) {
                    for (let l = j-1; l <= j+1; l++) {
                        if (0<=k && k<rowCount && 0<=l && l<colCount && map[k][l].value !== -1){
                            map[k][l].value +=1;
                        }
                    }
                }
            }
        }
    }
    /* konsolda kontrol etme amaçlı*/
    console.log('Mines List:');
    for (let i = 0; i < rowCount; i++) {
        let row = '';
        for (let j = 0; j < colCount; j++) {
            row += map[i][j].value === -1 ? 'X ' : map[i][j].value+ ' ' ;
        }
        console.log(row);
    }
}

const randomInt =(min, max) =>{
    return Math.floor(Math.random() * (max - min)) + min;
}

class Block {
    constructor() {
        this.value = 0;
        this.flag = false;
        this.isOpen = false;
    }
}



const gameStyle = {
    fontSize: '1%',
    border: '5px solid',
    borderColor: '#282828 #DCDCDC #DCDCDC #282828',
};

export default Game;