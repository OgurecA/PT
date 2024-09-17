import React from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin.png'; 

const Personal = ({ firstName, lastName, userName, avatarUrl }) => {
  // Пример данных пользователя
  const user = {
    firstName: firstName,
    lastName: lastName,
    username: userName,
    profileImage: avatarUrl // Замените на реальный путь к изображению
  };

  return (
    <div className="personal">
      <img src={user.profileImage} alt="User Profile" className="personal-image" />
      <div className="personal-info">
        <span className="personal-name">{user.firstName} {user.lastName}</span>
        <span className="personal-username">{user.username}</span>
      </div>
    </div>
  );
};

export default Personal;
