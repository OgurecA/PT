import React, { useEffect, useRef, useState } from 'react';
import './Friends.css';

const Friends = ({ userId }) => {
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    // Запрос на сервер для получения списка приглашённых друзей
    const fetchFriends = async () => {
      try {
        const response = await fetch(`/api/get-invited-friends?userId=${userId}`);
        const data = await response.json();
        setFriendsList(data);
      } catch (error) {
        console.error('Ошибка при получении списка друзей:', error);
      }
    };

    fetchFriends();
  }, [userId]);


  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const items = container.querySelectorAll('.friend-item');

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // Проверяем, находится ли элемент полностью в видимой области контейнера
        if (rect.bottom > containerRect.bottom || rect.top < containerRect.top) {
          item.classList.add('hidden');
        } else {
          item.classList.remove('hidden');
        }
      });
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    // Удаляем обработчик при размонтировании компонента
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="friends-container" ref={containerRef}>
      <ul className="friends-list">
        {friendsList.map((friend) => (
          <li key={friend.id} className="friend-item">
            <span className="friend-name">
              {friend.username ? friend.username : friend.name}
            </span>
            <button className="collect-button">Collect {friend.points || 0}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
