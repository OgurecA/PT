import React, { useState } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Coin from './Components/Coin/Coin';
import Balance from './Components/Balance/Balance';
import Personal from './Components/Personal/Personal';
import Invite from './Components/Invite/Invite';
import Friends from './Components/Friends/Friends';
import Wallet from './Components/Wallet/Wallet';
import Tasks from './Components/Tasks/Tasks';

import DragonCoin from './Components/Photo/DragonCoin2.png';


function App() {

  const [clicks, setClicks] = useState([]);

  const [activeIndex, setActiveIndex] = useState(0); // Состояние для отслеживания активной кнопки

  // Обработчик для изменения активной кнопки
  const handleNavBarClick = (index) => {
    setActiveIndex(index);
  };


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
      <Personal />

      {activeIndex === 0 && <Balance />}
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
          <img src={DragonCoin} alt="" style={{ width: '50px', height: '50px' }} />
        </div>
        ))}
    </>
  );
}

export default App;
