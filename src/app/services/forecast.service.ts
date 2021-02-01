import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';

enum FORECAST_API_METHODS {
  CURRENT_HOUR = 'hourly/1hour'
}

const mockDays = `[
  {
    "DateTime": "2021-01-31T02:00:00+02:00",
    "EpochDateTime": 1612051200,
    "WeatherIcon": 22,
    "IconPhrase": "Snow",
    "HasPrecipitation": true,
    "PrecipitationType": "Snow",
    "PrecipitationIntensity": "Moderate",
    "IsDaylight": false,
    "Temperature": {
      "Value": -1.6,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 77,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=2&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=2&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T03:00:00+02:00",
    "EpochDateTime": 1612054800,
    "WeatherIcon": 22,
    "IconPhrase": "Snow",
    "HasPrecipitation": true,
    "PrecipitationType": "Snow",
    "PrecipitationIntensity": "Moderate",
    "IsDaylight": false,
    "Temperature": {
      "Value": -1.8,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 77,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=3&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=3&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T04:00:00+02:00",
    "EpochDateTime": 1612058400,
    "WeatherIcon": 22,
    "IconPhrase": "Snow",
    "HasPrecipitation": true,
    "PrecipitationType": "Snow",
    "PrecipitationIntensity": "Moderate",
    "IsDaylight": false,
    "Temperature": {
      "Value": -2.4,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 76,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=4&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=4&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T05:00:00+02:00",
    "EpochDateTime": 1612062000,
    "WeatherIcon": 22,
    "IconPhrase": "Snow",
    "HasPrecipitation": true,
    "PrecipitationType": "Snow",
    "PrecipitationIntensity": "Moderate",
    "IsDaylight": false,
    "Temperature": {
      "Value": -3.3,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 75,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=5&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=5&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T06:00:00+02:00",
    "EpochDateTime": 1612065600,
    "WeatherIcon": 22,
    "IconPhrase": "Snow",
    "HasPrecipitation": true,
    "PrecipitationType": "Snow",
    "PrecipitationIntensity": "Moderate",
    "IsDaylight": false,
    "Temperature": {
      "Value": -3.2,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 75,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=6&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=6&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T07:00:00+02:00",
    "EpochDateTime": 1612069200,
    "WeatherIcon": 7,
    "IconPhrase": "Cloudy",
    "HasPrecipitation": false,
    "IsDaylight": false,
    "Temperature": {
      "Value": -3.7,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 25,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=7&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=7&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T08:00:00+02:00",
    "EpochDateTime": 1612072800,
    "WeatherIcon": 7,
    "IconPhrase": "Cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -4,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 20,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=8&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=8&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T09:00:00+02:00",
    "EpochDateTime": 1612076400,
    "WeatherIcon": 7,
    "IconPhrase": "Cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -3.6,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 20,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=9&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=9&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T10:00:00+02:00",
    "EpochDateTime": 1612080000,
    "WeatherIcon": 6,
    "IconPhrase": "Mostly cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -3.3,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 20,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=10&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=10&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T11:00:00+02:00",
    "EpochDateTime": 1612083600,
    "WeatherIcon": 6,
    "IconPhrase": "Mostly cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -2.6,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 20,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=11&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=11&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T12:00:00+02:00",
    "EpochDateTime": 1612087200,
    "WeatherIcon": 6,
    "IconPhrase": "Mostly cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -1.9,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 16,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=12&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=12&unit=c&lang=en-us"
  },
  {
    "DateTime": "2021-01-31T13:00:00+02:00",
    "EpochDateTime": 1612090800,
    "WeatherIcon": 7,
    "IconPhrase": "Cloudy",
    "HasPrecipitation": false,
    "IsDaylight": true,
    "Temperature": {
      "Value": -1.5,
      "Unit": "C",
      "UnitType": 17
    },
    "PrecipitationProbability": 7,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=13&unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/hourly-weather-forecast/324505?day=1&hbhhour=13&unit=c&lang=en-us"
  }
]`;

