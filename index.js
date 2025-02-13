const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// In-memory book storage (Temporary, replace with DB later)
// GET all books
app.get('/books', (req, res) => {
  console.log(data);
  res.json(data);
});
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  const book = data.filter((book) => book.book_id === id);
  res.json(book);
});

// POST a new book
app.post('/books', (req, res) => {
  const book = req.body;
  data.push(book);
  res.json(book);
});
app.put('/books/:id',(req,res)=>{
  const {id} = req.params
  const {book_id,name,author,genre,year,copies} = req.body
  const book = data.filter(book=>book.book_id == id)

  if(book_id||title||author||genre||copies)
  {
    return res.status(400).json({message:"please provide all details"})
  }
  if(idx==-1)
  {
    return res.status(400).json({message:"Book not found"})
  }
  data[idx]={
    ...req.body
  }
  res.json(data[idx])
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});