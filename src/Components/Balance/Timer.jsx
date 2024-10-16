import React, { useState, useEffect } from 'react';
import './Timer.css'; // Импортируем CSS для стилизации

const Timer = () => {
  const initialTime = 1 * 1 * 20 * 1000; // 8 часов в миллисекундах
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
        setTimeLeft(0);
        setIsFinished(true);
      }
    }

    // Устанавливаем интервал обновления каждую секунду
    const interval = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1000) {
          clearInterval(interval);
          setIsFinished(true);
          return 0;
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
      <p>{isFinished ? '00:00:00' : formatTime(timeLeft)}</p>
    </div>
  );
};

export default Timer;
