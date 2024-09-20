import React from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'
import { TonConnectButton } from '@tonconnect/ui-react';

const Wallet = () => {
  return (
    <div className="wallet">
      <img src={WalletIcon} alt="Wallet Icon" className="wallet-image" />
      <TonConnectButton className="wallet-button" disabled={true}></TonConnectButton>
    </div>
  );
};

export default Wallet;
