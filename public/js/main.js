document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookForm');
  const resetBtn = document.getElementById('resetBtn');
  const booksContainer = document.getElementById('booksContainer');

  if (!form) return;

  fetchBooks();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const params = new URLSearchParams();

    if (formData.get('author')) {
      params.append('author', formData.get('author'));
    }
    if (formData.get('year')) {
      params.append('year', formData.get('year'));
    }

    await fetchBooks(params.toString());
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    fetchBooks();
  });

  async function fetchBooks(queryString = '') {
    try {
      const url = '/api/books' + (queryString ? '?' + queryString : '');
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ошибка загрузки книг');
      }

      const books = await response.json();
      renderBooks(books);
    } catch (err) {
      console.error(err);
      booksContainer.innerHTML = '<div class="empty">Ошибка загрузки данных. Проверьте соединение.</div>';
    }
  }

  function renderBooks(books) {
    if (books.length === 0) {
      booksContainer.innerHTML = '<div class="empty">Книг не найдено.</div>';
      return;
    }

    booksContainer.innerHTML = books.map(book => `
      <div class="book-card">
        <h3>${escapeHtml(book.title)}</h3>
        <p><strong>Автор:</strong> ${escapeHtml(book.author)}</p>
        <p><strong>Год:</strong> ${book.year}</p>
      </div>
    `).join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});