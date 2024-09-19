import React, { useState } from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'
import { TonConnect } from "@tonconnect/sdk"; // Импортируем TonConnect для работы с кошельком

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null); // Состояние для хранения адреса кошелька
  const tonConnect = new TonConnect();

  const connectWallet = async () => {
    try {
      const wallet = await tonConnect.connectWallet(); // Подключаем кошелек
      setWalletAddress(wallet.account); // Сохраняем адрес кошелька
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
    }
  };

  return (
    <div className="wallet">
      {walletAddress ? (
        <div className="wallet-address">
          <p>Wallet: {walletAddress}</p>
        </div>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
