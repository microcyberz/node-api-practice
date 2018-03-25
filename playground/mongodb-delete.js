const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    };
    console.log('Connected to mongo db server');


    // ===== deleteMany(0)
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // ===== deleteOne()
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((results) => {
    //     console.log(results);
    // });

    // ===== findOneAndDelete()
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

   
    //Repeated above three function
    db.collection('Users').deleteMany({name: 'Andrew'});

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5ab7d28bfeb302b124693cbf')}).then((result) => {
        console.log(result);
    });;
    // db.close();
});