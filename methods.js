let tasks = [
    {id: 1, title: 'Homework', description: 'Write an essay', status: 'completed'},
    {id: 2, title: 'Study', description: 'Read and solve past questions', status: 'pending'},
    {id: 3, title: 'Excercise', description: 'Do 100 pushups', status: 'pending'},
    {id: 4, title: 'Pray', description: 'Read today\'s bible verse and pray', status: 'completed'}
]

function welcome(req, res){
    res.send('Welcome! This is the group1:minigroup1 project (Task Manager API)');
}

function getAll(req, res){
    res.status(200).json(tasks);
}

function getTask(req, res){
    const id = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === id);
    if(!task) return res.status(404).json({message: 'Invalid ID'});
    res.status(200).json(task);
}

function createTask (req, res){
    if(req.body.title === undefined || req.body.description === undefined || req.body.status == undefined)
        return res.status(400).json({ message: 'Add all fields' });
    
    if(req.body.status !== "completed" && req.body.status !== "pending")
        return res.status(400).json({ message: "Invalid status. Use pending/completed" });
    
    const newTask = { id: tasks.length + 1, ...req.body };
    tasks.push(newTask);
    res.status(201).json(newTask);
}

function patch (req,res) {
    const id = parseInt(req.params.id)
    const task = tasks.find(t => t.id==id)
    if(!task){
        return res.status(400).json({message: "Task not found"})
    }
    
    if(req.body.status !== "completed" && req.body.status !== "pending")
        return res.status(400).json({ message: "Invalid status. Use pending/completed" });

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
    
    if(req.body.status !== "completed" && req.body.status !== "pending")
        return res.status(400).json({ message: "Invalid status. Use pending/completed" });
    
    task.title = req.body.title;
    task.description = req.body.description;
    task.status = req.body.status;

    return res.status(200).json(task)
}

function delete_ (req, res){
    const id = parseInt(req.params.id);
    const n = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    if(tasks.length === n)
        return res.status(404).json({error: `Not found`});
    res.status(204).send();
}

module.exports = {
    welcome,
    getAll,
    getTask,
    patch,
    put,
    delete_,
    createTask
};