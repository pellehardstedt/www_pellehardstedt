var express = require('express');
var app = express();
const path = require('path');

var data = require('./data.json');
var dataKeys = Object.keys(data);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/bike_predict',function(req,res){
    res.json(dataKeys);
  });

app.listen(3000, function(){
    console.log("Listening on port 3000")
});