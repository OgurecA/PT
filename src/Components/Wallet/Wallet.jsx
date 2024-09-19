import React, { useState } from 'react';
import './Wallet.css'; // Для стилей
import { TonConnect } from '@tonconnect/sdk'; // Импортируем SDK для подключения кошелька

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null); // Состояние для хранения адреса кошелька

  // Инициализируем TonConnect
  const tonConnect = new TonConnect();

  // Функция для подключения кошелька
  const connectWallet = async () => {
    try {
      // Подключаем кошелек и получаем адрес
      const wallet = await tonConnect.connectWallet();
      setWalletAddress(wallet.account.address); // Сохраняем адрес кошелька в состояние
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error); // Ловим ошибки, если что-то пошло не так
    }
  };

  return (
    <div className="wallet">
      {walletAddress ? (
        <div className="wallet-address">
          <p>Адрес кошелька: {walletAddress}</p>
        </div>
      ) : (
        <button className="wallet-button" onClick={connectWallet}>
          Подключить кошелек
        </button>
      )}
    </div>
  );
};

export default Wallet;
