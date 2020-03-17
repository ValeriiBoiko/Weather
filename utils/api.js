export async function fetchWeatherData(lat, lng, unit) {
    let normalizedJson = {};

    await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=1428e1e975ee301a543851cf250a623f&units=${unit}`)
        .then(data => data.json())
        .then(json => {
            normalizedJson = {
                sunrise: json.city.sunrise,
                sunset: json.city.sunset,
                city: json.city.name,
                list: []
            };

            
            normalizedJson.list = json.list.map((forecast) => {
                return {
                    dt: forecast.dt,
                    clouds: forecast.clouds.all,
                    temp: forecast.main.temp,
                    feelsLike: forecast.main.feels_like,
                    humidity: forecast.main.humidity,
                    description: forecast.weather[0].description,
                    title: forecast.weather[0].main,
                    wind: forecast.wind.speed,
                    icon: forecast.weather[0].icon
                };
            })
        })
        .catch((error) => {
            throw new Error(error.message)
        })

    return normalizedJson
}