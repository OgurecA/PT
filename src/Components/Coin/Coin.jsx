import React from 'react';
import './Coin.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin2.png'; // Импортируем изображение

const Coin = () => {
  return (
    <div className="coin">
      <img src={DragonCoin} alt="Coin" className="coin-image" />
    </div>
  );
};

export default Coin;
