// Set option value 'city' to input value'citysearch'
function setCity() {
	var cityValue = document.getElementById("city").value;
	var inputValueCity = document.getElementById("citysearch").value = cityValue;
}

function loadCityData() {

	var inputValueCity = document.getElementById("citysearch").value; // get value of 'citysearch'	
	
	const cityUrl = new URL("http://api.openweathermap.org/data/2.5/weather");
	
	// Set specific search parameters after cityUrl  
	cityUrl.searchParams.set("q", inputValueCity); // Set city parameter 'q' same as the input value 'citysearch'
	cityUrl.searchParams.set("APPID", "my API key"); // ADD a specific API key from Openweather to 'my API key'
	cityUrl.searchParams.set("units", "metric"); // Set units to metric system
	
	console.log(cityUrl);// show URL object in console
	console.log(cityUrl.toString());// show the url link in console
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", cityUrl, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			jsonObj = JSON.parse(xmlhttp.responseText);

			console.log(jsonObj);
			console.log("The weather of the city of " + jsonObj.name);
			// Call for a function which will parse the data to a table
			printJSONTable(jsonObj);
		}
    }
}

function loadWeatherData() { // get weather data of Copenhagen by clicking 'Get data' button
	
	var xmlhttp = new XMLHttpRequest();
	//get a specific API key from Openweather and replace it to "my API key"
	var url = "http://api.openweathermap.org/data/2.5/weather?q=Copenhagen&APPID="my API key"&units=metric"
	xmlhttp.open("GET", url, true);
	xmlhttp.send();

	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		
			jsonObj = JSON.parse(xmlhttp.responseText);

			console.log(jsonObj);
			console.log("The weather of " + jsonObj.name);
			// Call for a function which will parse the data to a table
			printJSONTable(jsonObj);
		}
	}
}

function printJSONTable() {
	// JSON data is stored in data variable
	var data = jsonObj;
	var iconCode = data.weather[0].icon;// Get correct JSON icon of current weather condition
	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
	
	// Create a loop, which will run through the JSON data array. All the data will be collected to out -variable
	var out = "<table>";
	
	// for each loop round, we will create a new table for <tr> -tag and append (+=) the data to existing out -variable
	//for (var i = 1; i < data.length; i++) {

		out += 'City name | Temperature(&#8451;) | Clouds | Weather description | Weather icon';
		// For each cell, we will output data fields from JSON
		out += '<td>' + data.name + '</td>';
		out += '<td>' + data.main.temp + '</td>';
		out += '<td>' + data.clouds.all + '</td>';
		out += '<td>' + data.main.humidity + '</td>';
		out += '<td>' + data.weather[0].description + '</td>';
		out += '<td><img src="'+ iconUrl +'"></td>';
		out += '</tr>';
	
	// After all the data has been set, we will output closing tag for the table
	out += "</table>";
	// Place the newly created table in tabledata-div
	document.getElementById("weatherdata").innerHTML = out;
}

// Trigger a button click on pressing Enter

var input = document.getElementById("citysearch");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
	// Cancel the default action, if needed
	event.preventDefault();
	// Trigger the button element with a click
	document.getElementById("search").click();
  }
});