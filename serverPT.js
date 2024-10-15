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

const PORT = process.env.PORT || 3100;

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
    profile_image_url TEXT,
    points INTEGER DEFAULT 0,
    invited_bonus INTEGER DEFAULT 0,
    total_points INTEGER DEFAULT 0,
    invited_by INTEGER
  );`, (err) => {
    if (err) {
      console.error('Ошибка при создании таблицы users:', err.message);
    } else {
      console.log('Таблица users создана или уже существует.');
    }
  });




// Endpoint для получения информации о пользователе по ID
app.get('/get-user/:id', (req, res) => {
    const userId = req.params.id;
    const query = `SELECT first_name, last_name, username, profile_image_url FROM users WHERE telegram_id = ?`;
  
    db.get(query, [userId], (err, row) => {
      if (err) {
        console.error('Ошибка при получении информации о пользователе:', err.message);
        res.status(500).json({ error: 'Ошибка сервера' });
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ error: 'Пользователь не найден' });
      }
    });
  });
  

// Маршрут для получения points пользователя
app.get('/get-user-points', (req, res) => {
    const { userId } = req.query; // Получаем ID пользователя из запроса
  
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    const query = `SELECT points FROM users WHERE telegram_id = ?`;
  
    db.get(query, [userId], (err, row) => {
      if (err) {
        console.error('Ошибка при получении points пользователя из базы данных:', err.message);
        return res.status(500).json({ error: 'Ошибка сервера' });
      }
  
      if (row) {
        res.json({ points: row.points });
      } else {
        res.status(404).json({ error: 'Пользователь не найден' });
      }
    });
  });



  
  app.post('/update-user-points', (req, res) => {
    const { userId, points } = req.body;
    const query = `UPDATE users SET points = ? WHERE telegram_id = ?`;
  
    db.run(query, [points, userId], function (err) {
      if (err) {
        console.error('Ошибка при обновлении очков пользователя:', err.message);
        res.status(500).json({ error: 'Ошибка сервера' });
      } else {
        res.json({ message: 'Очки пользователя обновлены успешно' });
      }
    });
  });





app.get('/api/get-invited-friends', (req, res) => {
  const userId = req.query.userId; // Получаем userId из запроса

  if (!userId) {
    return res.status(400).json({ error: 'userId не предоставлен' });
  }

  const query = `
    SELECT telegram_id AS id, first_name AS name, username, points
    FROM users
    WHERE invited_by = ?
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error('Ошибка при получении списка друзей:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера' });
    }

    res.json(rows); // Отправляем список друзей вместе с points на клиент
  });
});


app.post('/update-invited-bonus', (req, res) => {
  const { userId, invitedBonus } = req.body; // Получаем userId и invitedBonus из тела запроса

  if (!userId || invitedBonus === undefined) {
    return res.status(400).json({ error: 'Необходимо предоставить userId и invitedBonus' });
  }

  const query = `
    UPDATE users
    SET invited_bonus = ?
    WHERE telegram_id = ?
  `;

  db.run(query, [invitedBonus, userId], function (err) {
    if (err) {
      console.error('Ошибка при обновлении бонуса от приглашённых:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера при обновлении бонуса' });
    }

    res.json({ message: 'Бонус от приглашённых обновлён' });
  });
});

// Обработка GET-запроса для получения invitedBonus
app.get('/get-invited-bonus', (req, res) => {
  const { userId } = req.query; // Получаем userId из строки запроса

  if (!userId) {
    return res.status(400).json({ error: 'Необходимо предоставить userId' });
  }

  const query = `
    SELECT invited_bonus AS bonus
    FROM users
    WHERE telegram_id = ?
  `;

  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error('Ошибка при получении бонуса от приглашённых:', err.message);
      return res.status(500).json({ error: 'Ошибка сервера при получении бонуса' });
    }

    if (row) {
      res.json({ bonus: row.bonus });
    } else {
      res.status(404).json({ error: 'Пользователь не найден' });
    }
  });
});


































// Обработка любых маршрутов
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
