const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

// In-memory array to store books
let books = [];

// GET /books - List all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { id, title, author } = req.body;
    if (!id || !title || !author) {
        return res.status(400).json({ error: 'All fields (id, title, author) are required' });
    }
    books.push({ id, title, author });
    res.status(201).json({ message: 'Book added', book: { id, title, author } });
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const { title, author } = req.body;

    const book = books.find(b => b.id === bookId);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    if (title) book.title = title;
    if (author) book.author = author;

    res.json({ message: 'Book updated', book });
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
