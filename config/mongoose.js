//require the library
const mongoose = require('mongoose');

//connect to data base
mongoose.connect('mongodb://localhost/task_list_db');

//acquire the connection (to check if it is successful)
const db = mongoose.connection;

//error
db.on('error',console.error.bind(console,'error connecting in db'));

// up and running then print the message
db.once('open',function(){
    console.log('Successfully connected to database');
})