import React, { useState } from 'react';
import './Invite.css'; // Импортируем CSS для стилизации

const Invite = ({ userId }) => {
  const [copied, setCopied] = useState(false); // Состояние для отображения сообщения о копировании
  const botUrl = `https://t.me/DragonNewBot?start=${userId}`; // Ссылка на бота с ID пользователя

  const handleInviteClick = () => {
    navigator.clipboard.writeText(botUrl)
      .then(() => {
        setCopied(true); // Устанавливаем, что ссылка скопирована
        setTimeout(() => setCopied(false), 3000); // Убираем сообщение через 3 секунды
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
      {copied && <p className="copy-message">Ссылка скопирована!</p>} {/* Показ сообщения о копировании */}
      <p className="invite-footer-text">*Collect 10% of your friends earnings</p>
    </div>
  );
};

export default Invite;
