import React, {  } from 'react';
import './NavBar.css'; // Импортируем CSS для стилизации
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faTasks, faUserFriends, faWallet } from '@fortawesome/free-solid-svg-icons'; // Импортируем иконки

const NavBar = ({ onNavClick, activeIndex }) => {
  

  // Массив иконок и текстов
  const icons = [faCoins, faTasks, faUserFriends, faWallet];
  const texts = ['Mine', 'Task', 'Invite', 'Wallet'];

  return (
    <nav className="navbar">
      {texts.map((text, index) => (
        <div
          key={index}
          className={`navbutton ${activeIndex === index ? 'active' : ''}`}
          onClick={() => onNavClick(index)}
          tabIndex="0" // Добавляем tabIndex для фокуса
        >
          <FontAwesomeIcon icon={icons[index]} />
          {activeIndex === index && <span>{text}</span>}
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
