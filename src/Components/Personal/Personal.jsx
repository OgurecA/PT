import React, { useEffect, useState } from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin2.png'; 

const Personal = ({ userId }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true); // Состояние для отслеживания загрузки

  // Получение данных пользователя из базы данных
  useEffect(() => {
    // Устанавливаем таймер на 5 секунд (5000 миллисекунд)
    const timer = setTimeout(() => {
      fetch(`/get-user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setUser({
              firstName: data.first_name,
              lastName: data.last_name,
              username: data.username,
              profileImage: data.profile_image_url || ''
            });
            setLoading(false); // Отключаем состояние загрузки после получения данных
          }
        })
        .catch((error) => {
          console.error('Ошибка при получении данных пользователя:', error);
          setLoading(false); // Отключаем состояние загрузки даже в случае ошибки
        });
    }, 1000);
  
    // Очищаем таймер при размонтировании компонента или изменении userId
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div className="personal">
      {loading ? (
        // Полоска загрузки вместо изображения профиля
        <div className="skeleton-image" />
      ) : user.profileImage ? (
        <img src={user.profileImage} alt="User Profile" className="personal-image" />
      ) : (
        <img src={DragonCoin} alt="Default Profile" className="personal-image" />
      )}
      
      <div className="personal-info">
        {loading ? (
          // Полоски загрузки для имени и имени пользователя
          <>
            <div className="skeleton-text skeleton-name" />
            <div className="skeleton-text skeleton-username" />
          </>
        ) : (
          <>
            <span className="personal-name">{user.firstName} {user.lastName}</span>
            <span className="personal-username">@{user.username}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Personal;
