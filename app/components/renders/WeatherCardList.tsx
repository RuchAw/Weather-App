import {ListRenderItemInfo, StyleProp, View, ViewStyle} from "react-native";
import {observer} from "mobx-react-lite";
import WeatherCard, {WeatherCardProps} from "./WeatherCard";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {AppStackParamList} from "../../navigators";
import {getWeather} from "../../services/elements";
import {spacing} from "../../theme";
import {FlatList} from "react-native-gesture-handler";
import {useStores} from "../../models";
import {BaseText} from "../baseComponents";


export type CityDataType = {
    id: number
    city: string
}

export interface WeatherCardListProps {
    containerStyle?: StyleProp<ViewStyle>
    data: CityDataType[]
}

const WeatherCardList = observer(function WeatherCardList(props: WeatherCardListProps) {

    const {
        containerStyle: containerStyleOverride,
        data
    } = props

    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    if (data.length === 0) return <BaseText
        text={"No Data to show.\nTry a new search "}
        preset="genericItalicText"
        style={$notFoundStyle}
    />

    const navigateToDetails = (city: string)=> {
        navigation.navigate("WeatherDetail", {city})
    }

    const renderCards = ({item}: ListRenderItemInfo<CityDataType>) => (
        <WeatherCard
            city={item.city}
            onPress={()=> {navigateToDetails(item.city)}}
        />
    )

    const renderItemSeparator = () => <View style={$itemSeparator}/>

    return (
        <View style={[$container, containerStyleOverride]}>
            <FlatList
                data={data}
                renderItem={renderCards}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={renderItemSeparator}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )

})

const $container: ViewStyle = {
    height: "100%",
    paddingBottom: spacing.wl,
}

const $itemSeparator: ViewStyle = {
    marginBottom: spacing.xs,
}

const $notFoundStyle: ViewStyle = {
    marginTop: spacing.lg,
    alignSelf: "center"
}

export default WeatherCardList