const mockMonths = `{
  "Headline": {
    "EffectiveDate": "2021-01-30T07:00:00+02:00",
    "EffectiveEpochDate": 1611982800,
    "Severity": 2,
    "Text": "Snow continuing through late Saturday night with a storm total of 10-15 cm",
    "Category": "snow",
    "EndDate": "2021-01-31T07:00:00+02:00",
    "EndEpochDate": 1612069200,
    "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/extended-weather-forecast/324505?unit=c&lang=en-us",
    "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?unit=c&lang=en-us"
  },
  "DailyForecasts": [
    {
      "Date": "2021-01-30T07:00:00+02:00",
      "EpochDate": 1611982800,
      "Temperature": {
        "Minimum": {
          "Value": -4,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": -2.8,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 22,
        "IconPhrase": "Snow",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Moderate"
      },
      "Night": {
        "Icon": 22,
        "IconPhrase": "Snow",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Moderate"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?unit=c&lang=en-us"
    },
    {
      "Date": "2021-01-31T07:00:00+02:00",
      "EpochDate": 1612069200,
      "Temperature": {
        "Minimum": {
          "Value": -5.7,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": -1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 6,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 22,
        "IconPhrase": "Snow",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Moderate"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=1&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=1&unit=c&lang=en-us"
    },
    {
      "Date": "2021-02-01T07:00:00+02:00",
      "EpochDate": 1612155600,
      "Temperature": {
        "Minimum": {
          "Value": -9.5,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": -2.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 22,
        "IconPhrase": "Snow",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Moderate"
      },
      "Night": {
        "Icon": 43,
        "IconPhrase": "Mostly cloudy w/ flurries",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Light"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=2&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=2&unit=c&lang=en-us"
    },
    {
      "Date": "2021-02-02T07:00:00+02:00",
      "EpochDate": 1612242000,
      "Temperature": {
        "Minimum": {
          "Value": -4.8,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": -3.2,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 6,
        "IconPhrase": "Mostly cloudy",
        "HasPrecipitation": false
      },
      "Night": {
        "Icon": 7,
        "IconPhrase": "Cloudy",
        "HasPrecipitation": false
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=3&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=3&unit=c&lang=en-us"
    },
    {
      "Date": "2021-02-03T07:00:00+02:00",
      "EpochDate": 1612328400,
      "Temperature": {
        "Minimum": {
          "Value": 1,
          "Unit": "C",
          "UnitType": 17
        },
        "Maximum": {
          "Value": 3.1,
          "Unit": "C",
          "UnitType": 17
        }
      },
      "Day": {
        "Icon": 18,
        "IconPhrase": "Rain",
        "HasPrecipitation": true,
        "PrecipitationType": "Rain",
        "PrecipitationIntensity": "Light"
      },
      "Night": {
        "Icon": 19,
        "IconPhrase": "Flurries",
        "HasPrecipitation": true,
        "PrecipitationType": "Snow",
        "PrecipitationIntensity": "Light"
      },
      "Sources": [
        "AccuWeather"
      ],
      "MobileLink": "http://m.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=4&unit=c&lang=en-us",
      "Link": "http://www.accuweather.com/en/ua/kyiv/324505/daily-weather-forecast/324505?day=4&unit=c&lang=en-us"
    }
  ]
}`;

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private static readonly FORECASTS_URL = `${environment.API_URL}/forecasts/${environment.API_VERSION}`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public getTimeForecast(cityId: string): any {
    return of(JSON.parse(mockDays));

    return this.httpClient.get(`${ForecastService.FORECASTS_URL}/${FORECAST_API_METHODS.CURRENT_HOUR}/${cityId}`, {
      params: {
        metric: 'true'
      }
    });
  }

  getDaysForecast(cityId: string): any {
    return of(JSON.parse(mockMonths));

    return this.httpClient.get(`${ForecastService.FORECASTS_URL}/${FORECAST_API_METHODS.CURRENT_HOUR}/${cityId}`,{
      params: {
        metric: 'true'
      }
    });
  }
}
