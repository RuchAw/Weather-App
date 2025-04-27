import React, { ComponentType, FC } from "react"
import { StyleProp, TextStyle, View, ViewStyle, StyleSheet } from "react-native"
import { BaseIcon, BaseText, FontPresets, IconTypes, TextProps } from "../components/baseComponents"
import { componentSize } from "../theme/componentsSize"
import { colors, spacing } from "../theme"

export interface SpecialTitleTextProps {
  style?: StyleProp<TextStyle>
  preset?: FontPresets
}

export interface BaseScreenLayoutProps extends Pick<TextProps, "tx" | "text" | "txOptions"> {
  /**
   * La page de bug active ou pas
   */
  bugActive?: boolean
  /**
   * The name of the icon
   */
  icon?: IconTypes
  /**
   * style to apply optionnal padding margin
   */
  style?: StyleProp<ViewStyle>
  /**
   * Custom size for the icon override
   */
  size?: number
  /**
   * Color of the icon and text (optional)
   */
  baseColor?: string
  /**
   * An optional component to render instead of text or tx
   * Example: `SpecialText={(props) => <BaseText {...props} />}`
   */
  SpecialTitleText?: ComponentType<SpecialTitleTextProps>
}

const BaseScreenLayout = (props: BaseScreenLayoutProps) => {
  const {
    bugActive,
    icon = "settings",
    text: title,
    tx: titleTx,
    txOptions: titleTxOptions,
    style,
    size = componentSize.wl,
    baseColor,
    SpecialTitleText,
  } = props

  const iconContainerStyle = [
    $iconContainer,
    !!size && { marginBottom: spacing.xxl - (size - componentSize.wl) },
  ]

  // Icon color
  const iconColor = bugActive
    ? colors.weatherAppPalette.baseBugCouleur
    : colors.weatherAppPalette.iconPrimaryCouleur

  // Make sure that the passed value is a ViewStyle else empty array
  const flattenedStyle = StyleSheet.flatten(style || {})
  // Boolean to check if the base style of layout contains a margin bottom
  const isThereMarginBottom = !!flattenedStyle.marginBottom

  // Render title
  const Title: FC = () => {
    if (SpecialTitleText) return <SpecialTitleText />

    const titleStyle = [
      bugActive && { color: colors.weatherAppPalette.baseBugCouleur },
      !!baseColor && { color: baseColor },
    ]

    return <BaseText
      text={title}
      tx={titleTx}
      txOptions={titleTxOptions}
      preset="h1"
      style={titleStyle}
    />
  }

  return (
    <View style={style}>
      <BaseIcon
        icon={icon}
        size={size}
        containerStyle={iconContainerStyle}
        color={baseColor || iconColor}
      />
      <Title />
      <View style={!isThereMarginBottom && $defaultMarginBottom} />
    </View>
  )
}

export default BaseScreenLayout

const $iconContainer: ViewStyle = {
  alignItems: "center",
  marginTop: spacing.mxxl,
  marginBottom: spacing.xxl,
}

const $defaultMarginBottom: TextStyle = {
  marginBottom: spacing.mxxl,
}
