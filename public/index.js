$(function(){

});

function btnPredict() {
    $.getJSON('/bike_predict',function(json){
        console.log(json.body)
        $('.result').append(
            '<li><a href="#">' + json.body + '</a></li>'
        );
    });
}

 