export type WeatherDetailsType = {
  city: string,
  interpretation: string,
  actualTemp: number,
  highTemp: number,
  lowTemp: number,
  lastUpdated: string,
  iconUrl: string
}

export const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export const DEFAULT_WEATHER_ICON_URL = "https://openweathermap.org/img/wn/01d@2x.png"

export const getWeatherIconUrl = (code: string)=> {
  return `https://openweathermap.org/img/wn/${code}@2x.png`
}