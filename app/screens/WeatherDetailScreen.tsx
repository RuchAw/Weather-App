import {FC, useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {ActivityIndicator, View, ViewStyle} from "react-native"
import {AppStackScreenProps} from "../navigators"
import Drawer from "../components/renders/drawer/Drawer"
import {colors, spacing} from "../theme"
import {getForecast, WeatherForecast} from "../services/elements";
import {showErrorToast} from "../utils/toast/toast";
import TodaysForecast from "../components/renders/TodaysForecast";
import CurrentWeatherTopInfo from "../components/renders/CurrentWeatherTopInfo";
import {getWeatherIconUrl} from "../utils/helpers/weatherHelpers";

const background = require("../../assets/images/forecast_background_image.jpg")

interface WeatherDetailScreenProps extends AppStackScreenProps<"WeatherDetail"> {
}

export interface CurrentWeatherData {
    city: string;
    temp: number;
    tempMin: number;
    tempMax: number;
    description: string;
    iconUrl: string;
}

export interface ForecastDay {
    day: string;
    iconUrl: string;
    tempMin: number;
    tempMax: number;
}

export interface TodayForecast {
    time: string;
    iconUrl: string;
    temp: number;
}

export const WeatherDetailScreen: FC<WeatherDetailScreenProps> = observer(function WeatherDetailScreen({route}) {
    const city = route?.params?.city

    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null)
    const [todayForecasts, setTodayForecasts] = useState<TodayForecast[]>([])
    const [loading, setLoading] = useState(false)


    /**
     * Set the data for upcoming hours
     * @param data
     */
    const setTodaysForecast = (data: WeatherForecast) => {
        const todayForecastList: TodayForecast[] = []

        for (let i = 0; i < 5; i++) {
            const forecast = data.list[i]
            // Get the time
            const timeStr = forecast.dt_txt.split(' ')[1]
            todayForecastList.push({
                // Get the time on format "hh:mm"
                time: timeStr.substring(0, 5),
                iconUrl: getWeatherIconUrl(forecast.weather[0].icon),
                temp: forecast.main.temp
            })
        }

        setTodayForecasts(todayForecastList)
    }

    const handleForecastData = (data: WeatherForecast) => {
        const city = data.city.name

        const actualDayData = data.list[0]
        const actualDayMainData = actualDayData.main
        const actualDayTemp = actualDayMainData.temp
        const actualDayTempMin = actualDayMainData.temp_min
        const actualDayTempMax = actualDayMainData.temp_max
        const actualDayImpression = actualDayData.weather[0].description
        const icon = actualDayData.weather[0].icon
        const iconUrl = getWeatherIconUrl(icon)

        setCurrentWeather({
            city,
            temp: actualDayTemp,
            tempMin: actualDayTempMin,
            tempMax: actualDayTempMax,
            description: actualDayImpression,
            iconUrl
        })

        setTodaysForecast(data)
    }

    const loadData = async () => {
        if (!city) return
        try {
            setLoading(true)
            const resp = await getForecast(city)
            if (!resp) return showErrorToast("An error has occurred while fetching data")

            if ("list" in resp) {
                handleForecastData(resp)
            }
        } catch (error) {
            console.log("Error", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, []);

    // if (loading) return <ActivityIndicator color={colors.weatherAppPalette.secondaryFoundersarmColor} size="large"/>

    return (
        <Drawer backSlug="common.back" backgroundImage={background}>
            <View style={$root}>
                {(!currentWeather || loading) ?
                    <ActivityIndicator
                        color={colors.weatherAppPalette.secondaryFoundersarmColor}
                        size="large"
                        style={$activityIndicatorStyle}
                    />
                    :
                    (
                        <View>
                            <CurrentWeatherTopInfo currentWeather={currentWeather} containerStyle={$topInfo}/>
                            <TodaysForecast todayForecasts={todayForecasts} containerStyle={$todayForecastStyle}/>
                        </View>
                    )}
            </View>
        </Drawer>
    )
})

const $root: ViewStyle = {
    marginHorizontal: spacing.df
}

const $topInfo: ViewStyle = {
    marginTop: spacing.xl
}

const $todayForecastStyle: ViewStyle = {
    marginTop: spacing.xxl
}

const $activityIndicatorStyle: ViewStyle = {
    marginTop: spacing.xxl
}