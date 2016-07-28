window.addEventListener("load", function(){
  
  var getAPI = new XMLHttpRequest();

  getAPI.addEventListener("load", function(e){
        
      	
        


        //creates JSON object without decimals
        var cleansedData = JSON.parse(e.target.response, function(k,v) {
        	if (typeof v === 'number') {
        		return parseInt(v);
        	}
        	return v;
        });

        //creates JSON object with decimals
        var rawData = JSON.parse(e.target.response)


        // converts day names
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

        // completes currently data not involving floats or manipulation
        var currently = cleansedData.currently;

        var currently_today = document.getElementById("today");  
        var todayNumber = currently.time;
        var todayName = determineDay(todayNumber);
        currently_today.innerHTML = todayName;

        var currently_Summary = document.getElementById("summary");
        currently_Summary.innerHTML = currently.summary;

        var currently_Temperature = document.getElementById("temperature");
        currently_Temperature.innerHTML = currently.temperature;

        var currently_apparentTemperature = document.getElementById("apparentTemperature");
        currently_apparentTemperature.innerHTML = currently.apparentTemperature;

        var currently_Humidity = document.getElementById("humidity");
        currently_Humidity.innerHTML = currently.humidity;

        var currently_precipProbability = document.getElementById("precipProbability");
        currently_precipProbability.innerHTML = currently.precipProbability;

        var currently_windSpeed = document.getElementById("windSpeed");
        currently_windSpeed.innerHTML = currently.windSpeed;

        

        //need manipulation; use data from rawData parse
        var currently_visibility = document.getElementById("visibility");

        var currently_windBearing = document.getElementById("windBearing");
        // needs a formula

        var currently_pressure = document.getElementById("pressure");
        // needs a formula

        var currently_precipIntensity = document.getElementById("precipIntensity"); 
        // needs a formula


        //completes daily data
        var dailyData = cleansedData.daily.data;

        var daily_Summary = document.getElementById("daily_Summary");
        daily_Summary.innerHTML = "Today: " + cleansedData.daily.summary;


        var daily_Days = document.getElementsByClassName("daily__day");
        var daily_Highs = document.getElementsByClassName("daily__high");
        var daily_Lows = document.getElementsByClassName("daily__low");


        //completes hourly data
        var hourly = cleansedData.hourly;


        
        debugger;

      });
      
  getAPI.open("get", "api");
  getAPI.send();

});
