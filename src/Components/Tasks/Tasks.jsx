import React, { useEffect, useRef } from 'react';
import './Tasks.css'; // Импортируем CSS для стилизации

const Tasks = () => {
  const tasksList = [
    { id: 1, name: 'Bob Johnson', username: '@bobjohnson' },
    { id: 2, name: 'Charlie Brown', username: '@charliebrown' },
    { id: 3, name: 'David Wilson', username: '@davidwilson' },
    { id: 4, name: 'Eve Davis', username: '@evedavis' },
    { id: 5, name: 'Bob Johnson', username: '@bobjohnson' },
    { id: 6, name: 'Charlie Brown', username: '@charliebrown' },
    { id: 7, name: 'David Wilson', username: '@davidwilson' },
    { id: 8, name: 'Eve Davis', username: '@evedavis' },
    { id: 1, name: 'Bob Johnson', username: '@bobjohnson' },
    { id: 2, name: 'Charlie Brown', username: '@charliebrown' },
    { id: 3, name: 'David Wilson', username: '@davidwilson' },
    { id: 4, name: 'Eve Davis', username: '@evedavis' },
    { id: 5, name: 'Bob Johnson', username: '@bobjohnson' },
    { id: 6, name: 'Charlie Brown', username: '@charliebrown' },
    { id: 7, name: 'David Wilson', username: '@davidwilson' },
    { id: 8, name: 'Eve Davis', username: '@evedavis' },
  ];

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

  return (
    <div className="tasks-container" ref={containerRef}>
      <ul className="tasks-list">
        {tasksList.map((task) => (
          <li key={task.id} className="tasks-item">
          <span className="tasks-name">{task.name}</span>
          <button className="tasks-collect-button">Collect</button>
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
