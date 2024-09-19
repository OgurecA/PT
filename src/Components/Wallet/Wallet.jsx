import React from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'

const Wallet = () => {
  return (
    <div className="wallet">
      <img src={WalletIcon} alt="Wallet Icon" className="wallet-image" />
      <button className="wallet-button">Connect Wallet</button>
    </div>
  );
};

export default Wallet;
