import React from "react"
import { TextStyle } from "react-native"
import { BaseButton, BaseIcon, ButtonProps, IconTypes } from "../../baseComponents"
import { colors, spacing, typography } from "../../../theme"
import { iconSize } from "../../../theme/iconSize"
import { fontSize } from "../../../theme/fontSize"

export interface OutlinedButtonProps
  extends Pick<ButtonProps, "style" | "textStyle" | "text" | "tx" | "txOptions" | "onPress" | "disabled"> {
  /**
   * Color of the text and the border
   */
  color?: string
  /**
   * Left icon
   */
  leftIcon?: IconTypes
  /**
   * Right icon
   */
  rightIcon?: IconTypes
  /**
   * Icon size (works only if there is rightIcon/leftIcon)
   */
  accessorySize?: number
}

/**
 *
 * @param props
 * @returns
 */
const OutlinedButton = (props: OutlinedButtonProps) => {
  const {
    color = colors.text,
    style: buttonStyleOverride,
    textStyle: textStyleOverride,
    text,
    tx,
    txOptions,
    leftIcon,
    rightIcon,
    accessorySize = iconSize.df,
    onPress,
    disabled
  } = props

  const buttonStyle = [{ borderColor: disabled ? colors.weatherAppPalette.disabledButtonBgCouleur : color }, buttonStyleOverride]

  const textStyle = [{ color: disabled ? colors.weatherAppPalette.disabledButtonBgCouleur : color }, $textStyle, textStyleOverride]

  return (
    <BaseButton
      text={text}
      tx={tx}
      txOptions={txOptions}
      style={buttonStyle}
      textStyle={textStyle}
      LeftAccessory={() =>
        leftIcon && (
          <BaseIcon
            icon={leftIcon}
            color={disabled ? colors.weatherAppPalette.disabledButtonBgCouleur : color}
            size={accessorySize}
            containerStyle={{ marginRight: spacing.xxs }}
          />
        )
      }
      RightAccessory={() =>
        rightIcon && (
          <BaseIcon
            icon={rightIcon}
            color={disabled ? colors.weatherAppPalette.disabledButtonBgCouleur : color}
            size={accessorySize}
            containerStyle={{ marginRight: spacing.xxs }}
          />
        )
      }
      disabled={disabled}
      disabledBgColor="transparent"
      onPress={onPress}
    />
  )
}

export default OutlinedButton

const $textStyle: TextStyle = {
  fontSize: fontSize.xs,
  lineHeight: spacing.md,
  fontFamily: typography.primary.bold,
}
