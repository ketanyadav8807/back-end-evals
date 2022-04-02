const express = require("express");
const app = express();

const PORT = 8000;

app.use(express.json());
const fs = require("fs");

app.listen(PORT , ()=>{
    console.log(`Listning on PORT ${PORT}`);
})

let books = require("./books.json");

app.get("/" , (req , res)=>{
    res.json(books);
})

app.post("/books" , (req , res)=>{
    const book = req.body;
    books.push(book);
    fs.writeFileSync(`${__dirname}/books.json`, JSON.stringify(books));
    res.json(books);
})

app.get("/books/:id" , (req , res)=>{
    const {id} = req.params;
    const book = books.filter((book) => {
        return book.id === Number(id)
    })
    res.json(book)
})

app.patch("/books/:id" , (req , res)=> {
    const { id } = req.params;
    const idtoPatch = Number(id);
    const dataToPatch = req.body;

    // const newList = books.map((book) =>{
    //     (book.id === idtoPatch ? dataToPatch : book);
    // })
    //null

    const newList = books.map((book) => (book.id === idtoPatch ? dataToPatch : book));
    //it's return as expected .

    fs.writeFileSync(`${__dirname}/books.json`, JSON.stringify(newList));
    res.status(200).json(newList);
})

app.delete("/books/:id" , (req , res)=>{
    const {id} = req.params;
    const book = books.map((book) => (book.id === Number(id) ? "" : book));
    res.status(200).json(book);
})