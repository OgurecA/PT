import React from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'
import { WalletAddress } from '../WalletAddress';

const Wallet = () => {
  return (
    <div className="wallet">
      <WalletAddress />
      <button className="wallet-button">Connect Wallet</button>
    </div>
  );
};

export default Wallet;
