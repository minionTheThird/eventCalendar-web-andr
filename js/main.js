$(document).ready(
    function()
    {
        getCodeforcesEvents();
        getCodeChefEvents();
        getHackerEarthEvents();
    }
);

Date.prototype.format = function() {

    var d = this.toString().split(' ');
    var t = this.toLocaleTimeString().split(' ');
    var time = t[0].split(':');

    this.DAY = d[0];
    this.MMM = d[1];
    this.DD = d[2];
    this.YYYY = d[3];
    this.timeZone = d[6].slice(1,-1);
    this.HH = time[0];
    this.MIN = time[1];
    this.TIME = this.HH+":"+this.MIN+" "+t[1];
    this.dateTime = this.toLocaleDateString() +" "+ this.toLocaleTimeString();
    this.DATE = this.DAY+", "+this.MMM+" "+this.DD+" "+this.YYYY+", "+this.TIME+" "+this.timeZone;

}

function getCodeforcesEvents()
{
        var inputHTML = "";
        $.ajax({
            url: 'http://codeforces.com/api/contest.list',
            dataType: 'JSONP',
            data : {
                jsonp:"callback",
            },
            jsonpCallback: 'callback',
            type: 'GET',
            success: function (data1) {
                var events = data1.result;
                var table = document.getElementById("codeforces");

                for(var id in events){
                  if(events[id].phase != "FINISHED"){

                    var row = table.insertRow(1);
                    var l_calendar = row.insertCell(0);

                    var start_date = new Date(events[id].startTimeSeconds*1000);
                    var end_date = new Date((events[id].startTimeSeconds + events[id].durationSeconds)*1000);
                    start_date.format();
                    end_date.format();

                    var template = $('#calendar-template').html();
                    Mustache.parse(template);   // optional, speeds up future uses
                    var rendered = Mustache.render(
                                      template,
                                      {
                                        month : start_date.MMM,
                                        day : start_date.DD,
                                        name : events[id].name,
                                        startTime : start_date.TIME,
                                        endTime : end_date.TIME,
                                        timeZone : start_date.timeZone,
                                        startDateTime : start_date.dateTime ,
                                        endDateTime : end_date.dateTime
                                      });
                    l_calendar.innerHTML = rendered;

                  }
                 };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("error for : " + this.handle)
            }

        });
}

function getHackerEarthEvents()
{
        var inputHTML = "";
        var calendarId = 'hackerearth.com_73f0o8kl62rb5v1htv19p607e4@group.calendar.google.com'
        var startTime = new Date();
        var endTime = new Date();
        var key = 'AIzaSyCAkVQVwMzmPHxbaLUAqvb6dYUwjKU5qnM';
        //usage limit to http://minionthethird.github.io/*
        //working = AIzaSyCAkVQVwMzmPHxbaLUAqvb6dYUwjKU5qnM
        //other key = AIzaSyBQal2rNhP5SRkU5hZytY7Yb8nYc5Q1nrc
        endTime.setDate(endTime.getDate()+7);
        var URL = 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events?key='+key+'&timeMax='+endTime.toISOString()+'&timeMin='+startTime.toISOString();
        $.ajax({
            url: URL,
            dataType: 'JSONP',
            type: 'GET',
            success: function (dataHE) {
                var events = dataHE.items;
                events.sort(function(a, b) {
                    return b.start.dateTime.localeCompare(a.start.dateTime);
                });

                var table = document.getElementById("hackerEarth");

                for(var id in events){
                  if(events[id].status == "confirmed"){

                    var start_date = new Date(events[id].start.dateTime);
                    var end_date = new Date(events[id].end.dateTime);
                    start_date.format();
                    end_date.format();

                    var row = table.insertRow(1);
                    var l_calendar = row.insertCell(0);

                    var template = $('#calendar-template').html();
                    Mustache.parse(template);   // optional, speeds up future uses
                    var rendered = Mustache.render(
                                      template,
                                      {
                                        month : start_date.MMM,
                                        day : start_date.DD,
                                        name : events[id].summary,
                                        startTime : start_date.TIME,
                                        endTime : end_date.TIME,
                                        timeZone : start_date.timeZone,
                                        startDateTime : start_date.dateTime ,
                                        endDateTime : end_date.dateTime
                                      });
                    l_calendar.innerHTML = rendered;

                  }
                 };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("error for : " + this.handle)
            }

        });
}

function getCodeChefEvents()
{
        var inputHTML = "";
        var calendarId = 'codechef.com_3ilksfmv45aqr3at9ckm95td5g%40group.calendar.google.com'
        var startTime = new Date();
        var endTime = new Date();
        var key = 'AIzaSyCAkVQVwMzmPHxbaLUAqvb6dYUwjKU5qnM';
        //usage limit to http://minionthethird.github.io/*
        //working = AIzaSyCAkVQVwMzmPHxbaLUAqvb6dYUwjKU5qnM
        //other key = AIzaSyBQal2rNhP5SRkU5hZytY7Yb8nYc5Q1nrc
        endTime.setDate(endTime.getDate()+14);
        var URL = 'https://www.googleapis.com/calendar/v3/calendars/'+calendarId+'/events?key='+key+'&timeMax='+endTime.toISOString()+'&timeMin='+startTime.toISOString();
        $.ajax({
            url: URL,
            dataType: 'JSONP',
            type: 'GET',
            success: function (data) {
                var events = data.items;
                events.sort(function(a, b) {
                    return b.start.dateTime.localeCompare(a.start.dateTime);
                });

                var table = document.getElementById("codeChef");

                for(var id in events){
                  if(events[id].status == "confirmed"){

                    var start_date = new Date(events[id].start.dateTime);
                    var end_date = new Date(events[id].end.dateTime);
                    start_date.format();
                    end_date.format();

                    var row = table.insertRow(1);
                    var l_calendar = row.insertCell(0);

                    var template = $('#calendar-template').html();
                    Mustache.parse(template);   // optional, speeds up future uses
                    var rendered = Mustache.render(
                                      template,
                                      {
                                        month : start_date.MMM,
                                        day : start_date.DD,
                                        name : events[id].summary,
                                        startTime : start_date.TIME,
                                        endTime : end_date.TIME,
                                        timeZone : start_date.timeZone,
                                        startDateTime : start_date.dateTime ,
                                        endDateTime : end_date.dateTime
                                      });
                    l_calendar.innerHTML = rendered;

                  }
                 };
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log("error for : " + this.handle)
            }

        });
}
