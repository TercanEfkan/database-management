import React, {useEffect} from "react";
const Game = () => {
    let board;
    let context;
    let x = 0;
    let y = 0;
    const mainStyle = 'mainStyle'
    useEffect(() => {
        const initializeGame = () => {
            board = document.getElementById("board");
            context = board.getContext("2d"); //used for drawing on the board

            /*
            *
            * */

            setInterval(update, 1000 / 60); //100 milliseconds
        };
        const update = () => {
            context.fillStyle = "#444";
            context.fillRect(x, y, 10, 10);
            context.fillStyle = "blue";
        }
        initializeGame();
    });

return (

    <main className={mainStyle}>
        {/* HTML/JSX for rendering the game */}
        <canvas
            id="board"
            width={700}
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