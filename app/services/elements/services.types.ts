interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Clouds {
  all: number;
}

interface SystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface WeatherData {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: SystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherDataError {
  cod: number;
  message: string;
}

interface ForecastMain extends MainWeather {
  temp_kf: number;
}

interface ForecastWind extends Wind {
  gust: number;
}

interface ForecastSys {
  pod: string;
}

export interface ForecastListItem {
  dt: number;
  main: ForecastMain;
  weather: Weather[];
  clouds: Clouds;
  wind: ForecastWind;
  visibility: number;
  pop: number;
  sys: ForecastSys;
  dt_txt: string;
}

export interface ForecastCity {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface WeatherForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastListItem[];
  city: ForecastCity;
}
