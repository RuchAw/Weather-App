import {Authenticate} from "../../services/login"
import {translate} from "../../translations"
import {useStores} from "../../models"
import {useNavigation} from "@react-navigation/native"
import {NativeStackNavigationProp} from "@react-navigation/native-stack"
import {AppStackParamList} from "../../navigators"


interface useProcessLoginProps {
    setIsSubmitted: (isSubmitted: boolean) => void
    saveCredentials: (userName: string, password: string) => Promise<void>
    setPasswordError: (passwordError: string) => void
}

export const useProcessLogin = (props: useProcessLoginProps) => {

    const {
        authenticationStore: {
            userName,
            setUserName,
            storeAuthToken,
            authPassword,
            setAuthPassword,
            authPasswordValidationError,
            userNameValidationError,
            setUserRole,
            setAgentFullName,
            distributeAuthToken,
        },
    } = useStores()

    const {
        setIsSubmitted,
        saveCredentials,
        setPasswordError
    } = props

    // Get the navigation hook
    const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

    const processLogin = async () => {
        if (userNameValidationError || authPasswordValidationError) return

        // Faire une requête au serveur pour récupérer le token d'authentification
        const data = await Authenticate(userName as string, authPassword as string)

        // Return si on rencontre un erreur lors de l'authentification
        if (!data) return

        // When credentials are wrong
        if ("message" in data) return setPasswordError(translate("loginScreen.incorrectIdentifiers"))

        // In case of success
        const token = data.token
        // On définit le token d'authentification dans AuthStore et dans le stockage de l'appareil à l'aide d'AsyncStroge
        await storeAuthToken(token)
        // Distribute to the api the Auth Token
        await distributeAuthToken()
        // Handle remember me checkBox
        await saveCredentials(userName as string, authPassword as string)

        // Cleanup inputs
        setIsSubmitted(false)
        setAuthPassword("")
        setUserName("")

        // Set user personal infos
        setUserRole(data.userRole)
        setAgentFullName(data.firstName, data.lastName)

        // TODO: reset to home page
        navigation.navigate("Home")
    }

    return [processLogin]
}
