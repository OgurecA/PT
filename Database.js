// database.js
const Database = require('better-sqlite3');
const path = require('path');

// Подключение базы данных (создает файл bot_database.sqlite, если его еще нет)
const db = new Database(path.join(__dirname, 'pokertap.db'));

// Создание таблицы "search" для хранения заявок на поиск услуг
db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id INTEGER UNIQUE,
      first_name TEXT,
      last_name TEXT,
      username TEXT,
      language_code TEXT,
      is_premium TEXT,
      profile_image_url TEXT,
      points INTEGER DEFAULT 0,
      invited_bonus INTEGER DEFAULT 0,
      total_points INTEGER DEFAULT 0,
      invited_by INTEGER
    );
  `).run();


// Функции работы с базой данных
module.exports = {
  // Пример функции для добавления заявки в таблицу search

  // Закрытие соединения с базой данных
  close: () => db.close(),
};
