import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Coin from './Components/Coin/Coin';
import Timer from './Components/Balance/Timer';
import Personal from './Components/Personal/Personal';
import Invite from './Components/Invite/Invite';
import Friends from './Components/Friends/Friends';
import Wallet from './Components/Wallet/Wallet';
import Tasks from './Components/Tasks/Tasks';
import BackgroundContainer from './Components/Background/Background';

import WebApp from '@twa-dev/sdk';

function App() {


  const [userData, setUserData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [lang, setLang] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isPremium, setPremium] = useState(false);


  const [cardsVisible, setCardsVisible] = useState(false)

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

  
  return (
    <>
      <BackgroundContainer />

      <Personal userId={userId} />

      <Timer isVisible={activeIndex === 0} cardsVisible={cardsVisible} setCardsVisible={setCardsVisible} />
      {(activeIndex === 0 && cardsVisible === true) && <Coin/>}

      {activeIndex === 1 && <Tasks/>}

      {activeIndex === 2 && <Invite userId={userId}/>}
      {activeIndex === 2 && <Friends userId={userId}/>}

      {activeIndex === 3 && <Wallet />}

      <NavBar onNavClick={handleNavBarClick} activeIndex={activeIndex} />
    </>
  );
}

export default App;
