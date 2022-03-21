const express = require("express");
const mongoose = require("mongoose");

const Task = require("./schema/user.schema");
const PORT = 8000;

const DB_URL = "mongodb+srv://ketanyadav:ketan12345@cluster0.vzb2j.mongodb.net/tasksdata?retryWrites=true&w=majority";

const app = express();
app.use(express.json());

const connect = () => {
    return mongoose.connect(DB_URL);
}

app.get("/tasks" , async (req , res)=>{
    const {page = 1, pageSize = 3} = req.query;
    let offeset = (page -1)* pageSize;
    let tasks = await Task.find().skip(offeset).limit(pageSize);
    // let tasks = await Task.find();
    let totalPages = Math.ceil((await Task.find().countDocuments()) / pageSize);
    res.status(200).json(tasks);
});

app.patch("/tasks/:id" , async (req , res) => {
    let tasks = await Task.findByIdAndUpdate(req.params.id , req.body,{
        new: true,
    });
    res.status(200).json(tasks);
})

app.post("/tasks" , async (req , res) => {
    try{
        let createTask = await Task.create(req.body);
        res.status(200).json(createTask);
    }catch(e){
        console.log(e.message);
        res.status(400).send(e.message);
    }
})

app.listen(PORT, async()=>{
    try{
        await connect();
        console.log(`Running on PORT No: ${PORT}`);
    }catch(e){
        console.log(e.message);
    }
});
