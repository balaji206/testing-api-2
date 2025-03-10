const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// GET all books
app.get('/books', (req, res) => {
  console.log(data);
  res.json(data);
});

// GET a book by ID
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = data.find((book) => book.book_id === id);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const book = req.body;
  data.push(book);
  res.json(book);
});

// PUT (update) a book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { book_id, name, author, genre, year, copies } = req.body;
  const idx = data.findIndex((book) => book.book_id == id);

  if (!book_id || !name || !author || !genre || !year || !copies) {
    return res.status(400).json({ message: "Please provide all details" });
  }

  if (idx === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  data[idx] = { ...req.body };
  res.json(data[idx]);
});

// DELETE a book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const idx = data.findIndex((book) => book.book_id == id);

  if (idx === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = data.splice(idx, 1);
  res.json({ message: "Book deleted successfully", book: deletedBook });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
