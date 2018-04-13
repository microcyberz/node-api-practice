require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

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
const port = process.env.PORT;
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
app.post('/users', (req, res) => {
    var user = new User({
        email: req.body.email
    });
    user.save().then((doc) => {
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
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send()
        }
        res.send({ todo });

    }).catch((e) => {
        res.status(400).send();
    });
});


// Deleting 
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });

});


// Updating
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    // validate the id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    // timestamp of completion
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    // update
    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e)=>{
        res.status(400).send();
    });


});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


module.exports = {
    app
};
