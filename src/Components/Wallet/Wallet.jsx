import React from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'
import { WalletAddress } from '../WalletAddress';
import { useTonAddress } from '@tonconnect/ui-react';

const Wallet = () => {
  return (
    <div className="wallet">
      <button className="wallet-button">{useTonAddress}</button>
    </div>
  );
};

export default Wallet;
