var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require('./models/todo');
var {
    User
} = require('./models/user');

// Configuration

var app = express();
app.use(bodyParser.json());


// Routes
// -- Add a new todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// -- Add a new user
app.post('/users', (req,res)=>{
    var user = new User({
        email: req.body.email
    });
    user.save().then((doc)=>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// -- View all todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
});

// -- View one todo
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(400).send('Invalid Id');
     }

    Todo.findById(id).then((todo) => {
         if(!todo){
            return res.status(400).send('Todo Not Found')
         }
         res.send(todo);
        
    }).catch((e) => {
        res.status(400).send();
    });
});
 



app.listen(3000, () => {
    console.log('Started on port 3000');
});


module.exports = {
    app
};