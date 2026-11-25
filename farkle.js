import React from 'react';
import { useState } from 'react'

import { useEffect, useRef } from 'react';

function App() {

  const [bank, setBank] = useState(1000);
  const [opponentBank, setOpponentBank] = useState(1000);
  const [betAmount, setBetAmount] = useState('');
  const [betPlaced, setBetPlaced] = useState(false);
  const [betMessage, setBetMessage] = useState('');
  const [pot, setPot] = useState(0);

  const [gameActive, setGameActive] = useState(false);

  const [diceSetOne, setDiceSetOne] = useState([
    {id: 0, value: 0},
    {id: 1, value: 0},
    {id: 2, value: 0},
    {id: 3, value: 0},
    {id: 4, value: 0},
    {id: 5, value: 0},
  ])

  const [diceSetTwo, setDiceSetTwo] = useState([
    {id: 0, value: 0},
    {id: 1, value: 0},
    {id: 2, value: 0},
    {id: 3, value: 0},
    {id: 4, value: 0},
    {id: 5, value: 0},
  ])
  
  const styles = {
    main: {
      padding: '20px',
      textAlign: 'center',
    },
    title: {
      color: '#5C6AC4',
      textAlign: 'center',
    },
    heading: {
      color: 'gray',
      textAlign: 'center',
    },
    buttonStyle: {
      margin: '10px',
    },
    errorMessage: {
      color: 'red'
    },
  };


  function betOnGame(bet){
    const dollarAmountRegex = /^\$?(\d{1,3}(,\d{3})*|\d+)(\.\d{1,2})?$/;
    
    const result = dollarAmountRegex.test(betAmount.trim());

    if (result && betAmount <= opponentBank){
      setBank(bank - betAmount);
      setOpponentBank(opponentBank - betAmount);
      setPot(betAmount*2)
      setBetMessage('');
    } else {
      setBetMessage('Please enter a valid dollar amount, and make sure you and your opponent have enough for the bet!');
    }

  }

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Farkle!</h1>
      <h2 style={styles.heading}>Your Bank: ${bank.toFixed(2)} </h2>
      <h2 style={styles.heading}>Opponent Bank: ${opponentBank.toFixed(2)}</h2>
      <h2 style={styles.heading}>Pot: ${pot.toFixed(2)}</h2>

      <div>
        
        <button disabled={gameActive} style={styles.buttonStyle} onClick={() => setGameActive(true)}>
          New Game
        </button>

        <button disabled={!gameActive} onClick={() => setGameActive(false)}>
          End Game
        </button>

      </div>

      {
        gameActive && <div>
          <input value={betAmount} onChange={(e) => setBetAmount(e.target.value)} placeholder="Bet Amount" />
          
          <button disabled={betPlaced} style={styles.buttonStyle} onClick={() => betOnGame(betAmount)}> Place Bet</button>
          <div style={styles.errorMessage}>{betMessage}</div>
          
        
        </div>
      }

    </div>

  )
}

export default App
