import React, { useState, useEffect } from 'react';
import './Timer.css'; // Импортируем CSS для стилизации

const Timer = () => {
  const initialTime = 1 * 1 * 30 * 1000; // Установите 30 секунд для тестирования (можно вернуть на 8 часов)
  const [timeLeft, setTimeLeft] = useState(initialTime); // Состояние для отслеживания оставшегося времени
  const [isFinished, setIsFinished] = useState(false); // Состояние для отслеживания завершения таймера

  // Форматирование оставшегося времени (часы, минуты, секунды)
  const formatTime = (ms) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const savedEndTime = localStorage.getItem('endTime');
    
    // Попытка загрузить конечное время из localStorage
    if (savedEndTime) {
      const timeRemaining = parseInt(savedEndTime, 10) - Date.now();
      
      if (timeRemaining > 0) {
        setTimeLeft(timeRemaining);
        setIsFinished(false);
      } else {
        setTimeLeft(initialTime);
        localStorage.setItem('endTime', Date.now() + initialTime); // Сброс таймера
        setIsFinished(false);
      }
    }

    // Устанавливаем интервал обновления каждую секунду
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          setTimeLeft(initialTime); // Сброс таймера на начальное время
          localStorage.setItem('endTime', Date.now() + initialTime); // Обновляем конечное время
          return initialTime; // Перезапускаем таймер с начального времени
        }
        return prevTimeLeft - 1000;
      });
    }, 1000);

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, []);

  useEffect(() => {
    if (!isFinished) {
      const endTime = Date.now() + timeLeft;
      localStorage.setItem('endTime', endTime);
    }
  }, [timeLeft, isFinished]);

  return (
    <div className={`timer`}>
      <p>{formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
