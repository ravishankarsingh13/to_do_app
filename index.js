const express = require('express');
const path = require('path');
const port = 8000;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());

var tasklist = [
    {
        task:"google"
    },
    {
        task:"facebook"
    }
]

app.get('/',function(req,res){
    return res.render('home',{
        title: "tasklist",
        task_list : tasklist 
    })
})



app.get('/',function(req,res){
    return res.render('home',{title: "my todolist"});
});
app.post('/add_task',function(req,res){
    tasklist.push({
        task: req.body.task
    });
    return res.redirect('/');
});

app.listen(port, function(err){
    if(err){
        console.log(`Error i running the server ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});