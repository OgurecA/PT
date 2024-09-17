import React, { useEffect, useState } from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin.png'; 

const Personal = ({ userId }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    profileImage: ''
  });

  // Получение данных пользователя из базы данных
  useEffect(() => {
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
        }
      })
      .catch((error) => {
        console.error('Ошибка при получении данных пользователя:', error);
      });
  }, [userId]);

  return (
    <div className="personal">
      {user.profileImage ? (
        <img src={user.profileImage} alt="User Profile" className="personal-image" />
      ) : (
        <img src={DragonCoin} alt="Default Profile" className="personal-image" />
      )}
      <div className="personal-info">
        <span className="personal-name">{user.firstName} {user.lastName}</span>
        <span className="personal-username">@{user.username}</span>
      </div>
    </div>
  );
};

export default Personal;
