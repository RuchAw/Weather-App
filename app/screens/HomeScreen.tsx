import {FC, useState} from "react"
import {observer} from "mobx-react-lite"
import {View, ViewStyle} from "react-native"
import {AppStackScreenProps} from "../navigators"
import Drawer from "../components/renders/drawer/Drawer"
import {colors, spacing} from "../theme"
import {BaseText} from "../components/baseComponents"
import SearchBar from "../components/renders/textFields/SearchBar";
import WeatherCardList from "../components/renders/WeatherCardList";
import SmallButtonWithIcon from "../components/renders/boutons/SmallButtonWithIcon";
import {useStores} from "../models";
import {getWeather, WeatherData} from "../services/elements";
import {showErrorToast} from "../utils/toast/toast";

interface HomeScreenProps extends AppStackScreenProps<"Home"> {
}


export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({navigation}) {

    const {
        weatherStore: {
            history,
            addCity,
            clearHistory
        }
    } = useStores()

    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)

    const processSearch = (city: string) => {
        addCity(city)
        navigation.navigate("WeatherDetail", {city})
        setSearch("")
    }

    const performSearch = async () => {
        try {
            setLoading(true)
            const resp = await getWeather(search)
            if (!resp) return showErrorToast("An error has occurred while fetching data")
            if ("message" in resp) return showErrorToast("Error:" + resp.message)
            processSearch(resp.name)
        } catch (error) {
            console.log("Error", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Drawer style={$screenStyle} preset="fixed">
            <View style={$root}>
                <BaseText text="Weather" size="xxl" preset="bold"/>
                <SearchBar
                    placeholderTx="homeScreen.searchForACity"
                    containerStyle={$searchBarContainerStyle}
                    value={search}
                    onChangeText={setSearch}
                    loading={loading}
                />
                <View style={$interactionButtons}>
                    <SmallButtonWithIcon
                        text="Clear history"
                        buttonIcon="trash_bin"
                        disabled={history.length < 1 || loading}
                        onPress={clearHistory}
                    />
                    <SmallButtonWithIcon
                        text="Search"
                        buttonIcon="search"
                        disabled={!search || loading}
                        onPress={performSearch}
                    />
                </View>
                <WeatherCardList
                    data={history}
                    containerStyle={$weatherCardListContainerStyle}
                />
            </View>
        </Drawer>
    )

})

const $screenStyle: ViewStyle = {
    backgroundColor: colors.weatherAppPalette.loginBackGroundColor
}

const $root: ViewStyle = {
    marginHorizontal: spacing.df
}

const $searchBarContainerStyle: ViewStyle = {
    marginTop: spacing.xs
}

const $weatherCardListContainerStyle: ViewStyle = {
    marginTop: spacing.df
}

const $interactionButtons: ViewStyle = {
    marginTop: spacing.xs,
    flexDirection: "row",
    justifyContent: "space-around"
}
