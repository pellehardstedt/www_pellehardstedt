const express = require('express');
const requests = require('request')
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { json } = require('express');

const allDates =require(path.join(__dirname+'/private/allDates.json'));

const keys = require(path.join(__dirname+'/private/keys.json'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/bike_predict',function(req,res){
    dateData = searchDate(req.body.data)

    dateJSON = `{"instances": [{"features": ${dateData}}]}`
    var toFrontend;
    const options = {
        url: keys.url,
        json: true,
        body: dateJSON
    };

    requests.post(options, (err, response, body) => {
        if (err) {
            return console.log(err)
        }
        //responde to the outer request
        res.json(dateJSON)
    });
});

app.listen(3000, function(){
    console.log("Listening on port 3000")
});

function searchDate(date){
    let returnCSV;
    for(let i in allDates){
        if(allDates[i].datetime == date){
            returnCSV = allDates[i]
            break
        }
    }
    jsonString = JSON.stringify(returnCSV)
    jsonArray = jsonString.split('":"')

    date = jsonArray[1].split(',"')[0]
    date = date.substring(0, date.length - 1);
    date = '"' + date + '"';
    jsonArray = jsonArray[1].split('":')
    holiday = jsonArray[1].split(',"')[0]
    workingday = jsonArray[2].split(',"')[0]
    weather = jsonArray[3].split(',"')[0]
    temp = jsonArray[4].split(',"')[0]
    atemp = jsonArray[5].split(',"')[0]
    humidity = jsonArray[6].split(',"')[0]
    windspeed = jsonArray[7].split(',"')[0]

    return [date, holiday, workingday, weather, temp, atemp, humidity, windspeed]
}