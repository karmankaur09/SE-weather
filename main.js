document.addEventListener('DOMContentLoaded', () => {
    //Get all necessary elements from the DOM
    const app = document.querySelector('.weather-app');
    const temp = document.querySelector('.temp');
    const dateOutput = document.querySelector('.date');
    const timeOutput = document.querySelector('.time');
    const conditionOutput = document.querySelector('.condition');
    const nameOutput = document.querySelector('.name');
    const icon = document.querySelector('.icon');
    const cloudOutput = document.querySelector('.cloud');
    const humidityOutput = document.querySelector('.humidity');
    const windOutput = document.querySelector('.wind');
    const form = document.getElementById('locationInput');
    const search = document.querySelector('.search');
    const btn = document.querySelector('.submit');
    const cities = document.querySelectorAll('.city');
  
    //Default city when the page Loads
    let cityInput = "Chandigarh";
  
    // Function that returns a day of the week (Monday, Tuesday, Friday...) from a date (12 03 2021)
    function dayOfWeek(day, month, year) {
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return weekdays[new Date(`${year}-${month}-${day}`).getDay()];
    }
  
    // Function that fetches and displays the data from the weather API
    function fetchWeatherData() {
      const apiKey = 'e19df1ddbd3a4dafa3a123613232007';
      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
          // You can console log the data to see what is available
          console.log(data);
  
          // Start by adding the temperature and weather condition to the page
          temp.innerHTML = data.current.temp_c + "&#176;C";
          conditionOutput.innerHTML = data.current.condition.text;
  
          // Get the date and time from the city and extract the day, month, year, and time into individual variables
          const date = data.location.localtime;
          const [year, month, day] = date.split(' ')[0].split('-');
          const time = date.split(' ')[1];
  
          // Reformat the date into something more appealing and add it to the page
          // Original format: 2021-10-09 17:53
          // New Format: 17:53 - Friday 9, October 2021
          dateOutput.innerHTML = `${time} - ${dayOfWeek(day, month, year)} ${parseInt(day)}, ${parseInt(month)}, ${parseInt(year)}`;
          timeOutput.innerHTML = time;
  
          // Add the name of the city into the page
          nameOutput.innerHTML = data.location.name;
  
          // Get the corresponding icon URL for the weather and extract a part of it
          const iconId = data.current.condition.icon.split('/').pop();
          // Reformat the icon URL and add it to the page
          icon.src = `./icons/${iconId}`;
  
          // Add the weather details to the page
          cloudOutput.innerHTML = data.current.cloud + "%";
          humidityOutput.innerHTML = data.current.humidity + "%";
          windOutput.innerHTML = data.current.wind_kph + " Km/h";
  
          // Set default time of day
          let timeOfDay = "day";
  
          // Get the unique id for each weather condition
          const code = data.current.condition.code;
  
          // Change to night if it's night time in the city
          if (!data.current.is_day) {
            timeOfDay = "night";
          }
  
          // Set the background image and button background color based on weather conditions
          if (code == 1000) {
            // Clear weather
            app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
            btn.style.background = "#eSba92";
            if (timeOfDay === "night") {
              btn.style.background = "#181e27";
            }
          } else if (code == 1003 || code == 1006 || code == 1009 || code == 1030 || code == 1069 || code == 1087 || code == 1135 || code == 1273 || code == 1276 || code == 1279 || code == 1282) {
            // Cloudy weather
            app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
            btn.style.background = "#fa6d1b";
            if (timeOfDay === "night") {
              btn.style.background = "#181e27";
            }
          } else if (code == 1063 || code == 1069 || code == 1072 || code == 1150 || code == 1153 || code == 1180 || code == 1183 || code == 1186 || code == 1189 || code == 1192 || code == 1195 || code == 1204 || code == 1207 || code == 1240 || code == 1243 || code == 1246 || code == 1249 || code == 1252) {
            // Rainy weather
            app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
            btn.style.background = "#647d75";
            if (timeOfDay === "night") {
              btn.style.background = "#325c80";
            }
          } else {
            // Snowy weather
            app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
            btn.style.background = "#4d72aa";
            if (timeOfDay === "night") {
              btn.style.background = "#1b1b1b";
            }
          }
  
          // Fade in the page once all is done
          app.style.opacity = "1";
        })
        .catch(() => {
          alert('City not found, please try again');
          app.style.opacity = "1";
        });
    }
  
    // Call the function on page Load
    fetchWeatherData();
    // Fade in the page
    app.style.opacity = "1";
  
    //Add click event to each city in the panel
    cities.forEach((city) => {
      city.addEventListener('click', (e) => {
        //Change from default city to the clicked one
        cityInput = e.target.innerHTML;
        /*Function that fetches and displays all the data from the Weather API
        (We will write it soon) */
        fetchWeatherData();
        //Fade out the app (simple animation)
        app.style.opacity = "0";
      });
    });
  
    //Add submit event to the form
    form.addEventListener('submit', (e) => {
      /*If the input field (search bar) is empty, throw an alert*/
      if (search.value.length === 0) {
        alert('Please type in a city name');
      } else {
        /*Change from default city to the one written in the input field*/
        cityInput = search.value;
        /*Function that fetches and displays alL the data from the Weather API
        (We will write it soon)*/
        fetchWeatherData();
        //Remove all text from the input field
        search.value = "";
        //Fade out the app (simple animation)
        app.style.opacity = "0";
      }
      //Prevent the default behavior of the form
      e.preventDefault();
    });
  });


  