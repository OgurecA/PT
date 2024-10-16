import React from 'react';
import './Cards.css'; // Импортируем CSS для стилизации
import Rubashka from '../Photo/Bicycle.png'; // Убедитесь, что путь к изображению верный

const Card = () => {
  return (
    <div className="card-container">
      <div className="card card1">
        <img src={Rubashka} alt="Card 1" className="card-image" />
      </div>
      <div className="card card2">
        <img src={Rubashka} alt="Card 2" className="card-image" />
      </div>
      <div className="card card3">
        <img src={Rubashka} alt="Card 3" className="card-image" />
      </div>
    </div>
  );
};

export default Card;
