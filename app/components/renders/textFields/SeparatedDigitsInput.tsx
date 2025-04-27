import React, { forwardRef, useRef, useState, useImperativeHandle, ForwardedRef } from "react"
import { TextInput } from "react-native-gesture-handler"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import TextField from "./TextField"
import { BaseText, TextFieldProps } from "../../baseComponents"
import { colors, spacing, typography } from "../../../theme"
import { componentSize } from "../../../theme/componentsSize"
import { fontSize } from "../../../theme/fontSize"

export interface SeparatedDigitsInputProps
  extends Pick<
    TextFieldProps,
    | "status"
    | "inputWrapperStyle"
    | "label"
    | "labelTx"
    | "labelTxOptions"
    | "style"
    | "editable"
    | "helper"
    | "helperTx"
    | "helperTxOptions"
    | "HelperTextProps"
  > {
  /**
   * Style for the container of the digits inputs
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Number of the digits in the code 4 by default if not provider
   */
  numberOfDigits?: number
  /**
   * Style override for the label
   */
  labelStyle?: TextStyle
  /**
   * Optional value to provide to the input
   */
  value?: string
  /**
   * CallBack function to update the state in the parent component
   */
  onCodeChange?: (code: string) => void
  /**
   * Error wrapper backGround (optional)
   */
  errorBackGroundColor?: string
  /**
   * Error text color (optional)
   */
  errorTextColor?: string
}

const SeparatedDigitsInput = forwardRef(function SeparatedDigitsInput(
  {
    numberOfDigits = 4,
    containerStyle,
    status,
    inputWrapperStyle: inputWrapperStyleOverride,
    labelStyle,
    label,
    labelTx,
    labelTxOptions,
    style,
    editable,
    value,
    onCodeChange,
    errorBackGroundColor = colors.error,
    errorTextColor = "white",
    helper,
    helperTx,
    helperTxOptions,
    HelperTextProps,
  }: SeparatedDigitsInputProps,
  ref: ForwardedRef<TextInput>,
) {
  // Décortiquer le string value en un tableau
  const code = value?.split("") || []

  // Le state du code SMS
  const [smsCode, setSmsCode] = useState(code)

  // Créez un tableau de références pour les textFields de saisie
  const inputRefs = Array.from({ length: numberOfDigits }, () => useRef<TextInput>(null))

  // Utilisez useImperativeHandle pour assigner le ref externe au premier champ
  useImperativeHandle(ref, () => inputRefs[0].current as TextInput, [inputRefs])

  // Fonction pour faire un focus sur le prochain textFields de saisie
  const focusNextInput = (index: number) => {
    if (index < numberOfDigits - 1) {
      inputRefs[index + 1].current?.focus()
    }
  }

  // Fonction pour gérer le changement du code
  const handleTextInput = (digit: string, index: number) => {
    if (digit.length === 1) {
      // Obtenir un nouveau tableau de l'ancien state
      const newCode = [...smsCode]
      // Mettre à jour la valeur du digit avec l'index associé
      newCode[index] = digit
      // Mettre à jour le local state du code sms
      setSmsCode(newCode)
      // Envoyer le code au parent
      if (onCodeChange) {
        onCodeChange(newCode.join(""))
      }
      focusNextInput(index)
    } else if (digit.length === 0) {
      const newCode = [...smsCode]
      // Si on supprime une valeur du tableau on met à sa place un string vide et on update le local state ainsi que la valeur dans le parent
      newCode[index] = ""
      setSmsCode(newCode)
      if (onCodeChange) {
        onCodeChange(newCode.join(""))
      }

      // If user deletes the current digit, move focus to the previous input field
      if (index > 0) {
        inputRefs[index - 1].current?.focus()
      }
    }
  }

  // Set color of the error
  const $inputTextError: TextStyle = {
    color: errorTextColor,
  }

  // Style for the helper
  const $helperStyles = [
    $helperStyle,
    status === "error" && { color: colors.text },
    HelperTextProps?.style,
  ]

  return (
    <View style={containerStyle}>
      <BaseText
        preset="formLabel"
        text={label}
        tx={labelTx}
        txOptions={labelTxOptions}
        style={[$label, labelStyle]}
      />
      <View style={$inputsContainer}>
        {Array.from({ length: numberOfDigits }, (_, index) => (
          <TextField
            value={smsCode[index] || ""}
            key={index}
            containerStyle={$input}
            style={[$inputText, style, status && $inputTextError]}
            ref={inputRefs[index]}
            maxLength={1}
            keyboardType="decimal-pad"
            onChangeText={(text) => handleTextInput(text, index)}
            inputWrapperStyle={[
              inputWrapperStyleOverride,
              status && { backgroundColor: errorBackGroundColor },
            ]}
            editable={editable}
          />
        ))}
      </View>

      {!!(helper || helperTx) && status && (
        <BaseText
          preset="formHelper"
          text={helper}
          tx={helperTx}
          txOptions={helperTxOptions}
          {...HelperTextProps}
          style={$helperStyles}
        />
      )}
    </View>
  )
})

export default SeparatedDigitsInput

const $inputsContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $input: TextStyle = {
  marginRight: spacing.ds,
  width: componentSize.sxxl,
  height: componentSize.sxxl,
  borderRadius: spacing.ds,
}

const $inputText: TextStyle = {
  fontSize: fontSize.xl,
  fontFamily: typography.primary.bold,
  marginHorizontal: 0,
  textAlign: "center",
  lineHeight: spacing.xlg,
}

const $label: TextStyle = {
  color: colors.weatherAppPalette.primaryLabelTextCouleur,
  marginBottom: spacing.xxxs,
}

const $helperStyle: TextStyle = {
  fontFamily: typography.primary.italic,
  fontSize: fontSize.mxs,
  marginTop: spacing.xxs,
}
