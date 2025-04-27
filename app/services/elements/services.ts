import {GeneralApiProblem, getGeneralApiProblem} from "../api/apiProblem"
import {ApiResponse} from "apisauce"
import {api} from "../api"
import {
    forecastApiQueryConstructor,
    weatherApiQueryConstructor,
} from "../routeConstants"
import {reportCrash} from "../../utils/crashReporting"
import {
    WeatherData, WeatherDataError, WeatherForecast
} from "./services.types"

export const getWeather = async (city: string): Promise<WeatherData | WeatherDataError | GeneralApiProblem | null> => {
    try {
        const uri = weatherApiQueryConstructor(city)
        const response: ApiResponse<WeatherData | WeatherDataError> = await api.apisauce.get(
            uri
        )

        if (!response) return null

        if (response.status === 401) {
            return response.data as WeatherDataError
        }

        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) {
                reportCrash(problem)
                return null
            }
            return null
        }

        if (response.data && "main" in response.data) {
            return response.data as WeatherData
        }

        return null
    } catch (e) {
        if (__DEV__) {
            // console.tron.error(`Bad data: ${e.message}\n`, e.stack)
            console.log("error", e)
        }
        return null
    }
}

export const getForecast = async (city: string): Promise<WeatherForecast | WeatherDataError | GeneralApiProblem | null> => {
    try {
        const uri = forecastApiQueryConstructor(city)
        const response: ApiResponse<WeatherForecast | WeatherDataError> = await api.apisauce.get(
            uri
        )

        if (!response) return null

        if (response.status === 401) {
            return response.data as WeatherDataError
        }

        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) {
                reportCrash(problem)
                return null
            }
            return null
        }

        if (response.data && "list" in response.data) {
            return response.data as WeatherForecast
        }

        return null
    } catch (e) {
        if (__DEV__) {
            // console.tron.error(`Bad data: ${e.message}\n`, e.stack)
            console.log("error", e)
        }
        return null
    }
}
