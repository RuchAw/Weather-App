import {FC, useEffect, useRef, useState} from "react"
import {
    BackHandler,
    Image, ImageSourcePropType,
    ImageStyle,
    Platform,
    StyleProp,
    TextStyle,
    View,
    ViewStyle,
} from "react-native"
import {DrawerLayout, DrawerState, FlatList} from "react-native-gesture-handler"
import {BaseButton, BaseIcon, BaseListItem, BaseScreen, BaseText, IconTypes} from "../../baseComponents"
import {useSharedValue, withTiming} from "react-native-reanimated"
import {DrawerIconButton} from "./DrawerIconButton"
import NavigationHeader from "../headers/NavigationHeader"
import {useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import OutlinedButton from "../boutons/OutlinedButton"
import {version} from "../../../../package.json"
import {isRTL, TxKeyPath} from "../../../translations"
import {useStores} from "../../../models"
import {AppStackParamList} from "../../../navigators"
import {useSafeAreaInsetsStyle} from "../../../utils/useSafeAreaInsetsStyle"
import {colors, spacing} from "../../../theme"
import {iconSize} from "../../../theme/iconSize"
import {windowsHeight} from "../../../utils/constante"
import {showNormalToast} from "../../../utils/toast/toast";

export interface DrawerProps {
    /**
     * Children components.
     */
    children?: React.ReactNode
    /**
     * Fonction à exécuter si on tap le boutton de l'interaction
     */
    onPressInteractionIcon?: () => void
    /**
     * La page de bug active ou pas
     */
    bugActive?: boolean
    /**
     * Texte du titre recherché via i18n. le texte à afficher avec la fleche du retour
     */
    backSlug?: TxKeyPath
    /**
     * Style override for the container of screen
     */
    style?: StyleProp<ViewStyle>
    /**
     * Screen preset ['auto', 'scroll', 'fixed']
     */
    preset?: "auto" | "fixed" | "scroll"
    /**
     * Interaction Icon "Bug by default"
     */
    interactionIcon?: IconTypes
    /**
     * Refresh control
     */
    refreshControl?: React.ReactElement
    backgroundImage?: ImageSourcePropType
}

// Load le logo pour le drawer
const logo = require("../../../../assets/images/weather_app_logo.png")

interface NavigationItem {
    // Definir l'item de navigation
    item: {
        name: string
        action(): void
    }
}

const NativeListItem: FC<NavigationItem> = ({item}) => {
    return (
        <View>
            <BaseListItem
                text={item.name}
                onPress={item.action}
                leftIcon={!isRTL ? "caretLeft" : "caretRight"}
            />
        </View>
    )
}

const Drawer = (props: DrawerProps) => {
    const {
        children,
        backSlug,
        style,
        preset = "auto",
        refreshControl,
        backgroundImage,
    } = props

    const [open, setOpen] = useState(false)
    const timeout = useRef<ReturnType<typeof setTimeout>>()
    const drawerRef = useRef<DrawerLayout>(null)
    const menuRef = useRef<FlatList>(null)
    const progress = useSharedValue(0)

    const toggleDrawer = () => {
        if (!open) {
            setOpen(true)
            drawerRef.current?.openDrawer({speed: 2})
        } else {
            setOpen(false)
            drawerRef.current?.closeDrawer({speed: 2})
        }
    }

    useEffect(() => {
        return () => timeout.current && clearTimeout(timeout.current)
    }, [])

    const {
        authenticationStore: {
            logout
        },
    } = useStores()

    // Une liste des items temporaire à afficher sur le menu du drawer, avec le nom de l'item et l'action associé
    const dummyList = [
        {
            name: "Cities",
            action: () => {
                drawerRef.current?.closeDrawer({speed: 2})
                navigation.navigate("Home")
            }
        }
    ]

    const logoutFromApp = async () => {
        await logout()
    }

    // Get navigation
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
    const navigateToConfiguration = () => {
        return showNormalToast("Coming soon")
        // drawerRef.current?.closeDrawer({ speed: 2 })
        // navigation.navigate("DeviceConfiguration")
    }

    const $drawerInsets = useSafeAreaInsetsStyle(["top"])

    const appVersion = "App Version | " + version

    const NavigationView = () => {
        return (
            <View style={[$drawer, $drawerInsets]}>
                <View style={$logoContainer}>
                    <Image source={logo} style={$logoImage}/>
                </View>
                <View style={$content}>
                    <FlatList<{ name: string; action(): void }>
                        ref={menuRef}
                        contentContainerStyle={$flatListContentContainer}
                        data={dummyList}
                        keyExtractor={(item) => item.name}
                        renderItem={({item, index: sectionIndex}) => (
                            <NativeListItem {...{item, sectionIndex}} />
                        )}
                    />
                    <View style={$buttonsContainer}>
                        <OutlinedButton
                            tx="common.disconnection"
                            style={$controlButton}
                            leftIcon="logout"
                            color={colors.weatherAppPalette.baseBugCouleur}
                            onPress={logoutFromApp}
                        />
                        <View style={$blankSpace}/>
                        <BaseButton
                            tx="common.configuration"
                            preset="secondary"
                            style={$controlButton}
                            LeftAccessory={() => (
                                <BaseIcon
                                    icon="gear"
                                    size={iconSize.df}
                                    color="white"
                                    containerStyle={{marginRight: spacing.xxs}}
                                />
                            )}
                            onPress={navigateToConfiguration}
                        />
                    </View>
                    <BaseText preset="lightText" text={appVersion} style={$version}/>
                </View>
            </View>
        )
    }

    const rightActionComponent = () => {
        return (
            <View style={$rightActionComponent}>
                <DrawerIconButton onPress={toggleDrawer} {...{open, progress}} />
            </View>
        )
    }

    useEffect(() => {
        // Ajouter un event listener pour detecter si le back bouton d'android est tapé
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            if (open) {
                // Si le drawer est ouvert et on tap le back boutton on ferme le drawer
                toggleDrawer()
                // On retrourne true pour desactiver le comportement par defaut de back dans ce cas il ferme l'application
                return true
            }
            // Si le drawer est fermé on veut que le back boutton execute le fonctionnement par defaut
            return false
        })
        // Enleve le listener si le component unmount
        return () => {
            backHandler.remove()
        }
    }, [open])

    return (
        <DrawerLayout
            ref={drawerRef}
            drawerWidth={Platform.select({default: 326})}
            drawerType={"slide"}
            drawerPosition={isRTL ? "left" : "right"}
            overlayColor={open ? colors.palette.overlay20 : "transparent"}
            onDrawerSlide={(drawerProgress) => {
                progress.value = open ? 1 - drawerProgress : drawerProgress
            }}
            onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
                if (newState === "Settling") {
                    progress.value = withTiming(drawerWillShow ? 1 : 0, {
                        duration: 250,
                    })
                    setOpen(drawerWillShow)
                }
            }}
            renderNavigationView={NavigationView}
        >
            <NavigationHeader RightActionComponent={rightActionComponent()} backSlug={backSlug}/>
            <BaseScreen
                preset={preset}
                contentContainerStyle={[$screenContainer, style]}
                KeyboardAvoidingViewProps={{behavior: Platform.OS === "ios" ? "padding" : "height"}}
                safeAreaEdges={["bottom"]}
                ScrollViewProps={{refreshControl}}
                statusBarStyle="dark"
                backgroundImage={backgroundImage}
            >
                {children}
            </BaseScreen>
        </DrawerLayout>
    )
}

export default Drawer

const $drawer: ViewStyle = {
    backgroundColor: colors.background,
    flex: 1,
}

const $flatListContentContainer: ViewStyle = {
    paddingHorizontal: spacing.lg,
}

const $logoImage: ImageStyle = {
    height: 42,
    width: 140,
    resizeMode: "center",
}

const $logoContainer: ViewStyle = {
    alignSelf: "flex-start",
    height: 42,
    alignItems: "center",
    justifyContent: "center"
}

const $screenContainer: ViewStyle = {
    flexGrow: 1,
    paddingBottom: windowsHeight * 0.15,
}

const $rightActionComponent: ViewStyle = {
    flexDirection: "row",
    alignItems: "center"
}

const $content: ViewStyle = {
    flexGrow: 1,
    paddingBottom: "10%",
    justifyContent: "space-between",
}

const $buttonsContainer: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xl
}

const $controlButton: ViewStyle = {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.ds,
}

const $blankSpace: ViewStyle = {
    marginRight: spacing.xs,
}

const $version: TextStyle = {
    marginBottom: spacing.gxl,
    alignSelf: "center"
}
