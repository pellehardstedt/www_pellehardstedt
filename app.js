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

app.post('/bike_predict', async function(req,res){
    let pred;
    dateData = await searchDate(req.body.data)
    console.log(dateData)
    if(dateData == null){
        resJSON = JSON.parse('{"pred": "Data for selected date and hour is unavaliable. Please select a different date or hour."}')
        res.json(resJSON)
    } else {

        dateJSON = JSON.parse('{"instances": [{"features": [' + dateData.toString() + ']}]}')

        const options = {
            url: keys.url,
            json: true,
            body: dateJSON
        };
        requests.post(options,  async (err, response, json) => {
            if (err) {
                console.log("Error")
                return console.log(err)
            }
            pred = json.body
            resJSON = await JSON.parse('{"pred": "' + pred+ '", "dateData": [' + dateData + ']}')
            await res.json(resJSON)
        });
    }
    //console.log("Pred 2: " + pred)
    


});

app.listen(80, function(){
    console.log("Listening on port 80")
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
    if(!jsonString){
        return null
    }
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

    return [date, parseInt(holiday), parseInt(workingday), parseInt(weather), parseFloat(temp), parseFloat(atemp), parseFloat(humidity), parseFloat(windspeed)]
}