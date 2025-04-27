import React, { Ref, forwardRef } from "react"
import { TextInput } from "react-native"
import { BaseTextField, TextFieldProps } from "../../baseComponents"
import { colors } from "../../../theme"

const TextField = forwardRef(function Chaine(props: TextFieldProps, ref: Ref<TextInput>) {
  return (
    <BaseTextField
      ref={ref}
      placeholderTextColor={colors.weatherAppPalette.placeHolderTextCouleur}
      {...props}
    />
  )
})

export default TextField
