/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack"
import {observer} from "mobx-react-lite"
import {useEffect} from "react"
import {useColorScheme} from "react-native"
import * as Screens from "../screens"
import Config from "../config"
import {
    navigationRef,
    resetAllActiveRoutes,
    useBackButtonHandler,
} from "./navigationUtilities"
import {languageChanged} from "../translations"
import {colors} from "../theme"
import {useStores} from "../models"
import {WeatherData} from "../services/elements";

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
    // 🔥 Your screens go here
    Login: undefined
    Home: undefined
	WeatherDetail: undefined | { city: string }
	// IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
    AppStackParamList,
    T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {

    const {
        authenticationStore: {
            distributeAuthToken
        }
    } = useStores()

    languageChanged.useEventListener(() => {
        resetAllActiveRoutes()
    }, [])

    const loadAuthToken = async () => {
        await distributeAuthToken()
    }

    // Check and request app permissions, check app version, then load the auth token
    const onLaunchingApp = async () => {
        loadAuthToken()
    }

    useEffect(() => {
        onLaunchingApp()

        return () => {
            // Cleaners
        }
    }, [])

    return (
        <Stack.Navigator screenOptions={{headerShown: false, navigationBarColor: colors.background}}>
            {/* Screens in developement to put in the end of the stack after finishing */}
            {/* The Main navigation stack */}
            <Stack.Screen name="Login" component={Screens.LoginScreen}/>
            {/** 🔥 Your screens go here */}
			<Stack.Screen name="Home" component={Screens.HomeScreen} />
			<Stack.Screen name="WeatherDetail" component={Screens.WeatherDetailScreen} />
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
        </Stack.Navigator>
    )
})

export interface NavigationProps
    extends Partial<React.ComponentProps<typeof NavigationContainer>> {
}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
    const colorScheme = useColorScheme()

    useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

    return (
        <NavigationContainer
            ref={navigationRef}
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            {...props}
        >
            <AppStack/>
        </NavigationContainer>
    )
})
