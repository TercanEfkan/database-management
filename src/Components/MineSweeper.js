import React, { useState, useEffect } from 'react';
const Game = () => {
    let board;
    let context;
    const rowCount = 20;
    const colCount = 20;
    let minesNumber = Math.floor((rowCount * colCount) / 20);
    const squareColor = '#fff'; // Beyaz renk
    const lineColor ='#000'; // Siyah renk
    let blockPixelSize = 25;
    const map = [];
    let [totalScore, setTotalScore] = useState(0); // Score'u izleyen state
    let score;



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
            /* konsolda kontrol etme amaçlı
            console.log('Mines List:');
            for (let i = 0; i < rowCount; i++) {
                let row = '';
                for (let j = 0; j < colCount; j++) {
                    row += map[i][j].value === -1 ? 'X ' : map[i][j].value+ ' ' ;
                }
                console.log(row);
            }*/
        }
        const clicked = (clickedRow,clickedColumn) =>{
            if(0<=clickedRow && clickedRow<rowCount && 0<=clickedColumn && clickedColumn<colCount && map[clickedRow][clickedColumn].isOpen===false){
                if (map[clickedRow][clickedColumn].value === -1){
                    // tüm mayınların açılması. patlama sesi ekle.
                    showTheMines()
                    //information box a bilgileri yazdır.
                    return;
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
                    score += map[clickedRow][clickedColumn].value;
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

            score = 0
            clicked(clickedRow, clickedCol);
            /*Bu fonksiyonu kullandığım zaman useState tekrar çalışıyor ve ekran sıfırlanıyor.
            en kötü ihtimalle bilgileri bir yerde tutup ekranı ona göre baştan bastıracak bir sistem ile bunu çözerim
            initializeGame fonksiyonu değişir. onu dışarı alırım draw fonksiyonu baştan yazılır. fillmap use state dışında yapılır. */
            
            //setTotalScore((prevTotalScore) => prevTotalScore + score);

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
    },[totalScore]);


    const mainStyle = 'mainStyle'
    const informationBox = 'information-box'
    return (

        <main className={mainStyle}>
            {/* HTML/JSX for rendering the game */}
            <div>
                <canvas
                    id="board"
                    width={500}
                    height={500}
                    style={gameStyle}
                ></canvas>
                <aside id={informationBox}>
                    <p>Score: {totalScore}</p>

                </aside>
            </div>

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