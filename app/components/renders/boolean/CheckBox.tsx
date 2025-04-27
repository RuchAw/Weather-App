import React from "react"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { BaseToggle, BaseToggleProps } from "../../baseComponents"
import { fontSize } from "../../../theme/fontSize"
import { colors, spacing } from "../../../theme"

export interface CheckBoxProps
  extends Pick<
    BaseToggleProps,
    "value" | "label" | "labelTx" | "labelTxOptions" | "onPress" | "onValueChange"
  > {
  /**
   * Style of the container to adjust marging for example
   */
  style?: ViewStyle
}

const CheckBox = (props: CheckBoxProps) => {
  const { style, value, label, labelTx, labelTxOptions, onPress, onValueChange } = props

  return (
    <BaseToggle
      variant="checkbox"
      containerStyle={style}
      label={label}
      labelTx={labelTx}
      labelTxOptions={labelTxOptions}
      labelStyle={$labelStyle}
      inputOuterStyle={$checkBoxShape}
      inputDetailStyle={$iconStyle}
      inputInnerStyle={$innerContent}
      value={value}
      onPress={onPress}
      onValueChange={onValueChange}
    />
  )
}

export default CheckBox

const $labelStyle: TextStyle = {
  fontSize: fontSize.mxs,
  marginLeft: spacing.xs,
  color: colors.text,
}

const $checkBoxShape: ViewStyle = {
  backgroundColor: "#CCC",
  height: 24,
  width: 24,
  borderRadius: 12,
  borderWidth: 0,
}

const $iconStyle: ImageStyle = {
  width: fontSize.df,
  height: fontSize.df,
}

const $innerContent: ViewStyle = {
  backgroundColor: colors.weatherAppPalette.primaryBtnBgCouleur,
}
