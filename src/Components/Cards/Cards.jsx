import React, { useState } from 'react';
import './Cards.css'; // Импортируем CSS для стилизации
import Rubashka from '../Photo/Bicycle.png'; // Убедитесь, что путь к изображению верный

const Card = () => {
  const [selectedCard, setSelectedCard] = useState(null); // Состояние для отслеживания выбранной карты
  const [cardRotate, setCardRotate] = useState(null); // Состояние для отслеживания выбранной карты

  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber); // Устанавливаем номер выбранной карты
    setTimeout(() => {
      setCardRotate(cardNumber);
    }, 2000); 
  };

  return (
    <div className="card-container">
      <div
        className={`card card1 ${selectedCard === null ? '' : selectedCard === 1 ? 'chosen' : 'notchosen'} ${cardRotate === 1 ? 'flip-scale-up-ver' : ''}`}
        onClick={() => handleCardClick(1)}
      >
        <img src={Rubashka} alt="Card 1" className="card-image" />
      </div>
      <div
        className={`card card2 ${selectedCard === null ? '' : selectedCard === 2 ? 'chosen' : 'notchosen'} ${cardRotate === 2 ? 'flip-scale-up-ver' : ''}`}
        onClick={() => handleCardClick(2)}
      >
        <img src={Rubashka} alt="Card 2" className="card-image" />
      </div>
      <div
        className={`card card3 ${selectedCard === null ? '' : selectedCard === 3 ? 'chosen' : 'notchosen'} ${cardRotate === 3 ? 'flip-scale-up-ver' : ''}`}
        onClick={() => handleCardClick(3)}
      >
        <img src={Rubashka} alt="Card 3" className="card-image" />
      </div>
    </div>
  );
};

export default Card;
