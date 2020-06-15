const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose')
const Tasks =require('./models/task');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){

    var n=0;
    Tasks.find({},function(err,tasks){
        if(err){
            console.log("error in assecessing the db");
            return;
        }
        tasks.forEach(function(item){
            if(item.completed==false)
            n++;
        });
        return res.render('home',{
         title: "tasklist",
        task_list : tasks,
        count:n 
        })
    })
    
});


app.post('/add_task',function(req,res){
    Tasks.create({
        task: req.body.task,
        category:req.body.category,
        date: req.body.date,
        completed:false
    },function(err,newTask){
        if(err){
            console.log('error in creating the task');
            return;
        }
        console.log("***",newTask);
        return res.redirect('back');
    })
});


app.get('/delete-task',function(req,res){
    let id=req.query.id;
    
    Tasks.findByIdAndDelete(id,function(err){
        if(err){
            console.log("error in deleting the task from db");
            return;
        }
        return res.redirect('back');
    })
})

app.listen(port, function(err){
    if(err){
        console.log(`Error i running the server ${err}`);
    }
    console.log(`server is running on port: ${port}`);
});