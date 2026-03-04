require('dotenv').config();

const methods = require('./methods.js');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', methods.welcome);

app.get('/getTasks', methods.getAll);

app.get('/getTask/:id', methods.getTask);

app.post('/createTask', methods.createTask);

app.patch('/updateTaskDetails/:id', methods.patch);

app.put('/updateTask/:id', methods.put);

app.delete('/deleteTask/:id', methods.delete_);

app.use((err, req, res, next) =>{
    res.status(500).json({error: "Server error!"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`APP is listening on ${PORT}`);
});