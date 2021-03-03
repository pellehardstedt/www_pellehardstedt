$(function(){

  
});

function btnPredict() {
    $.getJSON('/bike_predict',function(json){
        $('.result').append(
            '<li><a href="#">' + json + '</a></li>'
        );

        json.forEach(function(data){
            console.log(data)
        });
    });
}

 