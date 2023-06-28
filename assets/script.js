let cityInput = document.querySelector("#city");
let cityHistory = document.querySelector(".cityHistory");
let searchBtn = document.querySelector(".searchBtn");
let forecastParentEl = document.querySelector("#forecast-container");
let forecastInfoEl = document.getElementsByClassName(".forecastInfo");
let cityNameInfoEl = document.querySelector(".city-name");
let cityIconEl = document.querySelector(".city-icon");
let cityTempInfoEl = document.querySelector(".city-temp");
let cityWindInfoEl = document.querySelector(".city-wind");
let cityHumidityInfoEl = document.querySelector(".city-humidity");

//sets the date for the current day
let currentDate = dayjs().format("MMMM DD YYYY");
$("#date").text(currentDate);

//current day weather URL
let requestWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=440667c5a7455ac351dea90ab6bca5a8&q=";

//forecast weather URL
let requestForecastUrl =
  "https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=440667c5a7455ac351dea90ab6bca5a8&q=";

//this function is for the current city weather info
function searchCity(city) {
  //takes the user search parameter and stores it in a const
  const userCityInput = city;
  //this empties the search form
  cityInput.value = "";
  //this adds the const and adds it into an array or creates a new one
  const cityPast = JSON.parse(localStorage.getItem("city")) || [];
  //this makes sure the user doesn't input nothing
  if (userCityInput === "") {
    alert("Must input a valid city name.");
    return;
  }
  //this if state prevents copies of the same city from being added into the array
  if (cityPast.indexOf(userCityInput) === -1) {
    //if it passes the above if statement, it adds it in
    cityPast.push(userCityInput);
    //creates a button using the localstorage item, gives them a class, and labels the button with the value in localstorage
    let cityHistoryBtn = document.createElement("button");
    cityHistoryBtn.setAttribute("class", "searchBtnClone");
    cityHistoryBtn.innerHTML = userCityInput;
    document.querySelector(".city-search-container").append(cityHistoryBtn);
  }
  //this puts the city input into local storage
  localStorage.setItem("city", JSON.stringify(cityPast));

  //this takes the city that was entered and gives the current weather info for that day
  fetch(requestWeatherUrl + userCityInput)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //technically don't need the below commented out line, but it was very important for the development process so left it there
      //console.log(data);
      //the next 4 lines input the data into the correct spots
      cityNameInfoEl.innerHTML = data.name;
      cityTempInfoEl.innerHTML = "Temp: " + data.main.temp + " °F";
      cityWindInfoEl.innerHTML = "Wind: " + data.wind.speed + " MPH";
      cityHumidityInfoEl.innerHTML = "Humidity: " + data.main.humidity + " %";
      //this function performs the forecast function with the city name
      fiveForecast(data.name);
      //this giant if/else if statement gives us the forecasted conditions
      cityIconEl.innerHTML = "Weather Condition: ";
      if (data.weather[0].main === "Clear") {
        console.log("weather is clear");
        let cityIconChild = document.createElement("img");
        cityIconChild.src = "https://openweathermap.org/img/wn/01d@2x.png";

        cityIconEl.append(cityIconChild);
      } else if (data.weather[0].main === "Clouds") {
        console.log("weather is cloudy");
        let cityIconChild = document.createElement("img");
        cityIconChild.src = "https://openweathermap.org/img/wn/03d@2x.png";

        cityIconEl.append(cityIconChild);
      } else if (data.weather[0].main === "Rain") {
        console.log("weather is rain");
        let cityIconChild = document.createElement("img");
        cityIconChild.src = "https://openweathermap.org/img/wn/10d@2x.png";

        cityIconEl.append(cityIconChild);
      } else if (data.weather[0].main === "Thunderstorm") {
        console.log("weather is thunderstorm");
        let cityIconChild = document.createElement("img");
        cityIconChild.src = "https://openweathermap.org/img/wn/11d@2x.png";

        cityIconEl.append(cityIconChild);
      } else if (data.weather[0].main === "Snow") {
        console.log("weather is snow");
        let cityIconChild = document.createElement("img");
        cityIconChild.src = "https://openweathermap.org/img/wn/13d@2x.png";
        cityIconEl.append(cityIconChild);
      }
    });
}
//thsi is the forecast function
function fiveForecast(city) {
  fetch(requestForecastUrl + city)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //again don't technically need this but it'll be useful if i ever go back to this project
      //console.log(data);
      //this for loops starts at index 6 which is the next day, and grabs/inputs data in the correct spot
      //this for loops does this through next 5 days for the forecast info
      for (let index = 6; index < data.list.length; index += 8) {
        let forecastDateParentEl = document.querySelector(
          "#forecastDate" + index
        );
        let forecastIcon = document.querySelector("#icon" + index);
        let forecastTemp = document.querySelector("#temp" + index);
        let forecastWind = document.querySelector("#wind" + index);
        let forecastHumidity = document.querySelector("#humidity" + index);
        let forecastDate = data.list[index].dt_txt.split(" ").shift();
        let weatherEl = data.list[index];

        forecastTemp.innerHTML = "Temp: " + weatherEl.main.temp + " °F";
        forecastWind.innerHTML = "Wind: " + weatherEl.wind.speed + " MPH";
        forecastHumidity.innerHTML =
          "Humidity: " + weatherEl.main.humidity + " %";
        forecastDateParentEl.innerHTML = forecastDate;
        //this giant if/else if statement does the same as the above giant if/else if statement, just puts in weather conditions
        if (weatherEl.weather[0].main === "Clear") {
          forecastIcon.innerHTML = "";
          let forecastIconChild = document.createElement("img");
          forecastIconChild.src = "https://openweathermap.org/img/wn/01d.png";
          forecastIcon.append(forecastIconChild);
        } else if (weatherEl.weather[0].main === "Clouds") {
          forecastIcon.innerHTML = "";
          let forecastIconChild = document.createElement("img");
          forecastIconChild.src = "https://openweathermap.org/img/wn/03d.png";
          forecastIcon.append(forecastIconChild);
        } else if (weatherEl.weather[0].main === "Rain") {
          let forecastIconChild = document.createElement("img");
          forecastIcon.innerHTML = "";
          forecastIconChild.src = "https://openweathermap.org/img/wn/10d.png";
          forecastIcon.append(forecastIconChild);
        } else if (weatherEl.weather[0].main === "Snow") {
          forecastIcon.innerHTML = "";
          let forecastIconChild = document.createElement("img");
          forecastIconChild.src = "https://openweathermap.org/img/wn/13d.png";
          forecastIcon.append(forecastIconChild);
        } else if (weatherEl.weather[0].main === "Thunderstorm") {
          forecastIcon.innerHTML = "";
          let forecastIconChild = document.createElement("img");
          forecastIconChild.src = "https://openweathermap.org/img/wn/11d.png";
          forecastIcon.append(forecastIconChild);
        }
      }
    });
}

//this makes a new button based on the users PAST inputs for city
function generateBtn() {
  let cityHistory = JSON.parse(localStorage.getItem("city")) || [];
  //this for each loop goes through each element in the localstorage item and makes a button with a class
  cityHistory.forEach((element) => {
    let cityHistoryBtn = document.createElement("button");
    cityHistoryBtn.setAttribute("class", "searchBtnClone");
    cityHistoryBtn.onclick = searchCityClone;
    cityHistoryBtn.textContent = element;
    document.querySelector(".city-search-container").append(cityHistoryBtn);
  });
}

//we need a normal function for the search field for the city info
function searchCityNormal() {
  let city = cityInput.value;
  searchCity(city);
}
//and we need a function for the clone buttons to search for the city that's in their name
function searchCityClone() {
  let city = this.textContent;
  searchCity(city);
}
//we call this function to generate the past city buttons when the page loads
generateBtn();
//and this just adds the function to the main search button
searchBtn.addEventListener("click", searchCityNormal);
