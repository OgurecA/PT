import React, { useState, useEffect } from 'react';
import './Timer.css'; // Импортируем CSS для стилизации

const Timer = ({  }) => {
  // Состояние для отслеживания таймера и видимости кнопки
  
  



  return (
    <div className={`timer ${isVisible ? 'visible' : 'hidden'}`}>
      <p>12.00.00</p>
    </div>
  );
};

export default Timer;
