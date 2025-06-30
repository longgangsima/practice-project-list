const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Data file paths for BookStore
const BOOKS_FILE = path.join(__dirname, '../data/bookstore/books.json');
const AUTHORS_FILE = path.join(__dirname, '../data/bookstore/authors.json');

// Helper functions
const readJSONFile = filePath => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
};

const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
};

// GET /api/bookstore/books - Fetch all books
router.get('/books', (req, res) => {
  const books = readJSONFile(BOOKS_FILE);
  if (books === null) {
    return res.status(500).json({ error: 'Failed to read books data' });
  }
  res.json({
    success: true,
    data: books,
    message: 'Books fetched successfully',
  });
});

// GET /api/bookstore/authors - Fetch all authors
router.get('/authors', (req, res) => {
  const authors = readJSONFile(AUTHORS_FILE);
  if (authors === null) {
    return res.status(500).json({ error: 'Failed to read authors data' });
  }
  res.json({
    success: true,
    data: authors,
    message: 'Authors fetched successfully',
  });
});

// POST /api/bookstore/books - Add new book
router.post('/books', (req, res) => {
  const newBook = req.body;

  // Basic validation
  if (!newBook.title || !newBook.author || !newBook.isbn) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: title, author, isbn',
    });
  }

  const books = readJSONFile(BOOKS_FILE);
  if (books === null) {
    return res.status(500).json({ error: 'Failed to read books data' });
  }

  const bookToAdd = {
    id: Date.now().toString(), // Simple ID generation
    ...newBook,
    createdAt: new Date().toISOString(),
  };

  books.push(bookToAdd);

  const writeSuccess = writeJSONFile(BOOKS_FILE, books);
  if (!writeSuccess) {
    return res.status(500).json({ error: 'Failed to save book' });
  }

  res.status(201).json({
    success: true,
    data: bookToAdd,
    message: 'Book created successfully',
  });
});

// GET /api/bookstore/books/:id - Get specific book
router.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const books = readJSONFile(BOOKS_FILE);

  if (books === null) {
    return res.status(500).json({ error: 'Failed to read books data' });
  }

  const book = books.find(book => book.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      error: 'Book not found',
    });
  }

  res.json({
    success: true,
    data: book,
    message: 'Book fetched successfully',
  });
});

module.exports = router;
