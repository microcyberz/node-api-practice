const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');



// Three ways to remove 
// Todo.remove({}).then((result)=>{ // first
//     console.log(result);
// });


// Todo.findOneAndRemove()      // second
Todo.findOneAndRemove({ _id: '5acb6b884eecb82e7066c034' }).then((todo) => {
    console.log(todo);
});

// Todo.findByIdAndRemove       // third
Todo.findByIdAndRemove('5acb6b884eecb82e7066c034').then((todo) => {
    console.log(todo);
});