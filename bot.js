const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const app = express();

// Ваш токен
const token = "7269280461:AAGWQbVyIWN4lk2MlxbBjLXjST1LMqHcSDM";

// Создаем экземпляр бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  const languageCode = msg.from.language_code; // Получаем язык пользователя
  const userId = msg.from.id;

  // Определяем текст на основе языка пользователя
  const welcomeText = languageCode === 'ru'
    ? `${firstName}, отлично, ты тут! Я — Vince, и нам как раз нужна свежая кровь. Давай, погнали!`
    : `Oi, ${firstName}, where you’ve been, mate? I’m Vince, and we could use some fresh blood around here! Let’s get moving!`;

  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DagonNewBot/Dagon' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: languageCode === 'ru' ? `\nЗаходи, введи мой код ${userId} и забери свою награду!` : `\nJoin, enter my code ${userId}, and claim your reward!` }
        ],
        [{ text: languageCode === 'ru' ? "Магазин" : "Market", url: 'https://t.me/DireAnimalsMarket_bot' }],
        [{ text: languageCode === 'ru' ? "Академия" : "Academy", callback_data: 'button2' }]
      ]
    }
  };

  // Получение URL аватара пользователя
  try {
    const photos = await bot.getUserProfilePhotos(userId, { limit: 1 });
    if (photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id;
      const file = await bot.getFile(fileId);
      const fileUrl = `https://api.telegram.org/file/bot${token}/${file.file_path}`;

      // Отправка сообщения с фото и текстом
      await bot.sendPhoto(chatId, fileUrl, { caption: welcomeText, ...options });
    } else {
      // Если нет фото, отправляем только текст
      await bot.sendMessage(chatId, welcomeText, options);
    }
  } catch (error) {
    console.error('Ошибка получения фото профиля пользователя:', error);
    bot.sendMessage(chatId, welcomeText, options);
  }
});

// Обработчик нажатия на кнопки
bot.on('callback_query', (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const chatId = msg.chat.id;
  const languageCode = callbackQuery.from.language_code;

  let responseText;

  if (data === 'button2') {
    responseText = languageCode === 'ru' 
      ? "Возникли проблемы?\n\nПопробуйте перезапустить приложение или очистить кэш браузера. Это часто решает многие технические трудности и помогает восстановить нормальную работу приложения.\n\nЕсли проблемы продолжаются, загляните в наш Telegram-канал для получения обновлений, поддержки и ответов на часто задаваемые вопросы.\nt.me/+ZMsO9uBIOZo5NWI0" 
      : "Having issues?\n\nTry restarting the app or clearing your browser cache. This often resolves many technical difficulties and restores normal operation.\n\nIf the problems persist, check out our Telegram channel for updates, support, and answers to frequently asked questions.\nt.me/+ZMsO9uBIOZo5NWI0";
  } 
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: languageCode === 'ru' ? "Играть" : "Play", url: 'https://t.me/DireAnimals_bot/DireAnimals' }],
        [
          { text: languageCode === 'ru' ? "Подписаться" : "Subscribe", url: 'https://t.me/direanimalsnews' },
          { text: languageCode === 'ru' ? "Поделиться" : "Share", switch_inline_query: '' }
        ],
        [{ text: languageCode === 'ru' ? "Магазин" : "Market", url: 'https://t.me/DireAnimalsMarket_bot' }]   
      ]
    }
  };

  // Отправка сообщения с текстом и опциями
  bot.sendMessage(chatId, responseText, options).catch(error => {
    console.error("Ошибка отправки сообщения:", error);
  });
});

console.log("Бот запущен...");
