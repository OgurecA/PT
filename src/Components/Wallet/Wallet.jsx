import React, { useState } from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png'; // Импортируем иконку кошелька

const Wallet = () => {
  const [account, setAccount] = useState(null); // Убираем типизацию, просто используем состояние

  // Функция для подключения кошелька StarkNet
  const connectWallet = async () => {
    try {
      if (window.starknet) {
        await window.starknet.enable(); // Запрашиваем доступ к кошельку
        const accountAddress = window.starknet.selectedAddress || null; // Получаем адрес кошелька
        setAccount(accountAddress); // Сохраняем адрес в состояние
        console.log('Подключённый аккаунт:', accountAddress);
      } else {
        alert('Кошелек StarkNet не найден. Установите Argent X или Braavos.');
      }
    } catch (error) {
      console.error('Ошибка подключения к StarkNet кошельку:', error);
    }
  };

  return (
    <div className="wallet">
      <img src={WalletIcon} alt="Wallet Icon" className="wallet-image" />
      {!account ? (
        <button className="wallet-button" onClick={connectWallet}>
          Подключить кошелек StarkNet
        </button>
      ) : (
        <p>Ваш аккаунт: {account}</p>
      )}
    </div>
  );
};

export default Wallet;
