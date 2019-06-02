var http = require('http');
var express = require('express');
var app = express();

var bparse = require('body-parser');
app.use(bparse.json());

app.use(function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var ejs = require('ejs');
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));

var mongoose = require('mongoose');

mongoose.connect('mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', {
    userMongoClient: true
});

var db= mongoose.connection;
var Todo;



app.get('/', function (req,res) {
    res.render('index.html');
});

app.get('/API/temp', function (req,res) {
    res.render('temp.html');
});

app.get('/API/test', function (req,res) {
    res.send('test complete');
});

app.get('/', function (req, res) { 
    res.send("you are on my homepage");})

app.get('/about', function (req, res) {
    res.render('about.html');
});

app.get('/test', function(req,res){
    res.render('test.html');
});

app.post('/API/temp', function (req,res){
    var f = req.body.value;
    f = f * 1;
    var c = (f - 32) * 5 / 9;
    res.send(c); 
});

   




var todoDB = [
    {
        text: "TODO 1",
        user: "Michael",
        status: 0,
        id: 1,
        priority: "P2"
    },
    {
        text: "Get Milk",
        user: "Michael",
        status: 0,
        id: 2,
        priority: "P1"
    }


];

app.get('/API/todo', function (req,res) {
    console.log("req GET todos");

    Todo.find({}, function(error,data){
        if(error){
            console.log(error);
            res.send(error);
        }

        

        res.json(data);
    });
    
});

app.get('/API/todo/filter', function(req,res){
    Todo.remove({user: 'Michael'}, function(error,data){
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }

        

        res.json(data);
    });
});

app.post('/API/todo', function (req,res) {
    console.log("req POST todos");

    var todo= new Todo(req.body);
    todo.save(function(error, savedItem){
        if(error){
        console.log(error);
        res.status(500);
        res.send(error);
    }

        console.log(savedItem);
        savedItem.id = savedItem._id;

        res.json(todo);


    });
    
});
 app.put('/API/todo', function(req,res) {
     var todo= req.body;
     if (!todo.id){
         res.status(412);
         res.send("TODO object should have id");
     }

    Todo.findByIdAndUpdate(todo.id, todo, function(error, savedItem){
        if(error){
            console.log(error);
            res.status(500);
            res.send(error);
        }

        res.status(201);
        res.json(savedItem);

    });

    


 });

 app.delete("/API/todo" , function(req,res){
     var todo=req.body;
     if(!todo.id){
         res.status(412);
         res.send("TODO should have ID");
     }

     Todo.findByIdAndRemove(todo.id, function(error){
         if(error){
            console.log(error);
            res.status(500);
            res.send(error);
         }
         res.status(201);
         res.send("Item Removed");
     });

     
 });

 db.on('error', function(error) {
     console.log("error on db con", error);
 });

 db.on('open', function () {
     console.log('my shit is working');

     var todoSchema = mongoose.Schema({
         user: String,
         text: String,
         priority: String,
         status: Number,
         


     });

     Todo = mongoose.model('todosCh3', todoSchema);

     
 });

 
app.listen(8080, function (){
    console.log("my shit is working on http://127.0.0.1:8080");
});









