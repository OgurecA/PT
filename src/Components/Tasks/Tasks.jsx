import React, { useEffect, useRef, useState } from 'react';
import './Tasks.css'; // Импортируем CSS для стилизации

const Tasks = () => {
  // Задачи: название, вознаграждение и ссылка
  const tasksList = [
    { id: 1, name: 'Complete Daily Challenge', reward: '+100', link: 'https://example.com/challenge' },
    { id: 2, name: 'Invite a Friend', reward: '+50', link: 'https://example.com/invite' },
    { id: 3, name: 'Watch an Ad', reward: '+20', link: 'https://example.com/ad' },
    { id: 4, name: 'Reach Level 10', reward: '+200', link: 'https://example.com/levelup' },
    { id: 5, name: 'Share on Social Media', reward: '+30', link: 'https://example.com/share' },
    { id: 6, name: 'Complete Daily Challenge', reward: '+100', link: 'https://example.com/challenge' },
    { id: 7, name: 'Invite a Friend', reward: '+50', link: 'https://example.com/invite' },
    { id: 8, name: 'Watch an Ad', reward: '+20', link: 'https://example.com/ad' },
    { id: 9, name: 'Reach Level 10', reward: '+200', link: 'https://example.com/levelup' },
    { id: 10, name: 'Share on Social Media', reward: '+30', link: 'https://example.com/share' },
  ];

  const [loadingTasks, setLoadingTasks] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const items = container.querySelectorAll('.tasks-item');

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

  const handleTaskClick = (taskId) => {
    setLoadingTasks((prev) => [...prev, taskId]); // Добавляем задачу в массив загрузки

    // Убираем задачу из массива загрузки через 5 секунд
    setTimeout(() => {
      setLoadingTasks((prev) => prev.filter((id) => id !== taskId));
    }, 5000);
  };

  return (
    <div className="tasks-container" ref={containerRef}>
      <ul className="tasks-list">
        {tasksList.map((task) => (
          <li key={task.id} className="tasks-item">
            <span className="tasks-name">{task.name}</span>
            <span className="tasks-reward">{task.reward}</span>
            <button
              className={`tasks-collect-button ${loadingTasks.includes(task.id) ? 'loading' : ''}`}
              onClick={() => handleTaskClick(task.id)}
              disabled={loadingTasks.includes(task.id)} // Отключаем кнопку, если она в состоянии загрузки
            >
              {loadingTasks.includes(task.id) ? (
                <div className="spinner"></div> // Если идет загрузка, показываем спиннер
              ) : (
                'Earn' // Иначе показываем текст "Earn"
              )}
            </button>
          </li>
        ))}
        <li className="tasks-item filler">
          <span className="tasks-name">A</span>
          <span className="tasks-username">A</span>
        </li>
      </ul>
    </div>
  );
};

export default Tasks;