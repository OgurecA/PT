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
  ];

  const [loadingTasks, setLoadingTasks] = useState([]);  // Задачи, которые находятся в процессе загрузки
  const [collectTasks, setCollectTasks] = useState([]); // Задачи, которые можно собрать
  const [collectedTasks, setCollectedTasks] = useState(() => {
    // Инициализируем из localStorage или пустого массива
    const savedTasks = localStorage.getItem('collectedTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

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

  // Сохраняем завершенные задачи в localStorage при их обновлении
  useEffect(() => {
    localStorage.setItem('collectedTasks', JSON.stringify(collectedTasks));
  }, [collectedTasks]);

  const handleTaskClick = (taskId, link) => {
    if (collectedTasks.includes(taskId)) return; // Если уже собрано, ничего не делаем

    // Открываем ссылку только если задача еще не собрана
    if (!collectTasks.includes(taskId)) {
      window.open(link, '_blank'); // Переход по ссылке
    }

    setLoadingTasks((prev) => [...prev, taskId]); // Добавляем задачу в массив загрузки

    // Через 5 секунд меняем кнопку на "Collect"
    setTimeout(() => {
      setLoadingTasks((prev) => prev.filter((id) => id !== taskId));
      setCollectTasks((prev) => [...prev, taskId]); // Добавляем задачу в "можно собрать"
    }, 5000);
  };

  const handleCollectClick = (taskId) => {
    setCollectTasks((prev) => prev.filter((id) => id !== taskId)); // Убираем задачу из collect
    setCollectedTasks((prev) => [...prev, taskId]); // Задача собрана и сохраняется в collected
  };

  return (
    <div className="tasks-container" ref={containerRef}>
      <ul className="tasks-list">
        {tasksList.map((task) => (
          <li key={task.id} className="tasks-item">
            <span className="tasks-name">{task.name}</span>
            <span className="tasks-reward">{task.reward}</span>
            <button
              className={`tasks-collect-button ${
                loadingTasks.includes(task.id) ? 'loading' :
                collectTasks.includes(task.id) ? 'collect' :
                collectedTasks.includes(task.id) ? 'collected' : ''
              }`}
              onClick={() => collectTasks.includes(task.id) 
                ? handleCollectClick(task.id) 
                : handleTaskClick(task.id, task.link)}
              disabled={collectedTasks.includes(task.id)} // Отключаем кнопку, если задача собрана
            >
              {loadingTasks.includes(task.id) ? (
                <div className="spinner"></div> // Если идет загрузка, показываем спиннер
              ) : collectTasks.includes(task.id) ? (
                'Collect' // После загрузки показываем "Collect"
              ) : collectedTasks.includes(task.id) ? (
                'Collected' // Если задача собрана, показываем "Collected"
              ) : (
                'Earn' // Изначально показываем "Earn"
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
