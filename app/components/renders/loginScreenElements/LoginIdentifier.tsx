import React, { FC, useEffect, useState } from "react"
import { TextFieldProps } from "../../baseComponents"
import { useStores } from "../../../models"
import { colors, typography } from "../../../theme"
import TextField from "../textFields/TextField"
import { TextStyle, ViewStyle } from "react-native"


interface LoginIdentifierProps extends Pick<TextFieldProps, "value" | "onChangeText" | "onSubmitEditing"> {
  isSubmitted: boolean
}

export const LoginIdentifier: FC<LoginIdentifierProps> = (props) => {

  const {
    isSubmitted,
    onSubmitEditing
  } = props

  const {
    authenticationStore: {
      userName,
      setUserName,
      userNameValidationError,
    },
  } = useStores()

  const [userNameError, setUserNameError] = useState("")

  useEffect(() => {
    if (isSubmitted && userNameValidationError) {
      setUserNameError(userNameValidationError)
    }

    return ()=>{
      setUserNameError("")
    }
  }, [userName, isSubmitted])

  // Handle userName text change
  const handleUserNameTextChange = (username: string) => {
    // If we start typing check if there is an error in the userName and remove it
    if (userNameError) setUserNameError("")
    setUserName(username)
  }

  return (
    <TextField
      value={userName as string}
      onChangeText={handleUserNameTextChange}
      inputWrapperStyle={!!userNameError && $inputError}
      HelperTextProps={{ style: { fontFamily: typography.primary.italic } }}
      autoCapitalize="none"
      autoComplete="email"
      autoCorrect={false}
      keyboardType="email-address"
      labelTx="loginScreen.identifier"
      placeholderTx="loginScreen.emailFieldPlaceholder"
      helper={userNameError}
      status={userNameError ? "error" : undefined}
      onSubmitEditing={onSubmitEditing}
    />
  )

}

const $inputError: ViewStyle = {
  backgroundColor: colors.weatherAppPalette.incorrectEntryBgColor,
}

