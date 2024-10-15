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
import BackgroundContainer from './Components/Background/Background';

import WebApp from '@twa-dev/sdk';

import DragonCoin from './Components/Photo/DragonCoin2.png';

function App() {


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

  const [invitedBonus, setInvitedBonus] = useState(0);

  const handleNavBarClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Проверяем, что WebApp доступен и инициализирован
    if (WebApp.initDataUnsafe && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user;
      WebApp.setHeaderColor('#ffae00'); // Устанавливаем цвет заголовка
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


  useEffect(() => {
    if (userId) {
      fetch('/update-invited-bonus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, invitedBonus }),
      })
        .then((response) => response.json())
        .then((data) => console.log('Бонус от приглашенных обновлен:', data))
        .catch((error) => console.error('Ошибка при обновлении бонуса от приглашенных:', error));
    }
  }, [invitedBonus]);


  useEffect(() => {
    const timer = setTimeout(() => {
      if (userId) {
        // Запрос на сервер для получения бонуса от приглашённых друзей
        fetch(`/get-invited-bonus?userId=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.bonus !== undefined) {
              setInvitedBonus(data.bonus); // Устанавливаем бонус, полученный с сервера
            } else {
              console.error('Ошибка: Не удалось получить бонус от приглашённых');
            }
          })
          .catch((error) => console.error('Ошибка при получении бонуса от приглашённых:', error));
      }
    }, 1000);
  
    return () => clearTimeout(timer); // Очищаем таймер при демонтировании или изменении userId
  }, [userId]);
  


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
  
  return (
    <>
      <BackgroundContainer />

      <Personal userId={userId} />

      <Balance
        isVisible={activeIndex === 0}
        balanceAmount={balanceAmount}
        invitedBonus={invitedBonus}
        setBalanceAmount={setBalanceAmount}
        balanceLoading={balanceLoading}
      />
      {activeIndex === 0 && <Coin onClick={handleClick} />}

      {activeIndex === 1 && <Tasks balanceAmount={balanceAmount} setBalanceAmount={setBalanceAmount} />}

      {activeIndex === 2 && <Invite userId={userId} invitedBonus={invitedBonus} />}
      {activeIndex === 2 && <Friends userId={userId} invitedBonus={invitedBonus} setInvitedBonus={setInvitedBonus} />}

      {activeIndex === 3 && <Wallet />}

      <NavBar onNavClick={handleNavBarClick} activeIndex={activeIndex} />
      {clicks.map((click) => (
        <div
          key={click.id}
          className="float"
          style={{
            top: `${click.y - 70}px`,
            left: `${click.x - 20}px`,
            opacity: 1,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          <img src={DragonCoin} alt="" style={{ width: '70px', height: '70px' }} />
        </div>
      ))}
    </>
  );
}

export default App;
