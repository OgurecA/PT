import React, { useState, useEffect } from 'react';
import './Wallet.css'; // Импортируем CSS для стилизации
import WalletIcon from '../Photo/Wallet.png';
import { TonConnect } from "@tonconnect/sdk"; // Импортируем TonConnect для работы с кошельком

const Wallet = () => {
  const [walletAddress, setWalletAddress] = useState(null); // Состояние для хранения адреса кошелька
  const [isImageVisible, setImageVisible] = useState(true); // Состояние для управления видимостью изображения
  const [tonConnect, setTonConnect] = useState(null);

  useEffect(() => {
    // Инициализируем TonConnect при монтировании компонента
    const tonConnectInstance = new TonConnect();
    setTonConnect(tonConnectInstance);
    console.log('TonConnect инициализирован');
  }, []);

  const connectWallet = async () => {
    if (!tonConnect) {
      console.error('TonConnect не инициализирован');
      return;
    }

    try {
      console.log('Подключение кошелька...');
      const wallet = await tonConnect.connectWallet(); // Подключаем кошелек
      console.log('Кошелек подключен:', wallet);
      setWalletAddress(wallet.account); // Сохраняем адрес кошелька
    } catch (error) {
      console.error('Ошибка подключения кошелька:', error);
    }
  };

  // Функция для проверки, работает ли кнопка (скрывает изображение при нажатии)
  const handleButtonClick = () => {
    setImageVisible(false); // Делаем изображение невидимым
    connectWallet(); // Вызываем функцию подключения кошелька
  };

  return (
    <div className="wallet">
      {isImageVisible && <img src={WalletIcon} alt="Wallet Icon" className="wallet-image" />}
      {walletAddress ? (
        <div className="wallet-address">
          <p>Wallet: {walletAddress}</p>
        </div>
      ) : (
        <button className="wallet-button" onClick={handleButtonClick}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Wallet;
