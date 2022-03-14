const express = require("express");
const app = express();

const PORT = 8000;

let addresses = require("./addresses.json");
app.use(express.json());
const fs = require("fs");//? for send data to .json() file .


app.listen(PORT, ()=>{
    console.log(`Listning port no: ${PORT}`);
})


app.get("/" , (req , res)=>{
    res.sendFile(`${__dirname}/homepage.html`);
})

//? get data from .json() file .
app.get("/addresses" , (req , res)=>{
    res.json(addresses);
})


//? Send data to .json() file .
app.post("/addresses" , (req , res)=>{
    addresses.push(req.body);
    fs.writeFileSync(`${__dirname}/addresses.json`, JSON.stringify(addresses));
    res.json(req.body);
})


//? delete data to .json() file .
app.delete("/addresses/:id" , (req , res)=>{
    const { id } = req.params;
    const idtoDelete = Number(id);
    
    const item = addresses.findIndex(i => i.id === idtoDelete);

    addresses.splice(item , 1);
    fs.writeFileSync(`${__dirname}/addresses.json`, JSON.stringify(addresses));

    // console.log("i",item);
    // console.log(addresses.splice(item , 1));
    // res.json(req.body);
})


//? put data to .json() file .
app.put("/addresses/:id" , (req , res)=> {
    const { id } = req.params;
    const idtoPut = Number(id);
    const dataToPut = req.body;

    const add = addresses.map((item) => (item.id === idtoPut ? dataToPut : item));
    fs.writeFileSync(`${__dirname}/addresses.json`, JSON.stringify(add));
    res.status(200).json(add);
})