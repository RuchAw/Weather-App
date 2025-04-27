import {StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {CurrentWeatherData} from "../../screens";
import {BaseText} from "../baseComponents";
import {colors, spacing} from "../../theme";

export interface CurrentWeatherTopInfoProps {
    containerStyle?: StyleProp<ViewStyle>
    currentWeather: CurrentWeatherData
}

const CurrentWeatherTopInfo = observer(function CurrentWeatherTopInfo(props: CurrentWeatherTopInfoProps) {

    const {
        containerStyle: containerStyleOverride,
        currentWeather
    } = props

    return (
        <View style={[$container, containerStyleOverride]}>
            <BaseText
                style={$mainTextColor}
                text={currentWeather.city}
                preset="bold"
                size="xxl"
            />
            <BaseText
                style={$mainTextColor}
                text={`${currentWeather.temp.toFixed(0)}°`}
                preset="mediumText"
                size="wl"
            />
            <BaseText
                style={$secondaryColor}
                text={currentWeather.description}
                preset="mediumText"
                size="xl"
            />
            <BaseText
                style={[$mainTextColor, $customLineHeight]}
                text={`H: ${currentWeather.tempMax.toFixed(0)}  L:${currentWeather.tempMin.toFixed(0)}`}
                preset="mediumText"
                size="lg"
            />
        </View>
    )

})

const $container: ViewStyle = {
    alignItems: "center"
}

const $mainTextColor: TextStyle = {
    color: "white",
}

const $secondaryColor: TextStyle = {
    color: colors.weatherAppPalette.secondaryTextCardColor,
}

const $customLineHeight: TextStyle = {
    lineHeight: spacing.df
}

export default CurrentWeatherTopInfo
