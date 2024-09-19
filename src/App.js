'use client';

import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Coin from './Components/Coin/Coin';
import Balance from './Components/Balance/Balance';
import Personal from './Components/Personal/Personal';
import Invite from './Components/Invite/Invite';
import Friends from './Components/Friends/Friends';
import Wallet from './Components/Wallet/Wallet';
import Tasks from './Components/Tasks/Tasks';
import WebApp from '@twa-dev/sdk';
import { TonConnectUIProvider, TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "ton-core";


import DragonCoin from './Components/Photo/DragonCoin2.png';

function App() {

  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
    console.log("Wallet connected successfully!");
    setIsLoading(false);
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);  // Сбрасываем адрес кошелька
    console.log("Wallet disconnected successfully!");  // Выводим сообщение об успешном отключении
    setIsLoading(false);  // Останавливаем состояние загрузки
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI?.account?.address) {
        handleWalletConnection(tonConnectUI.account.address);
      } else {
        handleWalletDisconnection();
      }
    };
  
    checkWalletConnection();
  
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });
  
    return () => {
      unsubscribe();
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  };

  const formatAddress = (address) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };
  
  
  
  


  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lang, setLang] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isPremium, setPremium] = useState(false);

  const [balanceLoading, setBalanceLoading] = useState(true);

  const [clicks, setClicks] = useState([]);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavBarClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Проверяем, что WebApp доступен и инициализирован
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user;
      WebApp.setHeaderColor('#0C0C0C'); // Устанавливаем цвет заголовка
      WebApp.expand(); // Расширяем WebApp

      setUserData(user);
      setUserId(user.id);
      setLang(user.language_code);
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setUserName(user.username);
      setPremium(user.is_premium ? "yes" : "no");  
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
    if (userId) {
      fetch(`/get-user-points?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
          if (data.points !== undefined) {
            setBalanceAmount(data.points);
            setBalanceLoading(false); 
          } else {
            console.error('Ошибка: Не удалось получить баланс пользователя');
          }
        })
        .catch(error => console.error('Ошибка при получении баланса пользователя:', error));
    }
  }, 1000);
  
  // Очищаем таймер при размонтировании компонента или изменении userId
  return () => clearTimeout(timer);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetch('/update-user-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, points: balanceAmount }),
      })
      .then(response => response.json())
      .then(data => console.log('Баланс пользователя обновлен:', data))
      .catch(error => console.error('Ошибка при обновлении баланса пользователя:', error));
    }
  }, [balanceAmount]); // Следит за изменением balanceAmount



  function handleAnimationEnd(id) {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  }

  function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const imgRect = e.target.getBoundingClientRect();
    const imgX = imgRect.left;
    const imgY = imgRect.top;

    setClicks([...clicks, { id: Date.now(), x: imgX + x, y: imgY + y }]);
  }
const manifestUrl = "https://dragonlair.website/tonconnect-manifest.json"
  return (
    <TonConnectUIProvider manifestUrl="https://dragonlair.website/tonconnect-manifest.json" >

      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>

        {tonWalletAddress ? (
          <div className="flex flex-col items-center">
            <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
            <button
              onClick={handleWalletAction}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Disconnect Wallet
            </button>
          </div>
        ) : (
          <button
            onClick={handleWalletAction}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Connect TON Wallet
          </button>
        )}
      </main>

    </TonConnectUIProvider>
  );
}

export default App;
