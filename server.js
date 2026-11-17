const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const books = [
  { id: 1, title: 'Война и мир', author: 'Лев Толстой', year: 1869 },
  { id: 2, title: 'Анна Каренина', author: 'Лев Толстой', year: 1877 },
  { id: 3, title: 'Преступление и наказание', author: 'Фёдор Достоевский', year: 1866 },
  { id: 4, title: 'Идиот', author: 'Фёдор Достоевский', year: 1869 },
  { id: 5, title: 'Евгений Онегин', author: 'Александр Пушкин', year: 1833 },
  { id: 6, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1966 },
  { id: 7, title: 'Обыкновенное чудо', author: 'Евгений Шварц', year: 1938 },
  { id: 8, title: 'Тихий Дон', author: 'Михаил Шолохов', year: 1940 },
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/books', (req, res) => {
  let result = books;

  if (req.query.author) {
    result = result.filter(b =>
      b.author.toLowerCase().includes(req.query.author.toLowerCase())
    );
  }

  if (req.query.year) {
    const year = parseInt(req.query.year, 10);
    if (!isNaN(year)) {
      result = result.filter(b => b.year === year);
    }
  }

  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});