const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const xssFilters = require('xss-filters');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 3000;

// Логирование запросов
app.use(morgan('combined'));

// Настройка защиты от XSS
app.use((req, res, next) => {
    for (let key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = xssFilters.inHTMLData(req.body[key]); // Экранируем входящие данные
        }
    }
    next();
});

// Ограничение частоты запросов
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 минут
    max: 30, // Максимум 30 запросов с одного IP
    message: 'Слишком много попыток входа, попробуйте позже.'
});

app.use('/login', authLimiter);

// Настройка Helmet для защиты
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        }
    },
    referrerPolicy: { policy: 'no-referrer' }
}));

// Парсинг JSON и URL-encoded данных
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка CORS
const corsOptions = {
    origin: 'https://dragonlair.website',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Подключение статических файлов
app.use(express.static(path.join(__dirname, 'build')));



const db = new sqlite3.Database('./dragonlair.db', (err) => {
    if (err) {
      console.error('Ошибка при открытии базы данных', err.message);
    } else {
      console.log('Подключение к базе данных установлено.');
    }
  });
  
  // Создаем таблицу для пользователей
  db.run(`CREATE TABLE IF NOT EXISTS users (
    telegram_id INTEGER UNIQUE,
    first_name TEXT,
    last_name TEXT,
    username TEXT,
    language_code TEXT,
    is_premium TEXT,
    profile_image_url TEXT
  );`, (err) => {
    if (err) {
      console.error('Ошибка при создании таблицы users:', err.message);
    } else {
      console.log('Таблица users создана или уже существует.');
    }
  });















































// Обработка любых маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
