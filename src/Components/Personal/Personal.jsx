import React from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin.png'; 

const Personal = ({ firstName, lastName, userName, avatarUrl }) => {
  // Пример данных пользователя
  const user = {
    firstName: firstName,
    lastName: lastName,
    username: userName,
    profileImage: "blob:https://web.telegram.org/6f620462-d89a-437d-8c23-13a160073d15"
  };

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
