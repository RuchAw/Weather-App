import React, { FC, forwardRef, Ref, useEffect, useState } from "react"
import { TextFieldProps } from "../../baseComponents"
import { colors, typography } from "../../../theme"
import InputHiddenShown from "../textFields/InputHiddenShown"
import { useStores } from "../../../models"
import { TextInput, TextStyle, ViewStyle } from "react-native"

interface LoginPasswordProps extends Pick<TextFieldProps, "value" | "onChangeText" | "onSubmitEditing"> {
  isSubmitted: boolean
  loginError: string
}

export const LoginPassword = forwardRef(function LoginPassword(props: LoginPasswordProps, ref: Ref<TextInput>) {

  const {
    isSubmitted,
    onSubmitEditing,
    loginError
  } = props

  const {
    authenticationStore: {
      authPassword,
      setAuthPassword,
      authPasswordValidationError,
    },
  } = useStores()

  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    if (isSubmitted && authPasswordValidationError) {
      setPasswordError(authPasswordValidationError)
    }

    return ()=>{
      setPasswordError("")
    }
  }, [authPassword, isSubmitted])

  useEffect(() => {
    if (loginError) setPasswordError(loginError)
  }, [loginError])

  // Handle userName text change
  const handlePasswordTextChange = (username: string) => {
    // If we start typing check if there is an error in the userName and remove it
    if (passwordError) setPasswordError("")
    setAuthPassword(username)
  }

  return (
    <InputHiddenShown
      ref={ref}
      value={authPassword as string}
      onChangeText={handlePasswordTextChange}
      inputWrapperStyle={!!passwordError && $inputError}
      HelperTextProps={{ style: { fontFamily: typography.primary.italic } }}
      labelTx="loginScreen.passwordFieldLabel"
      placeholderTx="loginScreen.passwordFieldPlaceholder"
      helper={passwordError}
      status={passwordError ? "error" : undefined}
      onSubmitEditing={onSubmitEditing}
    />
  )
})

const $inputError: ViewStyle = {
  backgroundColor: colors.weatherAppPalette.incorrectEntryBgColor,
}
