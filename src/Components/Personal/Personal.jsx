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
        });
    }, 2000);
  
    // Очищаем таймер при размонтировании компонента или изменении userId
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div className="personal">
      {loading ? (
        // Отображаем spinner, пока данные загружаются
        <div className="spinner"></div>
      ) : user.profileImage ? (
        <img src={user.profileImage} alt="User Profile" className="personal-image" />
      ) : (
        <img src={DragonCoin} alt="Default Profile" className="personal-image" />
      )}
      
      <div className="personal-info">
        {loading ? (
          // Пока данные загружаются, показываем только spinner
          <div className="loading-text"></div>
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
