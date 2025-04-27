import { FC } from "react"
import { BaseButton, BaseText } from "../../baseComponents"
import { LoginCredentials } from "./LoginCredentials"
import { CustomCheckBox } from "../boolean/CustomCheckBox"
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../theme"
import { iconSize } from "../../../theme/iconSize"

interface LoginContainerProps {
  containerStyle?: StyleProp<ViewStyle>
  isSubmitted: boolean
  loginError: string
  onLogin: () => void
  rememberMe: boolean
  toggleRememberMe: () => void
  loginButtonDisabled: boolean
}

export const LoginContainer: FC<LoginContainerProps> = (props) => {

  const {
    containerStyle,
    isSubmitted,
    loginError,
    onLogin,
    rememberMe,
    toggleRememberMe,
    loginButtonDisabled,
  } = props

  return (
    <View style={containerStyle}>
      <BaseText preset="h1" tx="loginScreen.greetings" style={$greetings} />
      <LoginCredentials
        containerStyle={$credentialsContainer}
        isSubmitted={isSubmitted}
        loginError={loginError}
        onLogin={onLogin}
      />
      <CustomCheckBox
        labelTx="loginScreen.rememberMe"
        containerStyle={$rememberMeContainer}
        value={rememberMe}
        onPress={toggleRememberMe}
      />
      <View style={$verticalMargin} />
      <BaseButton
        tx={loginButtonDisabled ? undefined : "loginScreen.tapToSignIn"}
        style={$loginButton}
        disabledBgColor={colors.weatherAppPalette.loginDisabledButton}
        preset="primary"
        onPress={onLogin}
        LeftAccessory={() =>
          loginButtonDisabled && <ActivityIndicator color="white" size={iconSize.lg}/>
        }
        disabled={loginButtonDisabled}
      />
    </View>
  )

}

const $greetings: TextStyle = {
  marginBottom: spacing.xl,
  color: colors.weatherAppPalette.primaryTitlesColor,
}

const $credentialsContainer: ViewStyle = {
  marginBottom: spacing.ds,
}

const $rememberMeContainer: ViewStyle = {
  maxWidth: "60%"
}

const $loginButton: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.df,
}

const $verticalMargin: ViewStyle = {
  marginBottom: spacing.lg,
}
