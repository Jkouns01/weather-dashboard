// my api key from open weather map
const apiKey = "3c7499a3342523b606ee230e450c28e8";

for (var i = 0; i < localStorage.length; i++) {
    let city = localStorage.getItem(i);
    var cityTitle = $(".list-group").addClass("list-group-item");

    cityTitle.append("<li>" + city + "</li>");
}

var searchBtn = $(".searchButton");
console.log(searchBtn,"clicked")
// gets search answer info from openweathermap site
var countKeys = 0;
searchBtn.click(function () {

    var searchAnswer = $(".searchInput").val();

    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchAnswer + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchAnswer + "&Appid=" + apiKey + "&units=imperial";

// uses ajax for local storage instead of fetch
    if (searchAnswer == "") {
        console.log(searchAnswer);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
            
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");
            
            var local = localStorage.setItem(countKeys, response.name);
            countKeys = countKeys + 1;

            
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            
            currentCard.append(currentName);

            
            var timeStamp = new Date(response.dt * 1000);
            currentName.append(response.name);
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);
            
            var newTemp = currentName.append("<p>");
            
            currentName.append(newTemp);
            newTemp.append("<p>" + "Temperature: " + response.main.temp + " °F" + "</p>");
                       
            newTemp.append("<p>" + "Wind Speed: " + response.wind.speed + " Mph" + "</p>");
            
            newTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");


            newTemp.append("<p> Thank You For Using My App! </p>");å

            
            var urlLink = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            
            $.ajax({
                url: urlLink,
                method: "GET"
            }).then(function (response) {

                var currentLink = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentLink.addClass("UV");
                currentTemp.append(currentLink);
                
            });

        }) 
    }

    function toggleText() {
        var text = document.getElementById("foot");
        if (text.style.display === "none") {
          text.style.display = "block";
        } else {
          text.style.display = "none";
        }
      }
});
// end of script code

//Jacob Kouns final edit Febuary 3rd 2023