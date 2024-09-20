import React, { useState } from 'react';
import './Invite.css'; // Импортируем CSS для стилизации

const Invite = ({ userId }) => {
  const botUrl = `https://t.me/DagonNewBot?start=${userId}`; // Ссылка на бота с ID пользователя

  const handleInviteClick = () => {
    navigator.clipboard.writeText(botUrl)
      .then(() => {
        console.log('Ссылка успешно скопирована');
      })
      .catch(err => {
        console.error('Ошибка при копировании ссылки:', err);
      });
  };

  return (
    <div className="invite">
      <div className="invite-header">
        <span className="invite-text">Friends Invited</span>
        <span className="invite-amount">0</span>
      </div>
      <button className="invite-button" onClick={handleInviteClick}>
        Invite
      </button>
      <p className="invite-footer-text">*Collect 10% of your friends earnings</p>
    </div>
  );
};

export default Invite;
