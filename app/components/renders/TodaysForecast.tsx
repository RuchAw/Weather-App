import {StyleProp, TextStyle, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import {ForecastDay, TodayForecast} from "../../screens";
import {spacing} from "../../theme";
import {componentSize} from "../../theme/componentsSize";
import {BaseText} from "../baseComponents";
import TodaysForecastItem from "./TodaysForecastItem";
import {FlatList} from "react-native-gesture-handler";

export interface TodaysForecastProps {
    containerStyle?: StyleProp<ViewStyle>
    todayForecasts: TodayForecast[]
}

const TodaysForecast = observer(function TodaysForecast(props: TodaysForecastProps) {

    const {
        containerStyle: containerStyleOverride,
        todayForecasts
    } = props

    return (
        <View style={containerStyleOverride}>
            <BaseText
                text={"Today's forecast"}
                style={$title}
                preset="mediumText"
                size="lg"
            />
            <View style={$card} >
                <View style={$container} />
                <View style={$content}>
                    <FlatList
                        data={todayForecasts}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item }) => <TodaysForecastItem forecast={item} />}
                        horizontal
                        contentContainerStyle={$list}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    )

})

const $container: ViewStyle = {
    height: componentSize.sxwl,
    borderRadius: spacing.df,
    backgroundColor: "white",
    opacity: 0.1
}

const $content: ViewStyle = {
    flexDirection: "row",
    position: "absolute",
    zIndex: 2,
}

const $list: ViewStyle = {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.ds,
    paddingVertical: spacing.xxs
}

const $card: ViewStyle = {
    marginTop: spacing.xxs
}

const $title: TextStyle = {
    color: "white"
}

export default TodaysForecast
