const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
const token = process.env.BOT_TOKEN || "7269280461:AAGWQbVyIWN4lk2MlxbBjLXjST1LMqHcSDM"; // Убедитесь, что ваш токен корректен

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Подключаемся к существующей базе данных
const db = new sqlite3.Database('./dragonlair.db', (err) => {
  if (err) {
    console.error('Ошибка при открытии базы данных:', err.message);
  } else {
    console.log('Подключение к базе данных установлено.');
  }
});

// Функция добавления или обновления пользователя в базе данных
const addUserOrUpdate = (user) => {
  const query = `
    INSERT INTO users (telegram_id, first_name, last_name, username, language_code, is_premium, profile_image_url, points, invited_by)
    VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?)
    ON CONFLICT(telegram_id) DO UPDATE SET
    first_name = excluded.first_name,
    last_name = excluded.last_name,
    username = excluded.username,
    language_code = excluded.language_code,
    is_premium = excluded.is_premium,
    profile_image_url = excluded.profile_image_url
  `;
  
  db.run(query, [
    user.id, user.first_name, user.last_name, user.username,
    user.language_code, user.is_premium, user.profile_image_url, user.invited_by
  ], function (err) {
    if (err) {
      console.error('Ошибка при добавлении или обновлении пользователя в базе данных:', err.message);
    } else {
      console.log('Пользователь добавлен или обновлен в базе данных с ID:', this.lastID);
    }
  });
};

// Middleware для обработки JSON-данных
app.use(bodyParser.json());


bot.onText(/\/start(?: referral_(\d+))?/, async (msg, match) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const languageCode = msg.from.language_code;
  const userId = msg.from.id;
  const invitedBy = match[1] || null;

  let profileImageUrl = ''; // По умолчанию пустой URL

  try {
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    if (photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id;
      const file = await bot.getFile(fileId);
      profileImageUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;
    }
  } catch (error) {
    console.error('Ошибка получения фото профиля пользователя:', error);
  }

  // Добавляем пользователя в базу данных
  addUserOrUpdate({
    id: userId,
    first_name: firstName,
    last_name: msg.from.last_name || '',
    username: msg.from.username || '',
    language_code: languageCode,
    is_premium: msg.from.is_premium ? "yes" : "no",
    profile_image_url: profileImageUrl,
    invited_by: invitedBy
  });

  const userInfo = `
    ID: ${userId}
    Имя: ${firstName} ${msg.from.last_name || ''}
    Имя пользователя: ${msg.from.username || ''}
    Язык: "https://t.me/DagonNewBot/Dagon"
    Премиум: ${msg.from.is_premium ? "yes" : "no"}
    Фото профиля: ${profileImageUrl || 'Нет фото'}
    Приглашён пользователем: ${invitedBy ? `Пользователь с ID: ${invitedBy}` : 'Нет'}
  `;

  bot.sendMessage(chatId, userInfo).catch(error => {
    console.error("Ошибка отправки сообщения:", error);
  });
});

