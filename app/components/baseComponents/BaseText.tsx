import i18n from "i18n-js"
import React from "react"
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { isRTL, translate, TxKeyPath } from "../../translations"
import { colors, typography } from "../../theme"
import { baseTextPresetSize } from "../../theme/fontSize"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = keyof typeof $presets

export type FontPresets = Presets

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: React.ReactNode
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function BaseText(props: TextProps) {
  const { weight, size, tx, txOptions, text, children, style: $styleOverride, ...rest } = props

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = $presets[props.preset as string] ? props.preset as Presets : "default"
  const $styles = [
    $rtlStyle,
    $presets[preset],
    $fontWeightStyles[weight as string],
    $sizeStyles[size as string],
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles}>
      {content}
    </RNText>
  )
}

/**
 * wl: 40
 * xxl: 36,
 * mxxl: 34,
 * hxl: 32,
 * xl: 24
 * lg: 20
 * md: 18
 * df: 17
 * sm: 16
 * csm: 15
 * xs: 14
 * xxs: 12
 */
const $sizeStyles = {
  wl: baseTextPresetSize.wl,
  xxl: baseTextPresetSize.xxl,
  mxxl: baseTextPresetSize.mxxl,
  hxl: baseTextPresetSize.hxl,
  xl: baseTextPresetSize.xl,
  lg: baseTextPresetSize.lg,
  md: baseTextPresetSize.md,
  df: baseTextPresetSize.df,
  sm: baseTextPresetSize.sm,
  csm: baseTextPresetSize.csm,
  xs: baseTextPresetSize.xs,
  xxs: baseTextPresetSize.xxs,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.df,
  $fontWeightStyles.normal,
  { color: colors.text },
]

const $presets = {
  default: $baseStyle,

  bold: [$baseStyle, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  heading: [$baseStyle, $sizeStyles.xxl, $fontWeightStyles.bold] as StyleProp<TextStyle>,

  subheading: [$baseStyle, $sizeStyles.lg, $fontWeightStyles.medium] as StyleProp<TextStyle>,

  formLabel: [
    $baseStyle,
    $fontWeightStyles.normal,
    $sizeStyles.xs,
    { color: colors.weatherAppPalette.primaryTextCouleur },
  ] as StyleProp<TextStyle>,

  formHelper: [$baseStyle, $sizeStyles.sm, $fontWeightStyles.normal] as StyleProp<TextStyle>,

  // For generic App big title
  h1: [
    $baseStyle,
    $sizeStyles.hxl,
    $fontWeightStyles.medium,
    { color: "#000000B2" },
  ] as StyleProp<TextStyle>,

  // For even bigger titles
  xh1: [
    $baseStyle,
    $sizeStyles.wl,
    $fontWeightStyles.bold,
    { color: "#000000B2" },
  ] as StyleProp<TextStyle>,

  // For the header right text
  headerBackText: [
    $baseStyle,
    $sizeStyles.sm,
    $fontWeightStyles.bold,
    { color: "#fff" },
  ] as StyleProp<TextStyle>,

  // For italic grey navigation buttons [exp: Mot de passe oublié]
  genericItalicText: [
    $baseStyle,
    $sizeStyles.csm,
    $fontWeightStyles.lightItalic,
  ],

  lightText: [$baseStyle, $fontWeightStyles.light],

  mediumText: [$baseStyle, $fontWeightStyles.medium],

  smallText: [$baseStyle, $sizeStyles.xs],

  smallBoldText: [$baseStyle, $sizeStyles.xs, $fontWeightStyles.bold],

  errorText: [$baseStyle, $sizeStyles.xs, { color: colors.error }],

  indicator: [$baseStyle, $sizeStyles.hxl],
}

const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
