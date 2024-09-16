import React from 'react';
import './Invite.css'; // Импортируем CSS для стилизации

const Invite = () => {
  return (
    <div className="invite">
      <div className="invite-header">
        <span className="invite-text">Friends Invited</span>
        <span className="invite-amount">0</span>
      </div>
      <button className="invite-button">Invite</button>
      <p className="invite-footer-text">*Collect 10% of your friends earnings</p>
    </div>
  );
};

export default Invite;
