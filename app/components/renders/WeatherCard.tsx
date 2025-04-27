import {
    ActivityIndicator,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle
} from "react-native";
import {observer} from "mobx-react-lite";
import {colors, spacing} from "../../theme";
import {componentSize} from "../../theme/componentsSize";
import {BaseAutoImage, BaseIcon, BaseText} from "../baseComponents";
import {useEffect, useState} from "react";
import {showErrorToast} from "../../utils/toast/toast";
import {getWeather} from "../../services/elements";
import {
    DEFAULT_WEATHER_ICON_URL,
    getCurrentTime,
    getWeatherIconUrl,
    WeatherDetailsType
} from "../../utils/helpers/weatherHelpers";

export interface WeatherCardProps extends Pick<TouchableOpacityProps, "onPress"> {
    /**
     * For extra padding margin
     */
    containerStyle?: StyleProp<ViewStyle>
    /**
     * City name
     */
    city: string
}

const WeatherCard = observer(function WeatherCard(props: WeatherCardProps) {

    const {
        containerStyle: containerStyleOverride,
        city = "Marrakesh",
        onPress
    } = props

    const [loading, setLoading] = useState<boolean>(false)
    const [weatherDetails, setWeatherDetails] = useState<WeatherDetailsType>()

    const loadWeatherData = async () => {
        try {
            setLoading(true)
            const resp = await getWeather(city)
            if (!resp) return
            if ("message" in resp) return showErrorToast("Error getting data" + resp.message)
            const main = resp.main
            const actualTemp = main.temp
            const cityName = resp.name
            const highTemp = main.temp_max
            const lowTemp = main.temp_min
            const weatherMainIconAndInterpretation = resp.weather[0]
            const interpretation = weatherMainIconAndInterpretation.main
            const iconUrl = getWeatherIconUrl(weatherMainIconAndInterpretation.icon)
            const lastUpdated = getCurrentTime()
            const weatherDetails: WeatherDetailsType = {
                actualTemp,
                city: cityName,
                highTemp,
                interpretation,
                lastUpdated,
                lowTemp,
                iconUrl
            }
            setWeatherDetails(weatherDetails)
        } catch (error) {
            console.log("Error while getting data", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadWeatherData()
    }, []);

    if (loading) return <ActivityIndicator size="large" />

    if (!weatherDetails) return

    return (
        <TouchableOpacity style={[$container, containerStyleOverride]} onPress={onPress}>
            <View style={$iconContainer}>
                <BaseAutoImage
                    source={{uri: weatherDetails?.iconUrl ?? DEFAULT_WEATHER_ICON_URL}}
                />
            </View>
            <View style={$firstRow}>
                <View style={$locationAndTimeContainer}>
                    <BaseText
                        text={weatherDetails?.city}
                        style={$mainTextColor}
                        preset="bold"
                        size="xl"
                    />
                    <BaseText
                        text={weatherDetails?.lastUpdated}
                        style={[$secondaryColor, $lineHeight]}
                        preset="bold"
                    />
                </View>
                <View style={$temperatureContainer}>
                    <BaseText
                        text={`${weatherDetails?.actualTemp.toFixed(0)}°`}
                        style={$mainTextColor}
                        preset="bold"
                        size="xxl"
                    />
                </View>
            </View>
            <View style={$secondRow}>
                <View style={$interpretation}>
                    <BaseText
                        text={weatherDetails?.interpretation}
                        style={$secondaryColor}
                        preset="bold"
                    />
                </View>
                <View style={$highLowTemperature}>
                    <BaseText>
                        <BaseText
                            text={`H:${weatherDetails?.highTemp.toFixed(0)}° `}
                            style={$secondaryColor}
                            preset="bold"
                        />
                        <BaseText
                            text={`L:${weatherDetails?.lowTemp.toFixed(0)}°`}
                            style={$secondaryColor}
                            preset="bold"
                        />
                    </BaseText>
                </View>
            </View>
        </TouchableOpacity>
    )

})

const $container: ViewStyle = {
    borderRadius: spacing.df,
    minHeight: componentSize.lwl,
    backgroundColor: colors.weatherAppPalette.cardBgColor,
    paddingHorizontal: spacing.ds,
    paddingVertical: spacing.xxs,
    justifyContent: "space-between",
    overflow: "hidden"
}

const $firstRow: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
}

const $secondRow: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
}

const $locationAndTimeContainer: ViewStyle = {}

const $temperatureContainer: ViewStyle = {}

const $interpretation: ViewStyle = {}

const $highLowTemperature: ViewStyle = {}

const $mainTextColor: TextStyle = {
    color: "white",
}

const $secondaryColor: TextStyle = {
    color: colors.weatherAppPalette.secondaryTextCardColor,
}

const $lineHeight: TextStyle = {
    lineHeight: spacing.md
}

const $iconContainer: ViewStyle = {
    position: "absolute",
    top: -spacing.mxxl,
    left: -spacing.mxxl,
    opacity: 0.5
}

export default WeatherCard
