$(document).ready(function() {

    $('#search').click(function(){
        // 1. Get user input for city/zipcode
        var userInput = $('#location').val()


        // 2. Create the url for the city using geocoding api
        var URL = "https://api.openweathermap.org/data/2.5/weather?"
      
        // 2a. Check to see if input is a zip code or city name 
        if(isNaN(userInput)) {
            //if userInput is not a number, will look for the city nam
            URL = URL + 'q=' + userInput + '&appid=' + apiKey
            console.log(URL)
        } else {
            URL = URL + 'zip=' + userInput + '&appid=' + apiKey
            console.log(URL)
        }



        // 3. Return the correct weather data 
        //3a. // add click function & logic for AJAX request here. 
        $.ajax({
            url: URL,
            method: "GET",
            success: function(data){
                $('#weather-info').empty()
                $('#error-message').empty()
                $('footer').empty()
                $('#weather-image').empty()
                //3b. Also add header to state the city name
                var cityName = data['name']
                var countryName = data['sys']['country']
                $('#weather-info').append('<h2>Weather in ' + cityName + ', ' + countryName )
                
                //3c. temperature convert to fahrenheit
                var temperatureKelvin = data['main']['temp']
                var temperatureFahrenheit = parseInt((temperatureKelvin - 273.15) * 1.8 + 32)
                $('#weather-info').append("<p> Temperature: " + temperatureFahrenheit + '°F' + '</p>');
                $('#weather-image').append
                //3d. weather
                var weather = data['weather'][0]['main']
                $('#weather-info').append("<p> Weather: " + weather + '</p>')
                
                //3e. conditions and background image based off of result 
                var conditions = data['weather'][0]['description']
                console.log(conditions)
                $('#weather-info').append("<p> Conditions: " + conditions + '</p>')
                if(conditions == 'clear sky') {
                    $('html').css({'background-image': 'url(https://cdn.stocksnap.io/img-thumbs/960w/sunset-sea_PGYAOPFXVN.jpg)'})
                    $('footer').append('<a href="https://stocksnap.io/photo/sunset-sea-PGYAOPFXVN">Link to clear sky background image</a>')
                    $('#weather-image').append("<img src='https://openweathermap.org/img/wn/01d.png' width='150' height ='150'>")

                }  else if(conditions === 'few clouds' || conditions == 'scatterd clouds' || conditions == 'scattered clouds' || conditions == 'broken clouds' || conditions == 'overcast clouds') {
                    $('html').css({'background-image': 'url(https://cdn.stocksnap.io/img-thumbs/960w/rural-road_G1KCWV7HC8.jpg)'})
                    $('footer').append('<a href="https://stocksnap.io/photo/rural-road-G1KCWV7HC8">Link to clouds background image</a>') 
                    $('#weather-image').append("<img src='https://openweathermap.org/img/wn/02d.png' width='150' height ='150'>")

                }else if(conditions === 'shower rain' || conditions == 'rain'|| conditions == 'thunderstorm') {
                    $('html').css({'background-image': 'url(https://media.istockphoto.com/id/1367804543/photo/cloudy-sky-flashes-and-rain-cloudy-sky-flashes-and-rain.jpg?s=1024x1024&w=is&k=20&c=6s7z8ozC4SMaIQnnuHt-VGwi2-Pd6m2BSYRQDDu71QU=)'})
                    $('footer').append('<a href="https://www.istockphoto.com/photo/cloudy-sky-flashes-and-rain-cloudy-sky-flashes-and-rain-gm1367804543-437950600?irclickid=Ts22wPU%3AtxyKUwdxQpTTnVFfUkCROtzNxUxAxk0&irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Elevated+Logic%2C+LLC&clickid=Ts22wPU%3AtxyKUwdxQpTTnVFfUkCROtzNxUxAxk0&utm_term=stocksnap&utm_content=1852840&irpid=426523">Link to rain background image</a>')
                    $('#weather-image').append("<img src='https://openweathermap.org/img/wn/11d.png' width='150' height ='150'>")

                }else if(conditions == 'snow' || conditions == 'light snow') {
                    console.log('got in snow')
                    $('html').css({'background-image': 'url(https://media.istockphoto.com/id/1428401936/photo/beautifull-background-on-a-christmas-theme-with-snowdrifts-snowfall-and-a-blurred-background.jpg?s=1024x1024&w=is&k=20&c=7-RRarDzOcrRJgvmLM8Oee03BMPiLbV62OBglOPXLkM=)'})
                    $('footer').append('<a href="https://www.istockphoto.com/photo/beautifull-background-on-a-christmas-theme-with-snowdrifts-snowfall-and-a-blurred-gm1428401936-471901908?irclickid=Ts22wPU%3AtxyKUwdxQpTTnVFfUkCROtRZxUxAxk0&irgwc=1&cid=IS&utm_medium=affiliate&utm_source=Elevated+Logic%2C+LLC&clickid=Ts22wPU%3AtxyKUwdxQpTTnVFfUkCROtRZxUxAxk0&utm_term=stocksnap&utm_content=1852840&irpid=426523">Link to snow background image</a>')
                    $('#weather-image').append("<img src='https://openweathermap.org/img/wn/13d.png' width='150' height ='150'>")

                }else if(conditions == 'mist') {
                    $('html').css({'background-image': 'url(https://cdn.stocksnap.io/img-thumbs/960w/foggy-sunrise_QYXTT6KO88.jpg)'})
                    $('footer').append('<a href="https://stocksnap.io/photo/foggy-sunrise-QYXTT6KO88">Link to mist background image</a>')
                    $('#weather-image').append("<img src='https://openweathermap.org/img/wn/50d.png' width='150' height ='150' >")

                } else {
                    $('html').css({'background-color': 'black'})
                }

        
                
                //3f. humidity by percentage
                var humidity = data['main']['humidity']
                $('#weather-info').append("<p> Humidity: " + humidity + '%' + '</p>')

                //3g. wind speed convert meters/sec to miles/hour 
                var windSpeedMeters = data['wind']['speed']
                var windSpeedMiles = parseInt(windSpeedMeters * 2.2369)
                $('#weather-info').append("<p> Wind: " + windSpeedMiles + ' mph' + '</p>')
            },
            error: function(xhr){
                $('#error-message').empty()
                $('#weather-info').empty()
                $('html').css({'background-color': 'black'})

                var status = xhr.status;
                
                // Check if xhr.responseJSON exists and has the 'Error' field, otherwise, provide a generic error message.
                var errorMessage = (xhr.responseJSON && xhr.responseJSON.Error) 
                                    ? xhr.responseJSON.Error 
                                    : "An unknown error occurred.";
            
                $('#error-message').append("<p> Error: " + status + 
                ' (Not found)' +'</p>');

                
            }
        })
        
    })

    // do not forget to hid API key by following steps in README
});