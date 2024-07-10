'use client';

import { useState } from 'react';

function Square({ value, isAWinner, onSquareClick }: any) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={isAWinner ? { backgroundColor: 'green' } : { backgroundColor: 'lightblue' }}
    >
    {value}
    </button>
  );
}

function calculateWinner(squares: Array<string>) {
  
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  
  return [];

}

function getStatus(squares: Array<string>, winningSquares: Array<number>, xIsNext: boolean) {

  if (winningSquares.length === 0) {
    const nextPlayer = xIsNext ? "X" : "O";
    return `Next player: ${nextPlayer}`;
  }

  if (squares.includes("")) {
    return `Winner: ${squares[winningSquares[0]]}`;
  }

  return "Winner: tie game!";

}

function getBoard(squares: Array<string>, winningSquares: Array<number>, handleClick: Function) {
  return Array.from(Array(3).keys()).map(i =>
    <div key={i} className="board-row">
      {
        Array.from(Array(3).keys()).map(j => 
          <Square 
            key={j}
            value={squares[3*i + j]}
            isAWinner={winningSquares.includes(3*i + j)}
            onSquareClick={() => handleClick(3*i + j)}
          />
        )
      }
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }: any) {
  
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares).length !== 0) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winningSquares = calculateWinner(squares);
  const status = getStatus(squares, winningSquares, xIsNext);
  const board = getBoard(squares, winningSquares, handleClick);
  
  return (<>
    <div className="status">{status}</div>
    <div>{board}</div>
  </>);

}

function getMoves(history: Array<Array<string>>, setCurrentMove: Function, moveOrder: boolean) {

  const moves = history.map((_, move) => {
    const description = (move > 0) ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => setCurrentMove(move)}>{description}</button>
      </li>
    );
  });

  if (!moveOrder) {
    moves.reverse();
  }

  return moves;

}

function getMoveOrderButton(setMoveOrder: Function, moveOrder: boolean) {
  return (
    <button onClick={() => setMoveOrder(!moveOrder)}>
      Sort moves in {moveOrder ? "ascending" : "descending"} order
    </button>
  );
}

export default function Game() {
  
  const [history, setHistory] = useState([Array(9).fill("")]);
  const [currentMove, setCurrentMove] = useState(0);
  const [moveOrder, setMoveOrder] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = getMoves(history, setCurrentMove, moveOrder);
  const moveOrderButton = getMoveOrderButton(setMoveOrder, moveOrder);
  
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        {moveOrderButton}
        <ol>{moves}</ol>
      </div>
    </div>
  );

}