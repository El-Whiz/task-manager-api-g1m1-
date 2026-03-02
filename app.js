require('dotenv').config();

const methods = require('./methods.js');
const express = require('express');
const app = express();
app.use(express.json());

let tasks = [
    {id: 1, title: 'Homework', description: 'Write an essay', status: 'completed'},
    {id: 2, title: 'Study', description: 'Read and solve past questions', status: 'pending'},
    {id: 3, title: 'Excercise', description: 'Do 100 pushups', status: 'pending'},
    {id: 4, title: 'Pray', description: 'Read today\'s bible verse and pray', status: 'completed'}
]

app.get('/', methods.welcome);

//add other methods underneath here
app.post('/createTask', (req, res) => {
    if(req.body.title === undefined || req.body.description === undefined || req.body.status == undefined)
        return res.status(400).json({ message: 'Add all fields' });
    
    if(req.body.status !== "completed" && req.body.status !== "pending")
        return res.status(400).json({ message: "Invalid status. Use pending/completed" });
    
    const newTask = { id: tasks.length + 1, ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
});







//


app.use((err, req, res, next) =>{
    res.status(500).json({error: "Server error!"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`APP is listening on ${PORT}`);
});