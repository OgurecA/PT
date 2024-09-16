import React from 'react';
import './Coin.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin2.png'; // Импортируем изображение

const Coin = ({ onClick }) => {
  return (
    <div className="coin" onClick={onClick}>
      <img src={DragonCoin} alt="Coin" className="coin-image" />
    </div>
  );
};

export default Coin;
