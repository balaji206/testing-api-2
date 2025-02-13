const express = require('express');
const bodyParser = require('body-parser');
const data = require("./data.json")


const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post("/books",(req,res)=>{
  const {books_id,title,author,genre,year,copies} = req.body
  console.log(req.body)
  return res.status(200).json({sdfds:"ddf"})

})
app.get("/books/:id",(req,res)=>{ 
  const bk_id = req.params.id
  const bk = data.filter((book)=>{
    return book.book_id == Number(bk_id)
  })
  return  res.status(200).json({book:bk})
})


app.put('/books/:id',(req,res)=>{
  const {id}=req.params
  const {description}=req.body
const book =data.filter(item=>id==item.book_id)
if(book.length==0)
  res.json('book not found')
book[0]={...book, description}
res.send(book[0])

})
app.delete("/books/:id",(req,res)=>{
  const bk_id = req.params.id
  const bks = data.filter((book)=>{
  return book.book_id != Number(bk_id)
  })

  return  res.status(200).json({books:bks})


})
app.get("/books",(req,res)=>{
  return res.status(200).json({books:data})

})




app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});