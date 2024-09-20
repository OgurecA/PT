import React, { useState } from 'react';
import './Invite.css'; // Импортируем CSS для стилизации

const Invite = ({ userId, invitedBonus }) => {
  const botUrl = `https://t.me/DagonNewBot?start=referral_${userId}`; // Ссылка на бота с ID пользователя

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
        <span className="invite-text">Earned with referrals</span>
        <span className="invite-amount">{invitedBonus}</span>
      </div>
      <button className="invite-button" onClick={handleInviteClick}>
        Invite
      </button>
      <p className="invite-footer-text">*Collect 10% of your friends earnings</p>
    </div>
  );
};

export default Invite;
