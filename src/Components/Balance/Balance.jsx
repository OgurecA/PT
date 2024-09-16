import React from 'react';
import './Balance.css'; // Импортируем CSS для стилизации

const Balance = () => {
  return (
    <div className="balance">
      <div className="balance-header">
        <span className="balance-text">Your Balance</span>
        <span className="balance-amount">0</span>
      </div>
      <button className="balance-button">Пополнить</button>
    </div>
  );
};

export default Balance;
