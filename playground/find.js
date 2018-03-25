const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    };
    console.log('Connected to mongo db server');


    // ===== Fetch with filter of id using toArray()
    // db.collection('Todos').find({_id: new ObjectID('5ab7bf7cf91a98176295016e')}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // ===== Fetch the length/number of items in the colection
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos Count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    //===== Fetch users with of filter of their names
    db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
        console.log('Users');
        console.log(JSON.stringify(docs, undefined, 2));
    }, () => {});

    db.close();
});