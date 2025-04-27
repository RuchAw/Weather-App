import React, { ComponentType } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { colors, spacing } from "../../../theme"
import { BaseText, TextProps } from "../../baseComponents"

export interface StatusBarProps {
  /**
   * Text to show on the status bar
   */
  title?: string
  /**
   * Label text which is looked up via i18n.
   */
  titleTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  titleTxOptions?: TextProps["txOptions"]
  /**
   * BackgroundColor of the status bar
   */
  backgroundColor?: string
  /**
   * TextColor of the status bar
   */
  textColor?: string
  /**
   * Left accessory
   */
  LeftAccessory?: ComponentType<any>
  /**
   * Right accessory
   */
  RightAccessory?: ComponentType<any>
}

const StatusBar = (props:StatusBarProps)=>{

  const {
    title,
    titleTx,
    titleTxOptions,
    backgroundColor = colors.weatherAppPalette.inactiveBgColor,
    textColor = "white",
    LeftAccessory,
    RightAccessory
  } = props

  const containerStyle: ViewStyle[] = [
    statusBarStyle,
    {
      backgroundColor
    }
  ]

  const textStyle: TextStyle[] = [
    {
      color: textColor,
      textAlign: "center"
    }
  ]

  return(
    <View style={containerStyle}>
      {!!LeftAccessory && <LeftAccessory style={$leftAccessoryStyle}/>}
      <BaseText size="md" preset="default" text={title} tx={titleTx} txOptions={titleTxOptions} style={textStyle} />
      {!!RightAccessory && <RightAccessory style={$rightAccessoryStyle}/>}
    </View>
  )
}

const statusBarStyle:ViewStyle = {
  width: "100%",
  paddingHorizontal: spacing.df,
  paddingVertical: spacing.xxxs,
  alignItems: "center",
  justifyContent: "center"
}

const $rightAccessoryStyle: ViewStyle = { marginStart: spacing.xs, zIndex: 1 }
const $leftAccessoryStyle: ViewStyle = { marginEnd: spacing.xs, zIndex: 1 }

export default StatusBar
