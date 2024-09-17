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
import WebApp from "@twa-dev/sdk";

import DragonCoin from './Components/Photo/DragonCoin2.png';


function App() {

  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lang, setLang] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isPremium, setPremium] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const [clicks, setClicks] = useState([]);

  const [balanceAmount, setBalanceAmount] = useState(0);

  const [activeIndex, setActiveIndex] = useState(0); // Состояние для отслеживания активной кнопки

  // Обработчик для изменения активной кнопки
  const handleNavBarClick = (index) => {
    setActiveIndex(index);
  };


  useEffect(() => {
    if (window.WebApp && window.WebApp.initDataUnsafe && window.WebApp.initDataUnsafe.user) {
      const user = window.WebApp.initDataUnsafe.user;
      setUserData(user);
      setUserId(WebApp.initDataUnsafe.user.id);
      setLang(WebApp.initDataUnsafe.user.language_code);
      setFirstName(WebApp.initDataUnsafe.user.first_name);
      setLastName(WebApp.initDataUnsafe.user.last_name);
      setUserName(WebApp.initDataUnsafe.user.username);
      setPremium(WebApp.initDataUnsafe.user.is_premium ? true : false);

      // Если доступен URL аватара, сохраняем его
      if (user.photo_url) {
        setAvatarUrl(user.photo_url);
      }
    }
  }, []);










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
      <Personal firstName={firstName} lastName={lastName} userName={userName} avatarUrl={avatarUrl} />

      <Balance
        isVisible={activeIndex === 0}
        balanceAmount={balanceAmount}
        setBalanceAmount={setBalanceAmount}
      />
      {activeIndex === 0 && <Coin onClick={handleClick} />}

      {activeIndex === 1 && <Tasks />}

      {activeIndex === 2 && <Invite />}
      {activeIndex === 2 && <Friends />}

      {activeIndex === 3 && <Wallet />}

      <NavBar onNavClick={handleNavBarClick} activeIndex={activeIndex} />
      {clicks.map((click) => (
        <div
        key={click.id}
        className="float"
          style={{
            top: `${click.y - 70}px`, // Adjusting to center the small image
            left: `${click.x - 20}px`, // Adjusting to center the small image
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
