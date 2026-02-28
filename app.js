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








//


app.use((err, req, res, next) =>{
    res.status(500).json({error: "Server error!"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`APP is listening on ${PORT}`);
});