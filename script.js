window.addEventListener("load", function(){
  
  var getAPI = new XMLHttpRequest();

  getAPI.addEventListener("load", function(e){

      //creates JSON object
      var rawData = JSON.parse(e.target.response)

      // converts full time
      function determineTime(num) {
        var d = new Date(num * 1000);
        var hour = d.getHours();
        var daypart = "AM";
        if (hour > 12) {
          daypart = "PM";
        } 
        if (hour > 12) {
          hour -= 12;
        } else if (hour === 0) {
          hour = 12;
        }
        var minutes = d.getMinutes();
        var zero = "";
        if (minutes <10) {
          zero = "0"
        }
        time = hour + ":" + zero + minutes + " " + daypart;
        return time;
      } 

      // converts hour
      function determineHour(num) {
        var d = new Date(num * 1000);
        var x = d.getHours();
        var daypart = "AM";
        if (x > 11) {
          daypart = "PM";
        } 
        if (x > 12) {
          x -= 12;
        } else if (x === 0) {
          x = 12;
        }
        hour = x + " " + daypart;
        return hour;
      }

      // converts days 
      function determineDay(num) {
        var d = new Date(num * 1000);
        var weekday = new Array(7);
            weekday[0]=  "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
        var dayName = weekday[d.getDay()];
        return dayName;
      } 
      // formats precipitation
      function precipInt(num) {
        var precipIntensity = "--";
        var x = num.toFixed(1);
        if (x != 0.0) {
          precipIntensity = x + " in"; 
        }
        return precipIntensity;
      }
      //calculates wind direction from Blair
      function currentWindDirection(x) {
        if ((x >= 337.6 && x < 360) || (x >= 0 && x <= 22.5)) {"E";}
        else if (x >= 22.6 && x <= 67.5) {return "NE";}
        else if (x >= 67.6 && x <= 112.5) {return "N";}
        else if (x >= 112.6 && x <= 157.5) {return "NW";}
        else if (x >= 157.6 && x <= 202.5) {return "W";}
        else if (x >= 202.6 && x <= 247.5) {return "SW";}
        else if (x >= 247.6 && x <= 292.5) {return "S";}
        else if (x >= 292.6 && x <= 337.5) {return "SE";}
        else {return "--";}
      };

    //*****currently section ***** 
        var currently = rawData.currently;

        var currently_today = document.getElementById("today");  
        var todayNumber = currently.time;
        var todayName = determineDay(todayNumber);
        currently_today.innerHTML = todayName;

        var currently_Summary = document.getElementById("summary");
        currently_Summary.innerHTML = currently.summary;

        var currently_Temperature = document.getElementById("temperature");
        currently_Temperature.innerHTML = Math.round(currently.temperature) + "&deg;";

        var currently_apparentTemperature = document.getElementById("apparentTemperature");
        currently_apparentTemperature.innerHTML = Math.round(currently.apparentTemperature);

        var currently_precipProbability = document.getElementById("precipProbability");
        currently_precipProbability.innerHTML = currently.precipProbability;

        var currently_windSpeed = document.getElementById("windSpeed");
        currently_windSpeed.innerHTML = currently.windSpeed;

        var rawCurrently = rawData.currently;

        var currently_Humidity = document.getElementById("humidity");
        currently_Humidity.innerHTML = (currently.humidity * 100);

        var currently_visibility = document.getElementById("visibility");
        currently_visibility.innerHTML = currently.visibility;

        var currently_windBearing = document.getElementById("windBearing");
        currently_windBearing.innerHTML = currentWindDirection(currently.windBearing);

        var currently_pressure = document.getElementById("pressure");
        var currentPressure = (29.92 * currently.pressure) / 1013.25; //this variable is the pressure with mb converted to in.
        currently_pressure.innerHTML = Math.round(currentPressure);

        var currently_precipIntensity = document.getElementById("precipIntensity"); 
        var precipIntensity = precipInt(currently.precipIntensity);
        currently_precipIntensity.innerHTML = precipIntensity;

    //*****daily section ***** 
        var daily_Summary = document.getElementById("daily_Summary");
        daily_Summary.innerHTML = "Today: " + rawData.daily.summary;

        var dailyData = rawData.daily.data; 

        var dailyDays = [];
        var dailyHighs = [];
        var dailyLows = [];

        for (var i = 0; i < dailyData.length; i++) {
          dailyDays.push(determineDay(dailyData[i].time));
          dailyHighs.push(Math.round(dailyData[i].temperatureMax));
          dailyLows.push(Math.round(dailyData[i].temperatureMin));
        }

        var daily_Days = document.getElementsByClassName("daily__day");
        for (var i = 0; i < daily_Days.length; i++) {
          daily_Days[i].innerHTML = dailyDays[i];
        }

        var daily_Highs = document.getElementsByClassName("daily__high");
        for (var i = 0; i < daily_Highs.length; i++) {
          daily_Highs[i].innerHTML = dailyHighs[i] + "&deg;";
        }
        var today_High = document.getElementById("today_high");
        today_high.innerHTML = dailyHighs[0] + "&deg;";

        var daily_Lows = document.getElementsByClassName("daily__low");
        for (var i = 0; i < daily_Lows.length; i++) {
          daily_Lows[i].innerHTML = dailyLows[i] + "&deg;";
        }

        var today_Low = document.getElementById("today_low");
        today_Low.innerHTML = dailyLows[0] + "&deg;";
        

        var todaySunrise = dailyData[0].sunriseTime;
        var todaySunrise_time = determineTime(todaySunrise);
        var today_sunrise= document.getElementById("today_sunrise");
        today_sunrise.innerHTML = todaySunrise_time;
        

        var todaySunset = dailyData[0].sunsetTime;
        var todaySunset_time = determineTime(todaySunset);
        var today_sunset= document.getElementById("today_sunset");
        today_sunset.innerHTML = todaySunset_time;

    //*****hourly section ***** 
        var hourlyData = rawData.hourly.data;

        var hourlyTimes = [];
        var hourlyTemps = [];

        for (var i = 1; i < 24; i++) {
          // set i to 1 to avoid getting current hour data, only want first 23 entries
          hourlyTimes.push(determineHour(hourlyData[i].time));
          hourlyTemps.push(Math.round(hourlyData[i].temperature));
        }

        var hourly_Times = document.getElementsByClassName("hourly__Time");
        for (var i = 0; i < hourly_Times.length; i++) {
          hourly_Times[i].innerHTML = hourlyTimes[i];
        }
        var hourly_Temps = document.getElementsByClassName("hourly__Temp");
        for (var i = 0; i < hourly_Temps.length; i++) {
          hourly_Temps[i].innerHTML = hourlyTemps[i] + "&deg;";
        }
        var now_Temp = document.getElementById("now_temp");
        now_Temp.innerHTML = Math.round(currently.temperature) + "&deg;";

      });
      
  getAPI.open("get", "api");
  getAPI.send();

});
