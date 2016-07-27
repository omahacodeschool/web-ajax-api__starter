window.addEventListener("load", function(){
	
      
      var check = new XMLHttpRequest();

      check.addEventListener("load", function(e){
      	var currently_Summary = document.getElementById("summary");
        var dailySummary = document.getElementById("dailySummary");
        var currently_Temperature = document.getElementById("temperature");
        var currently_apparentTemperature = document.getElementById("apparentTemperature");
        var currently_Humidity = document.getElementById("humidity");
        var currently_precipIntensity = document.getElementById("precipIntensity");
        var currently_precipProbability = document.getElementById("precipProbability");
        var currently_windSpeed = document.getElementById("windSpeed");
        var currently_windBearing = document.getElementById("windBearing");
        var currently_pressure = document.getElementById("pressure");
        var currently_visibility = document.getElementById("visibility");
        var currently_today = document.getElementById("today");

        

        var weatherData = JSON.parse(e.target.response, function(k,v) {
        	if (typeof v === 'number') {
        		return parseInt(v);
        	}
        	return v;
        });
        dailySummary.innerHTML = weatherData.daily.summary;
      	currently_Summary.innerHTML = weatherData.currently.summary;
      	currently_Temperature.innerHTML = weatherData.currently.temperature;
      	currently_apparentTemperature.innerHTML = weatherData.currently.apparentTemperature;
      	currently_Humidity.innerHTML = weatherData.currently.humidity;
      	currently_precipProbability.innerHTML = weatherData.currently.precipProbability;
      	currently_windSpeed.innerHTML = weatherData.currently.windSpeed;
      	currently_visibility.innerHTML = weatherData.currently.visibility;


      	
          var currently = weatherData.currently;
          var currentlyValue = weatherData.currently.value;
          var hourly = weatherData.hourly;
          var dailyData = weatherData.daily.data;
          debugger;
      });
      
      check.open("get", "api");
      check.send();

    });
