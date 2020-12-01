import localizedData from '../localization.json';

export class APIHelper {
  static async fetchWeatherData(lat, lng, unit, lang = 'en') {
    let normalizedJson = {};

    await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=1428e1e975ee301a543851cf250a623f&units=${unit}&lang=${lang}`)
      .then(data => data.json())
      .then(json => {
        const currentWeather = json.list[0];

        normalizedJson = {
          sunrise: json.city.sunrise * 1000,
          sunset: json.city.sunset * 1000,
          city: json.city.name,
          today: [],
          week: {},
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
          icon: currentWeather.weather[0].icon,
        };

        normalizedJson.week = APIHelper._reduceWeatherData(json.list, lang);
      })
      .catch(error => {
        throw new Error(error.message);
      });

    return normalizedJson;
  }

  static fetchIPData() {
    return new Promise((resolve) => {
      fetch('https://ipapi.co/json/')
        .then(data => data.json())
        .then(json => {
          resolve({
            latitude: json.latitude,
            longitude: json.longitude,
          });
        })
        .catch(error => resolve(null));
    })
  }

  static _reduceWeatherData(weeklyData, lang) {
    const resultData = {};

    weeklyData.forEach(item => {
      let temp = parseFloat(item.main.temp.toFixed(1));
      let date = new Date(item.dt * 1000);
      let day = localizedData.days.shortName[lang][date.getDay()];

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
          title: item.weather[0].description,
        };
      }
    });

    return resultData;
  }
}
