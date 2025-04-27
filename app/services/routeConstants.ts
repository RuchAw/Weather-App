import { name, version } from "../../package.json"
export const APP_VERSION = version;
export const APP_NAME = name

const WEATHER_API_PREFIX = "data/2.5/weather?q="
const FORECAST_API_PREFIX = "data/2.5/forecast?q="

const API_SUFFIX = "&units=metric&appid="

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY

export const weatherApiQueryConstructor = (city: string)=> {
    return `${WEATHER_API_PREFIX}${city}${API_SUFFIX}${API_KEY}`
}

export const forecastApiQueryConstructor = (city: string, count = 5)=> {
    // We will limit the forecast only for 5 results (3 hours) else the 40 results is too slow
    return `${FORECAST_API_PREFIX}${city}&cnt=${count}${API_SUFFIX}${API_KEY}`
}