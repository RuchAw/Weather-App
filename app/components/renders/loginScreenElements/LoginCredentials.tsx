import React, { FC, useRef } from "react"
import { spacing } from "../../../theme"
import { StyleProp, TextInput, View, ViewStyle } from "react-native"
import { LoginIdentifier } from "./LoginIdentifier"
import { LoginPassword } from "./LoginPassword"

interface LoginCredentialsProps {
  containerStyle?: StyleProp<ViewStyle>
  onLogin: () => void
  isSubmitted: boolean
  loginError: string
}

export const LoginCredentials: FC<LoginCredentialsProps> = (props) => {

  const {
    containerStyle,
    isSubmitted,
    loginError,
    onLogin
  } = props

  // Create input password ref to access it tapping on enter
  const authPasswordInput = useRef<TextInput>(null)

  return (
    <View style={containerStyle}>
      <LoginIdentifier
        isSubmitted={isSubmitted}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />
      <View style={$verticalMargin} />
      <LoginPassword
        ref={authPasswordInput}
        isSubmitted={isSubmitted}
        loginError={loginError}
        onSubmitEditing={onLogin}
      />
    </View>
  )
}

const $verticalMargin: ViewStyle = {
  marginBottom: spacing.lg,
}
