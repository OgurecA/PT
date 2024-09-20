import React, { useEffect, useRef, useState } from 'react';
import './Friends.css';

const Friends = ({ userId, setInvitedBonus }) => {
  const [friendsList, setFriendsList] = useState([]);
  const [collectedFriends, setCollectedFriends] = useState([]); // Для отслеживания собранных друзей

  useEffect(() => {
    // Запрос на сервер для получения друзей и их очков
    fetch(`/api/get-invited-friends?userId=${userId}`)
      .then(response => response.json())
      .then(data => {
        setFriendsList(data);
      })
      .catch(error => console.error('Ошибка при получении списка друзей:', error));
  }, [userId]);

  const handleCollectClick = (friend) => {
    if (!collectedFriends.includes(friend.id)) {
      // Рассчитываем бонус для этого друга (5% от его очков)
      const bonus = friend.points * 0.1;

      // Обновляем общий бонус
      setInvitedBonus(prevBonus => prevBonus + bonus);

      // Отмечаем друга как "собранного", чтобы не начислять бонус повторно
      setCollectedFriends(prevCollected => [...prevCollected, friend.id]);
    }
  };

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
            <button
              className="collect-button"
              onClick={() => handleCollectClick(friend)}
              disabled={collectedFriends.includes(friend.id)} // Блокируем кнопку, если уже собрано
            >
              {collectedFriends.includes(friend.id) ? 'Collected' : `Collect ${friend.points || 0}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Friends;
