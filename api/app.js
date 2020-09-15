const express = require('express');
const app = express();
const port = 5000;
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node_api');
const db = mongoose.connection;
db.once('open', function(){
    console.log("Connected to MongoDB successfully!");
});
db.on('error', function(){
    console.log(err);
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
const users = require('./routes/Router');
app.use('/api', users);
app.get('/', function(req, res){
    res.send('Hello from Server');
})

app.listen(port, function(){
    console.log('server started...');
})
