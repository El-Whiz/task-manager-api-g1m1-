let tasks = [
    {id: 1, title: 'Homework', description: 'Write an essay', status: 'completed'},
    {id: 2, title: 'Study', description: 'Read and solve past questions', status: 'pending'},
    {id: 3, title: 'Excercise', description: 'Do 100 pushups', status: 'pending'},
    {id: 4, title: 'Pray', description: 'Read today\'s bible verse and pray', status: 'completed'}
]

function welcome(req, res){
    res.send('Welcome! This is the group1:minigroup1 project (Task Manager API)');
}

function patch (req,res) {
    const id = parseInt(req.params.id)
    const task = tasks.find(t => t.id==id)
    if(!task){
        return res.status(400).json({message: "task not found"})
    }
    Object.assign(task,req.body)
    res.status(200).json(task)
}

function put (req,res) {
    const id = parseInt(req.params.id)
    const task = tasks.find(t => t.id === id)
    if (!task) {
        return res.status(400).json({message: 'id does not exist'})
    }
    if ((!req.body.title) || (!req.body.description) || (req.body.status) === undefined) {
        return res.status(400).json({message: 'title, description and status fields are required'})
    } 
    //
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;

    return res.status(200).json(task)
}

module.exports = {
    welcome,
    patch,
    put
};