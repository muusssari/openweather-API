// Set option value 'city' to input value'citysearch'
function setCity() {
	const cityValue = document.getElementById("city").value;
	document.getElementById("citysearch").value = cityValue;
}
function loadCityData() {

	const inputValueCity = document.getElementById("citysearch").value; // get value of 'citysearch'	
	const cityUrl = new URL("http://api.openweathermap.org/data/2.5/weather");
	//tän alemman säädön voisi laittaa suoraan urliin ^
	//koska xmlhttp.open ottaa stringin, eli sen ei pitäisi tarvita luoda URL objectia
	
	// Set specific search parameters after cityUrl  
	cityUrl.searchParams.set("q", inputValueCity); // Set city parameter 'q' same as the input value 'citysearch'
	cityUrl.searchParams.set("APPID", "my API key"); // ADD a specific API key from Openweather to 'my API key'
	cityUrl.searchParams.set("units", "metric"); // Set units to metric system

	console.log(cityUrl);// show URL object in console
	console.log(cityUrl.toString());// show the url link in console
	
	getXmlhttpData(cityUrl);
}

function loadWeatherData() { // get weather data of Copenhagen by clicking 'Get data' button
	//get a specific API key from Openweather and replace it to "my API key"
	const url = "http://api.openweathermap.org/data/2.5/weather?q=Copenhagen&APPID="my API key"&units=metric";
	getXmlhttpData(url);
}

function getXmlhttpData(url) {
	const xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, true);
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

function printJSONTable(data) {

	const iconUrl = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
	// Create a loop, which will run through the JSON data array. All the data will be collected to out -variable   
	//Loop object??  onks tulossa samaan aikaan useampi objecti tai pitääks sieltä ettii ja kattoo onks sitä osiota siellä?

	//table template on parempi käyttää kun tekee html elementtei   ` `
	const templateForData = `<table>
		City name | Temperature(&#8451;) | Clouds | Weather description | Weather icon
			<td> ${data.name} </td>
			<td> ${data.main.temp} </td>
			<td> ${data.clouds.all}</td>
			<td> ${data.main.humidity}</td>
			<td> ${data.weather[0].description}</td>
			<td><img src="${iconUrl}"></td>
			</tr>
		</table>`
	// Place the newly created table in tabledata-div
	document.getElementById("weatherdata").innerHTML = templateForData;
}

// Trigger a button click on pressing Enter

const input = document.getElementById("citysearch");
// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		document.getElementById("search").click();
  }
});