var express = require('express');
var requests = require('request')
var app = express();
const path = require('path');

const singlePrediction =  {
    "instances": [
        {
            "features": ["2012-12-19 17:00:00",4,0,1,1,16.4,20.455,50,26.0027]
            
        }
    ]
}

var keys = require(path.join(__dirname+'/private/keys.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/bike_predict',function(req,res){
    var toFrontend;
    const options = {
        url: keys.url,
        json: true,
        body: singlePrediction
    };

    requests.post(options, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        //responde to the outer request
        res.json(body)
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});