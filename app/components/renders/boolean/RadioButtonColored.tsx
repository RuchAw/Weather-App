import { Pressable, StyleProp, SwitchProps, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { BaseText, TextFieldProps } from "../../baseComponents"
import { componentSize } from "../../../theme/componentsSize"
import { spacing } from "../../../theme"

export interface RadioButtonColoredProps
  extends Pick<TextFieldProps, "labelTx" | "labelTxOptions" | "containerStyle"> {
  /**
   * An optional style for text that override the actual label style
   */
  style?: StyleProp<TextStyle>
  /**
   * Label to provide to the radio button
   */
  label?: string
  /**
   * Color for the the radio button [text, border, backgroundColor]
   */
  color?: string
  /**
   * The value of the field. If true the component will be turned on.
   */
  value?: boolean
  /**
   * Invoked with the new value when the value changes.
   */
  onValueChange?: SwitchProps["onValueChange"]
}

/**
 * A radio button outlined with text inside it, filled when checked
 */
export const RadioButtonColored = observer(function RadioButtonColored(
  props: RadioButtonColoredProps,
) {
  const {
    label,
    color,
    labelTx,
    labelTxOptions,
    containerStyle: containerStyleOverride,
    style: textStyleOverride,
    value,
    onValueChange,
  } = props

  const handlePress = () => {
    onValueChange?.(!value)
  }

  const containerStyle = {
    borderColor: color,
    backgroundColor: value ? color : "transparent",
  }

  const textStyle = {
    color: value ? "white" : color,
  }

  return (
    <Pressable onPress={handlePress} style={[$container, containerStyleOverride, containerStyle]}>
      <View>
        <BaseText
          preset="smallBoldText"
          style={[$label, textStyle, textStyleOverride]}
          tx={labelTx}
          txOptions={labelTxOptions}
          text={label}
        />
      </View>
    </Pressable>
  )
})

const $container: ViewStyle = {
  borderWidth: 1,
  borderRadius: spacing.ds,
  width: componentSize.dxxl,
  height: componentSize.sxxl,
  justifyContent: "center",
}

const $label: TextStyle = {
  textAlign: "center",
}
