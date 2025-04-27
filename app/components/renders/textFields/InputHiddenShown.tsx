import React, { Ref, forwardRef, useMemo, useState } from "react"
import { TextInput, ViewStyle } from "react-native"
import TextField from "./TextField"
import { BaseIcon, TextFieldAccessoryProps, TextFieldProps } from "../../baseComponents"
import { colors } from "../../../theme"
import { iconSize } from "../../../theme/iconSize"

const InputHiddenShown = forwardRef(function InputHiddenShown(
  props: TextFieldProps,
  ref: Ref<TextInput>,
) {
  // Le state de l'icon et l'attribut secureEntry pour la chaine
  const [isInputHidden, setIsInputHidden] = useState(true)

  //  Afficher le nouveau right accessory de mot de passe
  const InputRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <BaseIcon
            icon={isInputHidden ? "view" : "hidden"}
            color={colors.weatherAppPalette.primaryIconColor}
            containerStyle={props.style}
            size={iconSize.md}
            onPress={() => setIsInputHidden(!isInputHidden)}
          />
        )
      },
    [isInputHidden],
  )

  return (
    <TextField
      ref={ref}
      {...props}
      autoCapitalize="none"
      autoComplete="password"
      autoCorrect={false}
      secureTextEntry={isInputHidden}
      RightAccessory={InputRightAccessory}
      inputWrapperStyle={[$inputWrapperStyle, props.inputWrapperStyle]}
    />
  )
})

const $inputWrapperStyle: ViewStyle = {
  alignItems: "center",
}

export default InputHiddenShown
