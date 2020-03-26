import { getDayName } from ".";

export async function fetchWeatherData(lat, lng, unit) {
    let normalizedJson = {};

    await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=1428e1e975ee301a543851cf250a623f&units=${unit}`)
        .then(data => data.json())
        .then(resp => {
            const currentWeather = resp.list[0];

            normalizedJson = {
                sunrise: resp.city.sunrise * 1000,
                sunset: resp.city.sunset * 1000,
                city: resp.city.name,
                list: [],
                today: [],
                week: {}
            };

            normalizedJson.today = {
                dt: currentWeather.dt * 1000,
                clouds: currentWeather.clouds.all,
                temp: currentWeather.main.temp.toFixed(1),
                feelsLike: currentWeather.main.feels_like.toFixed(1),
                humidity: currentWeather.main.humidity,
                description: currentWeather.weather[0].description,
                title: currentWeather.weather[0].main,
                wind: currentWeather.wind.speed.toFixed(1),
                icon: currentWeather.weather[0].icon
            };

            console.log(resp.list[0].weather)

            normalizedJson.week = reduceWeatherData(resp.list);



        })
        .catch((error) => {
            throw new Error(error.message)
        })

    return normalizedJson
}

function reduceWeatherData (weeklyData) {
    const resultData = {};

    
    weeklyData.forEach(item => {
        let temp = parseFloat(item.main.temp.toFixed(1));
        let date = new Date((item.dt * 1000));
        day = getDayName(date.getDay());

        if (resultData[day]) {
            if (temp < resultData[day].minTemp) {
                resultData[day].minTemp = temp;
            } else if (temp > resultData[day].maxTemp) {
                resultData[day].maxTemp = temp;
            }
        } else {
            resultData[day] = {
                day: day,
                minTemp: temp,
                maxTemp: temp,
                icon: item.weather[0].icon,
                title: item.weather[0].description
            }
        }
    })

    return resultData;
}