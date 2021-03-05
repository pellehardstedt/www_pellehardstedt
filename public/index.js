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
        defaultDate: '2011/01/01', // use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')
        
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
        allowDates : ['2011/01/01', '2011/01/20', '2011/01/21','2011/01/22','2011/01/23','2011/01/24','2011/01/25','2011/01/26','2011/01/27','2011/01/28','2011/01/29','2011/01/30'],
        allowDateRe : null,
        disabledDates : [],
        disabledWeekDays: [],
        yearOffset: 0,
        beforeShowDay: null,
        
        enterLikeTab: true,
        showApplyButton: false
        });
});

function btnPredict() {
    let dateObj = $('#dateInput').datetimepicker('getValue')
    date = dateObj.toLocaleString();
    $.post('/bike_predict', {data: date}, function(json){
        $('#result').empty()
        if(json.body == "Data for selected date and hour is unavaliable. Please select a diffrent date or hour."){
            $('#result').append(
                '<p> ' + json.body + ' </p>'
            );
        } else {
            $('#result').append(
                '<p>The predicted demand for bikes on ' + dateObj.toLocaleString('en-GB', {hour: "2-digit", minute: "2-digit", weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + ' is: '+ json.body.substring(1,5) + '</p>'
            );
        }
        //$('#dateInput').datetimepicker('reset');
    }, 'json');
}