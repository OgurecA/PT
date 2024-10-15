import React, { useState, useEffect } from 'react';
import './Balance.css'; // Импортируем CSS для стилизации

const Balance = ({ isVisible, cardsVisible, setCardsVisible }) => {
  // Состояние для отслеживания таймера и видимости кнопки
  const [timer, setTimer] = useState('06:00:00'); // Инициализируем таймер на 6 часов
  const [isMining, setIsMining] = useState(false); // Состояние для отслеживания, идет ли майнинг
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCollected, setIsCollected] = useState(() => {
    // Восстанавливаем состояние "Collect" из localStorage
    const savedIsCollected = localStorage.getItem('isCollected');
    return savedIsCollected === 'true'; // Преобразуем строку в boolean
  });
  const [endTime, setEndTime] = useState(() => {
    // Получаем конечное время из localStorage, если оно существует
    const savedEndTime = localStorage.getItem('endTime');
    return savedEndTime ? parseInt(savedEndTime, 10) : null;
  });

  // Обработчик для нажатия на кнопку
  const handleButtonClick = () => {
    if (isCollected) {
      // Если можно нажать Collect, возвращаем кнопку к состоянию "Start mining"
      setCardsVisible(true);
      setIsCollected(false);
      localStorage.setItem('isCollected', 'false');
      setTimer('06:00:00'); // Сбрасываем таймер до начального значения
      localStorage.removeItem('endTime'); // Удаляем конечное время из localStorage
    } else {
      const countdownTime = 10 * 1000; // 6 часов в миллисекундах
      const newEndTime = Date.now() + countdownTime; // Устанавливаем конечное время
      setEndTime(newEndTime);
      setCardsVisible(false);
      setIsMining(true); // Устанавливаем состояние майнинга в true
      localStorage.setItem('endTime', newEndTime.toString()); // Сохраняем конечное время в localStorage
    }
  };

  useEffect(() => {
    if (!endTime) return; // Если конечное время не установлено, ничего не делаем

    const updateTimer = () => {
      const remainingTime = endTime - Date.now();
      if (remainingTime <= 0) {
        setIsMining(false); // Сбрасываем состояние майнинга
        setIsCollected(true); // Состояние, когда можно нажать Collect
        localStorage.setItem('isCollected', 'true'); 
        setEndTime(null); // Удаляем конечное время
        localStorage.removeItem('endTime'); // Удаляем конечное время из localStorage
      } else {
        const hours = Math.floor(remainingTime / (60 * 60 * 1000));
        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);
        setTimer(
          `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        );
      }
    };

    // Устанавливаем интервал для обновления таймера каждую секунду
    const intervalId = setInterval(updateTimer, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [endTime]);

  // Проверяем состояние при монтировании компонента
  useEffect(() => {
    if (endTime && endTime > Date.now()) {
      setIsMining(true); // Устанавливаем состояние майнинга в true, если таймер еще не истек
    }
  }, [endTime]);

  useEffect(() => {
    // Делаем кнопку неактивной на 2.5 секунды
    const disableButtonTimeout = setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2300);

    return () => clearTimeout(disableButtonTimeout); // Очищаем таймер при размонтировании
  }, []);

  return (
    <div className={`balance ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="balance-header">
        <span className="balance-text">Your Balance</span>
      </div>
      <button
        className={`balance-button ${isMining ? 'mining' : isCollected ? 'collect' : ''}`} // Добавляем класс в зависимости от состояния
        onClick={handleButtonClick}
        disabled={isButtonDisabled}
      >
        {isCollected ? 'Collect' : isMining ? timer : 'Start mining'}
      </button>
    </div>
  );
};

export default Balance;
