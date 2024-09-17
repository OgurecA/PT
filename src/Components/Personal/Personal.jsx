import React from 'react';
import './Personal.css'; // Импортируем CSS для стилизации
import DragonCoin from '../Photo/DragonCoin.png'; 

const Personal = ({ firstName, lastName, userName, avatarUrl }) => {
  // Пример данных пользователя
  const user = {
    firstName: firstName,
    lastName: lastName,
    username: userName,
    profileImage: "https://static.vecteezy.com/system/resources/thumbnails/025/181/412/small_2x/picture-a-captivating-scene-of-a-tranquil-lake-at-sunset-ai-generative-photo.jpg"
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
