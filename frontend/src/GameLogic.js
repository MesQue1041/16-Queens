import React, { useState } from 'react';
import axios from 'axios';
import Chessboard from './Chessboard';
import './GameLogic.css';

const GameLogic = () => {
  const [board, setBoard] = useState(Array(16).fill().map(() => Array(16).fill(0)));
  const [userName, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const handleSquareClick = (row, col) => {
    const currentQueenCount = board.flat().filter(cell => cell === 1).length;

    if (currentQueenCount < 16 || board[row][col] === 1) {
      const newBoard = board.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? (cell === 1 ? 0 : 1) : cell
        )
      );
      setBoard(newBoard);
    }
  };

  const handleSubmit = async () => {
    const currentQueenCount = board.flat().filter(cell => cell === 1).length;

    if (currentQueenCount !== 16) {
      setMessage('Place all 16 Queens before submitting');
      return;
    }

    if (!userName) {
      setMessage('Please enter your name !');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/solutions/check', { board, userName });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="game-container">
      <Chessboard board={board} onSquareClick={handleSquareClick} />
      <div className="form-container">
        <h1>Sixteen Queens Game</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="player-name-input"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default GameLogic;
