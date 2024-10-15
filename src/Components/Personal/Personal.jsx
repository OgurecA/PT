import React, { useEffect, useState } from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin2.png'; 
import Timer from './Components/Balance/Timer';


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
            setLoading(false);
            if (userId === null) {
              setLoading(true);
            }
          }
        })
        .catch((error) => {
          console.error('Ошибка при получении данных пользователя:', error);
        });
    }, 1000);
  
    // Очищаем таймер при размонтировании компонента или изменении userId
    return () => clearTimeout(timer);
  }, [userId]);

  return (
    <div className="personal">
      {loading || !user ? (
        // Отображаем spinner, пока данные загружаются или если данные пользователя отсутствуют
        <div className="spinner"></div>
      ) : (
        <>
          <Timer />
          {user.profileImage && (
            <img src={user.profileImage} alt="User Profile" className="personal-image" />
          )}
          <div className="personal-info">
            <span className="personal-name">{user.firstName} {user.lastName}</span>
            <span className="personal-username">@{user.username}</span>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Personal;
