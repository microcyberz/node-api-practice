const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// // An ID from database, then it is validated
// var id = '5ac4ccabc209fd17589030af';
// if(!ObjectID.isValid(id)){
//     console.log(' ****** Id is not valid ******');    
// }

// Find by a custom filter (Returns an array of matched objects)
// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log("Todos:", todos);
// });

// // Returns only forst matched object
// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log("Todo:", todo);
// });

// // Direct return the element of the given id
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         console.log('ID not found');
//     }
//     console.log('Todo: by ID: ', todo);
// }).catch((e)=>{
//     console.log(e);
// });



User.findById('5ac5aebc58ab7d241488ef11').then((user)=>{
    if(!user){
        console.log('Unable to find user');
    }
    console.log('User:', JSON.stringify(user, undefined, 2));
}).catch((e)=>{
    console.log(e);
});





