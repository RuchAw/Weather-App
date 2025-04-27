import { observer } from "mobx-react-lite"
import { FC, useEffect, useState } from "react"
import { ViewStyle } from "react-native"
import { useStores } from "../../models"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { BaseScreen } from "../../components/baseComponents"
import { windowsHeight } from "../../utils/constante"
import { useStoredCredentials } from "../../utils/loginHelpers/useStoredCredentials"
import { useProcessLogin } from "../../utils/loginHelpers/useProcessLogin"
import { LoginContainer } from "../../components/renders/loginScreenElements/LoginContainer"
import { LoginBottomContainer } from "../../components/renders/loginScreenElements/LoginBottomContainer"
import { LoginTopContainer } from "../../components/renders/loginScreenElements/LoginTopContainer"

interface LoginScreenProps extends AppStackScreenProps<"Login"> {
}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({ }) {

  // State local du screen
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  // State for login error
  const [loginError, setLoginError] = useState("")

  // Import auth store
  const {
    authenticationStore: {
      setUserName,
      setAuthPassword,
      agencyNumber,
    },
  } = useStores()

  // Handle login error in case of wrong credentials
  const setPasswordError = (passwordError: string) => {
    setLoginError(passwordError)
  }

  // Handle credentials and remember me
  const [
    rememberMe,
    setRememberMe,
    saveCredentials,
  ] = useStoredCredentials({ setUserName, setAuthPassword })


  // Handle process login
  const [processLogin] = useProcessLogin({
    setIsSubmitted,
    setPasswordError,
    saveCredentials,
  })

  // Function to handle toggling remember me checkbox
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  useEffect(() => {
    // Cleanup elements
    return () => {
      setLoginError("")
    }
  }, [])

  // Handle tap on login button, disable the button until we get response from the api
  const login = async () => {
    setIsSubmitted(true)
    setButtonDisabled(true)
    await processLogin()
    setButtonDisabled(false)
  }

  return (
    <BaseScreen
      preset="auto"
      contentContainerStyle={$contentContainerStyle}
      KeyboardAvoidingViewProps={{ behavior: "padding" }}
      safeAreaEdges={["bottom"]}
      statusBarStyle="dark"
    >
      <LoginTopContainer containerStyle={$topContainer} />
      <LoginContainer
        containerStyle={$loginContainer}
        isSubmitted={isSubmitted}
        loginError={loginError}
        onLogin={login}
        rememberMe={rememberMe}
        toggleRememberMe={toggleRememberMe}
        loginButtonDisabled={buttonDisabled}
      />
      <LoginBottomContainer agencyNumber={agencyNumber} />
    </BaseScreen>
  )
})

const $contentContainerStyle: ViewStyle = {
  minHeight: windowsHeight,
  backgroundColor: colors.weatherAppPalette.loginBackGroundColor,
}

const $topContainer: ViewStyle = {
  height: windowsHeight / 3,
}

const $loginContainer: ViewStyle = {
  justifyContent: "center",
  height: windowsHeight / 3,
  paddingHorizontal: spacing.lg,
}
