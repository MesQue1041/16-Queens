import React, { useState } from 'react';
import './Chessboard.css';

export const Chessboard = () => {

    const [board, setBoard] = useState(Array(16).fill().map(() => Array(16).fill(0)));

    const handleSquareClick = (row, col) => {
        const currentQueenCount = board.flat().filter(cell => cell === 1).length;

        //Check if theres less than 16 queens to add a new queen
        if (currentQueenCount < 16 || board[row][col] === 1) {    //checks if number of queens is less than 16 and allows us to toggle queens
            const newBoard = board.map((r, rowIndex) =>         // maps through each row
                r.map((cell, colIndex) =>      //maps through each cell according to the column
                    // 
                    rowIndex === row && colIndex === col ? (cell === 1 ? 0 : 1) : cell
                )
            );
            setBoard(newBoard);
        }
    };

    return (
        <div className="chessboard-container"> 
        <div className="chessboard">
            {board.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                    {row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'} ${cell === 1 ? 'queen' : ''}`} 
                            onClick={() => handleSquareClick(rowIndex, colIndex)} 
                        >
                        </div>
                    ))}
                </div>
            ))}
        </div>
        </div>
    );
};

export default Chessboard;
