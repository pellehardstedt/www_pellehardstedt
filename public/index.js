function btnPredict() {
    let dateObj = $('#dateInput').datetimepicker('getValue')

    time = dateObj
    year = dateObj.getFullYear()
    month = dateObj.getMonth()+1
    month = (month<10) ? month = 0 + month.toString() : month;
    hour = dateObj.getHours()
    day = dateObj.getDate()
    day = (day<10) ? day = 0 + day.toString() : day;
    date = year + '-' + month + '-' + day + ' ' + hour + ':00:00'

    $.post('/bike_predict', {data: date}, function(json){

        options = {hour: "2-digit", minute: "2-digit", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}

        $('#result').empty()
        if(json.pred == "Data for selected date and hour is unavaliable. Please select a different date or hour."){
            $('#result').append(
                '<p>' + json.pred + ' </p>'
            );
        } else {
            $('#result').append(
                '<p class="pred_1">' + dateObj.toLocaleString('en-GB', options) + '</p>' +
                '<p class="pred_2">' + weather[json.dateData[3]] + '.</p>' +
                '<p class="pred_3"> The temperature was ' + json.dateData[4] + ' degrees celsius, perceived as ' + json.dateData[5] + ' degrees.</p>'+
                '<p class="pred_4">The humidity was ' + json.dateData[6] + '% and the windspeed ' + json.dateData[7]  + ' MPH.</p>'+
                '<p class="pred_5">Estimated demand for bikes : '+ json.pred.substring(1,5) + '</p>'
            );
        }
        //$('#dateInput').datetimepicker('reset');
    }, 'json');
}

weather = ["There was a clear sky, a few clouds or partly cloudy",
            "It was cloudy and/or misty",
            "There was light rain or snow, thunderstorm",
            "There was heavy rain, thunderstorm and/or mist or fog"]

