import {StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {TodayForecast} from "../../screens";
import {BaseAutoImage, BaseText} from "../baseComponents";
import {componentSize} from "../../theme/componentsSize";

export interface TodaysForecastItemProps {
    containerStyle?: StyleProp<ViewStyle>
    forecast: TodayForecast
}

const TodaysForecastItem = observer(function TodaysForecastItem(props: TodaysForecastItemProps) {

    const {
        containerStyle: containerStyleOverride,
        forecast
    } = props

    const hours = forecast.time.substring(0,2)

    return (
        <View style={[$container, containerStyleOverride]}>
            <BaseText text={hours} style={$textMainColor} preset="bold"/>
            <BaseAutoImage source={{uri: forecast.iconUrl}} maxHeight={componentSize.xxl}/>
            <BaseText text={`${forecast.temp.toFixed(0)}°`} style={$textMainColor} preset="bold"/>
        </View>
    )

})

const $container: ViewStyle = {
    alignItems: "center"
}

const $textMainColor: TextStyle = {
    color: "white"
}

export default TodaysForecastItem