$(function(){
    $('#dateInput').datetimepicker({
        ownerDocument: document,
        contentWindow: window,
        
        value: '',
        rtl: false,
        
        format: 'Y/m/d H:i',
        formatTime: 'H:i',
        formatDate: 'Y/m/d',
        
        startDate:  false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
        step: 60,
        monthChangeSpinner: true,
        
        closeOnDateSelect: false,
        closeOnTimeSelect: true,
        closeOnWithoutClick: true,
        closeOnInputClick: true,
        openOnFocus: true,
        
        timepicker: true,
        datepicker: true,
        weeks: false,
        
        defaultTime: '12:00', // use formatTime format (ex. '10:00' for formatTime: 'H:i')
        defaultDate: '2011/01/20', // use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')
        
        minDate: '2011/01/01',
        maxDate: '2012-12-31',
        minTime: false,
        maxTime: false,
        minDateTime: false,
        maxDateTime: false,
        
        allowTimes: [],
        opened: false,
        initTime: true,
        inline: false,
        theme: '',
        touchMovedThreshold: 5,
        
        onSelectDate: function () {},
        onSelectTime: function () {},
        onChangeMonth: function () {},
        onGetWeekOfYear: function () {},
        onChangeYear: function () {},
        onChangeDateTime: function () {},
        onShow: function () {},
        onClose: function () {},
        onGenerate: function () {},
        
        withoutCopyright: true,
        inverseButton: false,
        hours12: false,
        next: 'xdsoft_next',
        prev : 'xdsoft_prev',
        dayOfWeekStart: 0,
        parentID: 'body',
        timeHeightInTimePicker: 25,
        
        todayButton: false,
        prevButton: true,
        nextButton: true,
        defaultSelect: true,
        
        scrollMonth: true,
        scrollTime: true,
        scrollInput: true,
        
        lazyInit: false,
        mask: false,
        validateOnBlur: true,
        allowBlank: true,
        yearStart: '2011',
        yearEnd: '2012',
        monthStart: 0,
        monthEnd: 11,
        style: '',
        id: '',
        fixed: false,
        roundTime: 'round', // ceil, floor
        className: '',
        weekends: [],
        highlightedDates: [],
        highlightedPeriods: [],
        allowDates : ['2011/01/20', '2011/01/21','2011/01/22','2011/01/23','2011/01/24','2011/01/25','2011/01/26','2011/01/27','2011/01/28','2011/01/29','2011/01/30', '2011/02/31',
        '2011/02/20', '2011/02/21','2011/02/22','2011/02/23','2011/02/24','2011/02/25','2011/02/26','2011/02/27','2011/02/28','2011/02/29','2011/02/30', '2011/02/31',
        '2011/03/20', '2011/03/21','2011/03/22','2011/03/23','2011/03/24','2011/03/25','2011/03/26','2011/03/27','2011/03/28','2011/03/29','2011/03/30', '2011/02/31',
        '2011/04/20', '2011/04/21','2011/04/22','2011/04/23','2011/04/24','2011/04/25','2011/04/26','2011/04/27','2011/04/28','2011/04/29','2011/04/30', '2011/02/31',
        '2011/05/20', '2011/05/21','2011/05/22','2011/05/23','2011/05/24','2011/05/25','2011/05/26','2011/05/27','2011/05/28','2011/05/29','2011/05/30', '2011/02/31',
        '2011/06/20', '2011/06/21','2011/06/22','2011/06/23','2011/06/24','2011/06/25','2011/06/26','2011/06/27','2011/06/28','2011/06/29','2011/06/30', '2011/02/31',
        '2011/07/20', '2011/07/21','2011/07/22','2011/07/23','2011/07/24','2011/07/25','2011/07/26','2011/07/27','2011/07/28','2011/07/29','2011/07/30', '2011/07/31',
        '2011/08/20', '2011/08/21','2011/08/22','2011/08/23','2011/08/24','2011/08/25','2011/08/26','2011/08/27','2011/08/28','2011/08/29','2011/08/30', '2011/08/31',
        '2011/09/20', '2011/09/21','2011/09/22','2011/09/23','2011/09/24','2011/09/25','2011/09/26','2011/09/27','2011/09/28','2011/09/29','2011/09/30', '2011/09/31',
        '2011/10/20', '2011/10/21','2011/10/22','2011/10/23','2011/10/24','2011/10/25','2011/10/26','2011/10/27','2011/10/28','2011/10/29','2011/10/30', '2011/10/31',
        '2011/11/20', '2011/11/21','2011/11/22','2011/11/23','2011/11/24','2011/11/25','2011/11/26','2011/11/27','2011/11/28','2011/11/29','2011/11/30', '2011/12/31',
        '2011/12/20', '2011/12/21','2011/12/22','2011/12/23','2011/12/24','2011/12/25','2011/12/26','2011/12/27','2011/12/28','2011/12/29','2011/12/30', '2011/12/31',
        '2012/01/20', '2012/01/21','2012/01/22','2012/01/23','2012/01/24','2012/01/25','2012/01/26','2012/01/27','2012/01/28','2012/01/29','2012/01/30', '2012/01/31',
        '2011/02/20', '2011/02/21','2011/02/22','2011/02/23','2011/02/24','2011/02/25','2011/02/26','2011/02/27','2011/02/28','2011/02/29','2011/02/30', '2011/02/31',
        '2012/03/20', '2012/03/21','2012/03/22','2012/03/23','2012/03/24','2012/03/25','2012/03/26','2012/03/27','2012/03/28','2012/03/29','2012/03/30', '2012/03/31',
        '2012/04/20', '2012/04/21','2012/04/22','2012/04/23','2012/04/24','2012/04/25','2012/04/26','2012/04/27','2012/04/28','2012/04/29','2012/04/30', '2012/04/31',
        '2012/05/20', '2012/05/21','2012/05/22','2012/05/23','2012/05/24','2012/05/25','2012/05/26','2012/05/27','2012/05/28','2012/05/29','2012/05/30', '2012/05/31',
        '2012/06/20', '2012/06/21','2012/06/22','2012/06/23','2012/06/24','2012/06/25','2012/06/26','2012/06/27','2012/06/28','2012/06/29','2012/06/30', '2012/06/31',
        '2012/07/20', '2012/07/21','2012/07/22','2012/07/23','2012/07/24','2012/07/25','2012/07/26','2012/07/27','2012/07/28','2012/07/29','2012/07/30', '2012/07/31',
        '2012/08/20', '2012/08/21','2012/08/22','2012/08/23','2012/08/24','2012/08/25','2012/08/26','2012/08/27','2012/08/28','2012/08/29','2012/08/30', '2012/08/31',
        '2012/09/20', '2012/09/21','2012/09/22','2012/09/23','2012/09/24','2012/09/25','2012/09/26','2012/09/27','2012/09/28','2012/09/29','2012/09/30', '2012/09/31',
        '2012/10/20', '2012/10/21','2012/10/22','2012/10/23','2012/10/24','2012/10/25','2012/10/26','2012/10/27','2012/10/28','2012/10/29','2012/10/30', '2012/10/31',
        '2012/11/20', '2012/11/21','2012/12/22','2012/11/23','2012/11/24','2012/11/25','2012/11/26','2012/11/27','2012/11/28','2012/11/29','2012/11/30', '2012/11/31',
        '2012/12/20', '2012/12/21','2012/12/22','2012/12/23','2012/12/24','2012/12/25','2012/12/26','2012/12/27','2012/12/28','2012/12/29','2012/12/30', '2012/12/31',
            
            
            
            
            ],
        allowDateRe : null,
        disabledDates : [],
        disabledWeekDays: [],
        yearOffset: 0,
        beforeShowDay: null,
        
        enterLikeTab: true,
        showApplyButton: false
        });
});